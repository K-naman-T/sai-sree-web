import { cn } from "@/lib/utils";

/**
 * The five-step process as a hairline drawing-office rail. Order carries the
 * sequence, so each station leads with its oversized numeral: the rank is the
 * meaning, not decoration.
 */
export function StepsRail({ steps, className }: { steps: string[]; className?: string }) {
  return (
    <ol
      aria-label="How a job starts, in order"
      className={cn(
        "grid grid-cols-1 gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-5",
        className,
      )}
    >
      {steps.map((step, index) => (
        <li key={step} className="flex flex-col gap-6 bg-paper p-6 lg:p-7">
          <span
            aria-hidden="true"
            className="font-display text-[clamp(2.4rem,4.2vw,3.4rem)] font-semibold leading-[0.9] tabular-nums text-terracotta/30"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="h-px w-full bg-hairline" aria-hidden="true" />
          <span className="font-display text-[1.25rem] leading-snug">{step}</span>
        </li>
      ))}
    </ol>
  );
}
