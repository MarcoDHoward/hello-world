# MIRAGE brand assets

Everything visual for MIRAGE lives here. Design rules are in
[`../DESIGN.md`](../DESIGN.md) and brand facts in
[`../brand.md`](../brand.md). This folder holds the files.

```
brandassets/
  README.md        this index
  manifest.json    machine-readable list of every asset, palette and font
  tokens.css       colours and type as CSS custom properties
  logos/           lockups and icons
  flyers/          flyer templates, one per series
  tent-cards/      Revelry Room table tent cards, print files and design source
  motion/          animated icon, as SVG for the web and MP4 for social
  door-hangers/    Velvet door hangers, print files, dieline and source
```

For a design tool or an agent: read `manifest.json` first. It lists every
file with its size, colourway and intended use, the palettes with hex
values, the Google Fonts URL, and the flyer layout in words. `tokens.css`
carries the same colours as variables, ready to paste into a stylesheet.

## Logos

| File | Size | Use |
|---|---|---|
| `logos/mirage-logo-stacked.png` | 1200×965, transparent | Primary. Mark over wordmark. |
| `logos/mirage-logo-horizontal.png` | 1200×269, transparent | Nav bars, headers, banners. |
| `logos/mirage-icon-neutral.png` | 1080×1080 | Instagram profile, favicon. |
| `logos/mirage-icon-velvet.png` | 1080×1080 | Velvet colourway square. |
| `logos/mirage-icon-nocturne.png` | 1080×1080 | Nocturne colourway square. |

The mark is a waveform with a reflection of dashes below. The centre bar
is the accent colour. Below about 32px the reflection merges, so use the
mark without it. The wordmark is illegible below about 90px.

Not here yet: the SVG versions of the static logos. `manifest.json`
lists them under `missing`. When they arrive, drop them in `logos/` and
add a row to the manifest.

## Flyers

| File | Series | Notes |
|---|---|---|
| `flyers/velvet-flyer-template.jpg` | Velvet | Amber shimmer column. Series name in Cormorant italic. |
| `flyers/nocturne-flyer-template.jpg` | Nocturne | Navy light trails. Series name in Michroma. |

Both are 1080×1350 with placeholder names. Use them as the layout
reference for new flyers. The grid is described in `brand.md` and in the
`flyerLayout` block of `manifest.json`.

Finished flyers for real events also go in `flyers/`, named
`<series>-<yyyy-mm-dd>.jpg`, and are referenced from the site's
`data/events.js`.

## Tent cards

Foldable table tents for The Revelry Room, in the Velvet colourway. Each
face reads MIRAGE, Velvet, "Come in closer." and a QR code to
instagram.com/mirage.seattle.

| File | Use |
|---|---|
| `tent-cards/revelry-room-tent-sheet.pdf` | Print this. 4×12 in, fold in half at the dashed line. |
| `tent-cards/revelry-room-tent-sheet.png` | Same sheet as a 300 dpi image, 1200×3600. |
| `tent-cards/revelry-room-tent-face.png` | One face, 4×6 in at 300 dpi, for previews or a single-sided card. |
| `tent-cards/source/` | Editable design source for the Claude Design canvas. |

Print on heavy stock. The QR sits on cream so it scans in low light. To
change the handle, edit the canvas and re-export, or ask for a rebuild.

## Door hangers

Velvet door hangers, 3.5×8.5 in. The front carries the brand, the series,
the tagline, a 10% off line and a QR code to the MIRAGE playlist on
Spotify. The back is the brand, the series, the tagline, the venue and
the handle, so the hanger reads either way round.

| File | Use |
|---|---|
| `door-hangers/velvet-door-hanger-print.pdf` | Print this. Two pages, front and back, 0.125 in bleed included. |
| `door-hangers/velvet-door-hanger-dieline.pdf` | The cut guide. 1.25 in hole with a slit to the top edge. Send it with the print file. |
| `door-hangers/velvet-door-hanger-front.png`, `-back.png` | 300 dpi previews, trimmed. |
| `door-hangers/source/` | `build.js` and the HTML template. Change the offer, the handle or the playlist there and rebuild. |

Heavy stock, 14pt or up. The QR sits on cream so it scans in low
light; keep it at least 1.25 in wide if the layout changes.

## Motion

The animated icon. The bars rise from the waterline, centre first, the
reflection settles a beat later, the wordmark fades in, then the whole
mark shimmers slowly for as long as it is on screen. Timings follow
section 6 of `DESIGN.md`.

| File | Use |
|---|---|
| `motion/mirage-icon-animated-{neutral,velvet,nocturne}.svg` | Web. One file each, nothing external: the animation is CSS inside the SVG and the wordmark is outlined, so it plays from an `<img>` tag or inline. Sits still when the viewer has reduced motion on. |
| `motion/mirage-icon-animated-{neutral,velvet,nocturne}.mp4` | Instagram posts, reels, stories, or anywhere that takes video. 1080×1080, 8 seconds, H.264, 30 fps. |

The static icons in `logos/` are the rest frame of the same file. To
change the animation, edit `motion/source/gen-icon.js` and re-render;
`motion/source/README.md` has the steps.

## Colour and type

See `tokens.css` for the variables and `brand.md` for the rules. In short:
dark backgrounds only, one accent per piece, Michroma never bold,
Archivo Black only for headliner names and the date numeral, Cormorant
italic only for Velvet.
