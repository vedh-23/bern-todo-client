import { useState, useEffect } from "react";

const Viewalltask = () => {
  const [tasklist, settasklist] = useState([]);
  //const op=document.querySelector("#o").value;

  useEffect(() => {
    const alltasks = async () => {
      try {
        const res = await fetch("http://localhost:3000/test/viewtaskall", {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        });

        const data = await res.json();

        if (data.status === 200) {
          settasklist(data.filterlist);
          console.log(tasklist);
          
          
        }
      } catch (err) {
        console.error(err);
      }
    };

    alltasks();
  }, []); // Run only once on component mount

  return (
    <>
      <h1>All Tasks</h1>
      <ul>
        {tasklist.length > 0 ? (
          tasklist.map((task, index) => (
            <li key={index}>
              <p id="o">{index+1}</p>
              <h3>{task.name}</h3>
              <p>Details: {task.details}</p>
              <p>Date: {task.date}</p>
              <p>Time: {task.time}</p>
            </li>
          ))
        ) : (
          <p>No tasks available.</p>
        )}
      </ul>
    </>
  );
};

export default Viewalltask;
