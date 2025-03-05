/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef } from "react";
import Cookies from 'js-cookie';

interface BelvoWidgetProps {
  onSuccess: (link: string, institution: string) => void;
  onExit: (data: any) => void;
  onEvent: (data: any) => void;
}

export default function BelvoWidget({ onSuccess, onExit, onEvent }: BelvoWidgetProps) {
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Función para cargar el script de Belvo
    const loadBelvoScript = () => {
      return new Promise<void>((resolve, reject) => {
        // Verificar si el script ya está cargado
        if (document.querySelector('script[src="https://cdn.belvo.io/belvo-widget-1-stable.js"]')) {
          console.log("Script de Belvo ya cargado");
          scriptLoadedRef.current = true;
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = "https://cdn.belvo.io/belvo-widget-1-stable.js";
        script.async = true;
        script.onload = () => {
          console.log("Script de Belvo cargado exitosamente");
          scriptLoadedRef.current = true;
          resolve();
        };
        script.onerror = (error) => {
          console.error("Error cargando el script de Belvo:", error);
          reject(error);
        };
        document.body.appendChild(script);
      });
    };

    // Función para obtener el access_token
    const getAccessToken = async () => {
      try {
        const token = Cookies.get('token');
        if (!token) {
          throw new Error("No hay token de autenticación");
        }

        console.log("Solicitando access token...");
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/belvo/access-token`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error obteniendo el access token: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log("Access token recibido:", data);
        return data.access;
      } catch (error) {
        console.error("Error obteniendo access token:", error);
        throw error;
      }
    };

    // Función para iniciar el widget
    const initializeWidget = async () => {
      try {
        // 1. Cargar el script
        await loadBelvoScript();
        
        // 2. Esperar un poco para asegurarnos de que belvoSDK esté disponible
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // 3. Verificar que belvoSDK esté disponible
        if (typeof window.belvoSDK === 'undefined') {
          throw new Error("belvoSDK no está disponible después de cargar el script");
        }
        
        // 4. Obtener el token
        const accessToken = await getAccessToken();
        
        // 5. Iniciar el widget
        console.log("Iniciando widget con token:", accessToken);
        window.belvoSDK.createWidget(accessToken, {
          callback: (link: string, institution: string) => {
            console.log("Callback de éxito recibido:", { link, institution });
            onSuccess(link, institution);
          },
          onExit: (data: any) => {
            console.log("Callback de salida recibido:", data);
            onExit(data);
          },
          onEvent: (data: any) => {
            console.log("Callback de evento recibido:", data);
            onEvent(data);
          }
        }).build();
        
        console.log("Widget inicializado correctamente");
      } catch (error) {
        console.error("Error inicializando el widget:", error);
      }
    };

    // Iniciar todo el proceso
    initializeWidget();

    // Cleanup
    return () => {
      // No necesitamos eliminar el script, pero podríamos hacer otras tareas de limpieza
    };
  }, [onSuccess, onExit, onEvent]);

  return <div id="belvo" style={{ width: '100%', height: '100%', minHeight: '300px' }}></div>;
}

// Declaración para TypeScript
declare global {
  interface Window {
    belvoSDK: any;
  }
}