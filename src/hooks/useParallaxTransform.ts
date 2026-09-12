"use client";

import { useEffect, type RefObject } from "react";

export function useParallaxTransform(
  layerRef: RefObject<HTMLElement | null>,
  speed: number,
  scaleFactor = 0
) {
  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) {
      return;
    }

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let ticking = false;

    const update = () => {
      ticking = false;

      if (motion.matches) {
        layer.style.transform = "";
        return;
      }

      const y = window.scrollY;
      const scale = scaleFactor ? 1 + Math.min(y, 700) * scaleFactor : 1;
      layer.style.transform = scaleFactor
        ? `translate3d(0, ${y * speed}px, 0) scale(${scale})`
        : `translate3d(0, ${y * speed}px, 0)`;
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
    motion.addEventListener("change", update);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      motion.removeEventListener("change", update);
    };
  }, [layerRef, scaleFactor, speed]);
}
