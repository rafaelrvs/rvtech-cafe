import React, { useEffect, useRef } from "react";
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from "html5-qrcode";
import styles from "./QRScannerComponent.module.css";

interface QRScannerComponentProps {
  onScan: (data: string | null) => void;
  onError: (err: Error) => void;
}

const QRScannerComponent: React.FC<QRScannerComponentProps> = ({ onScan, onError }) => {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

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

    scanner.render(
      (decodedText) => {
        console.log("QR Code escaneado:", decodedText);
        onScan(decodedText); // Callback para o QR code escaneado
      },
      (error) => {
        console.error("Erro ao escanear QR Code:", error);
        onError(error); // Callback para erro
      }
    );

    scannerRef.current = scanner;

    return () => {
      scanner.clear().catch((err) => console.error("Erro ao limpar scanner:", err));
    };
  }, [onScan, onError]);

  return <div id="reader" className={styles.reader}></div>;
};

export default QRScannerComponent;
