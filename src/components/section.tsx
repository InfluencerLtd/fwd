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
          <h2 className="fwd-reveal text-4xl sm:text-5xl">{heading}</h2>
        ) : null}
        {children}
      </div>
    </section>
  );
}

/** A paragraph set at a comfortable reading measure. */
export function Prose({ lines }: { lines: readonly string[] }) {
  return (
    <div className="fwd-reveal mt-8 max-w-2xl space-y-5">
      {lines.map((line) => (
        <p key={line} className="font-body text-lg leading-relaxed text-ink-muted">
          {line}
        </p>
      ))}
    </div>
  );
}
