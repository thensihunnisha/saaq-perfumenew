"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import SearchOverlay from "@/components/SearchOverlay";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/story", label: "Story" },
  { href: "/contact", label: "Contact" },
] as const;

const COLLECTION_LINKS = [
  {
    href: "/collection/gems",
    label: "Gems Collection",
    image: "/images/collections/gems-home.jpg",
  },
  {
    href: "/collection/takeoff",
    label: "Take Off Collection",
    image: "/images/collections/takeoff-home.jpg",
  },
] as const;

const MOBILE_COLLECTION_LINKS = [
  { href: "/collection", label: "All Collection" },
  { href: "/collection/gems", label: "Gems Collection" },
  { href: "/collection/takeoff", label: "Take Off Collection" },
] as const;

const MOBILE_COLLECTION_PANEL_ID = "mobile-collection-submenu";

export default function Header() {
  const pathname = usePathname();
  const { itemCount, isReady: cartReady, openDrawer } = useCart();
  const { itemCount: wishlistCount, isReady: wishlistReady } = useWishlist();
  const cartCount = cartReady ? itemCount : 0;
  const savedCount = wishlistReady ? wishlistCount : 0;

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [desktopCollectionOpen, setDesktopCollectionOpen] = useState(false);
  const [mobileCollectionOpen, setMobileCollectionOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const collectionRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);

  const previousPathname = useRef(pathname);

  const isHome = pathname === "/";
  const isStory = pathname === "/story";
  const isCollectionHero =
    pathname === "/collection" ||
    pathname === "/collection/gems" ||
    pathname === "/collection/takeoff";
  const isTransparent =
    (isHome || isStory || isCollectionHero) &&
    !scrolled &&
    !menuOpen &&
    !searchOpen;

  const closeMenus = () => {
    setMenuOpen(false);
    setDesktopCollectionOpen(false);
    setMobileCollectionOpen(false);
  };

  const cancelClose = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => {
      setDesktopCollectionOpen(false);
    }, 180);
  };

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 24;
      setScrolled((current) => (current === next ? current : next));
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (previousPathname.current === pathname) {
      return;
    }

    previousPathname.current = pathname;
    closeMenus();
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenus();
        setSearchOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (menuOpen) {
        return;
      }

      const target = event.target as Node | null;

      if (collectionRef.current?.contains(target)) {
        return;
      }

      setDesktopCollectionOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);

    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [menuOpen]);

  useEffect(() => {
    const lock = menuOpen || searchOpen;
    document.body.style.overflow = lock ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, searchOpen]);

  const navClass = (href: string) =>
    cn(
      "saaq-transition font-sans text-[10px] uppercase tracking-[0.22em] xl:text-[11px]",
      pathname === href
        ? "text-saaq-gold"
        : "text-saaq-ivory/85 hover:text-saaq-gold"
    );

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full">
        <AnnouncementBar />
        <nav
          className={cn(
            "saaq-transition relative flex h-16 min-w-0 items-center justify-between gap-2 px-3 sm:h-20 sm:gap-3 sm:px-8 lg:px-10 xl:px-12",
            isTransparent
              ? "border-b border-transparent bg-transparent"
              : "border-b border-saaq-gold/20 bg-saaq-black/92 backdrop-blur-xl"
          )}
        >
          <Link
            href="/"
            onClick={closeMenus}
            aria-label="SAAQ Perfume Home"
            className="group relative z-20 flex shrink-0 items-center"
          >
            <LogoMark />
            <span className="ml-3 hidden font-display text-lg tracking-[0.35em] text-saaq-ivory xl:inline">
              SAAQ
            </span>
          </Link>

          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 lg:flex xl:gap-8">
            <Link href="/" onClick={closeMenus} className={navClass("/")}>
              Home
            </Link>

            <div
              ref={collectionRef}
              className="relative"
              onPointerEnter={(event) => {
                if (event.pointerType !== "mouse") {
                  return;
                }

                cancelClose();
                setDesktopCollectionOpen(true);
              }}
              onPointerLeave={(event) => {
                if (event.pointerType !== "mouse") {
                  return;
                }

                scheduleClose();
              }}
            >
              <button
                type="button"
                aria-expanded={desktopCollectionOpen}
                aria-haspopup="true"
                onClick={() => setDesktopCollectionOpen((open) => !open)}
                className={cn(
                  "saaq-transition flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-[0.22em] xl:text-[11px]",
                  desktopCollectionOpen || pathname.startsWith("/collection")
                    ? "text-saaq-gold"
                    : "text-saaq-ivory/85 hover:text-saaq-gold"
                )}
              >
                Collection
                <ChevronDown
                  size={13}
                  strokeWidth={1.4}
                  className={cn(
                    "saaq-transition",
                    desktopCollectionOpen ? "rotate-180 text-saaq-gold" : ""
                  )}
                />
              </button>

              <div
                className={cn(
                  "saaq-transition absolute left-1/2 top-[calc(100%+1.25rem)] z-[60] w-[min(92vw,34rem)] -translate-x-1/2 border border-saaq-gold/20 bg-saaq-black/96 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl",
                  desktopCollectionOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-2 pointer-events-none opacity-0"
                )}
              >
                <p className="saaq-eyebrow">Collection</p>
                <div className="saaq-rule mt-4" />

                <div className="mt-6 grid grid-cols-[1fr_auto] gap-6">
                  <div className="flex flex-col gap-4">
                    {COLLECTION_LINKS.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMenus}
                        className="saaq-transition font-sans text-[11px] uppercase tracking-[0.22em] text-saaq-ivory/75 hover:text-saaq-gold"
                      >
                        {item.label}
                      </Link>
                    ))}

                    <Link
                      href="/collection"
                      onClick={closeMenus}
                      className="saaq-transition mt-2 font-sans text-[10px] uppercase tracking-[0.28em] text-saaq-gold hover:text-saaq-ivory"
                    >
                      View All Collections
                    </Link>
                  </div>

                  <div className="hidden w-48 grid-cols-1 gap-3 sm:grid">
                    {COLLECTION_LINKS.map((item) => (
                      <Link
                        key={`${item.href}-image`}
                        href={item.href}
                        onClick={closeMenus}
                        className="group relative block aspect-[16/9] overflow-hidden bg-saaq-charcoal"
                      >
                        <Image
                          src={item.image}
                          alt={item.label}
                          fill
                          unoptimized
                          sizes="192px"
                          className="object-cover object-[center_right] saaq-img-zoom"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {NAV_LINKS.filter((link) => link.href !== "/").map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenus}
                className={navClass(link.href)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="relative z-20 ml-auto flex shrink-0 items-center gap-0.5 sm:gap-2">
            <button
              type="button"
              aria-label="Search"
              aria-expanded={searchOpen}
              aria-haspopup="dialog"
              onClick={() => {
                closeMenus();
                setSearchOpen(true);
              }}
              className="saaq-transition flex h-10 w-10 items-center justify-center text-saaq-ivory hover:text-saaq-gold"
            >
              <Search size={18} strokeWidth={1.4} />
            </button>

            <Link
              href="/wishlist"
              onClick={closeMenus}
              aria-label={`Wishlist, ${savedCount} saved`}
              className="saaq-transition group relative flex h-10 w-10 items-center justify-center text-saaq-ivory hover:text-saaq-gold"
            >
              <Heart size={18} strokeWidth={1.4} />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center bg-saaq-gold px-1 font-sans text-[8px] font-semibold text-saaq-black">
                {savedCount}
              </span>
            </Link>

            <button
              type="button"
              aria-label={`Shopping cart, ${cartCount} items`}
              onClick={() => {
                closeMenus();
                openDrawer();
              }}
              className="saaq-transition group relative flex h-10 w-10 items-center justify-center text-saaq-ivory hover:text-saaq-gold"
            >
              <ShoppingBag size={18} strokeWidth={1.4} />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center bg-saaq-gold px-1 font-sans text-[8px] font-semibold text-saaq-black">
                {cartCount}
              </span>
            </button>

            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => {
                setSearchOpen(false);
                setDesktopCollectionOpen(false);
                setMobileCollectionOpen(false);
                setMenuOpen((open) => !open);
              }}
              className="saaq-transition flex h-10 w-10 items-center justify-center text-saaq-ivory hover:text-saaq-gold lg:hidden"
            >
              {menuOpen ? (
                <X size={22} strokeWidth={1.4} />
              ) : (
                <Menu size={22} strokeWidth={1.4} />
              )}
            </button>
          </div>
        </nav>

        <div
          id="mobile-navigation"
          className={cn(
            "fixed inset-x-0 top-[var(--saaq-header-offset)] z-[45] h-[calc(100dvh-var(--saaq-header-offset))] overflow-y-auto overscroll-contain bg-saaq-black duration-300 ease-out lg:hidden",
            menuOpen
              ? "visible pointer-events-auto opacity-100"
              : "invisible pointer-events-none opacity-0"
          )}
        >
          <nav aria-label="Mobile" className="flex flex-col px-5 py-8 sm:px-7">
            <MobileLink href="/" label="Home" onClick={closeMenus} active={pathname === "/"} />

            <div className="border-b border-white/10">
              <button
                type="button"
                id="mobile-collection-trigger"
                aria-expanded={mobileCollectionOpen}
                aria-controls={MOBILE_COLLECTION_PANEL_ID}
                aria-haspopup="true"
                onPointerDown={(event) => {
                  event.stopPropagation();
                }}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setMobileCollectionOpen((open) => !open);
                }}
                className={cn(
                  "flex min-h-12 w-full touch-manipulation items-center justify-between py-5 text-left font-sans text-[11px] uppercase tracking-[0.25em]",
                  mobileCollectionOpen || pathname.startsWith("/collection")
                    ? "text-saaq-gold"
                    : "text-saaq-ivory"
                )}
              >
                Collection
                <ChevronDown
                  size={15}
                  strokeWidth={1.4}
                  aria-hidden="true"
                  className={cn(
                    "saaq-transition shrink-0",
                    mobileCollectionOpen ? "rotate-180 text-saaq-gold" : ""
                  )}
                />
              </button>

              <div
                id={MOBILE_COLLECTION_PANEL_ID}
                role="region"
                aria-label="Collection"
                aria-labelledby="mobile-collection-trigger"
                {...(!mobileCollectionOpen ? { inert: true } : {})}
                className={cn(
                  "relative z-10 overflow-hidden transition-[max-height] duration-300 ease-out",
                  mobileCollectionOpen
                    ? "pointer-events-auto max-h-80 pb-3"
                    : "pointer-events-none max-h-0"
                )}
              >
                <div className="flex flex-col">
                  {MOBILE_COLLECTION_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      tabIndex={mobileCollectionOpen ? 0 : -1}
                      onPointerDown={(event) => {
                        event.stopPropagation();
                      }}
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                      className={cn(
                        "flex min-h-11 w-full touch-manipulation items-center py-2.5 pl-4 font-sans text-[10px] uppercase tracking-[0.22em]",
                        pathname === item.href
                          ? "text-saaq-gold"
                          : "text-saaq-ivory/55 hover:text-saaq-gold"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {NAV_LINKS.filter((link) => link.href !== "/").map((link) => (
              <MobileLink
                key={link.href}
                href={link.href}
                label={link.label}
                onClick={closeMenus}
                active={pathname === link.href}
              />
            ))}

            <MobileLink
              href="/cart"
              label="Cart"
              onClick={closeMenus}
              active={pathname === "/cart"}
            />
          </nav>
        </div>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function LogoMark() {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center sm:h-12 sm:w-12">
      <div className="saaq-transition absolute inset-0 rounded-full border border-saaq-gold/40 group-hover:border-saaq-gold" />
      <div className="relative h-8 w-8 overflow-hidden rounded-full border border-saaq-gold/70 bg-saaq-black sm:h-10 sm:w-10">
        <Image
          src="/images/logo/saaq-logo.jpeg"
          alt=""
          fill
          priority
          unoptimized
          sizes="40px"
          className="object-cover"
        />
      </div>
    </div>
  );
}

function MobileLink({
  href,
  label,
  onClick,
  active,
}: {
  href: string;
  label: string;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex min-h-12 w-full items-center border-b border-white/10 py-5 font-sans text-[11px] uppercase tracking-[0.25em]",
        active ? "text-saaq-gold" : "text-saaq-ivory"
      )}
    >
      {label}
    </Link>
  );
}
