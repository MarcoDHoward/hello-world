// Builds the Velvet door hanger: print PDF with bleed, dieline, and PNG previews.
const { chromium } = require('playwright');
const QR = require('qrcode');
const fs = require('fs'); const path = require('path');
const HERE = __dirname;
const OUT = process.argv[2] || HERE;
const FONTS = process.env.FONTS_DIR || path.join(HERE, '..', 'fonts');
const PLAYLIST = 'https://open.spotify.com/playlist/05E3aW2udS3IXicE0ZTia8';

// ---- fonts: local TTFs when present, Google Fonts otherwise -------------
function fontCss() {
  if (!fs.existsSync(FONTS)) return `<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@300;400&family=Cormorant+Garamond:ital,wght@1,500&family=Michroma&display=swap" rel="stylesheet">`;
  const spec = fs.existsSync(path.join(FONTS, 'spec.css')) ? fs.readFileSync(path.join(FONTS, 'spec.css'), 'utf8') : '';
  const w300 = (spec.match(/font-weight: 300;[\s\S]*?url\((https:[^)]+)\)/) || [])[1];
  const files = fs.readdirSync(FONTS);
  const pick = (re) => files.find(f => re.test(f));
  const archivo300 = w300 ? files.find(f => w300.endsWith(f.replace(/^Archivo-/, ''))) : null;
  const archivo400 = files.find(f => /^Archivo-/.test(f) && f !== archivo300);
  const face = (fam, file, extra = '') => file ? `@font-face{font-family:'${fam}';src:url('file://${path.join(FONTS, file)}') format('truetype');${extra}}` : '';
  return `<style>
    ${face('Michroma', pick(/^Michroma/))}
    ${face('Cormorant Garamond', pick(/^Cormorant/), 'font-style:italic;font-weight:500;')}
    ${face('Archivo', archivo300, 'font-weight:300;')}
    ${face('Archivo', archivo400, 'font-weight:400;')}
  </style>`;
}

// ---- the mark, same geometry as the site's inline SVG --------------------
const BARS = [[95,370,80],[178,330,120],[261,275,175],[344,190,260],[427,235,215],[510,120,330],[593,25,425],[676,120,330],[759,215,235],[842,160,290],[925,265,185],[1008,325,125],[1091,370,80]];
const ROWS = [[481,1,BARS.map(b=>b[0])],[521,.78,BARS.slice(1,12).map(b=>b[0])],[561,.58,BARS.slice(2,11).map(b=>b[0])],[598,.42,[344,510,593,676,842]],[636,.28,[510,593,676]],[676,.18,[593]]];
function mark() {
  const bars = BARS.map(([x,y,h],i)=>`<rect x="${x}" y="${y}" width="46" height="${h}" rx="23" fill="${i===6?'var(--amber)':'var(--cream)'}"/>`).join('');
  const rows = ROWS.map(([y,op,xs])=>`<g opacity="${op}">${xs.map(x=>`<rect x="${x}" y="${y}" width="46" height="18" rx="9" fill="${x===593?'var(--amber)':'var(--reflect)'}" ${x===593?'opacity=".55"':''}/>`).join('')}</g>`).join('');
  return `<svg class="mark" viewBox="80 0 1070 720" aria-hidden="true">${bars}${rows}</svg>`;
}

// ---- QR: high error correction so the M badge in the centre is safe ------
function qr(url) {
  const q = QR.create(url, { errorCorrectionLevel: 'H' });
  const n = q.modules.size, d = q.modules.data; let p = '';
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (d[y * n + x]) p += `M${x} ${y}h1v1h-1z`;
  return { n, path: p };
}
const Q = qr(PLAYLIST);
const badge = 9; // modules covered by the M badge, centred (81 of 1681 modules, well under the 30% budget)
const b0 = (Q.n - badge) / 2;

