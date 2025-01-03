import React, { useState, useEffect } from 'react';
import "./Home.css";
import CardCafe from './../../Components/CardCafe/CardCafe';

const Home: React.FC = () => {
  const [imageSrc, setImageSrc] = useState('src/assets/inicioheader.svg');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 550) {
        setImageSrc('src/assets/cafe_mobile.jpg');
      } else {
        setImageSrc('src/assets/inicioheader.svg');
      }
    };

    // Adiciona o evento de resize
    window.addEventListener('resize', handleResize);

    // Verifica o tamanho inicial
    handleResize();

    // Remove o evento ao desmontar o componente
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='home'>
      <header className='headerHome'>
        <img className='headerImg' src={imageSrc} alt="Header" />
        <div className=''>
          <input className='btnFinalizar'   type="button" value="Finalizar pedido" />
          <input   className='btnpedidos' type="button" value="Seus pedidos" />
        </div>

      </header>
      <main className='mainHome'>
        <CardCafe />
      </main>
    </div>
  );
};

export default Home;
