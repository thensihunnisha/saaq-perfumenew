import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import type { Product } from "@/data/products";
import { cn } from "@/lib/cn";

type ProductGridProps = {
  products: Product[];
  className?: string;
};

export default function ProductGrid({ products, className }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="saaq-body py-16 text-center">
        No fragrances in this selection yet.
      </p>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-x-4 gap-y-10 min-[480px]:grid-cols-2 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4",
        className
      )}
    >
      {products.map((product, index) => (
        <Reveal key={product.id} delay={(index % 4) * 80}>
          <ProductCard product={product} />
        </Reveal>
      ))}
    </div>
  );
}
