import Link from "next/link";
import CatalogDeleteButton from "@/components/admin/CatalogDeleteButton";
import { getApiCollections } from "@/lib/catalog-api";

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

export default async function AdminCollectionsPage() {
  const collections = await getApiCollections().catch(() => []);

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <div className="flex flex-col gap-4 border-b border-saaq-gold/15 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="saaq-eyebrow">Catalog</p>
          <h1 className="mt-3 font-display text-4xl text-saaq-ivory">
            Collections
          </h1>
          <p className="saaq-body mt-4 max-w-xl">
            Manage perfume collections
          </p>
        </div>
        <Link
          href="/admin/collections/new"
          className="saaq-btn saaq-transition inline-flex h-11 items-center justify-center border border-saaq-gold bg-saaq-gold px-6 font-sans text-[10px] uppercase tracking-[0.22em] text-saaq-black hover:bg-saaq-gold-deep"
        >
          Add Collection
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
            {collections.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-16 text-center">
                  <p className="font-display text-2xl text-saaq-ivory/80">
                    No collections yet.
                  </p>
                </td>
              </tr>
            ) : (
              collections.map((collection) => (
                <tr
                  key={String(collection.id)}
                  className="border-b border-white/5 last:border-b-0"
                >
                  <td className="px-5 py-4 font-sans text-sm text-saaq-ivory/70">
                    {collection.id}
                  </td>
                  <td className="px-5 py-4 font-display text-lg text-saaq-ivory">
                    {collection.name}
                  </td>
                  <td className="px-5 py-4 font-sans text-sm text-saaq-ivory/70">
                    {formatDate(collection.created_at)}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/collections/${collection.id}`}
                        className="saaq-transition font-sans text-[10px] uppercase tracking-[0.22em] text-saaq-gold hover:text-saaq-ivory"
                      >
                        Edit
                      </Link>
                      <CatalogDeleteButton
                        resource="collections"
                        id={String(collection.id)}
                        name={collection.name}
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
