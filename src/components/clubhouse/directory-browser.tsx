"use client";

import { useId, useMemo, useState } from "react";
import { MemberCard } from "@/components/clubhouse/member-card";
import { MEMBER_GROUPS } from "@/lib/brand";
import { DIRECTORY } from "@/content/clubhouse";
import type { DirectoryMember } from "@/lib/store/clubhouse";

/**
 * Searching and filtering the room.
 *
 * The filtering happens in the browser rather than on the server, so it is
 * instant as you type. That is fine here and only here: everybody who can reach
 * this page is a signed-in member who is allowed to see every one of these
 * records anyway. It would not be acceptable anywhere the list contained things
 * the viewer is not allowed to see.
 */
export function DirectoryBrowser({ members }: { members: DirectoryMember[] }) {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("");
  const [market, setMarket] = useState("");

  const searchId = useId();
  const groupId = useId();
  const marketId = useId();

  const markets = useMemo(
    () =>
      [...new Set(members.map((m) => m.market).filter(Boolean))].sort((a, b) =>
        a.localeCompare(b),
      ),
    [members],
  );

  const shown = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    return members.filter((member) => {
      if (group && member.group_type !== group) return false;
      if (market && member.market !== market) return false;
      if (words.length === 0) return true;
      const haystack =
        `${member.name} ${member.role} ${member.company} ${member.market} ${member.bio}`.toLowerCase();
      return words.every((word) => haystack.includes(word));
    });
  }, [members, query, group, market]);

  const selectClass =
    "fwd-field w-full border border-border bg-surface-raised px-5 py-3 font-body text-[15px] text-ink";

  return (
    <>
      <div className="mt-10 grid gap-4 sm:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <label htmlFor={searchId} className="sr-only">
            {DIRECTORY.searchLabel}
          </label>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={DIRECTORY.searchPlaceholder}
            className={`${selectClass} mt-2`}
          />
        </div>

        <div>
          <label htmlFor={groupId} className="sr-only">
            {DIRECTORY.groupLabel}
          </label>
          <select
            id={groupId}
            value={group}
            onChange={(event) => setGroup(event.target.value)}
            className={`${selectClass} mt-2`}
          >
            <option value="">{DIRECTORY.allGroups}</option>
            {MEMBER_GROUPS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={marketId} className="sr-only">
            {DIRECTORY.marketLabel}
          </label>
          <select
            id={marketId}
            value={market}
            onChange={(event) => setMarket(event.target.value)}
            className={`${selectClass} mt-2`}
          >
            <option value="">{DIRECTORY.allMarkets}</option>
            {markets.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Announced, so somebody using a screen reader hears the count change
          as they type rather than having to go and count the results. */}
      <p role="status" aria-live="polite" className="mt-8 font-body text-sm text-ink-muted">
        {shown.length === 1
          ? DIRECTORY.countOne
          : DIRECTORY.countMany.replace("{n}", String(shown.length))}
      </p>

      {shown.length === 0 ? (
        <p className="mt-8 font-body text-[15px] text-ink-muted">{DIRECTORY.empty}</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {shown.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      )}
    </>
  );
}
