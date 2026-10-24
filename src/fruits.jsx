import React from 'react';

/* Realistic, shaded fruit / topping artwork drawn in SVG (no emoji, no stock photos).
   Every piece is drawn in a 64 x 64 box. <FruitDefs /> must be rendered once in the app. */

const ST = { stroke: 'rgba(0,0,0,0.28)', strokeWidth: 0.9, strokeLinejoin: 'round' };

const stops = (list) => list.map(([o, c, op], i) => <stop key={i} offset={o} stopColor={c} stopOpacity={op ?? 1} />);
const radial = (id, cx, cy, r, list) => <radialGradient key={id} id={id} cx={cx} cy={cy} r={r}>{stops(list)}</radialGradient>;
const linear = (id, x1, y1, x2, y2, list) => <linearGradient key={id} id={id} x1={x1} y1={y1} x2={x2} y2={y2}>{stops(list)}</linearGradient>;

export function FruitDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        {radial('gStraw', 0.38, 0.3, 0.85, [[0, '#FF8A80'], [0.4, '#E5262F'], [1, '#8E0F1C']])}
        {linear('gLeaf', 0, 0, 1, 1, [[0, '#8BC34A'], [1, '#2E7D32']])}
        {radial('gBanana', 0.5, 0.45, 0.6, [[0, '#FFFCE6'], [0.7, '#FBE9A0'], [1, '#EBCB63']])}
        {radial('gBlue', 0.35, 0.3, 0.8, [[0, '#8EA2EA'], [0.5, '#3446A6'], [1, '#141C58']])}
        {radial('gMango', 0.35, 0.35, 0.9, [[0, '#FFE680'], [0.55, '#FFB020'], [1, '#E8791A']])}
        {radial('gMangoBlush', 0.82, 0.3, 0.6, [[0, '#E5352B', 0.8], [1, '#E5352B', 0]])}
        {radial('gApple', 0.35, 0.3, 0.9, [[0, '#FF8F78'], [0.4, '#E0262F'], [1, '#7E0E1A']])}
        {radial('gKiwi', 0.5, 0.5, 0.5, [[0, '#F6FAD0'], [0.22, '#E4F08E'], [0.55, '#97D048'], [1, '#5CA62C']])}
        {radial('gGrape', 0.35, 0.3, 0.8, [[0, '#CFA2EE'], [0.5, '#7A38B5'], [1, '#391464']])}
        {linear('gPine', 0, 0, 1, 1, [[0, '#FFEE7A'], [0.6, '#F7C41A'], [1, '#DE9800']])}
        {radial('gOrange', 0.4, 0.35, 0.8, [[0, '#FFC878'], [0.6, '#FF9A1F'], [1, '#F27A00']])}
        {linear('gAlmond', 0, 0, 1, 1, [[0, '#EBC593'], [1, '#A36A36']])}
        {linear('gCashew', 0, 0, 1, 1, [[0, '#F8E6BB'], [1, '#D2A663']])}
        {radial('gWalnut', 0.35, 0.3, 0.8, [[0, '#E0B988'], [1, '#85592F']])}
        {radial('gPista', 0.4, 0.35, 0.7, [[0, '#C9E58A'], [1, '#6A9632']])}
        {radial('gRaisin', 0.35, 0.3, 0.8, [[0, '#A3648F'], [1, '#3A1C36']])}
        {linear('gDate', 0, 0, 1, 1, [[0, '#B3733F'], [1, '#4A2812']])}
        {linear('gChoc', 0, 0, 1, 1, [[0, '#744229'], [1, '#341A10']])}
        {linear('gHoney', 0.2, 0, 0.8, 1, [[0, '#FFDC5C'], [1, '#DE8E14']])}
        {radial('gOat', 0.4, 0.35, 0.8, [[0, '#FFF8E2'], [1, '#E5CC96']])}
      </defs>
    </svg>
  );
}

const ring = (n, r, cx = 32, cy = 32) => Array.from({ length: n }, (_, i) => {
  const a = (i / n) * Math.PI * 2;
  return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r, deg: (a * 180) / Math.PI };
});

const Shadow = ({ w = 18 }) => <ellipse cx="32" cy="60" rx={w} ry="2.6" fill="#000" opacity=".16" />;

