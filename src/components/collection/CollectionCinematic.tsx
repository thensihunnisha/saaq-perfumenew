"use client";

import Image from "next/image";
import { ButtonLink, DisplayHeading } from "@/components/ui";
import OffersSection from "@/components/home/OffersSection";

export default function CollectionCinematic() {
  return (
    <div>
      <section className="relative h-[92svh] min-h-[640px] overflow-hidden bg-[#030303]">
        <Image
          src="/images/collections/allcollection.jpg"
          alt="SAAQ fragrance collections"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-[center_right]"
        />

        <div className="relative z-10 flex h-full items-center px-6 pt-24 sm:px-12 lg:px-20">
          <div className="max-w-xl">
            <p className="saaq-hero-rise font-sans text-[11px] uppercase tracking-[0.32em] text-saaq-gold drop-shadow-[0_6px_18px_rgba(0,0,0,0.85)]">
              SAAQ PERFUME
            </p>
            <DisplayHeading as="h1" className="saaq-hero-rise mt-6 saaq-hero-delay-1 drop-shadow-[0_10px_28px_rgba(0,0,0,0.85)]">
              The Collection
            </DisplayHeading>
            <p className="saaq-hero-rise mt-6 max-w-md font-sans text-sm leading-7 text-saaq-ivory/90 saaq-hero-delay-3 drop-shadow-[0_6px_18px_rgba(0,0,0,0.8)]">
              Discover the world of SAAQ fragrances.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-saaq-black">
        <div className="saaq-container flex flex-col items-center gap-3 py-10 sm:flex-row sm:justify-center sm:gap-4">
          <ButtonLink href="#catalog" size="sm">
            All Collection
          </ButtonLink>
          <ButtonLink href="/collection/gems" variant="outline" size="sm">
            Gems Collection
          </ButtonLink>
          <ButtonLink href="/collection/takeoff" variant="outline" size="sm">
            Take Off Collection
          </ButtonLink>
        </div>
      </section>

      <OffersSection />
    </div>
  );
}
