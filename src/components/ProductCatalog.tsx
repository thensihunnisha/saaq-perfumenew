"use client";

import { useMemo, useState, type ReactNode } from "react";
import ProductGrid from "@/components/ProductGrid";
import Reveal from "@/components/Reveal";
import {
  Body,
  Container,
  Eyebrow,
  Heading,
  Section,
} from "@/components/ui";
import {
  filterAndSortProducts,
  type CollectionSlug,
  type Product,
  type ProductSort,
} from "@/data/products";
import { cn } from "@/lib/cn";

type ProductCatalogProps = {
  products: Product[];
  eyebrow: string;
  heading: string;
  intro: string;
};

const COLLECTION_FILTERS: Array<{
  value: "all" | CollectionSlug;
  label: string;
}> = [
  { value: "all", label: "All" },
  { value: "gems", label: "Gems" },
  { value: "takeoff", label: "Take Off" },
];

const SORT_OPTIONS: Array<{ value: ProductSort; label: string }> = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price Low to High" },
  { value: "price-desc", label: "Price High to Low" },
  { value: "newest", label: "Newest" },
];

export default function ProductCatalog({
  products,
  eyebrow,
  heading,
  intro,
}: ProductCatalogProps) {
  const [collection, setCollection] = useState<"all" | CollectionSlug>("all");
  const [sort, setSort] = useState<ProductSort>("featured");

  const visible = useMemo(
    () =>
      filterAndSortProducts(products, {
        gender: "all",
        collection,
        sort,
      }),
    [collection, products, sort]
  );

  return (
    <Section>
      <Container>
        <div id="catalog" className="scroll-mt-28">
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
            <Heading className="mt-4">{heading}</Heading>
            <Body className="mt-5 max-w-xl">{intro}</Body>
          </Reveal>
        </div>

        <div className="mt-10 space-y-6 border-y border-white/10 py-8">
          <FilterRow label="Collection">
            {COLLECTION_FILTERS.map((option) => (
              <FilterChip
                key={option.value}
                active={collection === option.value}
                onClick={() => setCollection(option.value)}
              >
                {option.label}
              </FilterChip>
            ))}
          </FilterRow>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="saaq-meta">Sorting</p>
            <label className="sr-only" htmlFor="product-sort">
              Sort fragrances
            </label>
            <select
              id="product-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as ProductSort)}
              className="h-11 w-full border border-white/15 bg-saaq-black px-4 font-sans text-[10px] uppercase tracking-[0.22em] text-saaq-ivory outline-none focus:border-saaq-gold sm:w-auto"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="saaq-meta mt-8">
          {visible.length} {visible.length === 1 ? "fragrance" : "fragrances"}
        </p>

        <div className="mt-10">
          <ProductGrid products={visible} />
        </div>
      </Container>
    </Section>
  );
}

function FilterRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-8">
      <p className="saaq-meta w-28 shrink-0">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "saaq-transition border px-4 py-2 font-sans text-[9px] uppercase tracking-[0.22em]",
        active
          ? "border-saaq-gold bg-saaq-gold text-saaq-black"
          : "border-white/15 text-saaq-ivory/70 hover:border-saaq-gold hover:text-saaq-gold"
      )}
    >
      {children}
    </button>
  );
}
