import { NextResponse } from "next/server";
import { getCurrentMember } from "@/lib/auth/session";
import { getLibraryItem, createDownloadLink } from "@/lib/store/library";

/**
 * Downloading something from the library.
 *
 * This is a small address of its own rather than a link on the page, for one
 * reason: signed links expire. If the page put a signed link straight into the
 * download button, a member who left the tab open and came back an hour later
 * would click a dead link. This mints a fresh one at the moment they click.
 *
 * It checks the session itself. A route like this is reachable directly, so it
 * cannot rely on any page having checked first.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const member = await getCurrentMember();
  if (!member) {
    const { slug } = await params;
    return NextResponse.redirect(
      new URL(
        `/clubhouse/sign-in?next=${encodeURIComponent(`/clubhouse/library/${slug}`)}`,
        process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
      ),
    );
  }

  const { slug } = await params;
  const item = await getLibraryItem(slug);
  if (!item?.file_path) {
    return new NextResponse("Not found", { status: 404 });
  }

  const link = await createDownloadLink(item.file_path);
  if (!link) {
    return new NextResponse("That file is not available right now.", {
      status: 503,
    });
  }

  return NextResponse.redirect(link);
}
