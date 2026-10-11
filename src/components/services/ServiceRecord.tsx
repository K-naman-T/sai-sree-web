import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/magicui/BlurFade";
import { GlareHover } from "@/components/magicui/GlareHover";
import { ParallaxDrift } from "@/components/aceternity/ParallaxDrift";
import { Container } from "@/components/ui/Section";
import { FramedImage } from "@/components/ui/FramedImage";
import type { Service } from "@/data/site";

function ProvideLine({ provide }: { provide: string }) {
  const [label, value] = provide.split(": ");
  return (
    <p className="mt-6 max-w-[58ch] border-t border-hairline pt-4 text-[15px] leading-relaxed text-ink-2">
      {label && <span className="font-semibold text-ink">{label}:</span>}{" "}
      {value && <span>{value}</span>}
    </p>
  );
}

/**
 * One service, as a record. The photograph from the company's own sites leads
 * the row — a clean band in a paper mount, drifting a little as the page
 * scrolls (ParallaxDrift), caption beneath. Art is no longer repeated per row
 * (client's call, R12c: fewer pieces on this page — the plates were too much);
 * a plate appears only where it is the sole witness: the one service without
 * a photograph. Rows alternate their column order so the page reads as a
 * rhythm, not a stack.
 */
export function ServiceRecord({ service, index }: { service: Service; index: number }) {
  const flipped = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");

  return (
    <li
      id={service.id}
      className={cn("scroll-mt-24 border-b border-hairline", flipped ? "bg-paper-2" : "bg-paper")}
    >
      <Container className="py-10 lg:py-14">
        <BlurFade inView={false} delay={0.04}>
          <div className="mx-auto grid max-w-[1120px] items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className={cn(flipped && "lg:order-2")}>
              {service.evidence ? (
                <figure>
                  <ParallaxDrift distance={14}>
                    <GlareHover
                      background="transparent"
                      color="#ffffff"
                      opacity={0.16}
                      angle={-30}
                      size={220}
                      duration={800}
                      className="border border-hairline bg-paper p-2"
                    >
                      <img
                        src={service.evidence.src}
                        width={service.evidence.width}
                        height={service.evidence.height}
                        alt={service.evidence.alt}
                        loading="lazy"
                        decoding="async"
                        className="h-[320px] w-full object-cover sm:h-[380px] lg:h-[440px]"
                      />
                    </GlareHover>
                    <figcaption className="mt-3 text-[13.5px] leading-snug text-ink-2">
                      {service.evidence.caption}
                    </figcaption>
                  </ParallaxDrift>
                </figure>
              ) : (
                <GlareHover
                  background="transparent"
                  color="#ffffff"
                  opacity={0.12}
                  angle={-30}
                  size={220}
                  duration={900}
                >
                  <FramedImage plate={service.plate} />
                </GlareHover>
              )}
            </div>
            <div className={cn(flipped && "lg:order-1")}>
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-ink-2">
                {number}
              </p>
              <h2 className="mt-3 text-balance text-[clamp(1.5rem,2.6vw,2.2rem)] leading-[1.15]">
                {service.title}
              </h2>
              <p className="mt-4 max-w-[58ch] text-ink-2">{service.body}</p>
              <ProvideLine provide={service.provide} />
            </div>
          </div>
        </BlurFade>
      </Container>
    </li>
  );
}
