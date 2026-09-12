import type { CollectionSlug } from "@/data/products";

export type FragranceCollection = {
  slug: CollectionSlug;
  title: string;
  description: string;
  image: string;
  href: string;
};

export const collections: FragranceCollection[] = [
  {
    slug: "takeoff",
    title: "Take Off",
    description: "Bold, modern compositions for travel and arrival.",
    image: "/images/collections/takeoff-home.jpg",
    href: "/collection/takeoff",
  },
  {
    slug: "gems",
    title: "Gems",
    description: "Precious, luminous scents with lasting character.",
    image: "/images/collections/gems-home.jpg",
    href: "/collection/gems",
  },
];

export function getCollectionBySlug(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}
