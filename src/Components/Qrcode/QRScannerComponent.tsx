import React, { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from "html5-qrcode";
import styles from "./QRScannerComponent.module.css";

interface QRScannerComponentProps {
  onScan: (data: string | null) => void;
  onError: (err: Error) => void;
}

const QRScannerComponent: React.FC<QRScannerComponentProps> = ({ onScan, onError }) => {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment"); // Câmera traseira padrão

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
  };

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: 250,
        formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
      },
      false
    );

    const config = {
      constraints: {
        video: {
          facingMode: facingMode, // Define a câmera atual (traseira ou frontal)
        },
      },
    };

    scanner.render(
      (decodedText) => {
        console.log("QR Code escaneado:", decodedText);
        onScan(decodedText); // Callback para o texto do QR Code
      },
      (error) => {
        const errorObject = typeof error === "string" ? new Error(error) : error;
        console.error("Erro ao escanear QR Code:", errorObject);
        onError(errorObject);
      },
      config // Passa a configuração de câmera para o scanner
    );

    scannerRef.current = scanner;

    return () => {
      scanner.clear().catch((err) => console.error("Erro ao limpar scanner:", err));
    };
  }, [facingMode, onScan, onError]);

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
