"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { ArrowLeft, Lock, ShoppingBag } from "lucide-react";
import {
  Body,
  Button,
  ButtonLink,
  DisplayHeading,
  Eyebrow,
} from "@/components/ui";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/cn";
import {
  buildCheckoutPayload,
  CHECKOUT_COUNTRY,
  UAE_EMIRATES,
  validateCheckout,
  type CheckoutCustomer,
  type CheckoutDelivery,
  type PaymentMethod,
} from "@/lib/checkout";
import { FREE_SHIPPING_THRESHOLD, getOrderTotals } from "@/lib/orderTotals";
import { GATEWAY_PLACEHOLDER_MESSAGE, getPaymentProvider } from "@/lib/payments";
import type { PaymentSession } from "@/lib/payments/types";
import { formatCollectionLabel } from "@/lib/whatsapp";

const emptyCustomer: CheckoutCustomer = {
  fullName: "",
  email: "",
  phone: "",
};

const emptyDelivery: CheckoutDelivery = {
  address: "",
  apartment: "",
  city: "",
  emirate: "Dubai",
  country: CHECKOUT_COUNTRY,
};

const PAYMENT_OPTIONS: Array<{
  value: PaymentMethod;
  title: string;
  description: string;
}> = [
  {
    value: "card",
    title: "Card payment",
    description: "Visa, Mastercard and other cards via a secure gateway",
  },
  {
    value: "cod",
    title: "Cash on delivery",
    description: "Pay when your fragrance arrives",
  },
  {
    value: "online",
    title: "Online payment",
    description: "Apple Pay, Google Pay or a hosted payment page",
  },
];

