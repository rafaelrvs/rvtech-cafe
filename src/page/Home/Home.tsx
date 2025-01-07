import React, { useState, useEffect } from 'react';
import "./Home.css";
import CardCafe from './../../Components/CardCafe/CardCafe';
import { useGlobalContext } from '../../Context/GlobalContext';
import ModalLogin from '../../Components/Modal/ModalLogin';

const Home: React.FC = () => {
  const [imageSrc, setImageSrc] = useState('public/images/inicioheader.svg');
  const [ativaModal, setAtivaModal] = useState(false)
  const { popUp,pedido,setPedido} = useGlobalContext();
  const totalPedidos = pedido.item.reduce((total, item) => total + item.quantidade, 0);
  const totalValor = pedido.item.reduce((total, item) => total + item.valor, 0);
  const valorTratado = totalValor.toFixed(2);



  useEffect(() => {
    if (!popUp) {
      setAtivaModal(true)

    } else {
      setAtivaModal(false)

    }
  }, [popUp])

  useEffect(() => {

    if (!popUp) {
      setAtivaModal(true)

    } else {
      setAtivaModal(false)

    }



    const handleResize = () => {
      if (window.innerWidth <= 900) {
        setImageSrc('public/images/cafe_mobile.jpg');
      } else {
        setImageSrc('public/images/inicioheader.svg');
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
          <p className='totalPedidos'><span>Total:</span>R$ {valorTratado}</p>
          <input className='btnFinalizar' type="button" value="Finalizar pedido" />
          <div className='container-btnPedidos'>
            <span className='circle-container-btnPedidos'>{totalPedidos}</span>
          <input className='btnpedidos ' type="button" value="Seus pedidos" />
          </div>
        </div>
      </header>
      <main className='mainHome'>
        {ativaModal && <ModalLogin />}
        <CardCafe />
      </main>
    </div>
  );
};

export default Home;
