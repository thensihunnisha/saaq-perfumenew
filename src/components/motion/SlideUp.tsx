"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

type SlideUpProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function SlideUp({ children, className, delay }: SlideUpProps) {
  return (
    <Reveal variant="up" className={className} delay={delay}>
      {children}
    </Reveal>
  );
}
