import type { Metadata } from "next";
import { listAllMembers } from "@/lib/store/admin";
import { createMember, changeMemberStatus } from "@/app/admin/actions";
import { MEMBER_GROUPS } from "@/lib/brand";

export const metadata: Metadata = { title: "Members" };

const field =
  "fwd-field w-full border border-border bg-surface-raised px-4 py-2.5 font-body text-[15px] text-ink";

export default async function AdminMembersPage() {
  const members = await listAllMembers();

  return (
    <main className="flex-1 px-6 py-12 font-body">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl">members</h1>

        <section className="mt-10 rounded-2xl border border-border bg-surface-raised p-6">
          <h2 className="text-2xl">Add a member</h2>
          <p className="mt-2 text-[13px] text-ink-muted">
            Adding somebody here lets them sign in straight away. Accepting an
            application does this automatically, so this is for anyone who did
            not come through the form.
          </p>
          <form action={createMember} className="mt-6 grid gap-4 sm:grid-cols-3">
            <input name="name" placeholder="Full name" required className={field} />
            <input name="email" type="email" placeholder="Email" required className={field} />
            <input name="role" placeholder="Role" className={field} />
            <input name="company" placeholder="Company" className={field} />
            <input name="market" placeholder="Market" className={field} />
            <select name="group" defaultValue="brand" className={field}>
              {MEMBER_GROUPS.map((g) => (
                <option key={g.id} value={g.id}>{g.label}</option>
              ))}
            </select>
            <button type="submit" className="fwd-btn bg-accent px-6 py-2.5 text-[15px] text-white hover:bg-ink">
              Add member
            </button>
          </form>
        </section>

        {members === null ? (
          <p className="mt-10 rounded-2xl border border-border bg-surface-raised p-6 text-[15px] text-ink">
            The database is not connected, so there is nothing to show.
          </p>
        ) : members.length === 0 ? (
          <p className="mt-10 text-[15px] text-ink-muted">No members yet.</p>
        ) : (
          <ul className="mt-10 space-y-3">
            {members.map((member) => (
              <li
                key={member.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-surface-raised px-6 py-4"
              >
                <div className="min-w-0">
                  <p className="text-[15px] text-ink">
                    {member.name}
                    {member.is_dummy ? (
                      <span className="ml-2 rounded-full border border-ember/40 px-2 py-0.5 text-[10px] tracking-[0.14em] text-ember">
                        EXAMPLE
                      </span>
                    ) : null}
                    {member.status !== "active" ? (
                      <span className="ml-2 text-[12px] text-ink-muted">
                        ({member.status})
                      </span>
                    ) : null}
                  </p>
                  <p className="text-[13px] text-ink-muted">
                    {member.email} · {member.role}
                    {member.company ? `, ${member.company}` : ""}
                    {member.market ? ` · ${member.market}` : ""}
                  </p>
                </div>

                <form action={changeMemberStatus} className="flex items-center gap-2">
                  <input type="hidden" name="id" value={member.id} />
                  <select
                    name="status"
                    defaultValue={member.status}
                    className="fwd-field border border-border bg-surface px-4 py-2 text-[13px] text-ink"
                  >
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="removed">Removed</option>
                  </select>
                  <button type="submit" className="fwd-btn border border-border px-4 py-2 text-[13px] text-ink hover:border-ink">
                    Save
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
