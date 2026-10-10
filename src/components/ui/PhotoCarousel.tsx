import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SitePhoto } from "@/data/site";

const DEFAULT_LABEL = "Site photographs";
const DEFAULT_ASPECT = "aspect-[3/2]";

const CONTROL_BUTTON =
  "inline-flex size-11 shrink-0 items-center justify-center border border-hairline bg-paper text-ink transition-colors duration-200 hover:bg-paper-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta disabled:cursor-not-allowed disabled:opacity-40";

const TRACK =
  "flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

/** True when the visitor asked for reduced motion; scrolls then jump instead. */
function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * A photograph carousel cut to the drawing-office line: one hairline frame
 * over a horizontal snap scroller with no visible scrollbar, and beneath it
 * the active caption, a count and two squared paddles. The active plate is
 * derived from scroll position, so wheel, drag, arrows and the dots never
 * disagree. No radius, no shadow; every scroll respects reduced motion.
 * On small screens the caption takes its own line and the controls drop
 * below it. Paddles and dots hold 44px hit areas on every viewport; the
 * dot marks themselves stay hairline-thin and hug the top of their hit area.
 */
export function PhotoCarousel({
  photos,
  label = DEFAULT_LABEL,
  className,
  aspectClassName = DEFAULT_ASPECT,
}: {
  photos: SitePhoto[];
  label?: string;
  className?: string;
  aspectClassName?: string;
}): JSX.Element | null {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [active, setActive] = useState(0);

  const updateActive = useCallback(() => {
    const track = trackRef.current;
    if (!track || photos.length === 0) return;
    const width = track.clientWidth;
    if (width === 0) return;
    const index = Math.round(track.scrollLeft / width);
    setActive(Math.min(Math.max(index, 0), photos.length - 1));
  }, [photos.length]);

  // The active index is always read off the scroll position, never stored on
  // click, so every way of moving the track agrees. The scroll listener is
  // rAF-throttled; a resize re-measures the same way.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const schedule = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        updateActive();
      });
    };
    track.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      track.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [updateActive]);

  if (photos.length === 0) return null;

  const activeIndex = Math.min(active, photos.length - 1);
  const activePhoto = photos[activeIndex];
  const hasControls = photos.length > 1;

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.min(Math.max(index, 0), photos.length - 1);
    track.scrollTo({
      left: clamped * track.clientWidth,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  const step = (direction: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({
      left: direction * track.clientWidth,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    } else if (event.key === "Home") {
      event.preventDefault();
      scrollToIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      scrollToIndex(photos.length - 1);
    }
  };

  return (
    <div className={cn("relative", className)}>
      <div className="border border-hairline bg-paper-2">
        <div
          ref={trackRef}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label={label}
          onKeyDown={onKeyDown}
          className={TRACK}
        >
          {photos.map((photo, index) => (
            <div
              key={`${photo.src}-${index}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${photos.length}`}
              className="w-full shrink-0 snap-start"
            >
              <div className={cn("overflow-hidden", aspectClassName)}>
                <img
                  src={photo.src}
                  width={photo.width}
                  height={photo.height}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="h-full w-full select-none object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2.5 sm:flex-nowrap sm:items-start">
        <p
          aria-live="polite"
          className="min-h-[2.75em] w-full text-[15px] leading-snug text-ink sm:w-auto sm:flex-1"
        >
          {activePhoto.caption}
        </p>
        {hasControls && (
          <div className="flex w-full items-center gap-3 sm:w-auto sm:shrink-0">
            <span className="text-[13px] tabular-nums text-ink-2">
              {activeIndex + 1} / {photos.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous photograph"
                onClick={() => step(-1)}
                disabled={activeIndex === 0}
                className={CONTROL_BUTTON}
              >
                <ChevronLeft size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Next photograph"
                onClick={() => step(1)}
                disabled={activeIndex === photos.length - 1}
                className={CONTROL_BUTTON}
              >
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>

      {hasControls && (
        <div className="-ml-1.5 mt-3 flex items-center gap-1">
          {photos.map((photo, index) => (
            <button
              key={`dot-${photo.src}-${index}`}
              type="button"
              aria-label={`Go to photograph ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => scrollToIndex(index)}
              className="flex h-11 items-start px-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
            >
              <span
                className={cn(
                  "block h-1.5 w-4 border transition-colors duration-200",
                  index === activeIndex
                    ? "border-ink bg-ink"
                    : "border-hairline bg-transparent hover:border-ink-2",
                )}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
