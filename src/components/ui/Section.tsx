import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Plate } from "@/data/site";

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
  /**
   * Optional gradient-wash utility (e.g. "wash-ochre-up"). Rendered as a
   * full-bleed layer over the band ground, under the content. Tints are <=8%.
   */
  wash?: string;
  /**
   * Optional decorative plate laid in a text-free zone at low opacity, so a
   * band does not read as empty. Always alt="".
   */
  texture?: Plate;
  textureClassName?: string;
}

export function Section({
  children,
  id,
  className,
  containerClassName,
  tone = "paper",
  bordered = true,
  wash,
  texture,
  textureClassName,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-14 sm:py-16 lg:py-20",
        tone === "paper2" && "bg-paper-2",
        bordered && "border-t border-hairline",
        className,
      )}
    >
      {wash && <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0", wash)} />}
      {texture && (
        <img
          src={texture.src}
          width={texture.width}
          height={texture.height}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className={cn(
            "pointer-events-none absolute select-none object-cover opacity-[0.14]",
            textureClassName,
          )}
        />
      )}
      <Container className={cn("relative", containerClassName)}>{children}</Container>
    </section>
  );
}
