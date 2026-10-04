"use client";

import { useRef, type ReactNode } from "react";
import { useParallaxTransform } from "@/hooks/useParallaxTransform";
import { cn } from "@/lib/cn";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  speed?: number;
  scaleFactor?: number;
};

export default function Parallax({
  children,
  className,
  speed = 0.18,
  scaleFactor = 0,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  useParallaxTransform(ref, speed, scaleFactor);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
