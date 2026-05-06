import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const userId = 1;
    const concertId = Number(body.concert_id);
    const quantity = 1;
    const totalPrice = Number(body.total_price);

    console.log("BOOKING DATA:", {
      userId,
      concertId,
      quantity,
      totalPrice,
    });

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