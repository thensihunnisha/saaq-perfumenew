const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export type OrderConfirmation = {
  success: boolean;
  orderId: number | string;
  customerName?: string | null;
  totalAmount?: number | string | null;
  status?: string | null;
  paymentStatus?: string | null;
};

export async function getOrderConfirmation(
  id: string
): Promise<OrderConfirmation | null> {
  const response = await fetch(`${API_URL}/api/orders/${id}/confirmation`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Unable to load order");
  }

  return (await response.json()) as OrderConfirmation;
}

export function formatAed(value?: number | string | null) {
  const amount = Number(value ?? 0);
  return `AED ${Number.isFinite(amount) ? amount.toFixed(2) : "0.00"}`;
}

export function formatStatus(value?: string | null) {
  if (!value) {
    return "—";
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}
