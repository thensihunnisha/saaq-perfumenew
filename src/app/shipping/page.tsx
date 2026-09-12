import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Shipping & Returns | SAAQ PERFUME",
  description: "How SAAQ delivers across the UAE and how returns are handled.",
};

export default function ShippingPage() {
  return (
    <LegalPage
      eyebrow="SAAQ PERFUME"
      title="Shipping & Returns"
      intro="Every SAAQ order is packed with care and sent across the United Arab Emirates."
      sections={[
        {
          heading: "Delivery",
          body: "We currently deliver within the UAE. Shipping is complimentary from AED 300. Below that threshold, a delivery charge is added in the bag. Timing is confirmed when your order is accepted.",
        },
        {
          heading: "Returns",
          body: "Unopened fragrances in original condition may be discussed for exchange or return within 7 days of delivery. Opened bottles cannot be returned for hygiene. Write to us on WhatsApp or the contact page with your order details.",
        },
        {
          heading: "Damaged parcels",
          body: "If a parcel arrives damaged, contact SAAQ within 48 hours with photographs. We will arrange a replacement or a suitable resolution.",
        },
      ]}
    />
  );
}
