import Image from "next/image";
import { ButtonLink } from "@/components/ui";
import { FadeIn, SlideUp } from "@/components/motion";
import { offers } from "@/data/offers";

function parseComboOffer(value: string) {
  const piecesMatch = value.match(/(\d+)\s*pieces?/i);
  const priceMatch = value.match(/AED\s*[\d,.]+/i);

  if (!piecesMatch || !priceMatch) {
    return null;
  }

  return {
    count: piecesMatch[1],
    price: priceMatch[0].replace(/\s+/g, " ").toUpperCase(),
  };
}

export default function OffersSection() {
  const offer = offers[0];
  const combo = offer ? parseComboOffer(offer.offer) : null;

  return (
    <section className="relative overflow-hidden bg-[#f4efe6] text-saaq-black">
      <div
        aria-hidden
        className="saaq-hero-orb pointer-events-none absolute left-[10%] top-16 h-64 w-64 rounded-full bg-saaq-gold/20 blur-[90px]"
      />
      <div
        aria-hidden
        className="saaq-hero-mist pointer-events-none absolute bottom-0 right-0 h-80 w-80 bg-saaq-gold/10 blur-[100px]"
      />
      <div className="saaq-container relative grid items-center gap-12 py-24 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.25fr)] lg:gap-16 lg:py-32">
        <SlideUp>
          <p className="saaq-eyebrow">Exclusive SAAQ offer</p>
          <h2 className="mt-6 font-display text-[clamp(2.4rem,6vw,5.5rem)] leading-[0.92] tracking-[-0.03em] text-saaq-black">
            Your signature awaits.
          </h2>
          <p className="mt-6 max-w-md font-sans text-sm leading-7 text-saaq-black/60">
            Discover selected SAAQ fragrances and find the scent that becomes
            yours.
          </p>
          {combo ? (
            <p className="mt-8 font-sans text-[11px] uppercase tracking-[0.28em] text-saaq-gold-deep">
              {combo.count} pieces · {combo.price}
            </p>
          ) : null}
          <ButtonLink
            href={offer?.href ?? "/collection"}
            className="mt-10 w-full text-center sm:w-auto"
          >
            Shop Now
          </ButtonLink>
        </SlideUp>

        <FadeIn delay={120} className="relative aspect-[4/5] overflow-hidden bg-[#efe8dc] sm:aspect-[5/4] lg:aspect-[5/4]">
          <Image
            src={offer?.image ?? "/images/collections/takeoff.png"}
            alt="SAAQ Take Off offer"
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-contain object-center p-4"
          />
        </FadeIn>
      </div>
    </section>
  );
}
