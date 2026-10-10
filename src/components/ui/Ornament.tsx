import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { borderMotif, frieze } from "@/data/site";

/** FRIEZE-5STATIONS: a full-bleed ornament band used above the five-step list. */
export function Frieze({ className }: { className?: string }) {
  return (
    <div className={cn("border-y border-hairline bg-paper-2", className)} aria-hidden="true">
      <img
        src={frieze.src}
        width={frieze.width}
        height={frieze.height}
        alt=""
        loading="lazy"
        decoding="async"
        className="block h-auto w-full"
      />
    </div>
  );
}

/** BORDER-MOTIF: a thin Rangoli rule used as a section break. */
export function BorderRule({ className }: { className?: string }) {
  return (
    <div className={cn("w-full", className)} aria-hidden="true">
      <img
        src={borderMotif.src}
        width={borderMotif.width}
        height={borderMotif.height}
        alt=""
        loading="lazy"
        decoding="async"
        className="block h-auto w-full"
      />
    </div>
  );
}

/** BORDER-MOTIF as a full-bleed divider band carrying the band rhythm. */
export function MotifBand({ className }: { className?: string }) {
  return (
    <div className={cn("border-y border-hairline bg-paper-2", className)} aria-hidden="true">
      <img
        src={borderMotif.src}
        width={borderMotif.width}
        height={borderMotif.height}
        alt=""
        loading="lazy"
        decoding="async"
        className="block h-auto w-full"
      />
    </div>
  );
}

/**
 * A positioning pull-quote: oversized italic display type on a terracotta
 * rule. Used to occupy what would otherwise be a dead band with intent.
 */
export function PullQuote({
  children,
  className,
  quoteClassName,
}: {
  children: ReactNode;
  className?: string;
  quoteClassName?: string;
}) {
  return (
    <figure className={cn("relative max-w-[26ch] border-l-2 border-terracotta pl-6", className)}>
      <blockquote
        className={cn(
          "text-balance font-display text-[clamp(1.5rem,3.2vw,2.6rem)] italic leading-[1.18] text-ink",
          quoteClassName,
        )}
      >
        {children}
      </blockquote>
    </figure>
  );
}
