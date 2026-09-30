/* Gayatri Mantra for Kids — offline PWA. No external resources. */
(function () {
'use strict';

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */
const LINES = [
  { deva: 'ॐ भूर्भुवः स्वः', roman: 'Om Bhur Bhuvah Svah',
    words: [['Om'], ['Bhur'], ['Bhu', 'vah'], ['Svah']],
    ttsEn: 'Om. Bhoor, bhoo vah, svah.',
    meaning: 'Om! The earth, the sky and the heavens – everything, everywhere.', pic: 'sunrise' },
  { deva: 'तत्सवितुर्वरेण्यं', roman: 'Tat Savitur Varenyam',
    words: [['Tat'], ['Sa', 'vi', 'tur'], ['Va', 'ren', 'yam']],
    ttsEn: 'Tut, sa vi toor, va rayn yum.',
    meaning: 'The shining Sun is so wonderful – the very best of all.', pic: 'sun' },
  { deva: 'भर्गो देवस्य धीमहि', roman: 'Bhargo Devasya Dheemahi',
    words: [['Bhar', 'go'], ['De', 'vas', 'ya'], ['Dhee', 'ma', 'hi']],
    ttsEn: 'Bhar go, day vus ya, dhee ma hi.',
    meaning: 'We sit quietly and think of its bright, holy light.', pic: 'glow' },
  { deva: 'धियो यो नः प्रचोदयात्', roman: 'Dhiyo Yo Nah Prachodayat',
    words: [['Dhi', 'yo'], ['Yo'], ['Nah'], ['Pra', 'cho', 'da', 'yat']],
    ttsEn: 'Dhi yo, yo, nah, pra cho da yaat.',
    meaning: 'May that light help our minds to be clever and kind.', pic: 'idea' }
];
LINES.forEach(L => { L.chunks = L.words.flat(); });
const OVERALL = 'We pray to the bright Sun to make our minds clever and kind.';
const REPEAT_OPTIONS = [1, 3, 11, 21];
const REC_KEYS = ['line0', 'line1', 'line2', 'line3', 'full'];
const REC_LABELS = ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Full mantra'];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
const $ = (s, el) => (el || document).querySelector(s);
const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
const app = $('#app');
const overlay = $('#overlay');
const toastEl = $('#toast');
let uidN = 0;
const uid = () => 'u' + (++uidN);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmtTime = s => { s = Math.max(0, Math.round(s || 0)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };

/* ------------------------------------------------------------------ */
/* State (localStorage)                                                */
/* ------------------------------------------------------------------ */
const STORE_KEY = 'gayatri-kids-state-v1';
const DEFAULT_STATE = { stars: 0, practised: [false, false, false, false], unlockAll: false, repeat: 3, lastNew: -1 };
function loadState() {
  try {
    const s = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
    const st = Object.assign({}, DEFAULT_STATE, s);
    if (!Array.isArray(st.practised) || st.practised.length !== 4) st.practised = [false, false, false, false];
    if (REPEAT_OPTIONS.indexOf(st.repeat) < 0) st.repeat = 3;
    return st;
  } catch (e) { return JSON.parse(JSON.stringify(DEFAULT_STATE)); }
}
let state = loadState();
function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* storage blocked */ } }
const unlocked = i => i === 0 || state.unlockAll || state.practised[i - 1];

/* ------------------------------------------------------------------ */
/* SVG art                                                             */
/* ------------------------------------------------------------------ */
function starPath(cx, cy, R, r, n) {
  n = n || 5; let d = '';
  for (let i = 0; i < n * 2; i++) {
    const a = -Math.PI / 2 + i * Math.PI / n, rad = i % 2 ? r : R;
    d += (i ? 'L' : 'M') + (cx + rad * Math.cos(a)).toFixed(1) + ' ' + (cy + rad * Math.sin(a)).toFixed(1);
  }
  return d + 'Z';
}
const ICON = {
  home: '<svg viewBox="0 0 48 48"><path d="M8 22 24 8l16 14v17a3 3 0 0 1-3 3h-8V31h-10v11h-8a3 3 0 0 1-3-3z" fill="#FF8A1F"/><rect x="20" y="31" width="8" height="11" rx="1" fill="#FFD27A"/></svg>',
  back: '<svg viewBox="0 0 48 48"><path d="M29 10 15 24l14 14" fill="none" stroke="#FF8A1F" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  play: '<svg viewBox="0 0 48 48"><path d="M16 9.5v29a2 2 0 0 0 3 1.7l23-14.5a2 2 0 0 0 0-3.4L19 7.8a2 2 0 0 0-3 1.7z" fill="currentColor"/></svg>',
  stop: '<svg viewBox="0 0 48 48"><rect x="11" y="11" width="26" height="26" rx="6" fill="currentColor"/></svg>',
  again: '<svg viewBox="0 0 48 48"><path d="M36 17a14 14 0 1 0 2 11" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"/><path d="M38 6v12H26" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  next: '<svg viewBox="0 0 48 48"><path d="M10 24h26M26 12l12 12-12 12" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  check: '<svg viewBox="0 0 48 48"><path d="M10 25l9 9 19-20" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  ear: '<svg viewBox="0 0 48 48"><path d="M8 28v-4a16 16 0 0 1 32 0v4" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><rect x="5" y="25" width="11" height="17" rx="5" fill="currentColor"/><rect x="32" y="25" width="11" height="17" rx="5" fill="currentColor"/></svg>',
  mic: '<svg viewBox="0 0 48 48"><rect x="16" y="4" width="16" height="26" rx="8" fill="currentColor"/><path d="M10 22a14 14 0 0 0 28 0" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><path d="M24 36v7M16 44h16" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg>',
  gear: '<svg viewBox="0 0 48 48"><path d="M24 15a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm17 12 4 3-4 7-5-2a17 17 0 0 1-5 3l-1 5h-8l-1-5a17 17 0 0 1-5-3l-5 2-4-7 4-3a17 17 0 0 1 0-6l-4-3 4-7 5 2a17 17 0 0 1 5-3l1-5h8l1 5a17 17 0 0 1 5 3l5-2 4 7-4 3a17 17 0 0 1 0 6z" fill="#B7794A"/></svg>',
  lock: '<svg viewBox="0 0 48 48"><rect x="9" y="21" width="30" height="22" rx="6" fill="#C9A27E"/><path d="M15 21v-6a9 9 0 0 1 18 0v6" fill="none" stroke="#C9A27E" stroke-width="5"/><circle cx="24" cy="32" r="3.5" fill="#fff"/></svg>',
  star: '<svg viewBox="0 0 48 48"><path d="' + starPath(24, 25.5, 21, 9.5) + '" fill="#FFC83D" stroke="#E8590C" stroke-width="2.5" stroke-linejoin="round"/></svg>',
  parent: '<svg viewBox="0 0 24 24"><circle cx="8" cy="7" r="3.2" fill="currentColor"/><circle cx="17" cy="9.5" r="2.4" fill="currentColor"/><path d="M2.5 20a5.5 5.5 0 0 1 11 0zM13 20a4 4 0 0 1 8 0z" fill="currentColor"/></svg>',
  recDot: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="currentColor"/></svg>',
  trash: '<svg viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  playS: '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>',
  stopS: '<svg viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor"/></svg>'
};

function handSVG(fill) {
  return '<g fill="' + fill + '" stroke="#000" stroke-opacity=".15" stroke-width="2.5" stroke-linejoin="round">' +
    '<rect x="-9.5" y="-40" width="8" height="30" rx="4"/><rect x="-1.5" y="-44" width="8" height="34" rx="4"/>' +
    '<rect x="6.5" y="-41" width="8" height="31" rx="4"/><rect x="14" y="-34" width="7.5" height="25" rx="3.75"/>' +
    '<rect x="-17" y="-14" width="9" height="26" rx="4.5" transform="rotate(-32 -8 12)"/>' +
    '<path d="M-12 -16 H21 V8 Q21 26 4 26 Q-12 26 -12 10 Z"/><path d="M-8.5 -14 H20" stroke="' + fill + '" stroke-opacity="1" stroke-width="5"/></g>';
}
function clapIcon(main, second, spark, bg) {
  return '<svg class="ic" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="' + bg + '"/>' +
    '<g transform="translate(38 60) rotate(-20) scale(.9)">' + handSVG(second) + '</g>' +
    '<g transform="translate(62 60) scale(-1 1) rotate(-20) scale(.9)">' + handSVG(main) + '</g>' +
    '<path d="M50 9v9M33 14l5 7M67 14l-5 7" stroke="' + spark + '" stroke-width="5" stroke-linecap="round"/></svg>';
}
const TILE_ICON = {
  listen: '<svg class="ic" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="rgba(255,255,255,.25)"/><path d="M22 58v-8a28 28 0 0 1 56 0v8" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round"/><rect x="15" y="52" width="20" height="30" rx="9" fill="#fff"/><rect x="65" y="52" width="20" height="30" rx="9" fill="#fff"/><path d="M44 36c3 4 3 10 0 14M52 32c5 6 5 16 0 22" fill="none" stroke="#FFF1C2" stroke-width="4" stroke-linecap="round" opacity=".9"/></svg>',
  learn: '<svg class="ic" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="rgba(255,255,255,.25)"/><path d="M50 30C40 23 26 22 16 25v48c10-3 24-2 34 5 10-7 24-8 34-5V25c-10-3-24-2-34 5z" fill="#fff"/><path d="M50 30v48" stroke="#F25581" stroke-width="4"/><path d="M24 36h18M24 46h18M24 56h14M58 36h18M58 46h18M58 56h14" stroke="#FFB3C7" stroke-width="4" stroke-linecap="round"/></svg>',
  clap: clapIcon('#fff', '#E6FFFB', '#FFF59D', 'rgba(255,255,255,.25)'),
  stars: '<svg class="ic" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="rgba(255,255,255,.25)"/><path d="' + starPath(50, 54, 38, 17) + '" fill="#FFD54A" stroke="#fff" stroke-width="5" stroke-linejoin="round"/><circle cx="41" cy="50" r="3.5" fill="#6B3FD9"/><circle cx="59" cy="50" r="3.5" fill="#6B3FD9"/><path d="M42 60q8 7 16 0" fill="none" stroke="#6B3FD9" stroke-width="3.5" stroke-linecap="round"/><path d="' + starPath(84, 18, 9, 4) + '" fill="#fff"/><path d="' + starPath(16, 24, 6, 2.6) + '" fill="#fff"/></svg>'
};

function sunFace(cx, cy, r, u, opts) {
  opts = opts || {};
  const rays = [];
  for (let i = 0; i < 12; i++) {
    rays.push('<rect x="' + (cx - r * 0.12) + '" y="' + (cy - r * 1.62) + '" width="' + (r * 0.24) + '" height="' + (r * 0.5) + '" rx="' + (r * 0.12) + '" fill="' + (i % 2 ? '#FF8A1F' : '#FFB02E') + '" transform="rotate(' + (i * 30) + ' ' + cx + ' ' + cy + ')"/>');
  }
  const k = v => (+v).toFixed(1);
  return '<defs><radialGradient id="' + u + 'f" cx="42%" cy="38%" r="70%"><stop offset="0" stop-color="#FFF6B0"/><stop offset=".65" stop-color="#FFC83D"/><stop offset="1" stop-color="#FF9F1C"/></radialGradient></defs>' +
    '<g class="' + (opts.raysClass || 'rays') + '">' + rays.join('') + '</g>' +
    '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="url(#' + u + 'f)" stroke="#FF8A1F" stroke-width="' + k(r * 0.05) + '"/>' +
    '<g class="eyes"><ellipse cx="' + k(cx - r * 0.34) + '" cy="' + k(cy - r * 0.12) + '" rx="' + k(r * 0.12) + '" ry="' + k(r * 0.17) + '" fill="#5A2D0C"/><ellipse cx="' + k(cx + r * 0.34) + '" cy="' + k(cy - r * 0.12) + '" rx="' + k(r * 0.12) + '" ry="' + k(r * 0.17) + '" fill="#5A2D0C"/>' +
    '<circle cx="' + k(cx - r * 0.3) + '" cy="' + k(cy - r * 0.19) + '" r="' + k(r * 0.045) + '" fill="#fff"/><circle cx="' + k(cx + r * 0.38) + '" cy="' + k(cy - r * 0.19) + '" r="' + k(r * 0.045) + '" fill="#fff"/></g>' +
    '<circle cx="' + k(cx - r * 0.6) + '" cy="' + k(cy + r * 0.22) + '" r="' + k(r * 0.14) + '" fill="#FF6F91" opacity=".45"/><circle cx="' + k(cx + r * 0.6) + '" cy="' + k(cy + r * 0.22) + '" r="' + k(r * 0.14) + '" fill="#FF6F91" opacity=".45"/>' +
    '<path d="M' + k(cx - r * 0.38) + ' ' + k(cy + r * 0.26) + ' Q' + cx + ' ' + k(cy + r * 0.7) + ' ' + k(cx + r * 0.38) + ' ' + k(cy + r * 0.26) + '" fill="none" stroke="#5A2D0C" stroke-width="' + k(r * 0.1) + '" stroke-linecap="round"/>';
}
function mascotSVG() {
  return '<svg class="mascot" viewBox="0 0 200 200" role="img" aria-label="Happy sun">' + sunFace(100, 100, 60, uid()) + '</svg>';
}
function cloud(x, y, s) {
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')" fill="#fff" opacity=".95"><circle cx="0" cy="0" r="14"/><circle cx="16" cy="-8" r="18"/><circle cx="34" cy="0" r="14"/><rect x="-6" y="-2" width="46" height="16" rx="8"/></g>';
}
function childHead(cx, cy, r, closed) {
  const k = v => (+v).toFixed(1);
  const eyes = closed
    ? '<path d="M' + k(cx - r * 0.5) + ' ' + k(cy + r * 0.05) + ' q' + k(r * 0.2) + ' ' + k(r * 0.16) + ' ' + k(r * 0.4) + ' 0M' + k(cx + r * 0.1) + ' ' + k(cy + r * 0.05) + ' q' + k(r * 0.2) + ' ' + k(r * 0.16) + ' ' + k(r * 0.4) + ' 0" fill="none" stroke="#3A1E0E" stroke-width="' + k(r * 0.09) + '" stroke-linecap="round"/>'
    : '<circle cx="' + k(cx - r * 0.33) + '" cy="' + k(cy + r * 0.02) + '" r="' + k(r * 0.12) + '" fill="#3A1E0E"/><circle cx="' + k(cx + r * 0.33) + '" cy="' + k(cy + r * 0.02) + '" r="' + k(r * 0.12) + '" fill="#3A1E0E"/><circle cx="' + k(cx - r * 0.29) + '" cy="' + k(cy - r * 0.03) + '" r="' + k(r * 0.04) + '" fill="#fff"/><circle cx="' + k(cx + r * 0.37) + '" cy="' + k(cy - r * 0.03) + '" r="' + k(r * 0.04) + '" fill="#fff"/>';
  return '<circle cx="' + k(cx - r * 0.98) + '" cy="' + k(cy + r * 0.1) + '" r="' + k(r * 0.2) + '" fill="#B87A4B"/><circle cx="' + k(cx + r * 0.98) + '" cy="' + k(cy + r * 0.1) + '" r="' + k(r * 0.2) + '" fill="#B87A4B"/>' +
    '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#C98B5A"/>' +
    '<path d="M' + k(cx - r) + ' ' + k(cy - r * 0.05) + ' Q' + k(cx - r * 0.95) + ' ' + k(cy - r * 1.15) + ' ' + cx + ' ' + k(cy - r * 1.08) + ' Q' + k(cx + r * 0.95) + ' ' + k(cy - r * 1.15) + ' ' + k(cx + r) + ' ' + k(cy - r * 0.05) + ' Q' + k(cx + r * 0.7) + ' ' + k(cy - r * 0.62) + ' ' + k(cx + r * 0.05) + ' ' + k(cy - r * 0.6) + ' Q' + k(cx - r * 0.6) + ' ' + k(cy - r * 0.62) + ' ' + k(cx - r) + ' ' + k(cy - r * 0.05) + 'Z" fill="#2B1A10"/>' +
    eyes +
    '<circle cx="' + k(cx - r * 0.58) + '" cy="' + k(cy + r * 0.32) + '" r="' + k(r * 0.14) + '" fill="#FF6F91" opacity=".4"/><circle cx="' + k(cx + r * 0.58) + '" cy="' + k(cy + r * 0.32) + '" r="' + k(r * 0.14) + '" fill="#FF6F91" opacity=".4"/>' +
    '<path d="M' + k(cx - r * 0.28) + ' ' + k(cy + r * 0.38) + ' Q' + cx + ' ' + k(cy + r * 0.68) + ' ' + k(cx + r * 0.28) + ' ' + k(cy + r * 0.38) + '" fill="none" stroke="#3A1E0E" stroke-width="' + k(r * 0.09) + '" stroke-linecap="round"/>';
}
function diya(x, y, s, u) {
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' +
    '<circle cx="0" cy="-26" r="22" fill="url(#' + u + 'dg)" class="pulse-glow"/>' +
    '<path class="flame" d="M0 -40 C8 -28 7 -18 0 -14 C-7 -18 -8 -28 0 -40Z" fill="#FFB020"/>' +
    '<path d="M0 -32 C4 -25 3 -19 0 -17 C-3 -19 -4 -25 0 -32Z" fill="#FFF3A0"/>' +
    '<path d="M-26 -12 Q0 -8 26 -12 Q22 8 0 10 Q-22 8 -26 -12Z" fill="#D9632B"/>' +
    '<path d="M-26 -12 Q0 -16 26 -12 Q0 -6 -26 -12Z" fill="#F08A4B"/></g>';
}
const diyaDefs = u => '<radialGradient id="' + u + 'dg"><stop offset="0" stop-color="#FFF3A0" stop-opacity=".95"/><stop offset="1" stop-color="#FFC83D" stop-opacity="0"/></radialGradient>';
const PIC_LABEL = { sunrise: 'Sun rising over the earth and sky', sun: 'Surya Dev, the shining Sun god', glow: 'Child sitting quietly in a glowing light', idea: 'Happy child with a bright idea' };

/* ------------------------------------------------------------------ */
/* Surya Dev (Sun god) — deity of the Gayatri Mantra (Savitr/Surya).   */
/* Iconography: golden crown (kirita), radiant sun-disc halo, two       */
/* pink lotuses held at shoulder height, kundala earrings, red tilak,  */
/* sacred thread, saffron-red garments. Drawn friendly for small kids. */
/* ------------------------------------------------------------------ */
function lotusFlower(x, y, s) {
  let p = '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">';
  [-52, -26, 26, 52, 0].forEach(a => {
    p += '<ellipse cx="0" cy="-11" rx="5.5" ry="12" fill="' + (a === 0 ? '#FF6F91' : '#FF9BB5') + '" stroke="#D94A73" stroke-width="1.2" transform="rotate(' + a + ' 0 2)"/>';
  });
  return p + '<path d="M-10 2 Q0 8 10 2 Q0 5 -10 2Z" fill="#3DBE55"/></g>';
}
function suryaGroup(u, opts) {
  opts = opts || {};
  const skin = '#F2A65A', skinLine = '#C9772E';
  let rays = '';
  for (let i = 0; i < 16; i++) {
    const a = i * 22.5;
    rays += '<path d="M100 2 L108 20 L92 20Z" fill="' + (i % 2 ? '#FFB02E' : '#FF8A1F') + '" transform="rotate(' + a + ' 100 86)"/>';
  }
  const arm = side => {
    const m = side < 0 ? '' : ' transform="translate(200 0) scale(-1 1)"';
    return '<g' + m + '>' +
      '<path d="M70 152 Q54 162 50 178" fill="none" stroke="' + skinLine + '" stroke-width="17" stroke-linecap="round"/>' +
      '<path d="M70 152 Q54 162 50 178" fill="none" stroke="' + skin + '" stroke-width="14" stroke-linecap="round"/>' +
      '<path d="M50 178 Q40 162 44 136" fill="none" stroke="' + skinLine + '" stroke-width="15" stroke-linecap="round"/>' +
      '<path d="M50 178 Q40 162 44 136" fill="none" stroke="' + skin + '" stroke-width="12" stroke-linecap="round"/>' +
      '<path d="M56 160 l9 -5" stroke="#FFD24A" stroke-width="5" stroke-linecap="round"/>' +
      '<path d="M41 150 l9 2" stroke="#FFD24A" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M45 132 Q43 118 44 104" fill="none" stroke="#2E9E44" stroke-width="3"/>' +
      '<circle cx="44" cy="134" r="7" fill="' + skin + '" stroke="' + skinLine + '" stroke-width="1.5"/>' +
      lotusFlower(44, 104, 1.05) + '</g>';
  };
  return '<defs>' +
      '<radialGradient id="' + u + 'halo" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#FFFBE0"/><stop offset=".55" stop-color="#FFE27A"/><stop offset="1" stop-color="#FFB030"/></radialGradient>' +
      '<linearGradient id="' + u + 'gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE680"/><stop offset="1" stop-color="#F2A900"/></linearGradient>' +
      '<linearGradient id="' + u + 'robe" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FF7A1A"/><stop offset="1" stop-color="#E0431B"/></linearGradient>' +
    '</defs>' +
    '<g class="halo-rays">' + rays + '</g>' +
    '<circle cx="100" cy="86" r="68" fill="url(#' + u + 'halo)" stroke="#FF9F1C" stroke-width="3"/>' +
    '<circle cx="100" cy="86" r="56" fill="none" stroke="#FFF3B0" stroke-width="2" opacity=".8"/>' +
    /* torso + garments */
    '<path d="M58 200 Q56 156 76 146 L124 146 Q144 156 142 200Z" fill="' + skin + '" stroke="' + skinLine + '" stroke-width="1.5"/>' +
    '<path d="M58 200 Q56 170 66 158 Q84 180 100 181 Q116 180 134 158 Q144 170 142 200Z" fill="url(#' + u + 'robe)"/>' +
    '<path d="M60 170 Q100 196 140 170" fill="none" stroke="#FFD24A" stroke-width="3" opacity=".9"/>' +
    '<path d="M68 190 H132" stroke="#FFD24A" stroke-width="4"/>' +
    '<path d="M84 148 Q98 170 122 196" fill="none" stroke="#FFF4D6" stroke-width="2.5"/>' +
    arm(-1) + arm(1) +
    /* neck, necklace */
    '<rect x="91" y="118" width="18" height="30" rx="6" fill="' + skin + '"/>' +
    '<path d="M80 146 Q100 170 120 146" fill="none" stroke="url(#' + u + 'gold)" stroke-width="6" stroke-linecap="round"/>' +
    '<circle cx="100" cy="160" r="5" fill="#E53935" stroke="#FFD24A" stroke-width="2"/>' +
    /* head */
    '<path d="M77 90 Q67 104 72 116 Q64 124 70 134 Q74 142 81 137 Q76 129 81 123 Q76 113 84 100Z" fill="#2B1A10"/>' +
    '<path d="M123 90 Q133 104 128 116 Q136 124 130 134 Q126 142 119 137 Q124 129 119 123 Q124 113 116 100Z" fill="#2B1A10"/>' +
    '<circle cx="100" cy="100" r="27" fill="' + skin + '" stroke="' + skinLine + '" stroke-width="1.5"/>' +
    '<circle cx="73" cy="104" r="5" fill="' + skin + '" stroke="' + skinLine + '" stroke-width="1.2"/><circle cx="127" cy="104" r="5" fill="' + skin + '" stroke="' + skinLine + '" stroke-width="1.2"/>' +
    '<circle cx="72" cy="115" r="5.5" fill="none" stroke="#FFD24A" stroke-width="3"/><circle cx="128" cy="115" r="5.5" fill="none" stroke="#FFD24A" stroke-width="3"/>' +
    /* crown (kirita mukuta) */
    '<path d="M68 82 Q62 70 70 62 Q74 72 80 76Z" fill="url(#' + u + 'gold)" stroke="#D08A00" stroke-width="1.5"/>' +
    '<path d="M132 82 Q138 70 130 62 Q126 72 120 76Z" fill="url(#' + u + 'gold)" stroke="#D08A00" stroke-width="1.5"/>' +
    '<path d="M77 84 L81 56 L90 50 L93 38 L100 22 L107 38 L110 50 L119 56 L123 84Z" fill="url(#' + u + 'gold)" stroke="#D08A00" stroke-width="2" stroke-linejoin="round"/>' +
    '<path d="M81 56 H119 M90 50 H110" stroke="#D08A00" stroke-width="1.6"/>' +
    '<path d="M93 38 H107" stroke="#D08A00" stroke-width="1.4"/>' +
    '<rect x="72" y="76" width="56" height="10" rx="5" fill="#FFD24A" stroke="#D08A00" stroke-width="2"/>' +
    '<circle cx="100" cy="67" r="7" fill="#E53935" stroke="#FFF3B0" stroke-width="2"/>' +
    '<circle cx="86" cy="68" r="2.5" fill="#2EC4B6"/><circle cx="114" cy="68" r="2.5" fill="#2EC4B6"/><circle cx="100" cy="44" r="2.8" fill="#E53935"/>' +
    '<circle cx="86" cy="81" r="2.6" fill="#E53935"/><circle cx="100" cy="81" r="2.6" fill="#2EC4B6"/><circle cx="114" cy="81" r="2.6" fill="#E53935"/>' +
    '<circle cx="100" cy="19" r="4" fill="#FFD24A" stroke="#D08A00" stroke-width="1.5"/>' +
    /* face */
    '<path d="M100 88 v7" stroke="#E53935" stroke-width="3.2" stroke-linecap="round"/>' +
    '<path d="M86 94 q5 -3 9 0M105 94 q5 -3 9 0" fill="none" stroke="#3A1E0E" stroke-width="2" stroke-linecap="round"/>' +
    '<g class="eyes"><ellipse cx="90.5" cy="102" rx="3.6" ry="4.6" fill="#3A1E0E"/><ellipse cx="109.5" cy="102" rx="3.6" ry="4.6" fill="#3A1E0E"/>' +
    '<circle cx="91.6" cy="100.4" r="1.3" fill="#fff"/><circle cx="110.6" cy="100.4" r="1.3" fill="#fff"/></g>' +
    '<circle cx="84" cy="112" r="4.5" fill="#FF6F91" opacity=".35"/><circle cx="116" cy="112" r="4.5" fill="#FF6F91" opacity=".35"/>' +
    '<path d="M99 106 q1 3 2 0" fill="none" stroke="' + skinLine + '" stroke-width="1.5" stroke-linecap="round"/>' +
    '<path d="M92 114 Q100 121 108 114" fill="none" stroke="#8A2E12" stroke-width="2.6" stroke-linecap="round"/>';
}
/* Full illustration (home hero) */
function suryaSVG(label) {
  return '<svg class="deity" viewBox="0 0 200 200" role="img" aria-label="' + (label || 'Surya Dev, the Sun god') + '">' + suryaGroup(uid()) + '</svg>';
}
/* Round badge for activity screen headers (head, crown and halo) */
function suryaBadge() {
  return '<svg viewBox="42 14 116 116" role="img" aria-label="Surya Dev">' + suryaGroup(uid()) + '</svg>';
}
function picture(name) {
  const u = uid();
  const st = (x, y, R, r, fill, cls) => '<path class="tw' + (cls ? ' ' + cls : '') + '" d="' + starPath(x, y, R, r) + '" fill="' + fill + '"/>';
  let s = '<svg viewBox="0 0 300 200" role="img" preserveAspectRatio="xMidYMid slice" aria-label="' + (PIC_LABEL[name] || '') + '">';
  if (name === 'sunrise') {
    s += '<defs><linearGradient id="' + u + 's" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6FBDF5"/><stop offset=".55" stop-color="#FFD9A6"/><stop offset="1" stop-color="#FFB870"/></linearGradient></defs>' +
      '<rect width="300" height="200" fill="url(#' + u + 's)"/>' +
      st(34, 26, 9, 3.6, '#FFF7C2') + st(266, 22, 8, 3.2, '#FFF7C2', 'd2') + st(236, 48, 5, 2, '#FFF7C2', 'd3') + st(70, 50, 5, 2, '#FFF7C2', 'd2') +
      cloud(60, 88, 0.9) + cloud(210, 76, 0.75) +
      '<g class="rise">' + sunFace(150, 124, 38, u, { raysClass: 'spin-slow' }) + '</g>' +
      '<path d="M112 70 q6 -6 12 0 q6 -6 12 0M178 58 q5 -5 10 0 q5 -5 10 0" fill="none" stroke="#5A2D0C" stroke-width="3" stroke-linecap="round" class="float"/>' +
      '<path d="M0 150 Q70 112 150 146 T300 138 V200 H0Z" fill="#79CF63"/>' +
      '<path d="M0 172 Q90 138 180 170 T300 166 V200 H0Z" fill="#43AE4A"/>' +
      '<circle cx="40" cy="176" r="5" fill="#FF6F91"/><circle cx="52" cy="182" r="4" fill="#FFC83D"/><circle cx="252" cy="182" r="5" fill="#FF6F91"/>';
  } else if (name === 'sun') {
    s += '<defs><radialGradient id="' + u + 'b" cx="50%" cy="45%" r="75%"><stop offset="0" stop-color="#FFF7C8"/><stop offset=".6" stop-color="#FFD98A"/><stop offset="1" stop-color="#FFAA55"/></radialGradient></defs>' +
      '<rect width="300" height="200" fill="url(#' + u + 'b)"/>' +
      cloud(22, 168, 0.8) + cloud(236, 172, 0.8) +
      '<g transform="translate(50 -2) scale(1.02)">' + suryaGroup(u) + '</g>' +
      st(34, 40, 10, 4, '#fff') + st(266, 44, 9, 3.6, '#fff', 'd2') + st(40, 120, 7, 3, '#fff', 'd3') + st(262, 118, 8, 3.2, '#fff');
  } else if (name === 'glow') {
    s += '<defs><linearGradient id="' + u + 'g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFD7A0"/><stop offset="1" stop-color="#FFB27A"/></linearGradient>' +
      '<radialGradient id="' + u + 'h"><stop offset="0" stop-color="#FFFBE0"/><stop offset=".5" stop-color="#FFE9A0" stop-opacity=".9"/><stop offset="1" stop-color="#FFD27A" stop-opacity="0"/></radialGradient>' +
      diyaDefs(u) + '</defs>' +
      '<rect width="300" height="200" fill="url(#' + u + 'g)"/>' +
      '<circle cx="150" cy="92" r="96" fill="url(#' + u + 'h)" class="pulse-glow"/>' +
      st(60, 36, 8, 3.2, '#fff') + st(244, 34, 9, 3.6, '#fff', 'd2') + st(262, 96, 6, 2.4, '#fff', 'd3') + st(38, 104, 6, 2.4, '#fff', 'd3') +
      '<ellipse cx="150" cy="186" rx="84" ry="14" fill="#E07B3A" opacity=".35"/>' +
      '<ellipse cx="150" cy="176" rx="64" ry="17" fill="#8B6CEF"/>' +
      '<path d="M112 176 Q114 128 128 120 L172 120 Q186 128 188 176Z" fill="#FF8A1F"/>' +
      '<path d="M150 120v56" stroke="#FFC83D" stroke-width="4"/>' +
      '<path d="M143 150 L150 122 L157 150 Q150 154 143 150Z" fill="#C98B5A" stroke="#A8703F" stroke-width="1.5"/>' +
      '<rect x="142" y="104" width="16" height="14" fill="#C98B5A"/>' +
      childHead(150, 84, 25, true) +
      '<circle cx="150" cy="68" r="2.6" fill="#E53935"/>' +
      diya(62, 186, 1, u) + diya(238, 186, 1, u);
  } else if (name === 'idea') {
    s += '<defs><linearGradient id="' + u + 'i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9EDCFF"/><stop offset="1" stop-color="#C9F2E4"/></linearGradient>' +
      '<radialGradient id="' + u + 'l"><stop offset="0" stop-color="#FFF9C4"/><stop offset="1" stop-color="#FFE066" stop-opacity="0"/></radialGradient></defs>' +
      '<rect width="300" height="200" fill="url(#' + u + 'i)"/>' +
      '<circle cx="150" cy="48" r="46" fill="url(#' + u + 'l)" class="pulse-glow"/>' +
      '<g stroke="#FFB020" stroke-width="5" stroke-linecap="round" class="pulse-glow"><path d="M150 10v-6M118 20l-5-5M182 20l5-5M106 48h-8M194 48h8M116 76l-5 4M184 76l5 4"/></g>' +
      '<path d="M150 22a24 24 0 0 0-14 43c3 3 4 6 4 9h20c0-3 1-6 4-9a24 24 0 0 0-14-43z" fill="#FFE066" stroke="#FFB020" stroke-width="3"/>' +
      '<path d="M144 60q6-10 12 0" fill="none" stroke="#FF9F1C" stroke-width="3" stroke-linecap="round"/>' +
      '<rect x="140" y="75" width="20" height="6" rx="3" fill="#9AA5B1"/><rect x="142" y="82" width="16" height="5" rx="2.5" fill="#7B8794"/>' +
      '<path d="M92 200 Q96 160 150 158 Q204 160 208 200Z" fill="#16B3A3"/>' +
      '<path d="M136 158 L150 176 L164 158Z" fill="#fff" opacity=".8"/>' +
      '<rect x="141" y="146" width="18" height="14" fill="#C98B5A"/>' +
      childHead(150, 124, 30, false) +
      '<g class="float"><path d="M232 104c-6-8-20-4-18 7 2 8 18 18 18 18s16-10 18-18c2-11-12-15-18-7z" fill="#FF6F91"/></g>' +
      st(68, 110, 12, 5, '#FFC83D') + st(250, 40, 7, 3, '#fff', 'd2') + st(46, 44, 7, 3, '#fff', 'd3');
  }
  return s + '</svg>';
}

/* 12 stickers */
const STICKERS = [
  u => sunFace(50, 50, 26, u),
  () => '<path d="M60 16a34 34 0 1 0 26 54 28 28 0 1 1-26-54z" fill="#FFD54A" stroke="#F2A900" stroke-width="3"/><path d="' + starPath(78, 22, 7, 3) + '" fill="#8B6CEF"/><path d="' + starPath(84, 44, 5, 2) + '" fill="#8B6CEF"/><circle cx="42" cy="50" r="3" fill="#5A2D0C"/><path d="M36 62q6 5 12 0" fill="none" stroke="#5A2D0C" stroke-width="3" stroke-linecap="round"/>',
  () => '<path d="' + starPath(50, 54, 42, 19) + '" fill="#FFC83D" stroke="#E8590C" stroke-width="4" stroke-linejoin="round"/><circle cx="42" cy="50" r="4" fill="#5A2D0C"/><circle cx="58" cy="50" r="4" fill="#5A2D0C"/><path d="M42 61q8 7 16 0" fill="none" stroke="#5A2D0C" stroke-width="3.5" stroke-linecap="round"/>',
  () => { let p = ''; [-60, -30, 60, 30, 0].forEach(a => { p += '<ellipse cx="50" cy="44" rx="10" ry="26" fill="' + (a === 0 ? '#FF6F91' : '#FF9BB5') + '" stroke="#E0456F" stroke-width="2" transform="rotate(' + a + ' 50 70)"/>'; }); return p + '<ellipse cx="50" cy="76" rx="38" ry="8" fill="#4CCB63"/>'; },
  u => '<defs>' + diyaDefs(u) + '</defs>' + diya(50, 80, 1.55, u),
  () => { let p = ''; for (let i = 0; i < 6; i++) p += '<circle cx="50" cy="26" r="15" fill="#FF8FAB" transform="rotate(' + (i * 60) + ' 50 50)"/>'; return p + '<circle cx="50" cy="50" r="15" fill="#FFC83D" stroke="#FF9F1C" stroke-width="3"/>'; },
  () => { const c = ['#FF5A5A', '#FF9F1C', '#FFD54A', '#3DBE55', '#3FA7F5', '#8B6CEF']; let p = ''; c.forEach((col, i) => { const r = 42 - i * 6; p += '<path d="M' + (50 - r) + ' 72a' + r + ' ' + r + ' 0 0 1 ' + (2 * r) + ' 0" fill="none" stroke="' + col + '" stroke-width="6"/>'; }); return p + cloud(8, 76, 0.5) + cloud(70, 76, 0.5); },
  () => '<ellipse cx="32" cy="38" rx="20" ry="16" fill="#8B6CEF" transform="rotate(-20 32 38)"/><ellipse cx="68" cy="38" rx="20" ry="16" fill="#8B6CEF" transform="rotate(20 68 38)"/><ellipse cx="34" cy="64" rx="15" ry="12" fill="#FF8FAB"/><ellipse cx="66" cy="64" rx="15" ry="12" fill="#FF8FAB"/><circle cx="30" cy="38" r="6" fill="#FFD54A"/><circle cx="70" cy="38" r="6" fill="#FFD54A"/><rect x="46" y="28" width="8" height="48" rx="4" fill="#5A2D0C"/><path d="M48 28q-6-12-12-14M52 28q6-12 12-14" fill="none" stroke="#5A2D0C" stroke-width="3" stroke-linecap="round"/>',
  () => '<ellipse cx="50" cy="40" rx="26" ry="31" fill="#FF5A5A"/><ellipse cx="40" cy="30" rx="6" ry="10" fill="#fff" opacity=".5"/><path d="M46 70l4 6 4-6z" fill="#E53935"/><path d="M50 76q-8 10 0 20" fill="none" stroke="#9A5A2A" stroke-width="2.5"/>',
  () => '<path d="M50 86C20 66 10 50 14 34c4-16 26-20 36-4 10-16 32-12 36 4 4 16-6 32-36 52z" fill="#FF6F91" stroke="#E0456F" stroke-width="3"/><ellipse cx="32" cy="36" rx="6" ry="9" fill="#fff" opacity=".45"/>',
  () => '<path d="M72 50l20-16v32z" fill="#FF9F1C"/><ellipse cx="44" cy="50" rx="34" ry="22" fill="#3FA7F5"/><path d="M30 34q10 16 0 32M44 30q10 20 0 40" fill="none" stroke="#9ED6FF" stroke-width="3"/><circle cx="24" cy="46" r="5" fill="#fff"/><circle cx="23" cy="46" r="2.6" fill="#1B3A5A"/><circle cx="84" cy="22" r="4" fill="none" stroke="#9ED6FF" stroke-width="2"/><circle cx="92" cy="12" r="3" fill="none" stroke="#9ED6FF" stroke-width="2"/>',
  () => '<ellipse cx="50" cy="58" rx="28" ry="24" fill="#3DBE55"/><circle cx="50" cy="34" r="18" fill="#4CD964"/><path d="M66 34l14 5-14 5z" fill="#FF9F1C"/><circle cx="56" cy="30" r="4" fill="#1E3A1E"/><path d="M34 56q14 16 30 0" fill="#2E9E44"/><path d="M40 80l-4 10M58 80l4 10" stroke="#FF9F1C" stroke-width="4" stroke-linecap="round"/><path d="M42 18q4-10 12-8" fill="none" stroke="#FF5A5A" stroke-width="4" stroke-linecap="round"/>'
];
const stickerSVG = i => '<svg viewBox="0 0 100 100" aria-hidden="true">' + STICKERS[i % STICKERS.length](uid()) + '</svg>';

/* ------------------------------------------------------------------ */
/* Sound effects (Web Audio, no files)                                 */
/* ------------------------------------------------------------------ */
let actx = null;
function audioCtx() {
  try {
    if (!actx) { const C = window.AudioContext || window.webkitAudioContext; if (!C) return null; actx = new C(); }
    if (actx.state === 'suspended') actx.resume().catch(() => {});
    return actx;
  } catch (e) { return null; }
}
document.addEventListener('pointerdown', audioCtx, { passive: true });
function tone(freq, when, dur, type, vol) {
  const c = actx; if (!c || c.state !== 'running') return;
  const t = c.currentTime + (when || 0), o = c.createOscillator(), g = c.createGain();
  o.type = type || 'sine'; o.frequency.value = freq;
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol || 0.15, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(c.destination); o.start(t); o.stop(t + dur + 0.05);
}
const sfx = {
  chime() { [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, i * 0.1, 0.7, 'sine', 0.14)); },
  pop() { tone(660, 0, 0.15, 'triangle', 0.12); tone(990, 0.05, 0.15, 'sine', 0.08); },
  soft() { tone(440, 0, 0.18, 'sine', 0.06); },
  clap(hit) {
    const c = actx; if (!c || c.state !== 'running') return;
    const len = Math.floor(c.sampleRate * 0.12), b = c.createBuffer(1, len, c.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
    const src = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    src.buffer = b; f.type = 'bandpass'; f.frequency.value = 1400; f.Q.value = 0.8; g.gain.value = 0.5;
    src.connect(f).connect(g).connect(c.destination); src.start();
    if (hit) tone(1318.5, 0.02, 0.35, 'sine', 0.08);
  }
};

/* ------------------------------------------------------------------ */
/* IndexedDB recordings                                                */
/* ------------------------------------------------------------------ */
const DB = {
  p: null,
  open() {
    if (this.p) return this.p;
    this.p = new Promise((res, rej) => {
      if (!('indexedDB' in window)) { rej(new Error('IndexedDB unavailable')); return; }
      const r = indexedDB.open('gayatri-kids', 1);
      r.onupgradeneeded = () => { r.result.createObjectStore('rec'); };
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
    this.p.catch(() => { this.p = null; });
    return this.p;
  },
  async tx(mode, fn) {
    const db = await this.open();
    return new Promise((res, rej) => {
      const t = db.transaction('rec', mode), rq = fn(t.objectStore('rec'));
      t.oncomplete = () => res(rq && rq.result);
      t.onerror = () => rej(t.error);
      t.onabort = () => rej(t.error);
    });
  },
  get(k) { return this.tx('readonly', st => st.get(k)).then(v => v || null).catch(() => null); },
  put(k, v) { return this.tx('readwrite', st => st.put(v, k)); },
  del(k) { return this.tx('readwrite', st => st.delete(k)); }
};

/* Recording analysis: find speech start/end and silent gaps so highlighting follows the voice. */
const recCache = new Map();
function invalidateRec(key) { const c = recCache.get(key); if (c && c.url) URL.revokeObjectURL(c.url); recCache.delete(key); }
async function getRec(key) {
  if (recCache.has(key)) return recCache.get(key);
  const r = await DB.get(key);
  if (!r || !r.data) { recCache.set(key, null); return null; }
  const url = URL.createObjectURL(new Blob([r.data], { type: r.type || 'audio/webm' }));
  const info = { url, dur: r.duration || 0, start: 0, end: r.duration || 0, gaps: [] };
  try {
    const OAC = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    const ab = await new Promise((res, rej) => {
      const oc = new OAC(1, 44100, 44100);
      const p = oc.decodeAudioData(r.data.slice(0), res, rej);
      if (p && p.then) p.then(res, rej);
    });
    const ch = ab.getChannelData(0), sr = ab.sampleRate, fl = Math.max(1, Math.round(sr * 0.02)), n = Math.floor(ch.length / fl);
    info.dur = ab.duration;
    if (n > 5) {
      const rms = new Float32Array(n);
      for (let i = 0; i < n; i++) { let s = 0; for (let j = i * fl, e = j + fl; j < e; j++) s += ch[j] * ch[j]; rms[i] = Math.sqrt(s / fl); }
      const sorted = Array.from(rms).sort((a, b) => a - b);
      const floor = sorted[Math.floor(n * 0.1)], peak = sorted[Math.floor(n * 0.98)];
      const thr = floor + (peak - floor) * 0.12;
      let a = 0, b = n - 1;
      while (a < n && rms[a] < thr) a++;
      while (b > a && rms[b] < thr) b--;
      if (b > a) {
        info.start = Math.max(0, a * 0.02 - 0.05); info.end = Math.min(info.dur, (b + 1) * 0.02 + 0.05);
        let runStart = -1;
        for (let i = a; i <= b; i++) {
          if (rms[i] < thr) { if (runStart < 0) runStart = i; }
          else if (runStart >= 0) { if (i - runStart >= 6) info.gaps.push({ s: runStart * 0.02, e: i * 0.02 }); runStart = -1; }
        }
      } else { info.start = 0; info.end = info.dur; }
    }
  } catch (e) { /* undecodable: proportional timing */ }
  if (!info.end || !isFinite(info.end)) info.end = info.dur || 4;
  recCache.set(key, info);
  return info;
}
const chunkWeight = c => 0.75 + 0.08 * c.length;
function chunkStarts(li, a, b) {
  const ws = LINES[li].chunks.map(chunkWeight), tot = ws.reduce((x, y) => x + y, 0);
  const out = []; let t = a;
  ws.forEach(w => { out.push(t); t += (b - a) * w / tot; });
  return out;
}
function segmentsFor(info, lineIdxs) {
  const s = info.start, e = info.end > s ? info.end : info.dur, D = e - s;
  const lw = lineIdxs.map(li => LINES[li].chunks.reduce((x, c) => x + chunkWeight(c), 0));
  const tot = lw.reduce((x, y) => x + y, 0);
  let bounds = [], acc = s;
  lw.forEach(w => { bounds.push([acc, acc + D * w / tot]); acc += D * w / tot; });
  if (lineIdxs.length > 1 && info.gaps.length) {
    const chosen = []; let ok = true, prevEnd = s;
    for (let k = 0; k < lineIdxs.length - 1; k++) {
      const expect = bounds[k][1];
      const cands = info.gaps.filter(g => g.s > prevEnd + 0.3 && Math.abs((g.s + g.e) / 2 - expect) < D * 0.2);
      if (!cands.length) { ok = false; break; }
      const g = cands.reduce((m, x) => (x.e - x.s > m.e - m.s ? x : m));
      chosen.push(g); prevEnd = g.e;
    }
    if (ok) {
      const nb = []; let cur = s;
      chosen.forEach(g => { nb.push([cur, g.s]); cur = g.e; });
      nb.push([cur, e]);
      if (nb.every(x => x[1] - x[0] > 0.35)) bounds = nb;
    }
  }
  return lineIdxs.map((li, k) => ({ line: li, a: bounds[k][0], b: bounds[k][1], cuts: chunkStarts(li, bounds[k][0], bounds[k][1]) }));
}

/* ------------------------------------------------------------------ */
/* Player: recordings first, then speechSynthesis, then silent timing  */
/* ------------------------------------------------------------------ */
const Player = {
  tok: 0, audio: null,
  stop() {
    this.tok++;
    try { if ('speechSynthesis' in window) speechSynthesis.cancel(); } catch (e) {}
    if (this.audio) { try { this.audio.pause(); } catch (e) {} this.audio = null; }
  },
  begin() { this.stop(); return this.tok; }
};
const alive = tok => tok === Player.tok;
const sleep = (ms, tok) => new Promise(res => { const t0 = performance.now(); const iv = setInterval(() => { if (!alive(tok) || performance.now() - t0 >= ms) { clearInterval(iv); res(alive(tok)); } }, 50); });

let voices = [];
function refreshVoices() { try { voices = speechSynthesis.getVoices() || []; } catch (e) { voices = []; } }
if ('speechSynthesis' in window) { refreshVoices(); try { speechSynthesis.addEventListener('voiceschanged', refreshVoices); } catch (e) {} }
function pickVoice() {
  return voices.find(v => /^hi[-_]IN$/i.test(v.lang)) || voices.find(v => /^hi\b/i.test(v.lang)) ||
    voices.find(v => /^(mr|sa|ne)\b/i.test(v.lang)) || null;
}
function voiceStatus() {
  if (!('speechSynthesis' in window)) return 'This browser has no built-in voice, so syllables light up silently. Please record your voice above.';
  const v = pickVoice();
  if (v) return 'Built-in voice: ' + v.name + ' (' + v.lang + '), slow speed 0.6.';
  if (!voices.length) return 'Built-in voice: the phone\u2019s default Hindi (hi-IN) voice is used if it has one.';
  return 'No Hindi voice found on this device, so an English voice reads the transliteration. Tip: add Hindi in Android Settings \u2192 Text-to-speech, or record your own voice.';
}

function playRecording(info, segs, onProg, tok) {
  return new Promise(res => {
    const a = new Audio(info.url);
    a.preload = 'auto';
    Player.audio = a;
    let raf = 0, finished = false, lastL = -1, lastC = -2;
    const emit = (l, c) => { if (l !== lastL || c !== lastC) { lastL = l; lastC = c; onProg(l, c); } };
    const guard = setInterval(() => { if (!alive(tok)) finish(false); }, 200);
    function finish(v) { if (finished) return; finished = true; cancelAnimationFrame(raf); clearInterval(guard); a.onended = a.onerror = null; try { a.pause(); } catch (e) {} if (Player.audio === a) Player.audio = null; res(v); }
    const tick = () => {
      if (!alive(tok)) return finish(false);
      const t = a.currentTime;
      let seg = segs[0];
      for (const sg of segs) if (t >= sg.a - 0.15) seg = sg;
      let c = -1;
      seg.cuts.forEach((ct, i) => { if (t >= ct - 0.05) c = i; });
      if (t > seg.b + 0.1) c = seg.cuts.length;
      emit(seg.line, c);
      raf = requestAnimationFrame(tick);
    };
    a.onended = () => { const last = segs[segs.length - 1]; emit(last.line, last.cuts.length); finish(true); };
    a.onerror = () => finish('error');
    const p = a.play();
    if (p && p.then) p.then(() => { raf = requestAnimationFrame(tick); }, () => finish('error'));
    else raf = requestAnimationFrame(tick);
  });
}

function speakLine(li, onChunk, tok) {
  return new Promise(res => {
    const L = LINES[li], n = L.chunks.length, per = 0.62;
    const ws = L.chunks.map(chunkWeight), tot = ws.reduce((x, y) => x + y, 0), total = n * per;
    const cuts = []; let acc = 0; ws.forEach(w => { cuts.push(acc); acc += total * w / tot; });
    let started = false, ended = false, silent = false, t0 = 0, raf = 0, wd = 0, cap = 0, done = false, last = -2;
    const guard = setInterval(() => { if (!alive(tok)) finish(false); }, 200);
    function finish(v) { if (done) return; done = true; cancelAnimationFrame(raf); clearTimeout(wd); clearTimeout(cap); clearInterval(guard); res(v); }
    const emit = c => { if (c !== last) { last = c; onChunk(c); } };
    const tick = () => {
      if (!alive(tok)) return finish(false);
      const t = (performance.now() - t0) / 1000;
      let c = 0; cuts.forEach((ct, i) => { if (t >= ct) c = i; });
      if (silent && t >= total) ended = true;
      if (ended) { emit(n); return finish(true); }
      emit(c);
      raf = requestAnimationFrame(tick);
    };
    const startTimer = isSilent => { if (started) return; started = true; silent = isSilent; t0 = performance.now(); tick(); };
    const hasTTS = 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';
    if (!hasTTS) { startTimer(true); return; }
    try {
      const u = new SpeechSynthesisUtterance();
      const v = pickVoice();
      if (v) { u.voice = v; u.lang = v.lang; u.text = L.deva; }
      else if (!voices.length) { u.lang = 'hi-IN'; u.text = L.deva; }
      else { const en = voices.find(x => /^en[-_]IN/i.test(x.lang)); if (en) u.voice = en; u.lang = en ? en.lang : 'en-IN'; u.text = L.ttsEn; }
      u.rate = 0.6; u.pitch = 1.05; u.volume = 1;
      u.onstart = () => startTimer(false);
      u.onend = () => { if (!started) startTimer(true); else ended = true; };
      u.onerror = () => { if (!started) startTimer(true); else ended = true; };
      speechSynthesis.cancel();
      speechSynthesis.speak(u);
      wd = setTimeout(() => { if (!started) { try { speechSynthesis.cancel(); } catch (e) {} startTimer(true); } }, 1800);
      cap = setTimeout(() => { ended = true; }, (total * 3 + 6) * 1000);
    } catch (e) { startTimer(true); }
  });
}

async function playLine(li, onChunk, tok) {
  const info = await getRec('line' + li);
  if (!alive(tok)) return false;
  if (info) {
    const r = await playRecording(info, segmentsFor(info, [li]), (l, c) => onChunk(c), tok);
    if (r !== 'error') return r;
  }
  return speakLine(li, onChunk, tok);
}
async function playFull(onProg, tok) {
  const info = await getRec('full');
  if (!alive(tok)) return false;
  if (info) {
    const r = await playRecording(info, segmentsFor(info, [0, 1, 2, 3]), onProg, tok);
    if (r !== 'error') return r;
  }
  for (let i = 0; i < 4; i++) {
    onProg(i, -1);
    const ok = await playLine(i, c => onProg(i, c), tok);
    if (!ok || !alive(tok)) return false;
    if (i < 3 && !(await sleep(450, tok))) return false;
  }
  return true;
}

/* Screen wake lock during long Listen loops (best effort) */
let wakeLock = null;
async function keepAwake(on) {
  try {
    if (on && 'wakeLock' in navigator && !wakeLock && document.visibilityState === 'visible') { wakeLock = await navigator.wakeLock.request('screen'); wakeLock.addEventListener('release', () => { wakeLock = null; }); }
    else if (!on && wakeLock) { await wakeLock.release(); wakeLock = null; }
  } catch (e) { wakeLock = null; }
}

/* ------------------------------------------------------------------ */
/* Shared UI pieces                                                    */
/* ------------------------------------------------------------------ */
function topbar(title, backTo) {
  const isBack = backTo && backTo !== 'home';
  return '<div class="topbar"><button class="round-btn" data-nav="' + (backTo || 'home') + '" aria-label="' + (isBack ? 'Back' : 'Home') + '">' + (isBack ? ICON.back : ICON.home) + '</button>' +
    '<div class="title-chip"><span>' + esc(title) + '</span></div><div class="deity-badge">' + suryaBadge() + '</div></div>';
}
function chunksHTML(li) {
  let k = 0;
  return '<div class="chunks" aria-label="' + esc(LINES[li].roman) + '">' + LINES[li].words.map(w => '<span class="word">' + w.map(c => '<span class="ch" data-i="' + (k++) + '">' + esc(c) + '</span>').join('') + '</span>').join('') + '</div>';
}
function setChunk(root, c, cls) {
  cls = cls || 'on';
  const other = cls === 'on' ? 'echo' : 'on';
  $$('.ch', root).forEach((el, i) => { el.classList.toggle(cls, i === c); el.classList.toggle('done', i < c); el.classList.remove(other); });
}
function meaningHTML(text) { return '<div class="meaning">' + ICON.parent + '<span>' + esc(text) + '</span></div>'; }
function dotsHTML(cur) { return '<div class="dots" aria-hidden="true">' + [0, 1, 2, 3].map(i => '<span class="dot' + (i === cur ? ' on' : i < cur ? ' done' : '') + '"></span>').join('') + '</div>'; }
function beadsSVG(n, done) {
  const R = 46, cx = 59, cy = 59, br = n <= 3 ? 12 : n <= 11 ? 8 : 5.6;
  let s = '<svg class="beads" viewBox="0 0 118 118" role="img" aria-label="' + done + ' of ' + n + ' done"><circle cx="59" cy="59" r="' + R + '" fill="none" stroke="#E8A860" stroke-width="2" stroke-dasharray="3 4"/>';
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + (n === 1 ? 0 : i * 2 * Math.PI / n);
    s += '<circle class="bead' + (i < done ? ' on' : i === done ? ' cur' : '') + '" cx="' + (cx + R * Math.cos(a)).toFixed(1) + '" cy="' + (cy + R * Math.sin(a)).toFixed(1) + '" r="' + br + '"/>';
  }
  return s + '<circle cx="59" cy="59" r="30" fill="#FFF7E6"/><text x="59" y="70" text-anchor="middle" font-size="30">' + done + '</text></svg>';
}
let toastTimer = 0;
function toast(html, ms) {
  toastEl.innerHTML = html; toastEl.hidden = false;
  clearTimeout(toastTimer); toastTimer = setTimeout(() => { toastEl.hidden = true; }, ms || 2600);
}
function sparkle(x, y, big) {
  const colors = ['#FFC83D', '#FF6F91', '#16B3A3', '#8B6CEF', '#FF8A1F', '#3FA7F5'];
  const n = big ? 12 : 6;
  for (let i = 0; i < n; i++) {
    const el = document.createElement('div');
    el.className = 'spark';
    const a = Math.random() * Math.PI * 2, d = (big ? 70 : 40) + Math.random() * 50;
    el.style.left = x + 'px'; el.style.top = y + 'px';
    el.style.setProperty('--dx', (Math.cos(a) * d).toFixed(0) + 'px'); el.style.setProperty('--dy', (Math.sin(a) * d).toFixed(0) + 'px');
    el.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22"><path d="' + starPath(12, 12.5, 11, 4.8) + '" fill="' + colors[i % colors.length] + '"/></svg>';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 750);
  }
}

/* Reward: always positive, earns a sticker */
function earnStar() { state.stars += 1; state.lastNew = (state.stars - 1) % STICKERS.length; save(); return state.lastNew; }
function closeOverlay() { overlay.hidden = true; overlay.innerHTML = ''; overlay.onclick = null; }
function celebrate(opts) {
  const sticker = earnStar();
  sfx.chime();
  const colors = ['#FFC83D', '#FF6F91', '#16B3A3', '#8B6CEF', '#FF8A1F', '#3FA7F5', '#3DBE55'];
  let conf = '';
  for (let i = 0; i < 36; i++) conf += '<span class="confetti" style="left:' + (Math.random() * 97).toFixed(1) + '%;background:' + colors[i % colors.length] + ';animation-duration:' + (2.2 + Math.random() * 2).toFixed(2) + 's;animation-delay:' + (Math.random() * 0.8).toFixed(2) + 's"></span>';
  const btns = [];
  if (opts.again) btns.push('<button class="pill-btn" data-act="again" aria-label="Again">' + ICON.again + '</button>');
  btns.push(opts.next ? '<button class="pill-btn go" data-act="next" aria-label="Next">' + ICON.next + '</button>' : '<button class="pill-btn go" data-act="ok" aria-label="OK">' + ICON.check + '</button>');
  overlay.innerHTML = conf + '<div class="reward-star">' + ICON.star + '</div><div class="reward-title">' + esc(opts.title || 'Well done!') + '</div>' +
    '<div class="reward-sticker" aria-label="New sticker">' + stickerSVG(sticker) + '</div><div class="row">' + btns.join('') + '</div>';
  overlay.hidden = false;
  overlay.onclick = e => {
    const b = e.target.closest('[data-act]'); if (!b) return;
    const act = b.dataset.act; closeOverlay();
    if (act === 'again' && opts.again) opts.again();
    else if (act === 'next' && opts.next) opts.next();
    else if (opts.ok) opts.ok();
  };
}

/* ------------------------------------------------------------------ */
/* Router (hash based, relative, works under /<repo>/)                 */
/* ------------------------------------------------------------------ */
let pushedFromHome = false, currentRoute = '', parentOk = false;
function go(r) {
  if (currentRoute === 'home' || currentRoute === '') { pushedFromHome = true; location.hash = '#' + r; }
  else location.replace('#' + r);
}
function goHome() {
  if (pushedFromHome && history.length > 1) { pushedFromHome = false; history.back(); }
  else location.replace('#home');
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-nav]'); if (!b) return;
  if (b.dataset.nav === 'home') goHome(); else go(b.dataset.nav);
});
function route() {
  Player.stop(); keepAwake(false); closeOverlay(); stopRecording(true);
  toastEl.hidden = true;
  const r = (location.hash || '#home').slice(1) || 'home';
  if (r !== 'parent') parentOk = false;
  if (r === 'home') pushedFromHome = false;
  currentRoute = r.split('/')[0];
  window.scrollTo(0, 0);
  const m = r.match(/^learn\/([1-4])$/);
  if (r === 'home') renderHome();
  else if (r === 'listen') renderListen();
  else if (r === 'learn') renderLearnList();
  else if (m) renderLearnLine(+m[1] - 1);
  else if (r === 'clap') renderClap();
  else if (r === 'stars') renderStars();
  else if (r === 'parent') { if (parentOk) renderParent(); else renderGate(); }
  else location.replace('#home');
}
window.addEventListener('hashchange', route);

