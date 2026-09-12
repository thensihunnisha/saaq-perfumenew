"use client";

import type { MouseEvent } from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  getCartWhatsAppUrl,
  getProductWhatsAppUrl,
  type WhatsAppOrderItem,
} from "@/lib/whatsapp";

type ProductFields = {
  name: string;
  collection: string;
  category: string;
  price: number;
};

type WhatsAppButtonBase = {
  variant?: "full" | "icon";
  label?: string;
  className?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

type ProductWhatsAppButtonProps = WhatsAppButtonBase & {
  product: ProductFields;
  quantity?: number;
  items?: never;
};

type CartWhatsAppButtonProps = WhatsAppButtonBase & {
  items: WhatsAppOrderItem[];
  product?: never;
  quantity?: never;
};

type WhatsAppButtonProps = ProductWhatsAppButtonProps | CartWhatsAppButtonProps;

export default function WhatsAppButton(props: WhatsAppButtonProps) {
  const {
    variant = "full",
    label = "Order via WhatsApp",
    className,
    onClick,
  } = props;

  const href =
    props.items != null
      ? getCartWhatsAppUrl(props.items)
      : getProductWhatsAppUrl({
          name: props.product.name,
          collection: props.product.collection,
          category: props.product.category,
          price: props.product.price,
          quantity: props.quantity ?? 1,
        });

  const ariaLabel =
    props.items != null
      ? "Order bag on WhatsApp"
      : `Order ${props.product.name} on WhatsApp`;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
    onClick?.(event);
  };

  if (variant === "icon") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        onClick={handleClick}
        className={cn(
          "saaq-transition flex h-10 w-10 items-center justify-center border border-white/20 bg-saaq-black/55 text-[#8fbf9a] backdrop-blur-sm hover:border-[#8fbf9a] hover:text-[#b7e0c0]",
          className
        )}
      >
        <MessageCircle size={15} strokeWidth={1.5} />
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      onClick={handleClick}
      className={cn(
        "group inline-flex w-full items-center justify-center gap-2 border border-[#25D366]/40 bg-[#25D366]/10 px-4 py-3 font-sans text-[9px] font-semibold uppercase tracking-[0.16em] text-[#25D366] transition-all duration-300 hover:border-[#25D366] hover:bg-[#25D366] hover:text-white",
        className
      )}
    >
      <MessageCircle
        size={15}
        strokeWidth={1.8}
        className="transition-transform duration-300 group-hover:scale-110"
      />
      <span>{label}</span>
    </a>
  );
}
