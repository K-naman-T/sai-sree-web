import type { CSSProperties } from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PullQuote } from "@/components/ui/Ornament";
import { TalkBand, TalkLine } from "@/components/ui/TalkBand";
import { jointVenture } from "@/data/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

/**
 * Joint Ventures & Land Development.
 *
 * A text page on purpose: the office has no photographs of this work, and the
 * page is an explanation of how the arrangement works, taken from the Joint
 * Venture Agreement it supplied. No plate, no photograph and no ornamental
 * image band appears here — the rhythm is carried by the hairlines, the ground
 * colour and the rules alone. Every obligation, undertaking and figure is the
 * agreement's own (see the note on `jointVenture` in data/site.ts).
 */
function NumberedList({ items, columns = false }: { items: string[]; columns?: boolean }) {
  // Two columns fill DOWNWARD (01-05 in the first, 06-09 in the second) so the
  // sequence still reads as a sequence. The row count must match the list:
  // with 9 items, 5 rows split 5 + 4.
  const rows = Math.ceil(items.length / 2);
  return (
    <ol
      className={
        columns
          ? "mt-10 grid gap-x-14 gap-y-0 sm:grid-flow-col sm:grid-rows-[repeat(var(--rows),auto)]"
          /* mobile keeps one column: the rows only bind from sm up */
          : "mt-10 grid max-w-[62ch] gap-y-0"
      }
      style={columns ? ({ "--rows": rows } as CSSProperties) : undefined}
    >
      {items.map((item, index) => (
        <li key={item} className="flex gap-5 border-t border-hairline py-5">
          <span className="w-6 shrink-0 pt-[2px] font-body text-[12px] font-semibold tabular-nums text-ink-2">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="max-w-[52ch] text-[16px] leading-relaxed">{item}</span>
        </li>
      ))}
    </ol>
  );
}

export default function JointVentures() {
  useDocumentTitle(jointVenture.title);
  const { sharing } = jointVenture;

  return (
    <>
      {/* Title plate: no texture — this page carries no images at all. */}
      <Section className="pt-14 sm:pt-16 lg:pt-24 pb-12 sm:pb-14 lg:pb-16" wash="seam-to-paper2">
        <SectionHeading as="h1" rule>
          {jointVenture.title}
        </SectionHeading>
        <p className="mt-7 max-w-[54ch] text-lg text-ink-2">{jointVenture.lede}</p>
      </Section>

      <Section tone="paper2" bordered={false}>
        <SectionHeading>The concept</SectionHeading>
        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="max-w-[60ch] text-[17px] leading-relaxed">{jointVenture.concept[0]}</p>
            <p className="mt-6 max-w-[60ch] text-[17px] leading-relaxed text-ink-2">
              {jointVenture.concept[1]}
            </p>
          </div>
          <div className="lg:col-span-5">
            <PullQuote className="max-w-[34rem]">
              The land on one side, the cost of building it out on the other.
            </PullQuote>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading>{jointVenture.landownerHeading}</SectionHeading>
        <NumberedList items={jointVenture.landowner} />
      </Section>

      <Section tone="paper2">
        <SectionHeading>{jointVenture.developerHeading}</SectionHeading>
        <NumberedList items={jointVenture.developer} columns />
        <p className="mt-8 max-w-[62ch] text-[15px] leading-relaxed text-ink-2">
          Every item above is carried at the developer's expense.
        </p>
      </Section>

      <Section>
        <SectionHeading>{sharing.heading}</SectionHeading>
        <p className="mt-7 max-w-[60ch] text-[17px] leading-relaxed">{sharing.rule}</p>

        {/* The worked example, exactly as the agreement sets it out. */}
        <div className="mt-10 max-w-[62ch]">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              Worked example of the sharing: raw land, development expense, total, and the share
              each side takes.
            </caption>
            <thead>
              <tr className="border-b border-hairline">
                <th className="py-3 pr-4 font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-2">
                  Example
                </th>
                <th className="py-3 pr-4 text-right font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-2">
                  Value
                </th>
                <th className="py-3 text-right font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-2">
                  Share
                </th>
              </tr>
            </thead>
            <tbody>
              {sharing.example.map((row) => (
                <tr key={row.label} className="border-b border-hairline">
                  <td className="py-4 pr-4 text-[17px]">{row.label}</td>
                  <td className="py-4 pr-4 text-right font-display text-[1.35rem] tabular-nums">
                    {sharing.currency}
                    {row.value}
                  </td>
                  <td className="py-4 text-right font-display text-[1.35rem] tabular-nums">
                    {row.share}
                  </td>
                </tr>
              ))}
              <tr className="border-b-2 border-ink/70">
                <td className="py-4 pr-4 font-semibold">{sharing.totalLabel}</td>
                <td className="py-4 pr-4 text-right font-display text-[1.35rem] font-semibold tabular-nums">
                  {sharing.currency}
                  {sharing.totalValue}
                </td>
                <td className="py-4 text-right font-display text-[1.35rem] font-semibold tabular-nums">
                  {sharing.totalShare}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-8 max-w-[62ch] text-[17px] leading-relaxed text-ink-2">
          {sharing.implementation}
        </p>
      </Section>

      <TalkBand action="Talk about the land" to="/contact">
        <TalkLine>Bring the land. We will work out the rest.</TalkLine>
        <p className="mt-5 max-w-[52ch] text-ink-2">
          Tell us where the land is and what it is like today. If the arrangement fits, we will say
          so, and put the terms in writing.
        </p>
      </TalkBand>
    </>
  );
}
