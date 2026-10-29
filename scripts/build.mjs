// Builds the profile SVGs into assets/: banner and project cards, light and dark.
// Run: node scripts/build.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "assets");
mkdirSync(out, { recursive: true });

// Matches GitHub's own surfaces so the cards sit flush on the page.
const themes = {
  dark: {
    bg: "#0d1117", surface: "#161b22", border: "#30363d", text: "#e6edf3", muted: "#8d96a0",
    dot: "#30363d", a1: "#a78bfa", a2: "#22d3ee", glow: 0.35,
  },
  light: {
    bg: "#ffffff", surface: "#f6f8fa", border: "#d0d7de", text: "#1f2328", muted: "#59636e",
    dot: "#d0d7de", a1: "#7c3aed", a2: "#0891b2", glow: 0.18,
  },
};
const status = { live: "#3fb950", wip: "#d29922", team: "#58a6ff", release: null };

const sans = `"Segoe UI", -apple-system, BlinkMacSystemFont, Inter, Helvetica, Arial, sans-serif`;
const mono = `"JetBrains Mono", "Cascadia Code", Consolas, "SFMono-Regular", Menlo, monospace`;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

function defs(t, id) {
  return `<defs>
  <linearGradient id="${id}a" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${t.a1}"/><stop offset="1" stop-color="${t.a2}"/></linearGradient>
  <radialGradient id="${id}g1"><stop offset="0" stop-color="${t.a1}" stop-opacity="${t.glow}"/><stop offset="1" stop-color="${t.a1}" stop-opacity="0"/></radialGradient>
  <radialGradient id="${id}g2"><stop offset="0" stop-color="${t.a2}" stop-opacity="${t.glow}"/><stop offset="1" stop-color="${t.a2}" stop-opacity="0"/></radialGradient>
  <pattern id="${id}d" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.2" fill="${t.dot}"/></pattern>
</defs>`;
}

// ---------- banner ----------

const phrases = ["desktop apps", "flood alert systems", "lunar landing sims", "controller remappers"];
const terminal = [
  ["$ ", "whoami"],
  ["", "john-isaac-escal"],
  ["$ ", "ls ~/projects"],
  ["", "raster  bahalert  echo-path  flipface"],
];

