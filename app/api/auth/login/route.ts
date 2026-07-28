import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { dp, username, password } = body;

    // Add your validation or database check here
    if (!dp || !username || !password) {
      return NextResponse.json(
        { error: "Username or password invalid." },
        { status: 400 }
      );
    }

    // Example mock authentication check (replace with your DB logic)
    if (username === "admin" && password === "password") {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    return NextResponse.json(
      { error: "Username or password invalid." },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred during login." },
      { status: 500 }
    );
  }
}