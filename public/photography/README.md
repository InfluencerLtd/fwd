# Photography

Drop a file in here named after the slot it fills and the site picks it up.
No extension in the code: `hero`, `about`, `band-3` and so on. Both `.jpg` and
`.webp` work. A name with no file behind it falls back to the warm placeholder
gradient, which is a drifting glow — visibly a missing picture rather than a
broken one, but not something to ship.

The brief for every shot is in `IMAGERY` in `src/content/site.ts`.

## What is here (9 September 2026)

From the shared Drive folder. The evening set is 900px and the four DSC files
were 4240px originals, resized to 2400 and re-encoded at quality 82.

| File | Source | Where it appears |
|---|---|---|
| `hero` | earlier | home page hero, holding page |
| `about` | DSC01100 | /about opening — the long table, guests gathering |
| `membership` | DSC01119 | /membership opening — the dinner in progress |
| `rooms` | DSC01068 | /rooms letterbox — standing conversation |
| `closing` | DSC01064 | home page close — the place setting |
| `rooms-close` | DSC01119 again | /rooms close |
| `briefing` | DSC01100 again | /briefing close |
| `meeting-of-minds` | earlier | the square tile on the home page |
| `band-1` | 4F0A0955 | the drifting band — the "Briefings" tile |
| `band-2` | influencer-tiktok-dinner108, cropped to the standing figure | the drifting band — the "Roundtables" tile |
| `band-3` | the evening set | the drifting band |
| `band-4` | influencer-tiktok-dinner120, cropped to the pass | the drifting band — the "Dinners" tile |
| `band-5`, `band-6` | the evening set | the drifting band |
| `band-7`, `band-8` | portrait crops of DSC01064 and DSC01068 | the drifting band |

## Still missing

**The thirteen `benefit-*` tiles** on the membership page. They render as
placeholders until there are photographs for them. Names are `benefit-` plus
the card id in `MEMBERSHIP.cards` — `benefit-seats`, `benefit-guest-passes` and
so on.

**Two of the closes are reusing a photograph** that is already doing another
job. They sit under a heavy mask so it is not obvious, but it is a reuse and
it should be replaced.

**Four files could not be fetched.** `MON03990`, `MON04225`, `MON04274` and
`MON04363` in the Drive folder are between 10.7MB and 15.1MB, and the Drive
connector will not download anything over 10MB. Export them at a smaller size,
or drop them in here by hand.

## What was deliberately left out

Five frames from the daytime set: the two of somebody speaking into a
microphone, the posed group against the red wall, the posed portrait with a
drink, and the branded booth.

They are good photographs of a different thing. The site argues in several
places that this is precisely what Forward is not — "0 stages" in the home
page figures, "nobody is presenting at anybody", "no panel and no lectern" —
and photographs win an argument against copy every time. They are also shot
against Influencer's red, which is not this brand's palette.