/* ------------------------------------------------------------------ */
/* Screens                                                             */
/* ------------------------------------------------------------------ */
function renderHome() {
  app.innerHTML = '<section class="screen home">' +
    '<div class="home-top"><button class="gear" data-nav="parent" aria-label="Grown-ups area">' + ICON.gear + '</button></div>' +
    '<div class="mascot-wrap">' + suryaSVG() + '</div>' +
    '<div class="app-title"><div class="om" lang="sa">ॐ</div><h1>Gayatri Mantra</h1></div>' +
    '<div class="tiles">' +
      '<button class="tile t-listen" data-nav="listen" aria-label="Listen">' + TILE_ICON.listen + '<span class="lbl">Listen</span></button>' +
      '<button class="tile t-learn" data-nav="learn" aria-label="Learn a line">' + TILE_ICON.learn + '<span class="lbl">Learn</span></button>' +
      '<button class="tile t-clap" data-nav="clap" aria-label="Clap along">' + TILE_ICON.clap + '<span class="lbl">Clap</span></button>' +
      '<button class="tile t-stars" data-nav="stars" aria-label="My stars">' + TILE_ICON.stars + '<span class="lbl">My stars</span>' + (state.stars ? '<span class="badge">' + state.stars + '</span>' : '') + '</button>' +
    '</div></section>';
}

