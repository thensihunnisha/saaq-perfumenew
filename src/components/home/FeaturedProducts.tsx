import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import {
  Body,
  ButtonLink,
  Container,
  Eyebrow,
  Heading,
  Section,
} from "@/components/ui";
import type { Product } from "@/data/products";

type FeaturedProductsProps = {
  products: Product[];
};

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <Section>
      <Container>
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <Eyebrow>The Edit</Eyebrow>
            <Heading className="mt-4">Featured fragrances</Heading>
            <Body className="mt-5">
              A considered selection from Gems and Take Off — composed to become
              a signature.
            </Body>
          </div>
          <ButtonLink href="/collection" variant="ghost" size="sm" className="w-full text-center sm:w-auto">
            View All
          </ButtonLink>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-x-4 gap-y-10 min-[480px]:grid-cols-2 md:grid-cols-4 md:gap-x-6">
          {products.length > 0 ? (
            products.map((product, index) => (
              <Reveal key={product.id} delay={index * 80}>
                <ProductCard product={product} />
              </Reveal>
            ))
          ) : (
            <p className="col-span-full font-sans text-sm text-saaq-ivory/50">
              Fragrances will appear here from the SAAQ collection.
            </p>
          )}
        </div>
      </Container>
    </Section>
  );
}
