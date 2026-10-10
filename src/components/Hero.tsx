import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import { useReducedMotion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-fade";
import { cn } from "@/lib/utils";
import { heroSlides } from "@/data/site";
import { Button } from "@/components/ui/Button";

/**
 * Full-viewport hero: a multi-image auto-carousel (crossfade, ~5.2s) with a slow
 * Ken Burns drift, a light scrim localized to the bottom-left text block, an
 * editorial slide counter and proof-marked indicators bottom-right, and arrow-key
 * control. Motion stops under prefers-reduced-motion and pauses on hover.
 *
 * Contrast: the scrim is a targeted bottom band plus a faint left bias, so the
 * upper and right areas of the plates stay clear. Over the text block the two
 * gradients composite to an effective alpha of >= 0.85, i.e. >= 4.5:1 against the
 * cream text (#FCF8F1) even over a pure-white plate pixel, with a text-shadow as
 * a final hold. A third, very light top-down layer (<= 14%) keeps the nav links
 * crisp over the plate border; it lies above the text block and does not touch
 * the sampled region. On small screens a bottom-only layer deepens the scrim
 * where the subtext sits. See scripts/check_hero_contrast.py and REPORT.md.
 */
const SCRIM =
  "linear-gradient(to bottom, rgba(18,14,10,0.14) 0%, rgba(18,14,10,0.14) 8%, rgba(18,14,10,0) 16%), linear-gradient(to top, rgba(18,14,10,0.90) 0%, rgba(18,14,10,0.85) 47%, rgba(18,14,10,0.38) 58%, rgba(18,14,10,0) 68%), linear-gradient(to right, rgba(18,14,10,0.18) 0%, rgba(18,14,10,0.10) 40%, rgba(18,14,10,0) 66%)";

/** Mobile-only: deepen the bottom of the scrim so the subtext holds over busy art. */
const MOBILE_SCRIM =
  "linear-gradient(to top, rgba(18,14,10,0.40) 0%, rgba(18,14,10,0.24) 50%, rgba(18,14,10,0) 100%)";

/** Keeps the cream type legible where the scrim feathers toward the plates. */
const TEXT_SHADOW = "0 1px 3px rgba(18,14,10,0.65), 0 3px 26px rgba(18,14,10,0.55)";

export function Hero() {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  const go = (next: number) => {
    const count = heroSlides.length;
    const wrapped = (next + count) % count;
    swiperRef.current?.slideTo(wrapped);
  };

  return (
    <section
      aria-label="Sai Sree Enterprise"
      data-viewport-exempt
      className="relative isolate h-[100dvh] min-h-[560px] w-full overflow-hidden bg-ink"
    >
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={900}
          loop
          autoplay={
            reduceMotion
              ? false
              : { delay: 5200, disableOnInteraction: false, pauseOnMouseEnter: true }
          }
          onSwiper={(instance) => {
            swiperRef.current = instance;
          }}
          onSlideChange={(instance) => setIndex(instance.realIndex)}
          className="hero-swiper h-full w-full"
        >
          {heroSlides.map((slide, i) => (
            <SwiperSlide key={slide.src}>
              <img
                src={slide.src}
                width={slide.width}
                height={slide.height}
                alt={slide.alt}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                className="h-full w-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{ backgroundImage: SCRIM }}
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[64%] sm:hidden"
        style={{ backgroundImage: MOBILE_SCRIM }}
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mx-auto flex h-full w-full max-w-[1400px] flex-col justify-end px-[clamp(18px,5vw,28px)] pb-14 pt-28 sm:pb-16 lg:pb-20">
          <div className="max-w-[56rem]">
            <span className="mb-6 block h-[3px] w-16 bg-gold" aria-hidden="true" />
            <h1
              className="font-display text-[clamp(2.6rem,7.5vw,5.75rem)] font-semibold leading-[1.0] tracking-[-0.02em] text-cream"
              style={{ textShadow: TEXT_SHADOW }}
            >
              Sai Sree Enterprise
            </h1>
            <p
              className="mt-8 max-w-[50rem] font-body text-[clamp(1.12rem,1.75vw,1.5rem)] font-medium leading-[1.72] text-cream/95 sm:mt-7"
              style={{ textShadow: TEXT_SHADOW }}
            >
              <span className="block">Construction built as craft. Art and design sit at the core </span>
              <span className="block">of everything we build: civil works, earthwork and levelling, </span>
              <span className="block">machine and material supply, and rammed earth and mud construction.</span>
            </p>

            <div className="mt-9">
              <Button to="/contact" variant="cream" size="lg">
                Get in touch
              </Button>

              <div
                role="group"
                aria-label="Choose the hero background"
                className="mt-8 flex items-center gap-4 lg:absolute lg:bottom-20 lg:right-[clamp(18px,5vw,28px)] lg:mt-0"
                onKeyDown={(event) => {
                  if (event.key === "ArrowLeft") {
                    event.preventDefault();
                    go(index - 1);
                  } else if (event.key === "ArrowRight") {
                    event.preventDefault();
                    go(index + 1);
                  }
                }}
              >
                <span
                  aria-hidden="true"
                  className="font-body text-[11px] font-semibold uppercase tabular-nums tracking-[0.22em] text-cream/75"
                >
                  {String(index + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
                </span>
                <span className="hidden h-px w-10 bg-gold/80 sm:block" aria-hidden="true" />
                {heroSlides.map((slide, i) => (
                  <button
                    key={slide.src}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Show background ${i + 1} of ${heroSlides.length}`}
                    aria-current={i === index ? "true" : undefined}
                    className="group flex h-11 items-center px-1.5"
                  >
                    <span
                      className={cn(
                        "block w-7 transition-all duration-300",
                        i === index
                          ? "h-[3px] bg-cream"
                          : "h-px bg-cream/45 group-hover:bg-cream/80",
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
