import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatAdminDate,
  formatAed,
  formatStatus,
  getAdminCustomer,
} from "@/lib/admin-commerce";

type AdminCustomerDetailPageProps = {
  params: Promise<{ id: string }>;
};

function formatCustomerAddress(
  customer: NonNullable<Awaited<ReturnType<typeof getAdminCustomer>>>
) {
  const parts = [
    customer.address,
    customer.city,
    customer.state,
    customer.postal_code,
    customer.country,
  ].filter(Boolean);

  return parts.length ? parts.join(", ") : "—";
}

export default async function AdminCustomerDetailPage({
  params,
}: AdminCustomerDetailPageProps) {
  const { id } = await params;
  const customer = await getAdminCustomer(id).catch(() => null);

  if (!customer) {
    notFound();
  }

  const orders = customer.orders ?? [];

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <Link
        href="/admin/customers"
        className="saaq-transition font-sans text-[10px] uppercase tracking-[0.22em] text-saaq-gold hover:text-saaq-ivory"
      >
        Back to customers
      </Link>

      <p className="saaq-eyebrow mt-8">Sales</p>
      <h1 className="mt-3 font-display text-4xl text-saaq-ivory">
        {customer.name || "Customer"}
      </h1>

      <section className="mt-10 border border-saaq-gold/15 bg-saaq-black p-6">
        <p className="saaq-eyebrow">Customer information</p>
        <dl className="mt-6 space-y-3 font-sans text-sm text-saaq-ivory/75">
          <div>Name: {customer.name || "—"}</div>
          <div>Email: {customer.email || "—"}</div>
          <div>Phone: {customer.phone || "—"}</div>
          <div>Address: {formatCustomerAddress(customer)}</div>
          <div>Registered: {formatAdminDate(customer.created_at)}</div>
          <div>Total orders: {Number(customer.order_count ?? orders.length)}</div>
          <div>Total spent: {formatAed(customer.total_spent)}</div>
        </dl>
      </section>

      <section className="mt-10">
        <p className="saaq-eyebrow">Customer order history</p>
        <div className="mt-6 overflow-x-auto border border-saaq-gold/15 bg-saaq-black">
          <table className="min-w-[760px] w-full text-left">
            <thead>
              <tr className="border-b border-saaq-gold/15">
                {["Order ID", "Date", "Total", "Payment", "Status", "View"].map(
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
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center">
                    <p className="saaq-body">No orders found.</p>
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={String(order.id)}
                    className="border-b border-white/5 last:border-b-0"
                  >
                    <td className="px-5 py-4 font-sans text-sm text-saaq-ivory">
                      #{order.id}
                    </td>
                    <td className="px-5 py-4 font-sans text-sm text-saaq-ivory/70">
                      {formatAdminDate(order.created_at)}
                    </td>
                    <td className="px-5 py-4 font-sans text-sm text-saaq-ivory/70">
                      {formatAed(order.total_amount)}
                    </td>
                    <td className="px-5 py-4 font-sans text-sm text-saaq-ivory/70">
                      {formatStatus(order.payment_status)}
                    </td>
                    <td className="px-5 py-4 font-sans text-sm text-saaq-ivory/70">
                      {formatStatus(order.status)}
                    </td>
                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="saaq-transition font-sans text-[10px] uppercase tracking-[0.22em] text-saaq-gold hover:text-saaq-ivory"
                      >
                        View order
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
