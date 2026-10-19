import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotifBand } from "@/components/ui/Ornament";
import { PhotoWall } from "@/components/ui/PhotoWall";
import { TalkBand, TalkLine } from "@/components/ui/TalkBand";
import { fleetCutouts, heroSlides, machineryPhotos } from "@/data/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function Machinery() {
  useDocumentTitle("Machinery");

  return (
    <>
      {/* Title plate: machines cutting a haul road, struck into the paper. */}
      <Section
        className="pt-14 sm:pt-16 lg:pt-24 pb-12 sm:pb-14 lg:pb-16"
        wash="seam-to-paper2"
        texture={heroSlides[1]}
      >
        <SectionHeading as="h1" rule>
          Machinery
        </SectionHeading>
        <p className="mt-6 max-w-[30ch] font-display text-[clamp(1.4rem,2.8vw,2.1rem)] leading-tight">
          Machines are the instruments; the operator&rsquo;s eye is the difference.
        </p>
        <p className="mt-5 max-w-[54ch] text-lg text-ink-2">
          Everything is hired with a skilled hand at the controls, by the hour, by the day, or by
          the trip.
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

      {/* The fleet, drawn up on one line: studio cutouts standing on the hairline.
          Class-level machines, no fleet table implied — the details box above
          stays the only place the fleet is discussed. Kept tight to the hire
          terms: the two 80px section pads would otherwise leave a 160px dead
          band between the fleet box and the machines. */}
      <Section className="pt-4 lg:pt-6">
        <div className="mx-auto w-full max-w-[1120px]">
          <div className="flex items-end justify-between gap-[clamp(10px,3.5vw,56px)]">
            {fleetCutouts.map((machine) => (
              <img
                key={machine.src}
                src={machine.src}
                width={machine.width}
                height={machine.height}
                alt={machine.alt}
                loading="lazy"
                decoding="async"
                className="h-auto w-auto min-w-0 max-h-[clamp(64px,13vh,150px)] max-w-[70px] object-contain sm:max-w-none"
              />
            ))}
          </div>
          <div aria-hidden="true" className="border-t border-hairline" />
        </div>
      </Section>

      <MotifBand />

      <Section>
        <SectionHeading>Machines at work</SectionHeading>
        <PhotoWall
          photos={machineryPhotos}
          variant={machineryPhotos.length >= 3 ? "rail" : "solo"}
          className="mt-10"
        />
      </Section>

      <MotifBand />

      <TalkBand action="Hire a machine">
        <TalkLine>Book a machine for the work in hand.</TalkLine>
      </TalkBand>
    </>
  );
}
