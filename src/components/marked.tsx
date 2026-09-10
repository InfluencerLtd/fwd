/**
 * Copy that may carry [[double brackets]].
 *
 * THE DRAWN MARKS ARE GONE. The blue underlines and circles came out on
 * 10 September 2026: next to FiveTwoNine, whose signature is blue marker on
 * key words, they read as borrowed. The brackets are still in the content
 * files, so the emphasis that was chosen is on record, and this renders the
 * words plainly. Bringing a mark back means changing this file, not the copy.
 */
export function MarkedText({ text }: { text: string }) {
  return <>{plainText(text)}</>;
}

/**
 * The same string with its [[marks]] taken out, for anywhere that is not a
 * page — a search description, a link preview — and now for the pages too.
 */
export function plainText(text: string) {
  return text.replace(/\[\[([^\]|]+)(?:\|[^\]]*)?\]\]/g, "$1");
}
