# Where fwd. goes next

Written 5 September 2026. Public launch is set for the 14th, which is nine days
away.

This is not a wish list. It is what the site can already do, what it cannot do
yet, and the order in which the gaps are likely to start hurting. Everything
here is checkable against the code.

---

## Where it actually stands

The site is built and deployed. Two versions of it exist: the public pages and
The House, the member area behind an emailed sign-in code.

**The public side** has a home page, a membership page, privacy and cookies, and
an application form that saves to a real database. There is a switch that puts a
holding page up instead of all of it.

**The House** has a members' directory, events with RSVPs and invitations, a
library of files, a merch page, a newsletter page and a profile each member can
edit. Five members are in it: the Influencer team.

**The admin** is a set of plain pages where applications are accepted or
declined, members added, events created, introductions handled and files
uploaded.

**What is genuinely connected:** the database, hosting, and visitor counting.

**What is not:** email and HubSpot. Both are waiting on other people —
see `HANDOVER.md`.

That second list matters more than it looks. There are no passwords anywhere in
fwd.: signing in *is* an email. Until email works, nobody outside this machine
can get into The House at all.

---

## The next nine days

Nothing in this section is expansion. It is the difference between a site that
exists and a site that works.

1. **Email.** Everything else on this list is cosmetic next to it. Members
   cannot sign in, applicants hear nothing, invitations do not arrive.
2. **The switch that opens the site.** `NEXT_PUBLIC_SITE_MODE` is not set in
   Vercel, and without it the site defaults to the holding page. The full site
   is deployed and currently not being shown.
3. **The domain.** `fwd.influencer.com` still needs pointing at Vercel, by the
   same person doing the email records. Until then the only address is a
   `vercel.app` one behind a login.
4. **Photography.** Every image on the site is a warm gradient standing in for a
   real one. Drop files into `public/photography` with the names in the README
   there and they appear — no code needed.
5. **Event descriptions.** All four events say `[DESCRIPTION NEEDED]`. The
   YouTube dinner is the first real one and it is blank.
6. **The privacy notice.** It points at Influencer's, which is right, but that
   notice was last updated in December 2022 and does not mention membership
   applications, a member directory, or the services this site runs on. Somebody
   at Influencer needs to confirm it stretches before the form is public.
7. **Two bits of placeholder copy** that will ship if nobody catches them: the
   newsletter has no name, and the member perks card has no content.

---

## After launch, roughly in order

### 1. Handling applications when there are more than a handful

Right now the admin shows applications waiting on a decision, and you accept or
decline them one at a time. That is fine for ten. It is not fine for two hundred
arriving in the week after an announcement.

What it will need, in the order it will need it:

- **Notes on an applicant.** At the moment a decision has no memory. Who
  vouched for them, whether they were met at an event, why they were held back.
- **A "not yet" that is not a no.** Membership is meant to stay balanced across
  brands, creators, platforms and industry. That means turning down good people
  because the room is already full of their kind, and those are exactly the
  people to come back to next intake.
- **Intakes rather than a queue.** Deciding in batches lets you see the shape of
  the room before you commit. A rolling queue quietly fills it first-come.
- **A search.** Obvious, but the admin has none.

### 2. The room itself

The directory is the thing members are actually paying attention to, and the
introductions are the thing that makes it different from a list.

Introductions are currently made by hand: a member asks, someone at Influencer
writes to both sides. That is the right way to do it and it is the reason the
benefit is worth having — but it is also the first thing that breaks. At five
members it costs nothing. At a hundred and fifty it is somebody's job.

Before it gets there:

- Track what happened to a request. There is no record of whether an
  introduction was made or how it went.
- Give members a way to say who they *want* to meet, not just who they saw.
- Decide what happens when somebody says no.

### 3. Events, properly

Events currently list, take an RSVP, and send an invitation. That covers a
dinner for twenty. It does not cover:

- **Capacity and a waiting list.** The YouTube dinner will be oversubscribed.
- **A calendar file.** An invitation with no `.ics` attached gets forgotten.
- **Reminders.** One a week out, one on the day.
- **A guest list to work from on the night**, and a way to mark who came.
- **A recap afterwards** that lands in the library, so an event keeps earning
  after it is over.

That last one is what turns events from a calendar into a reason to stay a
member between them.

### 4. A reason to come back between events

The library and the quarterly newsletter are the answer to "why would I open
this in February". Both exist and both are nearly empty: two example items in
the library, and a newsletter with no name and no issue.

This is a content problem, not a software one. The software is ready.

### 5. Cities

Every member has a market field, and every event has a city. Nothing yet uses
either to shape what a member sees.

The moment there are members in New York and events in London, someone in New
York is looking at a page that is mostly not for them. That is the point at
which "market" stops being a form field and becomes the structure of the club:
events filtered by city, a directory that opens on your own room, a host in each
place.

Worth knowing that the five real members currently have no market set at all.

---

## What breaks first

Not predictions. These are things already true of the code.

**Email reputation.** `fwd.influencer.com` will be a brand-new sending domain
delivering codes to senior people at large companies with aggressive spam
filters. New domains are treated with suspicion. Send gently at first, watch
what lands, and do not let the first thing it ever sends be a blast to two
hundred applicants.

**One admin password, shared.** There are no accounts and no roles in the admin,
so everyone who can get in can do everything, and nothing records who did what.
That is fine for a team of five who trust each other, and it stops being fine
the first time a decision needs explaining.

**The directory is the crown jewel and the biggest exposure.** It holds the
names, employers and contact preferences of senior people at client companies.
It is properly locked down — no page of it is public and the database refuses
anonymous reads — but it is the thing worth protecting, and it will only get
more so.

**Introductions do not scale**, as above. That is a good problem and it still
needs a plan before it arrives.

---

## Decisions that need a person, not a plan

These are not for me to pick.

- **Does membership ever cost money?** There is deliberately no price anywhere
  in fwd. — `npm run check:db` fails if a price, cost, amount or payment column
  ever appears in the database. That was the right call for launch. Changing it
  later changes the shape of the whole thing.
- **How big should the room get?** Every decision above depends on the answer.
  Two hundred members is a club. Two thousand is a mailing list.
- **Partners.** The logo guidelines assume a "partners" section that does not
  exist. If sponsors are coming, that is a structural question about what the
  club is, not a page to add.
- **Who owns this after launch?** The site is only as good as the person adding
  events, writing recaps and making introductions. That is a role, not a task.

---

## What to watch

Visitor counting is switched on in the code but still needs enabling once in the
Vercel dashboard. Once it is, these are worth more than page views:

| Number | Why it matters |
| --- | --- |
| Applications a week | Whether the club is being talked about |
| How many start the form and finish it | The form is long; this says how long is too long |
| Accept rate by group | Whether the room is staying balanced |
| Members who sign in at least once a month | The only real measure of whether The House is used |
| RSVPs against invitations sent | Whether events are landing |
| Introduction requests | The signal that the directory is doing its job |

Everything else is noise for the first six months.
