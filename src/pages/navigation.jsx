import {Link} from "react-router-dom"
const Navigator=()=>{
  return (
    <>
    <header>
      <div> TODO </div>
      <nav>
        <ul>
          <li>
            <Link className="nav-link" to="/createtask">
               Create Task
            </Link>
          </li>
          <li> 
            <Link className="nav-link" to="/view-all-task">
             View all task
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/deletetask">
            Delete task
            </Link>

          </li>
          <li>
            <Link className="nav-link" to="/updatetask">
            Update task
            </Link>

          </li>
          <li>
            <Link className="nav-link" to="/viewtask">
            View task
            </Link>

          </li>
        </ul>
      </nav>

    </header>

    </>
  )
}
export default Navigator 