function renderListen() {
  const N = state.repeat;
  app.innerHTML = '<section class="screen listen">' + topbar('Listen') +
    '<div class="pic pop" id="lpic">' + picture(LINES[0].pic) + '</div>' +
    '<div id="ldots">' + dotsHTML(-1) + '</div>' +
    '<div class="deva" id="ldeva" lang="sa">' + LINES[0].deva + '</div>' +
    '<div id="lchunks">' + chunksHTML(0) + '</div>' +
    '<div id="lmean">' + meaningHTML(OVERALL) + '</div>' +
    '<div class="controls"><div id="lbeads">' + beadsSVG(N, 0) + '</div>' +
    '<button class="play-btn idle" id="lplay" aria-label="Play">' + ICON.play + '</button></div></section>';
  const btn = $('#lplay');
  let playing = false, shownLine = 0;
  const showLine = li => {
    if (li === shownLine) return;
    shownLine = li;
    const p = $('#lpic'); p.classList.remove('pop'); void p.offsetWidth; p.innerHTML = picture(LINES[li].pic); p.classList.add('pop');
    $('#ldeva').textContent = LINES[li].deva;
    $('#lchunks').innerHTML = chunksHTML(li);
    $('#lmean').innerHTML = meaningHTML(LINES[li].meaning);
  };
  const setBtn = on => { playing = on; btn.classList.toggle('playing', on); btn.classList.toggle('idle', !on); btn.innerHTML = on ? ICON.stop : ICON.play; btn.setAttribute('aria-label', on ? 'Stop' : 'Play'); };
  btn.onclick = async () => {
    if (playing) { Player.stop(); keepAwake(false); setBtn(false); return; }
    const tok = Player.begin(); setBtn(true); keepAwake(true);
    shownLine = -1; showLine(0);
    for (let r = 0; r < N; r++) {
      $('#lbeads').innerHTML = beadsSVG(N, r);
      const ok = await playFull((li, c) => { if (!alive(tok)) return; showLine(li); $('#ldots').innerHTML = dotsHTML(li); setChunk($('#lchunks'), c); }, tok);
      if (!ok || !alive(tok)) return;
      $('#lbeads').innerHTML = beadsSVG(N, r + 1);
      sfx.soft();
      if (r < N - 1 && !(await sleep(1100, tok))) return;
    }
    keepAwake(false); setBtn(false);
    $('#lmean').innerHTML = meaningHTML(OVERALL);
    celebrate({ title: 'Beautiful!', again: () => btn.click(), ok: () => {} });
  };
}

