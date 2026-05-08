import { db } from "@/lib/db";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const cookieStore = await cookies();
    const userName = cookieStore.get("userName")?.value;

    if (!userName) {
      return Response.json(
        { message: "Please login first" },
        { status: 401 }
      );
    }

    const [users]: any = await db.query(
      "SELECT id FROM users WHERE name = ?",
      [decodeURIComponent(userName)]
    );

    if (users.length === 0) {
      return Response.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const userId = users[0].id;
    const concertId = Number(body.concert_id);
    const quantity = 1;

    const [concerts]: any = await db.query(
      "SELECT price, tickets_available FROM concerts WHERE id = ?",
      [concertId]
    );

    if (concerts.length === 0) {
      return Response.json(
        { message: "Concert not found" },
        { status: 404 }
      );
    }

    if (concerts[0].tickets_available <= 0) {
      return Response.json(
        { message: "No tickets available" },
        { status: 400 }
      );
    }

    const totalPrice = Number(concerts[0].price);

    await db.query(
      "INSERT INTO bookings (user_id, concert_id, quantity, total_price) VALUES (?, ?, ?, ?)",
      [userId, concertId, quantity, totalPrice]
    );

    await db.query(
      "UPDATE concerts SET tickets_available = tickets_available - 1 WHERE id = ?",
      [concertId]
    );

    return Response.json({ message: "Booking successful!" });
  } catch (error) {
    console.error("BOOKING ERROR:", error);

    return Response.json(
      { message: "Booking failed" },
      { status: 500 }
    );
  }
}