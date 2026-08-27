import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EARLY_ACCESS_ENABLED } from "@/lib/site-config";
import { EarlyAccessForm } from "./form";

export const metadata: Metadata = {
  title: "Early access",
  robots: { index: false, follow: false },
};

/**
 * Lets the club team look at the real site while the holding page is up.
 *
 * The password is set as EARLY_ACCESS_PASSWORD in the environment, never in a
 * file. If it is not set, this page does not exist at all, so there is no
 * default password anywhere that somebody could guess.
 */
export default function EarlyAccessPage() {
  if (!EARLY_ACCESS_ENABLED) notFound();

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl">early access</h1>
        <p className="mt-3 font-body text-sm leading-relaxed text-ink-muted">
          For the club team. This shows the real site while the holding page is
          up for everyone else.
        </p>
        <EarlyAccessForm />
      </div>
    </main>
  );
}