const strawSeeds = [[22, 27], [30, 25], [38, 25], [46, 28], [17, 34], [25, 34], [33, 33], [41, 33], [49, 35], [21, 42], [29, 42], [37, 41], [45, 42], [26, 49], [34, 49], [41, 48], [32, 55]];

function berry(cx, cy, r, k) {
  return (
    <g key={k}>
      <circle cx={cx} cy={cy} r={r} fill="url(#gBlue)" {...ST} />
      <circle cx={cx} cy={cy} r={r} fill="#fff" opacity=".1" />
      <circle cx={cx - r * 0.35} cy={cy - r * 0.4} r={r * 0.24} fill="#fff" opacity=".4" />
      <g stroke="#0E1445" strokeWidth=".9" strokeLinecap="round" opacity=".85">
        {ring(5, r * 0.3, cx, cy - r * 0.05).map((p, i) => <line key={i} x1={cx} y1={cy - r * 0.05} x2={p.x} y2={p.y} />)}
      </g>
      <circle cx={cx} cy={cy - r * 0.05} r={r * 0.12} fill="#0E1445" />
    </g>
  );
}

function grape(cx, cy, k) {
  return (
    <g key={k}>
      <circle cx={cx} cy={cy} r="9.6" fill="url(#gGrape)" {...ST} />
      <ellipse cx={cx - 3.2} cy={cy - 3.6} rx="2.8" ry="1.9" fill="#fff" opacity=".5" transform={`rotate(-30 ${cx - 3.2} ${cy - 3.6})`} />
    </g>
  );
}

