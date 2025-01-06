import { useState } from "react";

export const useQRScanner = (
  onScan: (data: string | null) => void,
  onError: (err: Error) => void
) => {
  const [showScanner, setShowScanner] = useState(false);

  // Alterna a exibição do scanner
  const toggleScanner = () => {
    setShowScanner((prev) => !prev);
  };

  // Lida com o evento de escaneamento
  const handleScan = (data: string | null) => {
    if (data) {
      onScan(data);
      setShowScanner(false); // Fecha o scanner após capturar o QR Code
    }
  };

  // Lida com erros no scanner
  const handleError = (err: Error) => {
    console.error("Erro no scanner:", err);
    onError(err);
  };

  return { showScanner, toggleScanner, handleScan, handleError };
};
