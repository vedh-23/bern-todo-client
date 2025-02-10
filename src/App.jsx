import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Createtask from './pages/createtask'
import Deletetask from './pages/deletetask'
import Updatetask from './pages/updatetask'
import Viewalltask from './pages/viewalltask'
import Wallet from './pages/wallet'
import Viewtask from './pages/viewtask'


function App() {
  const[state,setstate]=useState({web3:null,contract:null,account:null});
  const savestate=({web3,contract,account})=>{
    setstate({web3:web3,contract:contract,account:account});
  }
  const router = createBrowserRouter([
    {path:'/',element:<Wallet savestate={savestate}/>},
    {path:'/createtask',element:<Createtask state={state}/>},
    {path:'/view-all-task',element:<Viewalltask />},
    {path:'/deletetask',element:<Deletetask state={state}/>},
    {path:'/updatetask',element:<Updatetask state={state}/>},
    {path:'/viewtask',element:<Viewtask/>}
    
  ])
  

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
