import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { expressAdminRequest } from "@/lib/express-admin";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const response = await expressAdminRequest(`/api/customers/${id}`, "GET");
    const payload = await response.json();
    return NextResponse.json(payload, { status: response.status });
  } catch {
    return NextResponse.json(
      { message: "Unable to load customer" },
      { status: 500 }
    );
  }
}
