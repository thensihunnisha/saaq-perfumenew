import CollectionWorld from "@/components/collection/CollectionWorld";
import { gemsWorld } from "@/data/collectionPages";
import { getProductsByCollection } from "@/data/products";

export default function GemsCollectionPage() {
  return (
    <CollectionWorld
      content={gemsWorld}
      products={getProductsByCollection("gems")}
    />
  );
}
