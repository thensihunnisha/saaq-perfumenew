import CollectionWorld from "@/components/collection/CollectionWorld";
import { gemsWorld } from "@/data/collectionPages";
import { getProductsByCollection } from "@/data/products";
import { getProducts } from "@/lib/api";

export default async function GemsCollectionPage() {
  const products = await getProducts()
    .then((items) => getProductsByCollection(items, "gems"))
    .catch(() => []);

  return <CollectionWorld content={gemsWorld} products={products} />;
}
