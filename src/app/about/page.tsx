
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export default function OurStoryPage() {
  return (
    <main className="min-h-screen bg-[#080808] text-white">
      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative min-h-[75vh] overflow-hidden pt-[114px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/story/story-hero.jpg"
            alt="SAAQ Perfume luxury fragrance"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          {/* Dark overlays */}
          <div className="absolute inset-0 bg-black/55" />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-black/20" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-black/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex min-h-[calc(75vh-114px)] items-center">
          <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 lg:px-16">
            <div className="max-w-2xl">
              <p className="mb-5 font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.45em] text-[#d4af37] sm:text-[10px]">
                OUR STORY
              </p>

              <h1 className="font-['Playfair_Display',serif] text-5xl leading-[0.95] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
                More Than
                <br />
                Just a Fragrance
              </h1>

              <p className="mt-7 max-w-xl font-['Inter',sans-serif] text-sm leading-7 text-white/65 sm:text-base">
                At SAAQ, we believe a fragrance is not just a scent.
                It is a story, a memory, and a part of who you are.
              </p>

              <div className="mt-8 h-px w-16 bg-[#d4af37]" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
          <span className="font-['Inter',sans-serif] text-[8px] uppercase tracking-[0.3em] text-white/40">
            Discover
          </span>

          <ArrowDown
            size={14}
            strokeWidth={1}
            className="animate-bounce text-[#d4af37]"
          />
        </div>
      </section>

      {/* =========================================================
          INTRODUCTION
      ========================================================= */}

      <section className="border-b border-white/10 bg-[#080808]">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-5 font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.4em] text-[#d4af37]">
              THE SAAQ PHILOSOPHY
            </p>

            <h2 className="font-['Playfair_Display',serif] text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
              A fragrance is a silent
              <br className="hidden sm:block" />
              expression of identity.
            </h2>

            <p className="mx-auto mt-7 max-w-2xl font-['Inter',sans-serif] text-sm leading-7 text-white/45 sm:text-base">
              We created SAAQ with one simple belief — that the right
              fragrance has the power to become part of your identity.
              A scent can take you back to a moment, remind you of someone
              you love, or become the signature people remember you by.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          THE BEGINNING
      ========================================================= */}

      <section className="border-b border-white/10 bg-[#0a0a0a]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 sm:px-10 lg:grid-cols-2 lg:gap-20 lg:px-16 lg:py-24">
          {/* Image */}
          <div className="group relative overflow-hidden">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#111]">
              <Image
                src="/images/story/story-heritage.jpg"
                alt="Arabic perfumery heritage and incense"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/0" />
            </div>

            {/* Gold corner */}
            <div className="absolute -bottom-2 -right-2 h-20 w-20 border-b border-r border-[#d4af37]/50" />
          </div>

          {/* Text */}
          <div className="lg:pl-4">
            <p className="mb-4 font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.4em] text-[#d4af37]">
              THE BEGINNING
            </p>

            <h2 className="font-['Playfair_Display',serif] text-3xl leading-tight sm:text-4xl lg:text-5xl">
              Rooted in Heritage,
              <br />
              Crafted for Today
            </h2>

            <div className="mt-7 space-y-5 font-['Inter',sans-serif] text-sm leading-7 text-white/50">
              <p>
                SAAQ was born from a deep appreciation for the rich
                tradition of Arabic perfumery and a vision to bring
                this timeless art into the modern world.
              </p>

              <p>
                Inspired by the desert, the culture, and the essence
                of the UAE, we created SAAQ to be more than a fragrance.
                It is a bridge between heritage and modern elegance.
              </p>
            </div>

            <div className="mt-8 h-px w-14 bg-[#d4af37]" />
          </div>
        </div>
      </section>

      {/* =========================================================
          HERITAGE QUOTE
      ========================================================= */}

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <Image
            src="/images/story/story-desert.jpg"
            alt="UAE desert landscape"
            fill
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80" />
        </div>

        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center sm:px-10 lg:py-32">
          <span className="font-['Playfair_Display',serif] text-5xl text-[#d4af37]/50">
            “
          </span>

          <blockquote className="mt-3 font-['Playfair_Display',serif] text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
            Tradition gives us the foundation.
            <br />
            Modernity gives us the freedom to create.
          </blockquote>

          <div className="mx-auto mt-8 h-px w-12 bg-[#d4af37]" />

          <p className="mt-5 font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.35em] text-white/40">
            THE SAAQ PHILOSOPHY
          </p>
        </div>
      </section>

      {/* =========================================================
          OUR CRAFT
      ========================================================= */}

      <section className="border-b border-white/10 bg-[#080808]">
        <div className="mx-auto grid max-w-7xl items-stretch lg:grid-cols-2">
          {/* Text */}
          <div className="flex items-center px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
            <div className="max-w-xl">
              <p className="mb-4 font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.4em] text-[#d4af37]">
                OUR CRAFT
              </p>

              <h2 className="font-['Playfair_Display',serif] text-3xl leading-tight sm:text-4xl lg:text-5xl">
                Exquisite Blends.
                <br />
                Uncompromising Quality.
              </h2>

              <div className="mt-7 space-y-5 font-['Inter',sans-serif] text-sm leading-7 text-white/50">
                <p>
                  Every SAAQ fragrance is carefully crafted using only
                  the finest ingredients — from rare oud and precious
                  woods to delicate florals and exotic spices.
                </p>

                <p>
                  Our master perfumers blend tradition and innovation
                  to create scents that are bold, refined, and
                  unforgettable.
                </p>

                <p>
                  Every note has a purpose. Every accord is carefully
                  considered. Every bottle carries the SAAQ signature.
                </p>
              </div>

              <Link
                href="/shop"
                className="group mt-9 inline-flex items-center gap-3 border border-[#d4af37]/60 px-7 py-4 font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.3em] text-[#d4af37] transition-all duration-300 hover:bg-[#d4af37] hover:text-black"
              >
                Explore Our Fragrances

                <ArrowUpRight
                  size={14}
                  strokeWidth={1.3}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative min-h-[420px] overflow-hidden lg:min-h-[650px]">
            <Image
              src="/images/story/story-craft.jpg"
              alt="Master perfumer creating a fragrance"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/15" />

            <div className="absolute bottom-8 left-8 border-l border-[#d4af37] pl-5">
              <p className="font-['Inter',sans-serif] text-[8px] uppercase tracking-[0.3em] text-[#d4af37]">
                SAAQ PERFUME
              </p>

              <p className="mt-2 font-['Playfair_Display',serif] text-lg">
                Crafted with intention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          INGREDIENTS
      ========================================================= */}

      <section className="border-b border-white/10 bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.4em] text-[#d4af37]">
              THE ESSENCE
            </p>

            <h2 className="font-['Playfair_Display',serif] text-3xl sm:text-4xl lg:text-5xl">
              Inspired by the
              <br />
              world around us.
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Oud */}
            <div className="group border border-white/10 bg-[#0d0d0d] p-6 transition-all duration-500 hover:border-[#d4af37]/40">
              <div className="relative mb-6 aspect-square overflow-hidden">
                <Image
                  src="/images/story/ingredient-oud.jpg"
                  alt="Oud wood"
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <p className="font-['Inter',sans-serif] text-[8px] uppercase tracking-[0.3em] text-[#d4af37]">
                01
              </p>

              <h3 className="mt-2 font-['Playfair_Display',serif] text-2xl">
                Oud
              </h3>

              <p className="mt-3 font-['Inter',sans-serif] text-xs leading-6 text-white/40">
                Deep, mysterious, and unmistakably Arabian.
              </p>
            </div>

            {/* Amber */}
            <div className="group border border-white/10 bg-[#0d0d0d] p-6 transition-all duration-500 hover:border-[#d4af37]/40">
              <div className="relative mb-6 aspect-square overflow-hidden">
                <Image
                  src="/images/story/ingredient-amber.jpg"
                  alt="Amber fragrance ingredient"
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <p className="font-['Inter',sans-serif] text-[8px] uppercase tracking-[0.3em] text-[#d4af37]">
                02
              </p>

              <h3 className="mt-2 font-['Playfair_Display',serif] text-2xl">
                Amber
              </h3>

              <p className="mt-3 font-['Inter',sans-serif] text-xs leading-6 text-white/40">
                Warm, sensual, and rich with golden depth.
              </p>
            </div>

            {/* Rose */}
            <div className="group border border-white/10 bg-[#0d0d0d] p-6 transition-all duration-500 hover:border-[#d4af37]/40">
              <div className="relative mb-6 aspect-square overflow-hidden">
                <Image
                  src="/images/story/ingredient-rose.jpg"
                  alt="Luxury rose fragrance ingredient"
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <p className="font-['Inter',sans-serif] text-[8px] uppercase tracking-[0.3em] text-[#d4af37]">
                03
              </p>

              <h3 className="mt-2 font-['Playfair_Display',serif] text-2xl">
                Rose
              </h3>

              <p className="mt-3 font-['Inter',sans-serif] text-xs leading-6 text-white/40">
                Delicate elegance balanced with timeless character.
              </p>
            </div>

            {/* Spice */}
            <div className="group border border-white/10 bg-[#0d0d0d] p-6 transition-all duration-500 hover:border-[#d4af37]/40">
              <div className="relative mb-6 aspect-square overflow-hidden">
                <Image
                  src="/images/story/ingredient-spice.jpg"
                  alt="Exotic perfume spices"
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <p className="font-['Inter',sans-serif] text-[8px] uppercase tracking-[0.3em] text-[#d4af37]">
                04
              </p>

              <h3 className="mt-2 font-['Playfair_Display',serif] text-2xl">
                Spice
              </h3>

              <p className="mt-3 font-['Inter',sans-serif] text-xs leading-6 text-white/40">
                Exotic warmth that gives each composition character.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          OUR MISSION
      ========================================================= */}

      <section className="border-b border-white/10 bg-[#080808]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 sm:px-10 lg:grid-cols-2 lg:gap-20 lg:px-16 lg:py-24">
          {/* Image */}
          <div className="relative order-2 overflow-hidden lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#111]">
              <Image
                src="/images/story/story-mission.jpg"
                alt="SAAQ perfume in the UAE desert"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-[1200ms] hover:scale-105"
              />
            </div>

            <div className="absolute left-0 top-0 h-20 w-20 border-l border-t border-[#d4af37]/50" />
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <p className="mb-4 font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.4em] text-[#d4af37]">
              OUR MISSION
            </p>

            <h2 className="font-['Playfair_Display',serif] text-3xl leading-tight sm:text-4xl lg:text-5xl">
              To Create Scents
              <br />
              That Live With You
            </h2>

            <div className="mt-7 space-y-5 font-['Inter',sans-serif] text-sm leading-7 text-white/50">
              <p>
                Our mission is simple: to craft exceptional fragrances
                that become a part of your journey.
              </p>

              <p>
                Whether it is a special moment or an everyday ritual,
                SAAQ is here to make every experience more memorable.
              </p>

              <p>
                We want every person who wears SAAQ to feel confident,
                distinctive, and unforgettable.
              </p>
            </div>

            <div className="mt-8 h-px w-14 bg-[#d4af37]" />
          </div>
        </div>
      </section>

      {/* =========================================================
          BRAND STATEMENT
      ========================================================= */}

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <Image
            src="/images/story/story-closing.jpg"
            alt="SAAQ luxury perfume"
            fill
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/70" />

          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/70 via-black/30 to-[#080808]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 py-28 text-center sm:px-10 lg:py-36">
          <p className="mb-6 font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.45em] text-[#d4af37]">
            SAAQ PERFUME · UAE
          </p>

          <h2 className="font-['Playfair_Display',serif] text-4xl italic leading-tight sm:text-5xl lg:text-6xl">
            The Art of
            <br />
            Signature Fragrance
          </h2>

          <div className="mx-auto mt-8 h-px w-16 bg-[#d4af37]" />

          <p className="mx-auto mt-7 max-w-xl font-['Inter',sans-serif] text-xs leading-6 text-white/45 sm:text-sm">
            Discover fragrances created to become part of your story.
          </p>

          <Link
            href="/shop"
            className="group mt-9 inline-flex items-center gap-3 bg-[#d4af37] px-9 py-4 font-['Inter',sans-serif] text-[9px] font-medium uppercase tracking-[0.3em] text-black transition-all duration-300 hover:bg-[#e4c45a] hover:shadow-[0_0_30px_rgba(212,175,55,0.18)]"
          >
            Discover SAAQ

            <ArrowUpRight
              size={14}
              strokeWidth={1.4}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </section>

      {/* =========================================================
          BOTTOM BRAND MESSAGE
      ========================================================= */}

      <section className="bg-[#060606]">
        <div className="mx-auto max-w-7xl px-6 py-12 text-center">
          <p className="font-['Playfair_Display',serif] text-xl text-white/80 sm:text-2xl">
            The Art of Signature Fragrance
          </p>

          <p className="mt-3 font-['Inter',sans-serif] text-[8px] uppercase tracking-[0.35em] text-white/30">
            SAAQ PERFUME · UAE
          </p>

          <div className="mx-auto mt-5 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-[#d4af37]/40" />
            <span className="h-1 w-1 rotate-45 bg-[#d4af37]" />
            <span className="h-px w-8 bg-[#d4af37]/40" />
          </div>
        </div>
      </section>
    </main>
  );
}