function renderLearnList() {
  app.innerHTML = '<section class="screen learn-list">' + topbar('Learn') + '<div class="cards">' +
    LINES.map((L, i) => {
      const un = unlocked(i), pr = state.practised[i];
      return '<button class="lcard' + (un ? '' : ' locked') + '" data-line="' + i + '" aria-label="Line ' + (i + 1) + (un ? '' : ' (locked)') + '">' +
        '<div class="thumb">' + picture(L.pic) + '</div><div><div class="num">' + (i + 1) + '</div><div class="rm">' + esc(L.roman) + '</div></div>' +
        '<div class="state">' + (pr ? ICON.star : un ? '' : ICON.lock) + '</div></button>';
    }).join('') + '</div></section>';
  $$('.lcard').forEach(c => { c.onclick = () => {
    const i = +c.dataset.line;
    if (unlocked(i)) { go('learn/' + (i + 1)); return; }
    sfx.soft(); c.classList.remove('shake'); void c.offsetWidth; c.classList.add('shake');
    toast(ICON.lock + '<span>Practise line ' + i + ' first</span>');
  }; });
}

function renderLearnLine(li) {
  if (!unlocked(li)) { location.replace('#learn'); return; }
  const L = LINES[li];
  app.innerHTML = '<section class="screen learn-line">' + topbar('Line ' + (li + 1), 'learn') +
    '<div class="pic pop">' + picture(L.pic) + '</div>' +
    '<div class="deva" lang="sa">' + L.deva + '</div>' +
    '<div id="chk">' + chunksHTML(li) + '</div>' + meaningHTML(L.meaning) +
    '<div class="phase" id="phase"></div></section>';
  const ph = $('#phase');
  const listenPhase = async () => {
    const tok = Player.begin();
    ph.className = 'phase ph-listen';
    ph.innerHTML = '<div class="plabel">Listen</div><div class="big-ic">' + ICON.ear + '</div>';
    const ok = await playLine(li, c => setChunk($('#chk'), c), tok);
    if (!ok || !alive(tok)) return;
    if (await sleep(500, tok)) turnPhase(tok);
  };
  const turnPhase = async tok => {
    ph.className = 'phase ph-turn';
    ph.innerHTML = '<div class="plabel">Your turn!</div><div class="row"><button class="pill-btn" id="hear" aria-label="Hear it again">' + ICON.ear + '</button>' +
      '<div class="big-ic"><span class="ring"></span><span class="ring r2"></span><span class="ring r3"></span>' + ICON.mic + '</div>' +
      '<button class="pill-btn go" id="done" aria-label="Done">' + ICON.check + '</button></div>';
    setChunk($('#chk'), -1, 'echo');
    let finished = false;
    const finish = () => {
      if (finished) return; finished = true; Player.stop();
      state.practised[li] = true; save();
      celebrate({ title: 'Super!', again: () => listenPhase(), next: li < 3 ? () => go('learn/' + (li + 2)) : null, ok: () => go('learn') });
    };
    $('#hear').onclick = () => { finished = true; listenPhase(); };
    $('#done').onclick = finish;
    /* gentle guide: syllables light up slowly while the child repeats; no scoring, no failure */
    if (!(await sleep(900, tok))) return;
    for (let i = 0; i < L.chunks.length; i++) {
      if (!alive(tok) || finished) return;
      setChunk($('#chk'), i, 'echo');
      if (!(await sleep(950, tok))) return;
    }
    setChunk($('#chk'), L.chunks.length, 'echo');
    if (!(await sleep(1400, tok))) return;
    if (!finished) finish();
  };
  listenPhase();
}

