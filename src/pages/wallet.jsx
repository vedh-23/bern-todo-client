import {Web3} from "web3"
import ABI from './ABI.json'
import { useNavigate } from "react-router-dom"
import Navigator from "./navigation"
import PropTypes from 'prop-types';
const Wallet = ({savestate}) => {
  const navigate=useNavigate();

  const connectwallet = async () => {
  if (typeof window.ethereum === "undefined") {
    alert("MetaMask is not installed. Please install it and try again.");
    return;
  }

  try {
    console.log("Requesting accounts...");
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    console.log("Accounts fetched:", accounts);

    const web3 = new Web3(window.ethereum);
    const CONTRACT_ADDRESS = "0x1bf68bb83686a65f39d8eb5ab54a2a1098af3c18";
    console.log("Creating contract...");
    const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

    console.log("Contract object:", contract);

    savestate({ web3, contract, account: accounts[0] });

    console.log("State saved successfully:", { web3, contract, account: accounts[0] });
  } catch (err) {
    console.error("Failed to connect MetaMask:", err);
    alert("Could not connect to MetaMask. Please try again.");
  }
};

  return(
    <>
    <Navigator/>
    <button onClick={connectwallet}>Connect metamask</button>
    </>
  )
}
// Wallet.propTypes = {
//     saveState: PropTypes.func.isRequired,
//   };
  
export default Wallet;