import type { SitePhoto } from "@/data/site";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/magicui/BlurFade";
import type { WallVariant } from "@/components/ui/wallPlan";

/**
 * PhotoWall — renders a group's photographs as one editorial wall.
 *
 * The composition is not hand-picked per page: callers pass photographs and
 * the variant the planner suggests (src/components/ui/wallPlan.ts), and the
 * wall below draws it. Layouts are a 12-column grid on large screens with
 * viewport-derived tile heights, so a normal group keeps its whole section
 * inside one screen and no photo is cropped beyond a mild editorial trim.
 * Below lg every wall falls back to a single column of framed plates; groups
 * of nine or more plates flow past the viewport because they have to.
 *
 * Plates reveal with the vendored Magic UI BlurFade; captions sit under each.
 */
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
  variant = "grid-many",
  className,
}: {
  photos: SitePhoto[];
  variant?: WallVariant;
  className?: string;
}) {
  if (photos.length === 0) return null;
  const base = "grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-12 lg:gap-y-6";
  const d = (i: number) => Math.min(i * 0.06, 0.3);

  // One plate: a wide centred window for a landscape, a narrow column for a portrait.
  if (variant === "solo" || variant === "solo-portrait") {
    return (
      <div className={cn(base, className)}>
        <Plate
          photo={photos[0]}
          wrapperClassName={
            variant === "solo-portrait"
              ? "col-span-full lg:col-span-4 lg:col-start-5"
              : "col-span-full lg:col-span-8 lg:col-start-3"
          }
          heightClassName={
            variant === "solo-portrait"
              ? "lg:h-[clamp(300px,58vh,620px)]"
              : "lg:h-[clamp(300px,62vh,620px)]"
          }
        />
      </div>
    );
  }

  // Two portraits of their own: a centred pair, one dropped a step.
  if (variant === "duo-portrait" && photos.length >= 2) {
    return (
      <div className={cn(base, className)}>
        <Plate
          photo={photos[0]}
          wrapperClassName="col-span-full lg:col-span-4 lg:col-start-3"
          heightClassName="lg:h-[clamp(300px,58vh,600px)]"
        />
        <Plate
          photo={photos[1]}
          delay={0.06}
          wrapperClassName="col-span-full lg:col-span-4 lg:col-start-7 lg:mt-10"
          heightClassName="lg:h-[clamp(300px,58vh,600px)]"
        />
      </div>
    );
  }

  // A portrait and a landscape together: unequal pair, bottoms aligned.
  if (variant === "duo-mixed" && photos.length >= 2) {
    const portrait = photos.find((p) => p.height > p.width) ?? photos[0];
    const landscape = photos.find((p) => p.height <= p.width) ?? photos[0];
    return (
      <div className={cn(base, "lg:items-end", className)}>
        <Plate
          photo={landscape}
          wrapperClassName="col-span-full lg:col-span-7"
          heightClassName="lg:h-[clamp(300px,52vh,560px)]"
        />
        <Plate
          photo={portrait}
          delay={0.06}
          wrapperClassName="col-span-full lg:col-span-5"
          heightClassName="lg:h-[clamp(340px,64vh,660px)]"
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
            delay={d(i)}
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
            delay={d(i)}
            wrapperClassName="col-span-full lg:col-span-4"
            heightClassName={heights[i]}
          />
        ))}
      </div>
    );
  }

  // Two tall portraits with a shorter landscape closing the rail.
  if (variant === "rail-mixed" && photos.length >= 3) {
    const portraits = photos.filter((p) => p.height > p.width);
    const rest = photos.filter((p) => p.height <= p.width);
    const tiles = [...portraits.slice(0, 2), ...rest.slice(0, 1)];
    const heights = [
      "lg:h-[clamp(300px,56vh,600px)]",
      "lg:h-[clamp(300px,56vh,600px)]",
      "lg:h-[clamp(160px,26vh,280px)]",
    ];
    return (
      <div className={cn(base, className)}>
        {tiles.map((photo, i) => (
          <Plate
            key={photo.src}
            photo={photo}
            delay={d(i)}
            wrapperClassName="col-span-full lg:col-span-4"
            heightClassName={heights[i]}
          />
        ))}
      </div>
    );
  }

  // Three portraits, one rail.
  if (variant === "portrait-rail" && photos.length >= 3) {
    return (
      <div className={cn(base, className)}>
        {photos.slice(0, 3).map((photo, i) => (
          <Plate
            key={photo.src}
            photo={photo}
            delay={d(i)}
            wrapperClassName="col-span-full lg:col-span-4"
            heightClassName="lg:h-[clamp(280px,52vh,560px)]"
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
        {photos.slice(0, 3).map((photo, i) => (
          <Plate
            key={photo.src}
            photo={photo}
            delay={d(i)}
            wrapperClassName={cn("col-span-full", i === 0 ? "lg:col-span-6" : "lg:col-span-3")}
            heightClassName={
              i === 0 ? "lg:h-[clamp(280px,55vh,600px)]" : "lg:h-[clamp(150px,27vh,300px)]"
            }
          />
        ))}
      </div>
    );
  }

  // Four plates as a centred 2x2 block.
  if (variant === "quad" && photos.length >= 4) {
    const positions = [
      "col-span-full lg:col-span-4 lg:col-start-3",
      "col-span-full lg:col-span-4 lg:col-start-7",
      "col-span-full lg:col-span-4 lg:col-start-3",
      "col-span-full lg:col-span-4 lg:col-start-7",
    ];
    return (
      <div className={cn(base, className)}>
        {photos.slice(0, 4).map((photo, i) => (
          <Plate
            key={photo.src}
            photo={photo}
            delay={d(i)}
            wrapperClassName={positions[i]}
            heightClassName="lg:h-[clamp(190px,31vh,340px)]"
          />
        ))}
      </div>
    );
  }

  // Five landscape plates: three over two, the pair centred.
  if (variant === "stack32" && photos.length >= 5) {
    const positions = [
      "col-span-full lg:col-span-4",
      "col-span-full lg:col-span-4",
      "col-span-full lg:col-span-4",
      "col-span-full lg:col-span-4 lg:col-start-3",
      "col-span-full lg:col-span-4 lg:col-start-7",
    ];
    return (
      <div className={cn(base, className)}>
        {photos.slice(0, 5).map((photo, i) => (
          <Plate
            key={photo.src}
            photo={photo}
            delay={d(i)}
            wrapperClassName={positions[i]}
            heightClassName="lg:h-[clamp(170px,27vh,300px)]"
          />
        ))}
      </div>
    );
  }

  // Five or six plates with one portrait: the tall lead beside a mosaic.
  if ((variant === "mosaic5" || variant === "mosaic") && photos.length >= 5) {
    const lead = photos.find((p) => p.height > p.width) ?? photos[0];
    const rest = photos.filter((p) => p !== lead).slice(0, variant === "mosaic5" ? 4 : 5);
    const wide = "lg:h-[clamp(240px,36vh,380px)]";
    const low = "lg:h-[clamp(150px,22vh,250px)]";
    return (
      <div className={cn(base, className)}>
        <Plate photo={lead} stretch wrapperClassName="col-span-full lg:col-span-3 lg:row-span-2" />
        <Plate
          photo={rest[0]}
          delay={0.06}
          wrapperClassName="col-span-full lg:col-span-5"
          heightClassName={wide}
        />
        <Plate
          photo={rest[1]}
          delay={0.12}
          wrapperClassName="col-span-full lg:col-span-4"
          heightClassName={wide}
        />
        <Plate
          photo={rest[2]}
          delay={0.18}
          wrapperClassName="col-span-full lg:col-span-3"
          heightClassName={low}
        />
        <Plate
          photo={rest[3]}
          delay={0.24}
          wrapperClassName="col-span-full lg:col-span-3"
          heightClassName={low}
        />
        {variant === "mosaic" && rest[4] && (
          <Plate
            photo={rest[4]}
            delay={0.3}
            wrapperClassName="col-span-full lg:col-span-3"
            heightClassName={low}
          />
        )}
      </div>
    );
  }

  // Six landscape plates: two rows of three.
  if (variant === "grid6" && photos.length >= 6) {
    return (
      <div className={cn(base, className)}>
        {photos.slice(0, 6).map((photo, i) => (
          <Plate
            key={photo.src}
            photo={photo}
            delay={d(i)}
            wrapperClassName="col-span-full lg:col-span-4"
            heightClassName="lg:h-[clamp(160px,26vh,280px)]"
          />
        ))}
      </div>
    );
  }

  // Anything larger: full-width sheets of four, partial rows centred.
  const rows: SitePhoto[][] = [];
  for (let i = 0; i < photos.length; i += 4) rows.push(photos.slice(i, i + 4));
  return (
    <div className={cn("flex flex-col gap-y-8 lg:gap-y-6", className)}>
      {rows.map((row, r) => (
        <div key={r} className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-12 lg:gap-y-6">
          {row.map((photo, i) => (
            <Plate
              key={photo.src}
              photo={photo}
              delay={Math.min(r * 4 + i, 8) * 0.05}
              wrapperClassName={cn(
                "col-span-full",
                row.length === 1 && "lg:col-span-4 lg:col-start-5",
                row.length > 1 && "lg:col-span-3",
                row.length === 3 && i === 0 && "lg:col-start-2",
                row.length === 2 && i === 0 && "lg:col-start-4",
              )}
              heightClassName="lg:h-[clamp(140px,22vh,240px)]"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
