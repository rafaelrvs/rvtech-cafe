import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import styles from "./QRScannerComponent.module.css";

interface QRScannerComponentProps {
  onScan: (data: string | null) => void;
  onError: (err: Error) => void;
}

const QRScannerComponent: React.FC<QRScannerComponentProps> = ({ onScan, onError }) => {
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");
  const scannerRef = useRef<Html5Qrcode | null>(null);

  // Inicia o scanner com a configuração de câmera fornecida
  const startScanner = (mode: "environment" | "user") => {
    const cameraConfig = {
      facingMode: mode, // Define a câmera (frontal ou traseira)
    };

    scannerRef.current
      ?.start(
        cameraConfig,
        {
          fps: 10,
          qrbox: 250, // Define a área de detecção do QR Code
        },
        (decodedText) => {
          console.log("QR Code escaneado:", decodedText);
          onScan(decodedText); // Callback para texto do QR Code
        },
        (errorMessage) => {
          console.error("Erro ao escanear QR Code:", errorMessage);
          onError(new Error(errorMessage)); // Transforma string de erro em objeto Error
        }
      )
      .catch((err) => console.error("Erro ao iniciar scanner:", err));
  };

  // Para o scanner
  const stopScanner = () => {
    scannerRef.current?.stop().catch((err) => console.error("Erro ao parar scanner:", err));
  };

  useEffect(() => {
    scannerRef.current = new Html5Qrcode("reader"); // Inicializa o scanner

    startScanner(facingMode); // Inicia o scanner com a câmera padrão (traseira)

    return () => {
      stopScanner(); // Para o scanner ao desmontar o componente
    };
  }, [facingMode]);

  // Alterna entre câmera frontal e traseira
  const toggleCamera = () => {
    stopScanner(); // Para o scanner atual
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment")); // Alterna a câmera
  };

  return (
    <div className={styles.scannerContainer}>
      <div id="reader" className={styles.reader}></div>
      <button className={styles.toggleButton} onClick={toggleCamera}>
        Alternar para {facingMode === "environment" ? "Câmera Frontal" : "Câmera Traseira"}
      </button>
    </div>
  );
};

export default QRScannerComponent;
