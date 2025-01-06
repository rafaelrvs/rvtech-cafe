import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import styles from "./QRScannerComponent.module.css";

interface QRScannerComponentProps {
  onScan: (data: string | null) => void;
  onError: (err: Error) => void;
}

const QRScannerComponent: React.FC<QRScannerComponentProps> = ({ onScan, onError }) => {
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");
  const scannerRef = useRef<Html5Qrcode | null>(null);

  const startScanner = (mode: "environment" | "user") => {
    const cameraConfig = {
      facingMode: mode, // Define a câmera
    };

    scannerRef.current
      ?.start(
        cameraConfig,
        {
          fps: 10,
          qrbox: 250,
          supportedScanFormats: [Html5QrcodeSupportedFormats.QR_CODE],
        },
        (decodedText) => {
          console.log("QR Code escaneado:", decodedText);
          onScan(decodedText); // Callback para o texto do QR Code
        },
        (errorMessage) => {
          console.error("Erro ao escanear QR Code:", errorMessage);
          onError(new Error(errorMessage));
        }
      )
      .catch((err) => console.error("Erro ao iniciar scanner:", err));
  };

  const stopScanner = () => {
    scannerRef.current?.stop().catch((err) => console.error("Erro ao parar scanner:", err));
  };

  useEffect(() => {
    scannerRef.current = new Html5Qrcode("reader"); // Inicializa o scanner

    startScanner(facingMode); // Inicia com a câmera padrão

    return () => {
      stopScanner(); // Para o scanner ao desmontar o componente
    };
  }, [facingMode]);

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
