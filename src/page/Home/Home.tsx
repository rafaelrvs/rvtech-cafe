import React, { useState, useEffect } from 'react';
import "./Home.css";
import CardCafe from './../../Components/CardCafe/CardCafe';
import { useGlobalContext } from '../../Context/GlobalContext';

const Home: React.FC = () => {
  const [imageSrc, setImageSrc] = useState('src/assets/inicioheader.svg');
  const [ativaModal,setAtivaModal] = useState(false)
  const { popUp,setPopUp } = useGlobalContext();
  useEffect(() => {

    if (!popUp) {
      setAtivaModal(true)
      
    }else{
      setAtivaModal(false)
    
    }



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
        <div className='containerBtnHeader'>
          <input className='btnFinalizar'   type="button" value="Finalizar pedido" />
          <input   className='btnpedidos ' type="button" value="Seus pedidos" />
        </div>
      </header>
      <main className='mainHome'>
        <CardCafe />
      </main>
    </div>
  );
};

export default Home;
