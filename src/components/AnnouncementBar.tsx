"use client";

import Link from "next/link";
import { offers } from "@/data/offers";

export default function AnnouncementBar() {
  const offer = offers[0];

  if (!offer) {
    return null;
  }

  const copy = (
    <>
      {offer.eyebrow}
      <span className="mx-3 text-black/55">·</span>
      {offer.offer}
      <span className="mx-3 text-black/55">·</span>
      {offer.cta}
    </>
  );

  return (
    <Link
      href={offer.href}
      className="saaq-announce block overflow-hidden bg-saaq-gold text-black hover:bg-saaq-gold-deep"
    >
      <span className="sr-only">
        {offer.eyebrow}. {offer.offer}. {offer.cta}
      </span>
      <span
        aria-hidden="true"
        className="saaq-announce-track h-9 items-center font-sans text-[9px] font-semibold uppercase tracking-[0.28em] sm:text-[10px]"
      >
        <span className="flex items-center">
          {Array.from({ length: 4 }, (_, index) => (
            <span key={`a-${index}`} className="flex shrink-0 items-center px-8">
              {copy}
            </span>
          ))}
        </span>
        <span className="flex items-center" aria-hidden="true">
          {Array.from({ length: 4 }, (_, index) => (
            <span key={`b-${index}`} className="flex shrink-0 items-center px-8">
              {copy}
            </span>
          ))}
        </span>
      </span>
    </Link>
  );
}
