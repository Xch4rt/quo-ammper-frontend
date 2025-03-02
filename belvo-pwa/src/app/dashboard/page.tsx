"use client";

import { useState } from "react";
import BelvoWidget from "../components/BelvoWidget";

export default function DashboardPage() {
  const [showWidget, setShowWidget] = useState(false);
  const [linkData, setLinkData] = useState<any>(null);

  const handleSuccess = async (data: any) => {
    setShowWidget(false);
    setLinkData(data);

    // Envía la información del link al backend
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No hay token de usuario, redirigir al login");
      return;
    }

    const res = await fetch("http://localhost:8000/belvo/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const savedLink = await res.json();
      console.log("Link guardado:", savedLink);
    } else {
      console.error("Error al guardar el link");
    }
  };

  const handleClose = () => {
    setShowWidget(false);
  };

  const handleError = (error: any) => {
    console.error("Error en el widget de Belvo:", error);
    setShowWidget(false);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Dashboard</h1>
      <button onClick={() => setShowWidget(true)}>Conectar tu banco</button>

      {showWidget && (
        <BelvoWidget
          onSuccess={handleSuccess}
          onClose={handleClose}
          onError={handleError}
        />
      )}

      {linkData && (
        <div>
          <h2>Banco Conectado!</h2>
          <pre>{JSON.stringify(linkData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