const drawings = {
  strawberry: () => (
    <g>
      <Shadow />
      <path d="M32 59C18 51 8 37 10 25C12 14 23 11 32 15C41 11 52 14 54 25C56 37 46 51 32 59Z" fill="url(#gStraw)" {...ST} />
      {strawSeeds.map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="1.1" ry="1.7" fill="#FFE9A6" stroke="#7A0C18" strokeOpacity=".5" strokeWidth=".35" transform={`rotate(${(x - 32) * 1.2} ${x} ${y})`} />)}
      <ellipse cx="22" cy="27" rx="5.5" ry="9" fill="#fff" opacity=".26" transform="rotate(20 22 27)" />
      <path d="M32 17C26 9 17 11 14 15C21 15 26 18 32 17ZM32 17C38 9 47 11 50 15C43 15 38 18 32 17ZM32 17C28 12 29 8 32 4C35 8 36 12 32 17ZM32 17C24 15 20 19 21 23C26 21 29 19 32 17ZM32 17C40 15 44 19 43 23C38 21 35 19 32 17Z" fill="url(#gLeaf)" stroke="#1B5E20" strokeOpacity=".5" strokeWidth=".6" />
    </g>
  ),
  banana: () => (
    <g>
      <Shadow />
      <ellipse cx="32" cy="32" rx="25" ry="24" fill="#E6BF45" {...ST} />
      <ellipse cx="32" cy="32" rx="22.5" ry="21.5" fill="url(#gBanana)" />
      <ellipse cx="32" cy="32" rx="22.5" ry="21.5" fill="none" stroke="#F4DB8A" strokeWidth="1.2" opacity=".8" />
      <ellipse cx="32" cy="32" rx="9.5" ry="8.5" fill="#EBD07F" opacity=".85" />
      {[[32, 26.5], [37.5, 30], [36, 36.5], [28, 36.5], [26.5, 30], [32, 32]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx=".95" ry="1.5" fill="#46301E" />)}
      <ellipse cx="22" cy="21" rx="9" ry="3.8" fill="#fff" opacity=".42" transform="rotate(-30 22 21)" />
    </g>
  ),
  blueberry: () => (
    <g>
      <Shadow w={20} />
      {berry(22, 40, 15, 'a')}
      {berry(43, 38, 14, 'b')}
      {berry(32, 22, 13, 'c')}
    </g>
  ),
  mango: () => (
    <g>
      <Shadow />
      <path d="M10 36C8 18 24 7 41 11C56 15 59 34 49 47C41 57 24 58 16 51C12 48 10 43 10 36Z" fill="url(#gMango)" {...ST} />
      <path d="M10 36C8 18 24 7 41 11C56 15 59 34 49 47C41 57 24 58 16 51C12 48 10 43 10 36Z" fill="url(#gMangoBlush)" />
      <ellipse cx="24" cy="23" rx="9" ry="4.8" fill="#fff" opacity=".36" transform="rotate(-25 24 23)" />
      <path d="M33 11C34 7 36 5 38 5" stroke="#6B4A1F" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M38 6C44 1 52 3 54 8C48 10 42 10 38 6Z" fill="url(#gLeaf)" stroke="#1B5E20" strokeOpacity=".5" strokeWidth=".6" />
    </g>
  ),
  apple: () => (
    <g>
      <Shadow />
      <path d="M32 19C24 12 9 16 9 34C9 48 20 59 28 59C30 59 31 58 32 58C33 58 34 59 36 59C44 59 55 48 55 34C55 16 40 12 32 19Z" fill="url(#gApple)" {...ST} />
      <path d="M44 24C50 30 51 42 44 52" stroke="#FFB199" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity=".35" />
      <ellipse cx="20" cy="27" rx="5" ry="8.5" fill="#fff" opacity=".34" transform="rotate(22 20 27)" />
      <path d="M32 19C32 13 33 9 36 6" stroke="#5D3A1A" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M36 9C42 3 51 5 53 10C47 13 40 13 36 9Z" fill="url(#gLeaf)" stroke="#1B5E20" strokeOpacity=".5" strokeWidth=".6" />
    </g>
  ),
  kiwi: () => (
    <g>
      <Shadow />
      <circle cx="32" cy="32" r="25" fill="#9A7B4B" {...ST} />
      <circle cx="32" cy="32" r="23" fill="url(#gKiwi)" />
      <g stroke="#fff" strokeOpacity=".28" strokeWidth=".8">
        {ring(28, 1).map((p, i) => { const a = (p.deg * Math.PI) / 180; return <line key={i} x1={32 + Math.cos(a) * 8} y1={32 + Math.sin(a) * 8} x2={32 + Math.cos(a) * 20} y2={32 + Math.sin(a) * 20} />; })}
      </g>
      <ellipse cx="32" cy="32" rx="6.8" ry="6.2" fill="#FBFCE3" opacity=".95" />
      {ring(18, 11.5).map((p, i) => <ellipse key={i} cx={p.x} cy={p.y} rx=".95" ry="1.9" fill="#1E1E1E" transform={`rotate(${p.deg + 90} ${p.x} ${p.y})`} />)}
      <ellipse cx="22" cy="21" rx="8" ry="3.4" fill="#fff" opacity=".3" transform="rotate(-35 22 21)" />
    </g>
  ),
  grapes: () => (
    <g>
      <Shadow w={20} />
      {grape(32, 48, 'f')}
      {grape(26, 35, 'd')}
      {grape(38, 35, 'e')}
      {grape(20, 22, 'a')}
      {grape(32, 22, 'b')}
      {grape(44, 22, 'c')}
      <path d="M32 14C32 8 34 5 38 4" stroke="#5D3A1A" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M36 6C42 1 50 3 52 8C46 10 40 10 36 6Z" fill="url(#gLeaf)" stroke="#1B5E20" strokeOpacity=".5" strokeWidth=".6" />
    </g>
  ),
  pineapple: () => (
    <g>
      <Shadow />
      <path d="M9 40L26 13C35 10 49 14 55 25L42 52C31 57 17 53 9 40Z" fill="url(#gPine)" {...ST} />
      <path d="M26 13C35 10 49 14 55 25C45 22 34 20 26 13Z" fill="#FFF3A8" opacity=".7" />
      <g stroke="#CC8A00" strokeOpacity=".5" strokeWidth=".9" fill="none" strokeLinecap="round">
        <path d="M17 39C23 31 28 25 33 18" /><path d="M24 46C31 37 37 30 42 22" /><path d="M33 51C39 43 44 37 48 30" /><path d="M13 43C19 41 24 38 28 34" /><path d="M30 28C36 28 42 27 47 25" />
      </g>
      <ellipse cx="33" cy="33" rx="5" ry="9" fill="#FFF6C2" opacity=".5" transform="rotate(30 33 33)" />
      <ellipse cx="22" cy="28" rx="6" ry="2.6" fill="#fff" opacity=".35" transform="rotate(-55 22 28)" />
    </g>
  ),
  orange: () => (
    <g>
      <Shadow />
      <circle cx="32" cy="32" r="26" fill="#F08400" {...ST} />
      <circle cx="32" cy="32" r="23.5" fill="#FFF1D4" />
      <circle cx="32" cy="32" r="21" fill="url(#gOrange)" />
      <g stroke="#FFF1D4" strokeWidth="1.5" strokeLinecap="round">
        {ring(9, 1).map((p, i) => { const a = (p.deg * Math.PI) / 180; return <line key={i} x1="32" y1="32" x2={32 + Math.cos(a) * 21} y2={32 + Math.sin(a) * 21} />; })}
      </g>
      {ring(9, 12, 32, 32).map((p, i) => <ellipse key={i} cx={p.x} cy={p.y} rx="1.3" ry="3" fill="#fff" opacity=".3" transform={`rotate(${p.deg + 90} ${p.x} ${p.y})`} />)}
      <circle cx="32" cy="32" r="2.3" fill="#FFF1D4" />
    </g>
  ),
  chocolate: () => (
    <g>
      <Shadow w={20} />
      <rect x="9" y="12" width="46" height="42" rx="5" fill="url(#gChoc)" {...ST} />
      <path d="M9 33H55M32 12V54" stroke="#24110A" strokeWidth="1.7" opacity=".7" />
      {[[13, 16], [35, 16], [13, 37], [35, 37]].map(([x, y], i) => <rect key={i} x={x} y={y} width="16" height="13" rx="2.5" fill="#fff" opacity=".13" />)}
    </g>
  ),
  oats: () => (
    <g>
      <Shadow w={20} />
      {[[20, 22, -20], [40, 20, 25], [30, 36, 70], [16, 44, 10], [46, 42, -35], [32, 52, 15]].map(([x, y, r], i) => (
        <g key={i} transform={`rotate(${r} ${x} ${y})`}>
          <ellipse cx={x} cy={y} rx="11" ry="7" fill="url(#gOat)" {...ST} />
          <path d={`M${x - 6} ${y}H${x + 6}`} stroke="#B89A5E" strokeWidth=".8" opacity=".6" strokeLinecap="round" />
        </g>
      ))}
    </g>
  ),
  honey: () => (
    <g>
      <Shadow w={14} />
      <path d="M32 5C32 5 14 27 14 40C14 51 22 58 32 58C42 58 50 51 50 40C50 27 32 5 32 5Z" fill="url(#gHoney)" {...ST} />
      <ellipse cx="25" cy="38" rx="4" ry="9" fill="#fff" opacity=".42" transform="rotate(12 25 38)" />
    </g>
  ),
};

/* Dry fruits, seeds and spreads (drawn on a 24 grid, scaled up) */
const dots = [[7, 8], [13, 6], [17, 11], [9, 13], [14, 16], [6, 18], [18, 18], [11, 10]];
const NS = { stroke: 'rgba(0,0,0,0.3)', strokeWidth: 0.7, strokeLinejoin: 'round', strokeLinecap: 'round' };
const small = {
  almond: () => (<g><path d="M12 2.5C18 7 19 15 12 21.5C5 15 6 7 12 2.5Z" fill="url(#gAlmond)" {...NS} /><path d="M12 6C14 10 14 15 12 19" stroke="#7A4A22" strokeOpacity=".4" strokeWidth=".7" fill="none" /><ellipse cx="9.8" cy="9" rx="1.2" ry="3" fill="#fff" opacity=".3" /></g>),
  cashew: () => (<g><path d="M4.5 14C3.5 8 9.5 3.5 16 5.5C20.5 7 20.5 12 16.5 11C13.5 10.5 12.5 13.5 14.5 17C11 20.5 5.5 19.5 4.5 14Z" fill="url(#gCashew)" {...NS} /><ellipse cx="9" cy="8.5" rx="3" ry="1.2" fill="#fff" opacity=".4" transform="rotate(-25 9 8.5)" /></g>),
  walnut: () => (<g><circle cx="12" cy="12" r="8" fill="url(#gWalnut)" {...NS} /><path d="M12 4.5V19.5M8 7C10 11 10 13 8 17M16 7C14 11 14 13 16 17" fill="none" stroke="#5E3C1D" strokeOpacity=".6" strokeWidth=".7" strokeLinecap="round" /><ellipse cx="8.5" cy="8" rx="2" ry="1.2" fill="#fff" opacity=".3" /></g>),
  pista: () => (<g><ellipse cx="12" cy="12" rx="6.5" ry="8.5" fill="#D9C79A" {...NS} /><ellipse cx="12" cy="12.5" rx="3.6" ry="5.6" fill="url(#gPista)" /><ellipse cx="11" cy="10" rx=".9" ry="1.8" fill="#fff" opacity=".35" /></g>),
  raisin: () => (<g><circle cx="12" cy="12" r="6.5" fill="url(#gRaisin)" {...NS} /><path d="M8.5 10C10 11 10.5 12.5 9.5 14M14 9C15 10.5 15 12 14.2 13.5" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth=".8" strokeLinecap="round" /></g>),
  date: () => (<g><rect x="6" y="3.5" width="12" height="17" rx="6" fill="url(#gDate)" {...NS} /><path d="M9.5 8V15" stroke="#fff" strokeOpacity=".3" strokeWidth="1" strokeLinecap="round" /></g>),
  seed: (it) => (<g><path d="M12 3.5C18.5 8 18.5 16 12 20.5C5.5 16 5.5 8 12 3.5Z" fill={it.color} {...NS} /><path d="M12 7V17" stroke="#fff" strokeOpacity=".5" strokeWidth=".8" strokeLinecap="round" /><ellipse cx="9.5" cy="9.5" rx="1" ry="2.5" fill="#fff" opacity=".25" /></g>),
  dots: (it) => (<g>{dots.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2.6 : 2.1} fill={it.color} stroke="rgba(0,0,0,.4)" strokeWidth=".6" />)}</g>),
  dollop: (it) => (<g><path d="M4.5 17.5Q3.5 12 9 12Q8 7.5 12 6.5Q16 7.5 15 12Q20.5 12 19.5 17.5Q19.5 21 12 21Q4.5 21 4.5 17.5Z" fill={it.color} {...NS} /><ellipse cx="9.5" cy="15" rx="2.6" ry="1.2" fill="#fff" opacity=".4" /></g>),
  chip: (it) => <path d="M12 4L20 18H4Z" fill={it.color} {...NS} />,
  flake: (it) => (<g><path d="M3.5 16C5.5 8 14 4.5 20.5 8C18.5 14.5 12 19.5 3.5 16Z" fill={it.color} {...NS} /><path d="M7 14C10 10 14 8.5 18 8.5" stroke="#CFC7B0" strokeWidth=".6" fill="none" strokeLinecap="round" /></g>),
};
small.nuts = (it) => (
  <g>
    <g transform="translate(-3 3) rotate(-20 12 12)">{small.almond(it)}</g>
    <g transform="translate(5 -2) scale(.9)">{small.cashew(it)}</g>
    <g transform="translate(4 7) scale(.7)">{small.walnut(it)}</g>
  </g>
);

