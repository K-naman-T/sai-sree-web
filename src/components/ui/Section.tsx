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
   * The band's plate: a decorative image laid full-bleed under the content as
   * a pale struck print — desaturated into the paper (mix-blend-multiply) and
   * released toward the right where the text clears it. Always alt="", never
   * one of the company's own site photographs. Hidden below md.
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
        <>
          {/* The plate is scaled past its painted frame edge so only artwork
              shows; the wrapper clips the overflow. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block"
          >
            <img
              src={texture.src}
              width={texture.width}
              height={texture.height}
              alt=""
              loading="lazy"
              decoding="async"
              className={cn(
                "h-full w-full scale-[1.28] select-none object-cover opacity-[0.6] mix-blend-multiply [filter:grayscale(1)_sepia(0.3)_brightness(1.24)_contrast(1.02)]",
                textureClassName,
              )}
            />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-paper via-paper/82 to-paper/15 md:block"
          />
        </>
      )}
      <Container className={cn("relative", containerClassName)}>{children}</Container>
    </section>
  );
}
