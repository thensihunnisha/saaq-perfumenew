import type { CollectionSlug } from "@/data/products";

export type CollectionWorldContent = {
  slug: CollectionSlug;
  eyebrow: string;
  title: string;
  heroLine: string;
  heroImage: string;
  heroVideo?: string;
  theme: "gems" | "takeoff";
  storyEyebrow: string;
  storyTitle: string;
  storyBody: string[];
  storyImage: string;
  ctaTitle: string;
  ctaBody: string;
  ctaHref: string;
  ctaLabel: string;
};

export const gemsWorld: CollectionWorldContent = {
  slug: "gems",
  eyebrow: "Collection 02",
  title: "Gems",
  heroLine: "Precious. Rare. Unforgettable.",
  heroImage: "/images/collections/gemscollectionbanner2.jpg",
  theme: "gems",
  storyEyebrow: "The Collection Story",
  storyTitle: "Cut like a jewel. Worn like a secret.",
  storyBody: [
    "Gems is composed for those who collect beauty quietly. Each fragrance is faceted — light, depth, and a lingering brilliance that reveals itself slowly.",
    "Inspired by rare stones and night-lit gold, the collection is intimate, luminous, and made to be remembered.",
  ],
  storyImage: "/images/collections/crystalstory.jpeg",
  ctaTitle: "Find your gem.",
  ctaBody: "Explore the full SAAQ world, or continue into Take Off.",
  ctaHref: "/collection",
  ctaLabel: "Explore All Collections",
};

export const takeOffWorld: CollectionWorldContent = {
  slug: "takeoff",
  eyebrow: "Collection 01",
  title: "Take Off",
  heroLine: "Created for movement, freedom, and modern adventure.",
  heroImage: "/images/collections/tkhero2.png",
  heroVideo: "/images/collections/Pippit_0913_PerfumeHeroR3.clean.mp4",
  theme: "takeoff",
  storyEyebrow: "The Collection Story",
  storyTitle: "Arrive with intention.",
  storyBody: [
    "Take Off is the fragrance of departure — cities, desert air, and the first moment of a new horizon. It is modern, kinetic, and composed for those who do not wait to be introduced.",
    "Bold woods, spice, and aquatic brightness meet in a trail that travels as you do.",
  ],
  storyImage: "/images/collections/noir.png",
  ctaTitle: "Leave your mark in motion.",
  ctaBody: "Discover Gems, or return to the full SAAQ collection.",
  ctaHref: "/collection",
  ctaLabel: "Explore All Collections",
};