function page(side, opts) {
  const { bleed, dieline } = opts;
  const front = `
    <div class="top">${mark()}<div class="word">MIRAGE</div></div>
    <div class="mid">
      <div class="series">Velvet</div>
      <div class="tagline">Come in closer.</div>
    </div>
    <div class="offer">
      <div class="offer__big">10% off</div>
      <div class="offer__how">At the door. Bring this.</div>
    </div>
    <div class="listen">
      <div class="label">Listen</div>
      <div class="qr"><svg viewBox="0 0 ${Q.n} ${Q.n}" shape-rendering="crispEdges" aria-label="QR code to the MIRAGE playlist on Spotify"><path d="${Q.path}" fill="var(--bg)"/><rect x="${b0}" y="${b0}" width="${badge}" height="${badge}" rx="1.2" fill="var(--cream)"/><text x="${Q.n/2}" y="${Q.n/2}" text-anchor="middle" dominant-baseline="central" font-family="Michroma" font-size="${badge*0.62}" fill="var(--bg)">M</text></svg></div>
      <div class="listen__copy">What we play.</div>
    </div>
    <div class="handle">@mirage.seattle</div>`;
  const back = `
    <div class="top">${mark()}<div class="word">MIRAGE</div></div>
    <div class="mid mid--back">
      <div class="series">Velvet</div>
      <div class="tagline">Come in closer.</div>
    </div>
    <div class="back-meta">
      <div class="label">The Revelry Room</div>
      <div class="label label--dim">Trip hop · Progressive</div>
    </div>
    <div class="handle">@mirage.seattle</div>`;
  return `<section class="hanger ${side}" style="--bleed:${bleed}in">
    <div class="face">${side === 'front' ? front : back}</div>
    ${dieline ? `<div class="die"><div class="die__trim"></div><div class="die__safe"></div><div class="die__hole"></div><div class="die__slit"></div></div>` : ''}
  </section>`;
}

