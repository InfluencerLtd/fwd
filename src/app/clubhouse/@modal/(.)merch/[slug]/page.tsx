import { notFound } from "next/navigation";
import { getCurrentMember } from "@/lib/auth/session";
import {
  getMerchItem,
  getOwnClaim,
  countClaims,
  lastAddressFor,
} from "@/lib/store/merch";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { ClaimForm } from "@/components/clubhouse/claim-form";
import { RouteModal } from "@/components/clubhouse/route-modal";
import { MERCH } from "@/content/clubhouse";

/**
 * One merch item, opened over the list.
 *
 * Intercepts a click on /clubhouse/merch/[slug] from inside the member area.
 * The real page at that address is untouched and is still what a refresh or a
 * bookmark gets. See src/components/clubhouse/route-modal.
 *
 * No "back to merch" link in here, unlike the page: the way out of a modal is
 * the close button and the Escape key, and a link that navigates would leave
 * the member somewhere different from where they opened it.
 */
export default async function MerchItemModal({
  params,
}: PageProps<"/clubhouse/merch/[slug]">) {
  const { slug } = await params;
  const member = await getCurrentMember();
  if (!member) notFound();

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
    <RouteModal label={item.title}>
      <div className="px-6 py-8 sm:px-10">
        <div className="fwd-zoom overflow-hidden rounded-2xl">
          <PhotoPlaceholder
            label={`Photograph of ${item.title}`}
            ratio="wide"
            className="fwd-zoom-inner"
          />
        </div>

        <h2 className="mt-8 text-3xl sm:text-4xl">{item.title}</h2>

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
    </RouteModal>
  );
}
