"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "attendee",
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

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    setMessage(data.message);

    if (data.success) {
      window.location.href = "/";
    }
  }

  return (
    <main className="page">
      <h1 className="page-title">Register</h1>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <input className="form-input" type="text" name="name" placeholder="Name" onChange={handleChange} />

          <input className="form-input" type="email" name="email" placeholder="Email" onChange={handleChange} />

          <input className="form-input" type="password" name="password" placeholder="Password" onChange={handleChange} />

          <select className="form-input" name="role" onChange={handleChange}>
            <option value="attendee">Attendee</option>
            <option value="organiser">Organiser</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" className="primary-btn">
            Register
          </button>
        </form>

        <p style={{ marginTop: "15px", color: "#ff4d8d", fontWeight: "bold" }}>
          {message}
        </p>
      </div>
    </main>
  );
}