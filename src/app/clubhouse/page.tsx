import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: BRAND.memberArea,
  // Nothing in the member area is ever to be indexed by a search engine. This
  // is set here so it applies before the real Clubhouse is built, rather than
  // being remembered later.
  robots: { index: false, follow: false },
};

/**
 * Placeholder for The Clubhouse, which is Phase 2.
 *
 * It exists now so the "Member sign in" link in the footer goes somewhere
 * honest rather than to a missing page.
 */
export default function ClubhousePage() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="max-w-md text-center">
        <h1 className="text-4xl">{BRAND.memberArea}</h1>
        <p className="mt-6 font-body text-lg leading-relaxed text-ink-muted">
          Member sign in is not open yet. Members will be sent a link when it is.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block font-body text-sm text-accent underline underline-offset-4"
        >
          Back
        </Link>
      </div>
    </main>
  );
}
