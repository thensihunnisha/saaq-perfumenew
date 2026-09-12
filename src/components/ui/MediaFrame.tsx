import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type MediaFrameProps = {
  children: ReactNode;
  className?: string;
  aspect?: string;
};

export default function MediaFrame({
  children,
  className,
  aspect = "aspect-[16/9]",
}: MediaFrameProps) {
  return (
    <div className={cn("saaq-frame", aspect, className)}>{children}</div>
  );
}
