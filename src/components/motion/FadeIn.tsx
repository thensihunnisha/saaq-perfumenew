"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function FadeIn({ children, className, delay }: FadeInProps) {
  return (
    <Reveal variant="fade" className={className} delay={delay}>
      {children}
    </Reveal>
  );
}
