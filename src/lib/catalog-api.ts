const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export type CatalogRecord = {
  id: number | string;
  name: string;
  description?: string | null;
  created_at?: string;
};

async function getCatalog(path: string): Promise<CatalogRecord[]> {
  const response = await fetch(`${API_URL}${path}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to load catalog");
  }

  return (await response.json()) as CatalogRecord[];
}

export function getApiCategories() {
  return getCatalog("/api/categories");
}

export function getApiCollections() {
  return getCatalog("/api/collections");
}

export async function getCatalogItem(
  path: string,
  id: string
): Promise<CatalogRecord | null> {
  const response = await fetch(`${API_URL}${path}/${id}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to load catalog item");
  }

  return (await response.json()) as CatalogRecord;
}
