"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  const shopMenuRef = useRef<HTMLDivElement>(null);

  // Close all menus
  const closeMenus = () => {
    setMenuOpen(false);
    setShopOpen(false);
  };

  // Close menus with ESC
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenus();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /*// Close desktop Shop menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        shopMenuRef.current &&
        !shopMenuRef.current.contains(target)
      ) {
        setShopOpen(false);
      }
    };

    if (shopOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [shopOpen]);*/

  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      {/* =========================================================
          ANNOUNCEMENT BAR
      ========================================================= */}

      <div className="flex h-8 items-center justify-center bg-[#080808] px-4">
        <p className="font-['Inter',sans-serif] text-[9px] font-medium uppercase tracking-[0.25em] text-[#d4af37] sm:text-[10px]">
          FREE DELIVERY ACROSS UAE | EXPERIENCE THE ART OF FRAGRANCE
        </p>
      </div>

      {/* =========================================================
          MAIN NAVIGATION
      ========================================================= */}

      <nav className="relative flex h-[82px] items-center justify-between border-b border-white/10 bg-black/85 px-5 backdrop-blur-xl sm:px-8 lg:px-12">
        {/* =======================================================
            LEFT SIDE
        ======================================================= */}

        <div className="flex items-center">
          {/* Mobile Menu Button */}

          <button
            type="button"
            onClick={() => {
              setMenuOpen((previous) => !previous);
              setShopOpen(false);
            }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center text-white transition-colors duration-300 hover:text-[#d4af37] lg:hidden"
          >
            {menuOpen ? (
              <X size={23} strokeWidth={1.4} />
            ) : (
              <Menu size={23} strokeWidth={1.4} />
            )}
          </button>

          {/* =====================================================
              DESKTOP NAVIGATION
          ===================================================== */}

          <div className="hidden items-center gap-8 lg:flex">
            {/* HOME */}

            <Link
              href="/"
              onClick={closeMenus}
              className="font-['Inter',sans-serif] text-[11px] uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:text-[#d4af37]"
            >
              Home
            </Link>

            {/* =================================================
                SHOP + MEGA MENU
            ================================================= */}

            <div
              ref={shopMenuRef}
              className="relative"
            >
            {/* SHOP */}

<Link
  href="/shop"
  onClick={closeMenus}
  className="font-['Inter',sans-serif] text-[11px] uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:text-[#d4af37]"
>
  Shop
</Link>

              {/* =================================================
                  FULL WIDTH LUXURY MEGA MENU
              ================================================= */}

              <div
                className={`fixed left-0 top-[114px] z-[100] w-screen border-b border-[#d4af37]/20 bg-[#080808]/98 shadow-[0_20px_50px_rgba(0,0,0,0.55)] backdrop-blur-2xl transition-all duration-500 ${
                  shopOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-4 opacity-0"
                }`}
              >
                <div className="mx-auto max-w-[1500px] px-6 py-8 sm:px-10 lg:px-16">
                  {/* =================================================
                      MENU HEADING
                  ================================================= */}

                  <div className="mb-7 flex items-end justify-between border-b border-white/10 pb-5">
                    <div>
                      <p className="mb-2 font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.35em] text-[#d4af37]">
                        Discover SAAQ
                      </p>

                      <h2 className="font-['Playfair_Display',serif] text-2xl text-white sm:text-3xl">
                        The Art of Fragrance
                      </h2>
                    </div>

                    {/* View All */}

                    <Link
                      href="/shop"
                      onClick={closeMenus}
                      className="group hidden items-center gap-2 font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.25em] text-white/70 transition-colors hover:text-[#d4af37] sm:flex"
                    >
                      View All Fragrances

                      <ArrowUpRight
                        size={14}
                        strokeWidth={1.4}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>
                  </div>

                  {/* =================================================
                      COLLECTION CARDS
                  ================================================= */}

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-7">
                    {/* =================================================
                        TAKE OFF
                    ================================================= */}

                    <Link
                      href="/shop?collection=takeoff"
                      onClick={closeMenus}
                      className="group relative overflow-hidden"
                    >
                      <div className="relative aspect-[16/7] overflow-hidden bg-[#111]">
                        <Image
                          src="/images/collections/takeoff.jpg"
                          alt="SAAQ Take Off Collection"
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 700px"
                          className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        />

                        {/* Dark Overlay */}

                        <div className="absolute inset-0 bg-black/35 transition-colors duration-500 group-hover:bg-black/20" />

                        {/* Bottom Gradient */}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                        {/* Text */}

                        <div className="absolute bottom-0 left-0 p-5 sm:p-7">
                          <p className="mb-1 font-['Inter',sans-serif] text-[8px] uppercase tracking-[0.3em] text-[#d4af37]">
                            Collection 01
                          </p>

                          <h3 className="font-['Playfair_Display',serif] text-2xl text-white sm:text-3xl lg:text-4xl">
                            Take Off
                          </h3>

                          <div className="mt-3 flex items-center gap-2 font-['Inter',sans-serif] text-[8px] uppercase tracking-[0.25em] text-white/80">
                            Explore Collection

                            <ArrowUpRight
                              size={13}
                              strokeWidth={1.3}
                              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                            />
                          </div>
                        </div>
                      </div>
                    </Link>

                    {/* =================================================
                        GEMS
                    ================================================= */}

                    <Link
                      href="/shop?collection=gems"
                      onClick={closeMenus}
                      className="group relative overflow-hidden"
                    >
                      <div className="relative aspect-[16/7] overflow-hidden bg-[#111]">
                        <Image
                          src="/images/collections/gems.jpg"
                          alt="SAAQ Gems Collection"
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 700px"
                          className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        />

                        {/* Dark Overlay */}

                        <div className="absolute inset-0 bg-black/35 transition-colors duration-500 group-hover:bg-black/20" />

                        {/* Bottom Gradient */}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                        {/* Text */}

                        <div className="absolute bottom-0 left-0 p-5 sm:p-7">
                          <p className="mb-1 font-['Inter',sans-serif] text-[8px] uppercase tracking-[0.3em] text-[#d4af37]">
                            Collection 02
                          </p>

                          <h3 className="font-['Playfair_Display',serif] text-2xl text-white sm:text-3xl lg:text-4xl">
                            Gems
                          </h3>

                          <div className="mt-3 flex items-center gap-2 font-['Inter',sans-serif] text-[8px] uppercase tracking-[0.25em] text-white/80">
                            Explore Collection

                            <ArrowUpRight
                              size={13}
                              strokeWidth={1.3}
                              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                            />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* =================================================
                      BOTTOM LINKS
                  ================================================= */}

                  <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">
                    <div className="flex gap-6">
                      <Link
                        href="/shop?collection=takeoff"
                        onClick={closeMenus}
                        className="font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-[#d4af37]"
                      >
                        Take Off
                      </Link>

                      <Link
                        href="/shop?collection=gems"
                        onClick={closeMenus}
                        className="font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-[#d4af37]"
                      >
                        Gems
                      </Link>
                    </div>

                    {/* Mobile View All */}

                    <Link
                      href="/shop"
                      onClick={closeMenus}
                      className="font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.2em] text-[#d4af37] transition-opacity hover:opacity-70 sm:hidden"
                    >
                      View All
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* OUR STORY */}

            <Link
              href="/about"
              onClick={closeMenus}
              className="font-['Inter',sans-serif] text-[11px] uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:text-[#d4af37]"
            >
              Our Story
            </Link>

            {/* CONTACT */}

            <Link
              href="/contact"
              onClick={closeMenus}
              className="font-['Inter',sans-serif] text-[11px] uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:text-[#d4af37]"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* =======================================================
            CENTER LOGO
        ======================================================= */}

        <Link
          href="/"
          onClick={closeMenus}
          aria-label="SAAQ Perfume Home"
          className="group absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        >
          <div className="relative flex h-[70px] w-[70px] items-center justify-center">
            {/* Outer Ring */}

            <div className="absolute inset-0 rounded-full border border-[#d4af37]/35 transition-all duration-700 group-hover:rotate-180 group-hover:border-[#d4af37]/80 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]" />

            {/* Top Diamond */}

            <span className="absolute -top-[2px] left-1/2 h-[5px] w-[5px] -translate-x-1/2 rotate-45 bg-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.8)]" />

            {/* Bottom Diamond */}

            <span className="absolute -bottom-[2px] left-1/2 h-[5px] w-[5px] -translate-x-1/2 rotate-45 bg-[#d4af37]/70" />

            {/* Inner Ring */}

            <div className="absolute h-[62px] w-[62px] rounded-full border border-[#d4af37]/25 transition-all duration-500 group-hover:scale-105" />

            {/* Logo Image */}

            <div className="relative h-[54px] w-[54px] overflow-hidden rounded-full border border-[#d4af37]/70 bg-black shadow-[0_5px_25px_rgba(0,0,0,0.7)] transition-all duration-500 group-hover:scale-105">
              <Image
                src="/images/logo/saaq-logo.jpeg"
                alt="SAAQ Perfume"
                fill
                priority
                sizes="54px"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Shine */}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          </div>
        </Link>

        {/* =======================================================
            RIGHT SIDE - CART
        ======================================================= */}

        <Link
          href="/cart"
          onClick={closeMenus}
          aria-label="Shopping cart"
          className="group ml-auto flex h-10 items-center gap-2 text-white transition-colors duration-300 hover:text-[#d4af37]"
        >
          <span className="hidden font-['Inter',sans-serif] text-[10px] uppercase tracking-[0.2em] sm:block">
            Cart
          </span>

          <div className="relative">
            <ShoppingBag
              size={21}
              strokeWidth={1.4}
              className="transition-transform duration-300 group-hover:scale-110"
            />

            {/* Cart Count */}

            <span className="absolute -right-2.5 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#d4af37] px-1 text-[8px] font-semibold text-black">
              0
            </span>
          </div>
        </Link>
      </nav>

      {/* =========================================================
          MOBILE MENU
      ========================================================= */}

      <div
        className={`absolute left-0 top-[114px] w-full overflow-hidden bg-[#080808]/98 backdrop-blur-2xl transition-all duration-500 lg:hidden ${
          menuOpen
            ? "max-h-[600px] border-b border-[#d4af37]/20 opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-7 py-6">
          {/* HOME */}

          <MobileNavLink
            href="/"
            label="Home"
            onClick={closeMenus}
          />

          {/* =====================================================
              MOBILE SHOP
          ===================================================== */}

          <div className="border-b border-white/10">
            <button
              type="button"
              onClick={() => setShopOpen((previous) => !previous)}
              className="flex w-full items-center justify-between py-5 font-['Inter',sans-serif] text-[11px] uppercase tracking-[0.25em] text-white transition-colors hover:text-[#d4af37]"
              aria-expanded={shopOpen}
            >
              <span>Shop</span>

              <ChevronDown
                size={15}
                strokeWidth={1.4}
                className={`transition-transform duration-300 ${
                  shopOpen
                    ? "rotate-180 text-[#d4af37]"
                    : ""
                }`}
              />
            </button>

            {/* Mobile Collections */}

            <div
              className={`overflow-hidden transition-all duration-500 ${
                shopOpen
                  ? "max-h-[180px] pb-3 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              {/* All Fragrances */}

              <Link
                href="/shop"
                onClick={closeMenus}
                className="flex items-center justify-between py-3 pl-4 font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.22em] text-white/60 transition-colors hover:text-[#d4af37]"
              >
                All Fragrances

                <ArrowUpRight
                  size={13}
                  strokeWidth={1.3}
                />
              </Link>

              {/* Take Off */}

              <Link
                href="/shop?collection=takeoff"
                onClick={closeMenus}
                className="flex items-center justify-between py-3 pl-4 font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.22em] text-white/60 transition-colors hover:text-[#d4af37]"
              >
                Take Off

                <ArrowUpRight
                  size={13}
                  strokeWidth={1.3}
                />
              </Link>

              {/* Gems */}

              <Link
                href="/shop?collection=gems"
                onClick={closeMenus}
                className="flex items-center justify-between py-3 pl-4 font-['Inter',sans-serif] text-[9px] uppercase tracking-[0.22em] text-white/60 transition-colors hover:text-[#d4af37]"
              >
                Gems

                <ArrowUpRight
                  size={13}
                  strokeWidth={1.3}
                />
              </Link>
            </div>
          </div>

          {/* OUR STORY */}

          <MobileNavLink
            href="/about"
            label="Our Story"
            onClick={closeMenus}
          />

          {/* CONTACT */}

          <MobileNavLink
            href="/contact"
            label="Contact"
            onClick={closeMenus}
          />

          {/* CART */}

          <MobileNavLink
            href="/cart"
            label="Cart"
            onClick={closeMenus}
          />

          {/* Mobile Footer */}

          <div className="pt-6">
            <p className="font-['Inter',sans-serif] text-[8px] uppercase tracking-[0.3em] text-[#d4af37]/70">
              The Art of Signature Fragrance
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

/* =============================================================
   MOBILE NAVIGATION LINK
============================================================= */

function MobileNavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center justify-between border-b border-white/10 py-5 font-['Inter',sans-serif] text-[11px] uppercase tracking-[0.25em] text-white transition-colors duration-300 hover:text-[#d4af37]"
    >
      {label}

      <ArrowUpRight
        size={14}
        strokeWidth={1.3}
        className="opacity-40"
      />
    </Link>
  );
}
