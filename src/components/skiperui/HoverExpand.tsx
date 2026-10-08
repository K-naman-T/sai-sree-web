/**
 * HoverExpand — adapted from Skiper UI "Skiper52 / HoverExpand_001"
 * (https://skiper-ui.com/r/skiper52.json, author @gurvinder-singh02, Skiper UI free
 * licence, attribution required). Restyled to the brand: square corners, hairline
 * borders, a solid ink title block instead of gradient overlays.
 *
 * Desktop pointer treatment. The caller renders a grid fallback below `lg`.
 */
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { SitePhoto } from "@/data/site";

interface HoverExpandProps {
  images: SitePhoto[];
  className?: string;
}

export function HoverExpand({ images, className }: HoverExpandProps) {
  const [active, setActive] = useState(0);

  return (
    <div className={cn("flex w-full items-stretch justify-center gap-1.5", className)}>
      {images.map((image, index) => {
        const isActive = active === index;
        return (
          <motion.div
            key={image.src}
            role="button"
            tabIndex={0}
            aria-label={image.caption}
            className="relative h-[24rem] cursor-pointer overflow-hidden border border-hairline bg-paper-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta lg:h-[28rem]"
            animate={{ width: isActive ? "30rem" : "4.5rem" }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            onClick={() => setActive(index)}
            onHoverStart={() => setActive(index)}
            onFocus={() => setActive(index)}
          >
            <img
              src={image.src}
              width={image.width}
              height={image.height}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <AnimatePresence>
              {isActive && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-x-0 bottom-0 block bg-ink px-4 py-3 font-display text-lg text-cream"
                >
                  {image.caption}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
