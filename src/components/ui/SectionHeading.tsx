import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TextLink } from "./Button";

interface SectionHeadingProps {
  children: ReactNode;
  as?: "h1" | "h2";
  link?: { to: string; label: string };
  /** Optional right-hand content on the same row (a short note or blurb). */
  aside?: ReactNode;
  className?: string;
  /** Short gold rule above the heading. Ornament, not an eyebrow label. */
  rule?: boolean;
}

export function SectionHeading({
  children,
  as = "h2",
  link,
  aside,
  className,
  rule = true,
}: SectionHeadingProps) {
  const Heading = as;
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-x-10 gap-y-6", className)}>
      <div className="min-w-0">
        {rule && <span className="mb-5 block h-[3px] w-14 bg-gold" aria-hidden="true" />}
        <Heading
          className={cn(
            "text-balance",
            as === "h1"
              ? "text-[clamp(2.4rem,6vw,4.75rem)] leading-[1.02]"
              : "text-[clamp(1.85rem,3.4vw,3rem)] leading-[1.06]",
          )}
        >
          {children}
        </Heading>
      </div>
      {link && (
        <TextLink to={link.to} className="mb-2">
          {link.label}
        </TextLink>
      )}
      {aside && <div className="mb-1 min-w-0">{aside}</div>}
    </div>
  );
}
