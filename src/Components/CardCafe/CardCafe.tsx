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
  const {user, pedido, setPedido } = useGlobalContext(); // Pega `pedido` e `setPedido` do contexto

  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [idUser, setIdUser] = useState<string>("");

  useEffect(()=>{
    user.forEach((item)=>{
      setIdUser(item.cpf)
    })
  },[user[1]])


  const toggleFlip = (index: number) => {
    setFlippedCards((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handlerAdicionaPedido = (item: Cafe,) => {
  console.log(idUser);
  
      setPedido((prevPedido) => ({
        ...prevPedido,
        cliente:idUser,
        item: [
          ...prevPedido.item,
          {
            nome: item.nome,
            valor: item.preco,
            promocao: false, // Adicione lógica para promoção se necessário
            valorPromocao: 0,
            descricao:item.detalhes,
          },
        ],
      }));
    }
      console.log(pedido);



  return (
    <div className="cardCafe">
      {dataCafe.map((item: Cafe, index: number) => (
        <div
          key={index}
          className={`contentCardCafe ${flippedCards.includes(index) ? 'flipped' : ''}`}
        >
          {/* Frente do card */}
          <div className="cardFront">
            <img className="imgCardCafe" src={item.img} alt={item.nome} />
            <h1 className="nome">{item.nome}</h1>
            <h2 className="preco">R$: {item.preco.toFixed(2)}</h2>
            <button
              className="btnCardCafe"
              onClick={() => handlerAdicionaPedido(item)} 
            >
              Adicionar ao Pedido
            </button>
            <p
              className="verDetalhes"
              onClick={() => toggleFlip(index)}
            >
              Ver mais
            </p>
          </div>

          {/* Verso do card */}
          <div className="cardBack">
            <p>{item.detalhes || 'Sem descrição disponível.'}</p>
            <p
              className="voltar"
              onClick={() => toggleFlip(index)}
            >
              Voltar
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardCafe;
