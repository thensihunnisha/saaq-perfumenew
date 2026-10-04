import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = String(body.email ?? "")
      .trim()
      .toLowerCase();

    if (!email || email.length > 255 || !EMAIL_PATTERN.test(email)) {
      return NextResponse.json(
        { success: false, message: "Enter a valid email." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "You are on the list. Welcome to SAAQ.",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to join the list right now." },
      { status: 500 }
    );
  }
}
