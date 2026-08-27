import { requireMember } from "@/lib/auth/guard";
import { listLibrary } from "@/lib/store/library";
import { LibraryBrowser } from "@/components/clubhouse/library-browser";
import { NotConnected } from "@/components/clubhouse/not-connected";
import { LIBRARY } from "@/content/clubhouse";

export default async function LibraryPage() {
  await requireMember("/clubhouse/library");
  const items = await listLibrary();

  return (
    <main className="flex-1 px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl sm:text-5xl">{LIBRARY.heading}</h1>
        <p className="mt-5 max-w-2xl font-body text-[17px] leading-relaxed text-ink-muted">
          {LIBRARY.intro}
        </p>

        {items === null ? (
          <NotConnected />
        ) : items.length === 0 ? (
          <p className="mt-12 rounded-2xl border border-border bg-surface-raised p-6 font-body text-[15px] leading-relaxed text-ink-muted">
            {LIBRARY.none}
          </p>
        ) : (
          <LibraryBrowser items={items} />
        )}
      </div>
    </main>
  );
}
