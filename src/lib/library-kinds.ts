/**
 * library-kinds.ts
 * ---------------------------------------------------------------------------
 * THE LIST OF THINGS THE LIBRARY CAN HOLD.
 *
 * >>> TO ADD A NEW KIND OF CONTENT, ADD ONE ENTRY BELOW. THAT IS THE WHOLE JOB.
 *
 * No database change, no new page, no new admin screen. The library, the
 * filters, the admin form and the reading page all read this list, so a new
 * kind appears everywhere at once.
 *
 * That is deliberate. The brief asks that adding a type later must not mean
 * rebuilding, which is why the database stores this as plain text rather than
 * as a fixed list it would have to be migrated to change.
 */

export type LibraryKind = {
  /** Stored in the database. Lowercase, no spaces. Never change an existing one. */
  id: string;
  /** What one item is called. */
  label: string;
  /** What several are called, used for headings and filters. */
  plural: string;
  /**
   * Whether this kind is normally a file to download rather than something
   * written to be read on the site. Only changes the wording, never the rules.
   */
  usuallyAFile: boolean;
};

export const LIBRARY_KINDS: LibraryKind[] = [
  { id: "research", label: "Research", plural: "Research", usuallyAFile: true },
  { id: "white_paper", label: "White paper", plural: "White papers", usuallyAFile: true },
  { id: "recap", label: "Event recap", plural: "Event recaps", usuallyAFile: false },
  { id: "briefing", label: "Briefing", plural: "Briefings", usuallyAFile: false },
  { id: "piece", label: "Written piece", plural: "Written pieces", usuallyAFile: false },
];

export function isKnownKind(id: string): boolean {
  return LIBRARY_KINDS.some((kind) => kind.id === id);
}

/**
 * Never throws on an unknown kind. If somebody adds one straight into the
 * database, it is shown under its own name rather than breaking the page.
 */
export function kindLabel(id: string): string {
  return LIBRARY_KINDS.find((kind) => kind.id === id)?.label ?? id;
}

export function kindPlural(id: string): string {
  return LIBRARY_KINDS.find((kind) => kind.id === id)?.plural ?? id;
}
