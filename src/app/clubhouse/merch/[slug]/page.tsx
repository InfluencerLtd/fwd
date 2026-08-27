import Link from "next/link";
import { notFound } from "next/navigation";
import { requireMember } from "@/lib/auth/guard";
import {
  getMerchItem,
  getOwnClaim,
  countClaims,
  lastAddressFor,
} from "@/lib/store/merch";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { ClaimForm } from "@/components/clubhouse/claim-form";
import { MERCH } from "@/content/clubhouse";

export default async function MerchItemPage({
  params,
}: PageProps<"/clubhouse/merch/[slug]">) {
  const { slug } = await params;
  const member = await requireMember(`/clubhouse/merch/${slug}`);

  const item = await getMerchItem(slug);
  if (!item) notFound();

  const [own, taken, prefill] = await Promise.all([
    getOwnClaim(item.id, member.id),
    countClaims(item.id),
    lastAddressFor(member.id),
  ]);

  const active = own && own.status !== "cancelled" ? own : null;
  const allGone =
    item.claim_limit !== null && taken >= item.claim_limit && !active;
  const canClaim = item.is_open && !allGone;

  return (
    <main className="flex-1 px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/clubhouse/merch"
          className="fwd-underline font-body text-sm text-accent"
        >
          {MERCH.back}
        </Link>

        <div className="fwd-zoom mt-8 overflow-hidden rounded-2xl">
          <PhotoPlaceholder
            label={`Photograph of ${item.title}`}
            ratio="wide"
            className="fwd-zoom-inner"
          />
        </div>

        <h1 className="mt-8 text-4xl sm:text-5xl">{item.title}</h1>

        {item.description ? (
          <p className="mt-5 font-body text-[17px] leading-relaxed text-ink-muted">
            {item.description}
          </p>
        ) : null}

        <div className="mt-10">
          {canClaim ? (
            <ClaimForm
              slug={item.slug}
              sizes={item.sizes}
              existing={active}
              prefill={prefill}
            />
          ) : (
            <p className="rounded-2xl border border-border bg-surface-raised p-6 font-body text-[15px] text-ink">
              {allGone ? MERCH.allGone : MERCH.closed}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
