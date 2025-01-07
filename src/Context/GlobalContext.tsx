import React, { createContext, useState, ReactNode } from "react";
import { v4 as uuidv4 } from 'uuid';
// Define os tipos para o contexto
interface GlobalContextType {
  popUp: boolean;
  setPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  user: User[];
  setUser: React.Dispatch<React.SetStateAction<User[]>>; // Adicionando 'setUser' ao tipo
  pedido:Pedido
  setPedido:React.Dispatch<React.SetStateAction<Pedido>>;
}

// Cria o contexto com o tipo correto
export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalStorageProps {
  children: ReactNode;
}

interface User {
  idSessao:string;
  nome: string;
  cpf: string;
  mesa: string; // Permite números ou null
}
interface Pedido {
  id: number;
  cliente:string;
  item: Array<{
    nome: string;
    quantidade:number;
    valor: number;
    promocao: boolean;
    valorPromocao: number;
    descricao:string
  }>;
}


export const GlobalStorage: React.FC<GlobalStorageProps> = ({ children }) => {
  const [popUp, setPopUp] = useState<boolean>(false);
  const [user, setUser] = useState<User[]>([
    {
      idSessao:"",
      nome: "",
      cpf: "",
      mesa: "",
      
    },
  ]);

  const [pedido, setPedido] = useState<Pedido>({
    id: 0,
    cliente:"",
    item: [
      {
        nome: "",
        quantidade:0,
        valor: 0,
        promocao: true,
        valorPromocao: 0,
        descricao:""
      },
    ],
  });





  return (
    <GlobalContext.Provider
      value={{
        popUp,
        setPopUp,
        user,
        setUser,
        pedido, 
        setPedido
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
