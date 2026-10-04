import Image from "next/image";
import { Body, ButtonLink, Container } from "@/components/ui";
import { ImageReveal, SlideUp, TextReveal } from "@/components/motion";

export default function BrandStory() {
  return (
    <section className="bg-saaq-void">
      <Container>
        <div className="grid items-center gap-12 py-20 lg:grid-cols-2 lg:gap-20 lg:py-28">
          <ImageReveal className="relative aspect-[4/5] overflow-hidden bg-saaq-charcoal sm:aspect-[4/3]">
            <Image
              src="/images/collections/story-home.jpg"
              alt="The story of SAAQ"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[center_40%]"
            />
          </ImageReveal>

          <div>
            <SlideUp>
              <p className="saaq-eyebrow">The Story of SAAQ</p>
            </SlideUp>
            <TextReveal
              mode="lines"
              lines={["Fragrance", "is memory."]}
              as="h2"
              className="mt-5 font-display text-[clamp(2.2rem,5vw,4.5rem)] leading-[0.92] tracking-[-0.03em] text-saaq-ivory"
              delay={80}
              step={120}
            />
            <SlideUp delay={220}>
              <Body className="mt-6 max-w-md">
                Every scent carries a moment. SAAQ was created around the belief
                that fragrance should become part of the stories we leave
                behind.
              </Body>
              <ButtonLink
                href="/story"
                variant="outline"
                className="mt-10 w-full text-center sm:w-auto"
              >
                Discover Our Story
              </ButtonLink>
            </SlideUp>
          </div>
        </div>
      </Container>
    </section>
  );
}
