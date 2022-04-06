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
  // model users identification with public address?
  // mapping of users address to created certificates.
  const client = create('https://ipfs.infura.io:5001');

  const web3 = new Web3(new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/31f62705b513402f90371112bc818aa9'
  ));
  
  const contractAddress = "0x71618872CD0A0f455F8eAB4E9bAC1108649F21e2";
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