export default function CheckoutView() {
  const { items, itemCount, isReady } = useCart();
  const totals = getOrderTotals(items);

  const [customer, setCustomer] = useState(emptyCustomer);
  const [delivery, setDelivery] = useState(emptyDelivery);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState<"form" | "review">("form");
  const [submitting, setSubmitting] = useState(false);
  const [session, setSession] = useState<PaymentSession | null>(null);

  const usesGateway =
    paymentMethod === "card" || paymentMethod === "online";

  const handleReview = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSession(null);

    const nextErrors = validateCheckout(customer, delivery, items.length);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setStep("review");
  };

  const handleConfirm = async () => {
    const nextErrors = validateCheckout(customer, delivery, items.length);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0 || items.length === 0) {
      setStep("form");
      return;
    }

    setSubmitting(true);

    try {
      const payload = buildCheckoutPayload(
        items,
        customer,
        delivery,
        paymentMethod,
        totals
      );
      const nextSession = await getPaymentProvider().startCheckout(payload);
      setSession(nextSession);
    } catch (error) {
      setErrors({
        cart:
          error instanceof Error ? error.message : "Checkout could not continue.",
      });
      setStep("form");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isReady) {
    return (
      <div className="saaq-page flex min-h-[70vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border border-saaq-gold border-t-transparent" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="saaq-page flex min-h-[80vh] items-center justify-center px-6">
        <div className="max-w-lg text-center">
          <ShoppingBag
            size={28}
            strokeWidth={1.2}
            className="mx-auto text-saaq-gold/70"
          />
          <Eyebrow className="mt-8">Checkout</Eyebrow>
          <DisplayHeading as="h1" className="mt-5 saaq-h1">
            Your bag is empty
          </DisplayHeading>
          <Body className="mx-auto mt-5 max-w-sm">
            Checkout is unavailable until a fragrance is in your bag.
          </Body>
          <ButtonLink href="/collection" className="mt-10">
            Discover SAAQ collection
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="saaq-page bg-saaq-black text-saaq-ivory">
      <section className="border-b border-white/10">
        <div className="saaq-container py-12 sm:py-16">
          <Eyebrow>{step === "review" ? "Order review" : "Checkout"}</Eyebrow>
          <DisplayHeading as="h1" className="mt-5 saaq-h1">
            {step === "review" ? "Review your order" : "Checkout"}
          </DisplayHeading>
          <Body className="mt-5 max-w-xl">
            {step === "review"
              ? "Confirm contact, delivery, and payment. Card details are never entered or stored on SAAQ."
              : "A frontend checkout ready for Stripe, Checkout.com, Telr, or Network International — without collecting card numbers."}
          </Body>
        </div>
      </section>

      <div className="saaq-container py-12 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] lg:gap-16">
          {step === "form" ? (
            <form onSubmit={handleReview} className="space-y-14" noValidate>
              <section>
                <Eyebrow>Contact information</Eyebrow>
                <h2 className="saaq-h2 mt-4">How we reach you</h2>
                <div className="mt-8 grid gap-5">
                  <Field
                    label="Full name"
                    name="fullName"
                    autoComplete="name"
                    value={customer.fullName}
                    error={errors.fullName}
                    onChange={(value) =>
                      setCustomer((current) => ({ ...current, fullName: value }))
                    }
                  />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={customer.email}
                      error={errors.email}
                      onChange={(value) =>
                        setCustomer((current) => ({ ...current, email: value }))
                      }
                    />
                    <Field
                      label="Phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+971 5X XXX XXXX"
                      value={customer.phone}
                      error={errors.phone}
                      onChange={(value) =>
                        setCustomer((current) => ({ ...current, phone: value }))
                      }
                    />
                  </div>
                </div>
              </section>

              <section>
                <Eyebrow>Delivery address</Eyebrow>
                <h2 className="saaq-h2 mt-4">Where it should arrive</h2>
                <div className="mt-8 space-y-5">
                  <Field
                    label="Address"
                    name="address"
                    autoComplete="street-address"
                    placeholder="Building / street / area"
                    value={delivery.address}
                    error={errors.address}
                    onChange={(value) =>
                      setDelivery((current) => ({ ...current, address: value }))
                    }
                  />
                  <Field
                    label="Apartment / villa"
                    name="apartment"
                    value={delivery.apartment}
                    onChange={(value) =>
                      setDelivery((current) => ({
                        ...current,
                        apartment: value,
                      }))
                    }
                  />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="City"
                      name="city"
                      autoComplete="address-level2"
                      value={delivery.city}
                      error={errors.city}
                      onChange={(value) =>
                        setDelivery((current) => ({ ...current, city: value }))
                      }
                    />
                    <div>
                      <label
                        htmlFor="emirate"
                        className="mb-2 block font-sans text-[9px] uppercase tracking-[0.2em] text-saaq-ivory/50"
                      >
                        Emirate
                      </label>
                      <select
                        id="emirate"
                        name="emirate"
                        value={delivery.emirate}
                        onChange={(event) =>
                          setDelivery((current) => ({
                            ...current,
                            emirate: event.target.value,
                          }))
                        }
                        className="h-12 w-full appearance-none border border-white/15 bg-saaq-void px-4 font-sans text-xs text-saaq-ivory outline-none saaq-transition focus:border-saaq-gold"
                      >
                        {UAE_EMIRATES.map((emirate) => (
                          <option key={emirate} value={emirate}>
                            {emirate}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <Field
                    label="Country"
                    name="country"
                    autoComplete="country-name"
                    value={delivery.country}
                    error={errors.country}
                    onChange={(value) =>
                      setDelivery((current) => ({
                        ...current,
                        country: value,
                      }))
                    }
                  />
                </div>
              </section>

              <section>
                <Eyebrow>Payment method</Eyebrow>
                <h2 className="saaq-h2 mt-4">How you will pay</h2>
                <div className="mt-8 space-y-3">
                  {PAYMENT_OPTIONS.map((option) => (
                    <PaymentChoice
                      key={option.value}
                      selected={paymentMethod === option.value}
                      title={option.title}
                      description={option.description}
                      onSelect={() => setPaymentMethod(option.value)}
                    />
                  ))}
                </div>
                {usesGateway ? (
                  <div className="mt-5 flex gap-3 border border-saaq-gold/25 bg-saaq-gold/5 p-5">
                    <Lock
                      size={15}
                      strokeWidth={1.3}
                      className="mt-0.5 shrink-0 text-saaq-gold"
                    />
                    <p className="font-sans text-sm leading-6 text-saaq-ivory/75">
                      {GATEWAY_PLACEHOLDER_MESSAGE}
                    </p>
                  </div>
                ) : (
                  <p className="mt-5 font-sans text-xs leading-6 text-saaq-ivory/50">
                    Cash on delivery is confirmed with your order. No card
                    information is collected.
                  </p>
                )}
              </section>

              {errors.cart ? (
                <p className="font-sans text-xs text-red-300">{errors.cart}</p>
              ) : null}

              <Button type="submit" size="lg">
                Review order
              </Button>
            </form>
          ) : (
            <OrderReview
              customer={customer}
              delivery={delivery}
              paymentMethod={paymentMethod}
              usesGateway={usesGateway}
              session={session}
              submitting={submitting}
              onBack={() => {
                setSession(null);
                setStep("form");
              }}
              onConfirm={handleConfirm}
            />
          )}

          <aside className="h-fit border border-saaq-gold/20 bg-saaq-void lg:sticky lg:top-28">
            <div className="border-b border-white/10 px-6 py-6 sm:px-8">
              <Eyebrow>Order summary</Eyebrow>
              <h2 className="saaq-h3 mt-3">Your selection</h2>
            </div>

            <ul className="px-6 sm:px-8">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-4 border-b border-white/10 py-5 last:border-0"
                >
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-saaq-charcoal">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-lg">{item.name}</p>
                    <p className="saaq-meta mt-1">
                      {formatCollectionLabel(item.collection)}
                    </p>
                    <div className="mt-2 flex justify-between font-sans text-xs text-saaq-ivory/55">
                      <span>Qty {item.quantity}</span>
                      <span>AED {item.price.toFixed(2)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="space-y-3 border-t border-white/10 px-6 py-6 font-sans text-sm sm:px-8">
              <SummaryRow
                label="Subtotal"
                value={`AED ${totals.subtotal.toFixed(2)}`}
              />
              <SummaryRow
                label="Shipping"
                value={
                  totals.shipping === 0
                    ? "Complimentary"
                    : `AED ${totals.shipping.toFixed(2)}`
                }
                gold={totals.shipping === 0}
              />
              {totals.shipping > 0 ? (
                <p className="saaq-meta">
                  Complimentary from AED {FREE_SHIPPING_THRESHOLD}
                </p>
              ) : null}
              <div className="flex items-end justify-between border-t border-white/10 pt-4">
                <span className="font-display text-xl">Total</span>
                <span className="font-display text-2xl text-saaq-gold">
                  AED {totals.total.toFixed(2)}
                </span>
              </div>
              <p className="saaq-meta pt-2">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </p>
              <ButtonLink href="/cart" variant="ghost" className="mt-4 w-full gap-2">
                <ArrowLeft size={13} strokeWidth={1.4} />
                Return to bag
              </ButtonLink>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function OrderReview({
  customer,
  delivery,
  paymentMethod,
  usesGateway,
  session,
  submitting,
  onBack,
  onConfirm,
}: {
  customer: CheckoutCustomer;
  delivery: CheckoutDelivery;
  paymentMethod: PaymentMethod;
  usesGateway: boolean;
  session: PaymentSession | null;
  submitting: boolean;
  onBack: () => void;
  onConfirm: () => void;
}) {
  const methodLabel =
    paymentMethod === "cod"
      ? "Cash on delivery"
      : paymentMethod === "online"
        ? "Online payment"
        : "Card payment";

  return (
    <div className="space-y-10">
      <section className="border border-white/10 bg-saaq-void p-6 sm:p-8">
        <Eyebrow>Contact</Eyebrow>
        <p className="mt-4 font-display text-2xl">{customer.fullName}</p>
        <p className="mt-3 font-sans text-sm text-saaq-ivory/60">{customer.email}</p>
        <p className="mt-1 font-sans text-sm text-saaq-ivory/60">{customer.phone}</p>
      </section>

      <section className="border border-white/10 bg-saaq-void p-6 sm:p-8">
        <Eyebrow>Delivery</Eyebrow>
        <p className="mt-4 font-sans text-sm leading-7 text-saaq-ivory/75">
          {delivery.address}
          {delivery.apartment ? `, ${delivery.apartment}` : ""}
          <br />
          {delivery.city}, {delivery.emirate}
          <br />
          {delivery.country}
        </p>
      </section>

      <section className="border border-white/10 bg-saaq-void p-6 sm:p-8">
        <Eyebrow>Payment</Eyebrow>
        <p className="mt-4 font-display text-2xl">{methodLabel}</p>
        {usesGateway ? (
          <p className="mt-4 font-sans text-sm leading-6 text-saaq-gold">
            {GATEWAY_PLACEHOLDER_MESSAGE}
          </p>
        ) : (
          <p className="mt-4 font-sans text-sm leading-6 text-saaq-ivory/55">
            You will pay in cash when the order is delivered.
          </p>
        )}
      </section>

      {session?.kind === "placeholder" ? (
        <div className="border border-saaq-gold/30 bg-saaq-gold/5 px-6 py-5">
          <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-saaq-gold">
            Payment provider
          </p>
          <p className="mt-3 font-sans text-sm leading-6 text-saaq-ivory/75">
            {session.message}
          </p>
        </div>
      ) : null}

      {session?.kind === "cod" ? (
        <div className="border border-saaq-gold/30 bg-saaq-gold/5 px-6 py-5">
          <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-saaq-gold">
            Order reviewed
          </p>
          <p className="mt-3 font-sans text-sm leading-6 text-saaq-ivory/75">
            Reference {session.reference}. Connect fulfilment to confirm this
            cash-on-delivery order. No payment card was stored.
          </p>
        </div>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          size="lg"
          onClick={onConfirm}
          disabled={submitting || session !== null}
        >
          {submitting ? "Preparing…" : "Confirm order"}
        </Button>
        <Button type="button" variant="outline" size="lg" onClick={onBack}>
          Edit details
        </Button>
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  gold,
}: {
  label: string;
  value: string;
  gold?: boolean;
}) {
  return (
    <div className="flex justify-between text-saaq-ivory/60">
      <span>{label}</span>
      <span className={cn(gold && "text-saaq-gold")}>{value}</span>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
  autoComplete,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block font-sans text-[9px] uppercase tracking-[0.2em] text-saaq-ivory/50"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "h-12 w-full border bg-saaq-void px-4 font-sans text-xs text-saaq-ivory outline-none placeholder:text-saaq-ivory/20 saaq-transition",
          error ? "border-red-400/60" : "border-white/15 focus:border-saaq-gold"
        )}
      />
      {error ? (
        <p className="mt-2 font-sans text-[11px] text-red-300">{error}</p>
      ) : null}
    </div>
  );
}

function PaymentChoice({
  selected,
  title,
  description,
  onSelect,
}: {
  selected: boolean;
  title: string;
  description: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-4 border p-5 text-left saaq-transition",
        selected
          ? "border-saaq-gold bg-saaq-gold/5"
          : "border-white/10 bg-saaq-void hover:border-white/25"
      )}
    >
      <span
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
          selected ? "border-saaq-gold" : "border-white/30"
        )}
      >
        {selected ? (
          <span className="h-2.5 w-2.5 rounded-full bg-saaq-gold" />
        ) : null}
      </span>
      <span>
        <span className="block font-sans text-[10px] uppercase tracking-[0.18em] text-saaq-ivory">
          {title}
        </span>
        <span className="mt-1 block font-sans text-[11px] text-saaq-ivory/40">
          {description}
        </span>
      </span>
    </button>
  );
}
