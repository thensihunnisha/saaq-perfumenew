import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import OrderStatusForm from "@/components/admin/OrderStatusForm";
import {
  formatAdminDate,
  formatAed,
  formatChannel,
  formatPaymentMethod,
  formatStatus,
  getAdminOrder,
} from "@/lib/admin-commerce";

type AdminOrderDetailPageProps = {
  params: Promise<{ id: string }>;
};

function customerAddress(order: Awaited<ReturnType<typeof getAdminOrder>>) {
  const customer = order?.customer;
  const parts = [
    customer?.address,
    customer?.city,
    customer?.state,
    customer?.postal_code,
    customer?.country,
    order?.shipping_address,
  ].filter((part, index, list) => part && list.indexOf(part) === index);

  return parts.length ? parts.join(", ") : "—";
}

export default async function AdminOrderDetailPage({
  params,
}: AdminOrderDetailPageProps) {
  const { id } = await params;
  const order = await getAdminOrder(id).catch(() => null);

  if (!order) {
    notFound();
  }

  const items = order.items ?? [];
  const itemsTotal = items.reduce(
    (sum, item) => sum + Number(item.subtotal ?? 0),
    0
  );
  const isWhatsApp = String(order.channel ?? "").toLowerCase() === "whatsapp";

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <Link
        href="/admin/orders"
        className="saaq-transition font-sans text-[10px] uppercase tracking-[0.22em] text-saaq-gold hover:text-saaq-ivory"
      >
        Back to orders
      </Link>

      <p className="saaq-eyebrow mt-8">Sales</p>
      <h1 className="mt-3 font-display text-4xl text-saaq-ivory">
        Order #{order.id}
      </h1>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <article className="border border-saaq-gold/15 bg-saaq-black p-6">
          <p className="saaq-eyebrow">Order information</p>
          <dl className="mt-6 space-y-3 font-sans text-sm text-saaq-ivory/75">
            <div>Order ID: #{order.id}</div>
            <div>Date: {formatAdminDate(order.created_at)}</div>
            <div>Channel: {formatChannel(order.channel)}</div>
            <div>Order status: {formatStatus(order.status)}</div>
            <div>Payment: {formatPaymentMethod(order)}</div>
            <div>Total: {formatAed(order.total_amount)}</div>
          </dl>
          <OrderStatusForm
            orderId={String(order.id)}
            currentStatus={order.status || "pending"}
          />
        </article>

        <article className="border border-saaq-gold/15 bg-saaq-black p-6">
          <p className="saaq-eyebrow">Customer information</p>
          {isWhatsApp ? (
            <dl className="mt-6 space-y-3 font-sans text-sm text-saaq-ivory/75">
              <div>Name: {order.customer?.name || "WhatsApp customer"}</div>
              <div>Phone: To be confirmed on WhatsApp</div>
              <div>Address: {order.shipping_address || "To be confirmed on WhatsApp"}</div>
            </dl>
          ) : order.customer ? (
            <dl className="mt-6 space-y-3 font-sans text-sm text-saaq-ivory/75">
              <div>Name: {order.customer.name || "—"}</div>
              <div>Email: {order.customer.email || "—"}</div>
              <div>Phone: {order.customer.phone || "—"}</div>
              <div>Address: {customerAddress(order)}</div>
              <div>
                <Link
                  href={`/admin/customers/${order.customer.id}`}
                  className="saaq-transition text-saaq-gold hover:text-saaq-ivory"
                >
                  View customer
                </Link>
              </div>
            </dl>
          ) : (
            <p className="saaq-body mt-6">Customer record is not available.</p>
          )}
        </article>
      </section>

      <section className="mt-10">
        <p className="saaq-eyebrow">Ordered products</p>
        <div className="mt-6 overflow-x-auto border border-saaq-gold/15 bg-saaq-black">
          <table className="min-w-[720px] w-full text-left">
            <thead>
              <tr className="border-b border-saaq-gold/15">
                {["Product", "Collection", "Qty", "Unit price", "Line total"].map((column) => (
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
              {items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center">
                    <p className="saaq-body">No order items found.</p>
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr
                    key={String(item.id)}
                    className="border-b border-white/5 last:border-b-0"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-14 w-14 overflow-hidden bg-saaq-charcoal">
                          {item.product_image?.startsWith("/") ? (
                            <Image
                              src={item.product_image}
                              alt=""
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          ) : null}
                        </div>
                        <div>
                          <p className="font-display text-lg text-saaq-ivory">
                            {item.product_name || "Product unavailable"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-sans text-sm text-saaq-ivory/70">
                      {item.product_collection || "—"}
                    </td>
                    <td className="px-5 py-4 font-sans text-sm text-saaq-ivory/70">
                      {item.quantity ?? 0}
                    </td>
                    <td className="px-5 py-4 font-sans text-sm text-saaq-ivory/70">
                      {formatAed(item.price)}
                    </td>
                    <td className="px-5 py-4 font-sans text-sm text-saaq-ivory/70">
                      {formatAed(item.subtotal)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <p className="saaq-body mt-5">Items subtotal: {formatAed(itemsTotal)}</p>
        <p className="saaq-body">Order total: {formatAed(order.total_amount)}</p>
      </section>

      {order.notes ? (
        <section className="mt-10 border border-saaq-gold/15 bg-saaq-black p-6">
          <p className="saaq-eyebrow">WhatsApp order details</p>
          <pre className="saaq-body mt-6 whitespace-pre-wrap font-sans text-sm text-saaq-ivory/80">
            {order.notes}
          </pre>
        </section>
      ) : null}
    </div>
  );
}
