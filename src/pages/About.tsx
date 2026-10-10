import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FramedImage } from "@/components/ui/FramedImage";
import { StepsRail } from "@/components/ui/StepsRail";
import { MotifBand, PullQuote } from "@/components/ui/Ornament";
import { heroSlides, steps } from "@/data/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const WHAT_WE_DO: { title: string; line: string }[] = [
  {
    title: "Civil construction",
    line: "Contract work built to the drawings and the specification.",
  },
  {
    title: "Earthwork and levelling",
    line: "Ground cut, filled and set to level.",
  },
  {
    title: "Machine and material supply",
    line: "Machines with an operator, and materials brought to site.",
  },
  {
    title: "Machinery with an operator",
    line: "Hired by the hour, by the day, or by the trip.",
  },
  {
    title: "Rammed earth and mud construction",
    line: "Walls formed in lifts and finished by hand.",
  },
];

export default function About() {
  useDocumentTitle("About");

  return (
    <>
      <Section wash="seam-to-paper2">
        <SectionHeading as="h1" rule>
          About
        </SectionHeading>
        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <PullQuote className="max-w-[34rem]">
              Art aesthetics are not decoration added at the end. They are how the work is planned
              and built.
            </PullQuote>
            <p className="mt-8 max-w-[52ch] text-lg text-ink-2">
              Sai Sree Enterprise is a construction and earthmoving company. Art and design sit at
              the core of everything we build, from the first cut to the final finish.
            </p>
          </div>
          <div className="lg:col-span-5">
            <FramedImage plate={heroSlides[0]} ratioClassName="aspect-[4/5]" />
          </div>
        </div>
      </Section>

      <MotifBand />

      <Section tone="paper2" bordered={false}>
        <SectionHeading>What we do</SectionHeading>
        <ul className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {WHAT_WE_DO.map((item) => (
            <li key={item.title} className="bg-paper p-6 lg:p-7">
              <h3 className="font-display text-[1.25rem] leading-snug">{item.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{item.line}</p>
            </li>
          ))}
        </ul>
      </Section>

      <MotifBand />

      <Section>
        <SectionHeading>How we run</SectionHeading>
        <p className="mt-6 max-w-[52ch] font-display text-[clamp(1.3rem,2.2vw,1.7rem)] leading-snug">
          Every site runs the same measured sequence. Craft is a discipline.
        </p>
        <StepsRail steps={steps} className="mt-10" />
        <p className="mt-10 max-w-[64ch] text-ink-2">
          Material goes to the site. Attendance is taken at the site. Machine hours are written in
          the logbook. The week is checked against the diesel and the bills.
        </p>
      </Section>

      <MotifBand />

      <Section
        tone="paper2"
        texture={heroSlides[1]}
        textureClassName="right-0 top-0 hidden h-full w-[42%] object-cover lg:block"
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <SectionHeading>Where</SectionHeading>
            {/* Location line per the Round 4 directive. The Content Manifest marks the
                district/service area unconfirmed: remove this line if the client does not
                authorise it (CONTENT-MANIFEST.md #4). */}
            <p className="mt-6 max-w-[46ch] text-lg text-ink-2">
              We work out of Harohalli, Karnataka.
            </p>
          </div>
          <div className="lg:col-span-5">
            <h2 className="font-display text-[clamp(1.5rem,2.4vw,2rem)] leading-tight">
              Registrations
            </h2>
            {/* Only confirmed facts render. Registration numbers (GST, Udyam, licence)
                appear here only when the client supplies and authorises them; no number
                is invented (CONTENT-MANIFEST.md #9). */}
            <p className="mt-5 max-w-[46ch] text-ink-2">Registered name: Sai Sree Enterprise.</p>
          </div>
        </div>
      </Section>

      <Section wash="wash-ochre-up">
        <p className="mx-auto max-w-[34ch] text-balance text-center font-display text-[clamp(1.7rem,3.4vw,2.8rem)] italic leading-[1.18] text-ink">
          Art and design at the core of everything we build.
        </p>
      </Section>
    </>
  );
}
