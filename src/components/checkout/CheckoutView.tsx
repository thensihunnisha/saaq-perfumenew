"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShoppingBag } from "lucide-react";
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
  buildPlaceOrderPayload,
  CHECKOUT_COUNTRY,
  UAE_EMIRATES,
  validateCheckout,
  type CheckoutCustomer,
  type CheckoutDelivery,
} from "@/lib/checkout";
import { getOrderTotals } from "@/lib/orderTotals";
import TakeOffOfferNote from "@/components/cart/TakeOffOfferNote";
import {
  getTakeOffLine,
  isTakeOffCollection,
} from "@/lib/takeOffPromotion";

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

export default function CheckoutView() {
  const router = useRouter();
  const { items, itemCount, isReady, clearCart } = useCart();
  const totals = getOrderTotals(items);

  const [customer, setCustomer] = useState(emptyCustomer);
  const [delivery, setDelivery] = useState(emptyDelivery);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handlePlaceOrder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateCheckout(customer, delivery, items.length);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0 || items.length === 0) {
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(
          buildPlaceOrderPayload(items, customer, delivery)
        ),
      });
      const payload = (await response.json().catch(() => null)) as {
        success?: boolean;
        orderId?: number | string;
        message?: string;
      } | null;

      if (!response.ok || !payload?.orderId) {
        setErrors({
          cart: payload?.message || "Unable to place order.",
        });
        return;
      }

      clearCart();
      router.push(`/order-success/${payload.orderId}`);
    } catch {
      setErrors({
        cart: "Unable to place order.",
      });
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
            Your cart is empty.
          </DisplayHeading>
          <Body className="mx-auto mt-5 max-w-sm">
            Add a fragrance before placing an order.
          </Body>
          <ButtonLink href="/shop" className="mt-10 w-full text-center sm:w-auto">
            Continue Shopping
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="saaq-page bg-saaq-black text-saaq-ivory">
      <section className="border-b border-white/10">
        <div className="saaq-container py-12 sm:py-16">
          <Eyebrow>Checkout</Eyebrow>
          <DisplayHeading as="h1" className="mt-5 saaq-h1">
            Checkout
          </DisplayHeading>
          <Body className="mt-5 max-w-xl">
            Enter your delivery details to place your SAAQ order. Payment will
            be arranged separately.
          </Body>
        </div>
      </section>

      <div className="saaq-container py-12 lg:py-16">
        <div className="grid min-w-0 gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)] lg:gap-16">
          <form onSubmit={handlePlaceOrder} className="space-y-14" noValidate>
            <section>
              <Eyebrow>Customer information</Eyebrow>
              <h2 className="saaq-h2 mt-4">How we reach you</h2>
              <div className="mt-8 grid gap-5">
                <Field
                  label="Full Name"
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
              <Eyebrow>Delivery</Eyebrow>
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
                    {errors.emirate ? (
                      <p className="mt-2 font-sans text-[11px] text-red-300">
                        {errors.emirate}
                      </p>
                    ) : null}
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

            {errors.cart ? (
              <p className="font-sans text-xs text-red-300">{errors.cart}</p>
            ) : null}

            <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={submitting}>
              {submitting ? "Placing order…" : "Place Order"}
            </Button>
          </form>

          <aside className="h-fit border border-saaq-gold/20 bg-saaq-void lg:sticky lg:top-28">
            <div className="border-b border-white/10 px-6 py-6 sm:px-8">
              <Eyebrow>Order summary</Eyebrow>
              <h2 className="saaq-h3 mt-3">Your selection</h2>
            </div>

            <ul className="px-6 sm:px-8">
              {items.map((item) => {
                const takeOffLine = getTakeOffLine(totals.promotion, item.id);
                const lineTotal = takeOffLine
                  ? takeOffLine.payableLineTotal
                  : item.price * item.quantity;

                return (
                <li
                  key={item.id}
                  className="flex gap-4 border-b border-white/10 py-5 last:border-0"
                >
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-saaq-charcoal">
                    {item.image?.startsWith("/") ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-lg">{item.name}</p>
                    <div className="mt-2 space-y-1 font-sans text-xs text-saaq-ivory/55">
                      <div className="flex justify-between">
                        <span>Unit price</span>
                        <span>AED {item.price.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Quantity</span>
                        <span>{item.quantity}</span>
                      </div>
                      {takeOffLine && takeOffLine.freeQuantity > 0 ? (
                        <div className="flex justify-between text-saaq-gold">
                          <span>Take Off offer</span>
                          <span>
                            {takeOffLine.freeQuantity === item.quantity
                              ? "FREE"
                              : `${takeOffLine.freeQuantity} FREE`}
                          </span>
                        </div>
                      ) : null}
                      <div className="flex justify-between text-saaq-ivory/80">
                        <span>Line total</span>
                        <span>
                          {isTakeOffCollection(item.collection) &&
                          takeOffLine &&
                          takeOffLine.freeQuantity === item.quantity
                            ? "FREE"
                            : `AED ${lineTotal.toFixed(2)}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
                );
              })}
            </ul>

            <div className="space-y-3 border-t border-white/10 px-6 py-6 font-sans text-sm sm:px-8">
              <TakeOffOfferNote promotion={totals.promotion} compact />
              {totals.promotion.takeOffQuantity > 0 ? (
                <>
                  <SummaryRow
                    label="Take Off original"
                    value={`AED ${totals.promotion.originalTakeOffSubtotal.toFixed(2)}`}
                  />
                  {totals.promotion.takeOffDiscount > 0 ? (
                    <SummaryRow
                      label="Take Off offer"
                      value={`- AED ${totals.promotion.takeOffDiscount.toFixed(2)}`}
                      gold
                    />
                  ) : null}
                  <SummaryRow
                    label="Take Off subtotal"
                    value={`AED ${totals.promotion.finalTakeOffSubtotal.toFixed(2)}`}
                  />
                  {totals.promotion.otherSubtotal > 0 ? (
                    <SummaryRow
                      label="Other items"
                      value={`AED ${totals.promotion.otherSubtotal.toFixed(2)}`}
                    />
                  ) : null}
                </>
              ) : null}
              <SummaryRow
                label="Subtotal"
                value={`AED ${totals.subtotal.toFixed(2)}`}
              />
              <SummaryRow
                label="Delivery charge"
                value={
                  totals.shipping === 0
                    ? "Free"
                    : `AED ${totals.shipping.toFixed(2)}`
                }
                gold={totals.shipping === 0}
              />
              <div className="flex flex-wrap items-end justify-between gap-3 border-t border-white/10 pt-4">
                <span className="font-display text-xl">Grand total</span>
                <span className="font-display text-2xl text-saaq-gold">
                  AED {totals.total.toFixed(2)}
                </span>
              </div>
              <p className="saaq-meta pt-2">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </p>
              <p className="saaq-meta">
                Final prices are confirmed from the SAAQ catalog when you place
                the order.
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
    <div className="flex justify-between gap-4 text-saaq-ivory/60">
      <span className="min-w-0">{label}</span>
      <span className={cn("shrink-0", gold && "text-saaq-gold")}>{value}</span>
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
