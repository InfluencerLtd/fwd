import { COPY_APPROVED } from "@/lib/site-config";

/**
 * A small, permanent reminder that the words on the page are a draft.
 *
 * Sits bottom right, because Next.js puts its own development badge bottom
 * left and the two would overlap while you are working locally.
 *
 * It disappears the moment COPY_APPROVED is set to true in
 * src/lib/site-config.ts. Until then it cannot be missed, which is the point:
 * unapproved wording must not be mistaken for finished wording.
 */
export function DraftCopyMarker() {
  if (COPY_APPROVED) return null;

  return (
    <p
      className="pointer-events-none fixed bottom-3 right-3 z-50 rounded-full border border-photo-ink/25 bg-photo-ground/80 px-3 py-1 font-body text-[10px] tracking-[0.16em] text-photo-ink/70 backdrop-blur-sm"
      role="note"
    >
      draft copy, not approved
    </p>
  );
}
