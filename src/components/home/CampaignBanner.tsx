import Image from "next/image";
import { Parallax } from "@/components/motion";

export default function CampaignBanner() {
  return (
    <section className="relative min-h-[78vh] overflow-hidden bg-saaq-black lg:min-h-[88vh]">
      <Parallax speed={0.16} className="absolute inset-[-12%]">
        <Image
          src="/images/collections/final-cta-home.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_40%]"
        />
      </Parallax>
      <div className="absolute inset-0 bg-saaq-black/45" />
      <div className="relative z-10 flex min-h-[78vh] items-center justify-center px-5 text-center lg:min-h-[88vh]">
        <div>
          <p className="saaq-eyebrow">SAAQ</p>
          <h2 className="mt-6 font-display text-[clamp(2.4rem,7vw,6.5rem)] leading-[0.9] tracking-[-0.03em] text-saaq-ivory">
            Wear your presence.
          </h2>
        </div>
      </div>
    </section>
  );
}
