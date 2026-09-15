import {
  calculateTakeOffPromotion,
  money,
  type TakeOffPromotionResult,
} from "@/lib/takeOffPromotion";

export const FREE_SHIPPING_THRESHOLD = 300;
export const STANDARD_SHIPPING_AED = 25;

export type OrderTotalItem = {
  id?: string | number;
  collection?: string;
  price: number;
  quantity: number;
};

export type OrderTotals = {
  subtotal: number;
  shipping: number;
  total: number;
  promotion: TakeOffPromotionResult;
};

export function getShipping(_subtotal?: number) {
  return 0;
}

export function getOrderTotals(items: OrderTotalItem[]): OrderTotals {
  const promotion = calculateTakeOffPromotion(
    items.map((item, index) => ({
      id: item.id ?? `item-${index}`,
      collection: item.collection ?? "",
      price: item.price,
      quantity: item.quantity,
    }))
  );
  const subtotal = promotion.subtotal;
  const shipping = getShipping(subtotal);

  return {
    subtotal,
    shipping,
    total: money(subtotal + shipping),
    promotion,
  };
}
