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
 * EVERY FIELD HAS TO HAVE ONE NOW, because the labels above the fields are no
 * longer drawn. They are still there — every one is a real <label>, moved to
 * `sr-only` rather than deleted, so a screen reader still announces the field
 * and clicking the words still focuses it — but on screen the hint is the only
 * thing naming the field, so a field without one is a field with no name.
 *
 * Text areas and dropdowns take their label as it stands. Their labels are
 * questions and phrases rather than nouns — "why would you like to meet?",
 * "anything we should know" — and those read correctly sitting in a box, while
 * "enter why would you like to meet?" does not.
 *
 * THE COST, WRITTEN DOWN SO IT IS NOT A SURPRISE: a hint disappears the moment
 * somebody types. On a long form that means nothing on screen says what each
 * answer was for when you read back over it before sending. The small lines of
 * guidance under some fields — "A few lines is plenty" — stay visible, which
 * softens it, and it is the trade that was asked for.
 *
 * The colour and the contrast are handled once, in globals.css, on
 * `.fwd-field::placeholder`.
 */
export function fieldHint(label: string): string {
  return `enter ${label}`;
}