function html(opts) {
  const sides = opts.sides || ['front', 'back'];
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>MIRAGE Velvet door hanger</title>
  ${fontCss()}
  <style>
    :root { --bg:#0E070B; --deep:#22101A; --wine:#4A1A28; --rose:#C98B7A; --amber:#E3A45A; --cream:#EDE3D6; --reflect:#7A4C4A; }
    @page { size: calc(3.5in + 2 * ${opts.bleed}in) calc(8.5in + 2 * ${opts.bleed}in); margin: 0; }
    html, body { margin: 0; background: ${opts.dieline ? '#fff' : 'var(--bg)'}; font-synthesis: none; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .hanger { position: relative; width: calc(3.5in + 2 * var(--bleed)); height: calc(8.5in + 2 * var(--bleed)); overflow: hidden; page-break-after: always; break-after: page;
      background: radial-gradient(70% 55% at 85% 0%, var(--deep) 0%, rgba(34,16,26,0) 70%), var(--bg); color: var(--cream); }
    .hanger:last-child { page-break-after: auto; break-after: auto; }
    /* everything sits inside the trim; the hole zone at the top stays clear */
    .face { position: absolute; inset: var(--bleed); display: flex; flex-direction: column; align-items: center; text-align: center; padding: 1.72in 0.3in 0.3in; box-sizing: border-box; }
    .top { display: flex; flex-direction: column; align-items: center; }
    .mark { width: 1.1in; height: auto; display: block; }
    .word { margin-top: 0.02in; font-family: Michroma, sans-serif; font-size: 0.155in; letter-spacing: 0.40em; padding-left: 0.40em; }
    .mid { margin-top: 0.3in; }
    .mid--back { margin-top: 1.1in; }
    .series { font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 500; font-size: 0.6in; line-height: 1; color: var(--amber); }
    .tagline { margin-top: 0.14in; font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 500; font-size: 0.27in; line-height: 1; color: var(--cream); opacity: 0.78; }
    .offer { margin-top: 0.38in; }
    .offer__big { font-family: Archivo, sans-serif; font-weight: 300; font-size: 0.5in; line-height: 1; letter-spacing: 0.02em; text-transform: uppercase; }
    .offer__how { margin-top: 0.12in; font-family: Archivo, sans-serif; font-weight: 400; font-size: 0.14in; letter-spacing: 0.16em; text-transform: uppercase; opacity: 0.78; padding-left: 0.16em; }
    .listen { margin-top: auto; padding-top: 0.3in; display: flex; flex-direction: column; align-items: center; }
    .label { font-family: Michroma, sans-serif; font-size: 0.11in; letter-spacing: 0.34em; padding-left: 0.34em; text-transform: uppercase; }
    .label--dim { opacity: 0.6; margin-top: 0.1in; }
    .qr { margin-top: 0.12in; width: 1.4in; height: 1.4in; padding: 0.11in; box-sizing: border-box; background: var(--cream); border-radius: 0.09in; }
    .qr svg { width: 100%; height: 100%; display: block; }
    .listen__copy { margin-top: 0.12in; font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 500; font-size: 0.2in; line-height: 1; opacity: 0.78; }
    .handle { margin-top: 0.2in; font-family: Michroma, sans-serif; font-size: 0.11in; letter-spacing: 0.30em; padding-left: 0.30em; text-transform: uppercase; opacity: 0.85; }
    .back-meta { margin-top: auto; margin-bottom: 0.6in; }
    /* dieline overlay: trim, safe area, 1.25in hole with a slit */
    .die { position: absolute; inset: 0; pointer-events: none; }
    .die > div { position: absolute; box-sizing: border-box; }
    .die__trim { inset: var(--bleed); border: 1px solid #FF00FF; }
    .die__safe { inset: calc(var(--bleed) + 0.125in); border: 1px dashed #00A3FF; }
    .die__hole { width: 1.25in; height: 1.25in; border-radius: 50%; border: 1px solid #FF00FF; left: calc(50% - 0.625in); top: calc(var(--bleed) + 0.25in); }
    .die__slit { width: 0; height: 0.5in; border-left: 1px solid #FF00FF; left: calc(50% + 0.442in); top: calc(var(--bleed) + 0.433in - 0.5in); transform: rotate(45deg); transform-origin: bottom; }
  </style></head><body>${sides.map(s => page(s, opts)).join('')}</body></html>`;
}

(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const p = await b.newPage({ viewport: { width: 400, height: 900 }, deviceScaleFactor: 300 / 96 });
  const write = (name, s) => { fs.writeFileSync(path.join(OUT, name), s); return 'file://' + path.join(OUT, name); };
  // 1. print PDF: front and back with 0.125in bleed
  await p.goto(write('velvet-door-hanger.html', html({ bleed: 0.125 })));
  await p.evaluate(() => document.fonts.ready);
  await p.pdf({ path: path.join(OUT, 'velvet-door-hanger-print.pdf'), width: '3.75in', height: '8.75in', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  // 2. dieline PDF: front with the cut lines over it
  await p.goto(write('velvet-door-hanger-dieline.html', html({ bleed: 0.125, dieline: true, sides: ['front'] })));
  await p.evaluate(() => document.fonts.ready);
  await p.pdf({ path: path.join(OUT, 'velvet-door-hanger-dieline.pdf'), width: '3.75in', height: '8.75in', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  await p.locator('.hanger').screenshot({ path: path.join(OUT, 'velvet-door-hanger-dieline.png') });
  // 3. PNG previews at 300dpi, trimmed
  for (const side of ['front', 'back']) {
    await p.goto(write(`_preview-${side}.html`, html({ bleed: 0, sides: [side] })));
    await p.evaluate(() => document.fonts.ready);
    await p.locator('.hanger').screenshot({ path: path.join(OUT, `velvet-door-hanger-${side}.png`) });
    fs.unlinkSync(path.join(OUT, `_preview-${side}.html`));
  }
  await b.close();
  for (const f of fs.readdirSync(OUT)) if (/^velvet-door-hanger/.test(f)) console.log(f, fs.statSync(path.join(OUT, f)).size);
})();
