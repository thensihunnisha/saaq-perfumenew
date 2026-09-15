import Link from "next/link";
import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { getApiProducts } from "@/lib/api";

type AdminEditProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminEditProductPage({
  params,
}: AdminEditProductPageProps) {
  const { id } = await params;
  const products = await getApiProducts().catch(() => []);
  const product = products.find((item) => String(item.id) === id);

  if (!product) {
    notFound();
  }

  const collection =
    product.collection?.toLowerCase() === "gems" ? "Gems" : "Takeoff";

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <Link
        href="/admin/products"
        className="saaq-transition font-sans text-[10px] uppercase tracking-[0.22em] text-saaq-gold hover:text-saaq-ivory"
      >
        Back to products
      </Link>
      <p className="saaq-eyebrow mt-8">Catalog</p>
      <h1 className="mt-3 font-display text-4xl text-saaq-ivory">
        Edit Product
      </h1>
      <p className="saaq-body mt-4 max-w-xl">
        Update this fragrance in the SAAQ catalog.
      </p>
      <ProductForm
        productId={String(product.id)}
        initialValues={{
          name: product.name,
          category: product.category || "Perfume",
          collection,
          price: Number(product.price).toFixed(2),
          image: product.image || "",
          description: product.description || "",
          stock: String(product.stock ?? 0),
        }}
      />
    </div>
  );
}
