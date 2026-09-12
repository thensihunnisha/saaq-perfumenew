import CollectionWorld from "@/components/collection/CollectionWorld";
import { takeOffWorld } from "@/data/collectionPages";
import { getProductsByCollection } from "@/data/products";

export default function TakeOffCollectionPage() {
  return (
    <CollectionWorld
      content={takeOffWorld}
      products={getProductsByCollection("takeoff")}
    />
  );
}
