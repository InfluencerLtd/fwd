import Link from "next/link";
import { MEMBER_GROUPS } from "@/lib/brand";
import type { DirectoryMember } from "@/lib/store/clubhouse";

function groupLabel(id: string) {
  return MEMBER_GROUPS.find((g) => g.id === id)?.label ?? id;
}

/** The initials shown until somebody has a photograph. */
function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function MemberCard({
  member,
  compact = false,
}: {
  member: DirectoryMember;
  compact?: boolean;
}) {
  return (
    <Link
      href={`/clubhouse/directory/${member.id}`}
      className="flex gap-4 rounded-2xl border border-border bg-surface-raised p-5 transition-colors duration-500 hover:border-ink/25"
    >
      <span
        aria-hidden="true"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-warm font-body text-sm text-ink-muted"
      >
        {initials(member.name)}
      </span>

      <span className="min-w-0 font-body">
        <span className="block truncate text-[15px] text-ink">
          {member.name}
          {member.is_dummy ? (
            <span className="ml-2 rounded-full border border-ember/40 px-2 py-0.5 text-[10px] tracking-[0.14em] text-ember">
              EXAMPLE
            </span>
          ) : null}
        </span>
        <span className="mt-0.5 block truncate text-[13px] text-ink-muted">
          {member.role}
          {member.role && member.company ? ", " : ""}
          {member.company}
        </span>
        {compact ? null : (
          <span className="mt-2 block text-[12px] tracking-[0.1em] text-ink-muted">
            {groupLabel(member.group_type)}
            {member.market ? ` · ${member.market}` : ""}
          </span>
        )}
      </span>
    </Link>
  );
}
