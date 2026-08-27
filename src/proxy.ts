import { NextResponse, type NextRequest } from "next/server";
import { createToken, readToken } from "@/lib/tokens";
import {
  SESSION_COOKIE,
  SESSION_PURPOSE,
  SESSION_DAYS,
  SESSION_RENEW_AFTER_DAYS,
} from "@/lib/auth/session";

/**
 * Keeps a member signed in for as long as they keep turning up.
 *
 * A session lasts 90 days. Without this, that is 90 days from the moment you
 * signed in and no longer, so somebody using the site every week would still be
 * thrown out four times a year for no reason. This gives the session a fresh 90
 * days whenever it is used, which means regular members never see the sign-in
 * screen again, while a session nobody touches still expires.
 *
 * WHAT THIS IS NOT: it is not the thing that decides who is allowed in. That is
 * requireMember on every page, which checks the signature AND looks the member
 * up and confirms they are still active. This only extends a cookie that is
 * already valid. Next's own guidance is not to treat a proxy as an
 * authorisation layer, and this does not.
 *
 * It renews at most once a day, so it is not writing a cookie on every request.
 */
export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return response;

  const check = readToken(SESSION_PURPOSE, token);
  // An expired or tampered cookie is left exactly as it is. Renewing one would
  // hand out a valid session to somebody who did not have one.
  if (!check.valid) return response;

  const secondsLeft = check.expiresAt - Math.floor(Date.now() / 1000);
  const full = SESSION_DAYS * 86400;
  if (secondsLeft > full - SESSION_RENEW_AFTER_DAYS * 86400) return response;

  response.cookies.set(
    SESSION_COOKIE,
    createToken(SESSION_PURPOSE, check.subject, full),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: full,
    },
  );

  return response;
}

export const config = {
  // Only the member area. Nothing else has a session to keep alive.
  matcher: "/clubhouse/:path*",
};
