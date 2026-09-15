import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { getApiProducts } from "@/lib/api";
import { expressAdminRequest } from "@/lib/express-admin";
import {
  deleteLocalProductImage,
  isUploadedProductImagePath,
} from "@/lib/product-image-storage";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: Request, context: RouteContext) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = (await request.json()) as { image?: unknown };
  const nextImage = String(body.image ?? "");

  let currentImage = "";
  try {
    const products = await getApiProducts();
    currentImage =
      products.find((product) => String(product.id) === id)?.image || "";
  } catch {
    currentImage = "";
  }

  const response = await expressAdminRequest(
    `/api/products/${id}`,
    "PUT",
    body
  );
  const payload = await response.json();

  if (
    response.ok &&
    currentImage &&
    currentImage !== nextImage &&
    isUploadedProductImagePath(currentImage)
  ) {
    try {
      const products = await getApiProducts();
      const stillUsed = products.some(
        (product) => product.image === currentImage
      );

      if (!stillUsed) {
        await deleteLocalProductImage(currentImage);
      }
    } catch {
      // Leave the previous file if cleanup cannot be confirmed.
    }
  }

  return NextResponse.json(payload, { status: response.status });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const response = await expressAdminRequest(`/api/products/${id}`, "DELETE");
  const payload = await response.json();

  return NextResponse.json(payload, { status: response.status });
}
