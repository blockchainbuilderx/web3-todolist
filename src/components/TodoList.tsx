'use client'

import { useState , useEffect} from 'react'
import TodoItem from './TodoItem'
import AddTodoForm from './AddTodoForm'
import { useReadContract,useReadContracts,useWriteContract,useWaitForTransactionReceipt } from 'wagmi'
import { useChainId, useAccount } from 'wagmi';
import TodoContractJson from "../../build/contracts/TodoList.json";

interface Todo {
  id: string
  text: string
  completed: boolean
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const { isConnected,address } = useAccount();
  const chainId = useChainId();
 const { data: hash,isPending, writeContract } = useWriteContract()
 const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ 
   hash, 
 }) 
  const [isLoading, setIsLoading] = useState(false);

  const contractAddress = TodoContractJson['networks'][chainId].address;

  const { abi } = TodoContractJson;


  const contractParams = {
    abi,
    address: contractAddress
  }
  const { data:taskCount  } = useReadContract(
      {
        ...contractParams,
        functionName: 'taskCount', 
      }
    );
    
    const contractCalls = Array.from({ length: Number(taskCount) }).map(
      (_, index) => ({
        ...contractParams,
        functionName: "tasks",
        args: [index+1],
      })
    );
    const { data: tasks } = useReadContracts({
      contracts: contractCalls,
    });


  useEffect(() => {
    if (tasks) {
        let todoList =  [...todos];
        tasks.forEach(task =>{
          todoList.push({ id:task?.result[0]?.toString(), text:task?.result[1], completed: task?.result[2] });
        });
        setTodos(todoList);
      setIsLoading(false);
    }
  }, [tasks]);

  useEffect(() => {
    if (!isConfirming && isConfirmed) {
        window.location.reload();
    }
  }, [isConfirmed,isConfirming]);



  const addTodo = (text: string) => {
    setIsLoading(true);
    writeContract({
      ...contractParams,
      functionName:"createTask",
      args:[text],
    });
  }

  const toggleTodo = (id: string) => {
    writeContract({
      ...contractParams,
      functionName:"toogleTask",
      args:[id],
    });

    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  return (
    <div className="w-full max-w-md">
      <AddTodoForm onAdd={addTodo} />
      {isLoading && (
      <div
      className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
      role="status">
      <span
        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span
      >
    </div>)}
      <ul className="mt-4 space-y-2">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
          />
        ))}
      </ul>
    </div>
  )
}

