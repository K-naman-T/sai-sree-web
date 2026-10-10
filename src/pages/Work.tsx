import { Fragment } from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoWall } from "@/components/ui/PhotoWall";
import { planWalls } from "@/components/ui/wallPlan";
import { MotifBand } from "@/components/ui/Ornament";
import { TalkBand, TalkLine } from "@/components/ui/TalkBand";
import { heroSlides, services } from "@/data/site";
import { photoGroups } from "@/data/photos";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

/**
 * Every group's wall is planned from its photographs alone — count, orientation
 * and ratios — by src/components/ui/wallPlan.ts; there is no per-group mapping
 * to maintain. When the CMS starts feeding these groups, the planner runs on
 * whatever the client adds and each section keeps a fitting composition without
 * anyone touching this file.
 */
const WALLS = planWalls(photoGroups.map((group) => group.photos));

export default function Work() {
  useDocumentTitle("Work");

  return (
    <>
      {/* Title plate: the rammed-earth crew struck into the paper behind the heading. */}
      <Section
        className="pt-14 sm:pt-16 lg:pt-24 pb-8 sm:pb-8 lg:pb-10"
        wash="seam-to-paper2"
        texture={heroSlides[0]}
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
              variant={WALLS[index] ?? "grid-many"}
              className="mt-8"
            />
          </Section>
          {(index === 2 || index === 5) && <MotifBand />}
        </Fragment>
      ))}

      <MotifBand />

      <TalkBand action="Talk to us" texture={services[6].plate}>
        <TalkLine>Tell us about the site and we will work out the rest.</TalkLine>
      </TalkBand>
    </>
  );
}
