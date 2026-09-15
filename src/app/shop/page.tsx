"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getProducts } from "@/lib/api";
import WhatsAppButton from "@/components/WhatsAppButton";
import type { Product } from "@/data/products";

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#080808] pt-[var(--saaq-header-offset)]" />
      }
    >
      <ShopContent />
    </Suspense>
  );
}

function ShopContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    getProducts()
      .then((items) => {
        if (!cancelled) {
          setProducts(items);
          setHasError(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setHasError(true);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const collectionParam = searchParams.get("collection");

  const selectedCollection =
    collectionParam === "takeoff" || collectionParam === "gems"
      ? collectionParam
      : "all";

  const filteredProducts =
    selectedCollection === "all"
      ? products
      : products.filter(
          (product) =>
            product.collection.toLowerCase() ===
            selectedCollection.toLowerCase()
        );

  const pageTitle =
    selectedCollection === "takeoff"
      ? "Take Off Collection"
      : selectedCollection === "gems"
        ? "Gems Collection"
        : "All Fragrances";

  return (
    <div className="min-h-screen bg-[#080808] pt-[var(--saaq-header-offset)] text-white">
      {/* HERO */}
      <section className="relative flex min-h-[300px] items-center justify-center overflow-hidden">
        <Image
          src={
            selectedCollection === "takeoff"
              ? "/images/collections/takeoff-home.jpg"
              : selectedCollection === "gems"
                ? "/images/collections/gems-home.jpg"
                : "/images/collections/allcollection.jpg"
          }
          alt={pageTitle}
          fill
          priority
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 px-6 text-center">
          <p className="mb-3 font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.22em] text-[#d4af37] sm:tracking-[0.4em]">
            SAAQ PERFUME
          </p>

          <h1 className="font-['Playfair_Display',serif] text-3xl sm:text-4xl lg:text-5xl">
            {pageTitle}
          </h1>

          <p className="mx-auto mt-3 max-w-xl font-['Inter',sans-serif] text-xs leading-6 text-white/60">
            Discover the art of signature fragrance.
          </p>
        </div>
      </section>

      {/* COLLECTION FILTER */}
      <section className="border-b border-white/10 bg-[#080808]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-5 gap-y-3 px-4 py-5 sm:gap-8 sm:px-6">
          <CollectionLink
            href="/shop"
            label="All Fragrances"
            active={selectedCollection === "all"}
          />

          <CollectionLink
            href="/shop?collection=takeoff"
            label="Take Off"
            active={selectedCollection === "takeoff"}
          />

          <CollectionLink
            href="/shop?collection=gems"
            label="Gems"
            active={selectedCollection === "gems"}
          />
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        {isLoading ? (
          <p className="py-20 text-center font-['Inter',sans-serif] text-[10px] uppercase tracking-[0.28em] text-white/40">
            Loading fragrances
          </p>
        ) : null}

        {hasError ? (
          <p className="py-20 text-center font-['Inter',sans-serif] text-sm text-white/50">
            Unable to load fragrances. Please try again.
          </p>
        ) : null}

        {!isLoading && !hasError ? (
          <>
        {/* RESULT COUNT */}
        <div className="mb-8 flex items-center justify-between">
          <p className="font-['Inter',sans-serif] text-[10px] uppercase tracking-[0.25em] text-white/40">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1
              ? "Fragrance"
              : "Fragrances"}
          </p>

          <p className="font-['Inter',sans-serif] text-[10px] uppercase tracking-[0.25em] text-[#d4af37]">
            {selectedCollection === "all"
              ? "All Collections"
              : selectedCollection === "takeoff"
                ? "Take Off"
                : "Gems"}
          </p>
        </div>

        {/* PRODUCT GRID */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-5 gap-y-10 min-[360px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group flex flex-col justify-between"
              >
                {/* PRODUCT LINK ONLY WRAPS IMAGE & INFO */}
                <Link
                  href={`/shop/${product.id}`}
                  className="block"
                >
                  {/* IMAGE */}
                  <div className="relative aspect-square overflow-hidden bg-[#111]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
                  </div>

                  {/* PRODUCT INFO */}
                  <div className="pt-3">
                    <p className="mb-1 font-['Inter',sans-serif] text-[8px] uppercase tracking-[0.25em] text-[#d4af37]">
                      {product.collection.toLowerCase() === "takeoff"
                        ? "Take Off"
                        : "Gems"}
                    </p>

                    <h2 className="font-['Playfair_Display',serif] text-base text-white">
                      {product.name}
                    </h2>

                    <p className="mt-1 line-clamp-2 font-['Inter',sans-serif] text-[11px] leading-5 text-white/50">
                      {product.description}
                    </p>

                    <p className="mt-2 font-['Inter',sans-serif] text-xs font-medium tracking-wider text-white">
                      AED {product.price.toFixed(2)}
                    </p>
                  </div>
                </Link>

                <WhatsAppButton
                  product={product}
                  className="group/waBtn mt-4 rounded-none border border-[#25D366]/40 bg-black/40 px-4 py-2.5 backdrop-blur-sm hover:shadow-[0_0_15px_rgba(37,211,102,0.25)]"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="font-['Playfair_Display',serif] text-2xl text-white">
              No fragrances found
            </p>

            <Link
              href="/shop"
              className="mt-6 inline-block border border-[#d4af37] px-6 py-3 font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.25em] text-[#d4af37]"
            >
              View All Fragrancesffghty
            </Link>
          </div>
        )}
          </>
        ) : null}
      </section>
    </div>
  );
}

/*
 * COLLECTION LINK
 */
function CollectionLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`relative pb-2 font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.25em] transition-colors duration-300 ${
        active
          ? "text-[#d4af37]"
          : "text-white/50 hover:text-white"
      }`}
    >
      {label}

      {active && (
        <span className="absolute bottom-0 left-0 h-px w-full bg-[#d4af37]" />
      )}
    </Link>
  );
}