import Link from "next/link";
import CatalogNameForm from "@/components/admin/CatalogNameForm";

export default function AdminNewCategoryPage() {
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <Link
        href="/admin/categories"
        className="saaq-transition font-sans text-[10px] uppercase tracking-[0.22em] text-saaq-gold hover:text-saaq-ivory"
      >
        Back to categories
      </Link>
      <p className="saaq-eyebrow mt-8">Catalog</p>
      <h1 className="mt-3 font-display text-4xl text-saaq-ivory">
        Add Category
      </h1>
      <p className="saaq-body mt-4 max-w-xl">
        Create a category name for the SAAQ catalog.
      </p>
      <CatalogNameForm
        resource="categories"
        submitLabel="Add Category"
      />
    </div>
  );
}
