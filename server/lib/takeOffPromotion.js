const TAKE_OFF_PROMOTION = {
  collection: "Takeoff",
  buyQuantity: 2,
  freeQuantity: 1,
  bundleQuantity: 3,
  bundlePrice: 120,
};

function money(value) {
  return Math.round(Number(value) * 100) / 100;
}

function isTakeOffCollection(value) {
  const normalized = String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "");

  return normalized === "takeoff";
}

function compareUnits(a, b) {
  if (a.price !== b.price) {
    return a.price - b.price;
  }

  return String(a.id).localeCompare(String(b.id), undefined, { numeric: true });
}

function calculateTakeOffPromotion(cartItems) {
  const takeOffUnits = [];
  const takeOffItems = [];
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

  const payableById = new Map();
  const freeById = new Map();

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

  const lines = takeOffItems.map((item) => {
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

module.exports = {
  TAKE_OFF_PROMOTION,
  money,
  isTakeOffCollection,
  calculateTakeOffPromotion,
};
