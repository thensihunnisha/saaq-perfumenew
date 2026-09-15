import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatAed,
  formatStatus,
  getOrderConfirmation,
} from "@/lib/storefront-orders";

type OrderSuccessPageProps = {
  params: Promise<{ id: string }>;
};

export default async function OrderSuccessPage({
  params,
}: OrderSuccessPageProps) {
  const { id } = await params;
  const order = await getOrderConfirmation(id).catch(() => null);

  if (!order) {
    notFound();
  }

  return (
    <div className="saaq-page bg-saaq-black text-saaq-ivory">
      <section className="saaq-container flex min-h-[80vh] items-center py-16">
        <div className="mx-auto w-full max-w-2xl border border-saaq-gold/20 bg-saaq-void px-6 py-12 sm:px-10">
          <p className="saaq-eyebrow">SAAQ Perfume</p>
          <h1 className="mt-5 break-words font-display text-3xl text-saaq-ivory sm:text-5xl">
            Thank You For Your Order
          </h1>
          <p className="saaq-body mt-5 max-w-lg">
            Your order has been received. Payment is still pending and has not
            been completed.
          </p>

          <dl className="mt-10 space-y-4 font-sans text-sm text-saaq-ivory/75">
            <div>Order ID: #{order.orderId}</div>
            <div>Customer name: {order.customerName || "—"}</div>
            <div>Order total: {formatAed(order.totalAmount)}</div>
            <div>Order status: {formatStatus(order.status)}</div>
            <div>Payment status: {formatStatus(order.paymentStatus)}</div>
          </dl>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/shop"
              className="saaq-btn saaq-transition inline-flex h-12 items-center justify-center border border-saaq-gold bg-saaq-gold px-6 font-sans text-[10px] uppercase tracking-[0.22em] text-saaq-black hover:bg-saaq-gold-deep"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="saaq-btn saaq-transition inline-flex h-12 items-center justify-center border border-white/15 px-6 font-sans text-[10px] uppercase tracking-[0.22em] text-saaq-ivory hover:border-saaq-gold hover:text-saaq-gold"
            >
              Back home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
