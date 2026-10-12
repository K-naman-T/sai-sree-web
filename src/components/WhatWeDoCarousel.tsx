import { useCallback, useEffect, useState } from "react";
import type { KeyboardEvent } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { GlareHover } from "@/components/magicui/GlareHover";
import { whatWeDo } from "@/data/site";

/**
 * "What we do" — the design services, one slide each: a photograph from the
 * company's own sites in a paper mount, with the name and a line beside it.
 * A quiet carousel: it advances on its own (~7s), pauses on hover or focus, and
 * holds still under prefers-reduced-motion. The names above the frame are the
 * navigation — no counters and no arrows (house call, R12b). Slides are stacked
 * in one grid cell so the frame height is the tallest slide's: no jump between
 * slides, and hand-rolled rather than a slider library so nothing lands
 * absolutely-positioned under the capture and dead-space gates.
 */
const DELAY = 7000;

export function WhatWeDoCarousel({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = whatWeDo.length;

  useEffect(() => {
    if (reduceMotion || paused || count < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), DELAY);
    return () => window.clearInterval(id);
  }, [reduceMotion, paused, count]);

  const select = useCallback((i: number) => setIndex(i), []);

  const onTabKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      const next = event.key === "ArrowRight" ? (index + 1) % count : (index - 1 + count) % count;
      select(next);
      const tab = document.getElementById(`wwd-tab-${whatWeDo[next].id}`);
      tab?.focus();
    },
    [count, index, select],
  );

  return (
    <div
      className={className}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        role="tablist"
        aria-label="What we do"
        onKeyDown={onTabKeyDown}
        className="flex flex-wrap items-center gap-x-10 border-b border-hairline"
      >
        {whatWeDo.map((item, i) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`wwd-tab-${item.id}`}
            aria-selected={i === index}
            aria-controls={`wwd-panel-${item.id}`}
            onClick={() => select(i)}
            className={cn(
              "-mb-px min-h-[44px] border-b-2 pt-1 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors",
              i === index
                ? "border-terracotta text-ink"
                : "border-transparent text-ink-2 hover:text-ink",
            )}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className="grid pt-8 lg:pt-10">
        {whatWeDo.map((item, i) => (
          <div
            key={item.id}
            role="tabpanel"
            id={`wwd-panel-${item.id}`}
            aria-labelledby={`wwd-tab-${item.id}`}
            aria-hidden={i !== index}
            className={cn(
              "col-start-1 row-start-1 transition-opacity duration-700 ease-out motion-reduce:transition-none",
              i === index ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
              <div className="lg:col-span-6">
                <GlareHover className="border border-hairline bg-paper">
                  <div className="aspect-[3/2] w-full overflow-hidden">
                    <img
                      src={item.photo.src}
                      width={item.photo.width}
                      height={item.photo.height}
                      alt={item.photo.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </GlareHover>
                <p className="mt-3 text-[11.5px] leading-snug text-ink-2">{item.photo.caption}</p>
              </div>
              <div className="lg:col-span-5 lg:col-start-8">
                <h3 className="text-balance font-display text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.08]">
                  {item.title}
                </h3>
                <p className="mt-5 max-w-[38ch] text-ink-2">{item.line}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
