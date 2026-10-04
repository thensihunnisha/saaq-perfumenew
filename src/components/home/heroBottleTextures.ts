import * as THREE from "three";

export const HERO_BOTTLE_IMAGE = "/images/products/hero-emerald.jpg";

function isStudioBackground(r: number, g: number, b: number) {
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const max = Math.max(r, g, b);
  return lum < 48 && max < 78;
}

export function isolateBottleTexture(image: HTMLImageElement) {
  const width = image.naturalWidth || image.width;
  const height = image.naturalHeight || image.height;
  const source = document.createElement("canvas");
  source.width = width;
  source.height = height;
  const ctx = source.getContext("2d", { willReadFrequently: true });

  if (!ctx) {
    return {
      texture: new THREE.CanvasTexture(image),
      aspect: width / height,
    };
  }

  ctx.drawImage(image, 0, 0, width, height);
  const frame = ctx.getImageData(0, 0, width, height);
  const { data } = frame;
  const seen = new Uint8Array(width * height);
  const stack: number[] = [];

  const protectLeft = Math.floor(width * 0.3);
  const protectRight = Math.ceil(width * 0.7);
  const protectTop = Math.floor(height * 0.08);
  const protectBottom = Math.ceil(height * 0.86);

  const enqueue = (x: number, y: number) => {
    if (x < 0 || y < 0 || x >= width || y >= height) {
      return;
    }
    if (x >= protectLeft && x <= protectRight && y >= protectTop && y <= protectBottom) {
      return;
    }
    const index = y * width + x;
    if (seen[index]) {
      return;
    }
    const offset = index * 4;
    if (!isStudioBackground(data[offset], data[offset + 1], data[offset + 2])) {
      return;
    }
    seen[index] = 1;
    stack.push(index);
  };

  for (let x = 0; x < width; x += 1) {
    enqueue(x, 0);
    enqueue(x, height - 1);
  }
  for (let y = 0; y < height; y += 1) {
    enqueue(0, y);
    enqueue(width - 1, y);
  }

  while (stack.length) {
    const index = stack.pop() as number;
    const x = index % width;
    const y = (index / width) | 0;
    data[index * 4 + 3] = 0;
    enqueue(x + 1, y);
    enqueue(x - 1, y);
    enqueue(x, y + 1);
    enqueue(x, y - 1);
  }

  const midX = width / 2;
  const halfBand = width * 0.18;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (x < midX - halfBand || x > midX + halfBand) {
        data[(y * width + x) * 4 + 3] = 0;
      }
    }
  }

  ctx.putImageData(frame, 0, 0);

  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (data[(y * width + x) * 4 + 3] < 16) {
        continue;
      }
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }

  const pad = 12;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(width - 1, maxX + pad);
  maxY = Math.min(height - 1, maxY + pad);

  const cropW = Math.max(1, maxX - minX);
  const cropH = Math.max(1, maxY - minY);
  const cropped = document.createElement("canvas");
  cropped.width = cropW;
  cropped.height = cropH;
  const cropCtx = cropped.getContext("2d");
  cropCtx?.drawImage(source, minX, minY, cropW, cropH, 0, 0, cropW, cropH);

  const texture = new THREE.CanvasTexture(cropped);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;

  return { texture, aspect: cropW / cropH };
}

export function createShadowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  const gradient = ctx.createRadialGradient(256, 128, 10, 256, 128, 220);
  gradient.addColorStop(0, "rgba(0, 0, 0, 0.55)");
  gradient.addColorStop(0.45, "rgba(0, 0, 0, 0.18)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 256);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
