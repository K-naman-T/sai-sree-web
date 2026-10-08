/**
 * BentoGrid / BentoCard — sourced from Magic UI (https://magicui.design) by
 * Dillion Verma, distributed on 21st.dev
 * (https://21st.dev/community/components/s/features). Adapted: square corners,
 * hairline borders, brand tokens, plate imagery, no shadows or rounded corners.
 */
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowRight } from "@/components/ui/icons";
import type { Plate } from "@/data/site";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className, ...props }: BentoGridProps) {
  return (
    <div
      className={cn("grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}

interface BentoCardProps {
  name: string;
  description: string;
  plate: Plate;
  href: string;
  cta: string;
  className?: string;
}

export function BentoCard({ name, description, plate, href, cta, className }: BentoCardProps) {
  return (
    <Link
      to={href}
      className={cn(
        "group flex flex-col border border-hairline bg-paper transition-colors duration-200 hover:border-terracotta",
        className,
      )}
    >
      <div className="aspect-square overflow-hidden border-b border-hairline bg-paper-2">
        <img
          src={plate.src}
          width={plate.width}
          height={plate.height}
          alt={plate.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <h3 className="font-display text-[1.3rem] leading-snug">{name}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{description}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-terracotta">
          {cta}
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
