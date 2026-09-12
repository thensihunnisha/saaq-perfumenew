import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | SAAQ PERFUME",
  description: "How SAAQ treats the information you share with the house.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="SAAQ PERFUME"
      title="Privacy Policy"
      intro="SAAQ treats personal details with the same discretion as a signature scent. This page explains what we collect and why."
      sections={[
        {
          heading: "What we collect",
          body: "When you write to us, place an enquiry, or complete checkout, we may receive your name, email, phone, and delivery address. The bag and wishlist on this site are stored in your browser, not on a SAAQ server.",
        },
        {
          heading: "How we use it",
          body: "Contact details are used only to answer you, confirm availability, and arrange delivery. We do not sell your information. Payment card numbers are never collected or stored on this website.",
        },
        {
          heading: "WhatsApp",
          body: "If you order or enquire on WhatsApp, the conversation takes place on WhatsApp’s service. SAAQ uses that channel to confirm your fragrance and delivery.",
        },
        {
          heading: "Questions",
          body: "For privacy questions, write to info@saaqperfume.com or use the contact page.",
        },
      ]}
    />
  );
}
