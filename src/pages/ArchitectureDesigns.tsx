import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PullQuote } from "@/components/ui/Ornament";
import { TalkBand, TalkLine } from "@/components/ui/TalkBand";
import { brandName, architectureDesigns } from "@/data/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

/**
 * Architecture Designs.
 *
 * Text-only, like the joint-venture page: the office has no drawings or design
 * photographs to publish, and nothing here is borrowed imagery. The copy is the
 * office's own text, rewritten into this site's register (the source it came
 * from named another firm). Every claim it makes about the practice — the
 * architects, designers and planners on staff, and the range of project types —
 * is the office's to confirm; see the note on `architectureDesigns` in
 * data/site.ts.
 */
export default function ArchitectureDesigns() {
  useDocumentTitle(architectureDesigns.title);
  const { design } = architectureDesigns;

  return (
    <>
      {/* Title plate: no texture — this page carries no images. */}
      <Section className="pt-14 sm:pt-16 lg:pt-24 pb-12 sm:pb-14 lg:pb-16" wash="seam-to-paper2">
        <SectionHeading as="h1" rule>
          {architectureDesigns.title}
        </SectionHeading>
        <p className="mt-7 max-w-[54ch] text-lg text-ink-2">{architectureDesigns.lede}</p>
      </Section>

      <Section tone="paper2" bordered={false}>
        <SectionHeading>{design.meaningHeading}</SectionHeading>
        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="max-w-[60ch] text-[17px] leading-relaxed">{design.meaning[0]}</p>
            <p className="mt-6 max-w-[60ch] text-[17px] leading-relaxed text-ink-2">
              {design.meaning[1]}
            </p>
          </div>
          <div className="lg:col-span-5">
            <PullQuote className="max-w-[34rem]">{design.quote}</PullQuote>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading>{design.methodHeading}</SectionHeading>
        <ol className="mt-10 grid max-w-[62ch] gap-y-0">
          {design.method.map((item, index) => (
            <li key={item} className="flex gap-5 border-t border-hairline py-5">
              <span className="w-6 shrink-0 pt-[2px] font-body text-[12px] font-semibold tabular-nums text-ink-2">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="max-w-[52ch] text-[16px] leading-relaxed">{item}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="paper2">
        <SectionHeading>{design.rangeHeading}</SectionHeading>
        <p className="mt-7 max-w-[60ch] text-[17px] leading-relaxed">{design.range}</p>
        <p className="mt-6 max-w-[60ch] text-[15px] leading-relaxed text-ink-2">
          Design starts at the office. The same people who draw the building stay with it while it
          is built under {brandName}.
        </p>
      </Section>

      <TalkBand action="Talk to us" to="/contact">
        <TalkLine>Tell us about the building you have in mind.</TalkLine>
        <p className="mt-5 max-w-[52ch] text-ink-2">
          Bring the site, the brief and any drawings you already have. We will tell you how we would
          approach it.
        </p>
      </TalkBand>
    </>
  );
}
