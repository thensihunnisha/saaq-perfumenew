import Link from "next/link";
import { notFound } from "next/navigation";
import { formatAdminDate, getAdminMessage } from "@/lib/admin-commerce";

type AdminMessageDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminMessageDetailPage({
  params,
}: AdminMessageDetailPageProps) {
  const { id } = await params;
  const message = await getAdminMessage(id).catch(() => null);

  if (!message) {
    notFound();
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <Link
        href="/admin/messages"
        className="saaq-transition font-sans text-[10px] uppercase tracking-[0.22em] text-saaq-gold hover:text-saaq-ivory"
      >
        Back to messages
      </Link>

      <p className="saaq-eyebrow mt-8">Inbox</p>
      <h1 className="mt-3 font-display text-4xl text-saaq-ivory">
        {message.subject || "Message"}
      </h1>

      <section className="mt-10 border border-saaq-gold/15 bg-saaq-black p-6">
        <p className="saaq-eyebrow">Customer information</p>
        <dl className="mt-6 space-y-3 font-sans text-sm text-saaq-ivory/75">
          <div>Name: {message.name || "—"}</div>
          <div>
            Email:{" "}
            {message.email ? (
              <a
                href={`mailto:${message.email}`}
                className="saaq-transition text-saaq-gold hover:text-saaq-ivory"
              >
                {message.email}
              </a>
            ) : (
              "—"
            )}
          </div>
          <div>Phone: {message.phone || "—"}</div>
          <div>Subject: {message.subject || "—"}</div>
          <div>Received: {formatAdminDate(message.created_at)}</div>
        </dl>
      </section>

      <section className="mt-10 border border-saaq-gold/15 bg-saaq-black p-6">
        <p className="saaq-eyebrow">Message</p>
        <p className="mt-6 whitespace-pre-wrap font-sans text-sm leading-7 text-saaq-ivory/80">
          {message.message || "—"}
        </p>
      </section>
    </div>
  );
}
