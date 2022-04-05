import { createContext, useContext } from "react";


const contractContext = createContext(null);

export const ContractProvider = ({value,children}) => {
    return <contractContext.Provider value={value}>{children}</contractContext.Provider>
}

export const useContract = () => useContext(contractContext);