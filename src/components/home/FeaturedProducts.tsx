import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { Body, ButtonLink, Container, Eyebrow, Heading } from "@/components/ui";
import { SlideUp } from "@/components/motion";
import { cn } from "@/lib/cn";
import type { Product } from "@/data/products";

type FeaturedProductsProps = {
  products: Product[];
};

const FEATURED_SPAN = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
] as const;

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="bg-saaq-black saaq-section">
      <Container>
        <SlideUp className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <Eyebrow>The Signatures</Eyebrow>
            <Heading className="mt-4">Discover the fragrances defining SAAQ.</Heading>
            <Body className="mt-5">
              An editorial selection from Gems and Take Off — composed to become
              a signature.
            </Body>
          </div>
          <ButtonLink
            href="/collection"
            variant="ghost"
            size="sm"
            className="w-full text-center sm:w-auto"
          >
            View All
          </ButtonLink>
        </SlideUp>

        {products.length > 0 ? (
          <div className="mt-14 grid grid-cols-1 gap-8 min-[480px]:grid-cols-2 lg:grid-cols-12 lg:gap-8">
            {products.map((product, index) => (
              <Reveal
                key={product.id}
                delay={index * 90}
                className={cn("min-w-0", FEATURED_SPAN[index] ?? "lg:col-span-6")}
              >
                <ProductCard product={product} featured={index === 0 || index === 3} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="mt-14 font-sans text-sm text-saaq-ivory/50">
            Fragrances will appear here from the SAAQ collection.
          </p>
        )}
      </Container>
    </section>
  );
}
