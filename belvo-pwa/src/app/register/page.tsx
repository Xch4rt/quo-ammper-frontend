"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f7f7f7",
    fontFamily: "Inter, sans-serif",
    margin: 0,
    padding: 0,
    boxSizing: "border-box" as const, 
  };

const cardStyle = {
  backgroundColor: "#fff",
  padding: "2rem",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  width: "320px",
  boxSizing: "border-box" as const,
};

const inputStyle = {
  width: "100%",
  padding: "0.75rem",
  marginBottom: "1rem",
  border: "1px solid #ddd",
  borderRadius: "6px",
  fontSize: "1rem",
  textAlign: "left" as const,
  boxSizing: "border-box" as const,
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

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.access_token) {
          localStorage.setItem("token", data.access_token);
          router.push("/dashboard");
        } else {
          router.push("/login");
        }
      } else {
        const errorMsg = await res.text();
        alert("Error en el registro: " + errorMsg);
      }
    } catch (error) {
      console.error("Error de red/servidor:", error);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={{ textAlign: "center", marginBottom: "1.5rem", fontWeight: "600" }}>
          Registro
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            required
          />
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
          <button type="submit" style={buttonStyle}>Crear cuenta</button>
        </form>
        <p style={{ marginTop: "1rem", textAlign: "center", fontSize: "0.9rem" }}>
          ¿Ya tienes una cuenta?{" "}
          <Link href="/login" style={{ color: "#0AB0D8", textDecoration: "none" }}>
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}