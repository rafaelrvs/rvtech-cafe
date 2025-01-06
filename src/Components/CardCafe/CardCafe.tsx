import React, { useState } from 'react';
import "./CardCafe.css";
import { dataCafe } from '../../data/data';

interface Cafe {
  img: string;
  nome: string;
  preco: number; // Armazenado como número para facilitar cálculos
  detalhes: string;
}

const CardCafe: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const toggleFlip = (index: number) => {
    setFlippedCards((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="cardCafe">
     {dataCafe.map((item: Cafe , index: number) => (
        <div
          key={index}
          className={`contentCardCafe ${flippedCards.includes(index) ? 'flipped' : ''}`}
        >
          {/* Frente do card */}
          <div className="cardFront">
            <img className="imgCardCafe" src={item.img} alt={item.nome} />
            <h1 className="nome">{item.nome}</h1>
            <h2 className="preco">R$: {item.preco}</h2>
            <button className="btnCardCafe">Adicionar ao Pedido</button>
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
