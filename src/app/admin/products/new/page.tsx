import Link from "next/link";
import ProductForm from "@/components/admin/ProductForm";

export default function AdminNewProductPage() {
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
        Add Product
      </h1>
      <p className="saaq-body mt-4 max-w-xl">
        Create a fragrance using the current SAAQ product fields.
      </p>
      <ProductForm
        initialValues={{
          name: "",
          category: "Perfume",
          collection: "Takeoff",
          price: "60.00",
          image: "",
          description: "",
          stock: "0",
        }}
      />
    </div>
  );
}
