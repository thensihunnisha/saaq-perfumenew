import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUBJECTS = new Set([
  "Fragrance enquiry",
  "Order enquiry",
  "Delivery",
  "Returns & exchange",
  "Other",
]);

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      phone?: string;
      subject?: string;
      message?: string;
    };

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const phone = String(body.phone ?? "").trim();
    const subject = String(body.subject ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || name.length > 255) {
      return NextResponse.json({ message: "Enter your name." }, { status: 400 });
    }

    if (!email || email.length > 255 || !EMAIL_PATTERN.test(email)) {
      return NextResponse.json(
        { message: "Enter a valid email." },
        { status: 400 }
      );
    }

    if (phone.length > 50) {
      return NextResponse.json(
        { message: "Enter a valid phone number." },
        { status: 400 }
      );
    }

    if (!subject || !SUBJECTS.has(subject)) {
      return NextResponse.json(
        { message: "Select a subject." },
        { status: 400 }
      );
    }

    if (!message || message.length > 5000) {
      return NextResponse.json(
        { message: "Enter a message." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been received.",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to send your message right now." },
      { status: 500 }
    );
  }
}
