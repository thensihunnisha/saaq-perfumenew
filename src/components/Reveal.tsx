"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type RevealVariant = "up" | "fade" | "left" | "right" | "scale" | "image";

type RevealProps = {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
};

export default function Reveal({
  children,
  className,
  variant = "up",
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) {
      node.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const style =
    delay > 0
      ? ({ "--saaq-reveal-delay": `${delay}ms` } as CSSProperties)
      : undefined;

  return (
    <div
      ref={ref}
      data-reveal={variant}
      style={style}
      className={cn("saaq-reveal", className)}
    >
      {children}
    </div>
  );
}
