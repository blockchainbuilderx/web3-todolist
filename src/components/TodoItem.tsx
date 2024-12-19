interface Todo {
  id: string
  text: string
  completed: boolean
}

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
}

export default function TodoItem({ todo, onToggle }: TodoItemProps) {
  return (
    <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="w-4 h-4 mr-2 border-gray-300 rounded focus:ring-blue-500"
        />
        <span className={`${todo.completed ? 'line-through text-gray-500' : ''}`}>
          {todo.text}
        </span>
      </div>
    </li>
  )
}

