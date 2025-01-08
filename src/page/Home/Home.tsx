import React, { useState, useEffect } from 'react';
import "./Home.css";
import CardCafe from './../../Components/CardCafe/CardCafe';
import { useGlobalContext } from '../../Context/GlobalContext';
import ModalLogin from '../../Components/Modal/ModalLogin';
import ModalCarrinho from '../../Components/Modal/ModalCarrinho';

const Home: React.FC = () => {
  const [imageSrc, setImageSrc] = useState('public/images/inicioheader.svg');
  const [ativaModal, setAtivaModal] = useState(false);
  const [btnPedido, setBtnPedido] = useState(false);
  const { popUp, pedido, setPedido } = useGlobalContext();
  const totalPedidos = pedido.item.reduce((total, item) => total + item.quantidade, 0);
  const [valorTratado,setValorTratado] = useState("")
  useEffect(()=>{
  const totalValorCafes = pedido.item.reduce((total, item) => {
    return total + (item.valor * item.quantidade); // Multiplica quantidade pelo valor e soma ao total
  }, 0);

  console.log(pedido);
  
  

  const valorTratado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(totalValorCafes);

  setValorTratado(valorTratado)
  
  console.log(totalValorCafes);
  
  
  },[pedido])

  useEffect(() => {
    // Controla a exibição do modal com base no estado de popUp
    setAtivaModal(!popUp);
  }, [popUp]);

  useEffect(() => {
    // Função para ajustar a imagem com base no tamanho da tela
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
          {/* Exibe o total formatado */}
          <p className='totalPedidos'><span>Total:</span> {valorTratado}</p>
          <input className='btnFinalizar' type="button" value="Finalizar pedido" />
          <div className='container-btnPedidos'>
            {/* Exibe o número total de itens */}
            <span className='circle-container-btnPedidos'>{totalPedidos}</span>
            <input
              className='btnpedidos'
              type="button"
              value="Seus pedidos"
              onClick={() => setBtnPedido(!btnPedido)}
            />
          </div>
        </div>
      </header>
      <main className='mainHome'>
        {ativaModal && <ModalLogin />}
        <CardCafe />
        {btnPedido && <ModalCarrinho setBtnPedido={setBtnPedido} btnPedido={btnPedido} />}
      </main>
    </div>
  );
};

export default Home;
