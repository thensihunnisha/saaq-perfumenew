"use client";

import Image from "next/image";
import { useRef } from "react";
import { ButtonLink, Container } from "@/components/ui";
import { FadeIn, SlideUp } from "@/components/motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useSectionProgress } from "@/hooks/useSectionProgress";

export default function GemsCampaign() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useSectionProgress(sectionRef);
  const reduced = usePrefersReducedMotion();
  const scale = reduced ? 1 : 0.9 + progress * 0.16;
  const textY = reduced ? 0 : (0.5 - progress) * 36;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f4efe6] text-saaq-black lg:min-h-[92vh]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-saaq-gold/20 blur-[120px]"
      />
      <Container className="grid items-center gap-12 py-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:py-28">
        <SlideUp className="relative z-10" delay={40}>
          <p className="saaq-eyebrow">Gems</p>
          <h2
            className="saaq-h1 mt-5 !text-saaq-black"
            style={{ transform: `translate3d(0, ${textY}px, 0)` }}
          >
            Precious by design.
          </h2>
          <p className="mt-6 max-w-md font-sans text-sm leading-7 text-saaq-black/60">
            A refined collection created for evenings, moments and memories that
            deserve to linger.
          </p>
          <ButtonLink href="/collection/gems" className="mt-10 w-full text-center sm:w-auto">
            Discover Gems
          </ButtonLink>
        </SlideUp>

        <FadeIn delay={120} className="relative mx-auto aspect-[4/3] w-full max-w-md lg:max-w-none">
          <div
            className="absolute inset-0 will-change-transform"
            style={{ transform: `scale(${scale})` }}
          >
            <Image
              src="/images/collections/gems-precious-snow.jpg"
              alt="Gems collection"
              fill
              sizes="(max-width: 1024px) 90vw, 46vw"
              className="object-contain object-center drop-shadow-[0_18px_40px_rgba(80,60,30,0.18)]"
            />
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
