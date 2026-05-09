"use client";

import { useState } from "react";

type Concert = {
  id: number;
  artist: string;
  venue: string;
  city: string;
  concert_date: string;
  price: number;
  tickets_available: number;
  description: string;
  poster_url: string;
};

const ticketPrices: any = {
  VIP1: 200,
  VIP2: 170,
  VIP3: 140,
  VIP4: 110,
  VIP5: 80,
  VIP6: 50,
};

export default function ConcertList({ concerts }: { concerts: Concert[] }) {
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [ticketTypes, setTicketTypes] = useState<any>({});
  const [quantities, setQuantities] = useState<any>({});

  return (
    <main
      style={{
        background: "#000",
        minHeight: "100vh",
        padding: "20px",
        color: "white",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        🎤 Live Concerts
      </h1>

      <div style={{ textAlign: "center", marginBottom: "25px" }}>
        <a href="/login">
          <button style={topButtonStyle}>Login</button>
        </a>

        <a href="/register">
          <button style={topButtonStyle}>Register</button>
        </a>

        <a href="/bookings">
          <button style={topButtonStyle}>My Bookings</button>
        </a>

        <button
          style={topButtonStyle}
          onClick={async () => {
            await fetch("/api/logout", {
              method: "POST",
            });

            window.location.reload();
          }}
        >
          Logout
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {concerts.map((item) => {
          const selectedType = ticketTypes[item.id] || "VIP1";
          const quantity = quantities[item.id] || 1;
          const totalPrice = ticketPrices[selectedType] * quantity;

          return (
            <div
              key={item.id}
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                background: "#111",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              }}
            >
              <img
                src={item.poster_url}
                alt={item.artist}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />

              <div style={{ padding: "15px" }}>
                <h3>{item.artist}</h3>

                <p style={{ color: "#aaa" }}>
                  {item.venue}, {item.city}
                </p>

                <p style={{ fontSize: "12px" }}>{item.concert_date}</p>

                <p style={{ color: "#aaa" }}>
                  Tickets left: {item.tickets_available}
                </p>

                <select
                  value={selectedType}
                  onChange={(e) =>
                    setTicketTypes({
                      ...ticketTypes,
                      [item.id]: e.target.value,
                    })
                  }
                  style={selectStyle}
                >
                  <option value="VIP1">VIP1 - Inner Field (€200)</option>
                  <option value="VIP2">VIP2 - Front Area (€170)</option>
                  <option value="VIP3">VIP3 - Lower Stand (€140)</option>
                  <option value="VIP4">VIP4 - Middle Stand (€110)</option>
                  <option value="VIP5">VIP5 - Upper Stand (€80)</option>
                  <option value="VIP6">VIP6 - Back Stand (€50)</option>
                </select>

                <select
                  value={quantity}
                  onChange={(e) =>
                    setQuantities({
                      ...quantities,
                      [item.id]: Number(e.target.value),
                    })
                  }
                  style={selectStyle}
                >
                  <option value={1}>1 Ticket</option>
                  <option value={2}>2 Tickets</option>
                  <option value={3}>3 Tickets</option>
                  <option value={4}>4 Tickets</option>
                  <option value={5}>5 Tickets</option>
                </select>

                <p style={{ color: "#ff4d8d", fontWeight: "bold" }}>
                  Total: €{totalPrice}
                </p>

                <button
                  disabled={loadingId === item.id || item.tickets_available <= 0}
                  style={{
                    width: "100%",
                    marginTop: "10px",
                    padding: "10px",
                    borderRadius: "999px",
                    border: "none",
                    background:
                      loadingId === item.id || item.tickets_available <= 0
                        ? "#777"
                        : "linear-gradient(45deg, #ff4d8d, #ff7ab6)",
                    color: "white",
                    fontWeight: "bold",
                    cursor:
                      loadingId === item.id || item.tickets_available <= 0
                        ? "not-allowed"
                        : "pointer",
                  }}
                  onClick={async () => {
                    setLoadingId(item.id);

                    try {
                      const res = await fetch("/api/bookings", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          concert_id: item.id,
                          ticket_type: selectedType,
                          quantity: quantity,
                        }),
                      });

                      const data = await res.json();
                      alert(data.message);

                      if (res.ok) {
                        window.location.reload();
                      }
                    } catch (err) {
                      alert("Request failed");
                      console.error(err);
                    }

                    setLoadingId(null);
                  }}
                >
                  {item.tickets_available <= 0
                    ? "Sold Out"
                    : loadingId === item.id
                    ? "Processing..."
                    : "Book Ticket"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

const topButtonStyle = {
  margin: "0 8px",
  padding: "10px 20px",
  borderRadius: "999px",
  border: "none",
  background: "linear-gradient(45deg, #ff4d8d, #ff7ab6)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

const selectStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "8px",
  border: "none",
};