import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionProps = {
  children: ReactNode;
  className?: string;
  muted?: boolean;
};

export default function Section({ children, className, muted }: SectionProps) {
  return (
    <section
      className={cn(
        "saaq-section",
        muted ? "bg-saaq-void" : "bg-saaq-black",
        className
      )}
    >
      {children}
    </section>
  );
}
