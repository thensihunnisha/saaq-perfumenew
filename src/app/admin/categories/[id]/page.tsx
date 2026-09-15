import Link from "next/link";
import { notFound } from "next/navigation";
import CatalogNameForm from "@/components/admin/CatalogNameForm";
import { getCatalogItem } from "@/lib/catalog-api";

type AdminEditCategoryPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminEditCategoryPage({
  params,
}: AdminEditCategoryPageProps) {
  const { id } = await params;
  const category = await getCatalogItem("/api/categories", id);

  if (!category) {
    notFound();
  }

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
        Edit Category
      </h1>
      <p className="saaq-body mt-4 max-w-xl">
        Rename this category.
      </p>
      <CatalogNameForm
        resource="categories"
        itemId={String(category.id)}
        initialName={category.name}
        submitLabel="Save Changes"
      />
    </div>
  );
}
