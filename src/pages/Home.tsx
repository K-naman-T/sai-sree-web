import { Hero } from "@/components/Hero";
import { MarqueeBand } from "@/components/MarqueeBand";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FramedImage } from "@/components/ui/FramedImage";
import { StepsRail } from "@/components/ui/StepsRail";
import { Frieze, MotifBand, PullQuote } from "@/components/ui/Ornament";
import { TalkBand, TalkLine } from "@/components/ui/TalkBand";
import { Button } from "@/components/ui/Button";
import { BentoGrid, BentoCard } from "@/components/magicui/BentoGrid";
import { BlurFade } from "@/components/magicui/BlurFade";
import { homeHooks } from "@/data/photos";
import { categories, heroSlides, steps } from "@/data/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const fleetPlate = heroSlides[1];

export default function Home() {
  useDocumentTitle("Home");

  return (
    <>
      <Hero />
      <MarqueeBand />

      <Section wash="seam-from-paper2">
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
                href={category.to}
                cta="View services"
              />
            ))}
          </BentoGrid>
        </BlurFade>
      </Section>

      {/* Positioning quote band: the earthwork plate struck into the paper
          behind the quote, so the page is designed there too. */}
      <Section tone="paper2" texture={categories[1].plate}>
        <PullQuote className="max-w-[38rem]">
          Art and design sit at the core of everything we build.
        </PullQuote>
      </Section>

      <Section bordered={false}>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-4">
            <SectionHeading>The fleet</SectionHeading>
            <p className="mt-6 max-w-[38ch] text-ink-2">
              Machines are the instruments. The eye of the operator is the difference. Hired by
              the hour, by the day, or by the trip.
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

      <Section>
        <SectionHeading>How the work runs</SectionHeading>
        <p className="mt-6 max-w-[52ch] font-display text-[clamp(1.3rem,2.2vw,1.7rem)] leading-snug">
          Every site runs the same measured sequence. Craft is a discipline.
        </p>
        <BlurFade inView={false} delay={0.05}>
          <StepsRail steps={steps} className="mt-10" />
        </BlurFade>
        <div className="mt-10">
          <Button to="/services" variant="quiet">
            See the services
          </Button>
        </div>
      </Section>

      <MotifBand />

      <Section tone="paper2">
        <SectionHeading link={{ to: "/work", label: "See the work" }}>Work</SectionHeading>
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {homeHooks.map((photo, index) => (
            <figure
              key={photo.src}
              className={index === 0 ? "lg:col-span-6" : "lg:col-span-5 lg:col-start-8 lg:mt-16"}
            >
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

      <MotifBand />

      <TalkBand action="Talk to us" texture={categories[3].plate}>
        <TalkLine>Art and design, built into the ground.</TalkLine>
        <p className="mt-5 max-w-[52ch] text-ink-2">
          Tell us about your site or a job you are planning, and we will tell you how we would
          build it.
        </p>
      </TalkBand>
    </>
  );
}
