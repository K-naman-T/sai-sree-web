import { Fragment } from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoWall, type WallVariant } from "@/components/ui/PhotoWall";
import { MotifBand } from "@/components/ui/Ornament";
import { heroSlides } from "@/data/site";
import { photoGroups } from "@/data/photos";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

/** Wall layout per group, keyed by title so reordering the data cannot mismatch. */
const WALL_BY_TITLE: Record<string, WallVariant> = {
  "Excavation and foundations": "mosaic",
  "Earthwork and site preparation": "duo",
  "Retaining walls": "duo-flip",
  "Demolition and clearing": "duo-cinema",
  "Steel frame and decking": "duo-wide",
  "Industrial steel and shed works": "rail",
  "Building works": "split",
  "Landscaping and ground finishing": "hang",
  "A finished residence": "featured",
};

export default function Work() {
  useDocumentTitle("Work");

  return (
    <>
      <Section
        className="pb-8 sm:pb-8 lg:pb-10"
        wash="seam-to-paper2"
        texture={heroSlides[0]}
        textureClassName="right-0 top-0 hidden h-full w-[36%] object-cover lg:block"
      >
        <SectionHeading as="h1" rule>
          Work
        </SectionHeading>
        <p className="mt-6 max-w-[24ch] font-display text-[clamp(1.5rem,3vw,2.2rem)] leading-tight">
          Work built to be looked at.
        </p>
        <p className="mt-5 max-w-[48ch] text-lg text-ink-2">
          Finished and running sites. The proof is in the finish.
        </p>
      </Section>

      {photoGroups.map((group, index) => (
        <Fragment key={group.title}>
          <Section tone={index % 2 === 0 ? "paper2" : "paper"} className="py-8 sm:py-9 lg:py-10">
            <SectionHeading
              aside={<p className="max-w-[46ch] text-ink-2 sm:text-right">{group.blurb}</p>}
            >
              {group.title}
            </SectionHeading>
            <PhotoWall
              photos={group.photos}
              variant={WALL_BY_TITLE[group.title] ?? "grid"}
              className="mt-8"
            />
          </Section>
          {(index === 2 || index === 5) && <MotifBand />}
        </Fragment>
      ))}
    </>
  );
}
