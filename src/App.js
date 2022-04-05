import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { IPFSProvider } from './context/ipfs-context';
import { ContractProvider } from './context/contract-context';
import NavBar from './NavBar';
import CertForm from './Cert-Form';
import ListPage from './ListPage';
import { create } from 'ipfs-http-client';
import Web3 from "web3";
import Certification from "../src/artifacts/contracts/Certification.sol/Certification.json";



function App() {

  const client = create('https://ipfs.infura.io:5001');

  const web3 = new Web3("http://127.0.0.1:8545/");
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const contract = new web3.eth.Contract(Certification.abi, contractAddress);
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
