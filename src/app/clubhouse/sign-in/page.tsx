import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentMember } from "@/lib/auth/session";
import { safeNextPath } from "@/lib/invitations";
import { SignInForm } from "./form";
import { Wordmark } from "@/components/wordmark";
import { BRAND } from "@/lib/brand";
import { SIGN_IN } from "@/content/clubhouse";

/**
 * Signing in.
 *
 * `next` is where the member was trying to go. It is what makes an invitation
 * link work properly: click the link while signed out, sign in, and land back
 * on that event rather than on a generic home screen.
 *
 * It is passed through safeNextPath first, so it can only ever be a path inside
 * The House.
 */
export default async function SignInPage({
  searchParams,
}: PageProps<"/clubhouse/sign-in">) {
  const params = await searchParams;
  const next = safeNextPath(
    typeof params.next === "string" ? params.next : undefined,
  );

  // Already signed in? Go where they were going.
  const member = await getCurrentMember();
  if (member) redirect(next);

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-md">
        {/* The lockup is the way back out. Without it this page is a dead end:
            somebody who is not a member, or who changed their mind, had
            nowhere to go from here.

            This is the one place the lockup sits on the light surface, so it
            takes the brand dark blue rather than the pale blue, which is
            unreadable on the off-white. No signature: it is a small link sitting
            above a large heading, the same job it does at the top of the
            membership page, and the endorsement at this size reads as clutter.

            The whole lockup is the link, glyph included, so there is no small
            target next to a large one that does the same thing. */}
        <Link
          href="/"
          className="inline-block"
          aria-label={`${BRAND.markShort} home`}
        >
          <Wordmark size="page" tone="brand" signature={false} />
        </Link>

        <div className="mt-10">
          <SignInForm next={next} />
        </div>

        <p className="mt-10 border-t border-border pt-6 font-body text-sm text-ink-muted">
          {/* Black, not the accent blue: it is the way out of a page whose whole
              job is the way in, and it should not compete with the lockup above
              it now that the lockup is the blue one.

              THE UNDERLINE IS ALWAYS THERE, and that is why this is not
              fwd-underline like every other link on the site. That class draws
              its line on hover only, which is fine while colour is doing the
              work of saying "this is a link". In black, at body-text colour and
              body-text size, nothing would have been left saying so: a
              non-member would have been looking at the only way off this page
              and seeing a sentence. */}
          <Link
            href="/"
            className="text-ink underline decoration-1 underline-offset-4"
          >
            {SIGN_IN.notAMember}
          </Link>
        </p>
      </div>
    </main>
  );
}
