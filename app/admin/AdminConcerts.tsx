"use client";

import { useState } from "react";

export default function AdminConcerts({ concerts }: any) {
  const [form, setForm] = useState({
    id: "",
    artist: "",
    venue: "",
    city: "",
    concert_date: "",
    price: "",
    tickets_available: "",
    description: "",
    poster_url: "",
  });

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function clearForm() {
    setForm({
      id: "",
      artist: "",
      venue: "",
      city: "",
      concert_date: "",
      price: "",
      tickets_available: "",
      description: "",
      poster_url: "",
    });
  }

  function fillForm(item: any) {
    setForm({
      id: item.id,
      artist: item.artist,
      venue: item.venue,
      city: item.city,
      concert_date: item.concert_date,
      price: item.price,
      tickets_available: item.tickets_available,
      description: item.description || "",
      poster_url: item.poster_url || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function addConcert() {
    const res = await fetch("/api/concerts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message);
    window.location.reload();
  }

  async function updateConcert() {
    if (!form.id) {
      alert("Please click Edit first.");
      return;
    }

    const res = await fetch("/api/concerts", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message);
    window.location.reload();
  }

  async function deleteConcert(id: number) {
    const confirmDelete = confirm("Are you sure you want to delete this concert?");

    if (!confirmDelete) return;

    const res = await fetch("/api/concerts", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();
    alert(data.message);
    window.location.reload();
  }

  return (
    <main
      style={{
        background: "#000",
        minHeight: "100vh",
        color: "white",
        padding: "30px",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Admin Concert Management
      </h1>

      <section
        style={{
          maxWidth: "700px",
          margin: "0 auto 40px auto",
          background: "#111",
          padding: "25px",
          borderRadius: "18px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        }}
      >
        <h2>Add / Update Concert</h2>

        {[
          "artist",
          "venue",
          "city",
          "concert_date",
          "price",
          "tickets_available",
          "description",
          "poster_url",
        ].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={`Enter ${field}`}
            value={(form as any)[field]}
            onChange={handleChange}
            style={{
              width: "100%",
              marginBottom: "12px",
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              outline: "none",
              fontSize: "14px",
            }}
          />
        ))}

        <button onClick={addConcert} style={buttonStyle}>
          Add Concert
        </button>

        <button onClick={updateConcert} style={buttonStyle}>
          Update Concert
        </button>

        <button
          onClick={clearForm}
          style={{
            ...buttonStyle,
            background: "#333",
          }}
        >
          Clear Form
        </button>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {concerts.map((item: any) => (
          <div
            key={item.id}
            style={{
              background: "#111",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}
          >
            <img
              src={item.poster_url}
              alt={item.artist}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
              }}
            />

            <div style={{ padding: "15px" }}>
              <h3>{item.artist}</h3>
              <p style={{ color: "#aaa" }}>
                {item.venue}, {item.city}
              </p>
              <p>{item.concert_date}</p>
              <p style={{ color: "#ff4d8d", fontWeight: "bold" }}>
                €{item.price}
              </p>
              <p style={{ color: "#aaa" }}>
                Tickets: {item.tickets_available}
              </p>

              <button onClick={() => fillForm(item)} style={buttonStyle}>
                Edit
              </button>

              <button
                onClick={() => deleteConcert(item.id)}
                style={{
                  ...buttonStyle,
                  background: "#d9534f",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

const buttonStyle = {
  width: "100%",
  marginTop: "10px",
  padding: "10px",
  borderRadius: "999px",
  border: "none",
  background: "linear-gradient(45deg, #ff4d8d, #ff7ab6)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};