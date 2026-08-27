import Link from "next/link";
import { notFound } from "next/navigation";
import { requireMember } from "@/lib/auth/guard";
import { getLibraryItem } from "@/lib/store/library";
import { kindLabel } from "@/lib/library-kinds";
import { ButtonLink } from "@/components/button";
import { LIBRARY } from "@/content/clubhouse";

export default async function LibraryItemPage({
  params,
}: PageProps<"/clubhouse/library/[slug]">) {
  const { slug } = await params;
  await requireMember(`/clubhouse/library/${slug}`);

  const item = await getLibraryItem(slug);
  if (!item) notFound();

  return (
    <main className="flex-1 px-6 py-16">
      <article className="mx-auto max-w-2xl">
        <Link
          href="/clubhouse/library"
          className="fwd-underline font-body text-sm text-accent"
        >
          {LIBRARY.back}
        </Link>

        <p className="mt-8 flex flex-wrap items-center gap-3 font-body text-[12px] tracking-[0.12em] text-ember">
          {kindLabel(item.kind)}
          {item.category ? (
            <span className="text-ink-muted">{item.category}</span>
          ) : null}
          {item.is_dummy ? (
            <span className="rounded-full border border-ember/40 px-2 py-0.5 text-[10px]">
              EXAMPLE
            </span>
          ) : null}
        </p>

        <h1 className="mt-4 text-4xl sm:text-5xl">{item.title}</h1>

        {item.published_at ? (
          <p className="mt-3 font-body text-[13px] text-ink-muted">
            {new Date(item.published_at).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
              timeZone: "UTC",
            })}
          </p>
        ) : null}

        {item.summary ? (
          <p className="mt-8 font-body text-[19px] leading-relaxed text-ink">
            {item.summary}
          </p>
        ) : null}

        {item.file_path ? (
          <div className="mt-10 rounded-2xl border border-border bg-surface-raised p-6">
            <p className="font-body text-[15px] text-ink">
              {item.file_name ?? "Download"}
              {item.file_size
                ? ` · ${Math.max(1, Math.round(item.file_size / 1024))} KB`
                : ""}
            </p>
            <ButtonLink
              href={`/clubhouse/library/${item.slug}/download`}
              size="lg"
              className="mt-5"
            >
              {LIBRARY.download}
            </ButtonLink>
            <p className="mt-4 font-body text-[13px] leading-relaxed text-ink-muted">
              {LIBRARY.downloadNote}
            </p>
          </div>
        ) : null}

        {item.body ? (
          <div className="mt-12 space-y-5">
            {item.body.split(/\n{2,}/).map((paragraph, index) => (
              <p
                key={index}
                className="whitespace-pre-line font-body text-[17px] leading-relaxed text-ink-muted"
              >
                {paragraph}
              </p>
            ))}
          </div>
        ) : null}
      </article>
    </main>
  );
}
