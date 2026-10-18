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
  officeLine,
  team,
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
                      className="mt-2 flex min-h-[44px] items-center font-display text-[clamp(1.6rem,3vw,2.2rem)] leading-none underline-offset-8 hover:text-terracotta hover:underline"
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

      {/* The office, by name: the roles the office gave, and the numbers it gave. */}
      <Section tone="paper2" bordered={false}>
        <SectionHeading>The office, by name</SectionHeading>
        <p className="mt-5 max-w-[56ch] text-lg text-ink-2">
          Work is signed off by a person, not a desk. Call whoever owns the job, or call the
          office line — it reaches the same team.
        </p>
        <ul className="mt-10 grid gap-x-16 sm:grid-cols-2">
          {team.map((person) => (
            <li key={person.name} className="border-t border-hairline py-6">
              <p className="font-display text-[1.4rem] leading-tight">{person.name}</p>
              <p className="mt-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-2">
                {person.role}
              </p>
              {person.phone ? (
                <p className="mt-2 flex flex-wrap items-center gap-x-6">
                  <a
                    href={`tel:${person.phone.tel}`}
                    className="flex min-h-[44px] items-center text-[16px] underline-offset-4 hover:text-terracotta hover:underline"
                  >
                    {person.phone.display}
                  </a>
                  <a
                    href={person.phone.whatsapp}
                    className="flex min-h-[44px] items-center text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-2 underline-offset-4 hover:text-terracotta hover:underline"
                  >
                    WhatsApp
                  </a>
                </p>
              ) : (
                <p className="mt-2 flex min-h-[44px] items-center text-[15px]">
                  <a
                    href={`tel:${officeLine.tel}`}
                    className="flex min-h-[44px] items-center underline-offset-4 hover:text-terracotta hover:underline"
                  >
                    Through the office line
                  </a>
                </p>
              )}
            </li>
          ))}
        </ul>
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
