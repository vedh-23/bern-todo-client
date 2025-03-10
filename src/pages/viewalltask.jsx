import React, { useEffect, useState } from "react";

const TodoApp = ({ state }) => {
  const { Contract } = state;
  const [todos, setTodos] = useState([]);
  const fetchTask = async (e) => {
    const tasks = await Contract.viewAllTasks();
    const tasksf = tasks.filter(
      ({ name, details, time, date }) =>
        !(name === "" && details === "" && time === "" && date === "")
    );

    setTodos(tasksf);
  };

  const [upid, setupid] = useState(null);
  // Sample data for display purposes

  const [newTask, setNewTask] = useState({
    name: "",
    details: "",
    time: "",
    date: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState({
    name: "",
    details: "",
    time: "",
    date: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);

  const handleInputChange = async (e) => {
    e.preventDefault();

    const { id, value } = e.target;

    if (isEditMode) {
      setEditingTask((prev) => ({ ...prev, [id]: value }));
    } else {
      setNewTask((prev) => ({ ...prev, [id]: value }));
      console.log(newTask);
    }
  };

  const openAddModal = () => {
    setIsEditMode(false);
    setNewTask({ name: "", details: "", time: "", date: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setIsEditMode(true);
    setEditingTask({ ...task });
    setupid(task.id);

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEditMode) {
      const tx = await Contract.createTask(
        newTask.name,
        newTask.details,
        newTask.time,
        newTask.date
      );

      closeModal();

      await tx.wait();

      alert("Task has been created");
    } else {
      const tx = await Contract.updateTask(
        upid,

        editingTask.name,
        editingTask.details,
        editingTask.time,
        editingTask.date
      );
      closeModal();
      await tx.wait();

      alert("Task has been updated");
    }
    fetchTask();

    // Contract function would go here

    closeModal();
  };

  const toggleTaskStatus = async (id) => {
    const tx = await Contract.deleteTask(id);
    await tx.wait();
    alert("Task has been deleted");
    fetchTask();

    // Contract function would go here
  };

  const handleDeleteAll = async () => {
    const tx = await Contract.deleteAllTasks();
    await tx.wait();
    alert("All Task has been deleted");
    fetchTask();
    // Contract function would go here
  };

  useEffect(() => {
    fetchTask();
  }, [handleDeleteAll, toggleTaskStatus, handleSubmit]);

  return (
    <div className="min-h-screen bg-yellow-500 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-black mb-2">Task Master</h1>
          <p className="text-black text-xl">
            Organize your day, accomplish your dreams
            <p>
              (to complete the transaction faster pay ethereum for aggressive
              mode in metamask)
            </p>
          </p>
        </div>

        {/* Task Management Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-black">
            My Tasks ({todos.length})
          </h2>
          <div className="flex gap-4">
            {/* Add Button */}
            <button
              onClick={openAddModal}
              className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 "
              aria-label="Add new task"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>

            {/* Delete All Button */}
            <button
              onClick={handleDeleteAll}
              className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 "
              aria-label="Delete all tasks"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Todo List */}
        <div className="space-y-4">
          {todos.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-8 text-center">
              <p className="text-gray-500">
                No tasks yet. Add a task to get started!
              </p>
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className={`bg-black rounded-xl shadow p-4 transition-all hover:shadow-md ${
                  todo.completed ? "bg-gray-50" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="cursor-pointer"
                    onClick={() => toggleTaskStatus(todo.id)}
                  >
                    {todo.completed ? (
                      <div className="w-6 h-6 bg-indigo-500 rounded-md flex items-center justify-center text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-6 h-6 border-2 border-gray-300 rounded-md hover:border-indigo-500 transition-colors"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-lg font-medium ${
                          todo.completed
                            ? "line-through text-gray-400"
                            : "text-yellow-500"
                        }`}
                      >
                        {todo.name}
                      </span>
                    </div>
                    <div className="text-gray-600 mb-2">{todo.detail}</div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      {todo.date && (
                        <span className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {todo.date}
                        </span>
                      )}
                      {todo.time && (
                        <span className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {todo.time}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="edit-btn text-yellow-500 hover:text-yellow-400 p-2 rounded-full hover:bg-gray-900"
                      onClick={() => openEditModal(todo)}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        <div className="mt-6 text-center text-black font-medium">
          {todos.filter((todo) => !todo.completed).length} tasks remaining ·{" "}
        </div>

        {/* Task Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-yellow-500 rounded-xl shadow-xl max-w-md w-full p-6 animate-fade-in">
              <h3 className="text-2xl font-semibold text-black mb-4">
                {isEditMode ? "Edit Task" : "Add New Task"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-black mb-1">
                    Task Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={isEditMode ? editingTask?.name || "" : newTask.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="detail" className="block text-black mb-1">
                    Description
                  </label>
                  <textarea
                    id="details"
                    value={
                      isEditMode ? editingTask.details || "" : newTask.details
                    }
                    onChange={handleInputChange}
                    placeholder="Any additional details?"
                    rows="2"
                    className="w-full px-4 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-black mb-1">
                      Due Date
                    </label>
                    <input
                      id="date"
                      value={isEditMode ? editingTask.date || "" : newTask.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-black mb-1">
                      Due Time
                    </label>
                    <input
                      id="time"
                      value={isEditMode ? editingTask.time || "" : newTask.time}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors"
                  >
                    {isEditMode ? "Update Task" : "Add Task"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoApp;
