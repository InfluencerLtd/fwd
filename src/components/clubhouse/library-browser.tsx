"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { LIBRARY_KINDS, kindLabel } from "@/lib/library-kinds";
import { LIBRARY } from "@/content/clubhouse";
import type { LibraryItem } from "@/lib/store/library";

/**
 * Searching and filtering the library.
 *
 * Filtering happens in the browser so it is instant. That is safe here for the
 * same reason it is safe in the directory: everything on this page has already
 * been published to members, and everybody who can reach it is a member.
 */
export function LibraryBrowser({ items }: { items: LibraryItem[] }) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("");
  const [category, setCategory] = useState("");

  const searchId = useId();
  const kindId = useId();
  const categoryId = useId();

  // Only offer filters for kinds that actually have something in them, so the
  // list does not fill up with empty options as new kinds are added.
  const kindsPresent = useMemo(
    () => LIBRARY_KINDS.filter((k) => items.some((i) => i.kind === k.id)),
    [items],
  );

  const categories = useMemo(
    () =>
      [...new Set(items.map((i) => i.category).filter(Boolean))].sort((a, b) =>
        a.localeCompare(b),
      ),
    [items],
  );

  const shown = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    return items.filter((item) => {
      if (kind && item.kind !== kind) return false;
      if (category && item.category !== category) return false;
      if (words.length === 0) return true;
      const haystack =
        `${item.title} ${item.summary} ${item.category} ${item.body}`.toLowerCase();
      return words.every((word) => haystack.includes(word));
    });
  }, [items, query, kind, category]);

  const control =
    "fwd-field w-full border border-border bg-surface-raised px-5 py-3 font-body text-[15px] text-ink";

  return (
    <>
      <div className="mt-10 grid gap-4 sm:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <label htmlFor={searchId} className="block font-body text-sm text-ink-muted">
            {LIBRARY.searchLabel}
          </label>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={LIBRARY.searchPlaceholder}
            className={`${control} mt-2`}
          />
        </div>

        <div>
          <label htmlFor={kindId} className="block font-body text-sm text-ink-muted">
            {LIBRARY.kindLabel}
          </label>
          <select
            id={kindId}
            value={kind}
            onChange={(e) => setKind(e.target.value)}
            className={`${control} mt-2`}
          >
            <option value="">{LIBRARY.allKinds}</option>
            {kindsPresent.map((k) => (
              <option key={k.id} value={k.id}>{k.plural}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={categoryId} className="block font-body text-sm text-ink-muted">
            {LIBRARY.categoryLabel}
          </label>
          <select
            id={categoryId}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`${control} mt-2`}
          >
            <option value="">{LIBRARY.allCategories}</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <p role="status" aria-live="polite" className="mt-8 font-body text-sm text-ink-muted">
        {shown.length === 1
          ? LIBRARY.countOne
          : LIBRARY.countMany.replace("{n}", String(shown.length))}
      </p>

      {shown.length === 0 ? (
        <p className="mt-8 font-body text-[15px] text-ink-muted">{LIBRARY.empty}</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {shown.map((item) => (
            <Link
              key={item.id}
              href={`/clubhouse/library/${item.slug}`}
              className="rounded-2xl border border-border bg-surface-raised p-6 font-body transition-colors duration-500 hover:border-ink/25"
            >
              <span className="flex flex-wrap items-center gap-3 text-[12px] tracking-[0.12em] text-ember">
                {kindLabel(item.kind)}
                {item.category ? (
                  <span className="text-ink-muted">{item.category}</span>
                ) : null}
                {item.is_dummy ? (
                  <span className="rounded-full border border-ember/40 px-2 py-0.5 text-[10px]">
                    EXAMPLE
                  </span>
                ) : null}
              </span>

              <span className="mt-3 block font-display text-2xl text-ink">
                {item.title}
              </span>

              {item.summary ? (
                <span className="mt-2 block text-[14px] leading-relaxed text-ink-muted">
                  {item.summary}
                </span>
              ) : null}

              {item.file_path ? (
                <span className="mt-4 block text-[13px] text-ink-muted">
                  {item.file_name ?? "File"}
                  {item.file_size
                    ? ` · ${Math.max(1, Math.round(item.file_size / 1024))} KB`
                    : ""}
                </span>
              ) : null}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
