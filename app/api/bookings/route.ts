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
    const quantity = Number(body.quantity);
    const ticketType = body.ticket_type;

    const ticketPrices: any = {
      VIP1: 200,
      VIP2: 170,
      VIP3: 140,
      VIP4: 110,
      VIP5: 80,
      VIP6: 50,
    };

    if (!ticketType || !ticketPrices[ticketType]) {
      return Response.json(
        { message: "Please select a valid ticket type" },
        { status: 400 }
      );
    }

    if (!quantity || quantity <= 0) {
      return Response.json(
        { message: "Please select ticket quantity" },
        { status: 400 }
      );
    }

    const [concerts]: any = await db.query(
      "SELECT tickets_available FROM concerts WHERE id = ?",
      [concertId]
    );

    if (concerts.length === 0) {
      return Response.json(
        { message: "Concert not found" },
        { status: 404 }
      );
    }

    if (concerts[0].tickets_available < quantity) {
      return Response.json(
        { message: "Not enough tickets available" },
        { status: 400 }
      );
    }

    const unitPrice = ticketPrices[ticketType];
    const totalPrice = unitPrice * quantity;

    await db.query(
      "INSERT INTO bookings (user_id, concert_id, ticket_type, quantity, unit_price, total_price) VALUES (?, ?, ?, ?, ?, ?)",
      [userId, concertId, ticketType, quantity, unitPrice, totalPrice]
    );

    await db.query(
      "UPDATE concerts SET tickets_available = tickets_available - ? WHERE id = ?",
      [quantity, concertId]
    );

    return Response.json({
      message: "Booking successful!"
    });
  } catch (error) {
    console.error("BOOKING ERROR:", error);

    return Response.json(
      { message: "Booking failed" },
      { status: 500 }
    );
  }
}