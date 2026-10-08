import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FramedImage } from "@/components/ui/FramedImage";
import { Button } from "@/components/ui/Button";
import { heroSlides } from "@/data/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function Machinery() {
  useDocumentTitle("Machinery");

  return (
    <>
      <Section>
        <SectionHeading as="h1" rule>
          Machinery
        </SectionHeading>
        <p className="mt-6 max-w-[56ch] text-lg text-ink-2">
          Sai Sree Enterprise hires out site machines with an operator for earthwork, excavation and
          levelling.
        </p>
      </Section>

      <Section tone="paper2">
        <SectionHeading>Hire terms</SectionHeading>
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <p className="max-w-[54ch] text-ink-2">
              Hire is by the hour, by the day, or by the trip. Every machine comes with an operator.
              The operator runs the machine on the work in hand.
            </p>
          </div>
          {/* The fleet table renders only once the client confirms the machine
              classes, capacity and owned-or-hired detail. Until then the empty
              state below stands in, with no placeholder rows. */}
          <div className="lg:col-span-5">
            <div className="border border-hairline bg-paper p-7">
              <h3 className="font-display text-xl">Fleet list</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-2">
                The machine classes, their capacity, and whether each is owned or hired are not
                published yet.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <FramedImage plate={heroSlides[1]} ratioClassName="aspect-[16/9]" />
      </Section>

      <Section tone="paper2">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <p className="max-w-[34ch] font-display text-[clamp(1.5rem,2.6vw,2.2rem)] leading-tight">
            Book a machine for the work in hand.
          </p>
          <Button to="/contact">Get in touch</Button>
        </div>
      </Section>
    </>
  );
}
