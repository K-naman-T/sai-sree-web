import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotifBand, PullQuote } from "@/components/ui/Ornament";
import { TalkBand } from "@/components/ui/TalkBand";
import { TextLink } from "@/components/ui/Button";
import {
  brandBy,
  brandName,
  companyName,
  contactChannels,
  contactFacts,
  heroSlides,
} from "@/data/site";
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
      </Section>

      <MotifBand />

      {/* The action: call or write, and what the office will ask for. */}
      <Section tone="paper2" bordered={false}>
        <SectionHeading>Reach the office</SectionHeading>
        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="space-y-8">
              {contactChannels.map((channel) => (
                <div key={channel.label}>
                  <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-ink-2">
                    {channel.label}
                  </p>
                  {channel.pending ? (
                    <p className="mt-2 font-display text-[clamp(1.6rem,3vw,2.2rem)] leading-none">
                      {channel.value}
                    </p>
                  ) : (
                    <a
                      href={channel.href}
                      className="mt-2 inline-block font-display text-[clamp(1.6rem,3vw,2.2rem)] leading-none underline-offset-8 hover:text-terracotta hover:underline"
                    >
                      {channel.value}
                    </a>
                  )}
                  <p className="mt-2 max-w-[44ch] text-[14px] text-ink-2">{channel.detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 border-t border-hairline pt-6">
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-ink-2">
                When you call, have this ready
              </p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {contactFacts.whatToHave.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-ink-2">
                    <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-gold" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="space-y-9">
              <div>
                <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-ink-2">
                  Working hours
                </p>
                <p className="mt-3 text-lg">{contactFacts.hours}.</p>
                <p className="mt-1 text-[14px] text-ink-2">{contactFacts.hoursNote}</p>
              </div>
              <div className="border-t border-hairline pt-6">
                <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-ink-2">
                  Who answers
                </p>
                <p className="mt-3 max-w-[42ch] text-[15px] leading-relaxed text-ink-2">
                  {contactFacts.whoAnswers}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* The company, and where it works. */}
      <Section>
        <SectionHeading>The company</SectionHeading>
        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="max-w-[60ch] text-lg text-ink-2">
              {companyName} is a construction and earthmoving company. Art and design sit at the
              core of everything we build, from the first cut to the final finish. The work is
              built under the name {brandName}, by {brandBy}.
            </p>
            <div className="mt-10">
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-ink-2">
                Where we work
              </p>
              <p className="mt-3 max-w-[56ch] text-[15px] leading-relaxed text-ink-2">
                {contactFacts.serviceArea} Tell us where your site is; if it is within reach, we
                will come and see it.
              </p>
              <p className="mt-2 max-w-[56ch] text-[14px] leading-relaxed text-ink-2">
                {contactFacts.addressNote}
              </p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <ul className="space-y-2">
              <li>
                <TextLink to="/about">About the company</TextLink>
              </li>
              <li>
                <TextLink to="/services">What can be hired</TextLink>
              </li>
              <li>
                <TextLink to="/machinery">The machines</TextLink>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <TalkBand action="See the services we run" to="/services" texture={heroSlides[3]}>
        <PullQuote>Tell us about the site and we will work out the rest.</PullQuote>
      </TalkBand>
    </>
  );
}
