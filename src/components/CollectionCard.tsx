import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { FragranceCollection } from "@/data/collections";

type CollectionCardProps = {
  collection: FragranceCollection;
};

export default function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link href={collection.href} className="group relative overflow-hidden">
      <div className="relative aspect-[16/7] overflow-hidden bg-[#111]">
        <Image
          src={collection.image}
          alt={collection.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 700px"
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/35 transition-colors duration-500 group-hover:bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 p-5 sm:p-7">
          <h3 className="font-['Playfair_Display',serif] text-2xl text-white sm:text-3xl">
            {collection.title}
          </h3>
          <p className="mt-2 max-w-sm font-['Inter',sans-serif] text-xs text-white/60">
            {collection.description}
          </p>
          <div className="mt-3 flex items-center gap-2 font-['Inter',sans-serif] text-[8px] uppercase tracking-[0.25em] text-white/80">
            Explore
            <ArrowUpRight
              size={13}
              strokeWidth={1.3}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
