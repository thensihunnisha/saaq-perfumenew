import type { CollectionSlug, Product } from "@/data/products";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export type ApiProduct = {
  id: number | string;
  name: string;
  category?: string;
  collection?: string;
  price: number | string;
  image: string;
  description?: string;
  stock?: number;
  created_at?: string;
};

function normalizeCollection(value?: string): CollectionSlug {
  return value?.toLowerCase() === "gems" ? "gems" : "takeoff";
}

export function mapApiProduct(row: ApiProduct): Product {
  const collection = normalizeCollection(row.collection);

  return {
    id: String(row.id),
    name: row.name,
    category: row.category || (collection === "gems" ? "Gems" : "Take Off"),
    collection,
    gender: "unisex",
    price: Number(row.price),
    image: row.image,
    description: row.description || "",
  };
}

export async function getApiProducts(): Promise<ApiProduct[]> {
  const response = await fetch(`${API_URL}/api/products`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return (await response.json()) as ApiProduct[];
}

export async function getProducts(): Promise<Product[]> {
  const rows = await getApiProducts();
  return rows.map(mapApiProduct);
}

export async function getProduct(id: string): Promise<Product | null> {
  const response = await fetch(`${API_URL}/api/products/${id}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const row = (await response.json()) as ApiProduct;
  return mapApiProduct(row);
}

export function getProductHref(id: string) {
  return /^\d+$/.test(id) ? `/shop/${id}` : `/product/${id}`;
}

export function pickFeaturedProducts(catalog: Product[], limit = 4): Product[] {
  const gems = catalog.filter((product) => product.collection === "gems");
  const takeoff = catalog.filter((product) => product.collection === "takeoff");
  const selected: Product[] = [];
  const max = Math.max(gems.length, takeoff.length);

  for (let index = 0; index < max && selected.length < limit; index += 1) {
    if (takeoff[index]) {
      selected.push(takeoff[index]);
    }

    if (selected.length >= limit) {
      break;
    }

    if (gems[index]) {
      selected.push(gems[index]);
    }
  }

  if (selected.length < limit) {
    for (const product of catalog) {
      if (selected.some((item) => item.id === product.id)) {
        continue;
      }

      selected.push(product);

      if (selected.length >= limit) {
        break;
      }
    }
  }

  return selected.slice(0, limit);
}
