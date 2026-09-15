import type { CartItem } from "@/context/CartContext";

export const UAE_EMIRATES = [
  "Abu Dhabi",
  "Ajman",
  "Dubai",
  "Fujairah",
  "Ras Al Khaimah",
  "Sharjah",
  "Umm Al Quwain",
] as const;

export const CHECKOUT_COUNTRY = "United Arab Emirates";

export type PaymentMethod = "card" | "cod" | "online";

export type CheckoutCustomer = {
  fullName: string;
  email: string;
  phone: string;
};

export type CheckoutDelivery = {
  address: string;
  apartment: string;
  city: string;
  emirate: string;
  country: string;
};

export type CheckoutPayload = {
  customer: CheckoutCustomer;
  delivery: CheckoutDelivery;
  paymentMethod: PaymentMethod;
  items: Array<{
    id: string;
    name: string;
    collection: string;
    category: string;
    quantity: number;
    price: number;
  }>;
  totals: {
    subtotal: number;
    shipping: number;
    total: number;
  };
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isPhone(value: string) {
  const trimmed = value.trim();
  const digits = trimmed.replace(/\D/g, "");

  if (!/^[\d+\s()-]+$/.test(trimmed)) {
    return false;
  }

  if (digits.startsWith("971")) {
    return digits.length === 12;
  }

  if (digits.startsWith("05") || digits.startsWith("5")) {
    return digits.length === 9 || digits.length === 10;
  }

  return digits.length >= 9 && digits.length <= 15;
}

export function validateCheckout(
  customer: CheckoutCustomer,
  delivery: CheckoutDelivery,
  itemCount: number
) {
  const errors: Record<string, string> = {};

  if (itemCount === 0) {
    errors.cart = "Your bag is empty.";
  }

  if (!customer.fullName.trim()) {
    errors.fullName = "Enter your full name.";
  }

  if (!customer.email.trim()) {
    errors.email = "Enter your email.";
  } else if (!isEmail(customer.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!customer.phone.trim()) {
    errors.phone = "Enter your phone number.";
  } else if (!isPhone(customer.phone)) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!delivery.address.trim()) {
    errors.address = "Enter your address.";
  }

  if (!delivery.city.trim()) {
    errors.city = "Enter your city.";
  }

  if (!delivery.emirate.trim()) {
    errors.emirate = "Select an emirate.";
  }

  if (!delivery.country.trim()) {
    errors.country = "Enter your country.";
  }

  return errors;
}

export function buildPlaceOrderPayload(
  items: CartItem[],
  customer: CheckoutCustomer,
  delivery: CheckoutDelivery
) {
  return {
    customer: {
      name: customer.fullName.trim(),
      email: customer.email.trim(),
      phone: customer.phone.trim(),
      address: delivery.address.trim(),
      apartment: delivery.apartment.trim(),
      city: delivery.city.trim(),
      emirate: delivery.emirate,
      country: delivery.country.trim(),
    },
    items: items.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    })),
  };
}

export function buildCheckoutPayload(
  items: CartItem[],
  customer: CheckoutCustomer,
  delivery: CheckoutDelivery,
  paymentMethod: PaymentMethod,
  totals: CheckoutPayload["totals"]
): CheckoutPayload {
  return {
    customer: {
      fullName: customer.fullName.trim(),
      email: customer.email.trim(),
      phone: customer.phone.trim(),
    },
    delivery: {
      address: delivery.address.trim(),
      apartment: delivery.apartment.trim(),
      city: delivery.city.trim(),
      emirate: delivery.emirate,
      country: delivery.country.trim(),
    },
    paymentMethod,
    items: items.map((item) => ({
      id: item.id,
      name: item.name,
      collection: item.collection,
      category: item.category,
      quantity: item.quantity,
      price: item.price,
    })),
    totals,
  };
}
