import { cn } from "@/lib/utils";
import { Section, Container } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FramedImage } from "@/components/ui/FramedImage";
import { StepsRail } from "@/components/ui/StepsRail";
import { Frieze } from "@/components/ui/Ornament";
import { Button } from "@/components/ui/Button";
import { BlurFade } from "@/components/magicui/BlurFade";
import { services, steps } from "@/data/site";
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
      <Section className="pb-8 sm:pb-10 lg:pb-12">
        <SectionHeading as="h1" rule>
          Services
        </SectionHeading>
        <p className="mt-6 max-w-[58ch] text-lg text-ink-2">
          Sai Sree Enterprise takes on civil, earthwork, supply and machine work, and this page sets
          out what can be hired and how a job starts.
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

      <Section>
        <SectionHeading>How a job starts</SectionHeading>
        <BlurFade inView={false} delay={0.04}>
          <StepsRail steps={steps} className="mt-12" />
        </BlurFade>
      </Section>

      <Section tone="paper2">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <p className="max-w-[34ch] font-display text-[clamp(1.5rem,2.6vw,2.2rem)] leading-tight">
            Tell us about the site and we will work out the rest.
          </p>
          <Button to="/contact">Get in touch</Button>
        </div>
      </Section>
    </>
  );
}
