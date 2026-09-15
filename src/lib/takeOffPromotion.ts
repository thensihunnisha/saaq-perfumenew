export const TAKE_OFF_PROMOTION = {
  collection: "Takeoff",
  buyQuantity: 2,
  freeQuantity: 1,
  bundleQuantity: 3,
  bundlePrice: 120,
} as const;

export type PromotionCartItem = {
  id: string | number;
  collection: string;
  price: number;
  quantity: number;
};

export type TakeOffLinePromotion = {
  id: string;
  quantity: number;
  unitPrice: number;
  originalLineTotal: number;
  payableLineTotal: number;
  freeQuantity: number;
  paidQuantity: number;
};

export type TakeOffPromotionResult = {
  takeOffQuantity: number;
  freeQuantity: number;
  paidQuantity: number;
  originalTakeOffSubtotal: number;
  takeOffDiscount: number;
  finalTakeOffSubtotal: number;
  otherSubtotal: number;
  originalSubtotal: number;
  subtotal: number;
  remainingToFree: number;
  lines: TakeOffLinePromotion[];
};

type TakeOffUnit = {
  id: string;
  price: number;
};

export function money(value: number) {
  return Math.round(Number(value) * 100) / 100;
}

export function isTakeOffCollection(value: string | null | undefined) {
  const normalized = String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "");

  return normalized === "takeoff";
}

function compareUnits(a: TakeOffUnit, b: TakeOffUnit) {
  if (a.price !== b.price) {
    return a.price - b.price;
  }

  return a.id.localeCompare(b.id, undefined, { numeric: true });
}

export function calculateTakeOffPromotion(
  cartItems: PromotionCartItem[]
): TakeOffPromotionResult {
  const takeOffUnits: TakeOffUnit[] = [];
  const takeOffItems: PromotionCartItem[] = [];
  let otherSubtotal = 0;

  for (const item of cartItems) {
    const quantity = Number(item.quantity);

    if (!Number.isInteger(quantity) || quantity <= 0) {
      continue;
    }

    const unitPrice = money(item.price);

    if (isTakeOffCollection(item.collection)) {
      takeOffItems.push(item);

      for (let index = 0; index < quantity; index += 1) {
        takeOffUnits.push({
          id: String(item.id),
          price: unitPrice,
        });
      }
    } else {
      otherSubtotal = money(otherSubtotal + unitPrice * quantity);
    }
  }

  takeOffUnits.sort(compareUnits);

  const takeOffQuantity = takeOffUnits.length;
  const bundles = Math.floor(
    takeOffQuantity / TAKE_OFF_PROMOTION.bundleQuantity
  );
  const remainder = takeOffQuantity % TAKE_OFF_PROMOTION.bundleQuantity;
  const freeQuantity = bundles * TAKE_OFF_PROMOTION.freeQuantity;
  const paidQuantity = takeOffQuantity - freeQuantity;
  const originalTakeOffSubtotal = money(
    takeOffUnits.reduce((sum, unit) => sum + unit.price, 0)
  );

  const payableById = new Map<string, number>();
  const freeById = new Map<string, number>();

  for (const item of takeOffItems) {
    payableById.set(String(item.id), 0);
    freeById.set(String(item.id), 0);
  }

  const bundleUnits = takeOffUnits.slice(
    0,
    bundles * TAKE_OFF_PROMOTION.bundleQuantity
  );
  const remainderUnits = takeOffUnits.slice(
    bundles * TAKE_OFF_PROMOTION.bundleQuantity
  );

  for (let index = 0; index < freeQuantity; index += 1) {
    const unit = bundleUnits[index];
    if (!unit) continue;
    freeById.set(unit.id, (freeById.get(unit.id) || 0) + 1);
  }

  const paidBundleUnits = bundleUnits.slice(freeQuantity);
  const bundlePayableTotal = money(bundles * TAKE_OFF_PROMOTION.bundlePrice);
  const paidBundleCatalog = money(
    paidBundleUnits.reduce((sum, unit) => sum + unit.price, 0)
  );

  if (paidBundleUnits.length > 0) {
    if (paidBundleCatalog <= 0) {
      const share = money(bundlePayableTotal / paidBundleUnits.length);
      let allocated = 0;

      paidBundleUnits.forEach((unit, index) => {
        const amount =
          index === paidBundleUnits.length - 1
            ? money(bundlePayableTotal - allocated)
            : share;
        allocated = money(allocated + amount);
        payableById.set(unit.id, money((payableById.get(unit.id) || 0) + amount));
      });
    } else {
      let allocated = 0;

      paidBundleUnits.forEach((unit, index) => {
        const amount =
          index === paidBundleUnits.length - 1
            ? money(bundlePayableTotal - allocated)
            : money((unit.price / paidBundleCatalog) * bundlePayableTotal);
        allocated = money(allocated + amount);
        payableById.set(unit.id, money((payableById.get(unit.id) || 0) + amount));
      });
    }
  }

  for (const unit of remainderUnits) {
    payableById.set(unit.id, money((payableById.get(unit.id) || 0) + unit.price));
  }

  const finalTakeOffSubtotal = money(
    [...payableById.values()].reduce((sum, value) => sum + value, 0)
  );
  const takeOffDiscount = money(originalTakeOffSubtotal - finalTakeOffSubtotal);

  const lines: TakeOffLinePromotion[] = takeOffItems.map((item) => {
    const id = String(item.id);
    const quantity = Number(item.quantity);
    const unitPrice = money(item.price);
    const lineFree = freeById.get(id) || 0;

    return {
      id,
      quantity,
      unitPrice,
      originalLineTotal: money(unitPrice * quantity),
      payableLineTotal: money(payableById.get(id) || 0),
      freeQuantity: lineFree,
      paidQuantity: quantity - lineFree,
    };
  });

  return {
    takeOffQuantity,
    freeQuantity,
    paidQuantity,
    originalTakeOffSubtotal,
    takeOffDiscount,
    finalTakeOffSubtotal,
    otherSubtotal,
    originalSubtotal: money(originalTakeOffSubtotal + otherSubtotal),
    subtotal: money(finalTakeOffSubtotal + otherSubtotal),
    remainingToFree:
      takeOffQuantity > 0 && remainder === TAKE_OFF_PROMOTION.buyQuantity
        ? TAKE_OFF_PROMOTION.freeQuantity
        : 0,
    lines,
  };
}

export function getTakeOffLine(
  result: TakeOffPromotionResult,
  id: string | number
) {
  return result.lines.find((line) => line.id === String(id));
}

export function getTakeOffOfferCopy(result: TakeOffPromotionResult) {
  if (result.takeOffQuantity === 0) {
    return null;
  }

  const messages: string[] = [];

  if (result.remainingToFree === 1) {
    messages.push("Add 1 more Take Off piece and get it FREE");
  }

  if (result.freeQuantity === 1) {
    messages.push("🎁 1 Take Off piece FREE");
  } else if (result.freeQuantity > 1) {
    messages.push(`🎁 ${result.freeQuantity} Take Off pieces FREE`);
  }

  return {
    eyebrow: "TAKE OFF OFFER",
    title: "Buy 2, Get 1 FREE",
    messages,
  };
}
