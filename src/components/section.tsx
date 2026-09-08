/**
 * The shared wrapper every section of the public page sits inside, so the
 * spacing and the measure of the text stay consistent all the way down.
 */
export function Section({
  id,
  heading,
  children,
  className = "",
}: {
  id: string;
  heading?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`px-6 py-24 sm:py-32 ${className}`}>
      <div className="mx-auto max-w-4xl">
        {heading ? (
          <h2 className="fwd-reveal fwd-h2">{heading}</h2>
        ) : null}
        {children}
      </div>
    </section>
  );
}

/** A paragraph set at a comfortable reading measure. */
export function Prose({
  lines,
  className = "mt-8",
}: {
  lines: readonly string[];
  className?: string;
}) {
  return (
    <div className={`fwd-reveal max-w-2xl space-y-5 ${className}`}>
      {lines.map((line) => (
        <p key={line} className="fwd-body text-ink-muted">
          {line}
        </p>
      ))}
    </div>
  );
}
