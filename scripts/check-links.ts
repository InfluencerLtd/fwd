/**
 * A quick check of the two pieces of link handling that protect The Clubhouse.
 * Run it with: npm run check:links
 *
 * These are worth checking directly rather than by clicking around, because
 * both of them fail silently: a broken signature check still renders a page,
 * and an open redirect still signs you in.
 */

import { safeNextPath, createInvitationToken, readInvitationToken } from "../src/lib/invitations";
import { createToken, readToken } from "../src/lib/tokens";

let failures = 0;

function check(label: string, actual: unknown, expected: unknown) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (!ok) failures++;
  console.log(`  ${ok ? "pass" : "FAIL"}  ${label}`);
  if (!ok) console.log(`        expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}

console.log("\nWhere a member is sent after signing in:");
check("a normal Clubhouse path is kept", safeNextPath("/clubhouse/events/abc"), "/clubhouse/events/abc");
check("nothing given falls back to the Clubhouse", safeNextPath(undefined), "/clubhouse");
check("another website is refused", safeNextPath("https://evil.example/steal"), "/clubhouse");
check("a protocol-relative address is refused", safeNextPath("//evil.example"), "/clubhouse");
check("a backslash trick is refused", safeNextPath("/clubhouse\\@evil.example"), "/clubhouse");
check("a path outside the Clubhouse is refused", safeNextPath("/admin"), "/clubhouse");

console.log("\nInvitation links:");
const eventA = "11111111-1111-1111-1111-111111111111";
const eventB = "22222222-2222-2222-2222-222222222222";
const member = "33333333-3333-3333-3333-333333333333";

const good = createInvitationToken(eventA, member);
check("a genuine link opens", readInvitationToken(good), { eventId: eventA, memberId: member });

check("an edited link is refused", readInvitationToken(good.replace(/.$/, "x")), null);
check("nonsense is refused", readInvitationToken("not-a-token"), null);
check("an empty token is refused", readInvitationToken(""), null);

// A token signed for a different job must not work as an invitation, or an
// unsubscribe link could be used to open somebody's invitation.
const unsubscribeToken = createToken("unsubscribe", `${eventA}|${member}`, 3600);
check("a token for another purpose is refused", readInvitationToken(unsubscribeToken), null);

// And an invitation to one event is not an invitation to another.
const forB = readInvitationToken(createInvitationToken(eventB, member));
check("an invitation names its own event", forB?.eventId, eventB);

console.log("\nExpiry:");
const expired = createToken("invite", `${eventA}|${member}`, -60);
check("an expired link is refused", readToken("invite", expired).valid, false);


console.log("\nSession renewal, the rule the proxy follows:");
{
  const SESSION_DAYS = 90;
  const full = SESSION_DAYS * 86400;
  const member = "44444444-4444-4444-4444-444444444444";

  // A session issued moments ago should NOT be rewritten on every request.
  const fresh = createToken("session", member, full);
  const freshCheck = readToken("session", fresh);
  const freshLeft = freshCheck.valid ? freshCheck.expiresAt - Math.floor(Date.now() / 1000) : 0;
  check("a brand new session is left alone", freshLeft > full - 86400, true);

  // One that has been running a while should be renewed.
  const older = createToken("session", member, full - 5 * 86400);
  const olderCheck = readToken("session", older);
  const olderLeft = olderCheck.valid ? olderCheck.expiresAt - Math.floor(Date.now() / 1000) : 0;
  check("a session five days old is renewed", olderLeft > full - 86400, false);

  // And a tampered one must never be renewed, or the proxy would hand out a
  // valid session to somebody who did not have one.
  check("a tampered session is refused", readToken("session", fresh.replace(/.$/, "x")).valid, false);
  check("an expired session is refused", readToken("session", createToken("session", member, -60)).valid, false);
  check(
    "a token for another purpose is not a session",
    readToken("session", createToken("invite", member, 3600)).valid,
    false,
  );
}

console.log(failures === 0 ? "\nAll checks passed.\n" : `\n${failures} check(s) FAILED.\n`);
process.exit(failures === 0 ? 0 : 1);
