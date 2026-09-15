"use client";

import Link from "next/link";
import { FormEvent, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import {
  getContactMailto,
  getContactTel,
  getNewsletterMailto,
  SAAQ_CONTACT,
} from "@/config/contact";
import { getEnquiryWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

const NAVIGATION = [
  { href: "/", label: "Home" },
  { href: "/collection", label: "Collection" },
  { href: "/story", label: "Story" },
  { href: "/contact", label: "Contact" },
] as const;

const COLLECTIONS = [
  { href: "/collection/gems", label: "Gems Collection" },
  { href: "/collection/takeoff", label: "Take Off Collection" },
  { href: "/collection", label: "All Collections" },
] as const;

const CUSTOMER = [
  { href: "/cart", label: "Cart" },
  { href: "/wishlist", label: "Wishlist" },
  { href: "/checkout", label: "Checkout" },
  { href: "/shipping", label: "Shipping & Returns" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
] as const;

const LEGAL = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/shipping", label: "Shipping & Returns" },
] as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappHref = getEnquiryWhatsAppUrl();

  return (
    <footer className="border-t border-saaq-gold/20 bg-saaq-void text-saaq-ivory">
      <div className="h-px bg-gradient-to-r from-transparent via-saaq-gold to-transparent" />

      <div className="saaq-container py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.6fr)] lg:gap-20">
          <div>
            <Link
              href="/"
              aria-label="SAAQ home"
              className="inline-block font-display text-3xl tracking-[0.22em] text-saaq-gold sm:text-4xl sm:tracking-[0.28em]"
              onClick={scrollToTop}
            >
              SAAQ
            </Link>
            <p className="mt-4 max-w-sm font-sans text-[10px] uppercase leading-6 tracking-[0.28em] text-saaq-ivory/45">
              The art of signature fragrance
            </p>

            <div className="mt-8 flex gap-3">
              <SocialLink
                href={SAAQ_CONTACT.social.instagram.url}
                label="Instagram"
                className="hover:border-[#E1306C]"
              >
                <InstagramIcon />
              </SocialLink>
              <SocialLink
                href={whatsappHref}
                label="WhatsApp"
                className="text-[#25D366] hover:border-[#25D366]"
              >
                <WhatsAppIcon />
              </SocialLink>
            </div>

            <NewsletterForm />
          </div>

          <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <FooterGroup title="Navigation">
              {NAVIGATION.map((item) => (
                <FooterLink key={`${item.label}-${item.href}`} href={item.href}>
                  {item.label}
                </FooterLink>
              ))}
            </FooterGroup>

            <FooterGroup title="Collections">
              {COLLECTIONS.map((item) => (
                <FooterLink key={`${item.label}-${item.href}`} href={item.href}>
                  {item.label}
                </FooterLink>
              ))}
            </FooterGroup>

            <FooterGroup title="Customer">
              {CUSTOMER.map((item) => (
                <FooterLink key={`${item.label}-${item.href}`} href={item.href}>
                  {item.label}
                </FooterLink>
              ))}
            </FooterGroup>

            <FooterGroup title="Contact">
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="saaq-transition hover:text-saaq-gold"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={getContactMailto()}
                  className="saaq-transition break-all hover:text-saaq-gold"
                >
                  {SAAQ_CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={getContactTel()}
                  className="saaq-transition hover:text-saaq-gold"
                >
                  {SAAQ_CONTACT.phone.display}
                </a>
              </li>
              <FooterLink href="/contact">Write to SAAQ</FooterLink>
              <li>
                <a
                  href={SAAQ_CONTACT.social.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="saaq-transition hover:text-saaq-gold"
                >
                  Instagram
                </a>
              </li>
            </FooterGroup>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="saaq-container flex flex-col gap-5 py-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="font-sans text-[11px] tracking-[0.12em] text-saaq-ivory/30">
            © <span suppressHydrationWarning>{currentYear}</span> SAAQ
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 font-sans text-[11px] uppercase tracking-[0.16em] text-saaq-ivory/35">
            {LEGAL.map((item) => (
              <li key={`${item.label}-${item.href}`}>
                <Link
                  href={item.href}
                  className="saaq-transition hover:text-saaq-gold"
                  onClick={scrollToTop}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-saaq-gold/50 to-transparent" />
    </footer>
  );
}

function scrollToTop() {
  if (typeof window === "undefined") {
    return;
  }

  window.scrollTo({ top: 0, left: 0 });
}

function FooterGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const panelId = `footer-${title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="border-b border-white/10 py-4 lg:border-0 lg:py-0">
      <button
        type="button"
        className="flex w-full cursor-pointer items-center justify-between font-sans text-[10px] uppercase tracking-[0.26em] text-saaq-gold lg:hidden"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
      >
        {title}
        <ChevronDown
          size={14}
          className={cn(
            "saaq-transition text-saaq-gold/70",
            open && "rotate-180"
          )}
        />
      </button>
      <p className="hidden font-sans text-[10px] uppercase tracking-[0.26em] text-saaq-gold lg:block">
        {title}
      </p>
      <ul
        id={panelId}
        className={cn(
          "mt-5 space-y-3 font-sans text-sm text-saaq-ivory/50 lg:mt-6 lg:block",
          open ? "block" : "hidden"
        )}
      >
        {children}
      </ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="saaq-transition hover:text-saaq-gold"
        onClick={scrollToTop}
      >
        {children}
      </Link>
    </li>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextEmail = email.trim().toLowerCase();

    if (!nextEmail) {
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email: nextEmail }),
      });
      const payload = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (response.status === 400) {
        setStatus("error");
        setMessage(payload.message || "Enter a valid email.");
        return;
      }

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to join the list.");
      }

      setStatus("success");
      setMessage(payload.message || "You are on the list. Welcome to SAAQ.");
      setEmail("");
    } catch (error) {
      const fallback = getNewsletterMailto(nextEmail);

      try {
        window.location.assign(fallback);
        setStatus("success");
        setMessage("Opening your email to finish joining the SAAQ list.");
        setEmail("");
      } catch {
        setStatus("error");
        setMessage(
          error instanceof Error
            ? error.message
            : "Unable to join the list right now."
        );
      }
    }
  };

  return (
    <div className="mt-12 max-w-md">
      <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-saaq-ivory/70">
        Join the SAAQ world
      </p>
      {status === "success" ? (
        <p className="mt-4 font-sans text-sm text-saaq-gold">{message}</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-4 flex flex-col border border-white/15 sm:flex-row"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (status === "error") {
                setStatus("idle");
                setMessage("");
              }
            }}
            placeholder="Email"
            aria-label="Email"
            autoComplete="email"
            disabled={status === "loading"}
            className="min-w-0 flex-1 bg-transparent px-4 py-3 font-sans text-sm text-saaq-ivory outline-none placeholder:text-saaq-ivory/30 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="saaq-transition bg-saaq-gold px-5 py-3 font-sans text-[10px] uppercase tracking-[0.2em] text-saaq-black hover:bg-saaq-gold-deep disabled:opacity-70 sm:py-0"
          >
            {status === "loading" ? "Joining" : "Subscribe"}
          </button>
        </form>
      )}
      {status === "error" && message ? (
        <p className="mt-3 font-sans text-sm text-saaq-gold">{message}</p>
      ) : null}
    </div>
  );
}

function SocialLink({
  href,
  label,
  className,
  children,
}: {
  href: string;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "saaq-transition flex h-10 w-10 items-center justify-center border border-white/15 hover:opacity-90",
        className
      )}
    >
      {children}
    </a>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <defs>
        <radialGradient
          id="footer-instagram-gradient"
          cx="30%"
          cy="107%"
          r="150%"
        >
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        fill="none"
        stroke="url(#footer-instagram-gradient)"
        strokeWidth="1.5"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        fill="none"
        stroke="url(#footer-instagram-gradient)"
        strokeWidth="1.5"
      />
      <circle cx="17.5" cy="6.5" r="1" fill="url(#footer-instagram-gradient)" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.05 4.91A9.9 9.9 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7zM12.05 20.15h-.01a8.18 8.18 0 0 1-4.17-1.14l-.3-.18-3.14.82.84-3.06-.2-.31a8.18 8.18 0 0 1-1.26-4.37c0-4.52 3.68-8.2 8.21-8.2 2.19 0 4.25.85 5.8 2.4a8.16 8.16 0 0 1 2.4 5.8c0 4.53-3.68 8.24-8.17 8.24m4.49-6.15c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.17.25-.64.8-.78.97-.14.16-.29.19-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.47c-.17 0-.43.06-.66.31-.22.25-.87.85-.87 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.28" />
    </svg>
  );
}
