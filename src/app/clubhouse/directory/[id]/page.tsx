import Link from "next/link";
import { notFound } from "next/navigation";
import { requireMember } from "@/lib/auth/guard";
import { getMember } from "@/lib/store/clubhouse";
import { IntroForm } from "@/components/clubhouse/intro-form";
import { MEMBER_GROUPS } from "@/lib/brand";
import { DIRECTORY, INTRO } from "@/content/clubhouse";

export default async function MemberPage({
  params,
}: PageProps<"/clubhouse/directory/[id]">) {
  const { id } = await params;
  const viewer = await requireMember(`/clubhouse/directory/${id}`);
  const member = await getMember(id);
  if (!member) notFound();

  const group =
    MEMBER_GROUPS.find((g) => g.id === member.group_type)?.label ??
    member.group_type;

  return (
    <main className="flex-1 px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/clubhouse/directory"
          className="fwd-underline font-body text-sm text-accent"
        >
          {DIRECTORY.heading}
        </Link>

        <h1 className="mt-8 text-4xl sm:text-5xl">{member.name}</h1>
        <p className="mt-3 font-body text-[17px] text-ink-muted">
          {member.role}
          {member.role && member.company ? ", " : ""}
          {member.company}
        </p>
        <p className="mt-2 font-body text-[13px] tracking-[0.1em] text-ink-muted">
          {group}
          {member.market ? ` · ${member.market}` : ""}
        </p>

        {member.bio ? (
          <p className="mt-8 whitespace-pre-line font-body text-[17px] leading-relaxed text-ink">
            {member.bio}
          </p>
        ) : null}

        <section className="mt-14 rounded-2xl border border-border bg-surface-raised p-7">
          <h2 className="text-2xl">{INTRO.heading}</h2>

          {viewer.id === member.id ? (
            <p className="mt-4 font-body text-[15px] text-ink-muted">
              This is you. Other members see this page when they look you up.
            </p>
          ) : member.introductions_opt_in ? (
            <IntroForm targetId={member.id} targetName={member.name} />
          ) : (
            <p className="mt-4 font-body text-[15px] text-ink-muted">
              {INTRO.optedOut}
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
