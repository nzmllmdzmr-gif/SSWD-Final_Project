"use client";

import { useState } from "react";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(e: any) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    setMessage(data.message);

    if (data.role === "admin") {
      window.location.href = "/admin";
    } else {
      window.location.href = "/";
    }
  }

  return (
    <main className="page">
      <h1 className="page-title">Login</h1>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <input
            className="form-input"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            className="form-input"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <button type="submit" className="primary-btn">
            Login
          </button>
        </form>

        <p
          style={{
            marginTop: "15px",
            color: "#ff4d8d",
            fontWeight: "bold",
          }}
        >
          {message}
        </p>
      </div>
    </main>
  );
}