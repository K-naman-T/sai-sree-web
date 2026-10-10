import type { SitePhoto } from "@/data/site";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/magicui/BlurFade";

/**
 * PhotoWall — the Work page's plate compositions.
 *
 * Each group's photographs are shown together as one editorial wall instead of
 * a carousel: a 12-column grid on large screens with per-layout spans and
 * viewport-derived tile heights, so the whole wall (heading to last caption)
 * stays inside one screen and no photo is cropped beyond a mild editorial trim.
 * Reveals use the vendored Magic UI BlurFade component. Below lg every wall
 * falls back to a single column of framed plates.
 */
export type WallVariant =
  | "mosaic"
  | "duo"
  | "duo-flip"
  | "duo-cinema"
  | "duo-wide"
  | "rail"
  | "split"
  | "hang"
  | "featured"
  | "grid";

function Plate({
  photo,
  delay = 0,
  wrapperClassName,
  heightClassName,
  stretch = false,
}: {
  photo: SitePhoto;
  delay?: number;
  wrapperClassName?: string;
  heightClassName?: string;
  /** Fill the grid area (mosaic lead): the frame stretches, the image follows. */
  stretch?: boolean;
}) {
  const portrait = photo.height > photo.width;
  return (
    <BlurFade delay={delay} className={cn("min-w-0", wrapperClassName)}>
      <figure className={cn("group", stretch && "lg:flex lg:h-full lg:flex-col")}>
        <div
          className={cn(
            "overflow-hidden border border-hairline bg-paper-2",
            portrait ? "aspect-[4/5]" : "aspect-[3/2]",
            "lg:aspect-auto",
            stretch && "lg:min-h-0 lg:flex-1",
          )}
        >
          <img
            src={photo.src}
            width={photo.width}
            height={photo.height}
            alt={photo.alt}
            loading="lazy"
            decoding="async"
            className={cn(
              "h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transform-none motion-reduce:transition-none",
              heightClassName,
            )}
          />
        </div>
        <figcaption className="mt-3 text-[15px] leading-snug text-ink">{photo.caption}</figcaption>
      </figure>
    </BlurFade>
  );
}

