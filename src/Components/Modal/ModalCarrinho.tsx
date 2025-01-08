import React, { useState, useEffect } from "react";
import styles from "./ModalCarrinho.module.css";
import { useGlobalContext } from "../../Context/GlobalContext";

interface ModalCarrinhoProps {
  setBtnPedido: React.Dispatch<React.SetStateAction<boolean>>;
  btnPedido: boolean;
}

const ModalCarrinho: React.FC<ModalCarrinhoProps> = ({ setBtnPedido, btnPedido }) => {
  const { user, pedido, setPedido } = useGlobalContext();
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [idUser, setIdUser] = useState<string>("");

  // Sincroniza CPF do usuário
  useEffect(() => {
    if (user.length > 0) {
      setIdUser(user[0].cpf);
    }
  }, [user]);

  // Sincroniza estado inicial de quantities com pedido
  useEffect(() => {
    const initialQuantities = pedido.item.reduce((acc, item) => {
      acc[item.idSerial] = item.quantidade || 1;
      return acc;
    }, {} as { [key: number]: number });
    setQuantities(initialQuantities);
  }, [pedido]);

  // Função para incrementar a quantidade pelo idSerial
  const increaseQuantity = (idSerial: number) => {
    setQuantities((prev) => ({
      ...prev,
      [idSerial]: (prev[idSerial] || 1) + 1,
    }));

    setPedido((prevPedido) => ({
      ...prevPedido,
      item: prevPedido.item.map((pedidoItem) =>
        pedidoItem.idSerial === idSerial
          ? { ...pedidoItem, quantidade: (pedidoItem.quantidade || 1) + 1 }
          : pedidoItem
      ),
    }));
  };

  // Função para decrementar a quantidade pelo idSerial
  const decreaseQuantity = (idSerial: number) => {
    setQuantities((prev) => ({
      ...prev,
      [idSerial]: Math.max((prev[idSerial] || 1) - 1, 1),
    }));

    setPedido((prevPedido) => ({
      ...prevPedido,
      item: prevPedido.item.map((pedidoItem) =>
        pedidoItem.idSerial === idSerial
          ? { ...pedidoItem, quantidade: Math.max((pedidoItem.quantidade || 1) - 1, 1) }
          : pedidoItem
      ),
    }));
  };

  // Renderização do carrinho
  return (
    <div className={styles.modalCarrinho}>
      <p
        className={styles.closePage}
        onClick={() => setBtnPedido(!btnPedido)}
      >
        X
      </p>
      {pedido.item.length > 0 ? (
        pedido.item
          .filter((item) => item.quantidade > 0 && item.descricao !== "") // Exibe apenas itens com quantidade > 0
          .map((item) => (
            <div key={item.idSerial} className={styles.item}>
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
                <button onClick={() => decreaseQuantity(item.idSerial)}>-</button>
                <span>{quantities[item.idSerial] || item.quantidade}</span>
                <button onClick={() => increaseQuantity(item.idSerial)}>+</button>
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
