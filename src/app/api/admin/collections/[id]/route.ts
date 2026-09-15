import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { expressAdminRequest } from "@/lib/express-admin";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: Request, context: RouteContext) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json();
  const response = await expressAdminRequest(
    `/api/collections/${id}`,
    "PUT",
    body
  );
  const payload = await response.json();

  return NextResponse.json(payload, { status: response.status });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const response = await expressAdminRequest(
    `/api/collections/${id}`,
    "DELETE"
  );
  const payload = await response.json();

  return NextResponse.json(payload, { status: response.status });
}