function renderClap() {
  let li = 0, active = -1, playing = false;
  app.innerHTML = '<section class="screen clap">' + topbar('Clap along') +
    '<div class="linepick" role="group" aria-label="Choose a line">' + [0, 1, 2, 3].map(i => '<button class="lp' + (i === 0 ? ' sel' : '') + '" data-l="' + i + '" aria-label="Line ' + (i + 1) + '">' + (i + 1) + '</button>').join('') + '</div>' +
    '<div class="pic small pop" id="cpic">' + picture(LINES[0].pic) + '</div>' +
    '<div class="circles" id="circles"></div>' +
    '<div class="controls"><button class="clap-pad" id="pad" aria-label="Clap">' + clapIcon('#FF8A1F', '#FFB547', '#E8590C', 'rgba(255,255,255,.45)') + '</button>' +
    '<button class="play-btn idle" id="cplay" aria-label="Play">' + ICON.play + '</button></div></section>';
  const btn = $('#cplay');
  const drawCircles = () => {
    $('#circles').innerHTML = LINES[li].chunks.map((c, i) => '<button class="circ' + (playing ? '' : ' idle') + '" data-i="' + i + '" style="animation-delay:' + (i * 0.2).toFixed(1) + 's" aria-label="' + esc(c) + '">' + esc(c) + '</button>').join('');
  };
  const setPlay = on => { playing = on; btn.classList.toggle('playing', on); btn.classList.toggle('idle', !on); btn.innerHTML = on ? ICON.stop : ICON.play; btn.setAttribute('aria-label', on ? 'Stop' : 'Play'); };
  const select = i => {
    li = i; Player.stop(); setPlay(false); active = -1;
    $$('.lp').forEach(b => b.classList.toggle('sel', +b.dataset.l === i));
    const p = $('#cpic'); p.classList.remove('pop'); void p.offsetWidth; p.innerHTML = picture(LINES[i].pic); p.classList.add('pop');
    drawCircles();
  };
  const hit = (x, y, idx) => {
    const target = idx != null ? idx : active;
    const good = target >= 0 && target === active;
    sfx.clap(good); sparkle(x, y, good);
    if (good) { const el = $('#circles [data-i="' + target + '"]'); if (el) el.classList.add('hit'); }
  };
  $$('.lp').forEach(b => { b.onclick = () => select(+b.dataset.l); });
  const pad = $('#pad');
  pad.addEventListener('pointerdown', e => { audioCtx(); pad.classList.add('hitnow'); setTimeout(() => pad.classList.remove('hitnow'), 120); hit(e.clientX, e.clientY, null); });
  $('#circles').addEventListener('pointerdown', e => { const c = e.target.closest('.circ'); if (!c) return; audioCtx(); hit(e.clientX, e.clientY, +c.dataset.i); });
  btn.onclick = async () => {
    if (playing) { Player.stop(); setPlay(false); active = -1; drawCircles(); return; }
    const tok = Player.begin(); setPlay(true); drawCircles();
    const ok = await playLine(li, c => {
      active = c < LINES[li].chunks.length ? c : -1;
      $$('.circ').forEach((el, i) => el.classList.toggle('on', i === c));
    }, tok);
    if (!ok || !alive(tok)) return;
    active = -1; setPlay(false);
    if (!(await sleep(300, tok))) return;
    celebrate({ title: 'Great clapping!', again: () => btn.click(), next: () => { select((li + 1) % 4); btn.click(); } });
  };
  drawCircles();
}

