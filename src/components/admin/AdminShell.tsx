"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  CreditCard,
  LayoutDashboard,
  Layers,
  LogOut,
  Mail,
  Menu,
  Package,
  ShoppingBag,
  Store,
  Tags,
  Users,
  X,
} from "lucide-react";
import { logoutAdmin } from "@/app/admin/actions";
import { cn } from "@/lib/cn";

type AdminShellProps = {
  children: ReactNode;
};

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: Tags },
  { href: "/admin/collections", label: "Collections", icon: Layers },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { label: "Payments", icon: CreditCard },
] as const;

export default function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  if (pathname === "/admin/login") {
    return children;
  }

  return (
    <div className="min-h-screen bg-saaq-void text-saaq-ivory">
      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-black/65 lg:hidden"
          onClick={closeMobile}
        />
      ) : null}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-saaq-gold/15 bg-saaq-black saaq-transition md:w-20 lg:w-72",
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex h-20 items-center justify-between gap-3 border-b border-saaq-gold/15 px-5">
          <Link
            href="/admin"
            onClick={closeMobile}
            className="group flex min-w-0 items-center gap-3"
          >
            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center">
              <span className="absolute inset-0 rounded-full border border-saaq-gold/40" />
              <span className="relative h-9 w-9 overflow-hidden rounded-full border border-saaq-gold/70 bg-saaq-black">
                <Image
                  src="/images/logo/saaq-logo.jpeg"
                  alt="SAAQ"
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </span>
            </span>
            <span className="min-w-0 md:hidden lg:block">
              <span className="block font-display text-lg tracking-[0.28em] text-saaq-ivory">
                SAAQ
              </span>
              <span className="saaq-eyebrow mt-1 block text-[9px]">
                Admin
              </span>
            </span>
          </Link>
          <button
            type="button"
            aria-label="Close navigation"
            onClick={closeMobile}
            className="saaq-transition flex h-10 w-10 items-center justify-center border border-white/10 text-saaq-ivory hover:border-saaq-gold hover:text-saaq-gold md:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isLink = "href" in item;
            const active =
              isLink &&
              (item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href));
            const className = cn(
              "saaq-transition flex w-full items-center gap-3 rounded-sm px-3 py-3 font-sans text-[10px] uppercase tracking-[0.22em] md:justify-center lg:justify-start",
              active
                ? "border border-saaq-gold/40 bg-saaq-gold/10 text-saaq-gold"
                : "border border-transparent text-saaq-ivory/65 hover:border-saaq-gold/20 hover:text-saaq-gold"
            );

            if (isLink) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMobile}
                  aria-current={active ? "page" : undefined}
                  className={className}
                  title={item.label}
                >
                  <Icon size={16} strokeWidth={1.4} />
                  <span className="md:hidden lg:inline">{item.label}</span>
                </Link>
              );
            }

            return (
              <button
                key={item.label}
                type="button"
                className={className}
                title={`${item.label} coming next`}
              >
                <Icon size={16} strokeWidth={1.4} />
                <span className="md:hidden lg:inline">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="space-y-1 border-t border-saaq-gold/15 px-3 py-5">
          <Link
            href="/"
            onClick={closeMobile}
            title="View Store"
            className="saaq-transition flex w-full items-center gap-3 rounded-sm px-3 py-3 font-sans text-[10px] uppercase tracking-[0.22em] text-saaq-ivory/65 hover:text-saaq-gold md:justify-center lg:justify-start"
          >
            <Store size={16} strokeWidth={1.4} />
            <span className="md:hidden lg:inline">View Store</span>
          </Link>
          <form action={logoutAdmin}>
            <button
              type="submit"
              title="Logout"
              className="saaq-transition flex w-full items-center gap-3 rounded-sm px-3 py-3 font-sans text-[10px] uppercase tracking-[0.22em] text-saaq-ivory/45 hover:text-saaq-gold md:justify-center lg:justify-start"
            >
              <LogOut size={16} strokeWidth={1.4} />
              <span className="md:hidden lg:inline">Logout</span>
            </button>
          </form>
        </div>
      </aside>

      <div className="flex min-h-screen min-w-0 flex-col overflow-x-clip md:pl-20 lg:pl-72">
        <header className="flex h-16 items-center justify-between border-b border-saaq-gold/15 bg-saaq-black/90 px-4 backdrop-blur-xl md:hidden">
          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setMobileOpen(true)}
            className="saaq-transition flex h-10 w-10 items-center justify-center border border-white/10 text-saaq-ivory hover:border-saaq-gold hover:text-saaq-gold"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <p className="font-display tracking-[0.28em] text-saaq-ivory">SAAQ</p>
          <span className="saaq-eyebrow text-[9px]">Admin</span>
        </header>

        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
