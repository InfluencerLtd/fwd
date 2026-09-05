# Two things to ask somebody else for

Email and HubSpot are the last two services not connected, and neither can be
finished from this codebase: one needs whoever runs the DNS for
`influencer.com`, the other needs somebody with admin in HubSpot.

Both sections below are written to be forwarded as they are.

`SETUP.md` sections 2 and 3 are the same jobs written for whoever runs the code.
This file is for the people who only need to do their bit.

---

## 1. Email — for whoever runs the DNS

**Do this part first, yourself, before you send anything.** The records they need
do not exist until the domain has been added to Resend:

1. Go to **resend.com** and make an account. It is free and needs nobody's
   permission.
2. **Domains**, then **Add Domain**. Enter `fwd.influencer.com`.
3. Resend shows a short list of DNS records. **Screenshot it or copy it out**, and
   send that with the note below.
4. **API Keys**, then **Create API Key**. Keep the key somewhere safe — it is
   shown once. That one comes to the site, not to them.

Then send them this:

> We are putting the fwd. members' site on `fwd.influencer.com`, and it needs to
> send email from that address — sign-in codes, invitations, and replies to
> membership applications.
>
> Could you add the DNS records below? There are usually three or four: a couple
> of TXT records and sometimes an MX.
>
> **These are all on the `fwd.influencer.com` subdomain and do not touch
> influencer.com's own email.** Nothing about how the company sends or receives
> mail changes. The subdomain is deliberately separate so its sending reputation
> stays its own.
>
> [paste the records from Resend here]
>
> While you are in there, the site itself also needs `fwd.influencer.com` pointed
> at Vercel — that is a separate CNAME and I can send the exact value.
>
> It can take up to a few hours to go through after the records are in. No rush
> on the same day, but nobody can sign in to the site until it is done.

When they say it is in, run `npm run check:email`. It tells you whether the
domain actually verified, rather than whether the records look right.

---

## 2. HubSpot — for whoever has admin

They need HubSpot **admin**, because both steps are in Settings.

Send them this:

> We are launching a members' site called fwd. and applications need to land in
> HubSpot as contacts. Two things, and the order matters.
>
> **First, three custom contact properties.** Settings → Properties → Create
> property. Object type **Contact**, field type **Single-line text**. The
> internal names have to be exactly these, lowercase, with the underscores:
>
> - `fwd_member_group`
> - `fwd_market`
> - `fwd_profile_link`
>
> The order matters because HubSpot does not ignore a property it does not
> recognise — it rejects the whole contact. If these are missing when the site
> starts sending, **every application fails to sync**, not just those three
> fields.
>
> **Second, a private app.** Settings → Integrations → Private Apps → Create a
> private app. Call it something like "fwd. website". On the **Scopes** tab tick
> exactly two:
>
> - `crm.objects.contacts.read`
> - `crm.objects.contacts.write`
>
> Creating it gives you an access token starting `pat-`. Could you send me that?
> It is a password for our contacts, so please not in a public channel — a direct
> message or the password manager is fine.

When the token arrives, run `npm run check:hubspot`. It checks the token, the
permissions and all three properties by name and type before anything depends on
them.

---

## Where the answers go

Both are secrets, so they go in two places and are never committed:

`.env.local`, for your own machine:

```
RESEND_API_KEY="re_…"
EMAIL_FROM="fwd. <hello@fwd.influencer.com>"
HUBSPOT_ACCESS_TOKEN="pat-…"
```

and Vercel, for the live site — the project, then Settings, then Environment
Variables, or:

```bash
npx vercel env add RESEND_API_KEY production
```

**Adding them locally is not enough.** The site people actually visit runs on
Vercel and reads Vercel's copy, so a key that is only in `.env.local` works
perfectly on your machine and not at all in public.

## Nothing is lost while you wait

Applications save to our own database first and are marked as waiting for
HubSpot. When the token arrives, a **push them to HubSpot** button appears at the
top of `/admin` with a count of how many are waiting; press it and they go
across. Nothing that came in beforehand is lost.

The five emails are written and wired up already — they simply have nothing to
send through. Email is the one that actually stops people: without it no member
can sign in at all, because signing in is an emailed code and there are no
passwords in fwd.
