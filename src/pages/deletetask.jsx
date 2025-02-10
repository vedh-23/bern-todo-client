import Navigator from "./navigation";
const Deletetask=({state})=>{
  const deletetask=async(e)=>{
    e.preventDefault();
    console.log(state);
    const {contract,account}=state;
    console.log(contract);

    const taskid = document.querySelector("#taskid").value;
    try{
      if( contract)
      {
        if(contract.methods)
        {
          await contract.methods
          .deleteTask(taskid)
          .send({from:account})
          alert("Task has been deleted")
        }
        else{
          alert("method");
        }
      }
      else{
        alert("contract");
      }
    }
    catch(err)
    {
      console.log(err);
    }

  }
  return (
    <>
    <Navigator/>
    <form onSubmit={deletetask}>
      <label>Id : <input id="taskid"></input></label>
      <button type="submit">Submit</button>
    </form>

    </>

  )
}
export default Deletetask