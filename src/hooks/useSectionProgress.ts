"use client";

import { useEffect, useState, type RefObject } from "react";

export function useSectionProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let ticking = false;

    const update = () => {
      ticking = false;

      if (motion.matches) {
        setProgress(0.5);
        return;
      }

      const rect = node.getBoundingClientRect();
      const span = window.innerHeight + rect.height;
      const next = span <= 0 ? 0 : 1 - (rect.bottom + window.innerHeight * 0.1) / span;
      setProgress(Math.min(1, Math.max(0, next)));
    };

    const onScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    motion.addEventListener("change", update);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      motion.removeEventListener("change", update);
    };
  }, [ref]);

  return progress;
}
