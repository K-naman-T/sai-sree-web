import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import type { Plate } from "@/data/site";

/** The oversized closing statement of a talk band. */
export function TalkLine({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "max-w-[24ch] text-balance font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.12]",
        className,
      )}
    >
      {children}
    </p>
  );
}

/**
 * The closing call of a page: whatever the page says last, on the left, and
 * one clear action on the right — over a struck plate and a terracotta wash.
 */
export function TalkBand({
  children,
  action = "Get in touch",
  to = "/contact",
  texture,
  bordered = true,
  className,
}: {
  children: ReactNode;
  action?: string;
  to?: string;
  texture?: Plate;
  bordered?: boolean;
  className?: string;
}) {
  return (
    <Section
      tone="paper2"
      bordered={bordered}
      wash="wash-terracotta-up"
      texture={texture}
      className={className}
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">{children}</div>
        <div className="lg:col-span-4 lg:text-right">
          <Button to={to} size="lg">
            {action}
          </Button>
        </div>
      </div>
    </Section>
  );
}
