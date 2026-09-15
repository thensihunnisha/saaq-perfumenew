import { SAAQ_WHATSAPP_NUMBER } from "@/config/whatsapp";
import { COLLECTION_LABELS, type CollectionSlug } from "@/data/products";
import { FREE_SHIPPING_THRESHOLD, getOrderTotals } from "@/lib/orderTotals";
import { getTakeOffLine } from "@/lib/takeOffPromotion";

export type WhatsAppOrderItem = {
  id?: string;
  name: string;
  collection: string;
  category: string;
  quantity: number;
  price: number;
};

function formatAed(amount: number) {
  return amount.toFixed(2);
}

export function formatCollectionLabel(collection: string) {
  if (collection in COLLECTION_LABELS) {
    return COLLECTION_LABELS[collection as CollectionSlug];
  }

  if (collection === "takeoff") {
    return "Take Off";
  }

  if (collection === "gems") {
    return "Gems";
  }

  return collection;
}

export function buildProductOrderMessage(item: WhatsAppOrderItem) {
  return buildCartOrderMessage([item]);
}

export function buildCartOrderMessage(items: WhatsAppOrderItem[]) {
  const normalized = items.map((item, index) => ({
    ...item,
    id: item.id || `${item.name}-${index}`,
  }));
  const { subtotal, shipping, total, promotion } = getOrderTotals(normalized);

  const lines = normalized.map((item, index) => {
    const takeOffLine = getTakeOffLine(promotion, item.id);
    const lineTotal = takeOffLine
      ? takeOffLine.payableLineTotal
      : item.price * item.quantity;
    const freeLabel =
      takeOffLine && takeOffLine.freeQuantity > 0
        ? takeOffLine.freeQuantity === item.quantity
          ? "FREE"
          : `${takeOffLine.freeQuantity} FREE`
        : null;

    return [
      `${index + 1}. ${item.name}`,
      `Collection: ${formatCollectionLabel(item.collection)}`,
      `Category: ${item.category}`,
      `Quantity: ${item.quantity}`,
      `Price: AED ${formatAed(item.price)}`,
      freeLabel ? `Offer: ${freeLabel}` : null,
      `Line total: AED ${formatAed(lineTotal)}`,
    ]
      .filter((line): line is string => Boolean(line))
      .join("\n");
  });

  const summary =
    promotion.takeOffQuantity > 0
      ? [
          "Take Off offer: Buy 2, Get 1 FREE",
          `Take Off original: AED ${formatAed(promotion.originalTakeOffSubtotal)}`,
          promotion.takeOffDiscount > 0
            ? `Take Off discount: AED ${formatAed(promotion.takeOffDiscount)}`
            : null,
          `Take Off subtotal: AED ${formatAed(promotion.finalTakeOffSubtotal)}`,
          promotion.otherSubtotal > 0
            ? `Other items: AED ${formatAed(promotion.otherSubtotal)}`
            : null,
        ].filter((line): line is string => Boolean(line))
      : [];

  return [
    "Hello SAAQ,",
    "",
    "I would like to order:",
    "",
    ...lines.flatMap((line) => [line, ""]),
    ...summary.flatMap((line) => [line]),
    summary.length ? "" : null,
    "Subtotal:",
    `AED ${formatAed(subtotal)}`,
    "",
    "Shipping:",
    shipping === 0 ? "Complimentary" : `AED ${formatAed(shipping)}`,
    shipping > 0
      ? `Complimentary shipping from AED ${FREE_SHIPPING_THRESHOLD}`
      : null,
    "",
    "Total:",
    `AED ${formatAed(total)}`,
    "",
    "Please confirm availability and delivery details.",
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
}

export function toWhatsAppOrderItems(
  items: Array<{
    id?: string;
    name: string;
    collection: string;
    category?: string;
    quantity: number;
    price: number;
  }>
): WhatsAppOrderItem[] {
  return items.map((item) => ({
    id: item.id,
    name: item.name,
    collection: item.collection,
    category: item.category || formatCollectionLabel(item.collection),
    quantity: item.quantity,
    price: item.price,
  }));
}

export function getWhatsAppUrl(message: string) {
  return `https://wa.me/${SAAQ_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getProductWhatsAppUrl(item: WhatsAppOrderItem) {
  return getWhatsAppUrl(buildProductOrderMessage(item));
}

export function getCartWhatsAppUrl(items: WhatsAppOrderItem[]) {
  return getWhatsAppUrl(buildCartOrderMessage(items));
}

export function getEnquiryWhatsAppUrl() {
  return getWhatsAppUrl("Hello SAAQ,\n\nI would like to get in touch.");
}

export function openWhatsApp(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}
