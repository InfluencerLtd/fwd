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
4. Open the folder `supabase/migrations` in this project. There are four files,
   numbered. **Open each one in turn, paste the whole thing into the SQL
   editor, and press Run.** Do them in number order, 0001 first.
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
7. Go to **Project Settings**, then **API keys**. You need two values:
   - the **Project URL**
   - the **service_role** key, which is secret

Then open the file `.env.local` in this project and add:

```
NEXT_PUBLIC_SUPABASE_URL="the project URL"
SUPABASE_SERVICE_ROLE_KEY="the service_role key"
```

> **The service_role key can do anything to the database.** It belongs only in
> `.env.local` and in Vercel's settings. Never paste it into a message, a
> document, or any other file in this project.

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

Applications are still saved without this, so it is not urgent.

1. In HubSpot, create a **private app** and give it permission to read and write
   contacts. That gives you an access token.
2. Create three custom contact properties, or HubSpot will reject the whole
   record:

   | Property name | Type |
   | --- | --- |
   | `fwd_member_group` | Single-line text |
   | `fwd_market` | Single-line text |
   | `fwd_profile_link` | Single-line text |

Add to `.env.local`:

```
HUBSPOT_ACCESS_TOKEN="the token"
```

---

## 4. Two secrets of your own

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

## 5. Vercel, to put it online

This is what turns the site into a link you can send to anyone.

1. Put this project on GitHub.
2. At vercel.com, create a project from that repository.
3. In the project's **Environment Variables**, add every line from your
   `.env.local`, plus:

   ```
   NEXT_PUBLIC_SITE_URL="https://the real address"
   ```

4. Deploy.

The site will show the **holding page**, which is what should be at the address
before launch. To see the full site while everyone else sees the holding page,
add `NEXT_PUBLIC_SITE_MODE="live"` to a preview environment only, or set
`EARLY_ACCESS_PASSWORD` and use `/early-access`.

On launch day, change `DEFAULT_SITE_MODE` to `"live"` in
`src/lib/site-config.ts`.

---

## Checking it worked

```bash
npm run check:db
```

runs the database files against a real database on your own computer and tells
you if any of them is broken. It needs no accounts and changes nothing.

```bash
npm run check:links
```

checks that invitation and unsubscribe links cannot be forged or edited to point
at somebody else.
