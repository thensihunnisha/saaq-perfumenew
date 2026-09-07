"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";

type CartItem = {
  id: number;
  name: string;
  collection: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from LocalStorage on client mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("saaq-cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync state to LocalStorage
  const updateLocalStorage = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    localStorage.setItem("saaq-cart", JSON.stringify(updatedCart));
  };

  const handleUpdateQuantity = (id: number, delta: number) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter(Boolean) as CartItem[];

    updateLocalStorage(updatedCart);
  };

  const handleRemoveItem = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    updateLocalStorage(updatedCart);
  };

  const handleClearCart = () => {
    updateLocalStorage([]);
  };

  // Calculations
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryFee = subtotal > 0 ? 0 : 0; // Free delivery across UAE
  const total = subtotal + deliveryFee;

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080808] pt-[114px]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#d4af37] border-t-transparent" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#080808] pt-[114px] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <h1 className="font-['Playfair_Display',serif] text-3xl font-normal tracking-wide sm:text-4xl">
              Shopping Cart
            </h1>
            <p className="mt-1 font-['Inter',sans-serif] text-xs text-white/50">
              {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          {cart.length > 0 && (
            <button
              onClick={handleClearCart}
              className="font-['Inter',sans-serif] text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-red-400 transition-colors"
            >
              Clear Cart
            </button>
          )}
        </div>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* CART ITEMS LIST */}
            <div className="space-y-6 lg:col-span-2">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-white/10 bg-[#111] p-4 transition-colors hover:border-[#d4af37]/40"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative h-20 w-20 flex-shrink-0 bg-[#080808]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-['Inter',sans-serif] text-[8px] uppercase tracking-[0.2em] text-[#d4af37]">
                        {item.collection}
                      </p>
                      <h3 className="font-['Playfair_Display',serif] text-lg text-white">
                        {item.name}
                      </h3>
                      <p className="font-['Inter',sans-serif] text-xs text-white/60">
                        AED {item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-6">
                    {/* QUANTITY CONTROLS */}
                    <div className="flex items-center border border-white/20">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, -1)}
                        className="p-2 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center font-['Inter',sans-serif] text-xs">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, 1)}
                        className="p-2 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* TOTAL & REMOVE */}
                    <div className="text-right">
                      <p className="font-['Inter',sans-serif] text-sm font-medium text-[#d4af37]">
                        AED {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-white/40 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}

              <Link
                href="/shop"
                className="inline-flex items-center gap-2 font-['Inter',sans-serif] text-[10px] uppercase tracking-[0.2em] text-[#d4af37] hover:underline pt-4"
              >
                <ArrowLeft size={12} /> Continue Shopping
              </Link>
            </div>

            {/* ORDER SUMMARY */}
            <div className="h-fit border border-white/10 bg-[#111] p-6">
              <h2 className="border-b border-white/10 pb-4 font-['Playfair_Display',serif] text-xl">
                Order Summary
              </h2>

              <div className="mt-4 space-y-3 font-['Inter',sans-serif] text-xs">
                <div className="flex justify-between text-white/70">
                  <span>Subtotal</span>
                  <span>AED {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Delivery (UAE)</span>
                  <span className="text-[#d4af37]">FREE</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between font-medium text-sm text-white">
                  <span>Total</span>
                  <span className="text-[#d4af37]">AED {total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="button"
                className="mt-6 w-full border border-[#d4af37] bg-[#d4af37] py-3 text-center font-['Inter',sans-serif] text-[10px] uppercase tracking-[0.2em] text-black font-semibold transition-all hover:bg-transparent hover:text-[#d4af37]"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <div className="py-20 text-center">
            <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-white/20" />
            <h2 className="font-['Playfair_Display',serif] text-2xl text-white">
              Your cart is empty
            </h2>
            <p className="mt-2 font-['Inter',sans-serif] text-xs text-white/50">
              Looks like you haven't added any fragrances yet.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-block border border-[#d4af37] px-8 py-3 font-['Inter',sans-serif] text-[10px] uppercase tracking-[0.25em] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all"
            >
              Explore Shop
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}