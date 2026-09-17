import Link from "next/link";
import { getTakeOffOfferCopy, type TakeOffPromotionResult } from "@/lib/takeOffPromotion";
import { cn } from "@/lib/cn";

export default function TakeOffOfferNote({
  promotion,
  compact = false,
  onNavigate,
}: {
  promotion: TakeOffPromotionResult;
  compact?: boolean;
  onNavigate?: () => void;
}) {
  const copy = getTakeOffOfferCopy(promotion);

  if (!copy) {
    return null;
  }

  return (
    <Link
      href="/collection/takeoff"
      onClick={onNavigate}
      aria-label="Shop the Take Off collection"
      className={cn(
        "block border border-saaq-gold/25 bg-saaq-gold/5 saaq-transition hover:border-saaq-gold/50",
        compact ? "px-4 py-3" : "px-5 py-4"
      )}
    >
      <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-saaq-gold sm:tracking-[0.28em]">
        {copy.eyebrow}
      </p>
      <p
        className={cn(
          "mt-2 font-sans uppercase text-saaq-ivory",
          compact
            ? "text-[11px] tracking-[0.16em]"
            : "text-xs tracking-[0.18em]"
        )}
      >
        {copy.title}
      </p>
      {copy.messages.map((message) => (
        <p
          key={message}
          className="mt-2 font-sans text-sm leading-6 text-saaq-ivory/70"
        >
          {message}
        </p>
      ))}
    </Link>
  );
}
