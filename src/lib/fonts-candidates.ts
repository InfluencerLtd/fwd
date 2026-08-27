/**
 * fonts-candidates.ts
 * ---------------------------------------------------------------------------
 * The three typeface pairings that were compared, kept so the decision can be
 * revisited on /review.
 *
 * IMPORTANT: this file is imported by the /review page and by nothing else.
 * That is deliberate. If it were imported by the layout, every visitor to the
 * public site would download six typefaces to look at two.
 */

import {
  Instrument_Serif,
  Instrument_Sans,
  Bodoni_Moda,
  Inter,
  Fraunces,
  Figtree,
} from "next/font/google";

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

/** Put this on a wrapper inside /review so all six are available there. */
export const candidateFontVariables = [
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
  chosen?: boolean;
  character: string;
  tradeoff: string;
  displayFamily: string;
  bodyFamily: string;
  style: React.CSSProperties;
};

export const PAIRINGS: Pairing[] = [
  {
    id: "a",
    name: "Instrument Serif + Instrument Sans",
    chosen: true,
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
