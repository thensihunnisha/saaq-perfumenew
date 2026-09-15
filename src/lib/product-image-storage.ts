import { randomBytes } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

export const PRODUCT_IMAGE_ERROR =
  "Please select a JPG, PNG, or WEBP image smaller than 5 MB.";

const MAX_BYTES = 5 * 1024 * 1024;
const PUBLIC_PREFIX = "/images/products/";
const UPLOADED_NAME =
  /^[a-z0-9]+(?:-[a-z0-9]+)*-\d+(?:-[a-f0-9]+)?\.(jpg|jpeg|png|webp)$/i;

function productsDirectory() {
  return path.resolve(process.cwd(), "public", "images", "products");
}

function detectExtension(buffer: Buffer) {
  if (
    buffer.length >= 3 &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff
  ) {
    return "jpg";
  }

  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) {
    return "png";
  }

  if (
    buffer.length >= 12 &&
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP"
  ) {
    return "webp";
  }

  return null;
}

function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);

  return slug || "product";
}

export function isLocalProductImagePath(imagePath: string) {
  return (
    imagePath.startsWith(PUBLIC_PREFIX) &&
    !imagePath.includes("..") &&
    !imagePath.includes("\\")
  );
}

export function isUploadedProductImagePath(imagePath: string) {
  if (!isLocalProductImagePath(imagePath)) {
    return false;
  }

  return UPLOADED_NAME.test(imagePath.slice(PUBLIC_PREFIX.length));
}

export async function saveProductImage(file: File, productName?: string) {
  if (file.size <= 0 || file.size > MAX_BYTES) {
    throw new Error(PRODUCT_IMAGE_ERROR);
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const extension = detectExtension(buffer);

  if (!extension) {
    throw new Error(PRODUCT_IMAGE_ERROR);
  }

  const filename = `${slugify(productName || file.name)}-${Date.now()}-${randomBytes(3).toString("hex")}.${extension}`;
  const directory = productsDirectory();
  const target = path.resolve(directory, filename);

  if (!target.startsWith(`${directory}${path.sep}`)) {
    throw new Error(PRODUCT_IMAGE_ERROR);
  }

  await mkdir(directory, { recursive: true });
  await writeFile(target, buffer);

  return `${PUBLIC_PREFIX}${filename}`;
}

export async function deleteLocalProductImage(imagePath: string) {
  if (!isUploadedProductImagePath(imagePath)) {
    return;
  }

  const directory = productsDirectory();
  const filename = path.basename(imagePath);
  const target = path.resolve(directory, filename);

  if (!target.startsWith(`${directory}${path.sep}`)) {
    return;
  }

  try {
    await unlink(target);
  } catch {
    // Missing files should not fail product updates.
  }
}
