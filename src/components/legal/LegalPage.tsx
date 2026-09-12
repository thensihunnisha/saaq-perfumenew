import { Body, DisplayHeading, Eyebrow } from "@/components/ui";

type LegalPageProps = {
  title: string;
  eyebrow: string;
  intro: string;
  sections: Array<{ heading: string; body: string }>;
};

export default function LegalPage({
  title,
  eyebrow,
  intro,
  sections,
}: LegalPageProps) {
  return (
    <div className="saaq-page bg-saaq-black text-saaq-ivory">
      <section className="border-b border-white/10">
        <div className="saaq-container py-16 sm:py-20">
          <Eyebrow>{eyebrow}</Eyebrow>
          <DisplayHeading as="h1" className="mt-6">
            {title}
          </DisplayHeading>
          <Body className="mt-6 max-w-2xl">{intro}</Body>
        </div>
      </section>

      <section className="saaq-container space-y-12 py-16 lg:py-24">
        {sections.map((section) => (
          <article key={section.heading} className="max-w-2xl">
            <h2 className="saaq-h3">{section.heading}</h2>
            <Body className="mt-4">{section.body}</Body>
          </article>
        ))}
      </section>
    </div>
  );
}
