import React, { useEffect, useState } from 'react';
import "./CardCafe.css";
import { dataCafe } from '../../data/data';
import { useGlobalContext } from '../../Context/GlobalContext';

interface Cafe {
  img: string;
  nome: string;
  preco: number; // Armazenado como número para facilitar cálculos
  detalhes: string;
}

const CardCafe: React.FC = () => {
  const { user, setPedido } = useGlobalContext();
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [idUser, setIdUser] = useState<string>("");
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  
      const ano = new Date().getUTCFullYear();
      const mes = new Date().getDate();
      const hora = new Date().getMilliseconds();
      const time = new Date().getTime();
      const idSerial = ano+""+mes+""+hora+""+time;

  useEffect(() => {
    user.forEach((item) => {
      setIdUser(item.cpf);
    });
  }, [user]);

  const toggleFlip = (index: number) => {
    setFlippedCards((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handlerAdicionaPedido = (item: Cafe, index: number) => {
    const quantity = quantities[index] || 1;

    // Atualiza o pedido
    

      setPedido((prevPedido) => ({
        ...prevPedido,
        cliente: idUser,
        item: [
          ...prevPedido.item,
          {
            idPed:idSerial,
            nome: item.nome,
            quantidade: quantity,
            valor: item.preco,
            promocao: false, // Adicione lógica para promoção se necessário
            valorPromocao: 0,
            descricao: item.detalhes,
            urlPedido:item.img,
          },
        ],
      }));
      
    
   
      
    
      // Reseta a quantidade exibida no botão
      setQuantities((prev) => ({
        ...prev,
        [index]: 0, // Zera apenas o índice correspondente
      }));
    };
    
    const increaseQuantity = (index: number) => {
      setQuantities((prev) => ({
        ...prev,
        [index]: (prev[index] || 1) + 1,
      }));
    };
    
  const decreaseQuantity = (index: number) => {
    setQuantities((prev) => ({
      ...prev,
      [index]: Math.max((prev[index] || 1) - 1, 1), // Garante que a quantidade não seja negativa
    }));
  };

  return (
    <div className="cardCafe">
      {dataCafe.map((item: Cafe, index: number) => (
        <div
          key={index}
          className={`contentCardCafe ${
            flippedCards.includes(index) ? "flipped" : ""
          }`}
        >
          {/* Frente do card */}
          <div className="cardFront">
            <img className="imgCardCafe" src={item.img} alt={item.nome} />
            <h1 className="nome">{item.nome}</h1>
            <h2 className="preco">R$: {item.preco.toFixed(2)}</h2>
            <div className="quantityControl">
              <button onClick={() => decreaseQuantity(index)}>-</button>
              <span>{quantities[index] || 1}</span>
              <button onClick={() => increaseQuantity(index)}>+</button>
            </div>
            <button
              className="btnCardCafe"
              onClick={() => handlerAdicionaPedido(item, index)} // Passa o índice aqui
            >
              Adicionar ao Pedido
            </button>
            <p className="verDetalhes" onClick={() => toggleFlip(index)}>
              Ver mais
            </p>
          </div>

          {/* Verso do card */}
          <div className="cardBack">
            <p>{item.detalhes || "Sem descrição disponível."}</p>
            <p className="voltar" onClick={() => toggleFlip(index)}>
              Voltar
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardCafe;
