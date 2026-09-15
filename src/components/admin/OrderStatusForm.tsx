"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

const ORDER_STATUSES = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
] as const;

type OrderStatusFormProps = {
  orderId: string;
  currentStatus: string;
};

export default function OrderStatusForm({
  orderId,
  currentStatus,
}: OrderStatusFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);

    const formData = new FormData(event.currentTarget);
    const status = String(formData.get("status") ?? "");
    const response = await fetch(`/api/admin/orders/${orderId}/status`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
    const payload = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    setPending(false);

    if (!response.ok) {
      setError(payload?.message || "Unable to update order status.");
      return;
    }

    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end">
      <label className="block flex-1">
        <span className="saaq-eyebrow text-[9px]">Order status</span>
        <select
          name="status"
          defaultValue={currentStatus}
          className="mt-3 h-12 w-full border border-white/15 bg-saaq-void px-4 font-sans text-sm text-saaq-ivory outline-none focus:border-saaq-gold"
        >
          {ORDER_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        disabled={pending}
        className="saaq-btn saaq-transition inline-flex h-12 items-center justify-center border border-saaq-gold bg-saaq-gold px-6 font-sans text-[10px] uppercase tracking-[0.22em] text-saaq-black hover:bg-saaq-gold-deep disabled:opacity-60"
      >
        {pending ? "Saving" : "Update Status"}
      </button>
      {error ? (
        <p className="font-sans text-sm text-saaq-ivory/70">{error}</p>
      ) : null}
    </form>
  );
}
