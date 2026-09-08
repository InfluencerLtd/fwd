# fwd. — design audit

Benchmark: fivetwonine.com, audited page by page on 8 September 2026 (homepage,
about, for brands, the impact list, and the navigation and footer around them).

Nothing in this document proposes copying them. What follows is the reasoning
underneath their site, and what the equivalent move is for a private members'
club rather than a 5,000-person creator community.

---

## 1. The biggest problem

**Our site is a photographic site with no photographs.**

Twenty-six of our twenty-eight image slots are empty. FiveTwoNine is roughly
half photography by area, and that is where most of its immersion comes from.
We have built the same kind of page and then not had the pictures to fill it,
so every section is a caption waiting for an image that has not arrived.

That is the surface problem, and the shoot fixes it. Underneath it is a second
problem the shoot will **not** fix, and it is the one that actually matters:

**Everything on our page is the same size.**

FiveTwoNine's type runs from 10px to about 200px — a twenty-fold range inside
one scroll. Ours runs from 11px to 48px. After the hero, the largest thing on
our homepage is 48px and the smallest is 17px, and almost everything is one of
those two. A page with no scale contrast reads as *even*, and even reads as
polite, and polite reads as a template. It is why the site feels like "a nice
website" rather than "who designed this".

Scale contrast costs nothing and needs no photography. It is the single
highest-leverage change available to us right now.

**And a third, which is nearly as bad:** the strongest writing we have is not
on the site. `WHY` and `STATEMENT` in `src/content/site.ts` are written,
signed off in tone, and rendered nowhere. *"The room is the product. Everything
else follows from who is in it."* is the best sentence anyone has written for
this brand and no visitor has ever seen it.

---

## 2. The five biggest opportunities, ranked

1. **A real type scale.** One statement size, four times larger than anything
   currently on the page, used two or three times total. This is what buys the
   confidence.
2. **Put the argument on the page.** The homepage currently explains what
   membership unlocks and never says why the thing needs to exist. The best
   pages establish a worldview before they sell anything.
3. **Ground changes as punctuation.** Our page is off-white almost the whole
   way down, with one photo band. Theirs changes ground five times. Each change
   is a page turn, and a page turn is what stops a scroll reading as one long
   document.
4. **Composition off the centre line.** We centre nearly everything. Centred is
   the default of a template; asymmetry is a decision. FiveTwoNine's About page
   leaves 60% of the screen empty on purpose and it reads as total confidence.
5. **Numbers.** They use four bare figures as proof. We have real numbers and
   use them once, in the hero strip, then never again.

---

## 3. What FiveTwoNine does better — the principles

- **A worldview before an offer.** The About page opens: *"Brands have
  agencies. Platforms have infrastructure. But the creators driving it all?
  They've been doing it alone."* Problem, in parallel construction, with a
  named enemy — before a single benefit. We open with benefits.
- **One idea per screen.** Never two competing things in a viewport.
- **Repetition as identity.** Every page runs a marquee of its own name
  underneath the hero, cropped by the edges of the screen. It is confident
  enough to say the same words four times in a row.
- **Bare numbers, no chrome.** `5,000+` `30+` `65` `2 YEARS`. No cards, no
  icons, no boxes.
- **Full-bleed openings.** Every page starts with an image or a colour that
  reaches all four edges. None starts with a heading on a light page. Three of
  ours do.
- **Empty space used as a statement**, not as padding.
- **Deadlines, stated plainly.** "Applications close – September 21."
- **Colour as a page-level decision.** The About page is green. The Creator
  Fund is electric blue. Not accents — whole grounds.

---

## 4. What we should not copy

- **The hand-drawn annotation** — circles and underlines scribbled over key
  words. It is the single most identifying thing they own, and it is doing a
  specific job: making a corporate-scale operation feel personally marked-up by
  a creator. We are the opposite proposition. Borrowing it would read as
  imitation to anyone who has seen both sites.
- **Electric blue and bright green.** We have two blues with a documented
  contrast rule. Adding a third would break it.
- **All-caps grotesque headlines.** Their voice shouts. Ours is a lowercase
  serif that does not. Scale, not volume, is how we get punch.
- **Scale-bragging numbers.** They can say 5,000 members. We have 17 places
  left. Claiming size we do not have would be the fastest way to look small.
- **Their density.** They have six offerings, four content tracks, a fund, an
  awards list and a newsletter. We have one room and we should look like it.

---

## 5. Site architecture

