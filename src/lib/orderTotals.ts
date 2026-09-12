export const FREE_SHIPPING_THRESHOLD = 300;
export const STANDARD_SHIPPING_AED = 25;

export function getShipping(subtotal: number) {
  if (subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD) {
    return 0;
  }

  return STANDARD_SHIPPING_AED;
}

export function getOrderTotals(items: { price: number; quantity: number }[]) {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = getShipping(subtotal);
  const total = subtotal + shipping;

  return { subtotal, shipping, total };
}
