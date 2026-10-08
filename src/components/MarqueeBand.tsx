import { marqueeItems } from "@/data/site";
import { Marquee } from "@/components/magicui/Marquee";

function Diamond() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true" className="h-2.5 w-2.5 shrink-0 text-gold">
      <path d="M6 0l6 6-6 6L0 6z" fill="currentColor" />
    </svg>
  );
}

/** A decorative marquee of the service range. Ornament, not a claim. */
export function MarqueeBand() {
  return (
    <div className="border-y border-hairline bg-paper-2 py-7">
      <Marquee pauseOnHover repeat={2}>
        {marqueeItems.map((item) => (
          <span key={item} className="flex items-center gap-14">
            <span className="whitespace-nowrap font-display text-[clamp(1.1rem,1.8vw,1.55rem)] italic text-ink">
              {item}
            </span>
            <Diamond />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
