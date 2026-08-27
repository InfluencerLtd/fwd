# fwd.

The website and member area for **Forward**, shortened to **fwd.**, a private
members' club, by influencer.

This README is written for someone who has never opened a code editor. If any
part of it assumes something you do not know, that is a fault in the README and
worth saying so.

---

## What state the project is in

| Phase | What it is | Status |
| --- | --- | --- |
| Foundations | Colours, texture, typefaces, light and dark mode | **Done and signed off** |
| Phase 1a | The pre-launch holding page | **Built, needs the database connected** |
| Phase 1b | The full public site and the application form | In progress |
| Phase 2 | The Clubhouse, the member area | Not started |
| Phase 3 | Merch, research library, other club material | Not started |

**Right now there are two things to look at:** the holding page at
`http://localhost:3000`, and the design review page at
`http://localhost:3000/review`.

---

## Looking at the site on your own computer

You need to do this once, in the app called Terminal.

1. Open Terminal and go to this folder.
2. Type `npm install` and press return. This downloads the pieces the site is
   built from. It takes a minute or two and only needs doing once.
3. Type `npm run dev` and press return.
4. Open a browser and go to **http://localhost:3000**

While that is running, any change to the files shows up in the browser within a
second or so. To stop it, click in the Terminal window and press `Ctrl` and `C`
together.

### The design review page

**http://localhost:3000/review**

This is an internal working page, not part of the public site, and it is set so
search engines will not index it. It shows the colour palette, the measured
contrast numbers, three grain strengths and three typeface pairings, so the
choices can be made by looking rather than by imagining. There are four
questions at the bottom of it that need answers before the public site is built.

---

## What each folder is for

```
src/
  app/          Each folder in here is a page on the site.
                  page.tsx        the home page (a placeholder for now)
                  review/         the design review page
                  layout.tsx      the wrapper every page sits inside
                  globals.css     >>> ALL THE COLOURS LIVE HERE <<<
  components/   Reusable pieces used on more than one page.
  content/      site.ts         >>> ALL THE WORDS LIVE HERE <<<
  lib/          Settings and small helpers. No visual design in here.
                  brand.ts        >>> ALL THE NAMES LIVE HERE <<<
                  site-config.ts  >>> ALL THE SWITCHES LIVE HERE <<<
                  fonts.ts        the typeface options
                  theme.ts        light and dark mode
                  contrast.ts     the accessibility math
                  supabase.ts     the database connection
                  store/          saving things to the database

supabase/       migrations/     the database setup, to run once in Supabase

public/         Images and files served exactly as they are.
.env.example    A template for passwords and keys. Copy it, never edit it.
```

Files ending `.tsx` are pages and visual pieces. Files ending `.ts` are settings
and logic. Files ending `.css` are styling.

---

## How to change the words on the site

Open **`src/content/site.ts`**. Every word the public reads is in that one file.
Change the text between the quote marks, save, and the site updates. You never
need to touch anything that controls the layout.

Anything marked `DRAFT` in that file is my wording, not approved wording.

---

## How to change the club name

Open **`src/lib/brand.ts`**. Every name on the whole site is read from that one
file, so changing it there changes it everywhere at once. Nothing is typed by
hand anywhere else.

The rules about the name are written at the top of that file. The short version:
the mark is always `fwd.`, lowercase, always with the full stop, and
`by influencer` always sits apart from it and always looks quieter.

The same file holds the placeholders for the club email address, the domain and
the name of Jenny's quarterly newsletter. They currently render as visible
placeholder text such as `[NEWSLETTER NAME]` so they cannot ship by accident.

---

## How to change the colours

Open **`src/app/globals.css`** and look for the block marked
`fwd. design tokens` near the top.

There are seven colours, listed twice: once for light mode and once for dark
mode. Change a value, save the file, and it changes across the entire site
instantly. No other file contains a colour.

The colours are named after their **job**, not after what they look like:

| Name | What it is for |
| --- | --- |
| `surface` | The page background |
| `surface-raised` | Cards and panels sitting on top of the page |
| `ink` | Text you read |
| `ink-muted` | Captions, labels, secondary text |
| `accent` | Links and buttons |
| `accent-on-dark` | The pale ice blue. **Dark grounds only.** |
| `border` | Hairlines and dividers |

### The one rule that must not be broken

The pale ice blue `#b1e3fc` is close to invisible on the off-white page. It
measures 1.27 to 1 against it, where 4.5 to 1 is the minimum for text. It is
only ever used on dark grounds or over dark photography, which is what
`accent-on-dark` means.

The `/review` page measures this live, so you can check it rather than take my
word for it.

### How to change the grain

In the same file, find `--fwd-grain-opacity`. It is a single number. Higher is
more textured. The `/review` page shows three strengths side by side.

---

## How to change what the public sees

Open **`src/lib/site-config.ts`**. Everything in that file is a switch.

### Holding page, or the full site

`SITE_MODE` is either `"holding"` or `"live"`.

- `"holding"` shows the pre-launch page: the wordmark, one line, and an email
  capture. This is what should be at the address from the moment the domain is
  registered.
- `"live"` shows the full public site.

The holding page is **not deleted** when the site launches. Switch this word
back to `"holding"` at any time and it returns exactly as it was.

### Letting the team see the real site early

While the holding page is up, the team can still preview the real site. Set a
password as `EARLY_ACCESS_PASSWORD` in `.env.local`, then go to
`/early-access` and enter it. That browser then sees the real site while
everyone else still sees the holding page. It lasts a month.

If no password is set, the early access page does not exist at all, so there is
no default password anywhere for somebody to guess.

### The draft copy marker

`COPY_APPROVED` is currently `false`, so a small **"draft copy, not approved"**
tag sits in the bottom corner of every page. That is deliberate: none of the
wording has been signed off yet. Set it to `true` once the words are agreed and
the tag disappears.

## How to open or close applications

`APPLICATIONS_OPEN` in the same file. `true` shows the application form, `false`
shows a waitlist sign-up with different wording instead. The switch exists and
works; the form it controls is the next thing being built.

## How to add an event

**Not built yet.** Events are part of Phase 2, The Clubhouse. When it exists
there will be an admin screen for the club team, and this section will explain
how to use it.

## How to add a member

**Not built yet.** Also Phase 2.

---

## Passwords and keys

Never put a password, an API key or a database key into any file in this project
except `.env.local`, which is deliberately excluded from version control and
never leaves your computer.

`.env.example` is a template showing which keys will be needed. It contains no
real values and is safe to look at.

None of these accounts exist yet. Supabase, HubSpot and the email sender all
need to be set up before Phase 1 can be finished.

---

## The commands

| Command | What it does |
| --- | --- |
| `npm install` | Downloads the pieces the site is built from. Once, at the start. |
| `npm run dev` | Runs the site on your own computer so you can look at it. |
| `npm run build` | Checks the whole site compiles. Run before publishing. |
| `npm run lint` | Checks the code for mistakes. |
