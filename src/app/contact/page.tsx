import type { Metadata } from "next";
import ContactView from "@/components/contact/ContactView";

export const metadata: Metadata = {
  title: "Contact SAAQ | SAAQ PERFUME",
  description:
    "Contact SAAQ by WhatsApp, email, or phone. We would love to hear from you.",
};

export default function ContactPage() {
  return <ContactView />;
}
