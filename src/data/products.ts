export type CollectionSlug = "takeoff" | "gems";
export type Gender = "men" | "women" | "unisex";

export type Product = {
  id: string;
  name: string;
  category: string;
  collection: CollectionSlug;
  gender: Gender;
  price: number;
  compareAtPrice?: number;
  image: string;
  description: string;
  story?: string;
  featured?: boolean;
};

export const COLLECTION_LABELS: Record<CollectionSlug, string> = {
  takeoff: "Take Off",
  gems: "Gems",
};

export const GENDER_LABELS: Record<Gender, string> = {
  men: "Men",
  women: "Women",
  unisex: "Unisex",
};

export type ProductSort = "featured" | "price-asc" | "price-desc" | "newest";

export const products: Product[] = [
  {
    id: "noir",
    name: "Noir Enj",
    category: "Take Off",
    collection: "takeoff",
    gender: "men",
    featured: true,
    price: 299,
    compareAtPrice: 349,
    image: "/images/products/noireng.jpg",
    description:
      "Noir Enj by Saaq is a Woody Aquatic fragrance for women and men. Noir by Saaq was launched in 2022. The nose behind this fragrance is Marie Salamagne. Top notes are Incense and Coriander; middle notes are Caviar, Mate and Dreamwood; base notes are Sandalwood, Guaiac Wood and Cashmere Wood",
  },
  {
    id: "oceanmle",
    name: "Ocean Mle",
    category: "Take Off",
    collection: "takeoff",
    gender: "unisex",
    price: 249,
    image: "/images/products/oceanmle.jpg",
    description:
      "Ocean Man by BellaVita is a fragrance for women and men. Ocean Man was launched in 2023. Top notes are Aquatic notes, Citrus and Salt; middle notes are Orchid and Floral Notes; base notes are Musk and Woody Notes.",
  },
  {
    id: "opulance",
    name: "Opulance Ccj",
    category: "Take Off",
    collection: "takeoff",
    gender: "men",
    price: 279,
    image: "/images/products/opulance.jpeg",
    description:
      "OPULENCE OF DUBAI by Swiss Arabian is a Woody Spicy fragrance for women and men. OPULENCE OF DUBAI was launched in 2023. The nose behind this fragrance is Ilias Ermenidis. Top notes are Nigerian Ginger, elemi and Calabrian bergamot; middle notes are Damask Rose, Cardamom, Pink Pepper and Chocolate; base notes are Incense, Atlas Cedar, Cypriol Oil or Nagarmotha, Amber, Bourbon Vanilla, Vetiver and Roasted Coffee Beans.",
  },
  {
    id: "ouddxb",
    name: "Oud Dxb",
    category: "Take Off",
    collection: "takeoff",
    gender: "men",
    price: 279,
    image: "/images/products/ouddxb.jpg",
    description:
      "OPULENCE OF DUBAI by Swiss Arabian is a Woody Spicy fragrance for women and men. OPULENCE OF DUBAI was launched in 2023. The nose behind this fragrance is Ilias Ermenidis. Top notes are Nigerian Ginger, elemi and Calabrian bergamot; middle notes are Damask Rose, Cardamom, Pink Pepper and Chocolate; base notes are Incense, Atlas Cedar, Cypriol Oil or Nagarmotha, Amber, Bourbon Vanilla, Vetiver and Roasted Coffee Beans.",
  },
  {
    id: "silent",
    name: "Silent Zrh",
    category: "Take Off",
    collection: "takeoff",
    gender: "men",
    price: 279,
    image: "/images/products/silentZrh.jpg",
    description:
      "OPULENCE OF DUBAI by Swiss Arabian is a Woody Spicy fragrance for women and men. OPULENCE OF DUBAI was launched in 2023. The nose behind this fragrance is Ilias Ermenidis. Top notes are Nigerian Ginger, elemi and Calabrian bergamot; middle notes are Damask Rose, Cardamom, Pink Pepper and Chocolate; base notes are Incense, Atlas Cedar, Cypriol Oil or Nagarmotha, Amber, Bourbon Vanilla, Vetiver and Roasted Coffee Beans.",
  },
  {
    id: "vanillamex",
    name: "Vanilla Mex",
    category: "Take Off",
    collection: "takeoff",
    gender: "women",
    price: 279,
    image: "/images/products/vanillamex.jpeg",
    description:
      "Vanilla by Tom Ford is a Oriental Vanilla fragrance for women and men. Vanilla was launched in 2023. The fragrance features Indian Vanilla, Vanilla Absolute, Sandalwood, Animal notes, Orris Root and Jasmine.",
  },
  {
    id: "velvetkul",
    name: "Velvet Kul",
    category: "Take Off",
    collection: "takeoff",
    gender: "unisex",
    featured: true,
    price: 279,
    image: "/images/products/velvetkul.jpg",
    description:
      "OPULENCE OF DUBAI by Swiss Arabian is a Woody Spicy fragrance for women and men. OPULENCE OF DUBAI was launched in 2023. The nose behind this fragrance is Ilias Ermenidis. Top notes are Nigerian Ginger, elemi and Calabrian bergamot; middle notes are Incense, Atlas Cedar, Cypriol Oil or Nagarmotha, Amber, Bourbon Vanilla, Vetiver and Roasted Coffee Beans.",
  },
  {
    id: "emerald",
    name: "Emerald",
    category: "Gems",
    collection: "gems",
    gender: "women",
    featured: true,
    price: 279,
    compareAtPrice: 329,
    image: "/images/products/emrld.jpeg",
    description:
      "Emerald by Saaq is a Floral Fruity fragrance for women and men. Emerald was launched in 2022. The nose behind this fragrance is Camille Gazal. Top notes are Pink Pepper, Red Berries and Strawberry; middle notes are Lily of the Valley, Jasmine and Ylang-Ylang; base notes are Patchouli, Sandalwood and Vanilla.",
  },
  {
    id: "crystl",
    name: "Crystl",
    category: "Gems",
    collection: "gems",
    gender: "women",
    featured: true,
    price: 279,
    image: "/images/products/crystal.png",
    description:
      "Crystl by Saaq is a Floral Fruity fragrance for women and men. Crystl was launched in 2022. The nose behind this fragrance is Camille Gazal. Top notes are Pink Pepper, Red Berries and Strawberry; middle notes are Lily of the Valley, Jasmine and Ylang-Ylang; base notes are Patchouli, Sandalwood and Vanilla.",
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getFragranceStory(product: Product): string {
  if (product.story) {
    return product.story;
  }

  const collection = COLLECTION_LABELS[product.collection];

  return `${product.name} is a SAAQ composition from the ${collection} collection — created to be remembered. It opens with presence, settles into character, and leaves a quiet trail long after the room has emptied.`;
}

export function getRelatedProducts(
  product: Product,
  catalog: Product[],
  limit = 4
): Product[] {
  const remaining = catalog.filter((item) => item.id !== product.id);
  const sameCollection = remaining.filter(
    (item) => item.collection === product.collection
  );
  const others = remaining.filter(
    (item) => item.collection !== product.collection
  );

  return [...sameCollection, ...others].slice(0, limit);
}

export function searchProducts(catalog: Product[], query: string): Product[] {
  const term = query.trim().toLowerCase();

  if (!term) {
    return [];
  }

  const tokens = term.split(/\s+/).filter(Boolean);

  return catalog.filter((product) => {
    const haystack = [
      product.name,
      product.category,
      product.collection,
      COLLECTION_LABELS[product.collection],
      product.gender,
      GENDER_LABELS[product.gender],
      product.description,
    ]
      .join(" ")
      .toLowerCase();

    return tokens.every((token) => haystack.includes(token));
  });
}

export function getProductsByCollection(
  catalog: Product[],
  collection: CollectionSlug
): Product[] {
  return catalog.filter((product) => product.collection === collection);
}

export function getProductsByGender(catalog: Product[], gender: Gender): Product[] {
  return catalog.filter((product) => product.gender === gender);
}

export function filterAndSortProducts(
  catalog: Product[],
  options: {
    gender: "all" | Gender;
    collection: "all" | CollectionSlug;
    sort: ProductSort;
  }
): Product[] {
  const filtered = catalog.filter((product) => {
    const genderMatch =
      options.gender === "all" || product.gender === options.gender;
    const collectionMatch =
      options.collection === "all" ||
      product.collection === options.collection;

    return genderMatch && collectionMatch;
  });

  const sorted = [...filtered];

  if (options.sort === "price-asc") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (options.sort === "price-desc") {
    sorted.sort((a, b) => b.price - a.price);
  } else if (options.sort === "newest") {
    sorted.sort((a, b) => {
      const byId = Number(b.id) - Number(a.id);
      return Number.isFinite(byId) && byId !== 0
        ? byId
        : b.id.localeCompare(a.id);
    });
  } else {
    sorted.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }

  return sorted;
}
