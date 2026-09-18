import { ApplyDialog } from "@/components/apply-dialog";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { PhotoScrim } from "@/components/photo-scrim";
import { APPLY } from "@/content/site";

/**
 * The ask at the end of a page.
 *
 * The one thing every page shares, because the answer to all of them is the
 * same answer and it would be strange to phrase it four ways. What changes is
 * the ground it sits on, so it reads as the end of *this* page rather than as
 * a footer that arrived early.
 *
 * THE HOME PAGE USED TO KEEP ITS OWN COPY OF THIS. Same heading, same note,
 * same button, a larger type size — and the two drifted the way two copies of
 * one thing always do. When the mask behind the type was rebuilt here, the
 * home page kept the old one, and its close sat as white type on a lit
 * tablecloth for a day before anybody noticed. The size was the only real
 * difference, so the size is a prop and there is one of these.
 */
export function PageClose({
  heading,
  note,
  tone = "light",
  photo,
  photoBrief,
  photoPosition,
  scale = "heading",
  sentence = false,
}: {
  heading: string;
  /** A sentence rather than a name: keeps its capital against the lowercase h2 rule. */
  sentence?: boolean;
  /** Optional: the /rooms close is the heading and the button alone. */
  note?: string;
  tone?: "light" | "alt" | "dark";
  /**
   * How loud the closing line is.
   *
   * `heading` on the interior pages, where the close ends one page among
   * several. `statement` on the home page, which is the last thing anybody
   * reads before deciding.
   */
  scale?: "heading" | "statement";
  /**
   * A photograph to close on, treated the way the hero is: the picture full
   * bleed, and a soft radial pool of darkness under the type only rather than
   * a flat wash over the whole frame. Implies the dark tone.
   */
  photo?: string;
  /** What the shot should be. Lives in IMAGERY, passed in so it stays there. */
  photoBrief?: string;
  /**
   * Where to crop this particular photograph from, when centred is wrong.
   *
   * The close band is as wide as the window and 68vh tall, so its shape
   * changes with every screen and the crop changes with it. A photograph whose
   * subject is near an edge needs telling which edge to keep.
   */
  photoPosition?: string;
}) {
  const dark = tone === "dark";
  const ground =
    tone === "dark"
      ? "fwd-dark fwd-on-dark fwd-grain"
      : tone === "alt"
        ? "bg-surface-alt"
        : "";

  const body = (
    <div className="relative z-2 mx-auto max-w-4xl text-center">
      {/* THE SCRIM IS BEHIND THE WHOLE BLOCK, NOT JUST THE HEADING. It used to
          sit around the heading alone, which left the note and the button on
          bare photograph. */}
      {photo ? <PhotoScrim size="lockup" /> : null}
      <h2
        className={`${
          scale === "statement" ? "fwd-rise fwd-statement" : "fwd-reveal fwd-h2"
        } ${dark || photo ? "text-photo-ink" : ""} ${sentence ? "normal-case!" : ""}`}
      >
        {heading}
      </h2>

      {note && (
        <p
          className={`fwd-reveal mx-auto mt-7 max-w-lg font-body text-[15px] leading-relaxed ${
            dark ? "text-photo-ink/75" : photo ? "text-photo-ink/85" : "text-ink-muted"
          }`}
        >
          {note}
        </p>
      )}
      <div className="fwd-reveal mt-11">
        <ApplyDialog label={APPLY.cta} />
      </div>
    </div>
  );

  if (photo) {
    return (
      <div className="fwd-on-dark">
        <PhotoPlaceholder
          label={photoBrief ?? ""}
          name={photo}
          showLabel={false}
          sizes="100vw"
          ratio="fill"
          objectPosition={photoPosition}
          /* The placeholder's own wash is off: the scrim above does the
             darkening, in the one place it is needed, as on the hero. */
          scrim={false}
          className="relative flex min-h-[68vh] flex-col justify-center px-6 py-28"
        >
          {/* A FLAT WASH, AND IT HAS TO BE A HEAVY ONE. Measured against the
              photograph now behind this section, the white type was sitting on
              1.07:1 at the heading and 1.00:1 at the note — white on a lit
              tablecloth. The radial pool alone cannot fix that: it peaks at
              two thirds opacity in the middle and falls away to nothing, and
              the trouble here is the whole frame rather than one bright patch.

              So the wash puts a floor under the picture and the pool deepens
              it where the type actually is.

              AT 0.46 THE NUMBERS WERE ALREADY FINE — heading 5.77:1, note
              8.18:1 — and the frame still read brighter than every other dark
              section on the site. That is a different complaint from an
              unreadable one and just as real, so this is 0.60, which sits with
              them. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-1 bg-black/[0.60]"
          />
          {body}
        </PhotoPlaceholder>
      </div>
    );
  }

  return (
    <section className={`${ground} fwd-section px-6`}>
      <div className="relative z-1 mx-auto max-w-4xl text-center">
        <h2 className={`fwd-reveal fwd-h2 ${dark ? "text-photo-ink" : ""} ${sentence ? "normal-case!" : ""}`}>
          {heading}
        </h2>
        {note && (
          <p
            className={`fwd-reveal mx-auto mt-7 max-w-lg font-body text-[15px] leading-relaxed ${
              dark ? "text-photo-ink/65" : "text-ink-muted"
            }`}
          >
            {note}
          </p>
        )}
        <div className="fwd-reveal mt-11">
          <ApplyDialog label={APPLY.cta} />
        </div>
      </div>
    </section>
  );
}
