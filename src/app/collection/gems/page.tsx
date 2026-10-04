import CollectionWorld from "@/components/collection/CollectionWorld";
import { gemsWorld } from "@/data/collectionPages";
import { getProductsByCollection, products } from "@/data/products";

export default async function GemsCollectionPage() {
  const gemsProducts = getProductsByCollection(products, "gems");

  return <CollectionWorld content={gemsWorld} products={gemsProducts} />;
}
