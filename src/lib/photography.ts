/**
 * photography.ts  (server only)
 * ---------------------------------------------------------------------------
 * Finds the real photographs, if they exist yet.
 *
 * HOW TO ADD A PHOTOGRAPH: save the file into `public/photography/` with the
 * right name. That is the whole job. No code changes, nothing to uncomment.
 * The name to use is written next to each shot in IMAGERY in
 * src/content/site.ts, and the folder's own README lists them all.
 *
 * Until a file is there, that spot keeps its warm labelled placeholder, so the
 * site is never broken by a photograph that has not been taken yet and it is
 * always obvious which ones are still missing.
 */

import { existsSync } from "node:fs";
import path from "node:path";

const FOLDER = "photography";

/** Checked in order, so a .webp is preferred over a .jpg of the same name. */
const EXTENSIONS = [".avif", ".webp", ".jpg", ".jpeg", ".png"];

/**
 * @param name the file's name without its extension, e.g. "hero"
 * @returns the web path to it, or null if it has not been added yet
 */
export function photoSrc(name: string | undefined): string | null {
  if (!name) return null;

  for (const extension of EXTENSIONS) {
    const file = path.join(process.cwd(), "public", FOLDER, name + extension);
    if (existsSync(file)) return `/${FOLDER}/${name}${extension}`;
  }
  return null;
}
