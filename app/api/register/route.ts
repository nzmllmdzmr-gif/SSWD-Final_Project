import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json({
        message: "All fields are required",
      });
    }

    await db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, password, role]
    );

    return NextResponse.json({
      message: "User registered successfully",
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json({
      message: "Register failed",
    });
  }
} 