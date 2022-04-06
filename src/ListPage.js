import { useState, useEffect } from "react";
import Web3 from "web3";
import Certification from "../src/artifacts/contracts/Certification.sol/Certification.json";
import "./App.css";
import { useContract } from "./context/contract-context";



const ListPage=() => {
    const[Certi, setCertificate] = useState([]);
    const contract = useContract();

    useEffect(() => {
        getContractData();     
    }, []);


    const getContractData = async () => {
        const { _ID, _artist, _photoHash, _title, _year } = await contract.methods.returnCertificates().call();
        let CertObject = [];
        for(let i = 0; i< _ID.length; i++) {
            let certificate = {
                ID: _ID[i],
                artist: _artist[i],
                photo: _photoHash[i],
                title: _title[i],
                year: _year[i]
            }
            CertObject.push(certificate);
        }
        setCertificate(CertObject);
    }

    const unixToDate = (unix) => {
        const newDate = new Date(unix * 1000);
        
        const humanDateFormat = newDate.toLocaleString();

        const day = newDate.toLocaleDateString("en-GB", {day: "numeric"});
        const month = newDate.toLocaleDateString("en-GB", {month: "numeric"});
        const year = newDate.toLocaleDateString("en-GB", {year: "numeric"});
        return `${day}/${month}/${year}` 
    }

    return(
        <div>
            {Certi.map((Cert) => (
                <div className="Certificate-Preview" key={Cert.ID}>
                    <h2>{ Cert.title }</h2>
                    <img src={`https:ipfs.infura.io/ipfs/${Cert.photo}`}/>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>Artist: { Cert.artist }</div>
                        <div>Created on: { unixToDate(Cert.year) }</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ListPage;