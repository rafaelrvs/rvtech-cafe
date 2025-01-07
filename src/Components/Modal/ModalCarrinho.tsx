import React, { useState, useEffect } from "react";
import styles from "./ModalCarrinho.module.css";
import { useGlobalContext } from "../../Context/GlobalContext";

interface ModalCarrinhoProps {
  setBtnPedido: React.Dispatch<React.SetStateAction<boolean>>;
  btnPedido: boolean;
}

const ModalCarrinho: React.FC<ModalCarrinhoProps> = ({ setBtnPedido, btnPedido }) => {
  const { pedido, setPedido } = useGlobalContext();
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const decreaseQuantity = (index:number,nome:string)=>{
    console.log(index);
    
}
async function increaseQuantity (index:number,nome:string){  
    const quantidades = pedido.item
    .filter(item => item.nome === nome) // Filtra os itens pelo nome
    .map(item => item.quantidade);     // Extrai apenas a quantidade

  
    console.log(quantidades);
    
    
  }


  return (
    <div className={styles.modalCarrinho}>
      <p
        className={styles.closePage}
        onClick={() => setBtnPedido(!btnPedido)}
      >
        X
      </p>
      {pedido.item.length > 0 && pedido.cliente ? (
        pedido.item
          .filter((item) => item.quantidade > 0) // Filtra itens com quantidade maior que zero
          .map((item, index) => (
            <div key={`${item.nome}-${index}`} className={styles.item}>
              <div>
                {item.urlPedido ? (
                  <img
                    className={styles.imgProd}
                    src={item.urlPedido}
                    alt={item.nome || "Item"}
                  />
                ) : (
                  <p>Sem imagem disponível</p>
                )}
              </div>
              <p className={styles.descProduto}>
                <span>Nome do item:</span> {item.nome || "Nome não disponível"}
              </p>
              <p className={styles.descProduto}>
                <span>Descrição:</span> {item.descricao || "Sem descrição"}
              </p>
              <div className={styles.quantityControl}>
                <button onClick={() => decreaseQuantity(index,item.nome)}>-</button>
                <span>{quantities[index] || item.quantidade}</span>
                <button onClick={() => increaseQuantity(index,item.nome)}>+</button>
              </div>
              <p className={styles.descProduto}>
                <span>Preço: R$</span> {(item.valor || 0).toFixed(2)}
              </p>
            </div>
          ))
      ) : (
        <p className={styles.messageDefault}>Nenhum item no carrinho.</p>
      )}
    </div>
  );
};

export default ModalCarrinho;
