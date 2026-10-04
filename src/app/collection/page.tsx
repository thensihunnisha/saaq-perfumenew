import CollectionCatalog from "@/components/collection/CollectionCatalog";
import CollectionCinematic from "@/components/collection/CollectionCinematic";
import { products } from "@/data/products";

export default async function CollectionPage() {
  return (
    <>
      <CollectionCinematic />
      <CollectionCatalog products={products} />
    </>
  );
}