function banner(t) {
  const cycle = phrases.length * 3;
  const rot = phrases
    .map(
      (p, i) =>
        `<text class="phrase${i === 0 ? " p0" : ""}" style="animation-delay:${i * 3}s" x="56" y="196"><tspan fill-opacity="0">I build </tspan><tspan fill="url(#ba)">${esc(p)}</tspan></text>`,
    )
    .join("");
  const term = terminal
    .map(
      ([pre, s], i) =>
        `<text class="tl" style="animation-delay:${0.4 + i * 0.55}s" x="622" y="${100 + i * 24}"><tspan fill="${t.a2}">${pre}</tspan>${esc(s)}</text>`,
    )
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 260" role="img" aria-labelledby="t d">
<title id="t">John Isaac Escal</title>
<desc id="d">I build desktop apps, flood alert systems, lunar landing sims and controller remappers.</desc>
${defs(t, "b")}
<style>
  .label { font: 600 13px ${mono}; letter-spacing: .18em; fill: ${t.muted}; }
  .name { font: 700 56px ${sans}; letter-spacing: -.02em; fill: ${t.text}; }
  .lead, .phrase { font: 600 26px ${sans}; letter-spacing: -.01em; }
  .lead { fill: ${t.muted}; }
  .phrase { opacity: 0; animation: swap ${cycle}s ease-in-out infinite; }
  .tl { font: 500 13px ${mono}; fill: ${t.text}; opacity: 0; animation: type .3s ease-out forwards; }
  .caret { fill: ${t.a2}; animation: blink 1s steps(1, end) infinite; }
  .drift1 { animation: drift 14s ease-in-out infinite alternate; }
  .drift2 { animation: drift 18s ease-in-out infinite alternate-reverse; }
  @keyframes swap {
    0% { opacity: 0; transform: translateY(10px); }
    4%, 21% { opacity: 1; transform: none; }
    25%, 100% { opacity: 0; transform: translateY(-10px); }
  }
  @keyframes type { to { opacity: 1; } }
  @keyframes blink { 50% { opacity: 0; } }
  @keyframes drift { to { transform: translate(-120px, 40px); } }
  /* Phones: drop the terminal and grow the text. */
  @media (max-width: 600px) {
    .term { display: none; }
    .label { font-size: 24px; transform: translateY(-22px); }
    .name { font-size: 92px; }
    .line { transform: translateY(36px); }
    .lead, .phrase { font-size: 44px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .phrase, .tl, .caret, .drift1, .drift2 { animation: none; }
    .tl { opacity: 1; }
    .p0 { opacity: 1; }
  }
</style>
<rect x=".5" y=".5" width="999" height="259" rx="20" fill="${t.surface}" stroke="${t.border}"/>
<rect x=".5" y=".5" width="999" height="259" rx="20" fill="url(#bd)" opacity=".7"/>
<g class="drift1"><circle cx="300" cy="40" r="260" fill="url(#bg1)"/></g>
<g class="drift2"><circle cx="820" cy="250" r="240" fill="url(#bg2)"/></g>
<text class="label" x="58" y="92">HI, I'M</text>
<text class="name" x="54" y="150">John Isaac Escal</text>
<g class="line">
  <text class="lead" x="56" y="196">I build</text>
  ${rot}
</g>
<g class="term">
  <rect x="600" y="52" width="352" height="160" rx="12" fill="${t.bg}" stroke="${t.border}"/>
  <circle cx="620" cy="72" r="5" fill="#ff5f57"/><circle cx="638" cy="72" r="5" fill="#febc2e"/><circle cx="656" cy="72" r="5" fill="#28c840"/>
  ${term}
  <text class="tl" style="animation-delay:2.6s" x="622" y="196"><tspan fill="${t.a2}">$ </tspan><tspan class="caret">▋</tspan></text>
</g>
</svg>
`;
}

// ---------- project cards ----------

const projects = [
  {
    slug: "raster", label: "DESKTOP APP", pill: ["v0.5.0", "release"], title: "Raster",
    desc: ["Free, offline pixel art editor for Windows.", "Layers, animation, RotSprite, sprite sheets."],
    chips: ["TypeScript", "React", "Electron"],
  },
  {
    slug: "bahalert", label: "IOT · WEB", pill: ["LIVE", "live"], title: "BahAlert",
    desc: ["Community flood monitor. ESP32 sensors feed", "a live map that routes people to safety."],
    chips: ["React", "Mapbox", "Firebase", "ESP32"],
  },
  {
    slug: "echo-path", label: "NASA SPACE APPS 2026", pill: ["TEAM", "team"], title: "Echo-Path",
    desc: ["Lunar descent contingency planner. Finds", "safe fallback sites when comms drop."],
    chips: ["Python", "Streamlit", "NumPy", "SciPy"],
  },
  {
    slug: "flipface", label: "WINDOWS · .NET 10", pill: ["WIP", "wip"], title: "FlipFace",
    desc: ["Fixes swapped face buttons by remapping any", "controller to a virtual Xbox 360 pad."],
    chips: ["C#", "SDL3", "ViGEm"],
  },
];

function card(p, t) {
  const [pillText, kind] = p.pill;
  const pc = status[kind] ?? t.a1;
  const pw = pillText.length * 6.8 + 34;
  const pulse = kind === "live" || kind === "wip";
  let x = 28;
  const chips = p.chips
    .map((c) => {
      const w = c.length * 7.4 + 22;
      const s = `<rect x="${x}" y="168" width="${w}" height="26" rx="13" fill="${t.bg}" stroke="${t.border}"/><text class="chip" x="${x + w / 2}" y="185.5" text-anchor="middle">${esc(c)}</text>`;
      x += w + 8;
      return s;
    })
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 220" role="img" aria-labelledby="t d">
<title id="t">${esc(p.title)}</title>
<desc id="d">${esc(p.desc.join(" "))} Built with ${esc(p.chips.join(", "))}.</desc>
${defs(t, "c")}
<style>
  .label { font: 600 11px ${mono}; letter-spacing: .14em; fill: ${t.muted}; }
  .title { font: 700 28px ${sans}; letter-spacing: -.015em; fill: ${t.text}; }
  .desc { font: 400 15px ${sans}; fill: ${t.muted}; }
  .chip { font: 500 12px ${mono}; fill: ${t.text}; }
  .pill { font: 700 11px ${mono}; letter-spacing: .08em; fill: ${pc}; }
  .pulse { animation: pulse 2s ease-in-out infinite; transform-origin: ${480 - 28 - pw + 14}px 37px; }
  @keyframes pulse { 50% { opacity: .25; transform: scale(1.6); } }
  @media (prefers-reduced-motion: reduce) { .pulse { animation: none; } }
</style>
<rect x=".5" y=".5" width="479" height="219" rx="16" fill="${t.surface}" stroke="${t.border}"/>
<circle cx="470" cy="10" r="170" fill="url(#cg1)"/>
<rect x="28" y="0" width="56" height="3" rx="1.5" fill="url(#ca)"/>
<text class="label" x="28" y="42">${esc(p.label)}</text>
<rect x="${480 - 28 - pw}" y="25" width="${pw}" height="24" rx="12" fill="${pc}" fill-opacity=".12" stroke="${pc}" stroke-opacity=".4"/>
${pulse ? `<circle class="pulse" cx="${480 - 28 - pw + 14}" cy="37" r="3.5" fill="${pc}"/>` : `<circle cx="${480 - 28 - pw + 14}" cy="37" r="3.5" fill="${pc}"/>`}
<text class="pill" x="${480 - 28 - pw + 24}" y="41">${esc(pillText)}</text>
<text class="title" x="28" y="90">${esc(p.title)} <tspan fill="url(#ca)" font-size="22">↗</tspan></text>
<text class="desc" x="28" y="122">${esc(p.desc[0])}</text>
<text class="desc" x="28" y="144">${esc(p.desc[1])}</text>
${chips}
</svg>
`;
}

for (const [mode, t] of Object.entries(themes)) {
  writeFileSync(join(out, `banner-${mode}.svg`), banner(t));
  for (const p of projects) writeFileSync(join(out, `${p.slug}-${mode}.svg`), card(p, t));
}
console.log(`wrote ${2 + projects.length * 2} files to ${out}`);
