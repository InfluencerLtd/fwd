/**
 * field-hint.ts
 * ---------------------------------------------------------------------------
 * The pale line inside an empty field, built from the label above it.
 *
 * IT IS DERIVED RATHER THAN WRITTEN OUT, once per form, because the alternative
 * is eighteen more strings in the content files that all say the same thing as
 * the label beside them and can all drift away from it. Rename a label and the
 * hint follows on its own.
 *
 * ONLY SINGLE-LINE FIELDS GET ONE. Every text area on the site already carries
 * a line of guidance underneath — "A few lines is plenty", "Delivery
 * instructions, or a different address for a few weeks" — which says something
 * a hint could not. And their labels are questions and phrases rather than
 * nouns: "why would you like to meet?" and "anything we should know" do not
 * survive having "enter" put in front of them.
 *
 * A field whose format matters keeps the hint it already had. `https://` on a
 * profile link is telling you the shape of the answer, which is worth more than
 * being told again what the label says.
 *
 * The colour and the contrast are handled once, in globals.css, on
 * `.fwd-field::placeholder`.
 *
 * A hint is never the only thing naming a field. Every one of these sits under
 * a real <label>, because a placeholder disappears the moment somebody types:
 * a form labelled only by its hints is one that cannot be checked over before
 * it is sent, and is invisible to a screen reader that reads labels.
 */
export function fieldHint(label: string): string {
  return `enter ${label}`;
}
