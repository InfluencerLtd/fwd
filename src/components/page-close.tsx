import { ApplyDialog } from "@/components/apply-dialog";
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
}: {
  heading: string;
  note: string;
  tone?: "light" | "sand" | "dark";
}) {
  const dark = tone === "dark";
  const ground =
    tone === "dark"
      ? "fwd-dark fwd-on-dark fwd-grain"
      : tone === "sand"
        ? "bg-surface-warm"
        : "";

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
