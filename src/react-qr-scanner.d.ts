declare module 'react-qr-scanner' {
    import { FC } from 'react';
  
    interface QRScannerProps {
      delay?: number;
      style?: React.CSSProperties;
      onError: (err: Error) => void;
      onScan: (data: string | null) => void;
    }
  
    const QRScanner: FC<QRScannerProps>;
    export default QRScanner;
  }
  