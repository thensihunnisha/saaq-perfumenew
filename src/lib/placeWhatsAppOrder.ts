import {
  buildCartOrderMessage,
  getWhatsAppUrl,
  type WhatsAppOrderItem,
} from "@/lib/whatsapp";

export async function placeWhatsAppOrder(
  items: WhatsAppOrderItem[],
  kind: "product" | "cart"
): Promise<string> {
  void kind;
  return getWhatsAppUrl(buildCartOrderMessage(items));
}
