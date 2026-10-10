import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowRight } from "./icons";

type Variant = "solid" | "quiet" | "cream";
type Size = "md" | "lg";

const BASE =
  "group inline-flex shrink-0 items-center justify-center gap-4 border font-body font-semibold uppercase transition-colors duration-200";
const SIZES: Record<Size, string> = {
  md: "h-12 px-7 text-[12.5px] tracking-[0.16em]",
  lg: "h-14 px-9 text-[13px] tracking-[0.18em]",
};

const VARIANTS: Record<Variant, string> = {
  solid: "border-terracotta bg-terracotta text-cream hover:border-ink hover:bg-ink",
  quiet: "border-terracotta bg-transparent text-terracotta hover:bg-terracotta hover:text-cream",
  cream: "border-cream bg-cream text-ink hover:border-terracotta hover:bg-terracotta hover:text-cream",
};

interface ButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: Variant;
  /** lg for a page's closing action; md (default) inline. */
  size?: Size;
  className?: string;
  withArrow?: boolean;
  "aria-label"?: string;
  onClick?: () => void;
}

export function Button({
  children,
  to,
  href,
  variant = "solid",
  size = "md",
  className,
  withArrow = true,
  onClick,
  ...rest
}: ButtonProps) {
  const classes = cn(BASE, SIZES[size], VARIANTS[variant], className);
  const inner = (
    <>
      <span>{children}</span>
      {withArrow && (
        <span aria-hidden="true" className="flex items-center gap-3">
          <span className="h-4 w-px bg-current opacity-40" />
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick} {...rest}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" className={classes} onClick={onClick} {...rest}>
      {inner}
    </button>
  );
}

/** A quiet inline text link with a hairline underline that fills on hover. */
export function TextLink({
  to,
  children,
  className,
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "group inline-flex min-h-[44px] items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-terracotta",
        className,
      )}
    >
      <span className="border-b border-transparent pb-1 transition-colors group-hover:border-terracotta">
        {children}
      </span>
      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  );
}
