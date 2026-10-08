import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1400px] px-[clamp(18px,5vw,28px)]", className)}>
      {children}
    </div>
  );
}

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
  tone?: "paper" | "paper2";
  /** Draw a hairline across the top edge. On by default: the drawing-office grid. */
  bordered?: boolean;
}

export function Section({
  children,
  id,
  className,
  containerClassName,
  tone = "paper",
  bordered = true,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-20 lg:py-28",
        tone === "paper2" && "bg-paper-2",
        bordered && "border-t border-hairline",
        className,
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
