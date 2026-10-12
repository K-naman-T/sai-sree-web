import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StepsRail } from "@/components/ui/StepsRail";
import { Frieze, PullQuote } from "@/components/ui/Ornament";
import { TalkBand } from "@/components/ui/TalkBand";
import { BlurFade } from "@/components/magicui/BlurFade";
import { ServiceRecord } from "@/components/services/ServiceRecord";
import { heroSlides, services, steps } from "@/data/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function Services() {
  useDocumentTitle("Services");

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
