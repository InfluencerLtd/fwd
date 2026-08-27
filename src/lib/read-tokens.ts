/**
 * read-tokens.ts  (runs on the server only)
 * ---------------------------------------------------------------------------
 * Reads the colour values straight out of `src/app/globals.css`.
 *
 * Why bother instead of just typing the colours in twice? Because then the
 * swatch page could quietly disagree with the real site. This way the swatches
 * and the measured contrast numbers are guaranteed to be the colours that
 * actually ship. If someone changes a colour in globals.css, this page updates
 * itself.
 */

import { readFile } from "node:fs/promises";
import path from "node:path";

export type TokenSet = Record<string, string>;

const CSS_PATH = path.join(process.cwd(), "src", "app", "globals.css");

function extractBlock(css: string, marker: string): string {
  const start = css.indexOf(`/* @tokens:${marker}`);
  if (start === -1) throw new Error(`Missing marker @tokens:${marker} in globals.css`);
  const end = css.indexOf("/* @tokens:end */", start);
  if (end === -1) throw new Error(`Missing @tokens:end after @tokens:${marker}`);
  return css.slice(start, end);
}

function parseTokens(block: string): TokenSet {
  const tokens: TokenSet = {};
  const re = /--fwd-([a-z-]+)\s*:\s*(#[0-9a-fA-F]{3,8})\s*;/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(block)) !== null) {
    tokens[m[1]] = m[2].toLowerCase();
  }
  return tokens;
}

export async function readTokenSets(): Promise<{
  light: TokenSet;
  dark: TokenSet;
  names: string[];
}> {
  const css = await readFile(CSS_PATH, "utf8");
  const light = parseTokens(extractBlock(css, "light"));
  const dark = parseTokens(extractBlock(css, "dark"));

  const names = Object.keys(light);
  const missing = names.filter((n) => !(n in dark));
  if (missing.length) {
    throw new Error(
      `These tokens exist in light mode but not dark mode: ${missing.join(", ")}`,
    );
  }
  return { light, dark, names };
}
