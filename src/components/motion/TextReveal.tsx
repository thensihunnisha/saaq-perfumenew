"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type TextRevealMode = "words" | "lines";

type TextRevealProps = {
  text?: string;
  lines?: string[];
  mode?: TextRevealMode;
  className?: string;
  delay?: number;
  step?: number;
  as?: "p" | "h1" | "h2" | "h3" | "div";
  children?: ReactNode;
};

export default function TextReveal({
  text,
  lines,
  mode = "words",
  className,
  delay = 0,
  step = 70,
  as: Tag = "p",
  children,
}: TextRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const units =
    mode === "lines"
      ? (lines ?? (text ? text.split("\n") : []))
      : (text ?? "").split(/\s+/).filter(Boolean);

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
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (children) {
    return (
      <Tag
        ref={ref as never}
        className={cn("saaq-reveal", className)}
        style={
          delay > 0
            ? ({ "--saaq-reveal-delay": `${delay}ms` } as CSSProperties)
            : undefined
        }
      >
        {children}
      </Tag>
    );
  }

  return (
    <Tag ref={ref as never} className={cn("saaq-text-reveal", className)}>
      {units.map((unit, index) => (
        <span
          key={`${unit}-${index}`}
          className={cn(
            "saaq-text-reveal-unit",
            mode === "lines" && "block"
          )}
          style={
            {
              "--saaq-reveal-delay": `${delay + index * step}ms`,
            } as CSSProperties
          }
        >
          <span className="saaq-text-reveal-inner">{unit}</span>
          {mode === "words" && index < units.length - 1 ? "\u00a0" : null}
        </span>
      ))}
    </Tag>
  );
}
