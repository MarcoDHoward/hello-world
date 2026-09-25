# MIRAGE — brand reference

Seattle electronic music event brand. Parent brand with two series.

**Design rules live in [`DESIGN.md`](DESIGN.md)** (tokens, type,
layout, backgrounds, logo usage, motion). **Writing rules live in
[`COPY.md`](COPY.md)** (voice, naming, templates per channel). **Files live in
[`brandassets/`](brandassets/README.md).** Logos, flyer
templates, `tokens.css` and a `manifest.json` that lists every asset with
its size, colourway and use. Look there for anything visual; this file
holds the rules.

One-liner: **Melodic techno and progressive house in Seattle.**

## Positioning

Mirage is deep, melodic and fun, for people who listen. Two rooms, one
arc: the night moves from trip hop and ambient toward the dance floor,
then locks in.

Internal reference, never public copy: think of a two-disc mix.

- **Velvet is disc one.** Trip hop, ambient, downtempo into progressive.
  It takes you right up to the edge of the dance floor and holds you
  there. Warm, close, unhurried.
- **Nocturne is disc two.** Progressive into techno, deep. The floor is
  locked in. Darker, longer, no way out until 4.

Both are deep and dark, and both must feel sexy and alluring. Never
cold, never clinical, never aggressive. The darkness is an invitation,
not a threat. Allure comes from restraint and closeness, from low light
and a good sound system, from being let in. It never comes from saying
the word.

## Series

| | VELVET | NOCTURNE |
|---|---|---|
| Venue | The Revelry Room | Monkey Loft |
| Time | 9:00PM – 1:00AM | 10:00PM – 4:00AM |
| Sound | Trip hop into progressive | Progressive into techno |
| Tagline | Come in closer. | Into the night. |

## Palettes

**Parent / neutral**
- bg `#0A0D12`
- text `#E4EAF0`
- bar `#E4EAF0`, accent `#9FB4C4`, reflection `#6F8698`

**Velvet**
- bg `#0E070B`
- wine `#4A1A28`
- rose `#C98B7A`
- amber `#E3A45A` (accent)
- cream `#EDE3D6` (text)

**Nocturne**
- bg `#05080E`
- navy `#15304A`
- violet `#6A5AE0`
- cyan `#4FD8DC` (accent)
- ice `#E4EAF0` (text)

Rule: dark backgrounds only. One accent color per piece.

## Type (all Google Fonts)

- **Michroma** — brand wordmark, nav, labels, times, series name
  (Nocturne). Single weight only — never synthesize bold.
  Wide letter-spacing (0.28–0.40em) on all caps labels.
- **Archivo Black** — headliner names and the date numeral. Nothing else.
- **Archivo 300** — support acts and openers. **Archivo 400** — body,
  label credits.
- **Cormorant Garamond italic** — Velvet series name and accents only.

## Logo files

All in `brandassets/logos/`. Full index with sizes in
`brandassets/manifest.json`.

| File | Use |
|---|---|
| `mirage-logo-stacked.png` | primary; mark over wordmark |
| `mirage-logo-horizontal.png` | nav bars, headers, banners |
| `mirage-icon-neutral.png` | Instagram profile, favicon |
| `mirage-icon-velvet.png` | Velvet colorway, square |
| `mirage-icon-nocturne.png` | Nocturne colorway, square |

Animated versions of the icon, SVG and MP4 per colorway, are in
`brandassets/motion/`. Still to add: SVG versions of the static logos
and `mirage-mark.svg` (mark alone, no wordmark).

The mark is an **audio waveform with a shimmering reflection below** —
a mirage of sound on water. The center bar is the accent color.

SVGs use plain hex fills plus CSS classes, so they render correctly
standalone AND can be recolored when inlined in HTML:

```css
.bar     { fill: var(--bar); }
.reflect { fill: var(--reflect); }
.accent  { fill: var(--accent); }
.word    { fill: var(--word); }
```

Minimum size: below ~32px the reflection merges — use the mark alone.
The wordmark is illegible below ~90px; use `mirage-mark.svg` there.

## Flyer layout (for reference)

Templates for both series are in `brandassets/flyers/`.

4:5 portrait, 1080×1350. Three-part header row aligned to the same
top edge: date top-left, venue centered, logo lockup top-right.
Lineup block starts ~30% down, left-aligned at an 11% margin:
series name, headliner (heavy), label credits tucked tight beneath,
then a large gap, support pair, gap, opener. Centered footer in
spaced Michroma caps. Large empty fields above and below the block.

## Voice

Few words. No hype, no exclamation points, no emoji. Invite, don't
advertise. "Nocturne 004. Monkey Loft. Doors at 10." not "Don't miss
out!!" The full rules and templates are in `COPY.md`.
