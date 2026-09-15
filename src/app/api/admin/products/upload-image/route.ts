import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import {
  PRODUCT_IMAGE_ERROR,
  saveProductImage,
} from "@/lib/product-image-storage";

export async function POST(request: Request) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("image");
    const productName = String(formData.get("name") ?? "");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { success: false, message: PRODUCT_IMAGE_ERROR },
        { status: 400 }
      );
    }

    const image = await saveProductImage(file, productName);

    return NextResponse.json({
      success: true,
      image,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : PRODUCT_IMAGE_ERROR;

    return NextResponse.json(
      { success: false, message },
      { status: 400 }
    );
  }
}
