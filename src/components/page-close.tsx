import { ApplyDialog } from "@/components/apply-dialog";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { PhotoScrim } from "@/components/photo-scrim";
import { APPLY } from "@/content/site";

/**
 * The ask at the end of a page.
 *
 * The one thing the four pages still share, because the answer to all of them
 * is the same answer and it would be strange to phrase it four ways. What
 * changes is the ground it sits on, so it reads as the end of *this* page
 * rather than as a footer that arrived early.
 */
export function PageClose({
  heading,
  note,
  tone = "light",
  photo,
  photoBrief,
}: {
  heading: string;
  note: string;
  tone?: "light" | "sand" | "dark";
  /**
   * A photograph to close on, treated the way the hero is: the picture full
   * bleed, and a soft radial pool of darkness under the type only rather than
   * a flat wash over the whole frame. Implies the dark tone.
   */
  photo?: string;
  /** What the shot should be. Lives in IMAGERY, passed in so it stays there. */
  photoBrief?: string;
}) {
  const dark = tone === "dark";
  const ground =
    tone === "dark"
      ? "fwd-dark fwd-on-dark fwd-grain"
      : tone === "sand"
        ? "bg-surface-warm"
        : "";

  const body = (
    <div className="relative z-2 mx-auto max-w-4xl text-center">
      {/* The scrim only exists over a photograph. On a flat ground there is
          nothing for it to protect the type from, and it would read as a
          smudge. */}
      <div className={photo ? "relative inline-block" : undefined}>
        {photo ? <PhotoScrim size="lockup" /> : null}
        <h2
          className={`fwd-reveal fwd-h2 ${dark || photo ? "text-photo-ink" : ""}`}
        >
          {heading}
        </h2>
      </div>

      <p
        className={`fwd-reveal mx-auto mt-7 max-w-lg font-body text-[15px] leading-relaxed ${
          dark || photo ? "text-photo-ink/75" : "text-ink-muted"
        }`}
      >
        {note}
      </p>
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
          /* The placeholder's own wash is off: the scrim above does the
             darkening, in the one place it is needed, as on the hero. */
          scrim={false}
          className="flex min-h-[68vh] flex-col justify-center px-6 py-28"
        >
          {body}
        </PhotoPlaceholder>
      </div>
    );
  }

  return (
    <section className={`${ground} px-6 py-28 sm:py-36`}>
      <div className="relative z-1 mx-auto max-w-4xl text-center">
        <h2 className={`fwd-reveal fwd-h2 ${dark ? "text-photo-ink" : ""}`}>
          {heading}
        </h2>
        <p
          className={`fwd-reveal mx-auto mt-7 max-w-lg font-body text-[15px] leading-relaxed ${
            dark ? "text-photo-ink/65" : "text-ink-muted"
          }`}
        >
          {note}
        </p>
        <div className="fwd-reveal mt-11">
          <ApplyDialog label={APPLY.cta} />
        </div>
      </div>
    </section>
  );
}
