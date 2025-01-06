import React from "react";
import QRScanner from "react-qr-scanner";
import styles from "./QRScannerComponent.module.css";

interface QRScannerComponentProps {
  onScan: (data: string | null) => void;
  onError: (err: Error) => void;
}

const QRScannerComponent: React.FC<QRScannerComponentProps> = ({ onScan, onError }) => {
  return (
    <div className={styles.scannerContainer}>
<QRScanner
  delay={300}
  style={{ width: "100%" }}
  facingMode="environment" as any // Ignora a verificação de tipo
  onError={handleError}
  onScan={handleScan}
/>

    </div>
  );
};

export default QRScannerComponent;
