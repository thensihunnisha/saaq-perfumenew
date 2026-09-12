import type { Metadata } from "next";
import CheckoutView from "@/components/checkout/CheckoutView";

export const metadata: Metadata = {
  title: "Checkout | SAAQ PERFUME",
  description:
    "Complete SAAQ checkout with UAE delivery. Payment gateways connect later without collecting card numbers.",
};

export default function CheckoutPage() {
  return <CheckoutView />;
}
