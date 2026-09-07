
"use client";

import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
  ArrowUp,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-[#050505] text-white border-t border-[#d4af37]/20">

      {/* Top Gold Line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <h2 className="font-serif text-3xl tracking-[0.25em] text-[#d4af37]">
              SAAQ
            </h2>

            <p className="mt-2 text-xs tracking-[0.35em] text-white/50">
              PERFUME
            </p>

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/50">
              Discover the art of signature fragrance.
              Crafted for those who appreciate elegance,
              sophistication, and timeless luxury.
            </p>

            {/* Social Icons */}
            <div className="mt-7 flex gap-3">

              {/* Instagram */}
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition-all duration-300 hover:border-[#d4af37] hover:text-[#d4af37]"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                  />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="0.8"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition-all duration-300 hover:border-[#d4af37] hover:text-[#d4af37]"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M14 8h3V4h-3c-3.3 0-5 2-5 5v3H6v4h3v4h4v-4h3.5l.5-4H13V9c0-.7.3-1 1-1z" />
                </svg>
              </a>

            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-[#d4af37]">
              Shop
            </h3>

            <ul className="mt-6 space-y-4 text-sm text-white/50">

              <li>
                <Link
                  href="/shop"
                  className="transition-colors hover:text-[#d4af37]"
                >
                  All Perfumes
                </Link>
              </li>

              <li>
                <Link
                  href="/shop?collection=takeoff"
                  className="transition-colors hover:text-[#d4af37]"
                >
                  Take Off Collection
                </Link>
              </li>

              <li>
                <Link
                  href="/shop?collection=gems"
                  className="transition-colors hover:text-[#d4af37]"
                >
                  Gems Collection
                </Link>
              </li>

              <li>
                <Link
                  href="/cart"
                  className="transition-colors hover:text-[#d4af37]"
                >
                  Shopping Cart
                </Link>
              </li>

            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-[#d4af37]">
              Information
            </h3>

            <ul className="mt-6 space-y-4 text-sm text-white/50">

              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-[#d4af37]"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-[#d4af37]"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  href="/shipping"
                  className="transition-colors hover:text-[#d4af37]"
                >
                  Shipping & Delivery
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy"
                  className="transition-colors hover:text-[#d4af37]"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="transition-colors hover:text-[#d4af37]"
                >
                  Terms & Conditions
                </Link>
              </li>

            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-[#d4af37]">
              Contact
            </h3>

            <div className="mt-6 space-y-5">

              <div className="flex items-start gap-4">
                <MapPin
                  size={18}
                  className="mt-1 shrink-0 text-[#d4af37]"
                />

                <p className="text-sm leading-6 text-white/50">
                  United Arab Emirates
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Phone
                  size={18}
                  className="shrink-0 text-[#d4af37]"
                />

                <a
                  href="tel:+971500000000"
                  className="text-sm text-white/50 transition-colors hover:text-[#d4af37]"
                >
                  +971 50 000 0000
                </a>
              </div>

              <div className="flex items-center gap-4">
                <Mail
                  size={18}
                  className="shrink-0 text-[#d4af37]"
                />

                <a
                  href="mailto:info@saaqperfume.com"
                  className="text-sm text-white/50 transition-colors hover:text-[#d4af37]"
                >
                  info@saaqperfume.com
                </a>
              </div>

            </div>

            {/* Newsletter */}
            <div className="mt-8">

              <p className="mb-3 text-xs uppercase tracking-[0.15em] text-white/40">
                Join our fragrance world
              </p>

              <div className="flex overflow-hidden border border-white/20">
                <input
                  type="email"
                  placeholder="Your email"
                  className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/30"
                />

                <button
                  type="button"
                  className="bg-[#d4af37] px-5 text-xs font-medium uppercase tracking-wider text-black transition-colors hover:bg-[#e2c45c]"
                >
                  Subscribe
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/10">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 py-6 sm:flex-row lg:px-8">

          <p className="text-xs tracking-wide text-white/30">
            © {currentYear} SAAQ PERFUME. All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-white/40 transition-colors hover:text-[#d4af37]"
          >
            Back to top

            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 transition-all duration-300 group-hover:border-[#d4af37]">
              <ArrowUp size={14} />
            </span>
          </button>

        </div>
      </div>

      {/* Bottom Gold Line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />

    </footer>
  );
}

