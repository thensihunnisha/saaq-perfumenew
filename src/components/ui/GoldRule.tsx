import { cn } from "@/lib/cn";

type GoldRuleProps = {
  className?: string;
  wide?: boolean;
};

export default function GoldRule({ className, wide }: GoldRuleProps) {
  return (
    <div
      role="presentation"
      className={cn(wide ? "saaq-rule-wide" : "saaq-rule", className)}
    />
  );
}
