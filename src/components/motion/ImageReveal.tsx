"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

type ImageRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function ImageReveal({
  children,
  className,
  delay,
}: ImageRevealProps) {
  return (
    <Reveal variant="image" className={className} delay={delay}>
      {children}
    </Reveal>
  );
}
