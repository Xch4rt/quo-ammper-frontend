"use client";

import { useEffect } from "react";

interface BelvoWidgetProps {
  onSuccess: (data: any) => void;
  onClose: () => void;
  onError: (error: any) => void;
}

export default function BelvoWidget({ onSuccess, onClose, onError }: BelvoWidgetProps) {
  useEffect(() => {
    const loadWidget = () => {
      // Si el script ya está cargado, inicializa de inmediato
      if (window.BelvoConnectWidget) {
        initializeWidget();
      } else {
        const script = document.createElement("script");
        // URL del widget (verifica la versión en la doc oficial de Belvo)
        script.src = "https://cdn.belvo.com/widget/v2/belvo-widget.js";
        script.async = true;
        script.onload = initializeWidget;
        document.body.appendChild(script);
      }
    };

    const initializeWidget = () => {
      // @ts-expect-error BelvoConnectWidget is not defined in the window object
      const widget = new window.BelvoConnectWidget({
        publicKey: "YOUR_PUBLIC_KEY", // tu public key de Belvo
        env: "sandbox",               // o "production" según tu caso
        onSuccess: (data: any) => {
          onSuccess(data);
        },
        onClose: () => {
          onClose();
        },
        onError: (error: any) => {
          onError(error);
        },
      });
      widget.open();
    };

    loadWidget();
  }, [onSuccess, onClose, onError]);

  return null; // Este componente no muestra nada en pantalla
}
