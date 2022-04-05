import { createContext, useContext } from "react";


const ipfsContext = createContext(null);

export const IPFSProvider = ({value,children}) => {
    return <ipfsContext.Provider value={value}>{children}</ipfsContext.Provider>
}

export const useIPFS = () => useContext(ipfsContext);