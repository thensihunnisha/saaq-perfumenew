"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Body, DisplayHeading } from "@/components/ui";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const SLIDE_INTERVAL_MS = 6500;
const SWIPE_THRESHOLD = 48;

const SLIDES = [
  {
    eyebrow: "The House of SAAQ",
    title: "SAAQ",
    line: "The Art of Signature Fragrance",
    body: "Fragrance is not simply worn. It becomes your signature — an expression of presence, character, and unforgettable elegance.",
    image: "/images/banners/saaq-home-hero.png",
    imageClassName: "object-[82%_center] sm:object-[78%_50%] lg:object-[82%_55%]",
    href: "/collection",
    cta: "Explore Collection",
    secondaryHref: "/story",
    secondaryCta: "Discover SAAQ",
  },
  {
    eyebrow: "Collection 01",
    title: "Take Off",
    line: "Created for movement, freedom, and modern adventure.",
    body: "Bold woods, spice, and aquatic brightness meet in a trail that travels as you do.",
    image: "/images/collections/takeoff-home.jpg",
    imageClassName: "object-center",
    href: "/collection/takeoff",
    cta: "Discover Take Off",
  },
  {
    eyebrow: "Collection 02",
    title: "Gems",
    line: "Precious. Rare. Unforgettable.",
    body: "Each fragrance is faceted — light, depth, and a lingering brilliance that reveals itself slowly.",
    image: "/images/collections/gems-home.jpg",
    imageClassName: "object-center sm:object-[center_30%]",
    href: "/collection/gems",
    cta: "Discover Gems",
  },
] as const;

export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback((index: number) => {
    setActive((index + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => {
    setActive((current) => (current + 1) % SLIDES.length);
  }, []);

  const previous = useCallback(() => {
    setActive((current) => (current - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (paused || motion.matches) {
      return;
    }

    const timer = window.setInterval(next, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [next, paused]);

  const slide = SLIDES[active];

  return (
    <section
      className="relative isolate h-[100svh] min-h-[100svh] max-h-[1100px] overflow-hidden bg-[#070706] md:min-h-[640px] lg:min-h-[680px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current == null) {
          return;
        }

        const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
        touchStartX.current = null;

        if (Math.abs(delta) < SWIPE_THRESHOLD) {
          return;
        }

        if (delta < 0) {
          next();
        } else {
          previous();
        }
      }}
      aria-roledescription="carousel"
      aria-label="SAAQ featured collections"
    >
      <div
        className="absolute inset-0 flex saaq-transition duration-700 ease-out"
        style={{ transform: `translateX(-${active * 100}%)` }}
      >
        {SLIDES.map((item, index) => (
          <div key={item.image} className="relative h-full w-full shrink-0">
            <Image
              src={item.image}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className={cn("object-cover", item.imageClassName)}
            />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-[88%] bg-gradient-to-r from-black/85 via-black/50 to-transparent sm:w-[58%] sm:from-black/80 sm:via-black/45" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />

      <div className="relative z-20 flex h-full items-center px-5 pb-20 pt-20 sm:px-10 sm:pb-0 sm:pt-16 md:px-16 lg:px-24">
        <div className="max-w-xl min-w-0 lg:max-w-2xl" aria-live="polite">
          <div className="mb-5 flex items-center gap-3">
            <Sparkles size={13} strokeWidth={1} className="shrink-0 text-saaq-gold" />
            <span className="min-w-0 font-sans text-[9px] uppercase tracking-[0.28em] text-saaq-gold drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] sm:text-[10px] sm:tracking-[0.48em]">
              {slide.eyebrow}
            </span>
          </div>

          <DisplayHeading
            as="h1"
            className="text-saaq-cream drop-shadow-[0_8px_24px_rgba(0,0,0,0.75)]"
          >
            {slide.title}
          </DisplayHeading>

          <div className="mt-5 h-px w-24 bg-gradient-to-r from-saaq-gold to-transparent" />

          <p className="mt-6 max-w-lg text-pretty font-display text-xl leading-[1.25] text-saaq-ivory drop-shadow-[0_6px_18px_rgba(0,0,0,0.7)] sm:text-3xl lg:text-[40px]">
            {slide.line}
          </p>

          <div className="mt-6 max-w-md">
            <Body className="text-sm leading-7 text-saaq-cream/90 drop-shadow-[0_4px_14px_rgba(0,0,0,0.7)] sm:text-base">
              {slide.body}
            </Body>
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href={slide.href} size="lg" className="w-full text-center sm:w-auto">
              {slide.cta}
            </ButtonLink>
            {"secondaryHref" in slide && slide.secondaryHref ? (
              <ButtonLink
                href={slide.secondaryHref}
                variant="outline"
                size="lg"
                className="w-full text-center sm:w-auto"
              >
                {slide.secondaryCta}
              </ButtonLink>
            ) : null}
          </div>

          <div className="mt-8 flex items-center gap-4">
            <span className="h-px w-8 bg-[#d4af37]/60" />
            <span className="text-[8px] uppercase tracking-[0.35em] text-saaq-beige drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
              {active + 1} / {SLIDES.length}
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-7 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 sm:bottom-10 sm:left-8 sm:translate-x-0">
        {SLIDES.map((item, index) => (
          <button
            key={item.title}
            type="button"
            aria-label={`Show ${item.title}`}
            aria-current={index === active ? true : undefined}
            onClick={() => goTo(index)}
            className={cn(
              "saaq-transition h-1.5 rounded-full",
              index === active
                ? "w-8 bg-saaq-gold"
                : "w-4 bg-white/30 hover:bg-saaq-gold/70"
            )}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={previous}
        aria-label="Previous slide"
        className="saaq-transition absolute left-4 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/20 text-saaq-ivory hover:border-saaq-gold hover:text-saaq-gold md:flex lg:left-6"
      >
        <ChevronLeft size={18} strokeWidth={1.4} />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="saaq-transition absolute right-4 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/20 text-saaq-ivory hover:border-saaq-gold hover:text-saaq-gold md:flex lg:right-6"
      >
        <ChevronRight size={18} strokeWidth={1.4} />
      </button>

      <button
        type="button"
        onClick={() =>
          window.scrollTo({
            top: window.innerHeight * 0.9,
            behavior: "smooth",
          })
        }
        className="absolute bottom-7 right-6 z-30 hidden flex-col items-center gap-2 sm:flex lg:right-10"
        aria-label="Scroll to explore"
      >
        <span className="font-sans text-[8px] uppercase tracking-[0.35em] text-saaq-ivory/50 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="h-10 w-px bg-gradient-to-b from-[#d4af37] to-transparent sm:h-12" />
        <ArrowDown
          size={13}
          strokeWidth={1}
          className="saaq-hero-scroll-icon text-[#d4af37]"
        />
      </button>
    </section>
  );
}
