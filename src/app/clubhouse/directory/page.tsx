import { requireMember } from "@/lib/auth/guard";
import { listMembers } from "@/lib/store/clubhouse";
import { DirectoryBrowser } from "@/components/clubhouse/directory-browser";
import { DIRECTORY } from "@/content/clubhouse";
import { NotConnected } from "@/components/clubhouse/not-connected";

export default async function DirectoryPage() {
  await requireMember("/clubhouse/directory");
  const members = await listMembers();

  return (
    <main className="flex-1 px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl sm:text-5xl">{DIRECTORY.heading}</h1>
        <p className="mt-5 max-w-2xl font-body text-[17px] leading-relaxed text-ink-muted">
          {DIRECTORY.intro}
        </p>

        {members === null ? (
          <NotConnected />
        ) : (
          <DirectoryBrowser members={members} />
        )}
      </div>
    </main>
  );
}
