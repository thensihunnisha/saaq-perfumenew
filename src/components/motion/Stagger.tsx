"use client";

import { Children, type ReactNode } from "react";
import Reveal from "@/components/Reveal";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  step?: number;
  variant?: "up" | "fade" | "scale";
};

export default function Stagger({
  children,
  className,
  delay = 0,
  step = 90,
  variant = "up",
}: StaggerProps) {
  return (
    <div className={className}>
      {Children.map(children, (child, index) => (
        <Reveal variant={variant} delay={delay + index * step}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
