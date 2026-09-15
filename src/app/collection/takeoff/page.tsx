import CollectionWorld from "@/components/collection/CollectionWorld";
import { takeOffWorld } from "@/data/collectionPages";
import { getProductsByCollection } from "@/data/products";
import { getProducts } from "@/lib/api";

export default async function TakeOffCollectionPage() {
  const products = await getProducts()
    .then((items) => getProductsByCollection(items, "takeoff"))
    .catch(() => []);

  return (
    <CollectionWorld content={takeOffWorld} products={products} />
  );
}
