"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Trash2 } from "lucide-react";
import { Body, Button, ButtonLink, DisplayHeading, Eyebrow } from "@/components/ui";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { COLLECTION_LABELS } from "@/data/products";

export default function WishlistPageView() {
  const { items, itemCount, isReady, removeItem, clearWishlist } = useWishlist();
  const { addItem } = useCart();

  if (!isReady) {
    return (
      <div className="saaq-page flex min-h-[70vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border border-saaq-gold border-t-transparent" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="saaq-page flex min-h-[80vh] items-center justify-center px-6">
        <div className="max-w-lg text-center">
          <Heart
            size={28}
            strokeWidth={1.2}
            className="mx-auto text-saaq-gold/70"
          />
          <Eyebrow className="mt-8">Wishlist</Eyebrow>
          <DisplayHeading as="h1" className="mt-5 saaq-h1">
            Your wishlist is empty
          </DisplayHeading>
          <Body className="mx-auto mt-5 max-w-sm">
            Save the fragrances you wish to return to. They will wait here.
          </Body>
          <ButtonLink href="/collection" className="mt-10">
            Discover SAAQ collection
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="saaq-page bg-saaq-black text-saaq-ivory">
      <section className="border-b border-white/10">
        <div className="saaq-container py-12 sm:py-16">
          <Eyebrow>Saved fragrances</Eyebrow>
          <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <DisplayHeading as="h1" className="saaq-h1">
                Wishlist
              </DisplayHeading>
              <p className="saaq-meta mt-4">
                {itemCount} {itemCount === 1 ? "fragrance" : "fragrances"}
              </p>
            </div>
            <button
              type="button"
              onClick={clearWishlist}
              className="saaq-transition self-start font-sans text-[10px] uppercase tracking-[0.28em] text-saaq-ivory/40 hover:text-saaq-gold"
            >
              Clear wishlist
            </button>
          </div>
        </div>
      </section>

      <section className="saaq-container py-12 lg:py-16">
        <ul className="divide-y divide-white/10 border-y border-white/10">
          {items.map((product) => (
            <li
              key={product.id}
              className="grid gap-6 py-8 sm:grid-cols-[7rem_1fr] sm:items-center lg:grid-cols-[8.5rem_1fr_auto]"
            >
              <Link
                href={`/product/${product.id}`}
                className="relative aspect-[4/5] overflow-hidden bg-saaq-charcoal"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="140px"
                  className="object-cover"
                />
              </Link>

              <div className="min-w-0">
                <p className="saaq-eyebrow">
                  {COLLECTION_LABELS[product.collection]}
                </p>
                <Link href={`/product/${product.id}`}>
                  <h2 className="saaq-transition mt-2 font-display text-2xl text-saaq-ivory hover:text-saaq-gold">
                    {product.name}
                  </h2>
                </Link>
                <p className="mt-3 font-sans text-sm tracking-[0.08em] text-saaq-ivory/70">
                  AED {product.price.toFixed(2)}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Button
                  type="button"
                  size="sm"
                  onClick={() => addItem(product, 1, { openDrawer: true })}
                >
                  Add to cart
                </Button>
                <ButtonLink
                  href={`/product/${product.id}`}
                  variant="outline"
                  size="sm"
                >
                  View product
                </ButtonLink>
                <button
                  type="button"
                  onClick={() => removeItem(product.id)}
                  className="saaq-transition inline-flex items-center justify-center gap-2 px-3 py-2 font-sans text-[10px] uppercase tracking-[0.22em] text-saaq-ivory/45 hover:text-saaq-gold"
                >
                  <Trash2 size={13} strokeWidth={1.4} />
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
