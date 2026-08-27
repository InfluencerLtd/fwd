import type { Metadata } from "next";
import { readTokenSets, type TokenSet } from "@/lib/read-tokens";
import { assess } from "@/lib/contrast";
import { BRAND } from "@/lib/brand";
import { PAIRINGS, type Pairing } from "@/lib/fonts";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: `${BRAND.markShort} design review`,
  // Internal working page. Never to be found in a search engine.
  robots: { index: false, follow: false },
};

/* ========================================================================== */
/* Small building blocks                                                      */
/* ========================================================================== */

function Section({
  number,
  title,
  intro,
  children,
}: {
  number: string;
  title: string;
  intro: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border py-16">
      <div className="mx-auto max-w-5xl px-6">
        <p className="font-body text-xs tracking-[0.2em] text-ink-muted">
          {number}
        </p>
        <h2 className="mt-3 text-3xl sm:text-4xl">{title}</h2>
        <div className="mt-4 max-w-2xl font-body text-[15px] leading-relaxed text-ink-muted">
          {intro}
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

/** A panel that forces its contents into one mode, so both can be seen at once. */
function ModePanel({
  mode,
  children,
}: {
  mode: "light" | "dark";
  children: React.ReactNode;
}) {
  return (
    <div className={mode === "dark" ? "dark" : undefined}>
      <div className="fwd-grain h-full rounded-sm border border-border bg-surface p-6">
        <div className="relative z-1">
          <p className="font-body text-[11px] uppercase tracking-[0.18em] text-ink-muted">
            {mode === "light" ? "Light, the default" : "Dark"}
          </p>
          <div className="mt-5">{children}</div>
        </div>
      </div>
    </div>
  );
}

function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex items-center gap-4">
      <div
        aria-hidden="true"
        className="h-11 w-11 shrink-0 rounded-sm border border-border"
        style={{ backgroundColor: value }}
      />
      <div className="min-w-0 font-body">
        <p className="truncate text-sm text-ink">{name}</p>
        <p className="font-mono text-xs text-ink-muted">{value}</p>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* Contrast                                                                   */
/* ========================================================================== */

type Pair = { fg: string; bg: string; note?: string; forbidden?: boolean };

const LIGHT_PAIRS: Pair[] = [
  { fg: "ink", bg: "surface", note: "Body text on the page" },
  { fg: "ink", bg: "surface-raised", note: "Body text on a card" },
  { fg: "ink-muted", bg: "surface", note: "Captions and labels" },
  { fg: "ink-muted", bg: "surface-raised", note: "Captions on a card" },
  { fg: "accent", bg: "surface", note: "Links and buttons" },
  { fg: "accent", bg: "surface-raised", note: "Links on a card" },
  {
    fg: "accent-on-dark",
    bg: "surface",
    note: "The pale blue on a light ground",
    forbidden: true,
  },
];

const DARK_PAIRS: Pair[] = [
  { fg: "ink", bg: "surface", note: "Body text on the page" },
  { fg: "ink", bg: "surface-raised", note: "Body text on a card" },
  { fg: "ink-muted", bg: "surface", note: "Captions and labels" },
  { fg: "ink-muted", bg: "surface-raised", note: "Captions on a card" },
  { fg: "accent", bg: "surface", note: "Links and buttons" },
  { fg: "accent-on-dark", bg: "surface", note: "The pale blue on a dark ground" },
];

function ContrastTable({
  pairs,
  tokens,
  caption,
}: {
  pairs: Pair[];
  tokens: TokenSet;
  caption: string;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[34rem] border-collapse font-body text-sm">
        <caption className="mb-3 text-left text-[11px] uppercase tracking-[0.18em] text-ink-muted">
          {caption}
        </caption>
        <thead>
          <tr className="border-b border-border text-left text-xs text-ink-muted">
            <th scope="col" className="w-[38%] py-2 pr-4 font-normal">Combination</th>
            <th scope="col" className="py-2 pr-4 font-normal">Sample</th>
            <th scope="col" className="py-2 pr-4 font-normal">Measured</th>
            <th scope="col" className="w-[34%] py-2 font-normal">Verdict</th>
          </tr>
        </thead>
        <tbody>
          {pairs.map((p) => {
            const fg = tokens[p.fg];
            const bg = tokens[p.bg];
            const v = assess(fg, bg);
            return (
              <tr
                key={`${p.fg}-${p.bg}`}
                className="border-b border-border align-middle"
              >
                <td className="py-3 pr-4">
                  <span className="text-ink">{p.note}</span>
                  <br />
                  <span className="font-mono text-[11px] text-ink-muted">
                    {p.fg} on {p.bg}
                  </span>
                </td>
                <td className="py-3 pr-4">
                  <span
                    className="inline-block rounded-sm px-3 py-2 text-[13px]"
                    style={{ backgroundColor: bg, color: fg }}
                  >
                    the room
                  </span>
                </td>
                <td className="py-3 pr-4 font-mono text-ink">
                  {v.display}:1
                </td>
                <td className="py-3">
                  <span
                    className={
                      v.passesBodyText
                        ? "text-ink"
                        : "font-medium text-ink underline decoration-2 underline-offset-4"
                    }
                  >
                    {p.forbidden && !v.passesBodyText ? "Never use. " : ""}
                    {v.plainEnglish}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ========================================================================== */
/* Grain                                                                      */
/* ========================================================================== */

const GRAIN_STRENGTHS = [
  { value: 0.02, label: "Barely there", note: "Felt only on a good screen." },
  { value: 0.035, label: "Recommended", note: "Reads as texture, not as noise." },
  { value: 0.055, label: "Pronounced", note: "Clearly visible. Closer to film." },
];

function GrainSample({
  strength,
  mode,
}: {
  strength: (typeof GRAIN_STRENGTHS)[number];
  mode: "light" | "dark";
}) {
  return (
    <div className={mode === "dark" ? "dark" : undefined}>
      <div
        className="fwd-grain flex h-40 flex-col justify-end rounded-sm border border-border bg-surface p-4"
        style={
          { "--fwd-grain-opacity": strength.value } as React.CSSProperties
        }
      >
        <div className="relative z-1 font-body">
          <p className="text-sm text-ink">{strength.label}</p>
          <p className="font-mono text-[11px] text-ink-muted">
            opacity {strength.value}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* Typography                                                                 */
/* ========================================================================== */

function PairingSample({ pairing }: { pairing: Pairing }) {
  return (
    <article style={pairing.style} className="border-t border-border pt-8">
      <header className="font-body">
        <h3 className="font-body text-xs uppercase tracking-[0.18em] text-ink-muted">
          Option {pairing.id.toUpperCase()}
        </h3>
        <p className="mt-1 text-lg text-ink">{pairing.name}</p>
      </header>

      {/* A stand-in for the hero. The ground stays dark in BOTH modes, which is
          how the approved identity works. */}
      <div className="fwd-grain mt-6 overflow-hidden rounded-sm bg-photo-ground">
        <div
          className="relative z-1 flex min-h-56 flex-col justify-between p-7"
          style={{ "--fwd-grain-opacity": 0.05 } as React.CSSProperties}
        >
          <p className="font-body text-[11px] tracking-[0.18em] text-photo-ink/60">
            placeholder for the hero photograph
          </p>
          <div className="flex items-end justify-between gap-6">
            <span
              className="text-6xl leading-none text-accent-on-dark sm:text-7xl"
              style={{ fontFamily: pairing.displayFamily }}
            >
              {BRAND.markShort}
            </span>
            <span
              className="pb-2 text-lg italic text-photo-ink/75"
              style={{ fontFamily: pairing.displayFamily }}
            >
              {BRAND.endorsement}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-8 sm:grid-cols-[1fr_1fr]">
        <div>
          <h4
            className="text-3xl text-ink"
            style={{ fontFamily: pairing.displayFamily }}
          >
            a room worth being in
          </h4>
          <p
            className="mt-3 text-[15px] leading-relaxed text-ink-muted"
            style={{ fontFamily: pairing.bodyFamily }}
          >
            An ongoing community across brands, creators, platforms and the wider
            industry. It runs in person and online, all year. There is no
            permanent space, and that is deliberate. The club is the people in it.
          </p>
        </div>
        <div style={{ fontFamily: pairing.bodyFamily }}>
          <p className="text-[13px] leading-relaxed text-ink">
            <span className="text-ink-muted">Character. </span>
            {pairing.character}
          </p>
          <p className="mt-3 text-[13px] leading-relaxed text-ink">
            <span className="text-ink-muted">Trade-off. </span>
            {pairing.tradeoff}
          </p>
        </div>
      </div>
    </article>
  );
}

/* ========================================================================== */
/* Page                                                                       */
/* ========================================================================== */

export default async function ReviewPage() {
  const { light, dark, names } = await readTokenSets();

  return (
    <main className="font-body">
      <header className="mx-auto flex max-w-5xl items-start justify-between gap-6 px-6 pb-12 pt-16">
        <div>
          <p className="text-xs tracking-[0.2em] text-ink-muted">
            internal working page, not part of the public site
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl">
            {BRAND.markShort} design review
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
            Three decisions are needed before the public site is built: the grain
            strength, the typeface pairing, and confirmation that the palette is
            right. Everything below is the real code, not a picture of it. The
            colours and the contrast numbers are read directly out of the
            stylesheet the site uses, so what you see here is what would ship.
          </p>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
            The toggle on the right switches this page between light and dark, so
            you can see the whole thing either way. Sections 1 to 3 also show both
            modes side by side at once.
          </p>
        </div>
        <ThemeToggle className="mt-1 shrink-0" />
      </header>

      {/* ---------------------------------------------------------------- */}
      <Section
        number="01"
        title="the palette"
        intro={
          <>
            <p>
              Seven colours, named by their job rather than by what they look
              like. A component never says &ldquo;use pale blue&rdquo;, it says
              &ldquo;use the accent&rdquo;, and the mode decides what that means.
              That is why both modes stay consistent instead of one being an
              upside-down version of the other.
            </p>
            <p className="mt-3">
              Warmth comes from photography, not from the interface. There is no
              second brand colour anywhere in here on purpose.
            </p>
          </>
        }
      >
        <div className="grid gap-6 md:grid-cols-2">
          {(["light", "dark"] as const).map((mode) => (
            <ModePanel key={mode} mode={mode}>
              <div className="grid gap-4 sm:grid-cols-2">
                {names.map((n) => (
                  <Swatch
                    key={n}
                    name={n}
                    value={mode === "light" ? light[n] : dark[n]}
                  />
                ))}
              </div>
            </ModePanel>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section
        number="02"
        title="contrast, measured"
        intro={
          <>
            <p>
              These numbers are calculated live by the page, using the official
              accessibility formula. A ratio of 4.5 to 1 is the minimum for normal
              text. 3 to 1 is the minimum for large headings. Higher is better.
            </p>
            <p className="mt-3">
              The row to look at is the last one in the light table. The pale ice
              blue on the off-white ground measures far below the minimum, which
              is why the rule exists: that blue only ever appears on dark grounds
              or over dark photography.
            </p>
          </>
        }
      >
        <div className="space-y-12">
          <ContrastTable
            pairs={LIGHT_PAIRS}
            tokens={light}
            caption="Light mode"
          />
          <ContrastTable pairs={DARK_PAIRS} tokens={dark} caption="Dark mode" />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-sm border border-border bg-surface-raised p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-ink-muted">
              What this looks like
            </p>
            <div
              className="mt-4 rounded-sm p-5"
              style={{ backgroundColor: light["surface"] }}
            >
              <p
                className="text-xl"
                style={{ color: light["accent-on-dark"] }}
              >
                you can barely read this
              </p>
              <p
                className="mt-2 text-sm"
                style={{ color: light["ink-muted"] }}
              >
                Pale blue on off-white, measured at{" "}
                {assess(light["accent-on-dark"], light["surface"]).display}:1.
                This never ships.
              </p>
            </div>
          </div>
          <div className="rounded-sm border border-border bg-surface-raised p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-ink-muted">
              What it should be instead
            </p>
            <div
              className="mt-4 rounded-sm p-5"
              style={{ backgroundColor: light["surface"] }}
            >
              <p className="text-xl" style={{ color: light["accent"] }}>
                and this reads cleanly
              </p>
              <p
                className="mt-2 text-sm"
                style={{ color: light["ink-muted"] }}
              >
                Deep blue on off-white, measured at{" "}
                {assess(light["accent"], light["surface"]).display}:1. Same
                family, same feeling, legible.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section
        number="03"
        title="grain"
        intro={
          <p>
            The reference photograph already carries film grain, so the flat parts
            of the site need a little texture or they look plain next to it. Three
            strengths, on both grounds. It is one number in one file, so it can be
            changed at any point. Pick the one that you notice least while still
            feeling the page is not flat.
          </p>
        }
      >
        <div className="space-y-4">
          {(["light", "dark"] as const).map((mode) => (
            <div key={mode} className="grid gap-4 sm:grid-cols-3">
              {GRAIN_STRENGTHS.map((s) => (
                <GrainSample key={`${mode}-${s.value}`} strength={s} mode={mode} />
              ))}
            </div>
          ))}
        </div>
        <ul className="mt-6 space-y-1 text-sm text-ink-muted">
          {GRAIN_STRENGTHS.map((s) => (
            <li key={s.value}>
              <span className="text-ink">{s.label}.</span> {s.note}
            </li>
          ))}
        </ul>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section
        number="04"
        title="typeface pairings"
        intro={
          <>
            <p>
              Three options, each shown as a stand-in hero, a heading and a
              paragraph of real copy. Headings are lowercase throughout. The{" "}
              {BRAND.endorsement} line is the italic of whichever serif is chosen,
              so the two always belong together.
            </p>
            <p className="mt-3">
              The dark block in each option is the hero. It stays dark in light
              mode as well as dark mode, which is how the approved identity works.
              The grey area inside it is where the photograph goes.
            </p>
          </>
        }
      >
        <div className="space-y-14">
          {PAIRINGS.map((p) => (
            <PairingSample key={p.id} pairing={p} />
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section
        number="05"
        title="what I need back"
        intro={
          <p>
            Short answers are fine. Once these are settled the public page gets
            built on top of exactly what is above.
          </p>
        }
      >
        <ol className="max-w-2xl space-y-4 text-[15px] leading-relaxed text-ink">
          <li>
            <span className="text-ink-muted">1. Grain. </span>
            Barely there, recommended, or pronounced.
          </li>
          <li>
            <span className="text-ink-muted">2. Type. </span>
            Option A, B or C. If none of them are right, say what is wrong with
            the closest one and I will bring three more.
          </li>
          <li>
            <span className="text-ink-muted">3. Palette. </span>
            Confirm the seven colours are right, or name the one that is not.
          </li>
          <li>
            <span className="text-ink-muted">4. Photography. </span>
            I have no images. Every photograph on the site is currently a labelled
            placeholder. I need the approved hero shot and a handful of others in
            the same register, or a source to pull them from.
          </li>
        </ol>
      </Section>
    </main>
  );
}
