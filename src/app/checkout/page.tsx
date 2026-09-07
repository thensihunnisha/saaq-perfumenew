
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Lock, ShoppingBag, Check } from "lucide-react";

type CartProduct = {
  id: number;
  name: string;
  collection: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
};

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [mounted, setMounted] = useState(false);

  const [paymentMethod, setPaymentMethod] =
    useState("cod");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    emirate: "Dubai",
    postalCode: "",
  });

  useEffect(() => {
    setMounted(true);

    const savedCart = JSON.parse(
      localStorage.getItem("saaq-cart") || "[]"
    );

    setCart(savedCart);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal === 0 || subtotal >= 300 ? 0 : 25;

  const total = subtotal + shipping;

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.emirate
    ) {
      alert("Please complete all required delivery details.");
      return;
    }

    /*
      PAYMENT INTEGRATION GOES HERE.

      Example future flow:

      1. Send customer + cart data to your backend.
      2. Create the order.
      3. Create a payment session with your payment gateway.
      4. Redirect the customer to the secure payment page.
    */

    if (paymentMethod === "cod") {
      alert(
        "Order details are ready. Connect your backend here to create the order."
      );
    } else {
      alert(
        "Connect your secure payment gateway here."
      );
    }
  };

  if (!mounted) {
    return (
      <main className="min-h-screen bg-[#080808] pt-[114px] text-white">
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border border-[#d4af37] border-t-transparent" />
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#080808] pt-[114px] text-white">
        <section className="flex min-h-[75vh] items-center justify-center px-6">
          <div className="max-w-lg text-center">
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-[#d4af37]/30 bg-[#111]">
              <ShoppingBag
                size={26}
                strokeWidth={1}
                className="text-[#d4af37]"
              />
            </div>

            <p className="mb-3 font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.4em] text-[#d4af37]">
              SAAQ PERFUME
            </p>

            <h1 className="font-['Playfair_Display',serif] text-4xl">
              Your cart is empty
            </h1>

            <p className="mt-4 font-['Inter',sans-serif] text-xs leading-6 text-white/40">
              Add a fragrance to your collection before
              proceeding to checkout.
            </p>

            <Link
              href="/shop"
              className="mt-8 inline-flex border border-[#d4af37] px-8 py-4 font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.3em] text-[#d4af37] transition-all duration-300 hover:bg-[#d4af37] hover:text-black"
            >
              Discover Fragrances
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080808] pt-[114px] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08),transparent_55%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-14 text-center sm:py-16">
          <p className="mb-4 font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.45em] text-[#d4af37]">
            SAAQ PERFUME
          </p>

          <h1 className="font-['Playfair_Display',serif] text-4xl sm:text-5xl">
            Checkout
          </h1>

          <p className="mx-auto mt-4 max-w-lg font-['Inter',sans-serif] text-xs leading-6 text-white/50">
            Complete your details and prepare to experience
            the art of signature fragrance.
          </p>
        </div>
      </section>

      {/* CHECKOUT */}
      <form
        onSubmit={handlePlaceOrder}
        className="mx-auto max-w-7xl px-6 py-12 lg:py-16"
      >
        <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
          {/* LEFT SIDE */}
          <div className="space-y-12">
            {/* CUSTOMER DETAILS */}
            <section>
              <div className="mb-7">
                <p className="mb-2 font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.35em] text-[#d4af37]">
                  01 · CUSTOMER
                </p>

                <h2 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl">
                  Customer Details
                </h2>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <LuxuryInput
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />

                <LuxuryInput
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />

                <LuxuryInput
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />

                <LuxuryInput
                  label="Mobile Number"
                  name="phone"
                  type="tel"
                  placeholder="+971 5X XXX XXXX"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </section>

            {/* DELIVERY ADDRESS */}
            <section>
              <div className="mb-7">
                <p className="mb-2 font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.35em] text-[#d4af37]">
                  02 · DELIVERY
                </p>

                <h2 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl">
                  UAE Delivery Address
                </h2>
              </div>

              <div className="space-y-5">
                <LuxuryInput
                  label="Street Address"
                  name="address"
                  placeholder="Building / Street / Area"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />

                <LuxuryInput
                  label="Apartment / Villa / Office"
                  name="apartment"
                  placeholder="Apartment, villa or office number"
                  value={formData.apartment}
                  onChange={handleInputChange}
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <LuxuryInput
                    label="City"
                    name="city"
                    placeholder="Dubai"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />

                  <div>
                    <label className="mb-2 block font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.2em] text-white/50">
                      Emirate
                    </label>

                    <select
                      name="emirate"
                      value={formData.emirate}
                      onChange={handleInputChange}
                      className="h-12 w-full appearance-none rounded-none border border-white/15 bg-[#0d0d0d] px-4 font-['Inter',sans-serif] text-xs text-white outline-none transition-colors focus:border-[#d4af37]"
                    >
                      <option value="Abu Dhabi">
                        Abu Dhabi
                      </option>

                      <option value="Ajman">
                        Ajman
                      </option>

                      <option value="Dubai">
                        Dubai
                      </option>

                      <option value="Fujairah">
                        Fujairah
                      </option>

                      <option value="Ras Al Khaimah">
                        Ras Al Khaimah
                      </option>

                      <option value="Sharjah">
                        Sharjah
                      </option>

                      <option value="Umm Al Quwain">
                        Umm Al Quwain
                      </option>
                    </select>
                  </div>
                </div>

                <LuxuryInput
                  label="Postal Code"
                  name="postalCode"
                  placeholder="Optional"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                />
              </div>

              {/* DELIVERY MESSAGE */}
              <div className="mt-6 border border-[#d4af37]/20 bg-[#d4af37]/5 p-5">
                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/50">
                    <Check
                      size={10}
                      className="text-[#d4af37]"
                    />
                  </div>

                  <div>
                    <p className="font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.2em] text-[#d4af37]">
                      UAE DELIVERY
                    </p>

                    <p className="mt-2 font-['Inter',sans-serif] text-[10px] leading-5 text-white/40">
                      We deliver across all seven emirates.
                      Orders above AED 300 qualify for free
                      delivery.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* PAYMENT */}
            <section>
              <div className="mb-7">
                <p className="mb-2 font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.35em] text-[#d4af37]">
                  03 · PAYMENT
                </p>

                <h2 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl">
                  Payment Method
                </h2>
              </div>

              <div className="space-y-3">
                {/* CARD */}
                <PaymentOption
                  value="card"
                  selected={paymentMethod === "card"}
                  onChange={setPaymentMethod}
                  title="Credit / Debit Card"
                  description="Secure online payment"
                />

                {/* COD */}
                <PaymentOption
                  value="cod"
                  selected={paymentMethod === "cod"}
                  onChange={setPaymentMethod}
                  title="Cash on Delivery"
                  description="Pay when your fragrance arrives"
                />
              </div>

              {paymentMethod === "card" && (
                <div className="mt-5 border border-white/10 bg-[#0d0d0d] p-5">
                  <div className="flex gap-3">
                    <Lock
                      size={15}
                      strokeWidth={1.3}
                      className="mt-0.5 shrink-0 text-[#d4af37]"
                    />

                    <p className="font-['Inter',sans-serif] text-[10px] leading-5 text-white/40">
                      You will be redirected to our secure
                      payment gateway to complete your card
                      payment. Your card details are not stored
                      by SAAQ.
                    </p>
                  </div>
                </div>
              )}

              {paymentMethod === "cod" && (
                <div className="mt-5 border border-[#d4af37]/20 bg-[#d4af37]/5 p-5">
                  <p className="font-['Inter',sans-serif] text-[10px] leading-5 text-white/50">
                    Pay securely in cash when your SAAQ
                    fragrance is delivered to your address.
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* RIGHT SIDE — ORDER SUMMARY */}
          <aside>
            <div className="sticky top-28 border border-white/10 bg-[#0d0d0d]">
              {/* SUMMARY HEADER */}
              <div className="border-b border-white/10 p-6 sm:p-8">
                <p className="mb-2 font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.35em] text-[#d4af37]">
                  ORDER SUMMARY
                </p>

                <h2 className="font-['Playfair_Display',serif] text-2xl">
                  Your Selection
                </h2>
              </div>

              {/* PRODUCTS */}
              <div className="max-h-[380px] overflow-y-auto px-6 sm:px-8">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 border-b border-white/10 py-5 last:border-0"
                  >
                    <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-[#111]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />

                      <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d4af37] px-1 font-['Inter',sans-serif] text-[8px] text-black">
                        {item.quantity}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-['Inter',sans-serif] text-[8px] uppercase tracking-[0.2em] text-[#d4af37]">
                        {item.collection === "takeoff"
                          ? "Take Off"
                          : "Gems"}
                      </p>

                      <h3 className="mt-1 truncate font-['Playfair_Display',serif] text-base">
                        {item.name}
                      </h3>

                      <p className="mt-1 font-['Inter',sans-serif] text-[10px] text-white/40">
                        AED {item.price.toFixed(2)}
                      </p>
                    </div>

                    <p className="font-['Inter',sans-serif] text-xs">
                      AED{" "}
                      {(item.price * item.quantity).toFixed(
                        2
                      )}
                    </p>
                  </div>
                ))}
              </div>

              {/* TOTALS */}
              <div className="border-t border-white/10 p-6 sm:p-8">
                <div className="flex justify-between">
                  <span className="font-['Inter',sans-serif] text-xs text-white/50">
                    Subtotal
                  </span>

                  <span className="font-['Inter',sans-serif] text-xs">
                    AED {subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="mt-5 flex justify-between">
                  <span className="font-['Inter',sans-serif] text-xs text-white/50">
                    Delivery
                  </span>

                  <span className="font-['Inter',sans-serif] text-xs">
                    {shipping === 0 ? (
                      <span className="text-[#d4af37]">
                        FREE
                      </span>
                    ) : (
                      `AED ${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="my-6 border-t border-white/10" />

                <div className="flex items-end justify-between">
                  <span className="font-['Playfair_Display',serif] text-lg">
                    Total
                  </span>

                  <div className="text-right">
                    <p className="font-['Inter',sans-serif] text-[8px] uppercase tracking-[0.15em] text-white/30">
                      AED
                    </p>

                    <p className="font-['Playfair_Display',serif] text-2xl text-[#d4af37]">
                      {total.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* PLACE ORDER */}
                <button
                  type="submit"
                  className="mt-8 flex w-full items-center justify-center gap-3 bg-[#d4af37] px-6 py-4 font-['Inter',sans-serif] text-[9px] font-medium uppercase tracking-[0.3em] text-black transition-all duration-300 hover:bg-[#e4c45a] hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] active:scale-[0.99]"
                >
                  <Lock
                    size={12}
                    strokeWidth={1.5}
                  />

                  {paymentMethod === "cod"
                    ? "Place Order"
                    : "Continue to Payment"}
                </button>

                <p className="mt-5 text-center font-['Inter',sans-serif] text-[8px] uppercase tracking-[0.15em] leading-5 text-white/25">
                  Secure checkout · UAE delivery · SAAQ
                  PERFUME
                </p>
              </div>
            </div>

            {/* BACK TO CART */}
            <Link
              href="/cart"
              className="mt-6 flex items-center justify-center gap-3 font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.25em] text-white/40 transition-colors hover:text-[#d4af37]"
            >
              <ArrowLeft size={13} strokeWidth={1.5} />
              Return to Cart
            </Link>
          </aside>
        </div>
      </form>

      {/* BRAND FOOTER */}
      <section className="border-t border-white/10 bg-[#060606]">
        <div className="mx-auto max-w-7xl px-6 py-12 text-center">
          <p className="font-['Playfair_Display',serif] text-xl text-white/80 sm:text-2xl">
            The Art of Signature Fragrance
          </p>

          <p className="mt-3 font-['Inter',sans-serif] text-[8px] uppercase tracking-[0.35em] text-white/30">
            SAAQ PERFUME · UAE
          </p>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   LUXURY INPUT
========================================================= */

function LuxuryInput({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.2em] text-white/50"
      >
        {label}
        {required && (
          <span className="ml-1 text-[#d4af37]">*</span>
        )}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="h-12 w-full rounded-none border border-white/15 bg-[#0d0d0d] px-4 font-['Inter',sans-serif] text-xs text-white outline-none placeholder:text-white/20 transition-colors focus:border-[#d4af37]"
      />
    </div>
  );
}

/* =========================================================
   PAYMENT OPTION
========================================================= */

function PaymentOption({
  value,
  selected,
  onChange,
  title,
  description,
}: {
  value: string;
  selected: boolean;
  onChange: (value: string) => void;
  title: string;
  description: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={`flex w-full items-center gap-4 border p-5 text-left transition-all duration-300 ${
        selected
          ? "border-[#d4af37] bg-[#d4af37]/5"
          : "border-white/10 bg-[#0d0d0d] hover:border-white/25"
      }`}
    >
      {/* RADIO */}
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
          selected
            ? "border-[#d4af37]"
            : "border-white/30"
        }`}
      >
        {selected && (
          <span className="h-2.5 w-2.5 rounded-full bg-[#d4af37]" />
        )}
      </span>

      {/* TEXT */}
      <span className="flex-1">
        <span className="block font-['Inter',sans-serif] text-[10px] uppercase tracking-[0.15em] text-white">
          {title}
        </span>

        <span className="mt-1 block font-['Inter',sans-serif] text-[9px] text-white/35">
          {description}
        </span>
      </span>

      {value === "card" && (
        <span className="font-['Inter',sans-serif] text-[8px] uppercase tracking-wider text-[#d4af37]">
          SECURE
        </span>
      )}
    </button>
  );
}

