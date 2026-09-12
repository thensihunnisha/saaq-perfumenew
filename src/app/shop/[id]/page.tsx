
"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { getProductWhatsAppUrl } from "@/lib/whatsapp";

type Product = {
  id: number;
  name: string;
  category: string;
  collection: "takeoff" | "gems";
  price: number;
  image: string;
  description: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Noir Enj",
    category: "Takeoffcollections",
    collection: "takeoff",
    price: 299,
    image: "/images/products/noireng.jpg",
    description:
      "Noir Enj by Saaq is a Woody Aquatic fragrance for women and men. Noir by Saaq was launched in 2022. The nose behind this fragrance is Marie Salamagne. Top notes are Incense and Coriander; middle notes are Caviar, Mate and Dreamwood; base notes are Sandalwood, Guaiac Wood and Cashmere Wood.",
  },
  {
    id: 2,
    name: "Ocean Mle",
    category: "Takeoffcollections",
    collection: "takeoff",
    price: 249,
    image: "/images/products/oceanmle.jpg",
    description:
      "Ocean Man by BellaVita is a fragrance for women and men. Ocean Man was launched in 2023. Top notes are Aquatic notes, Citrus and Salt; middle notes are Orchid and Floral Notes; base notes are Musk and Woody Notes.",
  },
  {
    id: 3,
    name: "Opulance Ccj",
    category: "Takeoffcollections",
    collection: "takeoff",
    price: 279,
    image: "/images/products/opulance.jpeg",
    description:
      "OPULENCE OF DUBAI by Swiss Arabian is a Woody Spicy fragrance for women and men. OPULENCE OF DUBAI was launched in 2023. The nose behind this fragrance is Ilias Ermenidis. Top notes are Nigerian Ginger, elemi and Calabrian bergamot; middle notes are Damask Rose, Cardamom, Pink Pepper and Chocolate; base notes are Incense, Atlas Cedar, Cypriol Oil or Nagarmotha, Amber, Bourbon Vanilla, Vetiver and Roasted Coffee Beans.",
  },
  {
    id: 4,
    name: "Oud Dxb",
    category: "Takeoffcollections",
    collection: "takeoff",
    price: 279,
    image: "/images/products/ouddxb.jpg",
    description:
      "OPULENCE OF DUBAI by Swiss Arabian is a Woody Spicy fragrance for women and men. OPULENCE OF DUBAI was launched in 2023. The nose behind this fragrance is Ilias Ermenidis. Top notes are Nigerian Ginger, elemi and Calabrian bergamot; middle notes are Damask Rose, Cardamom, Pink Pepper and Chocolate; base notes are Incense, Atlas Cedar, Cypriol Oil or Nagarmotha, Amber, Bourbon Vanilla, Vetiver and Roasted Coffee Beans.",
  },
  {
    id: 5,
    name: "Silent Zrh",
    category: "Takeoffcollections",
    collection: "takeoff",
    price: 279,
    image: "/images/products/silentZrh.jpg",
    description:
      "A sophisticated fragrance created for women and men. Discover a refined composition with warm, woody and elegant notes designed for a memorable signature scent.",
  },
  {
    id: 6,
    name: "Vanilla Mex",
    category: "Takeoffcollections",
    collection: "takeoff",
    price: 279,
    image: "/images/products/vanillamex.jpeg",
    description:
      "Vanilla by Tom Ford is an Oriental Vanilla fragrance for women and men. Vanilla was launched in 2023. The fragrance features Indian Vanilla, Vanilla Absolute, Sandalwood, Animal notes, Orris Root and Jasmine.",
  },
  {
    id: 7,
    name: "Velvet Kul",
    category: "Takeoffcollections",
    collection: "takeoff",
    price: 279,
    image: "/images/products/velvetkul.jpg",
    description:
      "A luxurious fragrance with a sophisticated character. Designed for those who appreciate rich, elegant and unforgettable fragrances.",
  },
  {
    id: 8,
    name: "Emerald",
    category: "Gemcollections",
    collection: "gems",
    price: 279,
    image: "/images/products/emerald.jpeg",
    description:
      "Emerald by Saaq is a Floral Fruity fragrance for women and men. Emerald was launched in 2022. The nose behind this fragrance is Camille Gazal. Top notes are Pink Pepper, Red Berries and Strawberry; middle notes are Lily of the Valley, Jasmine and Ylang-Ylang; base notes are Patchouli, Sandalwood and Vanilla.",
  },
  {
    id: 9,
    name: "Crystl",
    category: "Gemcollections",
    collection: "gems",
    price: 279,
    image: "/images/products/crystl.jpg",
    description:
      "Crystl by Saaq is a Floral Fruity fragrance for women and men. Crystl was launched in 2022. The nose behind this fragrance is Camille Gazal. Top notes are Pink Pepper, Red Berries and Strawberry; middle notes are Lily of the Valley, Jasmine and Ylang-Ylang; base notes are Patchouli, Sandalwood and Vanilla.",
  },
];

