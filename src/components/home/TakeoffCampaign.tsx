import Image from "next/image";
import { ButtonLink } from "@/components/ui";
import { ImageReveal, SlideUp } from "@/components/motion";

export default function TakeoffCampaign() {
  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-[#0b0907]">
      <ImageReveal className="absolute inset-0">
        <Image
          src="/images/collections/homepagetakeoff.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_35%]"
        />
      </ImageReveal>
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/20" />
      <div className="relative z-10 flex min-h-[88vh] items-center px-5 py-20 sm:px-10 md:px-16 lg:px-24">
        <SlideUp className="max-w-xl">
          <p className="saaq-eyebrow">Takeoff</p>
          <h2 className="mt-5 font-display text-[clamp(2.6rem,7vw,6rem)] leading-[0.9] tracking-[-0.03em] text-saaq-ivory">
            Make your move.
          </h2>
          <p className="mt-6 max-w-md font-sans text-sm leading-7 text-saaq-ivory/70">
            A fragrance for momentum, confidence and wherever you are going next.
          </p>
          <ButtonLink
            href="/collection/takeoff"
            variant="outline"
            className="mt-10 w-full text-center sm:w-auto"
          >
            Discover Takeoff
          </ButtonLink>
        </SlideUp>
      </div>
    </section>
  );
}
