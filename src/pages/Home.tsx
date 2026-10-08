import { Hero } from "@/components/Hero";
import { MarqueeBand } from "@/components/MarqueeBand";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FramedImage } from "@/components/ui/FramedImage";
import { StepsRail } from "@/components/ui/StepsRail";
import { Frieze } from "@/components/ui/Ornament";
import { Button } from "@/components/ui/Button";
import { BentoGrid, BentoCard } from "@/components/magicui/BentoGrid";
import { BlurFade } from "@/components/magicui/BlurFade";
import { HoverExpand } from "@/components/skiperui/HoverExpand";
import { allStandins, categories, heroSlides, steps } from "@/data/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const fleetPlate = heroSlides[1];
const workStrip = allStandins.slice(0, 4);

export default function Home() {
  useDocumentTitle("Home");

  return (
    <>
      <Hero />
      <MarqueeBand />

      <Section>
        <SectionHeading link={{ to: "/services", label: "All services" }}>
          What we take on
        </SectionHeading>
        <BlurFade inView={false} delay={0.05}>
          <BentoGrid className="mt-12">
            {categories.map((category) => (
              <BentoCard
                key={category.title}
                name={category.title}
                description={category.blurb}
                plate={category.plate}
                href="/services"
                cta="View services"
              />
            ))}
          </BentoGrid>
        </BlurFade>
      </Section>

      <Section tone="paper2">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-4">
            <SectionHeading>The fleet</SectionHeading>
            <p className="mt-6 max-w-[38ch] text-ink-2">
              Machines are hired by the hour, by the day, or by the trip, with an operator.
            </p>
            <div className="mt-8">
              <Button to="/machinery" variant="quiet">
                See the machinery
              </Button>
            </div>
          </div>
          <div className="lg:col-span-8">
            <FramedImage plate={fleetPlate} ratioClassName="aspect-[16/9]" />
          </div>
        </div>
      </Section>

      <Frieze />

      <Section tone="paper">
        <SectionHeading>How the work runs</SectionHeading>
        <BlurFade inView={false} delay={0.05}>
          <StepsRail steps={steps} className="mt-12" />
        </BlurFade>
        <div className="mt-10">
          <Button to="/services" variant="quiet">
            See the services
          </Button>
        </div>
      </Section>

      <Section tone="paper2">
        <SectionHeading link={{ to: "/work", label: "See the work" }}>Work</SectionHeading>
        <div className="mt-12 hidden lg:block">
          <HoverExpand images={workStrip} />
        </div>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:hidden">
          {workStrip.map((photo) => (
            <figure key={photo.src}>
              <div className="aspect-[3/2] overflow-hidden border border-hairline bg-paper-2">
                <img
                  src={photo.src}
                  width={photo.width}
                  height={photo.height}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="mt-3 text-[15px] leading-snug text-ink">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionHeading>Contact</SectionHeading>
            <p className="mt-6 max-w-[46ch] text-ink-2">
              Talk to us about your site or a job you are planning.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Button to="/contact">Talk to us</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
