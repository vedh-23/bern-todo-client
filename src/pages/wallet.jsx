import ABI from "./ABI.json";

import { useState } from "react";
import { ethers } from "ethers";

import TodoApp from "./viewalltask";

const Wallet = ({ saveState }) => {
  const [account, setAccount] = useState(null);
  const [state, setState] = useState({
    provider: null,
    signer: null,
    Contract: null,
    readOnlyContract: null,
  });

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("MetaMask is not installed. Please install it and try again.");
      return;
    }

    try {
      const { ethereum } = window;

      // Request accounts
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      // Handle account and chain changes
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });

      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });

      // Contract setup
      const CONTRACT_ADDRESS = "0x3e23445c5ea092ee035bb4c559618daa80a08ea8";
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const Contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const readOnlyContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ABI,
        provider
      );

      // Update state
      setAccount(accounts[0]);
      setState({ provider, signer, Contract, readOnlyContract });
      saveState({ provider, signer, Contract, readOnlyContract });
    } catch (err) {
      console.error("Failed to connect MetaMask:", err);
      alert("Could not connect to MetaMask. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
      {/* Connected Account */}

      {/* TodoApp or Connect Button */}
      <div className="flex-grow">
        {!state.Contract ? (
          <div className="flex items-center justify-center h-full">
            <button
              className="px-6 py-2 text-yellow-500 text-bold bg-black rounded-lg hover:bg-gray-900 transition duration-300"
              onClick={connectWallet}
            >
              Connect MetaMask
            </button>
          </div>
        ) : (
          <TodoApp state={state} />
        )}
      </div>
    </div>
  );
};

export default Wallet;
