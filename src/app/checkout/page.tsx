import type { Metadata } from "next";
import CheckoutView from "@/components/checkout/CheckoutView";

export const metadata: Metadata = {
  title: "Checkout | SAAQ PERFUME",
  description:
    "Complete SAAQ checkout with UAE delivery. Payment is arranged after your order is received.",
};

export default function CheckoutPage() {
  return <CheckoutView />;
}
