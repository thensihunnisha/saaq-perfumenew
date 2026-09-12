import { ACTIVE_PAYMENT_PROVIDER } from "@/config/payments";
import { placeholderPaymentProvider } from "@/lib/payments/placeholder";
import type { PaymentProvider } from "@/lib/payments/types";

export function getPaymentProvider(): PaymentProvider {
  switch (ACTIVE_PAYMENT_PROVIDER) {
    case "stripe":
    case "checkout.com":
    case "telr":
    case "network-international":
      return placeholderPaymentProvider;
    default:
      return placeholderPaymentProvider;
  }
}

export { GATEWAY_PLACEHOLDER_MESSAGE } from "@/lib/payments/placeholder";
