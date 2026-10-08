import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FramedImage } from "@/components/ui/FramedImage";
import { BorderRule } from "@/components/ui/Ornament";
import { heroSlides } from "@/data/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function About() {
  useDocumentTitle("About");

  return (
    <>
      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <SectionHeading as="h1" rule>
              About
            </SectionHeading>
            <h2 className="mt-10 text-[clamp(1.5rem,2.4vw,2rem)] leading-tight">Who we are</h2>
            <p className="mt-5 max-w-[54ch] text-ink-2">
              Sai Sree Enterprise is a construction and earthmoving company. The work runs across
              civil construction, earthwork and levelling, machine and material supply, and rammed
              earth and mud construction.
            </p>
          </div>
          <div className="lg:col-span-6">
            <FramedImage plate={heroSlides[0]} ratioClassName="aspect-[16/9]" />
          </div>
        </div>
      </Section>

      <BorderRule />

      <Section tone="paper2" bordered={false}>
        <SectionHeading>How we run</SectionHeading>
        <p className="mt-6 max-w-[64ch] text-ink-2">
          Material goes to the site. Attendance is taken at the site. Machine hours are written in
          the logbook. The week is checked against the diesel and the bills.
        </p>
        {/* Registrations, a safety statement, and a who-to-talk-to line render here
            only when the client supplies and authorises them (docs/CONTENT-MANIFEST.md). */}
      </Section>
    </>
  );
}
