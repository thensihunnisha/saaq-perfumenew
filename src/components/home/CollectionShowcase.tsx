import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui";
import { FadeIn, SlideUp } from "@/components/motion";
import { cn } from "@/lib/cn";

const PANELS = [
  {
    href: "/collection/gems",
    title: "GEMS",
    line: "Refined intensity.",
    cta: "Explore Gems",
    image: "/images/collections/explore-gems-emerald.jpg",
    tone: "gems",
  },
  {
    href: "/collection/takeoff",
    title: "TAKEOFF",
    line: "Made for the next move.",
    cta: "Explore Takeoff",
    image: "/images/collections/explore-takeoff-group.jpg",
    tone: "takeoff",
  },
] as const;

export default function CollectionShowcase() {
  return (
    <section className="bg-saaq-black">
      <Container className="pt-20 pb-8 sm:pt-24">
        <SlideUp className="max-w-2xl">
          <p className="saaq-eyebrow">The Collection</p>
          <h2 className="saaq-h1 mt-4">Two expressions. One signature.</h2>
        </SlideUp>
      </Container>

      <div className="grid min-h-0 lg:grid-cols-2">
        {PANELS.map((panel, index) => (
          <FadeIn key={panel.href} delay={index * 80}>
            <Link
              href={panel.href}
              data-cursor="view"
              className={cn(
                "group relative block min-h-[70vh] overflow-hidden bg-saaq-void sm:min-h-[78vh]",
                panel.tone === "takeoff" ? "lg:min-h-[86vh]" : "lg:min-h-[86vh]"
              )}
            >
              <Image
                src={panel.image}
                alt={panel.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain object-center saaq-img-zoom"
              />
              <div
                className={cn(
                  "absolute inset-0 saaq-transition",
                  panel.tone === "gems"
                    ? "bg-gradient-to-t from-black/80 via-black/20 to-black/30 group-hover:from-black/70"
                    : "bg-gradient-to-t from-[#120c08]/85 via-black/15 to-black/25 group-hover:via-black/5"
                )}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 top-16 h-48 w-48 rounded-full bg-saaq-gold/0 blur-3xl saaq-transition group-hover:bg-saaq-gold/15"
              />
              <div className="absolute inset-x-0 bottom-0 z-10 p-8 saaq-transition group-hover:-translate-y-2 sm:p-12">
                <p className="font-display text-5xl tracking-[-0.03em] text-saaq-ivory sm:text-6xl">
                  {panel.title}
                </p>
                <p className="mt-4 font-sans text-sm text-saaq-ivory/70">
                  {panel.line}
                </p>
                <span className="mt-8 inline-flex items-center gap-3 font-sans text-[10px] uppercase tracking-[0.28em] text-saaq-gold">
                  {panel.cta}
                  <ArrowRight
                    size={14}
                    strokeWidth={1.3}
                    className="saaq-transition group-hover:translate-x-1.5"
                  />
                </span>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
