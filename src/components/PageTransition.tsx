"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();
  const first = useRef(true);
  const [veil, setVeil] = useState(false);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }

    if (reduced) {
      return;
    }

    const show = window.setTimeout(() => setVeil(true), 0);
    const hide = window.setTimeout(() => setVeil(false), 780);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, [pathname, reduced]);

  return (
    <>
      <div key={pathname} className="saaq-page-enter min-w-0">
        {children}
      </div>
      {veil ? (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center bg-saaq-black/92 saaq-page-veil"
        >
          <p className="font-display text-4xl tracking-[0.28em] text-saaq-gold">
            SAAQ
          </p>
        </div>
      ) : null}
    </>
  );
}
