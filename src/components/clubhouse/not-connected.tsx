/**
 * Shown wherever the database is not connected yet.
 *
 * It says so plainly rather than rendering an empty screen, which would look
 * like a working page with nothing in it.
 */
export function NotConnected() {
  return (
    <p className="mt-10 rounded-2xl border border-border bg-surface-raised p-6 font-body text-[15px] leading-relaxed text-ink">
      The database is not connected yet, so there is nothing to show here. Set
      the Supabase keys in the environment and run the files in
      <code className="mx-1 font-mono text-[13px]">supabase/migrations</code>
      to bring this to life.
    </p>
  );
}
