import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { useReducedMotion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-fade";
import { brandName, heroSlides, signatory } from "@/data/site";
import { Button } from "@/components/ui/Button";

/**
 * Full-viewport hero: a multi-image auto-carousel (crossfade, ~5.2s) with a slow
 * Ken Burns drift and a light scrim localized to the bottom-left text block. No
 * on-screen controls — the slide counter and tick indicators were removed on the
 * client's call (R12b). Motion stops under prefers-reduced-motion and pauses on
 * hover. The hero carries the statement and the action; the enterprise line
 * lives in the header lockup.
 *
 * Contrast: the scrim is a targeted bottom band plus a faint left bias, so the
 * upper and right areas of the plates stay clear. Over the text block the two
 * gradients composite to an effective alpha of >= 0.85, i.e. >= 4.5:1 against the
 * cream text (#FCF8F1) even over a pure-white plate pixel, with a text-shadow as
 * a final hold. A third, very light top-down layer (<= 14%) keeps the nav links
 * crisp over the plate border; it lies above the text block and does not touch
 * the sampled region. On small screens a bottom-only layer deepens the scrim
 * where the subtext sits. See scripts/check_hero_contrast.py and REPORT.md.
 *
 * The signature sits on the opposite side of the same bottom band, so it is held
 * by the same >= 0.85 alpha and the same text-shadow; it is measured, not
 * assumed, in audit/signature-contrast.mjs.
 */
const SCRIM =
  "linear-gradient(to bottom, rgba(18,14,10,0.14) 0%, rgba(18,14,10,0.14) 8%, rgba(18,14,10,0) 16%), linear-gradient(to top, rgba(18,14,10,0.90) 0%, rgba(18,14,10,0.85) 47%, rgba(18,14,10,0.38) 58%, rgba(18,14,10,0) 68%), linear-gradient(to right, rgba(18,14,10,0.18) 0%, rgba(18,14,10,0.10) 40%, rgba(18,14,10,0) 66%)";

/** Mobile-only: deepen the bottom of the scrim so the subtext holds over busy art. */
const MOBILE_SCRIM =
  "linear-gradient(to top, rgba(18,14,10,0.40) 0%, rgba(18,14,10,0.24) 50%, rgba(18,14,10,0) 100%)";

/** Keeps the cream type legible where the scrim feathers toward the plates. */
const TEXT_SHADOW = "0 1px 3px rgba(18,14,10,0.65), 0 3px 26px rgba(18,14,10,0.55)";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-label={brandName}
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
          className="hero-swiper h-full w-full"
        >
          {heroSlides.map((slide, i) => (
            <SwiperSlide key={slide.src}>
              {/* Art direction, not a size hint: a phone takes the tall frame of
                  the same photograph, every wider screen takes the 16:9 frame. */}
              <picture>
                <source
                  media="(max-width: 640px), (max-width: 900px) and (orientation: portrait)"
                  srcSet={slide.phone.src}
                />
                <img
                  src={slide.src}
                  width={slide.width}
                  height={slide.height}
                  alt={slide.alt}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </picture>
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
          <div className="flex flex-col gap-9 sm:flex-row sm:items-end sm:justify-between sm:gap-12">
            <div className="max-w-[56rem]">
              <span className="mb-6 block h-[3px] w-16 bg-gold" aria-hidden="true" />
              <h1
                className="text-balance font-display text-[clamp(2.6rem,7.5vw,5.75rem)] font-semibold leading-[1.0] tracking-[-0.02em] text-cream"
                style={{ textShadow: TEXT_SHADOW }}
              >
                Construction built as craft.
              </h1>
              <p
                className="mt-8 max-w-[50rem] font-body text-[clamp(1.12rem,1.75vw,1.5rem)] font-medium leading-[1.72] text-cream/95 sm:mt-7"
                style={{ textShadow: TEXT_SHADOW }}
              >
                <span className="block">Art and design sit at the core of everything we build: </span>
                <span className="block">civil works, earthwork and levelling, machine and material supply, </span>
                <span className="block">and rammed earth and mud construction.</span>
              </p>

              <div className="mt-9">
                <Button to="/contact" variant="cream" size="lg">
                  Tell us about your site
                </Button>
              </div>
            </div>

            {/* The office signs the hero: the brand lockup's grammar, mirrored
                into the opposite corner. On a phone it stacks under the action,
                right-aligned, which is the same corner. */}
            <p
              className="self-end text-right sm:pb-[6px]"
              style={{ textShadow: TEXT_SHADOW }}
              data-hero-signature
            >
              <span
                className="mb-[13px] ml-auto block h-[3px] w-16 bg-gold"
                aria-hidden="true"
              />
              <span
                className="block font-mark text-[0.95rem] uppercase leading-none tracking-[0.22em] text-cream sm:text-[1.06rem]"
                data-hero-signature-name
              >
                {signatory.name}
              </span>
              <span
                className="mt-[8px] block font-body text-[10px] font-semibold uppercase leading-none tracking-[0.15em] text-cream/90"
                data-hero-signature-role
              >
                {signatory.role}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
