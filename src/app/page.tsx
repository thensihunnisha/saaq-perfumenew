import Hero from "@/components/Hero";
import BrandIntro from "@/components/home/BrandIntro";
import CollectionFeature from "@/components/home/CollectionFeature";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FinalCta from "@/components/home/FinalCta";
import OffersSection from "@/components/home/OffersSection";
import StoryPreview from "@/components/home/StoryPreview";
import { getProducts, pickFeaturedProducts } from "@/lib/api";

export default async function Home() {
  const catalog = await getProducts().catch(() => []);
  const featuredProducts = pickFeaturedProducts(catalog, 4);

  return (
    <>
      <Hero />
      <BrandIntro />
      <OffersSection />
      <CollectionFeature
        eyebrow="Collection 02"
        title="Gems Collection"
        statement="Precious. Rare. Unforgettable."
        href="/collection/gems"
        cta="Discover Gems"
        image="/images/collections/gems-home.jpg"
      />
      <CollectionFeature
        eyebrow="Collection 01"
        title="Take Off Collection"
        statement="A fragrance created for movement, freedom and modern adventure."
        href="/collection/takeoff"
        cta="Discover Take Off"
        image="/images/collections/takeoff-home.jpg"
        reverse
      />
      <FeaturedProducts products={featuredProducts} />
      <StoryPreview />
      <FinalCta />
    </>
  );
}
