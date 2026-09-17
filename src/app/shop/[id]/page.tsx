
"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { getProduct } from "@/lib/api";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useCart } from "@/context/CartContext";
import { getOrderTotals } from "@/lib/orderTotals";
import type { Product } from "@/data/products";

export default function ProductDetailsPage() {
  const params = useParams();
  const { addItem } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const productId = String(params.id ?? "");

  useEffect(() => {
    if (!productId) {
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setHasError(false);

    getProduct(productId)
      .then((item) => {
        if (!cancelled) {
          setProduct(item);
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
  }, [productId]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080808] px-6 text-white">
        <p className="font-['Inter',sans-serif] text-[10px] uppercase tracking-[0.28em] text-white/40">
          Loading fragrance
        </p>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080808] px-6 text-white">
        <p className="font-['Inter',sans-serif] text-sm text-white/50">
          Unable to load this fragrance. Please try again.
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080808] px-6 text-white">
        <div className="text-center">
          <p className="mb-3 text-[10px] uppercase tracking-[0.4em] text-[#d4af37]">
            SAAQ PERFUME
          </p>

          <h1 className="font-['Playfair_Display',serif] text-3xl">
            Product Not Found
          </h1>

          <p className="mt-3 text-sm text-white/50">
            The fragrance you are looking for does not exist.
          </p>

          <Link
            href="/shop"
            className="mt-8 inline-flex items-center gap-2 border border-[#d4af37] px-6 py-3 text-[10px] uppercase tracking-[0.25em] text-[#d4af37] transition-all duration-300 hover:bg-[#d4af37] hover:text-black"
          >
            <ArrowLeft size={14} />
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const collectionName =
    product.collection === "takeoff" ? "Take Off Collection" : "Gems Collection";
  const { total } = getOrderTotals([
    {
      id: product.id,
      collection: product.collection,
      price: product.price,
      quantity,
    },
  ]);

  return (
    <div className="min-h-screen bg-[#080808] pt-[var(--saaq-header-offset)] text-white">
      {/* BACK TO SHOP */}
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <Link
          href="/shop"
          className="group inline-flex items-center gap-2 font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.25em] text-white/50 transition-colors duration-300 hover:text-[#d4af37]"
        >
          <ArrowLeft
            size={14}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          Back to Shop
        </Link>
      </div>

      {/* PRODUCT */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:py-16">
        <div className="grid min-w-0 grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* PRODUCT IMAGE */}
          <div className="relative">
            <div className="relative aspect-square overflow-hidden bg-[#111]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />

              {/* IMAGE OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              {/* COLLECTION LABEL */}
              <div className="absolute left-5 top-5 border border-[#d4af37]/50 bg-black/60 px-4 py-2 backdrop-blur-sm">
                <span className="font-['Inter',sans-serif] text-[8px] uppercase tracking-[0.3em] text-[#d4af37]">
                  {product.collection === "takeoff" ? "Take Off" : "Gems"}
                </span>
              </div>
            </div>
          </div>

          {/* PRODUCT INFORMATION */}
          <div className="flex flex-col justify-center">
            {/* BRAND */}
            <p className="font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.28em] text-[#d4af37] sm:tracking-[0.45em]">
              SAAQ PERFUME
            </p>

            {/* PRODUCT NAME */}
            <h1 className="mt-4 break-words font-['Playfair_Display',serif] text-3xl leading-tight sm:text-5xl lg:text-6xl">
              {product.name}
            </h1>

            {/* COLLECTION */}
            <p className="mt-4 font-['Inter',sans-serif] text-[10px] uppercase tracking-[0.3em] text-white/40">
              {collectionName}
            </p>

            {/* DIVIDER */}
            <div className="my-8 h-px w-full bg-white/10" />

            {/* PRICE */}
            <div>
              <p className="font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.3em] text-white/40">
                Price
              </p>

              <p className="mt-2 font-['Inter',sans-serif] text-2xl tracking-wider text-[#d4af37]">
                AED {product.price.toFixed(2)}
              </p>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-8">
              <p className="mb-3 font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.3em] text-white/40">
                The Fragrance
              </p>

              <p className="font-['Inter',sans-serif] text-sm leading-7 text-white/60">
                {product.description}
              </p>
            </div>

            {/* QUANTITY */}
            <div className="mt-8">
              <p className="mb-3 font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.3em] text-white/40">
                Quantity
              </p>

              <div className="flex w-fit items-center border border-white/20">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                  className="flex h-11 w-11 items-center justify-center text-white/60 transition-colors hover:bg-white/5 hover:text-[#d4af37]"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} strokeWidth={1.5} />
                </button>

                <span className="flex h-11 w-14 items-center justify-center border-x border-white/20 font-['Inter',sans-serif] text-sm">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() => setQuantity((current) => current + 1)}
                  className="flex h-11 w-11 items-center justify-center text-white/60 transition-colors hover:bg-white/5 hover:text-[#d4af37]"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* TOTAL */}
            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
              <span className="font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.25em] text-white/40">
                Total
              </span>

              <span className="font-['Inter',sans-serif] text-lg tracking-wider text-white">
                AED {total.toFixed(2)}
              </span>
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WhatsAppButton
                product={product}
                quantity={quantity}
                className="flex-1 rounded-full border-2 border-[#25D366] bg-[#25D366] py-4 text-white hover:border-[#20ba5a] hover:bg-[#20ba5a] hover:text-white hover:shadow-[0_0_25px_rgba(37,211,102,0.3)]"
              />

              {/* ADD TO CART */}
              <button
                type="button"
                onClick={() => {
                  addItem(product, quantity);
                }}
                className="flex flex-1 items-center justify-center gap-3 rounded-full border border-[#d4af37] bg-transparent px-6 py-4 text-[#d4af37] transition-all duration-300 hover:bg-[#d4af37] hover:text-black active:scale-[0.98]"
              >
                <ShoppingBag size={17} strokeWidth={1.5} />

                <span className="font-['Inter',sans-serif] text-[10px] font-semibold uppercase tracking-[0.2em]">
                  Add to Cart
                </span>
              </button>
            </div>

            {/* SHIPPING INFO */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
              <div>
                <p className="font-['Inter',sans-serif] text-[8px] uppercase tracking-[0.25em] text-[#d4af37]">
                  Delivery
                </p>

                <p className="mt-2 font-['Inter',sans-serif] text-[10px] text-white/50">
                  Across UAE
                </p>
              </div>

              <div>
                <p className="font-['Inter',sans-serif] text-[8px] uppercase tracking-[0.25em] text-[#d4af37]">
                  Experience
                </p>

                <p className="mt-2 font-['Inter',sans-serif] text-[10px] text-white/50">
                  Signature Fragrance
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FRAGRANCE STORY */}
      <section className="border-t border-white/10 bg-[#0b0b0b]">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center lg:py-20">
          <p className="font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.22em] text-[#d4af37] sm:tracking-[0.45em]">
            THE ART OF FRAGRANCE
          </p>

          <h2 className="mt-4 font-['Playfair_Display',serif] text-3xl sm:text-4xl">
            A Signature Worth Remembering
          </h2>

          <p className="mx-auto mt-6 max-w-2xl font-['Inter',sans-serif] text-sm leading-7 text-white/50">
            Every SAAQ fragrance is selected to create a distinctive olfactory
            experience. Discover a scent designed to become part of your
            signature.
          </p>
        </div>
      </section>

      {/* BACK TO COLLECTION */}
      <section className="bg-[#080808] px-6 py-12 text-center">
        <Link
          href={
            product.collection === "takeoff"
              ? "/shop?collection=takeoff"
              : "/shop?collection=gems"
          }
          className="inline-flex w-full max-w-xs items-center justify-center gap-3 border border-white/20 px-7 py-3 font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.22em] text-white/60 transition-all duration-300 hover:border-[#d4af37] hover:text-[#d4af37] sm:w-auto sm:tracking-[0.3em]"
        >
          <ArrowLeft size={13} />
          Explore {product.collection === "takeoff" ? "Take Off" : "Gems"}
        </Link>
      </section>
    </div>
  );
}

