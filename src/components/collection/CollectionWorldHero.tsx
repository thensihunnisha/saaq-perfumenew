"use client";

import Image from "next/image";
import { useRef } from "react";
import { DisplayHeading } from "@/components/ui";
import { cn } from "@/lib/cn";
import type { CollectionWorldContent } from "@/data/collectionPages";
import { useParallaxTransform } from "@/hooks/useParallaxTransform";

type CollectionWorldHeroProps = {
  content: CollectionWorldContent;
};

export default function CollectionWorldHero({
  content,
}: CollectionWorldHeroProps) {
  const mediaRef = useRef<HTMLDivElement>(null);
  const isGems = content.theme === "gems";

  useParallaxTransform(
    mediaRef,
    isGems || content.heroVideo ? 0 : 0.28,
    isGems || content.heroVideo ? 0 : 0.00022
  );

  if (isGems) {
    return (
      <section className="relative h-[92svh] min-h-0 overflow-hidden bg-[#030303] sm:min-h-[640px]">
        <Image
          src={content.heroImage}
          alt="Gems collection"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-[center_30%] sm:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/55 lg:bg-gradient-to-r lg:from-black/45 lg:via-transparent lg:to-transparent" />

        <div className="relative z-10 flex h-full items-end justify-center px-5 pb-16 pt-24 text-center sm:items-center sm:px-12 sm:pb-0 lg:w-[42%] lg:justify-center lg:px-16 lg:pt-16">
          <div className="max-w-xl">
            <p className="saaq-hero-rise font-sans text-[10px] uppercase tracking-[0.28em] text-saaq-gold sm:tracking-[0.38em]">
              {content.eyebrow}
            </p>
            <DisplayHeading
              as="h1"
              className="saaq-hero-rise mt-5 italic saaq-hero-delay-1"
            >
              {content.title}
            </DisplayHeading>
            <p className="saaq-hero-rise mx-auto mt-6 max-w-md font-sans text-sm leading-7 text-saaq-ivory/90 saaq-hero-delay-3">
              {content.heroLine}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={
        content.heroVideo
          ? "relative aspect-[4/5] min-h-[380px] w-full overflow-hidden bg-saaq-black sm:aspect-video sm:min-h-[420px] lg:min-h-[560px]"
          : "relative h-[92svh] min-h-0 overflow-hidden bg-saaq-black sm:min-h-[640px]"
      }
    >
      <div
        ref={mediaRef}
        className={
          content.heroVideo
            ? "absolute inset-0"
            : "absolute inset-[-14%] will-change-transform"
        }
      >
        {content.heroVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={content.heroImage}
            className="absolute inset-0 h-full w-full object-cover object-center sm:object-[center_30%]"
          >
            <source src={content.heroVideo} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={content.heroImage}
            alt=""
            fill
            priority
            unoptimized
            sizes="100vw"
            className="saaq-hero-media object-cover object-center sm:object-[center_30%]"
          />
        )}
      </div>

      <div
        className={
          content.heroVideo
            ? "absolute inset-0 bg-gradient-to-b from-black/75 via-black/15 to-saaq-black/55 sm:bg-gradient-to-t sm:from-saaq-black/55 sm:via-transparent sm:to-black/15"
            : "absolute inset-0 bg-gradient-to-r from-saaq-black via-saaq-black/55 to-transparent"
        }
      />
      {content.heroVideo ? null : (
        <div className="absolute inset-0 bg-gradient-to-t from-saaq-black via-transparent to-black/20" />
      )}
      <div className="pointer-events-none absolute right-0 top-1/4 h-56 w-56 rounded-full bg-saaq-gold/10 blur-3xl sm:h-72 sm:w-72" />

      <div className="relative z-10 flex h-full items-start px-5 pb-16 pt-[calc(var(--saaq-header-offset)+0.75rem)] sm:items-center sm:px-12 sm:pb-0 sm:pt-24 lg:px-20">
        <div className="max-w-2xl min-w-0">
          <p className="saaq-hero-rise font-sans text-[10px] uppercase tracking-[0.28em] text-saaq-gold sm:tracking-[0.38em]">
            {content.eyebrow}
          </p>
          <DisplayHeading
            as="h1"
            className="saaq-hero-rise mt-5 tracking-[-0.03em] saaq-hero-delay-1 drop-shadow-[0_10px_28px_rgba(0,0,0,0.85)]"
          >
            {content.title}
          </DisplayHeading>
          <p className="saaq-hero-rise mt-6 max-w-md font-sans text-sm leading-7 text-saaq-ivory/90 saaq-hero-delay-3 drop-shadow-[0_6px_18px_rgba(0,0,0,0.8)]">
            {content.heroLine}
          </p>
        </div>
      </div>
    </section>
  );
}
