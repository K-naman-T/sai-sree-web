import { cn } from "@/lib/utils";

/** The five-step process as a hairline drawing-office rail. Order carries the sequence. */
export function StepsRail({ steps, className }: { steps: string[]; className?: string }) {
  return (
    <ol
      aria-label="How a job starts, in order"
      className={cn(
        "grid grid-cols-1 gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-5",
        className,
      )}
    >
      {steps.map((step) => (
        <li key={step} className="flex flex-col gap-7 bg-paper p-6 lg:p-7">
          <span className="flex items-center gap-3" aria-hidden="true">
            <span className="h-[3px] w-8 bg-terracotta" />
            <span className="h-[7px] w-[7px] border border-gold" />
          </span>
          <span className="font-display text-[1.3rem] leading-snug">{step}</span>
        </li>
      ))}
    </ol>
  );
}
