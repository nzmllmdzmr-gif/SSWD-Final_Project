import { db } from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM concerts");
    return Response.json(rows);
  } catch (error: any) {
    console.log("GET concerts error:", error);

    return Response.json(
      {
        message: "Failed to fetch concerts",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await db.query(
      "INSERT INTO concerts (artist, venue, city, concert_date, price, tickets_available, description, poster_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        body.artist,
        body.venue,
        body.city,
        body.concert_date,
        body.price,
        body.tickets_available,
        body.description,
        body.poster_url,
      ]
    );

    return Response.json({ message: "Concert added successfully!" });
  } catch (error: any) {
    console.log("POST concerts error:", error);

    return Response.json(
      {
        message: "Failed to add concert",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    await db.query(
      "UPDATE concerts SET artist = ?, venue = ?, city = ?, concert_date = ?, price = ?, tickets_available = ?, description = ?, poster_url = ? WHERE id = ?",
      [
        body.artist,
        body.venue,
        body.city,
        body.concert_date,
        body.price,
        body.tickets_available,
        body.description,
        body.poster_url,
        body.id,
      ]
    );

    return Response.json({ message: "Concert updated successfully!" });
  } catch (error: any) {
    console.log("PUT concerts error:", error);

    return Response.json(
      {
        message: "Failed to update concert",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    await db.query("DELETE FROM concerts WHERE id = ?", [body.id]);

    return Response.json({ message: "Concert deleted successfully!" });
  } catch (error: any) {
    console.log("DELETE concerts error:", error);

    return Response.json(
      {
        message: "Failed to delete concert",
        error: error.message,
      },
      { status: 500 }
    );
  }
}