export function FruitArt({ item }) {
  const key = item.art || item.shape;
  const big = drawings[key];
  return (
    <svg className="gl gl-svg" viewBox="0 0 64 64" aria-hidden="true">
      {big ? big(item) : <g transform="scale(2.6667)">{(small[key] || small.dots)(item)}</g>}
    </svg>
  );
}

/* Photo-real ceramic bowl with a textured oats surface */
const flakes = Array.from({ length: 46 }, (_, i) => {
  const h = (n) => { const x = Math.sin(i * 127.1 + n * 311.7) * 43758.5453; return x - Math.floor(x); };
  const a = h(1) * Math.PI * 2; const r = Math.sqrt(h(2));
  return { x: 200 + Math.cos(a) * r * 128, y: 122 + Math.sin(a) * r * 29, rx: 4 + h(3) * 5, ry: 2 + h(4) * 2.2, rot: h(5) * 180 };
});

export function BowlSvg({ tone = '#F3D78E', className, ...rest }) {
  return (
    <svg className={className} viewBox="0 0 400 300" aria-hidden="true" {...rest}>
      <defs>
        <linearGradient id="bBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#B9B2A3" /><stop offset=".1" stopColor="#EEE9DF" /><stop offset=".32" stopColor="#FFFFFF" />
          <stop offset=".65" stopColor="#EDE8DD" /><stop offset=".9" stopColor="#C9C2B3" /><stop offset="1" stopColor="#A9A293" />
        </linearGradient>
        <linearGradient id="bBodyV" x1="0" y1="0" x2="0" y2="1"><stop offset=".35" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#3A3328" stopOpacity=".32" /></linearGradient>
        <linearGradient id="bRim" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFFFFF" /><stop offset="1" stopColor="#D8D2C5" /></linearGradient>
        <radialGradient id="bInner" cx=".5" cy=".85" r=".8"><stop offset="0" stopColor="#F3EEE3" /><stop offset=".7" stopColor="#D4CDBE" /><stop offset="1" stopColor="#9E9686" /></radialGradient>
        <radialGradient id="bSheen" cx=".35" cy=".25" r=".7"><stop offset="0" stopColor="#fff" stopOpacity=".5" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
        <linearGradient id="bFoot" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#A9A293" /><stop offset=".3" stopColor="#F2EEE4" /><stop offset=".7" stopColor="#D9D3C5" /><stop offset="1" stopColor="#9A9384" /></linearGradient>
        <filter id="bBlur" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="7" /></filter>
        <filter id="bBlurS" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="2.2" /></filter>
        <filter id="bOats" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.09" numOctaves="4" seed="7" result="n" />
          <feDiffuseLighting in="n" lightingColor="#ffffff" surfaceScale="2.6" result="l"><feDistantLight azimuth="235" elevation="52" /></feDiffuseLighting>
          <feComposite in="SourceGraphic" in2="l" operator="arithmetic" k1="1.35" k2="0" k3="0" k4="0" />
        </filter>
      </defs>
      <ellipse cx="200" cy="283" rx="150" ry="15" fill="#2A2418" opacity=".3" filter="url(#bBlur)" />
      <ellipse cx="200" cy="281" rx="92" ry="6" fill="#1E190F" opacity=".4" filter="url(#bBlurS)" />
      <path d="M146 258H254L250 281Q200 289 150 281Z" fill="url(#bFoot)" stroke="rgba(0,0,0,.2)" strokeWidth="1.2" />
      <path d="M30 116C30 232 110 274 200 274C290 274 370 232 370 116Z" fill="url(#bBody)" stroke="rgba(0,0,0,.18)" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M30 116C30 232 110 274 200 274C290 274 370 232 370 116Z" fill="url(#bBodyV)" />
      <path d="M52 146C58 206 98 244 148 258" fill="none" stroke="#fff" strokeOpacity=".8" strokeWidth="9" strokeLinecap="round" filter="url(#bBlurS)" />
      <path d="M342 150C336 196 312 230 280 247" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="5" strokeLinecap="round" filter="url(#bBlurS)" />
      <ellipse cx="200" cy="116" rx="170" ry="53" fill="url(#bRim)" stroke="rgba(0,0,0,.2)" strokeWidth="1.5" />
      <ellipse cx="200" cy="121" rx="157" ry="45" fill="url(#bInner)" stroke="rgba(0,0,0,.18)" strokeWidth="1.5" />
      <ellipse className="oats-fill" cx="200" cy="124" rx="148" ry="37" style={{ fill: tone }} filter="url(#bOats)" />
      <g>
        {flakes.map((f, i) => <ellipse key={i} cx={f.x} cy={f.y} rx={f.rx} ry={f.ry} fill="#FFF6DC" fillOpacity=".5" stroke="#8A6A32" strokeOpacity=".28" strokeWidth=".6" transform={`rotate(${f.rot} ${f.x} ${f.y})`} />)}
      </g>
      <ellipse cx="200" cy="124" rx="148" ry="37" fill="url(#bSheen)" />
      <ellipse cx="200" cy="124" rx="148" ry="37" fill="none" stroke="#3A2A12" strokeOpacity=".25" strokeWidth="3" filter="url(#bBlurS)" />
      <path d="M52 112C80 76 140 66 200 66C260 66 320 76 348 112" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="3" strokeLinecap="round" filter="url(#bBlurS)" />
    </svg>
  );
}

/* Home page promo: real fruit falling into a bowl */
export function PromoBowl() {
  return (
    <>
      <BowlSvg className="pb" tone="#F1D58A" />
      {['strawberry', 'banana', 'blueberry', 'orange'].map((a, i) => (
        <i key={a} style={{ '--d': `${i * 0.45}s` }}><img className="gl gl-img" src={`/fruits/${a}.png`} alt="" /></i>
      ))}
    </>
  );
}
