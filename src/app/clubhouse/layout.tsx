import type { Metadata } from "next";
import { getCurrentMember } from "@/lib/auth/session";
import { ClubhouseNav } from "@/components/clubhouse/nav";

/**
 * The wrapper around every page in the member area.
 *
 * The `robots` setting here is not decoration. The directory holds the names,
 * employers and contact details of real senior people at real client companies.
 * Nothing under /clubhouse may ever appear in a search engine, and setting it
 * on the layout means it applies to every page inside, including any page added
 * later by somebody who does not know to think about it.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

export default async function ClubhouseLayout({
  children,
}: LayoutProps<"/clubhouse">) {
  // The navigation only appears once somebody is signed in. Somebody looking at
  // an invitation without signing in sees the invitation and nothing else, with
  // no way into the rest of the club from it.
  const member = await getCurrentMember();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      {member ? <ClubhouseNav /> : null}
      {children}
    </div>
  );
}