### Current
```
/                 hero → membership prose → photo band → briefing → meeting of minds → footer
/membership       the offer, the tiles, the ask
/club             what it is            ─┐
/rooms            five formats           │ four pages, one shape,
/class-of-2026    the first cohort       │ all opening with a heading
/briefing         the newsletter        ─┘ on a photograph
/privacy /cookies /early-access
/clubhouse/*      members only (hidden from the public site)
```

### Proposed
```
/                 rebuilt scroll (see §6)
/membership       unchanged in structure, restyled to the new scale
/club             absorbs the argument — the "why" page, not the "what" page
/rooms            unchanged, restyled
/class-of-2026    gains the deadline treatment
/briefing         unchanged
```

**No new pages.** This is the important call and it goes against the usual
instinct. We have five public pages and one product. FiveTwoNine has nine pages
because they have nine products. Adding a manifesto page, a press page and a
case-study page to a club that has not held its first dinner would be
transparently thin. The work is in making five pages hit, not in making nine.

---

## 6. The new homepage flow

| # | Section | Ground | Purpose | Why here |
|---|---------|--------|---------|----------|
| 1 | **Hero** | photograph | Identity | Unchanged. It is the strongest thing on the site. |
| 2 | **The case** | warm near-black | Worldview | NEW. The argument, before any offer. Ends on the statement line at full scale. |
| 3 | **What membership is** | off-white | The offer | REWORKED from five centred paragraphs to one asymmetric editorial block. |
| 4 | **The band** | photography | Texture | Unchanged. |
| 5 | **The shape of it** | sand | Proof | NEW. Four bare numbers — including `0 stages`, which is the differentiator stated as a figure. |
| 6 | **Meeting of Minds** | off-white | Differentiation | Kept, at the new scale. Moved off sand so it does not sit on the same ground as the section above. |
| 7 | **The briefing** | off-white | Contribution | Unchanged. Just built. |
| 8 | **The way in** | warm near-black | Conversion | NEW. The page currently stops rather than closes. |

The emotional arc: *recognition* (that is my industry and it is broken) →
*conviction* (they have a point of view) → *desire* (I want to be in that room)
→ *proof* (it is real and it is small) → *urgency* (it closes when it is full).

---

## 7. New sections

Three, and only three.

- **The case** — positioning and worldview. The gap the whole site has.
- **The shape of it** — four numbers. Not scale, shape: how many cities, how
  many kinds of room, how many briefings, how many stages. The last one is the
  argument in one character.
- **The way in** — a closing moment. Right now the last thing before the footer
  is a section about a newsletter.

---

## 8. Sections to remove or merge

- **The centred five-paragraph membership block goes.** Three of its five
  paragraphs restate the positioning line in different words. It is the most
  generic thing on the site.
- **`ABOUT` in the content file should be deleted or used.** It has been dead
  for the life of the project and duplicates `/club`.

---

## 9. Visual direction

**Type.** A real scale, defined once, used deliberately:

| Role | Size | Notes |
|---|---|---|
| Statement | `clamp(46px, 9.5vw, 148px)` | Display serif, lowercase, leading 0.9, tracking −0.02em. Two or three per page, never more. |
| Section heading | `clamp(34px, 5.2vw, 76px)` | Up from a fixed 48px. |
| Standfirst | `clamp(21px, 2.3vw, 32px)` | Display serif. The bridge between heading and body. |
| Body | 17px / 1.7 | Unchanged. It works. |
| Eyebrow | 11px, 0.18em, uppercase | The one place caps are allowed. |

**Colour.** Nothing new. The existing tokens, used with more nerve: the warm
near-black becomes a *section ground* rather than only the ground behind
photography, so the page has dark punctuation without a new colour.

**Layout.** Left-aligned by default; centred reserved for the hero and the
closing ask, where symmetry means something. Statement type allowed to run to a
wider measure than body copy.

**Imagery.** Unchanged in direction — the brief is already good. The change is
that the page should no longer *depend* on it: every section must read as
finished with a plain ground behind it.

---

## 10. Implementation plan

1. **Type scale** in `globals.css`, as component-layer classes so utilities can
   still override them.
2. **The case** section, and the removal of the centred prose block.
3. **The shape of it** and **The way in**.
4. **Ground rhythm** across the homepage.
5. **Apply the scale** to the four interior pages so they do not read as a
   different site.
6. **Mobile**: the statement scale is viewport-proportional, so it shrinks
   correctly; the two-column sections stack; check every one.

Motion stays as it is. `fwd-reveal` is a scroll-linked CSS animation with no
JavaScript and a correct reduced-motion fallback, which is better engineering
than most of what is on the reference site. The one addition worth making is
that the statement lines should reveal slightly later than the body around
them, so the big moments land as moments.
