import Link from "next/link";
import { BRAND } from "@/lib/brand";

/**
 * Temporary home page.
 * Replaced by the pre-launch holding page, and then by the full public site,
 * once the design decisions on /review are signed off.
 */
export default function Home() {
  return (
    <main className="fwd-grain flex flex-1 items-center justify-center px-6 py-24">
      <div className="relative z-1 text-center">
        <p className="font-display text-6xl lowercase">{BRAND.markShort}</p>
        <p className="mt-6 font-body text-sm text-ink-muted">
          Site in build. Nothing here yet.
        </p>
        <Link
          href="/review"
          className="mt-8 inline-block font-body text-sm text-accent underline underline-offset-4"
        >
          Design review
        </Link>
      </div>
    </main>
  );
}
