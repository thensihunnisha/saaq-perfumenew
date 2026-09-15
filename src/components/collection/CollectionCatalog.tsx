import ProductCatalog from "@/components/ProductCatalog";
import type { Product } from "@/data/products";

type CollectionCatalogProps = {
  products: Product[];
};

export default function CollectionCatalog({
  products,
}: CollectionCatalogProps) {
  return (
    <ProductCatalog
      products={products}
      eyebrow="The World of SAAQ"
      heading="All SAAQ Collection"
      intro="Every fragrance composed under the SAAQ name — filtered to the signature you seek."
    />
  );
}
