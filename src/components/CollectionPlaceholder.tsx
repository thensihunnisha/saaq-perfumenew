import {
  Body,
  ButtonLink,
  DisplayHeading,
  Eyebrow,
  GoldRule,
} from "@/components/ui";

type CollectionPlaceholderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function CollectionPlaceholder({
  eyebrow,
  title,
  description,
}: CollectionPlaceholderProps) {
  return (
    <div className="saaq-page">
      <section className="saaq-container saaq-section max-w-3xl text-center">
        <Eyebrow>{eyebrow}</Eyebrow>
        <DisplayHeading className="mt-4 saaq-h1">{title}</DisplayHeading>
        <GoldRule className="mx-auto mt-6" />
        <Body className="mx-auto mt-6 max-w-lg">{description}</Body>
        <ButtonLink href="/collection" variant="outline" className="mt-10">
          View All Fragrances
        </ButtonLink>
      </section>
    </div>
  );
}
