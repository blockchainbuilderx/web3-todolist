//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
contract TodoList {
	uint public taskCount = 0;
	struct Task {
		uint id;
		string content;
		bool completed;
	}

	mapping(uint => Task) public tasks;


	constructor() public{
		createTask("first Task");
	}

	function createTask(string memory _content) public {
		taskCount ++;
		Task memory task = Task(taskCount,_content,false);
		tasks[taskCount] = task;
		emit TaskCreated(taskCount, _content, false);
	}

	event TaskCreated(
		uint id,
		string content,
		bool completed
	);

	event TaskToogled(
		uint id,
		bool completed
	);


	function toogleTask(uint _id) public {
		tasks[_id].completed = !tasks[_id].completed;
		emit TaskToogled(_id, tasks[_id].completed);
	}

	


}