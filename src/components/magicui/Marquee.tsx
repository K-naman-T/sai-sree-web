/**
 * Marquee — sourced from Magic UI (https://magicui.design) by Dillion Verma,
 * distributed on 21st.dev (https://21st.dev/@dillionverma/components/marquee). MIT.
 * Adapted: brand tokens (--duration / --gap), no default padding, square styling.
 */
import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: ReactNode;
  vertical?: boolean;
  /** Number of times to repeat the content. @default 4 */
  repeat?: number;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex gap-[var(--gap)] overflow-hidden p-0 [--duration:42s] [--gap:3.5rem]",
        { "flex-row": !vertical, "flex-col": vertical },
        className,
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around gap-[var(--gap)]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
