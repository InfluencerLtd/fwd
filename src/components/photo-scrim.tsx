/**
 * The soft darkening that sits behind type on a photograph.
 *
 * IT IS THE PART OF THE HERO THAT TRAVELS. The hero is the piece of this site
 * everybody likes, and the reason it holds up is not the photograph — it is
 * this: a radial pool of darkness under the type only, so the mark keeps its
 * shape wherever the picture happens to be brightest, without a flat wash
 * pushing the whole image back.
 *
 * UNTIL NOW IT WAS USED EXACTLY ONCE. Every other page put its name straight
 * onto photography with nothing underneath it. That works today only because
 * every photograph on the site is a placeholder and every placeholder is
 * evenly dark. The first real shot with a window in it makes those page names
 * unreadable, and nobody would find out until it was live.
 *
 * So this is not only a visual consistency job. It is what makes photography
 * safe to put type on anywhere.
 *
 * HOW IT WORKS: absolutely positioned around whatever it is a sibling of, with
 * negative insets, so it always follows the shape of the type it is protecting
 * rather than being a box drawn at a fixed size. `-z-1` puts it behind. The
 * gradient itself is in globals.css and fades to fully transparent, which is
 * what stops it reading as a rectangle laid on the picture.
 */
export function PhotoScrim({
  /**
   * `lockup` for the hero's centred mark, which is enormous and needs a wide
   * pool. `name` for a page's name in the corner, which is a quarter the size
   * — the same insets there would darken half the photograph.
   */
  size = "name",
}: {
  size?: "lockup" | "name";
} = {}) {
  const insets =
    size === "lockup"
      ? "-inset-x-24 -inset-y-16 sm:-inset-x-40 sm:-inset-y-24 lg:-inset-x-64 lg:-inset-y-36"
      : "-inset-x-14 -inset-y-10 sm:-inset-x-24 sm:-inset-y-14 lg:-inset-x-32 lg:-inset-y-20";

  return (
    <div
      aria-hidden="true"
      className={`fwd-lockup-scrim pointer-events-none absolute -z-1 ${insets}`}
    />
  );
}
