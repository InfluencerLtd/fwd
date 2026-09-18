# Film

Two slots on the site take a short, silent, looping film. Drop the file in
here, name it in `FILM` in `src/content/site.ts`, and it replaces the poster
frame. Until then the slot shows the poster and the page looks finished.

Both are `<video muted loop playsinline>` with no controls, so they are texture
rather than something anybody is asked to watch. Nothing is fetched until the
slot is nearly on screen, and a visitor who has asked for reduced motion sees
the poster instead. See `src/components/silent-loop.tsx`.

| File | Where | Shape | Length |
|---|---|---|---|
| `room.mp4` | Home, straight after "That is what Forward is for." | 9:16 vertical, 1080x1920 | 8 to 12 seconds |
| `reel.mp4` | /membership, beside "There is no fixed program" | 9:16 vertical, 1080x1920 | 8 to 12 seconds |

## What to shoot

The same direction as the photography: warm, low light, shallow focus, close
crops. Hands, glasses, gestures, a room mid-conversation. Nobody performing for
the camera and nobody introducing themselves.

No cuts, or one at most. These loop, so the last frame wants to sit close to
the first — a slow push in, or a held shot with movement inside the frame,
beats a sequence.

Nothing in it should need sound to make sense, because there is none.

## How to export

- H.264 MP4, yuv420p, about 3 Mb/s. **Keep each file under 3MB.**
- Both are 9:16. Shoot vertical rather than cropping a landscape frame down.
- No audio track at all, rather than a silent one.
- `-movflags +faststart` so it can begin before it has finished arriving.
- Export a poster frame at the same aspect and put it in
  `public/photography/` as `film-room.jpg` / `film-reel.jpg`, replacing the
  stills standing in there now.

    ffmpeg -i source.mov -an -vf "scale=1080:1920" -c:v libx264 -crf 23 \
      -preset slow -pix_fmt yuv420p -movflags +faststart room.mp4

  (`scale=1080:1920` for both, since both are vertical.)

## Safe areas

Both sit in a rounded box with nothing written over them — one centred on the
home page, one beside the copy on the membership page — so the whole frame is
usable. Keep the subject clear of the outer 8% on every side anyway: the box
is a different width on a phone than on a laptop, and the corners are rounded.
