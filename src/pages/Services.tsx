import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StepsRail } from "@/components/ui/StepsRail";
import { Frieze, PullQuote } from "@/components/ui/Ornament";
import { TalkBand } from "@/components/ui/TalkBand";
import { BlurFade } from "@/components/magicui/BlurFade";
import { PhotoRail, type RailItem } from "@/components/services/PhotoRail";
import { ServiceRecord } from "@/components/services/ServiceRecord";
import { heroSlides, services, steps } from "@/data/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function Services() {
  useDocumentTitle("Services");

  const railItems: RailItem[] = services.flatMap((service, index) =>
    service.evidence
      ? [
          {
            id: service.id,
            number: String(index + 1).padStart(2, "0"),
            serviceTitle: service.title,
            photo: service.evidence,
          },
        ]
      : [],
  );

  return (
    <>
      {/* Title plate: the masons' tile struck into the paper behind the heading. */}
      <Section
        className="pt-14 sm:pt-16 lg:pt-24 pb-12 sm:pb-14 lg:pb-16"
        wash="seam-to-paper2"
        texture={services[0].plate}
      >
        <SectionHeading as="h1" rule>
          Services
        </SectionHeading>
        <p className="mt-6 max-w-[60ch] text-lg text-ink-2">
          Everything we are asked to do carries the same standard: art and design at the core,
          from the first cut to the final finish. Here is what can be hired, and how a job starts.
        </p>
      </Section>

      {/* The contact sheet: every photograph the company supplied, one pane per
          service, opening on hover and jumping to that service's record. */}
      <Section className="pt-12 sm:pt-14 lg:pt-16 pb-10 lg:pb-14">
        <SectionHeading>From our own sites</SectionHeading>
        <p className="mt-6 max-w-[56ch] text-ink-2">
          Every photograph on this site comes from the company's own sites. Open a frame to read
          that service.
        </p>
        <BlurFade inView={false} delay={0.04}>
          <PhotoRail items={railItems} className="mt-10" />
        </BlurFade>
      </Section>

      {/* One record per service: plate, photograph on the plate, heading,
          description and the "What you provide" line, on alternating grounds. */}
      <ol className="border-t border-hairline">
        {services.map((service, index) => (
          <ServiceRecord key={service.id} service={service} index={index} />
        ))}
      </ol>

      <Frieze />

      <Section wash="wash-ochre-up">
        <SectionHeading>How a job starts</SectionHeading>
        <p className="mt-6 max-w-[52ch] font-display text-[clamp(1.3rem,2.2vw,1.7rem)] leading-snug">
          Every site runs the same measured sequence. Craft is a discipline.
        </p>
        <BlurFade inView={false} delay={0.04}>
          <StepsRail steps={steps} className="mt-10" />
        </BlurFade>
      </Section>

      <TalkBand action="Talk to us" texture={heroSlides[0]}>
        <PullQuote>Tell us about the site and we will work out the rest.</PullQuote>
      </TalkBand>
    </>
  );
}
