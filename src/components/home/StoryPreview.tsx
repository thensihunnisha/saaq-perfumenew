import Image from "next/image";
import Reveal from "@/components/Reveal";
import {
  Body,
  ButtonLink,
  Container,
  Eyebrow,
  Heading,
} from "@/components/ui";

export default function StoryPreview() {
  return (
    <section className="border-y border-white/10 bg-saaq-void">
      <Container>
        <div className="grid items-center gap-12 py-20 lg:grid-cols-2 lg:gap-20 lg:py-28">
          <Reveal variant="image" className="group relative aspect-[4/3] overflow-hidden bg-saaq-charcoal">
              <Image
                src="/images/collections/story-home.jpg"
                alt="The SAAQ story"
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-[center_40%] saaq-img-zoom"
              />
            </Reveal>

          <Reveal delay={120}>
            <Eyebrow>Our Story</Eyebrow>
            <Heading className="mt-4">
              More than a fragrance.
              <br />
              A presence.
            </Heading>
            <Body className="mt-6 max-w-md">
              SAAQ was created from a belief that scent is memory, identity, and
              arrival. Rooted in Arabian perfumery and composed for a modern
              life, every bottle is an invitation to leave a signature.
            </Body>
            <ButtonLink href="/story" variant="outline" className="mt-10">
              Discover Our Story
            </ButtonLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
