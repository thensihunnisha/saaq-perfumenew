import CollectionWorld from "@/components/collection/CollectionWorld";
import { takeOffWorld } from "@/data/collectionPages";
import { getProductsByCollection, products } from "@/data/products";

export default async function TakeOffCollectionPage() {
  const takeOffProducts = getProductsByCollection(products, "takeoff");

  return (
    <CollectionWorld content={takeOffWorld} products={takeOffProducts} />
  );
}
