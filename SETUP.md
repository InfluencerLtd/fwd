# Connecting the services

Everything is built. Nothing can save or send anything until these three
accounts exist. This is the whole list, in the order worth doing it.

Written for somebody who has never done this before. If a step assumes something
you do not know, that is a fault in this document.

---

## 1. Supabase, the database

**This is the one that unblocks everything else.** About ten minutes.

1. Go to supabase.com and make an account.
2. Create a **new project**. Call it `fwd-clubhouse`. Choose a region close to
   London. It takes a couple of minutes to build.
3. When it is ready, open **SQL Editor** in the left-hand menu.
4. Open the file `supabase/all-migrations.sql` in this project. **Select all of
   it, paste it into the SQL editor, and press Run.** It should say "Success.
   No rows returned".

   That one file is the numbered files in `supabase/migrations` joined
   together, so this is one paste rather than seven. Postgres runs a paste as a
   single transaction, so if any part of it fails nothing is applied at all and
   you can fix the problem and paste again. Running it twice is safe.
5. Optional but useful: do the same with `supabase/seed-examples.sql`. That adds
   five obviously fake members so you can look at the member area before there
   are real members in it, and the four real events from the club plan. The fake
   people all appear with an orange EXAMPLE tag so nobody can mistake them for
   members. Delete them later with:
   `delete from public.members where is_dummy;`
6. Open **Storage** in the left-hand menu and create a bucket called exactly
   `library`. **Leave "Public bucket" switched OFF.** This is where research and
   white papers are kept. A private bucket means files have no web address of
   their own: the site hands each member a personal link that stops working
   after a few minutes, so a file cannot be forwarded outside the club.
7. You need two values, and they are on two different pages.

   **The Project URL.** Look at your browser's address bar. It reads
   `supabase.com/dashboard/project/SOMETHING`. That last part is your project's
   reference, and the Project URL is `https://SOMETHING.supabase.co`. (It is
   also written out under **Settings**, then **Data API**.) Note the `.co`:
   `supabase.com` is the dashboard, `supabase.co` is your project.

   **The secret key.** Go to **Settings**, then **API Keys**. That page has two
   groups. You want the row under **Secret keys**, not the one under
   **Publishable key**. Press the eye icon to reveal it.

   Older projects show this page differently, as `anon` and `service_role`
   keys. In that case take **service_role**. Either generation works.

Then open the file `.env.local` in this project and add:

```
NEXT_PUBLIC_SUPABASE_URL="the project URL"
SUPABASE_SERVICE_ROLE_KEY="the service_role key"
```

> **The service_role key can do anything to the database.** It belongs only in
> `.env.local` and in Vercel's settings. Never paste it into a message, a
> document, or any other file in this project. `.env.local` is already in
> `.gitignore`, so it cannot be committed by accident.

Then check it:

```
npm run check:supabase
```

That connects for real and tells you, line by line, whether every table exists,
whether row level security is on, whether anything is publicly readable, and
whether the private `library` bucket is there. It writes one obviously fake
sign-up and deletes it again, so it proves the connection both ways rather than
just that the keys parse. If anything is wrong it says which step to go back to.

---

## 2. Resend, for sending email

Nothing can be sent until this exists: no sign-in codes, no invitations, no
welcome or decline emails.

1. Go to resend.com and make an account.
2. Add the club's domain and follow their steps to verify it. This needs
   somebody with access to the domain's DNS settings.
3. Create an **API key**.

Add to `.env.local`:

```
RESEND_API_KEY="the key"
EMAIL_FROM="fwd. <hello@yourdomain>"
```

You can read all three emails at `/review/emails` before any are sent.

---

## 3. HubSpot, for marketing records

Applications are still saved without this, so it is not urgent. They are
recorded as waiting to be pushed, and go across once this exists, so nothing is
lost by leaving it until later.

**Do step 2 before step 1 is switched on.** HubSpot does not ignore a property
it does not recognise, it rejects the whole contact, so a missing property does
not lose one field, it loses every application.

1. **The three custom properties.** In HubSpot go to **Settings**, then
   **Properties**, then **Create property**. Object type **Contact**, field type
   **Single-line text**. The internal name has to be exactly this:

   | Property name | Type |
   | --- | --- |
   | `fwd_member_group` | Single-line text |
   | `fwd_market` | Single-line text |
   | `fwd_profile_link` | Single-line text |

2. **The private app.** **Settings**, then **Integrations**, then **Private
   Apps**, then **Create a private app**. On the **Scopes** tab tick
   `crm.objects.contacts.read` and `crm.objects.contacts.write`. Creating it
   gives you an access token that starts `pat-`.

Add to `.env.local`:

```
HUBSPOT_ACCESS_TOKEN="the token"
```

Then check it:

```
npm run check:hubspot
```

That connects for real and tells you whether the token works, whether it has the
right permissions, and whether all three custom properties exist with the right
type. It writes nothing to your CRM, because creating a contact can set
workflows off. To prove it can write, run `npm run check:hubspot -- --write`,
which creates one obviously fake contact and archives it again.

### The two embedded application forms (optional)

The apply section can show HubSpot's own forms instead of ours. Until the three
values below are set it uses our form, which already creates the HubSpot contact
through the API, so there is nothing to do here unless you want HubSpot to own
the form itself.

Build **two** forms in HubSpot, one for creators and one for brands, platforms
and industry, then take the ids out of the embed code HubSpot gives you:

