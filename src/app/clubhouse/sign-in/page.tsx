import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentMember } from "@/lib/auth/session";
import { safeNextPath } from "@/lib/invitations";
import { SignInForm } from "./form";
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
        {/* The mark is the way back out. Without it this page is a dead end:
            somebody who is not a member, or who changed their mind, had
            nowhere to go from here. */}
        <Link
          href="/"
          className="font-display text-4xl lowercase text-ink"
          aria-label={`${BRAND.markShort} home`}
        >
          {BRAND.markShort}
        </Link>

        <div className="mt-10">
          <SignInForm next={next} />
        </div>

        <p className="mt-10 border-t border-border pt-6 font-body text-sm text-ink-muted">
          <Link href="/" className="fwd-underline text-accent">
            {SIGN_IN.notAMember}
          </Link>
        </p>
      </div>
    </main>
  );
}
