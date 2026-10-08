import { cn } from "@/lib/utils";
import type { Plate } from "@/data/site";

interface FramedImageProps {
  plate: Plate;
  /**
   * Aspect-ratio utility for the window, e.g. "aspect-[16/9]". Optional: when
   * omitted the window takes the plate's own aspect ratio so the whole painted
   * border shows and nothing is cropped.
   */
  ratioClassName?: string;
  className?: string;
  imgClassName?: string;
  /** Load eagerly (above the fold). */
  priority?: boolean;
}

/**
 * An art plate set flush in the band ground. No mount, no shadow and no added
 * border: the plate's own painted border is the frame. The window matches the
 * plate's aspect ratio so the painted edge is never cropped, and the image fills
 * its window edge to edge.
 */
export function FramedImage({
  plate,
  ratioClassName,
  className,
  imgClassName,
  priority = false,
}: FramedImageProps) {
  return (
    <div
      className={cn("overflow-hidden", ratioClassName, className)}
      style={ratioClassName ? undefined : { aspectRatio: `${plate.width} / ${plate.height}` }}
    >
      <img
        src={plate.src}
        width={plate.width}
        height={plate.height}
        alt={plate.alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={cn("h-full w-full object-cover", imgClassName)}
      />
    </div>
  );
}
