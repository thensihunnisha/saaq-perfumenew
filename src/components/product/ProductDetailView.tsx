"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, Minus, Plus } from "lucide-react";
import ProductGrid from "@/components/ProductGrid";
import Reveal from "@/components/Reveal";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Body, Button, DisplayHeading, Eyebrow } from "@/components/ui";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/cn";
import {
  COLLECTION_LABELS,
  getFragranceStory,
  type Product,
} from "@/data/products";

type ProductDetailViewProps = {
  product: Product;
  related: Product[];
};

export default function ProductDetailView({
  product,
  related,
}: ProductDetailViewProps) {
  const { addItem, openDrawer } = useCart();
  const { isSaved, toggleItem } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const saved = isSaved(product.id);
  const collectionLabel = COLLECTION_LABELS[product.collection];
  const story = getFragranceStory(product);

  useEffect(() => {
    setQuantity(1);
    setAdded(false);
  }, [product.id]);

  const decrease = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increase = () => {
    setQuantity((current) => Math.min(12, current + 1));
  };

  const handleAddToCart = () => {
    addItem(product, quantity, { openDrawer: false });
    setAdded(true);
  };

  return (
    <div className="bg-saaq-black pt-[var(--saaq-header-offset)] text-saaq-ivory">
      <section className="saaq-container py-10 lg:py-16">
        <Link
          href="/collection"
          className="saaq-transition font-sans text-[10px] uppercase tracking-[0.28em] text-saaq-ivory/45 hover:text-saaq-gold"
        >
          Back to collection
        </Link>

        <div className="mt-10 grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 xl:gap-24">
          <div className="group relative overflow-hidden bg-saaq-charcoal">
            <div className="relative aspect-[4/5] min-h-[420px] lg:min-h-[640px]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover saaq-img-zoom"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-saaq-black/35 via-transparent to-transparent" />
            </div>
          </div>

          <div className="lg:sticky lg:top-28 lg:pb-8">
            <Eyebrow>
              {collectionLabel} · {product.category}
            </Eyebrow>

            <DisplayHeading as="h1" className="mt-5">
              {product.name}
            </DisplayHeading>

            <div className="mt-6 flex items-baseline gap-4">
              <p className="font-sans text-xl tracking-[0.12em] text-saaq-gold">
                AED {product.price.toFixed(2)}
              </p>
              {product.compareAtPrice &&
              product.compareAtPrice > product.price ? (
                <p className="font-sans text-sm tracking-[0.08em] text-saaq-ivory/35 line-through">
                  AED {product.compareAtPrice.toFixed(2)}
                </p>
              ) : null}
            </div>

            <div className="saaq-rule mt-8" />

            <Body className="mt-8 max-w-lg text-saaq-ivory/70">
              {product.description}
            </Body>

            <div className="mt-10 max-w-lg">
              <p className="saaq-eyebrow">Fragrance story</p>
              <Body className="mt-4 text-saaq-ivory/65">{story}</Body>
            </div>

            <div className="mt-10">
              <p className="saaq-eyebrow mb-4">Quantity</p>
              <div className="inline-flex items-center border border-white/15">
                <button
                  type="button"
                  onClick={decrease}
                  aria-label="Decrease quantity"
                  className="saaq-transition flex h-12 w-12 items-center justify-center text-saaq-ivory/70 hover:text-saaq-gold"
                >
                  <Minus size={14} strokeWidth={1.4} />
                </button>
                <span className="min-w-10 text-center font-sans text-sm tracking-[0.2em] text-saaq-ivory">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={increase}
                  aria-label="Increase quantity"
                  className="saaq-transition flex h-12 w-12 items-center justify-center text-saaq-ivory/70 hover:text-saaq-gold"
                >
                  <Plus size={14} strokeWidth={1.4} />
                </button>
              </div>
            </div>

            <div className="mt-8 flex max-w-lg flex-col gap-3">
              <Button type="button" size="lg" onClick={handleAddToCart}>
                Add to cart
              </Button>

              <WhatsAppButton
                product={product}
                quantity={quantity}
                label="Order via WhatsApp"
              />

              <button
                type="button"
                onClick={() => toggleItem(product)}
                aria-pressed={saved}
                className={cn(
                  "saaq-transition inline-flex items-center justify-center gap-2 border px-7 py-3.5 font-sans text-[10px] uppercase tracking-[0.28em]",
                  saved
                    ? "border-saaq-gold text-saaq-gold"
                    : "border-white/15 text-saaq-ivory/75 hover:border-saaq-gold hover:text-saaq-gold"
                )}
              >
                <Heart
                  size={14}
                  strokeWidth={1.4}
                  className={cn(saved ? "fill-saaq-gold" : "")}
                />
                {saved ? "Saved to wishlist" : "Wishlist"}
              </button>
            </div>

            {added ? (
              <div
                role="status"
                className="mt-8 max-w-lg border border-saaq-gold/30 bg-saaq-charcoal/80 px-6 py-6"
              >
                <p className="font-sans text-[10px] uppercase tracking-[0.32em] text-saaq-gold">
                  Added to bag
                </p>
                <p className="mt-3 font-display text-2xl text-saaq-ivory">
                  {product.name}
                </p>
                <p className="mt-2 font-sans text-xs tracking-wider text-saaq-ivory/50">
                  {quantity} × AED {product.price.toFixed(2)}
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button type="button" size="sm" onClick={openDrawer}>
                    View bag
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setAdded(false)}
                  >
                    Continue shopping
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="border-t border-white/10 bg-saaq-void py-20">
          <Reveal className="saaq-container">
            <Eyebrow>Continue the collection</Eyebrow>
            <h2 className="saaq-h2 mt-4">Related fragrances</h2>
            <div className="saaq-rule mt-6" />
            <div className="mt-12">
              <ProductGrid products={related} />
            </div>
          </Reveal>
        </section>
      ) : null}
    </div>
  );
}
