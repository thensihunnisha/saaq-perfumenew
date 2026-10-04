"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function LuxuryCursor() {
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const [expanded, setExpanded] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const frame = useRef(0);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const wide = window.matchMedia("(min-width: 1024px)");
    const update = () => setEnabled(fine.matches && wide.matches && !reduced);

    update();
    fine.addEventListener("change", update);
    wide.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      wide.removeEventListener("change", update);
    };
  }, [reduced]);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove("saaq-luxury-cursor");
      return;
    }

    document.documentElement.classList.add("saaq-luxury-cursor");

    const render = () => {
      const node = cursorRef.current;
      if (node) {
        node.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      frame.current = window.requestAnimationFrame(render);
    };

    const onMove = (event: MouseEvent) => {
      pos.current = { x: event.clientX, y: event.clientY };
      const target = event.target;
      if (!(target instanceof Element)) {
        setExpanded(false);
        setLabel("");
        return;
      }

      const view = target.closest("[data-cursor='view']");
      const interactive = target.closest("a, button, [role='button']");
      setExpanded(Boolean(view || interactive));
      setLabel(view ? "VIEW" : "");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    frame.current = window.requestAnimationFrame(render);

    return () => {
      document.documentElement.classList.remove("saaq-luxury-cursor");
      window.removeEventListener("mousemove", onMove);
      window.cancelAnimationFrame(frame.current);
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      aria-hidden
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-[90] hidden -translate-x-1/2 -translate-y-1/2 lg:block",
        expanded ? "saaq-cursor-on" : ""
      )}
    >
      <div
        className={cn(
          "saaq-transition flex h-4 w-4 items-center justify-center rounded-full border border-saaq-gold/70 bg-saaq-gold/15",
          expanded && "h-16 w-16 bg-saaq-gold/10"
        )}
      >
        {label ? (
          <span className="font-sans text-[8px] uppercase tracking-[0.28em] text-saaq-ivory">
            {label}
          </span>
        ) : null}
      </div>
    </div>
  );
}
