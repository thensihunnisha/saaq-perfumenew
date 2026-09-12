import type { Metadata } from "next";
import CartPageView from "@/components/cart/CartPageView";

export const metadata: Metadata = {
  title: "Your Bag | SAAQ PERFUME",
  description:
    "Review your SAAQ fragrances, adjust quantities, and order via WhatsApp or checkout.",
};

export default function CartPage() {
  return <CartPageView />;
}
