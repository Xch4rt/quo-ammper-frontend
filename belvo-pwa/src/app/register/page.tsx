"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        // Si tu endpoint retorna el token, lo guardamos en localStorage
        const data = await res.json();
        if (data.access_token) {
          localStorage.setItem("token", data.access_token);
          // Si tu backend retorna un refresh_token:
          if (data.refresh_token) {
            localStorage.setItem("refresh_token", data.refresh_token);
          }
          router.push("/dashboard");
        } else {
          // Si NO retorna token, simplemente redirige a login o donde prefieras
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
    <div style={{ padding: "1rem" }}>
      <h1>Registro</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Crear cuenta</button>
      </form>
    </div>
  );
}
