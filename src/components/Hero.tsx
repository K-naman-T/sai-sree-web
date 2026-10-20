import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { useReducedMotion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-fade";
import { brandName, heroSlides, signatory } from "@/data/site";
import { Button } from "@/components/ui/Button";

/**
 * Full-viewport hero: a multi-image auto-carousel (crossfade, ~5.2s) with a slow
 * Ken Burns drift. No on-screen controls — the slide counter and tick indicators
 * were removed on the client's call (R12b). Motion stops under
 * prefers-reduced-motion and pauses on hover.
 *
 * Placement, set by the office on 2026-10-19: the enterprise name leads in the
 * header, the hero reveals the brand wordmark top-left,
 * the signature sits left of centre, the statement paragraph holds the
 * bottom-left and the headline with its action holds the bottom-right.
 *
 * Contrast: the type now runs up the left edge and across the middle, so the
 * scrim carries a left column layer and a soft pool under the signature on top
 * of the bottom band. Measured, not assumed: audit/hero-contrast.mjs samples the
 * real pixels behind every text box.
 */
const SCRIM = [
  // Top band: keeps the nav crisp over the plate border.
  "linear-gradient(to bottom, rgba(18,14,10,0.14) 0%, rgba(18,14,10,0.14) 8%, rgba(18,14,10,0) 16%)",
  // Bottom band: the paragraph and the headline sit on this.
  "linear-gradient(to top, rgba(18,14,10,0.90) 0%, rgba(18,14,10,0.85) 47%, rgba(18,14,10,0.38) 58%, rgba(18,14,10,0) 68%)",
  // Top-left wash: follows the brand reveal and the signature down the diagonal,
  // which is the only way the 100px wordmark holds over a bright sky.
  "linear-gradient(115deg, rgba(18,14,10,0.84) 0%, rgba(18,14,10,0.75) 40%, rgba(18,14,10,0.46) 50%, rgba(18,14,10,0.18) 60%, rgba(18,14,10,0) 68%)",
].join(", ");

/** Mobile-only: the column stacks down the top half, so the shade follows it
 *  down from the top instead of hugging the bottom edge. */
const MOBILE_WASH =
  "linear-gradient(to bottom, rgba(18,14,10,0.72) 0%, rgba(18,14,10,0.58) 26%, rgba(18,14,10,0.42) 44%, rgba(18,14,10,0.14) 58%, rgba(18,14,10,0) 70%)";

/** Keeps the cream type legible where the scrim feathers toward the plates. */
const TEXT_SHADOW = "0 1px 3px rgba(18,14,10,0.65), 0 3px 26px rgba(18,14,10,0.55)";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-label={brandName}
      data-viewport-exempt
      className="relative isolate h-[100dvh] min-h-[600px] w-full overflow-hidden bg-ink"
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
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[80%] sm:hidden"
        style={{ backgroundImage: MOBILE_WASH }}
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mx-auto flex h-full w-full max-w-[1400px] flex-col px-[clamp(18px,5vw,28px)] pb-[clamp(28px,6vh,64px)] pt-[calc(68px+clamp(18px,5vh,62px))] lg:[@media(max-height:880px)]:pt-[calc(68px+clamp(10px,3vh,44px))]">
          {/* The brand reveal, top-left: the wordmark on its own. */}
          <div className="max-w-[52rem]">
            <p
              className="font-mark text-[clamp(2.1rem,7vw,6.6rem)] uppercase leading-[0.95] tracking-[0.16em] text-cream sm:tracking-[0.2em]"
              style={{ textShadow: TEXT_SHADOW }}
              data-hero-brand
            >
              {brandName}
            </p>
          </div>

          {/* The office signs the hero, on the brand's own left edge, and the
              statement follows it down the same column. */}
          <p
            className="mt-[clamp(30px,6vh,64px)] self-start text-left md:mt-[clamp(48px,10vh,104px)] lg:[@media(max-height:880px)]:mt-[clamp(32px,5vh,60px)]"
            style={{ textShadow: TEXT_SHADOW }}
            data-hero-signature
          >
            <span className="mb-[13px] block h-[3px] w-16 bg-gold" aria-hidden="true" />
            <span
              className="block font-mark text-[0.95rem] uppercase leading-tight tracking-[0.22em] text-cream sm:text-[1.06rem]"
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

          {/* The statement continues the signed column, under the role. */}
          <p
            className="mt-[clamp(34px,5.6vh,58px)] max-w-[50rem] lg:[@media(max-height:880px)]:mt-[clamp(24px,3.4vh,38px)] font-body text-[clamp(1rem,1.75vw,1.5rem)] font-medium leading-[1.66] text-cream/95"
            style={{ textShadow: TEXT_SHADOW }}
            data-hero-statement
          >
            <span className="sm:block">Art and design sit at the core of everything we build: </span>{" "}
            <span className="sm:block">Civil works, Earthwork and levelling, Machine and Material supply, </span>{" "}
            <span className="sm:block">and Rammed Earth and Mud Construction.</span>
          </p>

          {/* The action closes the column, under the statement. */}
          <div className="mt-[clamp(22px,3.4vh,34px)]">
            <Button to="/contact" variant="cream" size="lg">
              Tell us about your site
            </Button>
          </div>

          {/* Bottom band: the headline and its action hold the lower right. */}
          <div className="mt-auto flex flex-col items-end pt-[clamp(12px,2vh,22px)]">
            <div className="w-full max-w-[44rem] lg:text-right">
              <span
                className="mb-6 block h-[3px] w-16 bg-gold lg:ml-auto"
                aria-hidden="true"
              />
              <h1
                className="text-balance font-display text-[clamp(2.2rem,6.6vw,5rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-cream [@media(max-height:860px)]:text-[clamp(2rem,5.6vw,4.2rem)]"
                style={{ textShadow: TEXT_SHADOW }}
              >
                Construction built as craft.
              </h1>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
