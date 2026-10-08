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
