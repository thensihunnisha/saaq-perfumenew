import {
  Body,
  Container,
  DisplayHeading,
  GoldRule,
  Section,
} from "@/components/ui";
import Reveal from "@/components/Reveal";

export default function BrandIntro() {
  return (
    <Section>
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <DisplayHeading as="h2">SAAQ</DisplayHeading>
          <p className="mt-6 font-sans text-[11px] uppercase tracking-[0.32em] text-saaq-gold">
            The Art of Signature Fragrance
          </p>
          <GoldRule className="mx-auto mt-8" />
          <Body className="mx-auto mt-8 max-w-xl">
            SAAQ is a UAE fragrance house composed for presence. Each bottle is
            an impression — heritage, modern elegance, and the quiet confidence
            of a scent that is remembered.
          </Body>
        </Reveal>
      </Container>
    </Section>
  );
}
