"use client";

import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MessageCircle } from "lucide-react";

// TODO: replace with your actual WhatsApp business number
// Format: countrycode + number, no +, spaces, or leading zeros
// e.g. UAE +971 50 123 4567 -> "971501234567"
const WHATSAPP_NUMBER = "971501234567";

type Product = {
  id: number;
  name: string;
  collection: string;
  price: number;
  image: string;
  description: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Noir Enj",
    collection: "takeoff",
    price: 299,
    image: "/images/products/noireng.jpg",
    description:
      "Noir Enj by Saaq is a Woody Aquatic fragrance for women and men. Noir by Saaq was launched in 2022. The nose behind this fragrance is Marie Salamagne. Top notes are Incense and Coriander; middle notes are Caviar, Mate and Dreamwood; base notes are Sandalwood, Guaiac Wood and Cashmere Wood",
  },
  {
    id: 2,
    name: "Ocean Mle",
    collection: "Takeoff",
    price: 249,
    image: "/images/products/oceanmle.jpg",
    description:
      "Ocean Man by BellaVita is a fragrance for women and men. Ocean Man was launched in 2023. Top notes are Aquatic notes, Citrus and Salt; middle notes are Orchid and Floral Notes; base notes are Musk and Woody Notes.",
  },
  {
    id: 3,
    name: "Opulance Ccj",
    collection: "Takeoff",
    price: 279,
    image: "/images/products/opulance.jpeg",
    description:
      "OPULENCE OF DUBAI by Swiss Arabian is a Woody Spicy fragrance for women and men. OPULENCE OF DUBAI was launched in 2023. The nose behind this fragrance is Ilias Ermenidis. Top notes are Nigerian Ginger, elemi and Calabrian bergamot; middle notes are Damask Rose, Cardamom, Pink Pepper and Chocolate; base notes are Incense, Atlas Cedar, Cypriol Oil or Nagarmotha, Amber, Bourbon Vanilla, Vetiver and Roasted Coffee Beans.",
  },
  {
    id: 4,
    name: "Oud Dxb",
    collection: "Takeoff",
    price: 279,
    image: "/images/products/ouddxb.jpg",
    description:
      "OPULENCE OF DUBAI by Swiss Arabian is a Woody Spicy fragrance for women and men. OPULENCE OF DUBAI was launched in 2023. The nose behind this fragrance is Ilias Ermenidis. Top notes are Nigerian Ginger, elemi and Calabrian bergamot; middle notes are Damask Rose, Cardamom, Pink Pepper and Chocolate; base notes are Incense, Atlas Cedar, Cypriol Oil or Nagarmotha, Amber, Bourbon Vanilla, Vetiver and Roasted Coffee Beans.",
  },
  {
    id: 5,
    name: "silent Zrh",
    collection: "Takeoff",
    price: 279,
    image: "/images/products/silentZrh.jpg",
    description:
      "OPULENCE OF DUBAI by Swiss Arabian is a Woody Spicy fragrance for women and men. OPULENCE OF DUBAI was launched in 2023. The nose behind this fragrance is Ilias Ermenidis. Top notes are Nigerian Ginger, elemi and Calabrian bergamot; middle notes are Damask Rose, Cardamom, Pink Pepper and Chocolate; base notes are Incense, Atlas Cedar, Cypriol Oil or Nagarmotha, Amber, Bourbon Vanilla, Vetiver and Roasted Coffee Beans.",
  },
  {
    id: 6,
    name: "Vanilla Mex",
    collection: "Takeoff",
    price: 279,
    image: "/images/products/vanillamex.jpeg",
    description:
      "Vanilla by Tom Ford is a Oriental Vanilla fragrance for women and men. Vanilla was launched in 2023. The fragrance features Indian Vanilla, Vanilla Absolute, Sandalwood, Animal notes, Orris Root and Jasmine.",
  },
  {
    id: 7,
    name: "Velvet Kul",
    collection: "Takeoff",
    price: 279,
    image: "/images/products/velvetkul.jpg",
    description:
      "OPULENCE OF DUBAI by Swiss Arabian is a Woody Spicy fragrance for women and men. OPULENCE OF DUBAI was launched in 2023. The nose behind this fragrance is Ilias Ermenidis. Top notes are Nigerian Ginger, elemi and Calabrian bergamot; middle notes are Damask Rose, Cardamom, Pink Pepper and Chocolate; base notes are Incense, Atlas Cedar, Cypriol Oil or Nagarmotha, Amber, Bourbon Vanilla, Vetiver and Roasted Coffee Beans.",
  },
  {
    id: 8,
    name: "Emerald",
    collection: "gems",
    price: 279,
    image: "/images/products/emerald.jpeg",
    description:
      "Emerald by Saaq is a Floral Fruity fragrance for women and men. Emerald was launched in 2022. The nose behind this fragrance is Camille Gazal. Top notes are Pink Pepper, Red Berries and Strawberry; middle notes are Lily of the Valley, Jasmine and Ylang-Ylang; base notes are Patchouli, Sandalwood and Vanilla.",
  },
  {
    id: 9,
    name: "Crystl",
    collection: "gems",
    price: 279,
    image: "/images/products/crystl.jpg",
    description:
      "Crystl by Saaq is a Floral Fruity fragrance for women and men. Crystl was launched in 2022. The nose behind this fragrance is Camille Gazal. Top notes are Pink Pepper, Red Berries and Strawberry; middle notes are Lily of the Valley, Jasmine and Ylang-Ylang; base notes are Patchouli, Sandalwood and Vanilla.",
  },
];

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#080808] pt-[114px]" />
      }
    >
      <ShopContent />
    </Suspense>
  );
}

