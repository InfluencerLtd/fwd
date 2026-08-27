import Link from "next/link";
import { requireMember } from "@/lib/auth/guard";
import { listMerchItems, countClaims } from "@/lib/store/merch";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { NotConnected } from "@/components/clubhouse/not-connected";
import { MERCH } from "@/content/clubhouse";

export default async function MerchPage() {
  await requireMember("/clubhouse/merch");
  const items = await listMerchItems();

  // How many of each are gone, so an item that has run out says so in the list
  // rather than only once somebody has clicked into it.
  const taken = items
    ? Object.fromEntries(
        await Promise.all(
          items.map(async (item) => [item.id, await countClaims(item.id)] as const),
        ),
      )
    : {};

  return (
    <main className="flex-1 px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl sm:text-5xl">{MERCH.heading}</h1>
        <p className="mt-5 max-w-2xl font-body text-[17px] leading-relaxed text-ink-muted">
          {MERCH.intro}
        </p>

        {items === null ? (
          <NotConnected />
        ) : items.length === 0 ? (
          <p className="mt-12 rounded-2xl border border-border bg-surface-raised p-6 font-body text-[15px] text-ink-muted">
            {MERCH.none}
          </p>
        ) : (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              const allGone =
                item.claim_limit !== null && (taken[item.id] ?? 0) >= item.claim_limit;

              return (
                <Link
                  key={item.id}
                  href={`/clubhouse/merch/${item.slug}`}
                  className="fwd-zoom group overflow-hidden rounded-2xl border border-border bg-surface-raised transition-colors duration-500 hover:border-ink/25"
                >
                  <PhotoPlaceholder
                    label={`Photograph of ${item.title}`}
                    ratio="square"
                    showLabel={false}
                    className="fwd-zoom-inner"
                  />
                  <span className="block p-6 font-body">
                    <span className="block font-display text-2xl text-ink">
                      {item.title}
                    </span>
                    {item.description ? (
                      <span className="mt-2 block text-[14px] leading-relaxed text-ink-muted">
                        {item.description}
                      </span>
                    ) : null}
                    {allGone ? (
                      <span className="mt-3 block text-[13px] text-ember">
                        {MERCH.allGone}
                      </span>
                    ) : item.is_open ? null : (
                      <span className="mt-3 block text-[13px] text-ink-muted">
                        {MERCH.closed}
                      </span>
                    )}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
