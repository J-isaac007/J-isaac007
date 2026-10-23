// Builds assets/banner-dark.svg and assets/banner-light.svg for the profile README.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const out = process.argv[2];
mkdirSync(out, { recursive: true });

const palette = { blue: "#5b8cff", pink: "#ff6b8b", gold: "#ffd166", green: "#4ade80" };
const themes = {
  dark: { bg: "#16171d", text: "#f4f5f8", muted: "#a3a8b8", faint: "#f4f5f8" },
  light: { bg: "#f4f5f8", text: "#16171d", muted: "#5a5f6e", faint: "#16171d" },
};

// Raster "R", 6 x 7, drawn one pixel at a time.
const glyph = ["#####.", "#....#", "#....#", "#####.", "#..#..", "#...#.", "#....#"];
const rowColor = ["blue", "blue", "pink", "pink", "gold", "gold", "green"];
const cols = 10, rows = 9, pitch = 20, cell = 16, gx = 652, gy = 30;

function mosaic() {
  const faint = [], lit = [];
  let order = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = gx + c * pitch, y = gy + r * pitch;
      const gr = r - 1, gc = c - 2;
      const on = glyph[gr]?.[gc] === "#";
      faint.push(`<rect class="cell" x="${x}" y="${y}" width="${cell}" height="${cell}" rx="2"/>`);
      if (on) {
        const delay = (order++ * 0.07).toFixed(2);
        lit.push(
          `<rect class="px" style="animation-delay:${delay}s" x="${x}" y="${y}" width="${cell}" height="${cell}" rx="2" fill="${palette[rowColor[gr]]}"/>`,
        );
      }
    }
  }
  return `<g class="mosaic">${faint.join("")}${lit.join("")}</g>`;
}

function svg(t) {
  const strip = Object.values(palette)
    .map((c, i) => `<rect x="${48 + i * 18}" y="187" width="12" height="12" rx="2" fill="${c}"/>`)
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 240" role="img" aria-labelledby="t d">
<title id="t">John Isaac Escal</title>
<desc id="d">Software developer building desktop apps, APIs and open source. Now shipping Raster v0.5.0.</desc>
<style>
  .name { font: 700 52px "Segoe UI", Inter, Helvetica, Arial, sans-serif; fill: ${t.text}; }
  .sub { font: 400 20px "Segoe UI", Inter, Helvetica, Arial, sans-serif; fill: ${t.muted}; }
  .mono { font: 500 14px "JetBrains Mono", Consolas, "Courier New", monospace; fill: ${t.muted}; }
  .cell { fill: ${t.faint}; opacity: .06; }
  .px { opacity: 0; animation: draw 7s steps(1, end) infinite; }
  .caret { fill: ${palette.pink}; animation: blink 1.1s steps(1, end) infinite; }
  @keyframes draw { 0% { opacity: 0 } 4% { opacity: 1 } 88% { opacity: 1 } 94% { opacity: 0 } }
  @keyframes blink { 50% { fill: transparent } }
  /* Narrow screens: drop the mosaic, grow the text so it stays readable. */
  @media (max-width: 560px) {
    .mosaic { display: none; }
    .name { font-size: 78px; }
    .sub { font-size: 32px; }
    .mono { font-size: 24px; }
    .strip { display: none; }
    .now { transform: translateX(-84px); }
  }
  @media (prefers-reduced-motion: reduce) {
    .px { animation: none; opacity: 1; }
    .caret { animation: none; }
  }
</style>
<rect width="900" height="240" rx="16" fill="${t.bg}"/>
<text class="name" x="48" y="112">John Isaac Escal</text>
<text class="sub" x="48" y="156">Desktop apps · APIs · Open source<tspan class="caret"> ▌</tspan></text>
<g class="strip">${strip}</g>
<text class="mono now" x="132" y="198">now shipping raster v0.5.0</text>
${mosaic()}
</svg>
`;
}

for (const [name, t] of Object.entries(themes)) writeFileSync(join(out, `banner-${name}.svg`), svg(t));
console.log("wrote", out);
