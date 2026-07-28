import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { dp, username, password } = body;

    // Validate that all required fields are present
    if (!dp || !username || !password) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Query the database for a matching user and DP code
    const user = await prisma.user.findFirst({
      where: {
        username: username,
        password: password,
        dpCode: dp.code,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid username, password, or Depository Participant." },
        { status: 401 }
      );
    }

    // Success response
    return NextResponse.json(
      { message: "Login successful!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}