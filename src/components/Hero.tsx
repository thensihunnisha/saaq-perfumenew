"use client";

import { useRef } from "react";
import { ArrowDown, Sparkles } from "lucide-react";

import { Body, DisplayHeading } from "@/components/ui";
import { ButtonLink } from "@/components/ui/Button";
import { useParallaxTransform } from "@/hooks/useParallaxTransform";
import { cn } from "@/lib/cn";

const VIDEO_SRC = "/images/collections/saaqhomebanner.mp4";

export default function Hero() {
  const mediaRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useParallaxTransform(mediaRef, 0.12);
  useParallaxTransform(copyRef, 0.035);

  return (
    <section
      className={cn(
        "relative isolate min-h-[680px] h-[100svh] max-h-[1100px]",
        "overflow-hidden bg-[#070706]"
      )}
    >
      {/* =====================================================
          BACKGROUND MEDIA
      ====================================================== */}

      <div className="absolute inset-0 overflow-hidden">
        <div ref={mediaRef} className="absolute inset-0 will-change-transform">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-[58%] bg-gradient-to-r from-black/80 via-black/45 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div
        ref={copyRef}
        className={cn(
          "relative z-20 flex h-full items-center",
          "px-6 pt-16 sm:px-10 md:px-16 lg:px-24",
          "will-change-transform"
        )}
      >
        <div className="max-w-xl lg:max-w-2xl">
          <div className="saaq-hero-rise mb-5 flex items-center gap-3">
            <Sparkles size={13} strokeWidth={1} className="text-saaq-gold" />
            <span className="font-sans text-[9px] uppercase tracking-[0.48em] text-saaq-gold drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] sm:text-[10px]">
              The House of SAAQ
            </span>
          </div>

          <DisplayHeading
            as="h1"
            className="saaq-hero-rise text-saaq-cream drop-shadow-[0_8px_24px_rgba(0,0,0,0.75)]"
          >
            SAAQ
          </DisplayHeading>

          <div className="saaq-hero-rise saaq-hero-delay-1 mt-5 h-px w-24 bg-gradient-to-r from-saaq-gold to-transparent" />

          <p className="saaq-hero-rise saaq-hero-delay-2 mt-6 max-w-lg font-display text-2xl leading-[1.25] text-saaq-ivory drop-shadow-[0_6px_18px_rgba(0,0,0,0.7)] sm:text-3xl lg:text-[40px]">
            The Art of
            <br />
            <span className="text-saaq-gold">Signature Fragrance</span>
          </p>

          <div className="saaq-hero-rise saaq-hero-delay-3 mt-6 max-w-md">
            <Body className="text-sm leading-7 text-saaq-cream/90 drop-shadow-[0_4px_14px_rgba(0,0,0,0.7)] sm:text-base">
              Fragrance is not simply worn. It becomes your signature — an expression of presence, character, and unforgettable elegance.
            </Body>
          </div>

          {/* Buttons */}
          <div className="saaq-hero-rise saaq-hero-delay-4 mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/collection" size="lg">
              Explore Collection
            </ButtonLink>

            <ButtonLink href="/story" variant="outline" size="lg">
              Discover SAAQ
            </ButtonLink>
          </div>

          {/* Small collection indication */}
          <div className="saaq-hero-rise saaq-hero-delay-5 mt-8 flex items-center gap-4">
            <span className="h-px w-8 bg-[#d4af37]/60" />

            <span className="text-[8px] uppercase tracking-[0.35em] text-saaq-beige drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
              Gems · Take Off
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          SCROLL INDICATOR
      ====================================================== */}

      <button
        type="button"
        onClick={() =>
          window.scrollTo({
            top: window.innerHeight * 0.9,
            behavior: "smooth",
          })
        }
        className={cn(
          "absolute bottom-7 left-1/2 z-30 flex -translate-x-1/2",
          "flex-col items-center gap-2",
          "sm:bottom-10 sm:left-auto sm:right-8 sm:translate-x-0"
        )}
        aria-label="Scroll to explore"
      >
        <span
          className={cn(
            "font-sans text-[8px] uppercase tracking-[0.35em]",
            "text-saaq-ivory/50 [writing-mode:vertical-rl]"
          )}
        >
          Scroll
        </span>

        <span
          className={cn(
            "h-10 w-px bg-gradient-to-b from-[#d4af37] to-transparent sm:h-12"
          )}
        />

        <ArrowDown
          size={13}
          strokeWidth={1}
          className="saaq-hero-scroll-icon text-[#d4af37]"
        />
      </button>

      {/* Bottom corner detail */}
      <div
        className={cn(
          "pointer-events-none absolute bottom-8 left-6 z-20 hidden sm:block lg:left-10"
        )}
      >
        <div className="h-px w-12 bg-[#d4af37]/40" />
      </div>
    </section>
  );
}
