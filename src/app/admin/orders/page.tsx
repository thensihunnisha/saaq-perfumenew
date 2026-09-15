import Link from "next/link";
import {
  formatAdminDate,
  formatAed,
  formatChannel,
  formatPaymentMethod,
  formatStatus,
  getAdminOrders,
} from "@/lib/admin-commerce";

export default async function AdminOrdersPage() {
  const orders = await getAdminOrders().catch(() => []);

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <div className="border-b border-saaq-gold/15 pb-8">
        <p className="saaq-eyebrow">Sales</p>
        <h1 className="mt-3 font-display text-4xl text-saaq-ivory">Orders</h1>
        <p className="saaq-body mt-4 max-w-xl">Manage customer orders</p>
      </div>

      <div className="mt-8 overflow-x-auto border border-saaq-gold/15 bg-saaq-black">
        <table className="min-w-[860px] w-full text-left">
          <thead>
            <tr className="border-b border-saaq-gold/15">
              {[
                "Order ID",
                "Customer",
                "Channel",
                "Date",
                "Total",
                "Payment",
                "Status",
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
            {orders.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-5 py-16 text-center">
                  <p className="font-display text-2xl text-saaq-ivory/80">
                    No orders found.
                  </p>
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
                  <td className="px-5 py-4 font-display text-lg text-saaq-ivory">
                    {order.customer_name || "—"}
                  </td>
                  <td className="px-5 py-4 font-sans text-sm text-saaq-ivory/70">
                    {formatChannel(order.channel)}
                  </td>
                  <td className="px-5 py-4 font-sans text-sm text-saaq-ivory/70">
                    {formatAdminDate(order.created_at)}
                  </td>
                  <td className="px-5 py-4 font-sans text-sm text-saaq-ivory/70">
                    {formatAed(order.total_amount)}
                  </td>
                  <td className="px-5 py-4 font-sans text-sm text-saaq-ivory/70">
                    {formatPaymentMethod(order)}
                  </td>
                  <td className="px-5 py-4 font-sans text-sm text-saaq-ivory/70">
                    {formatStatus(order.status)}
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/orders/${order.id}`}
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
