"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Cookies from 'js-cookie';

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f7f7f7",
  fontFamily: "Inter, sans-serif",
  margin: 0,
  padding: 0,
  boxSizing: "border-box" as const, // Se aplica al contenedor
};

const cardStyle = {
  backgroundColor: "#fff",
  padding: "2rem",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  width: "320px",
  boxSizing: "border-box" as const, // Se asegura que el ancho incluya padding y border
};

const inputStyle = {
  width: "100%",
  padding: "0.75rem",
  marginBottom: "1rem",
  border: "1px solid #ddd",
  borderRadius: "6px",
  fontSize: "1rem",
  textAlign: "left" as const,       // Alinea el texto a la izquierda
  boxSizing: "border-box" as const, // Aplica box-sizing al input
};

const buttonStyle = {
  width: "100%",
  padding: "0.75rem",
  backgroundColor: "#0AB0D8",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "1rem",
  fontWeight: "500",
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });
  
      if (res.ok) {
        const data = await res.json();
        Cookies.set('token', data.access_token, { expires: 7 }); // expira en 7 días
        Cookies.set('refresh_token', data.refresh_token, { expires: 7 });
        window.location.href = "/dashboard";
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error de red/servidor:", error);
    }
  };
  

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={{ textAlign: "center", marginBottom: "1.5rem", fontWeight: 600 }}>
          Iniciar Sesión
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
          />
          <button type="submit" style={buttonStyle}>Entrar</button>
        </form>
        <p style={{ marginTop: "1rem", textAlign: "center", fontSize: "0.9rem" }}>
          ¿No tienes cuenta?{" "}
          <Link href="/register" style={{ color: "#0AB0D8", textDecoration: "none" }}>
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
