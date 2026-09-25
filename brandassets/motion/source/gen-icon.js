// Generates the animated MIRAGE icon SVGs, one per colourway.
const opentype = require('opentype.js');
const fs = require('fs');
const path = require('path');

const OUT = process.argv[2] || '.';
const font = opentype.loadSync(path.join(__dirname, 'michroma.ttf'));

// Geometry from the site's inline mark (viewBox 1230x720), scaled into the
// 1080 square the way mirage-icon-neutral.png is laid out: mark 850 wide,
// baseline at y=530, wordmark caps at y 840..895.
const BARS = [[95,370,80],[178,330,120],[261,275,175],[344,190,260],[427,235,215],[510,120,330],[593,25,425],[676,120,330],[759,215,235],[842,160,290],[925,265,185],[1008,325,125],[1091,370,80]];
const ROWS = [
  { y: 481, op: 1,    xs: BARS.map(b => b[0]) },
  { y: 521, op: 0.78, xs: BARS.slice(1, 12).map(b => b[0]) },
  { y: 561, op: 0.58, xs: BARS.slice(2, 11).map(b => b[0]) },
  { y: 598, op: 0.42, xs: [344, 510, 593, 676, 842] },
  { y: 636, op: 0.28, xs: [510, 593, 676] },
  { y: 676, op: 0.18, xs: [593] },
];
const S = 850 / 1042;                 // scale from mark units to icon px
const OX = 125 - 95 * S, OY = 530 - 450 * S;
const r = n => Math.round(n * 100) / 100;

const COLOURWAYS = {
  neutral:  { bg: '#0A0D12', bar: '#E4EAF0', reflect: '#6F8698', accent: '#9FB4C4', word: '#E4EAF0' },
  velvet:   { bg: '#0E070B', bar: '#EDE3D6', reflect: '#7A4C4A', accent: '#E3A45A', word: '#EDE3D6' },
  nocturne: { bg: '#05080E', bar: '#E4EAF0', reflect: '#3E5B78', accent: '#4FD8DC', word: '#E4EAF0' },
};

// Wordmark: MIRAGE in Michroma, outlined, tracked, centred on x=540.
function wordmark() {
  const size = 74, tracking = 0.2 * size, baseline = 895, text = 'MIRAGE';
  const glyphs = font.stringToGlyphs(text);
  const scale = size / font.unitsPerEm;
  let advances = glyphs.map(g => g.advanceWidth * scale);
  // ink width: sum of advances plus tracking between letters (no trailing space)
  const total = advances.reduce((a, b) => a + b, 0) + tracking * (glyphs.length - 1);
  let x = 540 - total / 2;
  const d = [];
  glyphs.forEach((g, i) => {
    const p = g.getPath(x, baseline, size);
    d.push(p.toPathData(2));
    x += advances[i] + tracking;
  });
  return { d: d.join(' '), size, tracking, total };
}
const WORD = wordmark();

function bars() {
  return BARS.map(([x, y, h], i) => {
    const acc = i === 6 ? ' accent' : '';
    const k = Math.abs(i - 6); // distance from the centre bar drives the intro order
    return `    <rect class="bar${acc}" style="--k:${k};--i:${i}" x="${r(OX + x * S)}" y="${r(OY + y * S)}" width="${r(46 * S)}" height="${r(h * S)}" rx="${r(23 * S)}"/>`;
  }).join('\n');
}
function rows() {
  return ROWS.map((row, ri) => {
    const rects = row.xs.map(x => {
      const acc = x === 593 ? ' reflect--accent' : '';
      return `        <rect class="reflect${acc}" x="${r(OX + x * S)}" y="${r(OY + row.y * S)}" width="${r(46 * S)}" height="${r(18 * S)}" rx="${r(9 * S)}"/>`;
    }).join('\n');
    return `    <g class="row-in" style="--r:${ri}">\n      <g class="row" style="--r:${ri}" opacity="${row.op}">\n${rects}\n      </g>\n    </g>`;
  }).join('\n');
}

function svg(name, c) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080" role="img" aria-labelledby="t">
  <title id="t">MIRAGE. A waveform rises and its reflection settles on the water.</title>
  <style>
    :root { --bg: ${c.bg}; --bar: ${c.bar}; --reflect: ${c.reflect}; --accent: ${c.accent}; --word: ${c.word}; }
    .bg { fill: var(--bg); }
    .bar { fill: var(--bar); }
    .reflect { fill: var(--reflect); }
    .accent { fill: var(--accent); }
    .reflect--accent { fill: var(--accent); opacity: 0.55; }
    .word { fill: var(--word); }

    /* Intro: bars rise from the waterline, centre first, ease-out. */
    .bar {
      transform-box: fill-box;
      transform-origin: center bottom;
      animation:
        rise 700ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--k) * 60ms) both,
        shimmer 8s ease-in-out calc(1400ms + var(--i) * 150ms) infinite;
    }
    /* The reflection settles a beat later, row by row, top down. */
    .row-in {
      animation: settle 900ms ease-out calc(520ms + var(--r) * 90ms) both;
    }
    .row {
      animation: drift 6s ease-in-out calc(1800ms + var(--r) * 400ms) infinite;
    }
    .word {
      animation: fade 800ms ease-out 950ms both;
    }

    @keyframes rise    { from { transform: scaleY(0); opacity: 0; } 40% { opacity: 1; } to { transform: scaleY(1); opacity: 1; } }
    @keyframes settle  { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
    @keyframes fade    { from { opacity: 0; } to { opacity: 1; } }
    /* Slow shimmer, never a bounce. Starts and ends at rest so the loop has no seam. */
    @keyframes shimmer { 0%, 100% { opacity: 1; transform: scaleY(1); } 50% { opacity: 0.78; transform: scaleY(0.965); } }
    @keyframes drift   { 0%, 100% { transform: translateX(0); filter: brightness(1); } 50% { transform: translateX(5px); filter: brightness(0.75); } }

    @media (prefers-reduced-motion: reduce) {
      .bar, .row-in, .row, .word { animation: none; }
    }
  </style>
  <rect class="bg" width="1080" height="1080"/>
  <g class="wave">
${bars()}
  </g>
  <g class="reflection" aria-hidden="true">
${rows()}
  </g>
  <path class="word" d="${WORD.d}"/>
</svg>
`;
}

for (const [name, c] of Object.entries(COLOURWAYS)) {
  const file = path.join(OUT, `mirage-icon-animated-${name}.svg`);
  fs.writeFileSync(file, svg(name, c));
  console.log('wrote', file, fs.statSync(file).size, 'bytes');
}
console.log('wordmark', { size: WORD.size, tracking: WORD.tracking, inkWidth: r(WORD.total) });
