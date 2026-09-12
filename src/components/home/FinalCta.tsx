import Image from "next/image";
import Reveal from "@/components/Reveal";
import { ButtonLink, DisplayHeading } from "@/components/ui";

export default function FinalCta() {
  return (
    <section className="relative min-h-[70vh] overflow-hidden">
      <Image
        src="/images/collections/final-cta-home.jpg"
        alt="SAAQ Emerald and Crystal"
        fill
        unoptimized
        sizes="100vw"
        className="saaq-hero-media object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-saaq-black/50 via-saaq-black/15 to-transparent" />

      <div className="relative z-10 flex min-h-[70vh] items-center justify-start px-6 py-24 sm:px-10 md:px-16 lg:px-24">
        <Reveal className="max-w-xl text-left">
          <p className="saaq-eyebrow">SAAQ</p>
          <DisplayHeading as="h2" className="mt-6">
            Leave your
            <br />
            signature.
          </DisplayHeading>
          <ButtonLink href="/collection" className="mt-10">
            Explore Collection
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
