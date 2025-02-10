import Navigator from "./navigation";
const Updatetask=({state})=>{
  const updatetask=async(event)=>{
    event.preventDefault();
    const {contract,account}=state;
    const taskId=document.querySelector("#taskid").value;
    const taskname=document.querySelector("#taskname").value;
    const taskdetail=document.querySelector("#taskdetail").value;
    const taskdate = document.querySelector("#taskdate").value;
    const tasktime=document.querySelector("#tasktime").value;
    try{
    const res = await fetch("http://localhost:3000/test/updatetask",{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({taskId:taskId})
    })
    if(res.status===200)
    {
      if(contract && contract.methods){
      await contract.methods
      .updateTask(taskId,taskname,taskdetail,tasktime,taskdate)
      .send({from:account})
      alert("Task has been updated");
    }

    }
    else{
      alert("Give valid id");
    
    }
    
   

  }
  catch(err)
  {
    console.error(err);
  }
}
  return (
    <>
    <Navigator/>
    <form onSubmit={updatetask}>
      <label>Id:<input id="taskid"></input></label>
      <label>Name:<input id="taskname"></input></label>
      <label>Detail:<input id="taskdetail"></input></label>
      <label>Time:<input id="tasktime"></input></label>
      <label>Date:<input id="taskdate"></input></label>
      <button type="submit">Submit</button>
    </form>

    </>
  )
}
export default Updatetask