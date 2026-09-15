import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { expressAdminRequest } from "@/lib/express-admin";

export async function GET() {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await expressAdminRequest("/api/orders", "GET");
    const payload = await response.json();
    return NextResponse.json(payload, { status: response.status });
  } catch {
    return NextResponse.json(
      { message: "Unable to load orders" },
      { status: 500 }
    );
  }
}
