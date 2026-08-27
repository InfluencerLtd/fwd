/**
 * fonts.ts
 * ---------------------------------------------------------------------------
 * THE TYPEFACES THE PUBLIC SITE ACTUALLY USES.
 *
 * SIGNED OFF: Option A, Instrument Serif with Instrument Sans.
 *
 * Only the chosen pairing is loaded here. The two options that were not chosen
 * live in fonts-candidates.ts and are loaded by the /review page alone, so a
 * visitor to the real site never downloads a typeface we decided against. That
 * split is the only reason there are two files.
 *
 * TO CHANGE THE PAIRING: swap the two imports and the two calls below for the
 * ones you want, keeping the same variable names. Everything else follows.
 *
 * Both faces are downloaded at build time and served from our own site, so no
 * visitor's browser ever contacts Google. Better for privacy, and faster.
 */

import { Instrument_Serif, Instrument_Sans } from "next/font/google";

/** Headings, the fwd. wordmark, and the italic used for "by influencer". */
const display = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display-face",
});

/** Everything you actually read. */
const body = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body-face",
});

/** Goes on <html> so both faces are available everywhere. */
export const fontVariables = `${display.variable} ${body.variable}`;

/**
 * Points the design tokens at the chosen faces. Components only ever refer to
 * `font-display` and `font-body`, never to a typeface by name.
 */
export const rootFontStyle = {
  "--fwd-font-display": "var(--font-display-face)",
  "--fwd-font-endorsement": "var(--font-display-face)",
  "--fwd-font-body": "var(--font-body-face)",
} as React.CSSProperties;
