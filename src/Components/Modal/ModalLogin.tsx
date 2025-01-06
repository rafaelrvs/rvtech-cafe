import React, { useState } from "react";
import styles from "./ModalLogin.module.css";

import { useQRScanner } from "../hooks/useQRScanner";
import QRScannerComponent from "../Qrcode/QRScannerComponent";


const ModalLogin: React.FC = () => {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [mesa, setMesa] = useState("");

  const { showScanner, toggleScanner, handleScan, handleError } = useQRScanner(
    (data) => setMesa(data || ""),
    (err) => console.error("Erro ao escanear:", err)
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!nome || !cpf || !mesa) {
      alert("Por favor, preencha todos os campos!");
      return;
    }
    console.log("Formulário enviado:", { nome, cpf, mesa });
    alert("Formulário enviado com sucesso!");
  };

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
              value={nome}
              onChange={(e) => setNome(e.target.value)}
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
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
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
                value={mesa}
                onChange={(e) => setMesa(e.target.value)}
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
