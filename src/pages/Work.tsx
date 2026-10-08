import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { finishedSites, runningSites, type SitePhoto } from "@/data/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

/**
 * One curated cell: a 3:2 photo in a single hairline frame with its caption
 * directly beneath at body size. The photo never runs full-bleed, so the
 * caption always reads with the image in the same glance.
 */
function WorkCard({ photo }: { photo: SitePhoto }) {
  return (
    <figure>
      <div className="aspect-[3/2] overflow-hidden border border-hairline bg-paper-2">
        <img
          src={photo.src}
          width={photo.width}
          height={photo.height}
          alt={photo.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
      <figcaption className="mt-3 text-[15px] leading-snug text-ink">{photo.caption}</figcaption>
    </figure>
  );
}

const GRID = "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10";

export default function Work() {
  useDocumentTitle("Work");

  return (
    <>
      <Section className="pb-8 sm:pb-10 lg:pb-12">
        <SectionHeading as="h1" rule>
          Work
        </SectionHeading>
        <p className="mt-6 max-w-[44ch] text-lg text-ink-2">Finished and running sites.</p>
      </Section>

      {/* STAND-IN photographs. Temporary web images, not the client's sites.
          Replace with the client's own site photographs (docs/CONTENT-MANIFEST.md #8). */}
      <Section tone="paper2" className="pt-10 sm:pt-12 lg:pt-14">
        <SectionHeading>Finished sites</SectionHeading>
        <div className={`mt-10 ${GRID}`}>
          {finishedSites.map((photo) => (
            <WorkCard key={photo.src} photo={photo} />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading>Running sites</SectionHeading>
        <div className={`mt-10 ${GRID}`}>
          {runningSites.map((photo) => (
            <WorkCard key={photo.src} photo={photo} />
          ))}
        </div>
      </Section>
    </>
  );
}
