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
          className="object-cover object-center"
        />

        <div className="relative z-10 flex h-full items-center justify-center px-6 pt-24 text-center sm:px-12 lg:w-[42%] lg:px-16 lg:pt-16">
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
            className="absolute inset-0 h-full w-full object-contain object-center"
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
            ? "absolute inset-0 bg-gradient-to-t from-saaq-black/55 via-transparent to-black/15"
            : "absolute inset-0 bg-gradient-to-r from-saaq-black via-saaq-black/55 to-transparent"
        }
      />
      {content.heroVideo ? null : (
        <div className="absolute inset-0 bg-gradient-to-t from-saaq-black via-transparent to-black/20" />
      )}
      <div className="absolute -right-10 top-1/4 h-72 w-72 rounded-full bg-saaq-gold/10 blur-3xl" />

      <div className="relative z-10 flex h-full items-center justify-start px-5 pt-20 sm:px-12 lg:px-20">
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
