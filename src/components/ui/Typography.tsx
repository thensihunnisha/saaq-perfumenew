import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type TextProps = {
  children: ReactNode;
  className?: string;
  as?: "p" | "span" | "h1" | "h2" | "h3";
};

export function Eyebrow({ children, className, as: Tag = "p" }: TextProps) {
  return <Tag className={cn("saaq-eyebrow", className)}>{children}</Tag>;
}

export function DisplayHeading({
  children,
  className,
  as: Tag = "h1",
}: TextProps) {
  return <Tag className={cn("saaq-display", className)}>{children}</Tag>;
}

export function Heading({
  children,
  className,
  as: Tag = "h2",
}: TextProps) {
  return <Tag className={cn("saaq-h2", className)}>{children}</Tag>;
}

export function Body({ children, className, as: Tag = "p" }: TextProps) {
  return <Tag className={cn("saaq-body", className)}>{children}</Tag>;
}

export function Meta({ children, className, as: Tag = "p" }: TextProps) {
  return <Tag className={cn("saaq-meta", className)}>{children}</Tag>;
}
