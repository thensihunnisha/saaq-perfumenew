"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { searchProducts } from "@/data/products";

type SearchOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  const results = useMemo(() => searchProducts(query), [query]);
  const hasQuery = query.trim().length > 0;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  if (!open) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search fragrances"
      className="fixed inset-0 z-[120] flex flex-col bg-saaq-black/97 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] backdrop-blur-xl saaq-overlay-in"
    >
      <form
        onSubmit={handleSubmit}
        className="border-b border-saaq-gold/20 px-4 py-4 sm:px-8 sm:py-6"
      >
        <div className="mx-auto flex w-full max-w-4xl items-center gap-3">
          <Search
            size={18}
            strokeWidth={1.4}
            className="shrink-0 text-saaq-gold"
          />
          <input
            ref={inputRef}
            type="search"
            value={query}
            enterKeyHint="search"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, collection, category"
            aria-label="Search fragrances"
            className="h-12 min-w-0 flex-1 bg-transparent font-sans text-base tracking-wide text-saaq-ivory outline-none placeholder:text-saaq-ivory/30 sm:h-14 sm:text-lg"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="saaq-transition flex h-11 w-11 shrink-0 items-center justify-center border border-white/10 text-saaq-ivory/70 hover:border-saaq-gold hover:text-saaq-gold"
          >
            <X size={20} strokeWidth={1.4} />
          </button>
        </div>
        <p className="mx-auto mt-3 hidden max-w-4xl font-sans text-[10px] uppercase tracking-[0.22em] text-saaq-ivory/30 sm:block">
          Esc to close
        </p>
      </form>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-8 sm:py-10">
          {!hasQuery ? (
            <p className="font-display text-2xl text-saaq-ivory/45 sm:text-3xl">
              Begin typing to find a signature scent.
            </p>
          ) : results.length === 0 ? (
            <p className="font-display text-2xl text-saaq-ivory sm:text-3xl">
              No fragrances found
            </p>
          ) : (
            <ul className="divide-y divide-white/10">
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/product/${product.id}`}
                    onClick={onClose}
                    className="saaq-transition group flex items-center gap-4 py-4 sm:gap-6 sm:py-5"
                  >
                    <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-saaq-charcoal sm:h-24 sm:w-20">
                      <Image
                        src={product.image}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover saaq-img-zoom"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-xl text-saaq-ivory group-hover:text-saaq-gold sm:text-2xl">
                        {product.name}
                      </p>
                      <p className="saaq-meta mt-1">{product.category}</p>
                      <p className="mt-2 font-sans text-sm tracking-[0.08em] text-saaq-ivory/70">
                        AED {product.price.toFixed(2)}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
