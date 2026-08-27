import { requireMember } from "@/lib/auth/guard";
import { ProfileForm } from "@/components/clubhouse/profile-form";
import { PROFILE } from "@/content/clubhouse";

export default async function ProfilePage() {
  const member = await requireMember("/clubhouse/profile");

  return (
    <main className="flex-1 px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl sm:text-5xl">{PROFILE.heading}</h1>
        <p className="mt-5 font-body text-[17px] leading-relaxed text-ink-muted">
          {PROFILE.intro}
        </p>
        <ProfileForm member={member} />
      </div>
    </main>
  );
}
