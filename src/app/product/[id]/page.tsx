import type { Metadata } from "next";
import Link from "next/link";
import ProductDetailView from "@/components/product/ProductDetailView";
import { ButtonLink } from "@/components/ui";
import { getRelatedProducts } from "@/data/products";
import { getProduct, getProducts } from "@/lib/api";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id).catch(() => null);

  if (!product) {
    return {
      title: "Fragrance not found | SAAQ PERFUME",
      description: "This SAAQ fragrance could not be found.",
    };
  }

  return {
    title: `${product.name} | SAAQ PERFUME`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id).catch(() => null);

  if (!product) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-saaq-black px-6 pt-[var(--saaq-header-offset)] text-saaq-ivory">
        <div className="max-w-md text-center">
          <p className="saaq-eyebrow">SAAQ PERFUME</p>
          <h1 className="saaq-h1 mt-5">Fragrance not found</h1>
          <p className="saaq-body mx-auto mt-5 max-w-sm">
            The scent you are looking for is not in the SAAQ collection.
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <ButtonLink href="/collection">View collection</ButtonLink>
            <Link
              href="/collection"
              className="saaq-transition font-sans text-[10px] uppercase tracking-[0.28em] text-saaq-gold hover:text-saaq-ivory"
            >
              Browse collection
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const catalog = await getProducts().catch(() => []);
  const related = getRelatedProducts(product, catalog);

  return (
    <ProductDetailView
      key={product.id}
      product={product}
      related={related}
    />
  );
}

export const dynamicParams = true;
