import ProductCatalog from "@/components/ProductCatalog";
import { products } from "@/data/products";

export default function CollectionCatalog() {
  return (
    <ProductCatalog
      products={products}
      eyebrow="The World of SAAQ"
      heading="All SAAQ Collection"
      intro="Every fragrance composed under the SAAQ name — filtered to the signature you seek."
    />
  );
}
