import React, { useEffect, useState } from "react";
import styles from "./ModalLogin.module.css";
import { useQRScanner } from "../hooks/useQRScanner";
import QRScannerComponent from "../Qrcode/QRScannerComponent";
import { useGlobalContext } from "../../Context/GlobalContext";
import { v4 as uuidv4 } from "uuid";

const ModalLogin: React.FC = () => {
  const { setPopUp, setUser, user } = useGlobalContext(); // Pega `setUser` do contexto
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    mesa: "",
  });

  const { showScanner, toggleScanner, handleScan, handleError } = useQRScanner(
    (data) => setFormData((prev) => ({ ...prev, mesa: data || "" })), // Adiciona mesa ao estado local
    (err) => console.error("Erro ao escanear:", err)
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { nome, cpf, mesa } = formData;

    if (!nome || !cpf || !mesa) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    // Adiciona um novo usuário ao array do contexto global
    setUser((prevUsers) => [
      ...prevUsers,
      {
        idSessao: uuidv4(),
        nome: formData.nome,
        cpf: formData.cpf,
        mesa: formData.mesa,
      },
    ]);

    // Reseta o formulário
    setFormData({
      nome: "",
      cpf: "",
      mesa: "",
    });

    setPopUp(true); // Exibe o pop-up
  };

  useEffect(() => {
    console.log("Usuários no contexto:", user);
  }, [user]); // Observa as mudanças no estado global `user`

  return (
    <div className={styles.modalLogin}>
      <div className={styles.modalContent}>
        <h2 className={styles.dadosPedido}>Dados do Pedido</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              type="text"
              placeholder="Digite seu nome"
              value={formData.nome}
              onChange={handleChange}
              required
              minLength={3}
              aria-label="Nome completo"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="cpf">CPF</label>
            <input
              id="cpf"
              type="text"
              placeholder="Digite o CPF"
              value={formData.cpf}
              onChange={handleChange}
              required
              maxLength={11}
              aria-label="CPF"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="mesa">Mesa (QR Code)</label>
            <div className={styles.qrCodeContainer}>
              <input
                id="mesa"
                type="text"
                placeholder="Digite a mesa ou escaneie o QR Code"
                value={formData.mesa}
                onChange={handleChange}
                required
                aria-label="Número da mesa"
              />
              <button
                type="button"
                className={styles.qrButton}
                onClick={toggleScanner}
              >
                {showScanner ? "Fechar Scanner" : "Escanear QR Code"}
              </button>
            </div>
          </div>
          {showScanner && (
            <QRScannerComponent onScan={handleScan} onError={handleError} />
          )}
          <button type="submit" className={styles.submitButton}>
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalLogin;
