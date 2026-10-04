import {
  getProductById,
  products,
  type Product,
} from "@/data/products";

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProduct(id: string): Promise<Product | null> {
  return getProductById(id) ?? null;
}

export function getProductHref(id: string) {
  return `/shop/${id}`;
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
