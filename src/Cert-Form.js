import { useState } from "react";
import { useForm } from "react-hook-form";
import "./App.css";
import { useIPFS } from "./context/ipfs-context";
import { useContract } from "./context/contract-context";

const CertForm = () => {
    const [image, setImage] = useState();
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(false);
    const ipfsClient = useIPFS();
    const contract = useContract();
    const disabled = (!image || title.length===0 || artist.length===0 || !date || loading);
    
    const onImageChange = (e) => {
      setImage(e.target.files)
    }

    const setCert = async (title,artist,date,hash) => {
      await contract.methods.createCertificate(hash, date, title, artist).send({ from: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266" });
      console.log("hello");
    };

    const handleFormSubmit = async () => {
      if(disabled) return;
      setLoading(true);
      const {cid, path} = await ipfsClient.add(image[0]);
      console.log(path);

      const unix = dateToUnix();
      
      setCert(title, artist, unix, path);
      //hash, date, title, artist
      //title,artist,date,hash
      setLoading(false);
    }

    const dateToUnix = () => {
      console.log(date);
      const dateSTR = new Date(date);
      console.log(dateSTR);
      const time = dateSTR.getTime();
      const UNIX = Math.floor(time / 1000);
      console.log(UNIX);
      return Number(UNIX);
    }

    return (
    <div className="form">
      <label>Image</label>
        <input 
          type="file" 
          name="Picture"
          onChange={onImageChange} 
        />

        <label>Title</label>
        <input 
          type="text"  
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Year</label>
        <input 
          type="date" 
          name="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)} 
        />

        <label>Artist</label>
        <input 
          type="text" 
          name="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
      <button onClick={handleFormSubmit} disabled={disabled}>Submit</button>
    </div>
    );
}

export default CertForm;