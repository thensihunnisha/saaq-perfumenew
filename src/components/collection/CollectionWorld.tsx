import Image from "next/image";
import Reveal from "@/components/Reveal";
import ProductGrid from "@/components/ProductGrid";
import CollectionWorldHero from "@/components/collection/CollectionWorldHero";
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
import { cn } from "@/lib/cn";
import type { CollectionWorldContent } from "@/data/collectionPages";
import type { Product } from "@/data/products";

type CollectionWorldProps = {
  content: CollectionWorldContent;
  products: Product[];
};

export default function CollectionWorld({
  content,
  products,
}: CollectionWorldProps) {
  const isGems = content.theme === "gems";

  return (
    <>
      <CollectionWorldHero content={content} />

      <Section className={isGems ? "bg-saaq-void" : "bg-saaq-black"}>
        <Container>
          <div
            className={cn(
              "grid items-center gap-12 lg:grid-cols-2 lg:gap-20",
              isGems ? "" : "lg:[&>*:first-child]:order-2"
            )}
          >
            <Reveal variant="image">
              <div
                className={cn(
                  "group relative overflow-hidden bg-saaq-charcoal",
                  isGems ? "aspect-[4/5]" : "aspect-[5/6]"
                )}
              >
                <Image
                  src={content.storyImage}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover saaq-img-zoom"
                />
                {isGems ? (
                  <div className="absolute inset-6 border border-saaq-gold/25" />
                ) : (
                  <div className="absolute left-0 top-0 h-24 w-24 border-l border-t border-saaq-gold/40" />
                )}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <Eyebrow>{content.storyEyebrow}</Eyebrow>
              <Heading className={cn("mt-4", isGems ? "italic" : "")}>
                {content.storyTitle}
              </Heading>
              <GoldRule className="mt-6" />
              <div className="mt-6 space-y-5">
                {content.storyBody.map((paragraph) => (
                  <Body key={paragraph}>{paragraph}</Body>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal className="max-w-2xl">
            <Eyebrow>{content.title} Collection</Eyebrow>
            <Heading className="mt-4">The fragrances</Heading>
            <Body className="mt-5">
              {products.length}{" "}
              {products.length === 1 ? "fragrance" : "fragrances"} composed for
              this collection.
            </Body>
          </Reveal>

          <div className="mt-14">
            <ProductGrid products={products} />
          </div>
        </Container>
      </Section>

      <section className="relative overflow-hidden">
        <Image
          src={content.heroImage}
          alt=""
          fill
          sizes="100vw"
          className="saaq-hero-media object-cover"
        />
        <div className="absolute inset-0 bg-saaq-black/75" />
        <div className="relative z-10 px-6 py-28 text-center">
          <Reveal>
            <p className="saaq-eyebrow">{content.title}</p>
            <DisplayHeading as="h2" className="mt-5">
              {content.ctaTitle}
            </DisplayHeading>
            <Body className="mx-auto mt-5 max-w-md">{content.ctaBody}</Body>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href={content.ctaHref}>{content.ctaLabel}</ButtonLink>
              <ButtonLink
                href={isGems ? "/collection/takeoff" : "/collection/gems"}
                variant="outline"
              >
                {isGems ? "Discover Take Off" : "Discover Gems"}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
