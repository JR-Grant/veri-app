import { useState } from "react";
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
      await contract.createCertificate(hash, date, title, artist);
      console.log("hello");
    };

    const handleFormSubmit = async () => {
      if(disabled) return;
      setLoading(true);
      const {cid, path} = await ipfsClient.add(image[0]);
      console.log(path);

      const unix = dateToUnix();
      
      setCert(title, artist, unix, path);
      //title,artist,date,hash
      setLoading(false);
    }

    const dateToUnix = () => {
      const dateSTR = new Date(date);
      const time = dateSTR.getTime();
      const UNIX = Math.floor(time / 1000);
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