/**
 * fonts.ts
 * ---------------------------------------------------------------------------
 * Three candidate typeface pairings for fwd., loaded ready for comparison on
 * the /review page. Nothing is committed yet - Sophie picks one, then we set
 * `CHOSEN_PAIRING` below and the rest of the site follows automatically.
 *
 * Every one of these is downloaded and served from our own site at build time,
 * so no visitor's browser ever contacts Google. That is better for privacy and
 * faster to load.
 *
 * Each pairing supplies three roles:
 *   display     - headings and the fwd. wordmark. A high-contrast lowercase serif.
 *   endorsement - the "by influencer" signature. The italic of the display face.
 *   body        - everything you actually read. Chosen to be highly legible.
 */

import {
  Instrument_Serif,
  Instrument_Sans,
  Bodoni_Moda,
  Inter,
  Fraunces,
  Figtree,
} from "next/font/google";

/* ---- Pairing A: Instrument Serif + Instrument Sans ---------------------- */

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-serif",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-sans",
});

/* ---- Pairing B: Bodoni Moda + Inter ------------------------------------- */

const bodoniModa = Bodoni_Moda({
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bodoni-moda",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/* ---- Pairing C: Fraunces + Figtree -------------------------------------- */

const fraunces = Fraunces({
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});

const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
});

/** Every font variable, applied once on <html> so any of them can be used. */
export const fontVariables = [
  instrumentSerif.variable,
  instrumentSans.variable,
  bodoniModa.variable,
  inter.variable,
  fraunces.variable,
  figtree.variable,
].join(" ");

export type PairingId = "a" | "b" | "c";

export type Pairing = {
  id: PairingId;
  name: string;
  /** One line on the character of the pairing, for the review page. */
  character: string;
  /** What it risks, said plainly. Every option has a downside. */
  tradeoff: string;
  displayFamily: string;
  bodyFamily: string;
  /** CSS custom-property values to apply this pairing to a block. */
  style: React.CSSProperties;
};

export const PAIRINGS: Pairing[] = [
  {
    id: "a",
    name: "Instrument Serif + Instrument Sans",
    character:
      "Modern and quietly confident. The serif has real contrast between thick and thin strokes without being showy, and the sans is by the same designers so the two sit together naturally. Closest to how a contemporary members' club looks now.",
    tradeoff:
      "Instrument Serif comes in one weight only, so headings cannot be made bolder or lighter. In practice that suits a restrained design, but it is a real constraint.",
    displayFamily: "var(--font-instrument-serif)",
    bodyFamily: "var(--font-instrument-sans)",
    style: {
      "--fwd-font-display": "var(--font-instrument-serif)",
      "--fwd-font-endorsement": "var(--font-instrument-serif)",
      "--fwd-font-body": "var(--font-instrument-sans)",
    } as React.CSSProperties,
  },
  {
    id: "b",
    name: "Bodoni Moda + Inter",
    character:
      "The sharpest and most formal of the three. Very high contrast strokes, closer to fashion and luxury publishing. Inter underneath is the most neutral, hardest-working body face available.",
    tradeoff:
      "The thin strokes can disappear at small sizes and on low-quality screens, and Bodoni reads as fashion more than as industry. It is the option most likely to feel like it is trying.",
    displayFamily: "var(--font-bodoni-moda)",
    bodyFamily: "var(--font-inter)",
    style: {
      "--fwd-font-display": "var(--font-bodoni-moda)",
      "--fwd-font-endorsement": "var(--font-bodoni-moda)",
      "--fwd-font-body": "var(--font-inter)",
    } as React.CSSProperties,
  },
  {
    id: "c",
    name: "Fraunces + Figtree",
    character:
      "The warmest of the three. Fraunces has a slight softness and irregularity that picks up the candlelight and skin tones in the photography. Figtree is friendly and open without being casual.",
    tradeoff:
      "The warmth shades towards charm, which can undercut a senior, selective room. It is the furthest from the crisp serif in the approved wordmark.",
    displayFamily: "var(--font-fraunces)",
    bodyFamily: "var(--font-figtree)",
    style: {
      "--fwd-font-display": "var(--font-fraunces)",
      "--fwd-font-endorsement": "var(--font-fraunces)",
      "--fwd-font-body": "var(--font-figtree)",
    } as React.CSSProperties,
  },
];

/**
 * CHANGE THIS ONE LETTER once a pairing is chosen ("a", "b" or "c").
 * The whole site picks it up. Until then it is set to "a" as a working default.
 */
export const CHOSEN_PAIRING: PairingId = "a";

export const chosenPairing =
  PAIRINGS.find((p) => p.id === CHOSEN_PAIRING) ?? PAIRINGS[0];
