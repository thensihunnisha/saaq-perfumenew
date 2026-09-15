"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type MouseEvent } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/cn";
import { COLLECTION_LABELS, type Product } from "@/data/products";
import { getProductHref } from "@/lib/api";

type ProductCardProps = {
  product: Product;
};

const iconButtonClass =
  "saaq-transition flex h-10 w-10 items-center justify-center border border-white/20 bg-saaq-black/55 text-saaq-ivory backdrop-blur-sm hover:border-saaq-gold hover:text-saaq-gold";

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, openDrawer, itemCount } = useCart();
  const { isSaved, toggleItem } = useWishlist();
  const [added, setAdded] = useState(false);
  const saved = isSaved(product.id);
  const href = getProductHref(product.id);
  const hasOldPrice =
    typeof product.compareAtPrice === "number" &&
    product.compareAtPrice > product.price;

  const stopCardNavigation = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleWishlist = (event: MouseEvent<HTMLButtonElement>) => {
    stopCardNavigation(event);
    toggleItem(product);
  };

  const handleAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
    stopCardNavigation(event);
    addItem(product, 1, { openDrawer: false });
    setAdded(true);
  };

  const handleViewBag = (event: MouseEvent<HTMLButtonElement>) => {
    stopCardNavigation(event);
    openDrawer();
  };

  const handleGoToCart = (event: MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
  };

  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-saaq-charcoal">
        <Link href={href} className="absolute inset-0 z-0 block">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover saaq-img-zoom"
          />
        </Link>

        <div className="pointer-events-none absolute inset-0 z-10 bg-saaq-black/0 saaq-transition group-hover:bg-saaq-black/35" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3 bg-gradient-to-t from-saaq-black/55 to-transparent opacity-70 saaq-transition group-hover:opacity-100" />

        <button
          type="button"
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={saved}
          onClick={handleWishlist}
          className={cn(
            iconButtonClass,
            "absolute right-3 top-3 z-20",
            saved ? "border-saaq-gold text-saaq-gold" : ""
          )}
        >
          <Heart
            size={15}
            strokeWidth={1.4}
            className={cn(saved ? "fill-saaq-gold text-saaq-gold" : "")}
          />
        </button>

        <div className="absolute bottom-3 left-3 z-20 flex gap-2 opacity-100 saaq-transition sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
          <button
            type="button"
            aria-label={`Add ${product.name} to cart`}
            onClick={handleAddToCart}
            className={iconButtonClass}
          >
            <ShoppingBag size={15} strokeWidth={1.4} />
          </button>
          <WhatsAppButton product={product} variant="icon" />
        </div>

        {added ? (
          <div
            className="absolute inset-x-3 bottom-3 z-30 border border-saaq-gold/35 bg-saaq-black/88 px-4 py-4 backdrop-blur-md sm:inset-x-4 sm:bottom-4"
            onClick={(event) => event.stopPropagation()}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <p className="font-sans text-[9px] uppercase tracking-[0.32em] text-saaq-gold">
              Added to bag
            </p>
            <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.18em] text-saaq-ivory/55">
              {itemCount} {itemCount === 1 ? "item" : "items"} in bag
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleViewBag}
                className="saaq-transition border border-saaq-gold bg-saaq-gold px-3 py-2 font-sans text-[9px] uppercase tracking-[0.24em] text-saaq-black hover:bg-saaq-gold-deep"
              >
                View bag
              </button>
              <Link
                href="/cart"
                onClick={handleGoToCart}
                className="saaq-transition px-3 py-2 text-center font-sans text-[9px] uppercase tracking-[0.24em] text-saaq-gold hover:text-saaq-ivory"
              >
                Go to cart
              </Link>
            </div>
          </div>
        ) : null}
      </div>

      <div className="pt-5">
        <Link href={href} className="block">
          <p className="saaq-eyebrow">{COLLECTION_LABELS[product.collection]}</p>
          <h2 className="saaq-transition mt-2 font-display text-[1.2rem] leading-tight text-saaq-ivory group-hover:text-saaq-gold sm:text-[1.35rem]">
            {product.name}
          </h2>
          <p className="saaq-meta mt-2">{product.category}</p>
          <div className="mt-3 flex items-baseline gap-3">
            <p className="font-sans text-sm tracking-[0.08em] text-saaq-ivory/80">
              AED {product.price.toFixed(2)}
            </p>
            {hasOldPrice ? (
              <p className="font-sans text-xs tracking-[0.06em] text-saaq-ivory/35 line-through">
                AED {product.compareAtPrice?.toFixed(2)}
              </p>
            ) : null}
          </div>
        </Link>
      </div>
    </article>
  );
}
