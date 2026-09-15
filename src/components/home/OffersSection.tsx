import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { GoldRule } from "@/components/ui";
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

  if (!offer) {
    return null;
  }

  const combo = parseComboOffer(offer.offer);

  return (
    <section
      aria-labelledby="takeoff-offer-heading"
      className="relative overflow-x-hidden bg-[#080705] text-saaq-ivory"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-saaq-gold/10 blur-[90px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 bg-[#5c3d24]/20 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[12%] top-0 h-px bg-gradient-to-r from-transparent via-saaq-gold/35 to-transparent"
      />

      <div className="saaq-container relative saaq-section">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-saaq-gold sm:tracking-[0.42em]">
            Exclusive SAAQ offer
          </p>
          <h2
            id="takeoff-offer-heading"
            className="saaq-h1 mt-5 text-saaq-ivory"
          >
            The Take Off Edit
          </h2>
          <p className="mx-auto mt-5 max-w-md font-sans text-sm leading-7 text-saaq-ivory/60">
            A signature selection created for movement, arrival and modern
            adventure.
          </p>
          <GoldRule className="mx-auto mt-8" />
        </Reveal>

        <div className="mt-14 grid items-stretch gap-10 lg:mt-20 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-0">
          <Reveal
            variant="image"
            className="group relative overflow-hidden bg-[#120e0b]"
          >
            <div className="relative aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-auto lg:min-h-[38rem] xl:min-h-[44rem]">
              <Image
                src={offer.image}
                alt="SAAQ Take Off Collection — 3 pieces for AED 120"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-contain object-center p-3 saaq-transition duration-[1400ms] group-hover:scale-[1.03] motion-reduce:transform-none sm:p-5"
              />
            </div>
          </Reveal>

          <Reveal
            delay={160}
            className="relative flex flex-col justify-center px-1 py-2 sm:px-2 lg:border-l lg:border-saaq-gold/25 lg:px-14 xl:px-16"
          >
            <p className="font-sans text-[10px] uppercase tracking-[0.38em] text-saaq-gold">
              {offer.collection} collection
            </p>

            {combo ? (
              <Reveal delay={280} className="mt-10">
                <p className="font-sans text-[11px] uppercase tracking-[0.36em] text-saaq-ivory/70">
                  {combo.count} pieces
                </p>
                <p className="mt-5 font-sans text-[10px] uppercase tracking-[0.4em] text-saaq-ivory/40">
                  For
                </p>
                <p className="mt-5 font-display text-4xl leading-none tracking-[-0.04em] text-saaq-gold sm:text-6xl lg:text-7xl">
                  {combo.price}
                </p>
              </Reveal>
            ) : (
              <p className="mt-10 font-display text-4xl text-saaq-gold">
                {offer.offer}
              </p>
            )}

            <div className="saaq-rule mt-10" />

            <p className="mt-8 max-w-sm font-sans text-sm leading-7 text-saaq-ivory/65">
              Composed for movement, arrival, and modern adventure — discover
              the Take Off Collection and create your own signature.
            </p>

            <p className="mt-10 font-sans text-[9px] uppercase tracking-[0.28em] text-saaq-ivory/35">
              Take Off collection · 100 ml · Exclusive selection
            </p>

            <Link
              href={offer.href}
              aria-label="Shop the Take Off offer"
              className="group/cta saaq-transition mt-10 inline-flex w-full items-center justify-center gap-3 border border-saaq-gold bg-transparent px-5 py-4 text-center font-sans text-[10px] uppercase tracking-[0.22em] text-saaq-ivory hover:bg-saaq-gold hover:text-saaq-black sm:w-fit sm:px-8 sm:tracking-[0.32em]"
            >
              Shop the Take Off offer
              <ArrowRight
                size={14}
                strokeWidth={1.3}
                className="saaq-transition group-hover/cta:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
