"use client";

import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "971542549557";

type WhatsAppButtonProps = {
  productName: string;
};

export default function WhatsAppButton({
  productName,
}: WhatsAppButtonProps) {
  const message = `Hello SAAQ PERFUME, I would like to order ${productName}`;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-full items-center justify-center gap-2 border border-[#25D366]/40 bg-[#25D366]/10 px-4 py-3 font-['Inter',sans-serif] text-[9px] font-semibold uppercase tracking-[0.16em] text-[#25D366] transition-all duration-300 hover:border-[#25D366] hover:bg-[#25D366] hover:text-white hover:shadow-[0_8px_25px_rgba(37,211,102,0.18)]"
    >
      <MessageCircle
        size={15}
        strokeWidth={1.8}
        className="transition-transform duration-300 group-hover:scale-110"
      />

      <span>ORDER ON WHATSAPP</span>
    </a>
  );
}