import React, { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner, Html5QrcodeScanType, Html5QrcodeSupportedFormats } from "html5-qrcode";
import styles from "./QRScannerComponent.module.css";

interface QRScannerComponentProps {
  onScan: (data: string | null) => void;
  onError: (err: Error) => void;
}

const QRScannerComponent: React.FC<QRScannerComponentProps> = ({ onScan, onError }) => {
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
  };

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader", // ID do elemento onde o scanner será renderizado
      {
        fps: 10,
        qrbox: 250,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA], // Corrigido: usa o tipo correto da biblioteca
        formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE], // Apenas QR codes
      },
      false
    );

    scanner.render(
      (decodedText) => {
        console.log("QR Code escaneado:", decodedText);
        onScan(decodedText); // Chama o callback fornecido
      },
      (error) => {
        console.error("Erro ao escanear:", error);
        onError(error); // Chama o callback de erro fornecido
      }
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
