import Link from "next/link";
import { formatAdminDate, getAdminMessages } from "@/lib/admin-commerce";

export default async function AdminMessagesPage() {
  const messages = await getAdminMessages().catch(() => []);

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <div className="border-b border-saaq-gold/15 pb-8">
        <p className="saaq-eyebrow">Inbox</p>
        <h1 className="mt-3 font-display text-4xl text-saaq-ivory">
          Messages
        </h1>
        <p className="saaq-body mt-4 max-w-xl">
          Customer notes from the contact form
        </p>
      </div>

      <div className="mt-8 overflow-x-auto border border-saaq-gold/15 bg-saaq-black">
        <table className="min-w-[860px] w-full text-left">
          <thead>
            <tr className="border-b border-saaq-gold/15">
              {["ID", "Name", "Email", "Subject", "Date", "View"].map(
                (column) => (
                  <th
                    key={column}
                    className="px-5 py-4 font-sans text-[10px] uppercase tracking-[0.22em] text-saaq-gold"
                  >
                    {column}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {messages.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-16 text-center">
                  <p className="font-display text-2xl text-saaq-ivory/80">
                    No messages found.
                  </p>
                  <p className="saaq-body mx-auto mt-3 max-w-sm">
                    Notes sent from the contact page will appear here.
                  </p>
                </td>
              </tr>
            ) : (
              messages.map((item) => (
                <tr
                  key={String(item.id)}
                  className="border-b border-white/5 last:border-b-0"
                >
                  <td className="px-5 py-4 font-sans text-sm text-saaq-ivory">
                    #{item.id}
                  </td>
                  <td className="px-5 py-4 font-display text-lg text-saaq-ivory">
                    {item.name || "—"}
                  </td>
                  <td className="px-5 py-4 font-sans text-sm text-saaq-ivory/70">
                    {item.email || "—"}
                  </td>
                  <td className="px-5 py-4 font-sans text-sm text-saaq-ivory/70">
                    {item.subject || "—"}
                  </td>
                  <td className="px-5 py-4 font-sans text-sm text-saaq-ivory/70">
                    {formatAdminDate(item.created_at)}
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/messages/${item.id}`}
                      className="saaq-transition font-sans text-[10px] uppercase tracking-[0.22em] text-saaq-gold hover:text-saaq-ivory"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
