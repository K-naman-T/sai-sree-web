import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StepsRail } from "@/components/ui/StepsRail";
import { TextLink } from "@/components/ui/Button";
import { steps } from "@/data/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function Contact() {
  useDocumentTitle("Contact");

  return (
    <>
      <Section>
        <SectionHeading as="h1" rule>
          Contact
        </SectionHeading>
        <p className="mt-6 max-w-[52ch] text-lg text-ink-2">
          Reach out to talk about your site or start a job.
        </p>
        {/* Phone, WhatsApp, address, working hours and service area render here only
            when the client supplies the real values (docs/CONTENT-MANIFEST.md). */}
      </Section>

      <Section tone="paper2">
        <SectionHeading>How a job starts</SectionHeading>
        <StepsRail steps={steps} className="mt-12" />
        <p className="mt-10">
          <TextLink to="/services">See the services we run</TextLink>
        </p>
      </Section>
    </>
  );
}