function renderStars() {
  const earned = Math.min(state.stars, STICKERS.length);
  app.innerHTML = '<section class="screen stars">' + topbar('My stars') +
    '<div class="star-total" aria-label="' + state.stars + ' stars">' + ICON.star + '<span>' + state.stars + '</span></div>' +
    '<div class="stickers">' + STICKERS.map((_, i) => '<div class="stk' + (i < earned ? '' : ' locked') + (i === state.lastNew && i < earned ? ' new' : '') + '">' + stickerSVG(i) + '</div>').join('') + '</div></section>';
  if (state.lastNew >= 0) { state.lastNew = -1; save(); }
}

/* ------------------------------------------------------------------ */
/* Parent gate: press and hold for 3 seconds                           */
/* ------------------------------------------------------------------ */
function renderGate() {
  app.innerHTML = '<section class="screen">' + topbar('Grown-ups') +
    '<div class="gate"><button class="hold" id="hold" aria-label="Press and hold for 3 seconds">' +
    '<svg class="ring-svg" viewBox="0 0 150 150" aria-hidden="true"><circle cx="75" cy="75" r="68" fill="none" stroke="#F3D6AE" stroke-width="10"/><circle id="holdring" cx="75" cy="75" r="68" fill="none" stroke="#FF8A1F" stroke-width="10" stroke-linecap="round" stroke-dasharray="427.3" stroke-dashoffset="427.3"/></svg>' +
    '<span class="lockic">' + ICON.lock + '</span></button>' +
    '<p><b>For grown-ups:</b> press and hold the lock for 3 seconds.</p></div></section>';
  const hold = $('#hold'), ring = $('#holdring'), C = 427.3, HOLD = 3000;
  let t0 = 0, raf = 0;
  const reset = () => { cancelAnimationFrame(raf); t0 = 0; ring.style.strokeDashoffset = C; };
  const step = () => {
    const p = Math.min(1, (performance.now() - t0) / HOLD);
    ring.style.strokeDashoffset = (C * (1 - p)).toFixed(1);
    if (p >= 1) { parentOk = true; sfx.pop(); renderParent(); return; }
    raf = requestAnimationFrame(step);
  };
  const start = e => { if (e) e.preventDefault(); if (t0) return; t0 = performance.now(); raf = requestAnimationFrame(step); };
  hold.addEventListener('pointerdown', e => { try { hold.setPointerCapture(e.pointerId); } catch (x) {} start(e); });
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(ev => hold.addEventListener(ev, reset));
  hold.addEventListener('contextmenu', e => e.preventDefault());
  hold.addEventListener('keydown', e => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) start(e); });
  hold.addEventListener('keyup', reset);
}

