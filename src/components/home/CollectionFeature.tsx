import Image from "next/image";
import {
  Body,
  ButtonLink,
  DisplayHeading,
  Eyebrow,
} from "@/components/ui";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/cn";

type CollectionFeatureProps = {
  eyebrow: string;
  title: string;
  statement: string;
  href: string;
  cta: string;
  image: string;
  reverse?: boolean;
};

export default function CollectionFeature({
  eyebrow,
  title,
  statement,
  href,
  cta,
  image,
  reverse = false,
}: CollectionFeatureProps) {
  return (
    <section className={cn("bg-saaq-black", reverse ? "bg-saaq-void" : "")}>
      <div
        className={cn(
          "grid min-h-0 lg:min-h-[72vh] lg:grid-cols-2",
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        )}
      >
        <div className="group relative min-h-[42vh] overflow-hidden bg-[#07081a] sm:min-h-[52vh] lg:min-h-[72vh]">
          <Reveal variant="image" className="absolute inset-0">
            <Image
              src={image}
              alt={title}
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={cn(
                "saaq-img-zoom object-cover",
                reverse ? "object-center sm:object-[center_right]" : "object-center"
              )}
            />
          </Reveal>
        </div>

        <div className="flex items-center">
          <Reveal className="saaq-container py-16 lg:py-0" variant="up" delay={120}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <DisplayHeading as="h2" className="saaq-h1 mt-5">
              {title}
            </DisplayHeading>
            <Body className="mt-6 max-w-md">{statement}</Body>
            <ButtonLink href={href} variant="outline" className="mt-10 w-full text-center sm:w-auto">
              {cta}
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
