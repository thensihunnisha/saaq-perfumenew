import Link from "next/link";
import CatalogDeleteButton from "@/components/admin/CatalogDeleteButton";
import { getApiCategories } from "@/lib/catalog-api";

function formatDate(value?: string) {
  if (!value) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-AE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default async function AdminCategoriesPage() {
  const categories = await getApiCategories().catch(() => []);

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <div className="flex flex-col gap-4 border-b border-saaq-gold/15 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="saaq-eyebrow">Catalog</p>
          <h1 className="mt-3 font-display text-4xl text-saaq-ivory">
            Categories
          </h1>
          <p className="saaq-body mt-4 max-w-xl">
            Manage product categories
          </p>
        </div>
        <Link
          href="/admin/categories/new"
          className="saaq-btn saaq-transition inline-flex h-11 items-center justify-center border border-saaq-gold bg-saaq-gold px-6 font-sans text-[10px] uppercase tracking-[0.22em] text-saaq-black hover:bg-saaq-gold-deep"
        >
          Add Category
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto border border-saaq-gold/15 bg-saaq-black">
        <table className="min-w-[720px] w-full text-left">
          <thead>
            <tr className="border-b border-saaq-gold/15">
              {["ID", "Name", "Created", "Actions"].map((column) => (
                <th
                  key={column}
                  className="px-5 py-4 font-sans text-[10px] uppercase tracking-[0.22em] text-saaq-gold"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-16 text-center">
                  <p className="font-display text-2xl text-saaq-ivory/80">
                    No categories yet.
                  </p>
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr
                  key={String(category.id)}
                  className="border-b border-white/5 last:border-b-0"
                >
                  <td className="px-5 py-4 font-sans text-sm text-saaq-ivory/70">
                    {category.id}
                  </td>
                  <td className="px-5 py-4 font-display text-lg text-saaq-ivory">
                    {category.name}
                  </td>
                  <td className="px-5 py-4 font-sans text-sm text-saaq-ivory/70">
                    {formatDate(category.created_at)}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/categories/${category.id}`}
                        className="saaq-transition font-sans text-[10px] uppercase tracking-[0.22em] text-saaq-gold hover:text-saaq-ivory"
                      >
                        Edit
                      </Link>
                      <CatalogDeleteButton
                        resource="categories"
                        id={String(category.id)}
                        name={category.name}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