export function PhotoWall({
  photos,
  variant = "grid",
  className,
}: {
  photos: SitePhoto[];
  variant?: WallVariant;
  className?: string;
}) {
  if (photos.length === 0) return null;
  const base = "grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-12 lg:gap-y-6";

  // Six plates: a tall lead beside two rows (one wide pair, one trio).
  if (variant === "mosaic" && photos.length >= 6) {
    const lead = photos.find((p) => p.height > p.width) ?? photos[0];
    const rest = photos.filter((p) => p !== lead).slice(0, 5);
    return (
      <div className={cn(base, className)}>
        <Plate
          photo={lead}
          delay={0}
          stretch
          wrapperClassName="col-span-full lg:col-span-3 lg:row-span-2"
        />
        <Plate
          photo={rest[0]}
          delay={0.06}
          wrapperClassName="col-span-full lg:col-span-5"
          heightClassName="lg:h-[clamp(240px,36vh,380px)]"
        />
        <Plate
          photo={rest[1]}
          delay={0.12}
          wrapperClassName="col-span-full lg:col-span-4"
          heightClassName="lg:h-[clamp(240px,36vh,380px)]"
        />
        <Plate
          photo={rest[2]}
          delay={0.18}
          wrapperClassName="col-span-full lg:col-span-3"
          heightClassName="lg:h-[clamp(150px,22vh,250px)]"
        />
        <Plate
          photo={rest[3]}
          delay={0.24}
          wrapperClassName="col-span-full lg:col-span-3"
          heightClassName="lg:h-[clamp(150px,22vh,250px)]"
        />
        <Plate
          photo={rest[4]}
          delay={0.3}
          wrapperClassName="col-span-full lg:col-span-3"
          heightClassName="lg:h-[clamp(150px,22vh,250px)]"
        />
      </div>
    );
  }

  // Two plates side by side; one dropped a step for an editorial stagger.
  if (
    (variant === "duo" || variant === "duo-flip" || variant === "duo-cinema") &&
    photos.length >= 2
  ) {
    const heightClassName =
      variant === "duo-cinema"
        ? "lg:h-[clamp(240px,44vh,480px)]"
        : "lg:h-[clamp(300px,55vh,600px)]";
    const dropIndex = variant === "duo-flip" ? 0 : 1;
    return (
      <div className={cn(base, className)}>
        {photos.slice(0, 2).map((photo, i) => (
          <Plate
            key={photo.src}
            photo={photo}
            delay={i * 0.06}
            wrapperClassName={cn("col-span-full lg:col-span-6", i === dropIndex && "lg:mt-10")}
            heightClassName={heightClassName}
          />
        ))}
      </div>
    );
  }

  // An unequal pair, bottom-aligned: a large plate and a smaller companion.
  if (variant === "duo-wide" && photos.length >= 2) {
    return (
      <div className={cn(base, "lg:items-end", className)}>
        <Plate
          photo={photos[0]}
          delay={0}
          wrapperClassName="col-span-full lg:col-span-7"
          heightClassName="lg:h-[clamp(300px,55vh,600px)]"
        />
        <Plate
          photo={photos[1]}
          delay={0.06}
          wrapperClassName="col-span-full lg:col-span-5"
          heightClassName="lg:h-[clamp(240px,46vh,500px)]"
        />
      </div>
    );
  }

  // Three plates in a rail, tops aligned, each near its native height.
  if (variant === "rail" && photos.length >= 3) {
    const heights = [
      "lg:h-[clamp(200px,36vh,400px)]",
      "lg:h-[clamp(200px,36vh,400px)]",
      "lg:h-[clamp(140px,27vh,300px)]",
    ];
    return (
      <div className={cn(base, className)}>
        {photos.slice(0, 3).map((photo, i) => (
          <Plate
            key={photo.src}
            photo={photo}
            delay={i * 0.06}
            wrapperClassName="col-span-full lg:col-span-4"
            heightClassName={heights[i]}
          />
        ))}
      </div>
    );
  }

  // One tall plate hung beside a stack of two.
  if (variant === "split" && photos.length >= 3) {
    const [big, a, b] = photos;
    return (
      <div className={cn(base, className)}>
        <Plate
          photo={big}
          delay={0}
          wrapperClassName="col-span-full lg:col-span-6 lg:row-span-2 lg:self-center"
          heightClassName="lg:h-[clamp(300px,55vh,600px)]"
        />
        <Plate
          photo={a}
          delay={0.06}
          wrapperClassName="col-span-full lg:col-span-6"
          heightClassName="lg:h-[clamp(170px,30vh,330px)]"
        />
        <Plate
          photo={b}
          delay={0.12}
          wrapperClassName="col-span-full lg:col-span-6"
          heightClassName="lg:h-[clamp(170px,30vh,330px)]"
        />
      </div>
    );
  }

  // Portrait hung among two landscape plates, all centred on a common axis.
  if (variant === "hang" && photos.length >= 3) {
    const tall = photos.find((p) => p.height > p.width) ?? photos[0];
    const rest = photos.filter((p) => p !== tall);
    return (
      <div className={cn(base, "lg:items-center", className)}>
        <Plate
          photo={tall}
          delay={0}
          wrapperClassName="col-span-full lg:col-span-3"
          heightClassName="lg:h-[clamp(320px,56vh,620px)]"
        />
        <Plate
          photo={rest[0]}
          delay={0.06}
          wrapperClassName="col-span-full lg:col-span-5"
          heightClassName="lg:h-[clamp(190px,34vh,380px)]"
        />
        <Plate
          photo={rest[1]}
          delay={0.12}
          wrapperClassName="col-span-full lg:col-span-4"
          heightClassName="lg:h-[clamp(220px,36vh,400px)]"
        />
      </div>
    );
  }

  // A feature plate with two details beside it.
  if (variant === "featured" && photos.length >= 3) {
    return (
      <div className={cn(base, "lg:items-center", className)}>
        <Plate
          photo={photos[0]}
          delay={0}
          wrapperClassName="col-span-full lg:col-span-6"
          heightClassName="lg:h-[clamp(280px,55vh,600px)]"
        />
        <Plate
          photo={photos[1]}
          delay={0.06}
          wrapperClassName="col-span-full lg:col-span-3"
          heightClassName="lg:h-[clamp(150px,27vh,300px)]"
        />
        <Plate
          photo={photos[2]}
          delay={0.12}
          wrapperClassName="col-span-full lg:col-span-3"
          heightClassName="lg:h-[clamp(150px,27vh,300px)]"
        />
      </div>
    );
  }

  // Fallback: a plain wall of equal plates, three to a row.
  return (
    <div className={cn(base, className)}>
      {photos.map((photo, i) => (
        <Plate
          key={photo.src}
          photo={photo}
          delay={Math.min(i, 6) * 0.05}
          wrapperClassName="col-span-full lg:col-span-4"
          heightClassName="lg:h-[clamp(180px,32vh,340px)]"
        />
      ))}
    </div>
  );
}
