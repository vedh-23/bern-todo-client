import { useState } from "react";

import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Wallet from "./pages/wallet";

import TodoApp from "./pages/viewalltask";

function App() {
  const [state, setstate] = useState({
    provider: null,
    signer: null,
    Contract: null,
    readOnlyContract: null,
  });
  const saveState = ({ provider, signer, Contract, readOnlyContract }) => {
    setstate({
      provider: provider,
      signer: signer,
      Contract: Contract,
      readOnlyContract: readOnlyContract,
    });
  };
  const router = createBrowserRouter([
    { path: "/", element: <Wallet saveState={saveState} /> },

    { path: "/view-all-task", element: <TodoApp state={state} /> },
  ]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <p className="text-red-600">I am red</p>
    </>
  );
}

export default App;
