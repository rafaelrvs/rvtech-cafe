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
        constraints={{
          video: { facingMode: "environment" },
        }}
        onError={onError}
        onScan={onScan}
      />
    </div>
  );
};

export default QRScannerComponent;
