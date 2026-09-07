import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import WhatsAppButton from "@/components/WhatsAppButton";
import { products } from "@/data/products";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = await params;

  const product = products.find(
    (item) => item.id === id
  );

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#080808] px-5 pb-20 pt-[140px] sm:px-8 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        
        {/* Back */}
        <Link
          href="/shop"
          className="mb-10 inline-block font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.25em] text-white/50 transition-colors hover:text-[#d4af37]"
        >
          ← Back to Collection
        </Link>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          
          {/* Product Image */}
          <div className="relative aspect-[4/5] overflow-hidden bg-[#111111]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            
            <p className="font-['Inter',sans-serif] text-[10px] uppercase tracking-[0.4em] text-[#d4af37]">
              {product.category}
            </p>

            <h1 className="mt-4 font-['Playfair_Display',serif] text-[48px] font-normal leading-tight text-white sm:text-[60px]">
              {product.name}
            </h1>

            <p className="mt-5 font-['Inter',sans-serif] text-[18px] tracking-[0.08em] text-white">
              AED {product.price}
            </p>

            <div className="my-8 h-px w-full bg-white/10" />

            <p className="max-w-lg font-['Inter',sans-serif] text-[13px] leading-7 tracking-[0.04em] text-white/60">
              {product.description}
            </p>

            {/* WhatsApp */}
            <div className="mt-10 max-w-md">
              <WhatsAppButton
                productName={product.name}
              />
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}