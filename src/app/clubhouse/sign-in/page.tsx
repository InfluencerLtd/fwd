import { redirect } from "next/navigation";
import { getCurrentMember } from "@/lib/auth/session";
import { safeNextPath } from "@/lib/invitations";
import { SignInForm } from "./form";

/**
 * Signing in.
 *
 * `next` is where the member was trying to go. It is what makes an invitation
 * link work properly: click the link while signed out, sign in, and land back
 * on that event rather than on a generic home screen.
 *
 * It is passed through safeNextPath first, so it can only ever be a path inside
 * The Clubhouse.
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
    <main className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="w-full max-w-md">
        <SignInForm next={next} />
      </div>
    </main>
  );
}
