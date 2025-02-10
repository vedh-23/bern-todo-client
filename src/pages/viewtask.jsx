import {useState} from "react"
const Viewtask = () => {
  const [taskk,settaskk]=useState(null);
  const viewtask = async (event) => {
    try {
      event.preventDefault();
      const taskID = document.querySelector("#taskId").value;
      const res = await fetch(`http://localhost:3000/test/viewtask/${taskID}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      
      settaskk(data.taskr);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form onSubmit={viewtask}>
        <label>
          ID:
          <input id="taskId" />
        </label>
        <button type="submit">View Task</button>
      </form>
      {taskk && (
        <div>
        {taskk.name}
      {taskk.detail}
      {taskk.time}
      {taskk.date}
      </div>

      )}
      
    </>

  );
};

export default Viewtask;
