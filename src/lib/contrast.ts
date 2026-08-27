/**
 * contrast.ts
 * ---------------------------------------------------------------------------
 * Measures colour contrast the way the accessibility standard (WCAG 2.1)
 * defines it, so the /review page can show real measured numbers rather than
 * numbers somebody typed in and hoped were right.
 *
 * A "ratio" compares how different two colours are in brightness.
 *   21:1  is black on white, the maximum
 *   4.5:1 is the minimum for normal-size text at AA
 *   3:1   is the minimum for large text (24px+, or 18.66px+ bold) and for the
 *         edges of buttons and form fields
 */

export type Rgb = { r: number; g: number; b: number };

export function hexToRgb(hex: string): Rgb {
  const h = hex.replace("#", "").trim();
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) {
    throw new Error(`Not a valid hex colour: "${hex}"`);
  }
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

/** Relative luminance, per WCAG 2.1 definition. */
export function relativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const channel = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/** Contrast ratio between two colours. Always returns a value from 1 to 21. */
export function contrastRatio(foreground: string, background: string): number {
  const a = relativeLuminance(foreground);
  const b = relativeLuminance(background);
  const lighter = Math.max(a, b);
  const darker = Math.min(a, b);
  return (lighter + 0.05) / (darker + 0.05);
}

export type ContrastVerdict = {
  ratio: number;
  /** Rounded for display, e.g. "13.96" */
  display: string;
  /** Passes AA for normal body text (needs 4.5:1) */
  passesBodyText: boolean;
  /** Passes AA for large headings and UI edges (needs 3:1) */
  passesLargeText: boolean;
  /** Passes the stricter AAA level for body text (needs 7:1) */
  passesAAA: boolean;
  /** Plain-English summary, safe to show a non-technical reader. */
  plainEnglish: string;
};

export function assess(foreground: string, background: string): ContrastVerdict {
  const ratio = contrastRatio(foreground, background);
  const passesBodyText = ratio >= 4.5;
  const passesLargeText = ratio >= 3;
  const passesAAA = ratio >= 7;

  let plainEnglish: string;
  if (passesAAA) plainEnglish = "Excellent. Safe for any text size.";
  else if (passesBodyText) plainEnglish = "Passes. Safe for body text.";
  else if (passesLargeText) plainEnglish = "Large headings only. Not for body text.";
  else plainEnglish = "Fails. Do not use these two together for text.";

  return {
    ratio,
    display: ratio.toFixed(2),
    passesBodyText,
    passesLargeText,
    passesAAA,
    plainEnglish,
  };
}
