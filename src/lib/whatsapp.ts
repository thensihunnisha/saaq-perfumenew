import { SAAQ_WHATSAPP_NUMBER } from "@/config/whatsapp";
import { COLLECTION_LABELS, type CollectionSlug } from "@/data/products";

export type WhatsAppOrderItem = {
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
  return [
    "Hello SAAQ,",
    "",
    "I would like to order:",
    "",
    "Product:",
    item.name,
    "",
    "Collection:",
    formatCollectionLabel(item.collection),
    "",
    "Category:",
    item.category,
    "",
    "Quantity:",
    String(item.quantity),
    "",
    "Price:",
    `AED ${formatAed(item.price)}`,
    "",
    "Please confirm availability and delivery details.",
  ].join("\n");
}

export function buildCartOrderMessage(items: WhatsAppOrderItem[]) {
  const lines = items.map((item, index) => {
    const lineTotal = item.price * item.quantity;

    return [
      `${index + 1}. ${item.name}`,
      `Collection: ${formatCollectionLabel(item.collection)}`,
      `Category: ${item.category}`,
      `Quantity: ${item.quantity}`,
      `Price: AED ${formatAed(item.price)}`,
      `Subtotal: AED ${formatAed(lineTotal)}`,
    ].join("\n");
  });

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return [
    "Hello SAAQ,",
    "",
    "I would like to order:",
    "",
    ...lines.flatMap((line) => [line, ""]),
    "Subtotal:",
    `AED ${formatAed(total)}`,
    "",
    "Total:",
    `AED ${formatAed(total)}`,
    "",
    "Please confirm availability and delivery details.",
  ].join("\n");
}

export function toWhatsAppOrderItems(
  items: Array<{
    name: string;
    collection: string;
    category?: string;
    quantity: number;
    price: number;
  }>
): WhatsAppOrderItem[] {
  return items.map((item) => ({
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
