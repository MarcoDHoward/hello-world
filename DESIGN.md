# MIRAGE — design guide

Reference for generating any Mirage asset: flyers, stories, social
graphics, web pages, decks. Read this before creating visuals.

Companion file: `brand.md` (brand facts, series details, voice).
Files: `brandassets/` (logos, flyer templates, `tokens.css`, `manifest.json`).

---

## 1. Design tokens

```css
:root {
  /* parent / neutral */
  --mirage-bg:        #0A0D12;
  --mirage-text:      #E4EAF0;
  --mirage-bar:       #E4EAF0;
  --mirage-accent:    #9FB4C4;
  --mirage-reflect:   #6F8698;

  /* velvet — the speakeasy */
  --velvet-bg:        #0E070B;
  --velvet-deep:      #22101A;
  --velvet-wine:      #4A1A28;
  --velvet-rose:      #C98B7A;
  --velvet-amber:     #E3A45A;   /* accent */
  --velvet-cream:     #EDE3D6;   /* text */

  /* nocturne — the loft */
  --nocturne-bg:      #05080E;
  --nocturne-navy:    #15304A;
  --nocturne-violet:  #6A5AE0;
  --nocturne-cyan:    #4FD8DC;   /* accent */
  --nocturne-ice:     #E4EAF0;   /* text */
}
```

**Color rules**
- Backgrounds are always dark. There is no light mode.
- One accent per piece. The accent appears on the series name, the
  logo's center bar, and at most one other element.
- Never mix the Velvet and Nocturne accents in the same asset.
- Mid-tones (wine, navy, violet) are for backgrounds only, never type.
- Body text sits at 70–80% opacity of the text color; never below.

---

## 2. Typography

| Role | Face | Weight | Tracking | Case |
|---|---|---|---|---|
| Wordmark, labels, times, venue | Michroma | 400 only | 0.28–0.40em | UPPER |
| Headliner name, date numeral | Archivo Black | 400 | 0.01em | UPPER |
| Support acts, openers | Archivo | 300 | 0.05em | UPPER |
| Label credits, body | Archivo | 400 | 0.16em | UPPER / sentence |
| Velvet series name, Velvet accents | Cormorant Garamond | 500 italic | 0 | Title |

All four are free on Google Fonts.

**Type rules**
- Michroma has ONE weight. Never synthesize bold or italic on it.
- Archivo Black is reserved for the headliner and the date numeral.
  Nothing else on a flyer gets that weight.
- Every all-caps Michroma line needs `padding-left` equal to its
  letter-spacing, to re-center it after the trailing space.
- Only Velvet uses the serif. Nocturne is Michroma throughout.
- Three type sizes maximum per asset, plus the label-credit size.

---

## 3. Layout system

### Flyer — 4:5 portrait, 1080×1350 (primary format)

Sizes below are in `cqw` (percent of width) so the layout scales.

**Header row** — three parts, all sharing `top: 5.5cqw`:
- Left, at `left: 6.5cqw`: month in Michroma 1.75cqw / 0.30em
  tracking, over the day in Archivo Black 9cqw.
- Center: venue in Michroma 3.1cqw / 0.06em, then the time in
  Michroma 1.9cqw / 0.08em with `margin-top: 1.4cqw`. The venue line
  must clear the date block on the left and the logo on the right, so
  a long name (The Revelry Room) drops to 2.7cqw / 0.04em to fit the
  same slot. Never wrap it.
- Right, at `right: 6.5cqw`: logo mark at 11cqw wide, then MIRAGE in
  Michroma 1.75cqw / 0.30em, `margin-top: -0.1cqw` so it tucks into
  the mark's reflection.

The right block's height must match the date block's, so the two
corners align top and bottom. Left and right margins are equal.

**Lineup block** — `top: 30.5%`, `left: 11cqw`, `right: 7cqw`,
left-aligned:
1. Series name (Velvet: serif italic 6.4cqw; Nocturne: Michroma
   2.9cqw / 0.30em, in the accent color)
2. Headliner, Archivo Black 11.6cqw, `line-height: 1.02`
3. Label credits, Archivo 400 1.9cqw / 0.16em, tucked tight
   beneath at `margin-top: 1.4cqw`
4. Gap of `7cqw`
5. Support pair, Archivo 300 5.8cqw, `line-height: 1.26`
6. Gap of `4.6cqw`
7. Opener, Archivo 300 5.8cqw

