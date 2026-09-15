import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await fetch(`${API_URL}/api/contact`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    const payload = await response.json();

    return NextResponse.json(payload, { status: response.status });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to send your message right now." },
      { status: 500 }
    );
  }
}
