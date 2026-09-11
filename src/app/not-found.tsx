import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { NOT_FOUND } from "@/content/site";

export const metadata: Metadata = { title: NOT_FOUND.title };

/**
 * The page for an address that does not exist.
 *
 * THE WORDMARK WITHOUT ITS FULL STOP. The full stop is the part of the mark
 * that blinks on the teaser page, the cursor waiting for what comes next. Here
 * it is simply missing, which says "something is not here" in the brand's own
 * artwork rather than in an illustration. It is the one place on the site the
 * mark appears without it. Nothing moves.
 */
export default function NotFound() {
  return (
    <main className="fwd-on-dark flex min-h-screen flex-col items-center justify-center bg-photo-ground px-6 text-center">
      <div className="w-[clamp(200px,34vw,340px)] text-accent-on-dark">
        <span className="sr-only">{`${BRAND.markShort} ${BRAND.endorsement}`}</span>
        <span aria-hidden="true" className="fwd-logo fwd-logo-lockup-nodot w-full" />
      </div>
      <h1 className="mt-12 font-display text-[28px] leading-[1.1] text-photo-ink normal-case! md:text-[40px]">
        {NOT_FOUND.heading}
      </h1>
      <Link
        href="/"
        className="fwd-underline relative mt-8 inline-block font-body text-[15px] text-photo-ink/80 after:absolute after:-inset-x-2 after:-inset-y-3 after:content-['']"
      >
        {NOT_FOUND.back}
      </Link>
    </main>
  );
}
