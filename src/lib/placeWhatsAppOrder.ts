import {
  buildCartOrderMessage,
  buildProductOrderMessage,
  getWhatsAppUrl,
  type WhatsAppOrderItem,
} from "@/lib/whatsapp";

function withOrderId(message: string, orderId: number | string) {
  return [`Order ID: #${orderId}`, "", message].join("\n");
}

export async function placeWhatsAppOrder(
  items: WhatsAppOrderItem[],
  kind: "product" | "cart"
): Promise<string> {
  const firstItem = items[0];
  const message =
    kind === "cart" || !firstItem
      ? buildCartOrderMessage(items)
      : buildProductOrderMessage(firstItem);

  const persistable = items.filter(
    (item) => item.id && /^\d+$/.test(item.id) && item.quantity >= 1
  );

  if (!persistable.length) {
    return getWhatsAppUrl(message);
  }

  try {
    const response = await fetch("/api/whatsapp-order", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        items: persistable.map((item) => ({
          productId: Number(item.id),
          quantity: item.quantity,
        })),
      }),
    });
    const payload = (await response.json().catch(() => null)) as {
      success?: boolean;
      orderId?: number | string;
    } | null;

    if (response.ok && payload?.orderId) {
      return getWhatsAppUrl(withOrderId(message, payload.orderId));
    }
  } catch {
    // WhatsApp should still open even if the admin copy cannot be saved.
  }

  return getWhatsAppUrl(message);
}
