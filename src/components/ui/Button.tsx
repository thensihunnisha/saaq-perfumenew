import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

const variants = {
  gold:
    "border border-saaq-gold bg-saaq-gold text-saaq-black hover:bg-saaq-gold-deep hover:border-saaq-gold-deep",
  outline:
    "border border-saaq-gold bg-transparent text-saaq-gold hover:bg-saaq-gold hover:text-saaq-black",
  ghost:
    "border border-white/15 bg-transparent text-saaq-ivory/70 hover:border-saaq-gold hover:text-saaq-gold",
} as const;

const sizes = {
  sm: "px-5 py-2.5 text-[9px]",
  md: "px-7 py-3.5 text-[10px]",
  lg: "px-9 py-4 text-[10px] sm:px-10 sm:py-[1.125rem]",
} as const;

type ButtonVariant = keyof typeof variants;
type ButtonSize = keyof typeof sizes;

type SharedProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

function buttonClassName({
  className,
  variant = "gold",
  size = "md",
}: Omit<SharedProps, "children">) {
  return cn(
    "saaq-btn saaq-transition inline-flex items-center justify-center text-center font-sans font-medium uppercase tracking-[0.18em] sm:tracking-[0.28em]",
    variants[variant],
    sizes[size],
    className
  );
}

type ButtonProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonLinkProps = SharedProps & {
  href: string;
};

export default function Button({
  children,
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonClassName({ className, variant, size })}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  children,
  className,
  variant,
  size,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={buttonClassName({ className, variant, size })}
    >
      {children}
    </Link>
  );
}
