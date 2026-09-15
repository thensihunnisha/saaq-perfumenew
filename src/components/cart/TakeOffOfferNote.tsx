import { getTakeOffOfferCopy, type TakeOffPromotionResult } from "@/lib/takeOffPromotion";
import { cn } from "@/lib/cn";

export default function TakeOffOfferNote({
  promotion,
  compact = false,
}: {
  promotion: TakeOffPromotionResult;
  compact?: boolean;
}) {
  const copy = getTakeOffOfferCopy(promotion);

  if (!copy) {
    return null;
  }

  return (
    <div
      className={cn(
        "border border-saaq-gold/25 bg-saaq-gold/5",
        compact ? "px-4 py-3" : "px-5 py-4"
      )}
    >
      <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-saaq-gold">
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
    </div>
  );
}