/* ------------------------------------------------------------------ */
/* Recording (MediaRecorder -> IndexedDB)                              */
/* ------------------------------------------------------------------ */
const canRecord = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder && window.isSecureContext !== false);
let rec = null;
function pickMime() {
  const c = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus', 'audio/aac'];
  try { for (const m of c) if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(m)) return m; } catch (e) {}
  return '';
}
function stopRecording(cancel) {
  if (!rec) return;
  const r = rec;
  r.cancelled = !!cancel;
  clearInterval(r.iv);
  try { if (r.mr.state !== 'inactive') r.mr.stop(); } catch (e) {}
  if (cancel) { try { r.stream.getTracks().forEach(t => t.stop()); } catch (e) {} rec = null; }
}
async function startRecording(key, onChange, onMsg) {
  if (rec) stopRecording(false);
  Player.stop();
  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
  } catch (err) {
    const n = err && err.name;
    onMsg(n === 'NotAllowedError' || n === 'SecurityError'
      ? 'Microphone permission is blocked. Allow the microphone for this app in the browser\u2019s site settings, then try again. Until then the built-in voice is used.'
      : n === 'NotFoundError' || n === 'OverconstrainedError'
        ? 'No microphone was found on this device. The built-in voice will be used instead.'
        : 'The microphone could not be started (' + esc(n || 'error') + '). The built-in voice will be used instead.', true);
    return;
  }
  const mime = pickMime();
  let mr;
  try { mr = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream); }
  catch (e) { stream.getTracks().forEach(t => t.stop()); onMsg('Recording is not supported in this browser. The built-in voice will be used instead.', true); return; }
  const r = { key, mr, stream, chunks: [], t0: performance.now(), cancelled: false, iv: 0 };
  rec = r;
  mr.ondataavailable = e => { if (e.data && e.data.size) r.chunks.push(e.data); };
  mr.onstop = async () => {
    const dur = (performance.now() - r.t0) / 1000;
    try { stream.getTracks().forEach(t => t.stop()); } catch (e) {}
    if (rec === r) rec = null;
    if (r.cancelled || !r.chunks.length) { onChange(); return; }
    try {
      const blob = new Blob(r.chunks, { type: mr.mimeType || mime || 'audio/webm' });
      const data = await blob.arrayBuffer();
      await DB.put(key, { data, type: blob.type, duration: dur, created: Date.now() });
      invalidateRec(key);
      if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
      onMsg('Saved! Your voice is now used for ' + (key === 'full' ? 'the full mantra (Listen)' : REC_LABELS[REC_KEYS.indexOf(key)]) + '.', false);
    } catch (e) { onMsg('Could not save the recording on this device (storage error).', true); }
    onChange();
  };
  try { mr.start(250); } catch (e) { rec = null; stream.getTracks().forEach(t => t.stop()); onMsg('Recording could not start in this browser.', true); return; }
  r.iv = setInterval(() => {
    const el = $('#st-' + key); if (el) el.textContent = '\u25CF ' + fmtTime((performance.now() - r.t0) / 1000);
    if (performance.now() - r.t0 > 150000) stopRecording(false);
  }, 250);
  onChange();
}

