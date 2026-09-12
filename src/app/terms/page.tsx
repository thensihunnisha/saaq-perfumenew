import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions | SAAQ PERFUME",
  description: "The terms of buying and browsing SAAQ fragrances.",
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="SAAQ PERFUME"
      title="Terms & Conditions"
      intro="These terms govern the use of the SAAQ website and the purchase of fragrances from the house."
      sections={[
        {
          heading: "The house",
          body: "SAAQ PERFUME offers signature fragrances for personal use. Product names, imagery, and composition notes on this site describe the current collection and may be refined as the house writes new scents.",
        },
        {
          heading: "Orders",
          body: "An order is confirmed when SAAQ accepts it — by WhatsApp, email, or after a payment session is completed. Availability, especially of limited compositions, is not guaranteed until confirmed.",
        },
        {
          heading: "Pricing",
          body: "Prices are shown in AED. Shipping, if charged, is calculated in the bag and at checkout. Complimentary UAE delivery applies from the threshold shown in your bag.",
        },
        {
          heading: "Website use",
          body: "Do not misuse the site, attempt unauthorised access, or reproduce SAAQ content for commercial use without permission.",
        },
      ]}
    />
  );
}
