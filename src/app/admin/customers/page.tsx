import Link from "next/link";
import { formatAed, getAdminCustomers } from "@/lib/admin-commerce";

export default async function AdminCustomersPage() {
  const customers = await getAdminCustomers().catch(() => []);

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <div className="border-b border-saaq-gold/15 pb-8">
        <p className="saaq-eyebrow">Sales</p>
        <h1 className="mt-3 font-display text-4xl text-saaq-ivory">
          Customers
        </h1>
        <p className="saaq-body mt-4 max-w-xl">Manage customer accounts</p>
      </div>

      <div className="mt-8 overflow-x-auto border border-saaq-gold/15 bg-saaq-black">
        <table className="min-w-[860px] w-full text-left">
          <thead>
            <tr className="border-b border-saaq-gold/15">
              {[
                "Customer ID",
                "Name",
                "Email",
                "Phone",
                "Orders",
                "Total spent",
                "View",
              ].map((column) => (
                <th
                  key={column}
                  className="px-5 py-4 font-sans text-[10px] uppercase tracking-[0.22em] text-saaq-gold"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-16 text-center">
                  <p className="font-display text-2xl text-saaq-ivory/80">
                    No customers found.
                  </p>
                </td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr
                  key={String(customer.id)}
                  className="border-b border-white/5 last:border-b-0"
                >
                  <td className="px-5 py-4 font-sans text-sm text-saaq-ivory">
                    #{customer.id}
                  </td>
                  <td className="px-5 py-4 font-display text-lg text-saaq-ivory">
                    {customer.name || "—"}
                  </td>
                  <td className="px-5 py-4 font-sans text-sm text-saaq-ivory/70">
                    {customer.email || "—"}
                  </td>
                  <td className="px-5 py-4 font-sans text-sm text-saaq-ivory/70">
                    {customer.phone || "—"}
                  </td>
                  <td className="px-5 py-4 font-sans text-sm text-saaq-ivory/70">
                    {Number(customer.order_count ?? 0)}
                  </td>
                  <td className="px-5 py-4 font-sans text-sm text-saaq-ivory/70">
                    {formatAed(customer.total_spent)}
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/customers/${customer.id}`}
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
