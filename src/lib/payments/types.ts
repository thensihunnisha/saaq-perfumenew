import type { CheckoutPayload } from "@/lib/checkout";

export type PaymentSession =
  | {
      kind: "placeholder";
      message: string;
    }
  | {
      kind: "redirect";
      url: string;
    }
  | {
      kind: "cod";
      reference: string;
    };

export type PaymentProvider = {
  id: string;
  startCheckout: (payload: CheckoutPayload) => Promise<PaymentSession>;
};
