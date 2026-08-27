import { requireAdmin } from "@/lib/auth/admin-guard";
import type { Metadata } from "next";
import { listAllLibraryItems } from "@/lib/store/library";
import { saveLibraryEntry } from "@/app/admin/actions";
import { LIBRARY_KINDS, kindLabel } from "@/lib/library-kinds";

export const metadata: Metadata = { title: "Library" };

const field =
  "fwd-field w-full border border-border bg-surface-raised px-4 py-2.5 font-body text-[15px] text-ink";

export default async function AdminLibraryPage() {
  await requireAdmin();

  const items = await listAllLibraryItems();

  return (
    <main className="flex-1 px-6 py-12 font-body">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl">library</h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
          Research, white papers, event recaps, briefings and written pieces.
          Members see anything ticked as published, and nothing else.
        </p>
        <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-ink-muted">
          To add a new type of content, add one line to{" "}
          <code className="font-mono text-ink">src/lib/library-kinds.ts</code>.
          It then appears here, in the filters and on the reading page by itself.
          Nothing else needs changing and there is no database change.
        </p>

        <section className="mt-10 rounded-2xl border border-border bg-surface-raised p-6">
          <h2 className="text-2xl">Add something</h2>
          <form
            action={saveLibraryEntry}
            className="mt-6 grid gap-4 sm:grid-cols-2"
          >
            <input name="title" placeholder="Title" required className={field} />
            <input
              name="slug"
              placeholder="Short name for the address"
              required
              className={field}
            />
            <select name="kind" defaultValue="research" className={field}>
              {LIBRARY_KINDS.map((kind) => (
                <option key={kind.id} value={kind.id}>
                  {kind.label}
                </option>
              ))}
            </select>
            <input
              name="category"
              placeholder="Category, however you want to group it"
              className={field}
            />
            <textarea
              name="summary"
              rows={2}
              placeholder="One or two lines, shown in the list"
              className={`${field} sm:col-span-2`}
            />
            <textarea
              name="body"
              rows={6}
              placeholder="The piece itself, if it is written to be read here. Leave empty for a file."
              className={`${field} sm:col-span-2`}
            />

            <label className="text-[13px] text-ink-muted sm:col-span-2">
              File to download (optional). It goes into a private store, and
              members get a personal link that expires after a few minutes.
              <input
                name="file"
                type="file"
                className="mt-2 block w-full font-body text-[14px] text-ink"
              />
            </label>

            <label className="flex items-center gap-3 text-[15px] text-ink">
              <input
                type="checkbox"
                name="is_published"
                className="h-5 w-5 accent-[var(--fwd-accent)]"
              />
              Show to members
            </label>

            <button
              type="submit"
              className="fwd-btn border border-photo-ground/60 bg-accent-on-dark px-6 py-2.5 text-[15px] text-photo-ground hover:border-photo-ground hover:bg-photo-ground hover:text-accent-on-dark sm:justify-self-start"
            >
              Save
            </button>
          </form>
        </section>

        {items === null ? (
          <p className="mt-10 rounded-2xl border border-border bg-surface-raised p-6 text-[15px] text-ink">
            The database is not connected, so there is nothing to show.
          </p>
        ) : items.length === 0 ? (
          <p className="mt-10 text-[15px] text-ink-muted">
            Nothing in the library yet.
          </p>
        ) : (
          <ul className="mt-10 space-y-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="rounded-2xl border border-border bg-surface-raised px-6 py-4"
              >
                <p className="text-[15px] text-ink">
                  {item.title}
                  {item.is_published ? null : (
                    <span className="ml-2 text-[12px] text-ink-muted">
                      (not shown to members)
                    </span>
                  )}
                </p>
                <p className="text-[13px] text-ink-muted">
                  {kindLabel(item.kind)}
                  {item.category ? ` · ${item.category}` : ""}
                  {item.file_name ? ` · ${item.file_name}` : " · no file"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
