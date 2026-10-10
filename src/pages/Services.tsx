import { cn } from "@/lib/utils";
import { Section, Container } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FramedImage } from "@/components/ui/FramedImage";
import { StepsRail } from "@/components/ui/StepsRail";
import { Frieze, PullQuote } from "@/components/ui/Ornament";
import { Button } from "@/components/ui/Button";
import { BlurFade } from "@/components/magicui/BlurFade";
import { heroSlides, services, steps } from "@/data/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

function ProvideLine({ provide }: { provide: string }) {
  const [label, value] = provide.split(": ");
  return (
    <p className="mt-5 max-w-[58ch] border-t border-hairline pt-4 text-[15px] leading-relaxed text-ink-2">
      {label && <span className="font-semibold text-ink">{label}:</span>}{" "}
      {value && <span>{value}</span>}
    </p>
  );
}

export default function Services() {
  useDocumentTitle("Services");

  return (
    <>
      <Section className="pb-8 sm:pb-8 lg:pb-10" wash="seam-to-paper2">
        <SectionHeading as="h1" rule>
          Services
        </SectionHeading>
        <p className="mt-6 max-w-[60ch] text-lg text-ink-2">
          Everything we are asked to do carries the same standard: art and design at the core,
          from the first cut to the final finish. Here is what can be hired, and how a job starts.
        </p>
      </Section>

      {/* One composed cell per service: plate, heading, description and the
          "What you provide" line, top-aligned, on alternating band grounds so
          the rows read as a steady rhythm rather than floating panels. */}
      <ol>
        {services.map((service, index) => (
          <li
            key={service.id}
            id={service.id}
            className={cn(
              "scroll-mt-24 border-b border-hairline",
              index % 2 === 1 ? "bg-paper-2" : "bg-paper",
            )}
          >
            <Container className="py-9 lg:py-12">
              <BlurFade inView={false} delay={0.04}>
                <div className="mx-auto grid max-w-[1120px] gap-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:items-start lg:gap-14">
                  <FramedImage plate={service.plate} />
                  <div>
                    {/* leading-[1.15] + -mt-[0.2em] trim the half-leading so the
                        heading's cap line lands on the plate's top edge. */}
                    <h2 className="text-balance text-[clamp(1.5rem,2.6vw,2.2rem)] leading-[1.15] -mt-[0.2em]">
                      {service.title}
                    </h2>
                    <p className="mt-4 max-w-[58ch] text-ink-2">{service.body}</p>
                    <ProvideLine provide={service.provide} />
                  </div>
                </div>
              </BlurFade>
            </Container>
          </li>
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

      <Section
        tone="paper2"
        texture={heroSlides[2]}
        textureClassName="right-0 top-0 hidden h-full w-[44%] object-cover lg:block"
      >
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <PullQuote>Tell us about the site and we will work out the rest.</PullQuote>
          </div>
          <div className="lg:col-span-5 lg:text-right">
            <Button to="/contact">Get in touch</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
