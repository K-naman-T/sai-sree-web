import { Fragment } from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoCarousel } from "@/components/ui/PhotoCarousel";
import { MotifBand } from "@/components/ui/Ornament";
import { heroSlides } from "@/data/site";
import { photoGroups } from "@/data/photos";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

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
            <div className="mx-auto w-full max-w-[min(100%,max(420px,calc((100dvh_-_450px)*1.5)))]">
              <SectionHeading>{group.title}</SectionHeading>
              <p className="mt-5 max-w-[52ch] text-ink-2">{group.blurb}</p>
              <PhotoCarousel photos={group.photos} label={group.title} className="mt-8" />
            </div>
          </Section>
          {(index === 2 || index === 5) && <MotifBand />}
        </Fragment>
      ))}
    </>
  );
}
