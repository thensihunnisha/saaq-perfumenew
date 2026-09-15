import Image from "next/image";
import Link from "next/link";
import { getApiProducts } from "@/lib/api";
import ProductDeleteButton from "@/components/admin/ProductDeleteButton";

export default async function AdminProductsPage() {
  const products = await getApiProducts().catch(() => []);

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <div className="flex flex-col gap-4 border-b border-saaq-gold/15 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="saaq-eyebrow">Catalog</p>
          <h1 className="mt-3 font-display text-4xl text-saaq-ivory">
            Products
          </h1>
          <p className="saaq-body mt-4 max-w-xl">
            Add, edit, or remove fragrances in the SAAQ catalog.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="saaq-btn saaq-transition inline-flex h-11 items-center justify-center border border-saaq-gold bg-saaq-gold px-6 font-sans text-[10px] uppercase tracking-[0.22em] text-saaq-black hover:bg-saaq-gold-deep"
        >
          Add Product
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto border border-saaq-gold/15 bg-saaq-black">
        <table className="min-w-[860px] w-full text-left">
          <thead>
            <tr className="border-b border-saaq-gold/15">
              {["Image", "Product", "Price", "Stock", "Actions"].map(
                (column) => (
                  <th
                    key={column}
                    className="px-5 py-4 font-sans text-[10px] uppercase tracking-[0.22em] text-saaq-gold"
                  >
                    {column}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-16 text-center">
                  <p className="font-display text-2xl text-saaq-ivory/80">
                    No products yet.
                  </p>
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={String(product.id)}
                  className="border-b border-white/5 last:border-b-0"
                >
                  <td className="px-5 py-4">
                    <div className="relative h-14 w-12 overflow-hidden bg-saaq-charcoal">
                      {product.image?.startsWith("/") ? (
                        <Image
                          src={product.image}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                  </td>
                  <td className="px-5 py-4 font-display text-lg text-saaq-ivory">
                    {product.name}
                  </td>
                  <td className="px-5 py-4 font-sans text-sm text-saaq-ivory/70">
                    AED {Number(product.price).toFixed(2)}
                  </td>
                  <td className="px-5 py-4 font-sans text-sm text-saaq-ivory/70">
                    {product.stock ?? 0}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="saaq-transition font-sans text-[10px] uppercase tracking-[0.22em] text-saaq-gold hover:text-saaq-ivory"
                      >
                        Edit
                      </Link>
                      <ProductDeleteButton
                        id={String(product.id)}
                        name={product.name}
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
