import Hero from "@/components/Hero";
import BrandIntro from "@/components/home/BrandIntro";
import CampaignBanner from "@/components/home/CampaignBanner";
import CollectionShowcase from "@/components/home/CollectionShowcase";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FinalCta from "@/components/home/FinalCta";
import GemsCampaign from "@/components/home/GemsCampaign";
import OffersSection from "@/components/home/OffersSection";
import BrandStory from "@/components/home/BrandStory";
import TakeoffCampaign from "@/components/home/TakeoffCampaign";
import { products } from "@/data/products";
import { pickFeaturedProducts } from "@/lib/api";

export default async function Home() {
  const featuredProducts = pickFeaturedProducts(products, 4);

  return (
    <>
      <Hero />
      <BrandIntro />
      <CollectionShowcase />
      <FeaturedProducts products={featuredProducts} />
      <CampaignBanner />
      <GemsCampaign />
      <TakeoffCampaign />
      <OffersSection />
      <BrandStory />
      <FinalCta />
    </>
  );
}