**Footer** — `bottom: 6cqw`, centered, Michroma 2cqw / 0.28em.

**The empty space is the design.** Large open fields above and below
the lineup block are required, not optional. Never fill them.

### Other formats

| Format | Size | Notes |
|---|---|---|
| Instagram story | 1080×1920 | Same header row; move the lineup block to ~34%; keep the bottom 15% clear of the UI |
| Square post | 1080×1080 | Drop the opener tier; shrink the headliner to ~10cqw |
| Profile icon | 1080×1080 | Mark + wordmark centered, ~12% margin for the circle crop |
| Web hero | responsive | Stacked logo, one-liner, next-event CTA |

---

## 4. Backgrounds

Abstract only. Never stock photography, never literal imagery. The
concept is **a mirage: light and sound shimmering on water.**

Each background is generated, seeded so it's reproducible, and then
darkened so type stays legible.

**Velvet — candlelight on dark water.** A radial wine gradient from
the upper right, horizontal ripple lines across the full frame, then
~1500 short horizontal amber strokes clustered in a vertical column
(Gaussian spread that widens toward the bottom), like a flame's
reflection. Finish with a warm radial glow at the column's top.

**Nocturne — moonlit currents.** Broad radial pools of navy and
violet, then a flow field: ~2700 curved strokes following
`sin/cos` noise, in navy, violet, and pale steel, with ~110
cyan strokes in one region as the single bright thread. A
sine-product mask leaves parts of the frame empty so the ink reads
as liquid rather than haze.

**Both finish the same way:**
```js
// radial vignette — protects the center, darkens the edges
g = ctx.createRadialGradient(w*.5, h*.55, w*.25, w*.5, h*.55, w*.9);
g.addColorStop(0, 'rgba(BG,0)'); g.addColorStop(1, 'rgba(BG,.72)');
// top scrim — keeps the header row readable
g2 = ctx.createLinearGradient(0, 0, 0, h*.2);
g2.addColorStop(0, 'rgba(BG,.6)'); g2.addColorStop(1, 'rgba(BG,0)');
```

**Background rules**
- Use `source-over`, not `lighter`, for the bulk layers. Additive
  blending stacks overlapping strokes into a blown-out white stripe.
  Only the single accent thread may use `lighter`.
- Vary stroke lengths randomly. Uniform lengths bunch into visible
  bands.
- Leave negative space. Even coverage looks like fog, not liquid.
- Scale `lineWidth` with canvas width, or exports look different
  from previews.

---

## 5. Logo usage

| File | Use |
|---|---|
| `mirage-logo-stacked.svg` | primary; hero, flyer corner, posters |
| `mirage-logo-horizontal.svg` | nav, headers, banners, email |
| `mirage-mark.svg` | mark alone; small sizes, favicon, merch |
| `mirage-icon-{neutral,velvet,nocturne}.png` | square, on-background |
| `mirage-logo-{stacked,horizontal}-{velvet,nocturne}.svg` | series colorways |

The mark is an audio waveform with a shimmering reflection beneath —
sound as a mirage on water. The center bar is the accent color.

SVGs carry plain hex fills plus CSS classes, so they render standalone
and recolor when inlined:

```css
.bar { fill: var(--bar); } .accent { fill: var(--accent); }
.reflect { fill: var(--reflect); } .word { fill: var(--word); }
```

**Constraints**
- Clear space on all sides equal to the height of the shortest bar.
- Below ~32px the reflection merges; use `mirage-mark.svg`.
- Below ~90px the wordmark is illegible; use the mark alone.
- Never stretch, rotate, outline, add shadows, or place on a light
  background.
- Never recolor the bars to anything outside the three palettes.

---

## 6. Motion

- Logo intro: bars rise in sequence, the reflection settling a beat
  later. Slow shimmer, never an equalizer bounce.
- Duration 600–900ms, ease-out. Nothing loops faster than 4s.
- Always honor `prefers-reduced-motion: reduce`.

---

## 7. Checklist before shipping an asset

- [ ] Dark background, single accent color
- [ ] Archivo Black used only on the headliner and date
- [ ] No synthesized bold on Michroma
- [ ] Michroma caps have padding-left matching their tracking
- [ ] Header row aligned; equal left and right margins
- [ ] Large empty fields above and below the lineup block
- [ ] Type legible over the background at thumbnail size
- [ ] Logo has its clear space and is the right variant for its size
- [ ] Copy has no exclamation points, hype, or emoji
