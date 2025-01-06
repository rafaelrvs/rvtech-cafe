import React, { useState } from "react";
import QRScanner from "react-qr-scanner"; // Biblioteca para escanear QR Code
import styles from "./ModalLogin.module.css";

const ModalLogin: React.FC = () => {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [mesa, setMesa] = useState("");
  const [showScanner, setShowScanner] = useState(false); // Controle do scanner

  // Callback quando o QR Code é escaneado
  const handleScan = (data: string | null) => {
    if (data) {
      setMesa(data); // Atualiza o valor da mesa
      setShowScanner(false); // Fecha o scanner
    }
  };

  const handleError = (err: Error) => {
    console.error("Erro ao escanear QR Code:", err);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Nome:", nome, "CPF:", cpf, "Mesa:", mesa);
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
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="cpf">CPF</label>
            <input
              id="cpf"
              type="number"
              placeholder="Digite o CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
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
              />
              <button
                type="button"
                className={styles.qrButton}
                onClick={() => setShowScanner(!showScanner)}
              >
                Escanear QR Code
              </button>
            </div>
          </div>
          {showScanner && (
            <div className={styles.scanner}>
              <QRScanner
                delay={300}
                style={{ width: "100%" }}
                onError={handleError}
                onScan={handleScan}
              />
              <button
                type="button"
                className={styles.closeScanner}
                onClick={() => setShowScanner(false)}
              >
                Fechar Scanner
              </button>
            </div>
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
