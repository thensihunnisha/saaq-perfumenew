import Image from "next/image";
import { ButtonLink } from "@/components/ui";
import { SlideUp } from "@/components/motion";

export default function FinalCta() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <Image
        src="/images/collections/final-cta-home.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-saaq-black/60" />
      <div className="relative z-10 flex min-h-[100svh] items-center justify-center px-5 py-24 text-center">
        <SlideUp className="max-w-3xl">
          <p className="saaq-eyebrow">SAAQ</p>
          <h2 className="mt-6 font-display text-[clamp(2.6rem,8vw,6.75rem)] leading-[0.88] tracking-[-0.03em] text-saaq-ivory">
            Leave an impression.
          </h2>
          <ButtonLink href="/collection" className="mt-10 w-full text-center sm:w-auto">
            Explore the Collection
          </ButtonLink>
        </SlideUp>
      </div>
    </section>
  );
}