```
NEXT_PUBLIC_HUBSPOT_PORTAL_ID="1234567"
NEXT_PUBLIC_HUBSPOT_FORM_CREATOR="the creator form id"
NEXT_PUBLIC_HUBSPOT_FORM_BRAND="the brand form id"
NEXT_PUBLIC_HUBSPOT_REGION="na1"          # "eu1" if the portal is European
```

Both form ids are needed. One on its own is treated as none, so the two paths
can never end up looking different from each other.

These are `NEXT_PUBLIC_` because a portal id and a form id are not secrets. They
appear in the page source of every HubSpot embed there is. The access token
above is the secret and never reaches the browser.

**What the forms must ask.** Every submission is also copied into our own
applications table, which is what the admin reads and what the accept and
decline emails run off. The copy is matched up by field name, and the names it
looks for are listed in `src/lib/hubspot-forms.ts`. HubSpot's standard contact
properties already match, so a form built from `email`, `firstname`, `lastname`,
`company` and `jobtitle` works as it is. Anything else, add the name to that
file.

Two it cannot guess:

- **The group.** The creator form does not need to ask, it is fixed. The other
  form has to offer `brand`, `platform` and `industry` as the stored values, or
  the application will not be copied across.
- **Consent.** If the HubSpot form has no consent field, the application is
  recorded as not having consented, because that column is the proof and it is
  not something to assume. Add HubSpot's own consent checkbox to both forms.

Turning these on also changes the cookie page, which starts saying that HubSpot
sets cookies. That happens on its own.

---

## 4. Your own always-on access

```
OWNER_EMAIL="sophie.sh@influencer.com"
OWNER_NAME="Sophie Sherwood"
```

That address always has access to The House. If its member record is ever
missing, paused or removed, it is put back automatically the next time a
sign-in code is asked for, so you cannot be locked out of your own site.

It does not skip the six-digit code. You still get the code and still type it.
Nothing in this system can sign in without proving it can read the inbox, and
nothing should be added that can: the member directory holds the names,
employers and contact details of senior people at client companies.

Once you sign in, you stay signed in. A session lasts 90 days and renews every
time you use the site, so as long as you visit now and then you will not see
the sign-in screen again.

## 5. Two secrets of your own

```
LINK_SECRET="a long random string"
ADMIN_PASSWORD="a password for the club team"
```

For `LINK_SECRET`, run this in Terminal and paste what it prints:

```bash
openssl rand -base64 32
```

`LINK_SECRET` is what makes invitation, unsubscribe and sign-in links impossible
to forge. **If you change it later, everyone is signed out and every invitation
link already sent stops working.** Set it once and leave it.

---

## 6. Vercel, to put it online

This is what turns the site into a link you can send to anyone.

1. Put this project on GitHub.
2. At vercel.com, create a project from that repository.
3. In the project's **Settings**, then **Environment Variables**, add the ones
   in the table below.
4. Deploy.

**`.env.local` never leaves your computer.** It is in `.gitignore`, so it is
not in the repository and Vercel never sees it. Anything not entered here does
not exist in production: the site will still run, and it will save nothing.

**Do not simply copy every line across.** Two of them mean something different
in production, and one of those would put the site live before you meant to.

| Variable | What to set in Vercel |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Same as local. Not secret. |
| `SUPABASE_SERVICE_ROLE_KEY` | Same as local. **Secret.** |
| `RESEND_API_KEY` | Same as local. **Secret.** |
| `EMAIL_FROM` | Same as local. |
| `HUBSPOT_ACCESS_TOKEN` | Same as local. **Secret.** |
| `OWNER_EMAIL`, `OWNER_NAME` | Same as local. |
| `NEXT_PUBLIC_SITE_URL` | The real address, e.g. `https://fwd.example`. Not set locally. |
| `LINK_SECRET` | **A new one, not the local one.** Generate with `openssl rand -hex 32`. This signs invitation, unsubscribe and session links; a development secret that has been on a laptop should not be the one signing real ones. |
| `ADMIN_PASSWORD` | **A new, strong one.** This is the only thing between the internet and every application. |
| `EARLY_ACCESS_PASSWORD` | A new one, if the team wants to preview the full site before launch. |
| `NEXT_PUBLIC_SITE_MODE` | **Do not set it.** ⚠️ |

That last row is the one to be careful about. Locally it is set to `"live"` so
you see the full site. In production, leaving it out means the address shows
the **holding page**, which is what should be there before launch. Copying the
local value across would put the whole site up early.

To preview the full site once it is deployed, either set
`NEXT_PUBLIC_SITE_MODE="live"` on Vercel's **Preview** environment only, never
Production, or set `EARLY_ACCESS_PASSWORD` and use `/early-access`.

On launch day, change `DEFAULT_SITE_MODE` to `"live"` in
`src/lib/site-config.ts`.

---

## Checking it worked

```bash
npm run check:supabase
```

connects to the real Supabase project and tells you whether every table exists,
whether anything is publicly readable that should not be, and whether the
private `library` bucket is there. It writes one fake sign-up and deletes it
again, so it proves the connection both ways.

```bash
npm run check:db
```

runs the database files against a real database on your own computer and tells
you if any of them is broken. It needs no accounts and changes nothing.

```bash
npm run check:hubspot
```

checks the HubSpot token, its permissions, and the three custom properties that
every application depends on.

```bash
npm run check:links
```

checks that invitation and unsubscribe links cannot be forged or edited to point
at somebody else.