export default function ProductDetailsPage() {
  const params = useParams();

  const [quantity, setQuantity] = useState(1);

  const productId = Number(params.id);

  const product = products.find((item) => item.id === productId);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080808] px-6 text-white">
        <div className="text-center">
          <p className="mb-3 text-[10px] uppercase tracking-[0.4em] text-[#d4af37]">
            SAAQ PERFUME
          </p>

          <h1 className="font-['Playfair_Display',serif] text-3xl">
            Product Not Found
          </h1>

          <p className="mt-3 text-sm text-white/50">
            The fragrance you are looking for does not exist.
          </p>

          <Link
            href="/shop"
            className="mt-8 inline-flex items-center gap-2 border border-[#d4af37] px-6 py-3 text-[10px] uppercase tracking-[0.25em] text-[#d4af37] transition-all duration-300 hover:bg-[#d4af37] hover:text-black"
          >
            <ArrowLeft size={14} />
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const collectionName =
    product.collection === "takeoff" ? "Take Off Collection" : "Gems Collection";

  const whatsappUrl = getProductWhatsAppUrl({
    name: product.name,
    collection: product.collection,
    category: product.category,
    quantity,
    price: product.price,
  });

  return (
    <div className="min-h-screen bg-[#080808] pt-[114px] text-white">
      {/* BACK TO SHOP */}
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <Link
          href="/shop"
          className="group inline-flex items-center gap-2 font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.25em] text-white/50 transition-colors duration-300 hover:text-[#d4af37]"
        >
          <ArrowLeft
            size={14}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          Back to Shop
        </Link>
      </div>

      {/* PRODUCT */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* PRODUCT IMAGE */}
          <div className="relative">
            <div className="relative aspect-square overflow-hidden bg-[#111]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />

              {/* IMAGE OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              {/* COLLECTION LABEL */}
              <div className="absolute left-5 top-5 border border-[#d4af37]/50 bg-black/60 px-4 py-2 backdrop-blur-sm">
                <span className="font-['Inter',sans-serif] text-[8px] uppercase tracking-[0.3em] text-[#d4af37]">
                  {product.collection === "takeoff" ? "Take Off" : "Gems"}
                </span>
              </div>
            </div>
          </div>

          {/* PRODUCT INFORMATION */}
          <div className="flex flex-col justify-center">
            {/* BRAND */}
            <p className="font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.45em] text-[#d4af37]">
              SAAQ PERFUME
            </p>

            {/* PRODUCT NAME */}
            <h1 className="mt-4 font-['Playfair_Display',serif] text-4xl leading-tight sm:text-5xl lg:text-6xl">
              {product.name}
            </h1>

            {/* COLLECTION */}
            <p className="mt-4 font-['Inter',sans-serif] text-[10px] uppercase tracking-[0.3em] text-white/40">
              {collectionName}
            </p>

            {/* DIVIDER */}
            <div className="my-8 h-px w-full bg-white/10" />

            {/* PRICE */}
            <div>
              <p className="font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.3em] text-white/40">
                Price
              </p>

              <p className="mt-2 font-['Inter',sans-serif] text-2xl tracking-wider text-[#d4af37]">
                AED {product.price.toFixed(2)}
              </p>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-8">
              <p className="mb-3 font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.3em] text-white/40">
                The Fragrance
              </p>

              <p className="font-['Inter',sans-serif] text-sm leading-7 text-white/60">
                {product.description}
              </p>
            </div>

            {/* QUANTITY */}
            <div className="mt-8">
              <p className="mb-3 font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.3em] text-white/40">
                Quantity
              </p>

              <div className="flex w-fit items-center border border-white/20">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                  className="flex h-11 w-11 items-center justify-center text-white/60 transition-colors hover:bg-white/5 hover:text-[#d4af37]"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} strokeWidth={1.5} />
                </button>

                <span className="flex h-11 w-14 items-center justify-center border-x border-white/20 font-['Inter',sans-serif] text-sm">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() => setQuantity((current) => current + 1)}
                  className="flex h-11 w-11 items-center justify-center text-white/60 transition-colors hover:bg-white/5 hover:text-[#d4af37]"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* TOTAL */}
            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
              <span className="font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.25em] text-white/40">
                Total
              </span>

              <span className="font-['Inter',sans-serif] text-lg tracking-wider text-white">
                AED {(product.price * quantity).toFixed(2)}
              </span>
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {/* WHATSAPP */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-1 items-center justify-center gap-3 rounded-full border-2 border-[#25D366] bg-[#25D366] px-6 py-4 transition-all duration-300 hover:border-[#20ba5a] hover:bg-[#20ba5a] hover:shadow-[0_0_25px_rgba(37,211,102,0.3)] active:scale-[0.98]"
              >
                <WhatsAppIcon className="h-5 w-5 fill-white" />

                <span className="font-['Inter',sans-serif] text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                  Order via WhatsApp
                </span>
              </a>

              {/* ADD TO CART */}
              <button
                type="button"
                onClick={() => {
                  alert(
                    `${quantity} × ${product.name} added to your cart.`
                  );
                }}
                className="flex flex-1 items-center justify-center gap-3 rounded-full border border-[#d4af37] bg-transparent px-6 py-4 text-[#d4af37] transition-all duration-300 hover:bg-[#d4af37] hover:text-black active:scale-[0.98]"
              >
                <ShoppingBag size={17} strokeWidth={1.5} />

                <span className="font-['Inter',sans-serif] text-[10px] font-semibold uppercase tracking-[0.2em]">
                  Add to Cart
                </span>
              </button>
            </div>

            {/* SHIPPING INFO */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
              <div>
                <p className="font-['Inter',sans-serif] text-[8px] uppercase tracking-[0.25em] text-[#d4af37]">
                  Delivery
                </p>

                <p className="mt-2 font-['Inter',sans-serif] text-[10px] text-white/50">
                  Across UAE
                </p>
              </div>

              <div>
                <p className="font-['Inter',sans-serif] text-[8px] uppercase tracking-[0.25em] text-[#d4af37]">
                  Experience
                </p>

                <p className="mt-2 font-['Inter',sans-serif] text-[10px] text-white/50">
                  Signature Fragrance
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FRAGRANCE STORY */}
      <section className="border-t border-white/10 bg-[#0b0b0b]">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center lg:py-20">
          <p className="font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.45em] text-[#d4af37]">
            THE ART OF FRAGRANCE
          </p>

          <h2 className="mt-4 font-['Playfair_Display',serif] text-3xl sm:text-4xl">
            A Signature Worth Remembering
          </h2>

          <p className="mx-auto mt-6 max-w-2xl font-['Inter',sans-serif] text-sm leading-7 text-white/50">
            Every SAAQ fragrance is selected to create a distinctive olfactory
            experience. Discover a scent designed to become part of your
            signature.
          </p>
        </div>
      </section>

      {/* BACK TO COLLECTION */}
      <section className="bg-[#080808] px-6 py-12 text-center">
        <Link
          href={
            product.collection === "takeoff"
              ? "/shop?collection=takeoff"
              : "/shop?collection=gems"
          }
          className="inline-flex items-center gap-3 border border-white/20 px-7 py-3 font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.3em] text-white/60 transition-all duration-300 hover:border-[#d4af37] hover:text-[#d4af37]"
        >
          <ArrowLeft size={13} />
          Explore {product.collection === "takeoff" ? "Take Off" : "Gems"}
        </Link>
      </section>
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c0-5.445 4.43-9.874 9.877-9.874 2.636 0 5.115 1.028 6.98 2.893A9.82 9.82 0 0122 12.037c0 5.447-4.43 9.876-9.949 9.876M12.05 2C6.51 2 2.01 6.5 2.01 12.04c0 2.13.67 4.11 1.81 5.73l-1.92 7.02 7.19-1.88c1.56.98 3.4 1.55 5.36 1.55 5.54 0 10.04-4.5 10.04-10.04C24.49 6.5 19.59 2 12.05 2z" />
    </svg>
  );
}

