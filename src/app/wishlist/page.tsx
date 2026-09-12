import type { Metadata } from "next";
import WishlistPageView from "@/components/wishlist/WishlistPageView";

export const metadata: Metadata = {
  title: "Wishlist | SAAQ PERFUME",
  description: "Your saved SAAQ fragrances. Add them to your bag when you are ready.",
};

export default function WishlistPage() {
  return <WishlistPageView />;
}
