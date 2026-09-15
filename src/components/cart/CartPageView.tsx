"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Body, ButtonLink, DisplayHeading, Eyebrow } from "@/components/ui";
import { useCart } from "@/context/CartContext";
import { formatCollectionLabel, toWhatsAppOrderItems } from "@/lib/whatsapp";
import { getProductHref } from "@/lib/api";
import { FREE_SHIPPING_THRESHOLD, getOrderTotals } from "@/lib/orderTotals";
import {
  getTakeOffLine,
  isTakeOffCollection,
} from "@/lib/takeOffPromotion";
import TakeOffOfferNote from "@/components/cart/TakeOffOfferNote";
import { cn } from "@/lib/cn";

export default function CartPageView() {
  const {
    items,
    itemCount,
    isReady,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();
  const { subtotal, shipping, total, promotion } = getOrderTotals(items);

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
          <Eyebrow className="mt-8">SAAQ PERFUME</Eyebrow>
          <DisplayHeading as="h1" className="mt-5 saaq-h1">
            Your bag is empty
          </DisplayHeading>
          <Body className="mx-auto mt-5 max-w-sm">
            Begin with a signature fragrance from the SAAQ collection.
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
          <Eyebrow>Your selection</Eyebrow>
          <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <DisplayHeading as="h1" className="saaq-h1">
                Your bag
              </DisplayHeading>
              <p className="saaq-meta mt-4">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </p>
            </div>
            <button
              type="button"
              onClick={clearCart}
              className="saaq-transition self-start font-sans text-[10px] uppercase tracking-[0.28em] text-saaq-ivory/40 hover:text-saaq-gold"
            >
              Clear cart
            </button>
          </div>
        </div>
      </section>

      <section className="saaq-container py-12 lg:py-16">
        <div className="grid min-w-0 gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.8fr)] lg:gap-16">
          <div>
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {items.map((item) => {
                const takeOffLine = getTakeOffLine(promotion, item.id);
                const isTakeOff = isTakeOffCollection(item.collection);
                const originalLineTotal = item.price * item.quantity;
                const lineTotal = takeOffLine
                  ? takeOffLine.payableLineTotal
                  : originalLineTotal;
                const hasDiscount =
                  Boolean(takeOffLine) &&
                  takeOffLine.originalLineTotal - takeOffLine.payableLineTotal >
                    0.009;

                return (
                  <li
                    key={item.id}
                    className="grid gap-6 py-8 sm:grid-cols-[7rem_1fr] sm:items-start lg:grid-cols-[8.5rem_1fr]"
                  >
                    <Link
                      href={getProductHref(item.id)}
                      className="relative aspect-[4/5] overflow-hidden bg-saaq-charcoal"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="140px"
                        className="object-cover"
                      />
                    </Link>

                    <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:justify-between">
                      <div className="min-w-0">
                        <p className="saaq-eyebrow">
                          {formatCollectionLabel(item.collection)}
                        </p>
                        <Link href={getProductHref(item.id)}>
                          <h2 className="saaq-transition mt-2 font-display text-2xl text-saaq-ivory hover:text-saaq-gold">
                            {item.name}
                          </h2>
                        </Link>
                        <p className="saaq-meta mt-2">{item.category}</p>
                        <p className="mt-3 font-sans text-sm tracking-[0.08em] text-saaq-ivory/70">
                          AED {item.price.toFixed(2)}
                          {takeOffLine && takeOffLine.freeQuantity > 0 ? (
                            <span className="ml-3 text-[10px] uppercase tracking-[0.22em] text-saaq-gold">
                              {takeOffLine.freeQuantity === item.quantity
                                ? "FREE"
                                : `${takeOffLine.freeQuantity} FREE`}
                            </span>
                          ) : null}
                        </p>
                        {isTakeOff ? (
                          <p className="saaq-meta mt-2 text-saaq-gold/80">
                            Take Off offer
                          </p>
                        ) : null}
                      </div>

                      <div className="flex shrink-0 flex-col gap-4 sm:items-end">
                        <div className="inline-flex items-center border border-white/15">
                          <button
                            type="button"
                            aria-label={`Decrease ${item.name}`}
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="saaq-transition flex h-10 w-10 items-center justify-center text-saaq-ivory/70 hover:text-saaq-gold"
                          >
                            <Minus size={13} strokeWidth={1.4} />
                          </button>
                          <span className="min-w-8 text-center font-sans text-xs tracking-[0.2em]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label={`Increase ${item.name}`}
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="saaq-transition flex h-10 w-10 items-center justify-center text-saaq-ivory/70 hover:text-saaq-gold"
                          >
                            <Plus size={13} strokeWidth={1.4} />
                          </button>
                        </div>

                        <p className="font-sans text-sm tracking-[0.08em] text-saaq-gold">
                          {takeOffLine &&
                          takeOffLine.freeQuantity === item.quantity ? (
                            "FREE"
                          ) : (
                            <>
                              {hasDiscount ? (
                                <span className="mr-2 text-saaq-ivory/30 line-through">
                                  AED {originalLineTotal.toFixed(2)}
                                </span>
                              ) : null}
                              AED {lineTotal.toFixed(2)}
                            </>
                          )}
                        </p>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="saaq-transition inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.22em] text-saaq-ivory/40 hover:text-saaq-gold"
                        >
                          <Trash2 size={13} strokeWidth={1.4} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <ButtonLink
              href="/collection"
              variant="ghost"
              className="mt-8"
            >
              Continue shopping
            </ButtonLink>
          </div>

          <aside className="h-fit border border-saaq-gold/20 bg-saaq-void lg:sticky lg:top-28">
            <div className="border-b border-white/10 px-6 py-6 sm:px-8">
              <Eyebrow>Order summary</Eyebrow>
              <h2 className="saaq-h3 mt-3">Checkout</h2>
            </div>

            <div className="space-y-4 px-6 py-6 font-sans text-sm sm:px-8">
              <TakeOffOfferNote promotion={promotion} />
              {promotion.takeOffQuantity > 0 ? (
                <>
                  <div className="flex justify-between text-saaq-ivory/60">
                    <span>Take Off original</span>
                    <span>AED {promotion.originalTakeOffSubtotal.toFixed(2)}</span>
                  </div>
                  {promotion.takeOffDiscount > 0 ? (
                    <div className="flex justify-between text-saaq-gold">
                      <span>Take Off offer</span>
                      <span>- AED {promotion.takeOffDiscount.toFixed(2)}</span>
                    </div>
                  ) : null}
                  <div className="flex justify-between text-saaq-ivory/80">
                    <span>Take Off subtotal</span>
                    <span>AED {promotion.finalTakeOffSubtotal.toFixed(2)}</span>
                  </div>
                  {promotion.otherSubtotal > 0 ? (
                    <div className="flex justify-between text-saaq-ivory/60">
                      <span>Other items</span>
                      <span>AED {promotion.otherSubtotal.toFixed(2)}</span>
                    </div>
                  ) : null}
                </>
              ) : null}
              <div className="flex justify-between text-saaq-ivory/60">
                <span>Subtotal</span>
                <span>AED {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-saaq-ivory/60">
                <span>Shipping</span>
                <span className={cn(shipping === 0 && "text-saaq-gold")}>
                  {shipping === 0 ? "Complimentary" : `AED ${shipping.toFixed(2)}`}
                </span>
              </div>
              {shipping > 0 ? (
                <p className="saaq-meta">
                  Complimentary shipping from AED {FREE_SHIPPING_THRESHOLD}
                </p>
              ) : null}
              <div className="saaq-rule w-full max-w-none" />
              <div className="flex items-end justify-between">
                <span className="font-display text-xl">Total</span>
                <span className="font-display text-2xl text-saaq-gold">
                  AED {total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="space-y-6 border-t border-white/10 px-6 py-7 sm:px-8">
              <div>
                <p className="saaq-eyebrow">Option 1</p>
                <p className="mt-2 font-sans text-xs leading-6 text-saaq-ivory/50">
                  Send this bag to SAAQ on WhatsApp to confirm availability and
                  delivery. Payment details are never sent here.
                </p>
                <WhatsAppButton
                  className="mt-4"
                  items={toWhatsAppOrderItems(items)}
                  label="Order via WhatsApp"
                />
              </div>

              <div>
                <p className="saaq-eyebrow">Option 2</p>
                <p className="mt-2 font-sans text-xs leading-6 text-saaq-ivory/50">
                  Continue to checkout. Card payment will be connected through a
                  secure gateway later.
                </p>
                <ButtonLink href="/checkout" className="mt-4 w-full">
                  Proceed to Checkout
                </ButtonLink>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
