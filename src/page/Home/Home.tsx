import React, { useState, useEffect } from 'react';
import "./Home.css";
import CardCafe from './../../Components/CardCafe/CardCafe';
import { useGlobalContext } from '../../Context/GlobalContext';
import ModalLogin from '../../Components/Modal/ModalLogin';

const Home: React.FC = () => {
  const [imageSrc, setImageSrc] = useState('/images/inicioheader.svg');
  const [ativaModal,setAtivaModal] = useState(false)
  const { popUp} = useGlobalContext();
  useEffect(() => {

    if (!popUp) {
      setAtivaModal(true)
      
    }else{
      setAtivaModal(false)
    
    }



    const handleResize = () => {
      if (window.innerWidth <= 550) {
        setImageSrc('/../images/cafe_mobile.jpg');
      } else {
        setImageSrc('/../images/inicioheader.svg');
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
        {ativaModal&&<ModalLogin/>}
        <CardCafe />
      </main>
    </div>
  );
};

export default Home;
