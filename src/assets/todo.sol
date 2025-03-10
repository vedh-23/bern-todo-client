// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract TodoList {
    struct Task {
        uint id;
        string name;
        string details;
        string time;
        string date;
    }

    address owner;
    modifier onlyOwner {
        require(msg.sender == owner, "Not allowed!");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    
    mapping(address => mapping(uint => Task)) private userTasks;
    mapping(address => uint) private userTaskCount; // Task count for each user

    
    function createTask(string calldata _name, string calldata _details, string calldata _time, string calldata _date) public {
        uint taskId = userTaskCount[msg.sender] + 1; // Increment task count for this user
        userTasks[msg.sender][taskId] = Task(taskId, _name, _details, _time, _date);
        userTaskCount[msg.sender]++; // Update task count
    }

    
    function updateTask(uint _id, string calldata _name, string calldata _details, string calldata _time, string calldata _date) public {
        require(_id > 0 && _id <= userTaskCount[msg.sender], "Invalid task ID");
        userTasks[msg.sender][_id] = Task(_id, _name, _details, _time, _date);
    }

    function viewTask(uint _id) public view returns (Task memory) {
        require(_id > 0 && _id <= userTaskCount[msg.sender], "Invalid task ID");
        return userTasks[msg.sender][_id];
    }
    

    
    function viewAllTasks() public view returns (Task[] memory) {
        uint taskCount = userTaskCount[msg.sender];
        Task[] memory tasks = new Task[](taskCount);
        for (uint i = 1; i <= taskCount; i++) {
            tasks[i - 1] = userTasks[msg.sender][i];
        }
        return tasks;
    }

    
    function deleteTask(uint _id) public {
        require(_id > 0 && _id <= userTaskCount[msg.sender], "Invalid task ID");
        delete userTasks[msg.sender][_id];
    }


    function deleteAllTasks() public {
        uint taskCount = userTaskCount[msg.sender];
        for (uint i = 1; i <= taskCount; i++) {
            delete userTasks[msg.sender][i];
        }
        userTaskCount[msg.sender] = 0;
    }
}
