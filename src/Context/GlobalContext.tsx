import React, { createContext, useState, ReactNode } from "react";

// Define os tipos para o contexto
interface GlobalContextType {
  popUp: boolean;
  setPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

// Cria o contexto com o tipo correto
export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalStorageProps {
  children: ReactNode;
}

export const GlobalStorage: React.FC<GlobalStorageProps> = ({ children }) => {
  const [popUp, setPopUp] = useState<boolean>(false);

  return (
    <GlobalContext.Provider
      value={{
        popUp,
        setPopUp,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Hook personalizado para acessar o contexto
export const useGlobalContext = () => {
  const context = React.useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext deve ser usado dentro de um GlobalStorage.");
  }
  return context;
};
