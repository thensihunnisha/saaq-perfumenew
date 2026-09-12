export type PaymentProviderId =
  | "placeholder"
  | "stripe"
  | "checkout.com"
  | "telr"
  | "network-international";

export const ACTIVE_PAYMENT_PROVIDER: PaymentProviderId = "placeholder";
