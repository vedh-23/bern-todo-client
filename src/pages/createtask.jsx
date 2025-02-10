import { useState } from "react"
import Navigator from "./navigation";

const Createtask=({state})=>{
  const[display,setdisplay]=useState("");

  const createTask=async(event)=>{
    event.preventDefault();
    const {contract,account}=state;
    console.log(state);
    const taskname=document.querySelector("#taskName").value ;
    const taskDate=document.querySelector("#taskdate").value ;
    const taskTime=document.querySelector("#tasktime").value ;
    const taskdetail=document.querySelector("#taskdetail").value ;
    try{
      const res = await fetch("http://localhost:3000/createtask",{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({taskdate:taskDate,tasktime:taskTime})
      })
      const data=await res.json();
      //setdisplay(data);
      console.log(data);
      if(data.status === 200)
      {
        console.log("here");
        console.log(contract);
        console.log(account);
        if(contract && contract.methods){
          await contract.methods
          .createTask(taskname,taskdetail,taskTime,taskDate) 
          .send({from:account})
          alert("Task is added")

        }
        
      }
    
    
    }
    catch(err){
      console.error(err);
    }

  }
  
  return (
    <>
    <Navigator></Navigator>
    <form onSubmit={createTask}>
      <label>TaskName : <input id="taskName"></input></label>
      <label>TaskDate : <input id="taskdate"></input></label>
      <label>Tasktime : <input id="tasktime"></input></label>
      <label>Taskdetail : <input id="taskdetail"></input></label>
      <button type="submit">Submit</button>
      {display}

    </form>
    


    </>
  )
}
export default Createtask