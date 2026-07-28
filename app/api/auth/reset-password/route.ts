import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../app/generated/prisma";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { dp, username, email, dob } = body;

    if (!dp || !username || !email || !dob) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Find if a user matches the credentials
    const user = await prisma.user.findFirst({
      where: {
        username: username,
        email: email,
        dateOfBirth: dob,
        dpCode: dp.code,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "No matching account found with these credentials." },
        { status: 404 }
      );
    }

    // Success response (mocking email trigger step)
    return NextResponse.json(
      { message: "Verification email sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}