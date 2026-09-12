import type { Metadata } from "next";
import Image from "next/image";
import {
  Body,
  ButtonLink,
  Container,
  DisplayHeading,
  Eyebrow,
  GoldRule,
  Heading,
  Section,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "The Story Behind SAAQ | SAAQ PERFUME",
  description:
    "Every brand begins with a story. Meet Anwer Saadiq, founder of SAAQ — a UAE fragrance house created around identity, heritage, and modern luxury.",
};

export default function StoryPage() {
  return (
    <div className="saaq-page bg-saaq-black text-saaq-ivory">
      <section className="border-b border-white/10">
        <Container className="flex min-h-[62vh] flex-col justify-center py-20 sm:py-24 lg:py-28">
          <div className="max-w-3xl">
            <DisplayHeading as="h1">The Story Behind SAAQ</DisplayHeading>
            <p className="saaq-eyebrow mt-6">A Fragrance Journey</p>
            <div className="mt-8 h-px w-24 bg-gradient-to-r from-saaq-gold to-transparent" />
            <Body className="mt-8 max-w-xl">
              Every brand begins with a story. SAAQ began with a passion for
              fragrance, identity and creating something truly personal.
            </Body>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>SAAQ</Eyebrow>
            <Heading className="mt-5">More Than a Fragrance</Heading>
            <GoldRule className="mx-auto mt-8" />
            <Body className="mx-auto mt-8 max-w-xl">
              At SAAQ, we believe a fragrance is more than a scent. It becomes
              part of the moments we remember, the places we experience and the
              impression we leave behind.
            </Body>
            <Body className="mx-auto mt-6 max-w-xl">
              Inspired by the rich fragrance culture of the UAE and the timeless
              appeal of Arabian perfumery, SAAQ brings together heritage and
              modern sophistication.
            </Body>
          </div>
        </Container>
      </Section>

      <Section muted className="border-y border-white/10">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="mx-auto w-full max-w-md lg:mx-0">
              <div className="relative overflow-hidden border border-saaq-gold/35 bg-saaq-charcoal p-2">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#ece7df]">
                  <Image
                    src="/images/founder/saadiq.jpeg"
                    alt="Anwer Saadiq, Founder of SAAQ Perfume"
                    fill
                    sizes="(max-width: 1024px) 90vw, 420px"
                    className="object-cover object-[center_18%]"
                  />
                </div>
              </div>
            </div>

            <div className="max-w-xl">
              <Eyebrow>Founder of SAAQ</Eyebrow>
              <Heading className="mt-5">Anwer Saadiq</Heading>
              <GoldRule className="mt-8" />
              <Body className="mt-8">
                Anwer Saadiq is the founder of SAAQ and a UAE-based vlogger and
                content creator.
              </Body>
              <Body className="mt-6">
                Through his journey as a creator in the UAE, Anwer developed a
                deep appreciation for the people, culture and lifestyle that
                make the region unique. SAAQ represents another expression of
                that passion — bringing together his vision for modern luxury
                with the timeless world of fragrance.
              </Body>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>The Vision</Eyebrow>
            <Heading className="mt-5">A Vision With Purpose</Heading>
            <GoldRule className="mx-auto mt-8" />
            <Body className="mx-auto mt-8 max-w-xl">
              SAAQ was created with a simple vision: to make fragrance feel
              personal, sophisticated and memorable.
            </Body>
            <Body className="mx-auto mt-6 max-w-xl">
              Every collection is part of that journey — combining the character
              of Arabian fragrance with a contemporary approach to luxury.
            </Body>
          </div>
        </Container>
      </Section>

      <section className="border-t border-white/10 bg-saaq-void">
        <Container className="flex min-h-[52vh] flex-col items-center justify-center py-24 text-center">
          <DisplayHeading as="h2" className="max-w-4xl">
            Your scent.
            <br />
            Your story.
            <br />
            Your signature.
          </DisplayHeading>
          <GoldRule className="mx-auto mt-8" />
          <Body className="mt-8 max-w-md">
            Discover the fragrance that becomes part of your story.
          </Body>
          <ButtonLink href="/shop" className="mt-10" size="lg">
            Explore the Collection
          </ButtonLink>
        </Container>
      </section>
    </div>
  );
}
