import { db } from "@/lib/db";
import { cookies } from "next/headers";
import CancelBookingButton from "./CancelBookingButton";

export default async function BookingsPage() {
  const cookieStore = await cookies();
  const userName = cookieStore.get("userName")?.value;

  if (!userName) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#000",
          color: "white",
          padding: "40px",
        }}
      >
        <h1>Please login first</h1>
      </main>
    );
  }

  const [users]: any = await db.query(
    "SELECT id FROM users WHERE name = ?",
    [decodeURIComponent(userName)]
  );

  if (users.length === 0) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#000",
          color: "white",
          padding: "40px",
        }}
      >
        <h1>User not found</h1>
      </main>
    );
  }

  const userId = users[0].id;

  const [bookings]: any = await db.query(
    `
    SELECT 
      bookings.id,
      concerts.artist,
      concerts.venue,
      concerts.city,
      concerts.poster_url,
      bookings.ticket_type,
      bookings.quantity,
      bookings.unit_price,
      bookings.total_price,
      bookings.booking_date
    FROM bookings
    JOIN concerts
      ON bookings.concert_id = concerts.id
    WHERE bookings.user_id = ?
    ORDER BY bookings.booking_date DESC
    `,
    [userId]
  );

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
        🎟 My Bookings
      </h1>

      {bookings.length === 0 ? (
        <p style={{ textAlign: "center", color: "#aaa" }}>
          No bookings yet.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {bookings.map((item: any) => (
            <div
              key={item.id}
              style={{
                background: "#111",
                borderRadius: "16px",
                overflow: "hidden",
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
                <h2>{item.artist}</h2>

                <p style={{ color: "#aaa" }}>
                  {item.venue}, {item.city}
                </p>

                <p>Ticket Type: {item.ticket_type}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Unit Price: €{item.unit_price}</p>

                <p style={{ color: "#ff4d8d", fontWeight: "bold" }}>
                  Total: €{item.total_price}
                </p>

                <p style={{ fontSize: "12px", color: "#aaa" }}>
                  {String(item.booking_date)}
                </p>

                <CancelBookingButton bookingId={item.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}