function ShopContent() {
  const searchParams = useSearchParams();

  const collectionParam = searchParams.get("collection");

  const selectedCollection =
    collectionParam === "takeoff" || collectionParam === "gems"
      ? collectionParam
      : "all";

  const filteredProducts =
    selectedCollection === "all"
      ? products
      : products.filter(
          (product) =>
            product.collection.toLowerCase() ===
            selectedCollection.toLowerCase()
        );

  const pageTitle =
    selectedCollection === "takeoff"
      ? "Take Off Collection"
      : selectedCollection === "gems"
        ? "Gems Collection"
        : "All Fragrances";

  /*
   * BUILD A WHATSAPP ORDER LINK FOR A PRODUCT
   */
  const getWhatsAppLink = (product: Product) => {
    const message = `Hello! I'd like to order:\n\n*${product.name}*\nPrice: AED ${product.price.toFixed(
      2
    )}\n\nPlease confirm availability.`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;
  };

  return (
    <main className="min-h-screen bg-[#080808] pt-[114px] text-white">
      {/* HERO */}
      <section className="relative flex min-h-[300px] items-center justify-center overflow-hidden">
        <Image
          src={
            selectedCollection === "takeoff"
              ? "/images/collections/takeoff.jpg"
              : selectedCollection === "gems"
                ? "/images/collections/gems.jpg"
                : "/images/collections/all.jpg"
          }
          alt={pageTitle}
          fill
          priority
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 px-6 text-center">
          <p className="mb-3 font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.4em] text-[#d4af37]">
            SAAQ PERFUME
          </p>

          <h1 className="font-['Playfair_Display',serif] text-3xl sm:text-4xl lg:text-5xl">
            {pageTitle}
          </h1>

          <p className="mx-auto mt-3 max-w-xl font-['Inter',sans-serif] text-xs leading-6 text-white/60">
            Discover the art of signature fragrance.
          </p>
        </div>
      </section>

      {/* COLLECTION FILTER */}
      <section className="border-b border-white/10 bg-[#080808]">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-8 px-6 py-5">
          <CollectionLink
            href="/shop"
            label="All Fragrances"
            active={selectedCollection === "all"}
          />

          <CollectionLink
            href="/shop?collection=takeoff"
            label="Take Off"
            active={selectedCollection === "takeoff"}
          />

          <CollectionLink
            href="/shop?collection=gems"
            label="Gems"
            active={selectedCollection === "gems"}
          />
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        {/* RESULT COUNT */}
        <div className="mb-8 flex items-center justify-between">
          <p className="font-['Inter',sans-serif] text-[10px] uppercase tracking-[0.25em] text-white/40">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1
              ? "Fragrance"
              : "Fragrances"}
          </p>

          <p className="font-['Inter',sans-serif] text-[10px] uppercase tracking-[0.25em] text-[#d4af37]">
            {selectedCollection === "all"
              ? "All Collections"
              : selectedCollection === "takeoff"
                ? "Take Off"
                : "Gems"}
          </p>
        </div>

        {/* PRODUCT GRID */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group flex flex-col justify-between"
              >
                {/* PRODUCT LINK ONLY WRAPS IMAGE & INFO */}
                <Link
                  href={`/shop/${product.id}`}
                  className="block"
                >
                  {/* IMAGE */}
                  <div className="relative aspect-square overflow-hidden bg-[#111]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
                  </div>

                  {/* PRODUCT INFO */}
                  <div className="pt-3">
                    <p className="mb-1 font-['Inter',sans-serif] text-[8px] uppercase tracking-[0.25em] text-[#d4af37]">
                      {product.collection.toLowerCase() === "takeoff"
                        ? "Take Off"
                        : "Gems"}
                    </p>

                    <h2 className="font-['Playfair_Display',serif] text-base text-white">
                      {product.name}
                    </h2>

                    <p className="mt-1 line-clamp-2 font-['Inter',sans-serif] text-[11px] leading-5 text-white/50">
                      {product.description}
                    </p>

                    <p className="mt-2 font-['Inter',sans-serif] text-xs font-medium tracking-wider text-white">
                      AED {product.price.toFixed(2)}
                    </p>
                  </div>
                </Link>

                {/* WHATSAPP ORDER BUTTON — REPLACES ADD TO CART */}
                
                 <a href={getWhatsAppLink(product)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/waBtn mt-4 flex w-full items-center justify-center gap-2 rounded-none border border-[#25D366]/40 bg-black/40 px-4 py-2.5 backdrop-blur-sm transition-all duration-300 hover:border-[#25D366] hover:bg-[#25D366] hover:shadow-[0_0_15px_rgba(37,211,102,0.25)] active:scale-95"
                >
                  <MessageCircle
                    size={13}
                    strokeWidth={1.5}
                    className="text-[#25D366] transition-transform duration-300 group-hover/waBtn:scale-110 group-hover/waBtn:text-black"
                  />

                  <span className="font-['Inter',sans-serif] text-[9px] font-medium uppercase tracking-[0.2em] text-[#25D366] transition-colors duration-300 group-hover/waBtn:text-black">
                    Order via WhatsApp
                  </span>
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="font-['Playfair_Display',serif] text-2xl text-white">
              No fragrances found
            </p>

            <Link
              href="/shop"
              className="mt-6 inline-block border border-[#d4af37] px-6 py-3 font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.25em] text-[#d4af37]"
            >
              View All Fragrances
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}

/*
 * COLLECTION LINK
 */
function CollectionLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`relative pb-2 font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.25em] transition-colors duration-300 ${
        active
          ? "text-[#d4af37]"
          : "text-white/50 hover:text-white"
      }`}
    >
      {label}

      {active && (
        <span className="absolute bottom-0 left-0 h-px w-full bg-[#d4af37]" />
      )}
    </Link>
  );
}