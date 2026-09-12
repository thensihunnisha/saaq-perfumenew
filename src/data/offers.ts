export type Offer = {
  id: string;
  collection: string;
  eyebrow: string;
  title: string;
  description: string;
  offer: string;
  cta: string;
  href: string;
  image: string;
};

export const offers: Offer[] = [
  {
    id: "takeoff-offer",
    collection: "Take Off",
    eyebrow: "Exclusive SAAQ Offer",
    title: "The Take Off Edit",
    description:
      "Discover the freedom of movement with the SAAQ Take Off Collection.",
    offer: "3 Pieces for AED 120",
    cta: "Shop the Offer",
    href: "/collection/takeoff",
    image: "/images/collections/takeoff.png",
  },
];
