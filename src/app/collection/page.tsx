import CollectionCatalog from "@/components/collection/CollectionCatalog";
import CollectionCinematic from "@/components/collection/CollectionCinematic";
import { getProducts } from "@/lib/api";

export default async function CollectionPage() {
  const products = await getProducts().catch(() => []);

  return (
    <>
      <CollectionCinematic />
      <CollectionCatalog products={products} />
    </>
  );
}
