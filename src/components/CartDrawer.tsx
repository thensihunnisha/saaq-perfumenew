"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import WhatsAppButton from "@/components/WhatsAppButton";
import TakeOffOfferNote from "@/components/cart/TakeOffOfferNote";
import { toWhatsAppOrderItems, formatCollectionLabel } from "@/lib/whatsapp";
import { getOrderTotals } from "@/lib/orderTotals";
import {
  getTakeOffLine,
  isTakeOffCollection,
} from "@/lib/takeOffPromotion";

export default function CartDrawer() {
  const {
    items: storedItems,
    itemCount: storedCount,
    isReady,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
  } = useCart();
  const items = isReady ? storedItems : [];
  const itemCount = isReady ? storedCount : 0;

  const { subtotal, promotion } = getOrderTotals(items);

  return (
    <>
      <button
        type="button"
        aria-hidden={!isDrawerOpen}
        tabIndex={isDrawerOpen ? 0 : -1}
        onClick={closeDrawer}
        className={`fixed inset-0 z-[80] bg-black/60 saaq-transition ${
          isDrawerOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        aria-label="Shopping bag"
        className={`fixed right-0 top-0 z-[90] flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#080808] text-white shadow-[-20px_0_50px_rgba(0,0,0,0.45)] saaq-transition ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-5 sm:px-6">
          <div>
            <p className="font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.3em] text-[#d4af37]">
              SAAQ PERFUME
            </p>
            <h2 className="mt-1 font-['Playfair_Display',serif] text-2xl">
              Your Bag
            </h2>
            <p className="mt-1 font-['Inter',sans-serif] text-[10px] uppercase tracking-[0.2em] text-white/40">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>
          </div>

          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close bag"
            className="flex h-10 w-10 items-center justify-center text-white/70 transition-colors hover:text-[#d4af37]"
          >
            <X size={20} strokeWidth={1.4} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag
                size={28}
                strokeWidth={1.2}
                className="text-white/25"
              />
              <p className="mt-4 font-['Playfair_Display',serif] text-xl">
                Your bag is empty
              </p>
              <Link
                href="/collection"
                onClick={closeDrawer}
                className="mt-6 border border-[#d4af37] px-6 py-3 font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.25em] text-[#d4af37]"
              >
                Discover Fragrances
              </Link>
            </div>
          ) : (
            <ul className="space-y-5">
              {items.map((item) => {
                const takeOffLine = getTakeOffLine(promotion, item.id);

                return (
                <li
                  key={item.id}
                  className="flex gap-4 border-b border-white/10 pb-5"
                >
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-[#111]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-['Inter',sans-serif] text-[8px] uppercase tracking-[0.2em] text-[#d4af37]">
                      {formatCollectionLabel(item.collection)}
                    </p>
                    <h3 className="truncate font-['Playfair_Display',serif] text-base">
                      {item.name}
                    </h3>
                    <p className="mt-1 font-['Inter',sans-serif] text-xs text-white/60">
                      AED {item.price.toFixed(2)}
                      {takeOffLine && takeOffLine.freeQuantity > 0 ? (
                        <span className="ml-2 uppercase tracking-[0.18em] text-[#d4af37]">
                          {takeOffLine.freeQuantity === item.quantity
                            ? "FREE"
                            : `${takeOffLine.freeQuantity} FREE`}
                        </span>
                      ) : null}
                    </p>
                    {isTakeOffCollection(item.collection) && takeOffLine ? (
                      <p className="mt-1 font-['Inter',sans-serif] text-[10px] text-[#d4af37]">
                        {takeOffLine.freeQuantity === item.quantity
                          ? "FREE"
                          : `AED ${takeOffLine.payableLineTotal.toFixed(2)}`}
                      </p>
                    ) : null}

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center border border-white/20">
                        <button
                          type="button"
                          aria-label={`Decrease ${item.name}`}
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-2 text-white/70 hover:text-white"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-7 text-center font-['Inter',sans-serif] text-xs">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase ${item.name}`}
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-2 text-white/70 hover:text-white"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        type="button"
                        aria-label={`Remove ${item.name}`}
                        onClick={() => removeItem(item.id)}
                        className="text-white/40 hover:text-red-400"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </li>
                );
              })}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-white/10 px-4 py-6 sm:px-6">
            {promotion.takeOffQuantity > 0 ? (
              <div className="mb-4">
                <TakeOffOfferNote
                  promotion={promotion}
                  compact
                  onNavigate={closeDrawer}
                />
              </div>
            ) : null}
            {promotion.takeOffDiscount > 0 ? (
              <div className="mb-2 flex items-center justify-between font-['Inter',sans-serif] text-xs text-white/50">
                <span>Take Off offer</span>
                <span className="text-[#d4af37]">
                  - AED {promotion.takeOffDiscount.toFixed(2)}
                </span>
              </div>
            ) : null}
            <div className="mb-4 flex items-center justify-between font-['Inter',sans-serif] text-sm">
              <span className="text-white/50">Subtotal</span>
              <span className="text-[#d4af37]">AED {subtotal.toFixed(2)}</span>
            </div>

            <Link
              href="/cart"
              onClick={closeDrawer}
              className="flex w-full items-center justify-center bg-[#d4af37] px-6 py-3 font-['Inter',sans-serif] text-[10px] uppercase tracking-[0.25em] text-black"
            >
              View Cart
            </Link>
            <WhatsAppButton
              className="mt-3"
              items={toWhatsAppOrderItems(items)}
              label="Order via WhatsApp"
            />
          </div>
        )}
      </aside>
    </>
  );
}
