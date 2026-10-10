import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StepsRail } from "@/components/ui/StepsRail";
import { MotifBand } from "@/components/ui/Ornament";
import { TextLink } from "@/components/ui/Button";
import { heroSlides, steps } from "@/data/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function Contact() {
  useDocumentTitle("Contact");

  return (
    <>
      {/* Title plate: machines shaping ground into a site, struck into the paper. */}
      <Section
        className="pt-14 sm:pt-16 lg:pt-24 pb-12 sm:pb-14 lg:pb-16"
        wash="seam-to-paper2"
        texture={heroSlides[3]}
      >
        <SectionHeading as="h1" rule>
          Contact
        </SectionHeading>
        <p className="mt-6 max-w-[30ch] font-display text-[clamp(1.5rem,3vw,2.2rem)] leading-tight">
          Art and design, built into the ground.
        </p>
        <p className="mt-5 max-w-[52ch] text-lg text-ink-2">
          Tell us about your site or a job you are planning, and we will tell you how we would
          build it.
        </p>
        {/* Phone, WhatsApp, address, working hours and service area render here only
            when the client supplies the real values (CONTENT-MANIFEST.md). */}
      </Section>

      <MotifBand />

      <Section tone="paper2" bordered={false}>
        <SectionHeading>How a job starts</SectionHeading>
        <p className="mt-6 max-w-[52ch] font-display text-[clamp(1.3rem,2.2vw,1.7rem)] leading-snug">
          Every site runs the same measured sequence. Craft is a discipline.
        </p>
        <StepsRail steps={steps} className="mt-10" />
        <p className="mt-10">
          <TextLink to="/services">See the services we run</TextLink>
        </p>
      </Section>
    </>
  );
}
