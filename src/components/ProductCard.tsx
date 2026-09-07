import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import WhatsAppButton from "@/components/WhatsAppButton";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <article className="group">
      {/* Product Image */}
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-[4/5] overflow-hidden bg-[#111111]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Image Overlay */}
          <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
        </div>
      </Link>

      {/* Product Information */}
      <div className="pt-5">
        <Link href={`/product/${product.id}`}>
          <p className="mb-2 font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.25em] text-[#a07f3c]">
            {product.category}
          </p>

          <h2 className="font-['Playfair_Display',serif] text-[22px] font-normal text-white transition-colors duration-300 group-hover:text-[#d4af37]">
            {product.name}
          </h2>

          <p className="mt-2 font-['Inter',sans-serif] text-[13px] tracking-[0.08em] text-white/80">
            AED {product.price}
          </p>
        </Link>

        {/* WhatsApp */}
        <div className="mt-5">
          <WhatsAppButton productName={product.name} />
        </div>
      </div>
    </article>
  );
}