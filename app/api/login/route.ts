import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, password } = body;

    const [rows]: any = await db.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );

    if (rows.length === 0) {
      return NextResponse.json({
        message: "Invalid email or password",
      });
    }

    const user = rows[0];

    const response = NextResponse.json({
  message: "Login successful",
  role: user.role,
});

response.cookies.set("userRole", user.role);
response.cookies.set("userName", user.name);

return response;

  } catch (error) {
    console.log(error);

    return NextResponse.json({
      message: "Login failed",
    });
  }
}