import { Container } from "@/components/ui";
import { FadeIn, TextReveal } from "@/components/motion";

export default function BrandIntro() {
  return (
    <section className="relative overflow-hidden bg-saaq-ivory text-saaq-black">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(40rem,70%)] -translate-x-1/2 bg-gradient-to-r from-transparent via-saaq-gold/50 to-transparent"
      />
      <Container className="saaq-section">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <p className="font-sans text-[10px] uppercase tracking-[0.32em] text-saaq-gold-deep sm:tracking-[0.42em]">
              The SAAQ Signature
            </p>
          </FadeIn>
          <TextReveal
            mode="lines"
            lines={["More than a fragrance.", "A presence."]}
            as="h2"
            className="mt-7 font-display text-[clamp(2.1rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.03em] text-saaq-black"
            delay={80}
            step={140}
          />
          <FadeIn delay={280}>
            <p className="mx-auto mt-8 max-w-xl font-sans text-sm leading-8 text-saaq-black/60 sm:text-base">
              Every SAAQ fragrance is created to become part of the person who
              wears it.
            </p>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
