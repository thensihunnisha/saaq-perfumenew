import type { CheckoutPayload } from "@/lib/checkout";
import type { PaymentProvider, PaymentSession } from "@/lib/payments/types";

export const GATEWAY_PLACEHOLDER_MESSAGE =
  "Secure payment gateway will be connected soon.";

export const placeholderPaymentProvider: PaymentProvider = {
  id: "placeholder",
  async startCheckout(payload: CheckoutPayload): Promise<PaymentSession> {
    if (payload.paymentMethod === "cod") {
      return {
        kind: "cod",
        reference: `SAAQ-${Date.now()}`,
      };
    }

    return {
      kind: "placeholder",
      message: GATEWAY_PLACEHOLDER_MESSAGE,
    };
  },
};