let deferredInstall = null;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredInstall = e; const b = $('#install'); if (b) b.hidden = false; });
window.addEventListener('appinstalled', () => { deferredInstall = null; const b = $('#install'); if (b) b.hidden = true; });

/* ------------------------------------------------------------------ */
/* Parent area                                                         */
/* ------------------------------------------------------------------ */
function renderParent() {
  app.innerHTML = '<section class="screen parent-screen">' + topbar('Grown-ups') + '<div class="parent">' +
    '<div class="panel"><h2>Your voice</h2>' +
      '<p>Record each line slowly and clearly. For the full mantra, pause briefly between lines so the pictures change at the right time.</p>' +
      '<div class="note" id="vnote">A recorded parent voice sounds much better than the built-in computer voice. Once saved, it is used for all playback.</div>' +
      (canRecord ? '' : '<div class="note warn" id="nomic" style="margin-top:8px">Recording is not available here (no microphone / MediaRecorder, or the page is not on https). Everything still works with the built-in voice.</div>') +
      '<div class="note" id="recmsg" hidden style="margin-top:8px" role="status"></div>' +
      '<div id="recrows"></div>' +
      '<p class="small" id="vstat">' + esc(voiceStatus()) + '</p></div>' +
    '<div class="panel"><h2>Listen repeats</h2><p>How many times the full mantra plays in Listen (bead counter).</p>' +
      '<div class="seg" role="group" aria-label="Repeat count">' + REPEAT_OPTIONS.map(n => '<button class="pbtn' + (state.repeat === n ? ' sel' : '') + '" data-rep="' + n + '" aria-pressed="' + (state.repeat === n) + '">' + n + '</button>').join('') + '</div></div>' +
    '<div class="panel"><h2>Lines &amp; progress</h2><div class="switch-row"><p>Unlock all 4 lines<br><span class="small">Normally line 2 opens after line 1 is practised, and so on.</span></p><button class="switch" id="unlock" role="switch" aria-checked="' + state.unlockAll + '" aria-label="Unlock all lines"></button></div>' +
      '<p>Stars: <b>' + state.stars + '</b> &middot; Lines practised: <b>' + state.practised.filter(Boolean).length + '/4</b></p>' +
      '<div class="rec-btns"><button class="pbtn danger" id="reset">' + ICON.trash + ' Reset progress</button></div>' +
      '<p class="small">Reset clears stars, stickers and line progress. Recordings are kept.</p></div>' +
    '<div class="panel"><h2>Meaning to read aloud</h2><p><b>' + esc(OVERALL) + '</b></p><ul class="mlist">' +
      LINES.map(L => '<li><div class="d" lang="sa">' + L.deva + '</div><div><b>' + esc(L.roman) + '</b></div><div>' + esc(L.meaning) + '</div></li>').join('') + '</ul>' +
      '<p class="small">Gayatri Mantra (Rig Veda 3.62.10) with the traditional opening \u201cOm Bhur Bhuvah Svah\u201d. Savitur is the Sun, the giver of light and life.</p></div>' +
    '<div class="panel"><h2>App</h2><p>Works fully offline once opened. To install: Chrome menu \u22EE \u2192 <b>Install app</b> or <b>Add to Home screen</b>.</p>' +
      '<div class="rec-btns"><button class="pbtn" id="install"' + (deferredInstall ? '' : ' hidden') + '>Install app</button></div>' +
      '<p class="small">No ads, no accounts, no internet needed. Progress and recordings stay on this device only.</p></div>' +
    '</div></section>';

  const msg = (t, warn) => { const m = $('#recmsg'); if (!m) return; m.hidden = false; m.classList.toggle('warn', !!warn); m.innerHTML = t; };
  const drawRows = async () => {
    const have = {};
    for (const k of REC_KEYS) { const r = await DB.get(k); have[k] = r ? (r.duration || 0) : null; }
    const box = $('#recrows'); if (!box) return;
    box.innerHTML = REC_KEYS.map((k, i) => {
      const live = !!(rec && rec.key === k), h = have[k] != null;
      return '<div class="rec-row"><div class="rec-head"><div><b>' + REC_LABELS[i] + '</b> <span class="sub">' + (i < 4 ? esc(LINES[i].roman) : 'all 4 lines') + '</span></div>' +
        '<span class="status' + (live ? ' live' : h ? ' mine' : '') + '" id="st-' + k + '">' + (live ? '\u25CF 0:00' : h ? 'Your voice \u2713 ' + fmtTime(have[k]) : 'Built-in voice') + '</span></div>' +
        '<div class="rec-btns">' +
          '<button class="pbtn rec' + (live ? ' on' : '') + '" data-rec="' + k + '"' + (canRecord ? '' : ' disabled') + ' aria-label="' + (live ? 'Stop recording ' : 'Record ') + REC_LABELS[i] + '">' + (live ? ICON.stopS + ' Stop' : ICON.recDot + ' Record') + '</button>' +
          '<button class="pbtn" data-play="' + k + '"' + (live ? ' disabled' : '') + ' aria-label="Play ' + REC_LABELS[i] + '">' + ICON.playS + ' Play</button>' +
          '<button class="pbtn danger" data-del="' + k + '"' + (h && !live ? '' : ' disabled') + ' aria-label="Delete ' + REC_LABELS[i] + ' recording">' + ICON.trash + ' Delete</button>' +
        '</div></div>';
    }).join('');
  };
  drawRows();
  const root = $('.parent');
  const PLAY_HTML = ICON.playS + ' Play';
  root.addEventListener('click', async e => {
    const b = e.target.closest('button'); if (!b || b.disabled) return;
    if (b.dataset.rec) {
      const k = b.dataset.rec;
      if (rec && rec.key === k) { stopRecording(false); return; }
      $('#recmsg').hidden = true;
      await startRecording(k, drawRows, msg);
    } else if (b.dataset.play) {
      const k = b.dataset.play;
      if (b.dataset.on === '1') { Player.stop(); return; }
      const tok = Player.begin();
      $$('[data-play]').forEach(x => { x.dataset.on = ''; x.innerHTML = PLAY_HTML; });
      b.dataset.on = '1'; b.innerHTML = ICON.stopS + ' Stop';
      if (k === 'full') await playFull(() => {}, tok); else await playLine(+k.slice(4), () => {}, tok);
      if (b.isConnected && (alive(tok) || b.dataset.on === '1')) { b.dataset.on = ''; b.innerHTML = PLAY_HTML; }
    } else if (b.dataset.del) {
      const k = b.dataset.del;
      if (b.dataset.confirm !== '1') { b.dataset.confirm = '1'; b.innerHTML = ICON.trash + ' Sure?'; setTimeout(() => { if (b.isConnected) { b.dataset.confirm = ''; b.innerHTML = ICON.trash + ' Delete'; } }, 3500); return; }
      Player.stop();
      try { await DB.del(k); } catch (x) {}
      invalidateRec(k); msg('Recording deleted. The built-in voice will be used.', false); drawRows();
    } else if (b.dataset.rep) {
      state.repeat = +b.dataset.rep; save();
      $$('[data-rep]').forEach(x => { const on = +x.dataset.rep === state.repeat; x.classList.toggle('sel', on); x.setAttribute('aria-pressed', on); });
    } else if (b.id === 'unlock') {
      state.unlockAll = !state.unlockAll; save(); b.setAttribute('aria-checked', state.unlockAll);
    } else if (b.id === 'reset') {
      if (b.dataset.confirm !== '1') { b.dataset.confirm = '1'; b.innerHTML = ICON.trash + ' Tap again to reset'; setTimeout(() => { if (b.isConnected) { b.dataset.confirm = ''; b.innerHTML = ICON.trash + ' Reset progress'; } }, 3500); return; }
      state = Object.assign(JSON.parse(JSON.stringify(DEFAULT_STATE)), { repeat: state.repeat });
      save(); renderParent(); toast(ICON.check.replace(/currentColor/g, '#3DBE55') + '<span>Progress reset</span>');
    } else if (b.id === 'install' && deferredInstall) {
      deferredInstall.prompt(); try { await deferredInstall.userChoice; } catch (x) {} deferredInstall = null; b.hidden = true;
    }
  });
  if ('speechSynthesis' in window) setTimeout(() => { refreshVoices(); const v = $('#vstat'); if (v) v.textContent = voiceStatus(); }, 800);
}

/* ------------------------------------------------------------------ */
/* Boot                                                                */
/* ------------------------------------------------------------------ */
document.addEventListener('visibilitychange', () => { if (document.hidden) stopRecording(false); });
route();
if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
  window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js', { scope: './' }).catch(() => {}); });
}
window.__gk = { LINES, state: () => state, getRec, segmentsFor, canRecord };
})();
