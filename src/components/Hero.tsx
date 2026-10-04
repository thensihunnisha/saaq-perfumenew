"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import type { HeroMotionState } from "@/components/home/heroMotion";
import { initialHeroMotion } from "@/components/home/heroMotion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";

const HeroBottleCanvas = dynamic(() => import("@/components/home/HeroBottleCanvas"), {
  ssr: false,
});

const HEADLINE = ["SCENT", "THAT", "DEFINES", "YOU."];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const motionRef = useRef<HeroMotionState>(initialHeroMotion());
  const [ready, setReady] = useState(false);
  const [stageReady, setStageReady] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setCompact(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const updateProgress = () => {
      const rect = section.getBoundingClientRect();
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
      motionRef.current.progress = clamp(-rect.top / travel, 0, 1);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) {
      return;
    }

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) {
      return;
    }

    const onMove = (event: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      motionRef.current.pointerX = (event.clientX - rect.left) / rect.width - 0.5;
      motionRef.current.pointerY = (event.clientY - rect.top) / rect.height - 0.5;
    };

    const onLeave = () => {
      motionRef.current.pointerX = 0;
      motionRef.current.pointerY = 0;
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate h-[220svh]"
    >
      <div
        className={cn(
          "sticky top-0 isolate min-h-[100svh] overflow-hidden bg-[#070706]",
          ready && "saaq-hero-ready"
        )}
      >
        <div
          aria-hidden
          className="saaq-hero-orb pointer-events-none absolute right-[12%] top-[16%] h-64 w-64 rounded-full bg-saaq-gold/16 blur-3xl"
        />
        <div
          aria-hidden
          className="saaq-hero-mist pointer-events-none absolute bottom-[8%] left-[18%] h-72 w-72 bg-saaq-gold/10 blur-[100px]"
        />

        <div className="saaq-hero-stage pointer-events-none absolute inset-0 lg:left-[22%]">
          {!stageReady ? (
            <Image
              src="/images/products/hero-emerald.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-contain object-center opacity-80"
            />
          ) : null}
          <HeroBottleCanvas
            motionRef={motionRef}
            reduced={reduced}
            compact={compact}
            onReady={() => setStageReady(true)}
          />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/40 sm:bg-gradient-to-r sm:from-black/72 sm:via-black/15 sm:to-transparent" />
        <div className="saaq-hero-veil pointer-events-none absolute inset-0 bg-black" />

        <div className="relative z-10 flex min-h-[100svh] items-end px-5 pb-24 pt-[calc(var(--saaq-header-offset)+0.75rem)] sm:items-center sm:px-10 sm:pb-20 md:px-16 lg:px-24">
          <div className="max-w-xl min-w-0 lg:max-w-2xl">
            <p className="saaq-hero-rise font-sans text-[10px] uppercase tracking-[0.32em] text-saaq-gold sm:tracking-[0.42em]">
              SAAQ PARFUMS
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.15rem,5.4vw,4.6rem)] leading-[0.9] tracking-[-0.04em] text-saaq-cream">
              {HEADLINE.map((line, index) => (
                <span
                  key={line}
                  className={cn(
                    "saaq-hero-line block",
                    `saaq-hero-line-${index + 1}`
                  )}
                >
                  {line}
                </span>
              ))}
            </h1>
            <p className="saaq-hero-rise saaq-hero-delay-3 mt-5 max-w-md font-sans text-sm leading-7 text-saaq-ivory/80 sm:mt-6">
              Fragrance created for those who leave an impression.
            </p>
            <div className="saaq-hero-rise saaq-hero-delay-4 mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              <ButtonLink href="/collection" size="lg" className="w-full text-center sm:w-auto">
                Explore Collection
              </ButtonLink>
              <ButtonLink
                href="/story"
                variant="outline"
                size="lg"
                className="w-full text-center sm:w-auto"
              >
                Discover SAAQ
              </ButtonLink>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            const section = sectionRef.current;
            const top = section
              ? section.offsetTop + section.offsetHeight - 24
              : window.innerHeight * 0.92;
            window.scrollTo({
              top,
              behavior: reduced ? "auto" : "smooth",
            });
          }}
          className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3"
          aria-label="Scroll to discover"
        >
          <span className="font-sans text-[9px] uppercase tracking-[0.32em] text-saaq-ivory/55">
            Scroll to discover
          </span>
          <span className="saaq-scroll-line" />
        </button>
      </div>
    </section>
  );
}
