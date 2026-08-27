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
| Foundations | Colours, texture, typefaces, light and dark mode | **Built, waiting on decisions** |
| Phase 1 | The public site and the application form | Not started |
| Phase 2 | The Clubhouse, the member area | Not started |
| Phase 3 | Merch, research library, other club material | Not started |

**Right now there is one thing to look at: the design review page.** See below.

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
  lib/          Settings and small helpers. No visual design in here.
                  brand.ts        >>> ALL THE NAMES LIVE HERE <<<
                  fonts.ts        the typeface options
                  theme.ts        light and dark mode
                  contrast.ts     the accessibility maths
                  read-tokens.ts  lets the review page read the real colours

public/         Images and files served exactly as they are.
.env.example    A template for passwords and keys. Copy it, never edit it.
```

Files ending `.tsx` are pages and visual pieces. Files ending `.ts` are settings
and logic. Files ending `.css` are styling.

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

## How to add an event

**Not built yet.** Events are part of Phase 2, The Clubhouse. When it exists
there will be an admin screen for the club team, and this section will explain
how to use it.

## How to add a member

**Not built yet.** Also Phase 2.

## How to open or close applications

**Not built yet.** Part of Phase 1. There will be a single switch the club team
can flip: open shows the application form, closed shows a waitlist sign-up with
different wording instead.

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
