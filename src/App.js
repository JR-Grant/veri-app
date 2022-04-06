import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { IPFSProvider } from './context/ipfs-context';
import { ContractProvider } from './context/contract-context';
import NavBar from './NavBar';
import CertForm from './Cert-Form';
import ListPage from './ListPage';
import { create } from 'ipfs-http-client';
import Certification from "../src/artifacts/contracts/Certification.sol/Certification.json";
import { PrivateKey, RINKEBY_API } from "./context/Private_ABI";
import { ethers } from 'ethers';



function App() {
  const client = create('https://ipfs.infura.io:5001')
  const contractAddress = "0x71618872CD0A0f455F8eAB4E9bAC1108649F21e2";
  let provider = ethers.getDefaultProvider(RINKEBY_API);

  let signer = new ethers.Wallet(PrivateKey, provider);

  const contract = new ethers.Contract(contractAddress, Certification.abi, signer);
  
  return (
    <ContractProvider value={contract}>
    <IPFSProvider value={client}>
    <Router>
      <div>
        <NavBar/>
        <div></div>
        <div className='content'>
            <Route exact path="/">
              <div className='form'>
                <ListPage/>
              </div>
            </Route>
            <Route path="/form">
              <div className='form'>
                <CertForm/>
              </div>
            </Route>
        </div>
      </div>
    </Router>   
    </IPFSProvider>
    </ContractProvider>
  );
}

export default App;
