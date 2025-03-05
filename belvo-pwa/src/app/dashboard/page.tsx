/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import BelvoWidget from "../components/BelvoWidget";
import KPIWidget from "../components/KPIWidget";
import Cookies from "js-cookie";
import TransactionsTable from "../components/Transactions";

const containerStyle = {
  padding: "2rem",
  backgroundColor: "#f7f7f7",
  minHeight: "100vh",
  fontFamily: "Inter, sans-serif",
};

const cardStyle = {
  backgroundColor: "#fff",
  padding: "2rem",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  maxWidth: "600px",
  margin: "0 auto",
};

const buttonStyle = {
  padding: "0.75rem 1.5rem",
  backgroundColor: "#0AB0D8",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "1rem",
  fontWeight: "500",
  marginBottom: "1rem",
};

const logoutButtonStyle = {
  padding: "0.5rem 1rem",
  backgroundColor: "#fff",
  color: "#0AB0D8",
  border: "2px solid #0AB0D8",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "0.9rem",
  fontWeight: "600",
};


export default function DashboardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showWidget, setShowWidget] = useState(false);
  const [linkData, setLinkData] = useState<{ link: string; institution: string } | null>(null);
  const [loadingBalance, setLoadingBalance] = useState(false);
  const [balanceData, setBalanceData] = useState<{
    incomes: number;
    expenses: number;
    balance: number;
    transactions: Array<{
      id: string;
      amount: number;
      status: "PENDING" | "COMPLETED";
      type: "INFLOW" | "OUTFLOW";
      category: string;
      reference: string;
      value_date: string;
      created_at: string;
      description: string;
      currency: string;
    }>;
  } | null>(null);
  const [pollingAttempts, setPollingAttempts] = useState(0);
  const MAX_POLLING_ATTEMPTS = 5;

  useEffect(() => {
    const token = Cookies.get('token');
    console.log("Dashboard: Token encontrado:", token ? "Sí" : "No");

    if (!token) {
      window.location.href = "/login";
      return;
    }
    setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    const fetchBalanceData = async () => {
      if (!linkData?.link) return;

      try {
        setLoadingBalance(true);
        const token = Cookies.get('token');
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/belvo/balance?link_id=${linkData.link}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error al obtener el balance: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.transactions.length === 0 && pollingAttempts < MAX_POLLING_ATTEMPTS) {
          setTimeout(() => {
            setPollingAttempts(prev => prev + 1);
          }, 3000);
        } else {
          setBalanceData(data);
          setPollingAttempts(0);
        }
      } catch (error) {
        console.error("Error actualizando datos de balance:", error);
      } finally {
        setLoadingBalance(false);
      }
    };

    if (linkData?.link) {
      fetchBalanceData();
    }
  }, [linkData, pollingAttempts]);

  if (!isLoggedIn) {
    console.log("Dashboard: Renderizando null mientras se verifica autenticación...");
    return null;
  }

  const handleSuccess = async (link: string, institution: string) => {
    console.log("Link creado exitosamente:", { link, institution });
    setShowWidget(false);

    const newLinkData = { link, institution };

    const token = Cookies.get('token');
    if (!token) {
      console.error("No hay token de usuario");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/belvo/links`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newLinkData),
        }
      );
      if (!res.ok) {
        throw new Error("Error al guardar el link");
      }
      const savedLink = await res.json();
      setLinkData({ link: savedLink.id, institution: savedLink.institution });
      console.log("Link guardado:", savedLink);
    } catch (error) {
      console.error("Error en la comunicación con el backend:", error);
    }
  };

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('refresh_token');
    window.location.href = "/login";
  };

  const handleExit = (data: any) => {
    console.log("Widget cerrado:", data);
    setShowWidget(false);
  };

  const handleEvent = (data: any) => {
    console.log("Evento del widget:", data);
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ marginBottom: "1.5rem" }}>Dashboard</h1>
          <button onClick={handleLogout} style={logoutButtonStyle}>
            Cerrar sesión
          </button>
        </div>


        {!linkData && (
          <button onClick={() => setShowWidget(true)} style={buttonStyle}>
            Conectar tu banco
          </button>
        )}

        {showWidget && (
          <BelvoWidget
            onSuccess={handleSuccess}
            onExit={handleExit}
            onEvent={handleEvent}
          />
        )}

        {linkData && (
          <>
            <div>
              <h2>Banco Conectado!</h2>
            </div>

            {loadingBalance ? (
              <p>Cargando datos financieros...</p>
            ) : (
              <>
                <KPIWidget
                  incomes={balanceData?.incomes ?? 0}
                  expenses={balanceData?.expenses ?? 0}
                  balance={balanceData?.balance ?? 0}
                />

                {balanceData && balanceData.transactions && balanceData.transactions.length > 0 ? (
                  <TransactionsTable transactions={balanceData.transactions} />
                ) : (
                  <p>No se encontraron transacciones</p>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
