import { useState } from "react";
import { cn } from "@/lib/utils";
import type { SitePhoto } from "@/data/site";

export interface RailItem {
  id: string;
  number: string;
  serviceTitle: string;
  photo: SitePhoto;
}

/**
 * The contact sheet: every photograph the company supplied, one pane each, in
 * a single row. Hovering (or focusing) a pane opens it; the rest settle back
 * - a small nod to Aceternity UI's focus-cards
 * (https://ui.aceternity.com/components/focus-cards), rebuilt on plain flex so
 * the radius stays 0 and nothing gains a glow. On small screens the row is a
 * swipeable rail. Each pane jumps to that service's record below.
 */
export function PhotoRail({ items, className }: { items: RailItem[]; className?: string }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <nav aria-label="Site photographs by service" className={className}>
      <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:h-[24rem] lg:snap-none lg:gap-4 lg:overflow-visible lg:pb-0">
        {items.map((item, i) => (
          <li
            key={item.id}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{ flexGrow: hovered === i ? 2.4 : 1 }}
            className={cn(
              "min-w-0 shrink-0 basis-[72vw] snap-start sm:basis-[54vw]",
              "lg:flex lg:basis-0",
              "transition-[flex-grow,opacity,filter] duration-500 ease-out motion-reduce:transition-none",
              hovered !== null && hovered !== i && "lg:opacity-75 lg:saturate-50",
            )}
          >
            <a
              href={`#${item.id}`}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              className="group flex h-full w-full flex-col border border-hairline bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-terracotta"
            >
              <div className="h-[20rem] w-full overflow-hidden sm:h-[22rem] lg:h-auto lg:min-h-0 lg:flex-1">
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
              <div className="flex h-[4.5rem] flex-col justify-center gap-1 border-t border-hairline px-3.5 py-2">
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-ink-2">
                  {item.number}
                </span>
                <span className="line-clamp-2 text-[11.5px] leading-[1.3] text-ink">
                  {item.serviceTitle}
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
