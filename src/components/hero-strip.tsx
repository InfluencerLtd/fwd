import { HERO_STRIP } from "@/content/hero-modules";

/**
 * Three figures along the bottom of the hero: places left, the first room, and
 * New York.
 *
 * INSIDE THE HERO RATHER THAN UNDER IT, which is the whole point of moving it
 * here. Below the photograph it was a second section and a second scroll; on
 * the picture it means the first screen carries a fact as well as a mood, and
 * somebody who never scrolls has still been told something true.
 *
 * IT READS AS FACT, NOT AS A COUNTDOWN. No counting up, no clock, no hours or
 * minutes, nothing that moves as the date approaches. A figure that animates is
 * asking to be believed.
 *
 * The dates are written as they are meant to be read — 21.10, not "21 October"
 * — because at this size the full stop between two numbers does the same work
 * as the space between the three figures. It is a schedule, not a sentence.
 *
 * WHAT DROPS AT WHICH WIDTH. Three across a phone is three columns of about
 * a hundred pixels, and "founding places remaining" does not fit in one. So
 * below 700px they stack, and below 500px the third goes entirely: a strip
 * that fills a phone screen is not a strip any more, and the two dates are the
 * two that are settled.
 */
export function HeroStrip() {
  const places = HERO_STRIP.foundingPlaces;

  const figures = [
    places === null
      ? null
      : {
          value: String(places),
          label: HERO_STRIP.foundingPlacesLabel,
          // First to go on the narrowest screens.
          dropsFirst: false,
        },
    {
      value: HERO_STRIP.firstRoom,
      label: HERO_STRIP.firstRoomLabel,
      dropsFirst: false,
    },
    {
      value: HERO_STRIP.newYork,
      label: HERO_STRIP.newYorkLabel,
      dropsFirst: true,
    },
  ].filter((f) => f !== null);

  return (
    <div className="relative z-2 w-full">
      {/* The gradient is part of the strip rather than part of the picture, so
          the numbers are legible whatever photograph is behind them and
          whichever one of a set is showing. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[230px] bg-gradient-to-t from-black/[0.82] to-transparent"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-8 pb-[26px] pt-[22px] text-center min-[700px]:flex-row min-[700px]:justify-between min-[700px]:gap-4 min-[700px]:text-left">
          {figures.map((figure) => (
            <div
              key={figure.label}
              className={
                figure.dropsFirst ? "hidden min-[500px]:block" : undefined
              }
            >
              <p className="font-display text-[40px] leading-none text-accent-on-dark">
                {figure.value}
              </p>
              <p className="mt-2 font-body text-[10.5px] uppercase tracking-[0.16em] text-photo-ink/60">
                {figure.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
