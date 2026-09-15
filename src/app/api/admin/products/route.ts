import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { expressAdminRequest } from "@/lib/express-admin";

export async function POST(request: Request) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const response = await expressAdminRequest("/api/products", "POST", body);
  const payload = await response.json();

  return NextResponse.json(payload, { status: response.status });
}
