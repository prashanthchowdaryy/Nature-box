import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Minus, Plus, RotateCcw, ShoppingBag, X } from 'lucide-react';
import { FruitArt, BowlSvg } from './fruits.jsx';

const BASE = import.meta.env.BASE_URL; // '/' locally, '/Nature-box/' on GitHub Pages

/* =====================================================================
   EDIT ME: every flavour, topping, price and nutrition number lives here.
   Nutrition values are approximate estimates per portion. Replace them
   with your own figures before publishing.
   price = rupees, kcal = calories, p = protein (g), c = carbs (g), f = fat (g)
   art = which realistic drawing to use (see src/fruits.jsx); photo = optional path to your own
   transparent PNG in /public (e.g. '/fruits/apple.png'), which replaces the drawing
   ===================================================================== */
const INK = '#14342A';
export const MAX_QTY = 3;
export const GOALS = { kcal: 500, p: 20, c: 80, f: 25 }; // sample meal targets the bars fill toward
const rupee = (n) => `\u20B9${Math.round(n)}`;

export const flavours = [
  { id: 'classic', name: 'Classic oats', art: 'oats', tone: '#EBD2A0', price: 55, kcal: 220, p: 9, c: 36, f: 5, portion: 'Base cup', note: 'Plain and creamy' },
  { id: 'banana', name: 'Banana oats', art: 'banana', photo: BASE + 'fruits/banana.png', tone: '#FFE08A', price: 65, kcal: 250, p: 9, c: 44, f: 5, portion: 'Base cup', note: 'Creamy with banana' },
  { id: 'chocolate', name: 'Chocolate oats', art: 'chocolate', tone: '#B07A52', price: 75, kcal: 270, p: 10, c: 44, f: 7, portion: 'Base cup', note: 'Rich cocoa' },
  { id: 'mango', name: 'Mango oats', art: 'mango', tone: '#FFC04D', price: 75, kcal: 255, p: 9, c: 45, f: 5, portion: 'Base cup', note: 'Sweet and sunny' },
  { id: 'strawberry', name: 'Strawberry oats', art: 'strawberry', photo: BASE + 'fruits/strawberry.png', tone: '#FFB3BE', price: 70, kcal: 245, p: 9, c: 42, f: 5, portion: 'Base cup', note: 'Fresh and fruity' },
  { id: 'blueberry', name: 'Blueberry oats', art: 'blueberry', photo: BASE + 'fruits/blueberry.png', tone: '#BBAAE6', price: 75, kcal: 245, p: 9, c: 42, f: 5, portion: 'Base cup', note: 'Tangy and bright' },
  { id: 'apple', name: 'Apple cinnamon oats', art: 'apple', photo: BASE + 'fruits/apple.png', tone: '#EBC590', price: 70, kcal: 250, p: 9, c: 44, f: 5, portion: 'Base cup', note: 'Warm and cosy' },
  { id: 'dryfruit', name: 'Dry fruits oats', art: 'nuts', photo: BASE + 'fruits/walnut.png', tone: '#E2B98C', price: 85, kcal: 290, p: 10, c: 42, f: 9, portion: 'Base cup', note: 'Nutty and filling' },
];

export const groups = [
  { id: 'flavour', title: 'Oats flavour', hint: 'Pick your base', single: true, items: flavours },
  {
    id: 'fruits', title: 'Fresh fruits', hint: 'Fruit goes right on top', scale: 1,
    items: [
      { id: 'strawberry-f', name: 'Strawberry', art: 'strawberry', photo: BASE + 'fruits/strawberry.png', scale: 0.95, portion: '50 g', price: 15, kcal: 16, p: 0.3, c: 3.8, f: 0.2 },
      { id: 'banana-f', name: 'Banana', art: 'banana', photo: BASE + 'fruits/banana.png', scale: 1.15, portion: '50 g', price: 10, kcal: 45, p: 0.5, c: 11.5, f: 0.2 },
      { id: 'blueberry-f', name: 'Blueberries', art: 'blueberry', photo: BASE + 'fruits/blueberry.png', scale: 0.95, portion: '40 g', price: 20, kcal: 23, p: 0.3, c: 5.8, f: 0.1 },
      { id: 'mango-f', name: 'Mango', art: 'mango', portion: '60 g', price: 15, kcal: 36, p: 0.5, c: 9, f: 0.2 },
      { id: 'apple-f', name: 'Apple', art: 'apple', photo: BASE + 'fruits/apple.png', scale: 1, portion: '60 g', price: 10, kcal: 31, p: 0.2, c: 8, f: 0.1 },
      { id: 'kiwi-f', name: 'Kiwi', art: 'kiwi', photo: BASE + 'fruits/kiwi.png', scale: 0.85, portion: '50 g', price: 15, kcal: 30, p: 0.6, c: 7, f: 0.2 },
      { id: 'grapes-f', name: 'Grapes', art: 'grapes', photo: BASE + 'fruits/grapes.png', scale: 0.95, portion: '50 g', price: 15, kcal: 35, p: 0.4, c: 9, f: 0.1 },
      { id: 'pineapple-f', name: 'Pineapple', art: 'pineapple', photo: BASE + 'fruits/pineapple.png', scale: 0.95, portion: '60 g', price: 15, kcal: 30, p: 0.3, c: 8, f: 0.1 },
      { id: 'cherry-f', name: 'Cherries', art: 'grapes', photo: BASE + 'fruits/cherry.png', scale: 0.7, portion: '50 g', price: 20, kcal: 25, p: 0.5, c: 6, f: 0.1 },
      { id: 'orange-f', name: 'Orange', art: 'orange', photo: BASE + 'fruits/orange.png', scale: 0.95, portion: '60 g', price: 10, kcal: 28, p: 0.5, c: 7, f: 0.1 },
    ],
  },
  {
    id: 'crunch', title: 'Dry fruits & seeds', hint: 'Crunch and good fats', scale: 0.55,
    items: [
      { id: 'almonds', name: 'Almonds', shape: 'almond', color: '#D9A86C', portion: '10 g', price: 20, kcal: 58, p: 2.1, c: 2.2, f: 5 },
      { id: 'cashews', name: 'Cashews', shape: 'cashew', color: '#F1D9A5', portion: '10 g', price: 20, kcal: 55, p: 1.8, c: 3, f: 4.4 },
      { id: 'walnuts', name: 'Walnuts', shape: 'walnut', photo: BASE + 'fruits/walnut.png', color: '#C69A6B', portion: '10 g', price: 25, kcal: 65, p: 1.5, c: 1.4, f: 6.5 },
      { id: 'pistachios', name: 'Pistachios', shape: 'pista', color: '#9FC45A', portion: '10 g', price: 30, kcal: 56, p: 2, c: 2.8, f: 4.5 },
      { id: 'pecans', name: 'Pecans', shape: 'walnut', photo: BASE + 'fruits/pecan.png', color: '#7A4A2B', portion: '10 g', price: 30, kcal: 69, p: 0.9, c: 1.4, f: 7.2 },
      { id: 'raisins', name: 'Raisins', shape: 'raisin', color: '#6B3E5E', portion: '10 g', price: 10, kcal: 30, p: 0.3, c: 8, f: 0 },
      { id: 'dates', name: 'Dates', shape: 'date', photo: BASE + 'fruits/dates.png', color: '#7A4A2B', portion: '15 g', price: 10, kcal: 42, p: 0.3, c: 11, f: 0 },
      { id: 'chia', name: 'Chia seeds', shape: 'dots', color: '#3B3B3B', portion: '5 g', price: 10, kcal: 24, p: 0.8, c: 2, f: 1.5 },
      { id: 'pumpkin', name: 'Pumpkin seeds', shape: 'seed', color: '#7DB04B', portion: '8 g', price: 10, kcal: 45, p: 2.4, c: 1, f: 3.9 },
      { id: 'flax', name: 'Flax seeds', shape: 'dots', color: '#9A5B2A', portion: '5 g', price: 10, kcal: 27, p: 0.9, c: 1.4, f: 2.1 },
    ],
  },
  {
    id: 'protein', title: 'Protein boost', hint: 'Make it a power bowl', scale: 0.8,
    items: [
      { id: 'pb', name: 'Peanut butter', shape: 'dollop', color: '#C98B4B', portion: '1 tbsp', price: 15, kcal: 95, p: 4, c: 3, f: 8 },
      { id: 'ab', name: 'Almond butter', shape: 'dollop', color: '#D8B07C', portion: '1 tbsp', price: 30, kcal: 98, p: 3.4, c: 3, f: 8.9 },
      { id: 'yogurt', name: 'Greek yogurt', shape: 'dollop', color: '#FFFFFF', portion: '50 g', price: 20, kcal: 30, p: 5, c: 2, f: 0.5 },
      { id: 'whey', name: 'Protein scoop', shape: 'dots', color: '#F6EBC8', portion: '1 scoop', price: 55, kcal: 100, p: 20, c: 2, f: 1.5 },
      { id: 'hemp', name: 'Hemp seeds', shape: 'seed', color: '#A9B87A', portion: '10 g', price: 20, kcal: 55, p: 3.2, c: 0.9, f: 4.4 },
    ],
  },
  {
    id: 'extras', title: 'Sweet extras', hint: 'A little something special', scale: 0.7,
    items: [
      { id: 'honey', name: 'Honey drizzle', art: 'honey', portion: '1 tsp', price: 10, kcal: 21, p: 0, c: 5.8, f: 0 },
      { id: 'choc', name: 'Dark choc chips', shape: 'chip', color: '#4B2A1D', portion: '10 g', price: 15, kcal: 54, p: 0.7, c: 5.5, f: 3.4 },
      { id: 'coconut', name: 'Coconut flakes', shape: 'flake', color: '#FFFFFF', portion: '8 g', price: 10, kcal: 53, p: 0.5, c: 2, f: 5 },
    ],
  },
];

groups.forEach((g) => g.items.forEach((i) => { i.scale = i.scale ?? g.scale ?? 1; }));
const byId = Object.fromEntries(groups.flatMap((g) => g.items.map((i) => [i.id, i])));
const toppingGroups = groups.filter((g) => !g.single);
const toppingIds = new Set(toppingGroups.flatMap((g) => g.items.map((i) => i.id)));

/* ---------- Maths shared with the bag ---------- */
export function calc(flavourId, picks) {
  const flavour = flavours.find((f) => f.id === flavourId) || flavours[0];
  const lines = Object.entries(picks).filter(([id, q]) => q > 0 && toppingIds.has(id)).map(([id, q]) => ({ item: byId[id], q }));
  const t = { price: flavour.price, kcal: flavour.kcal, p: flavour.p, c: flavour.c, f: flavour.f };
  for (const { item, q } of lines) {
    t.price += item.price * q; t.kcal += item.kcal * q; t.p += item.p * q; t.c += item.c * q; t.f += item.f * q;
  }
  return { flavour, lines, ...t };
}

export function makeBowl(flavourId, picks) {
  const r = calc(flavourId, picks);
  const adds = r.lines.map(({ item, q }) => `${item.name}${q > 1 ? ` x${q}` : ''}`);
  const detail = `Oats: ${r.flavour.name}${adds.length ? ` | Add-ons: ${adds.join(', ')}` : ''} | ~${Math.round(r.kcal)} kcal, ${r.p.toFixed(1)} g protein`;
  const signature = `${r.flavour.id}|${r.lines.map(({ item, q }) => `${item.id}:${q}`).sort().join(',')}`;
  return { name: 'Custom bowl', price: r.price, kcal: r.kcal, protein: r.p, detail, signature, tone: r.flavour.tone, flavourId: r.flavour.id, picks: { ...picks } };
}

/* ---------- Small helpers ---------- */
function rng(seed) {
  let a = 0;
  for (const ch of seed) a = (a * 31 + ch.charCodeAt(0)) | 0;
  return () => {
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const reduced = () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function useTween(value, ms = 450) {
  const [v, setV] = useState(value);
  const cur = useRef(value);
  useEffect(() => {
    const from = cur.current;
    if (from === value) return undefined;
    if (reduced()) { cur.current = value; setV(value); return undefined; }
    const t0 = performance.now();
    let raf;
    const tick = (t) => {
      const k = Math.min(1, (t - t0) / ms);
      const e = 1 - Math.pow(1 - k, 3);
      cur.current = from + (value - from) * e;
      setV(cur.current);
      if (k < 1) raf = requestAnimationFrame(tick);
      else { cur.current = value; setV(value); }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, ms]);
  return v;
}

function Glyph({ item }) {
  const [bad, setBad] = useState(false);
  if (item.photo && !bad) return <img className="gl gl-img" src={item.photo} alt="" onError={() => setBad(true)} />;
  return <FruitArt item={item} />;
}

/* ---------- The bowl ---------- */
function BowlStage({ flavour, lines, pulse, last }) {
  const instances = [];
  for (const { item, q } of lines) {
    for (let k = 0; k < q; k++) {
      const r = rng(`${item.id}-${k}`);
      instances.push({ key: `${item.id}-${k}`, item, x: 50 + (r() - 0.5) * 70, y: 33 + (r() - 0.5) * 20, rot: (r() - 0.5) * 70 });
    }
  }
  return (
    <div className="bowl-stage">
      <BowlSvg key={pulse} className="bowl-svg" tone={flavour.tone} />
      {instances.map(({ key, item, x, y, rot }) => (
        <span key={key} className="top" style={{ left: `${x}%`, top: `${y}%`, zIndex: Math.round(y * 10), '--rot': `${rot}deg`, '--s': item.scale }}>
          <Glyph item={item} />
        </span>
      ))}
      {last && <span className="pop" key={last.n}>{last.text}</span>}
    </div>
  );
}

function Stat({ label, value, unit, pct }) {
  return (
    <div className="stat">
      <b>{value}</b><span>{unit}</span><small>{label}</small>
      <i className="sbar" role="presentation"><u style={{ width: `${Math.min(100, Math.max(0, pct))}%` }} /></i>
    </div>
  );
}

/* ---------- Builder page ---------- */
export function BuilderPage({ onAddBowl, footer }) {
  const [flavourId, setFlavourId] = useState('banana');
  const [picks, setPicks] = useState({});
  const [open, setOpen] = useState('flavour');
  const [pulse, setPulse] = useState(0);
  const [last, setLast] = useState(null);

  const r = calc(flavourId, picks);
  const price = useTween(r.price);
  const kcal = useTween(r.kcal);
  const prot = useTween(r.p);
  const carb = useTween(r.c);
  const fat = useTween(r.f);
  const count = r.lines.reduce((s, l) => s + l.q, 0);

  const say = (text) => { setPulse((n) => n + 1); setLast({ n: Date.now(), text }); };

  const pick = (g, item) => {
    if (g.single) { setFlavourId(item.id); say(item.name); setOpen(null); return; }
    const q = picks[item.id] || 0;
    if (q >= MAX_QTY) { say(`Max ${MAX_QTY} of ${item.name}`); return; }
    setPicks((p) => ({ ...p, [item.id]: q + 1 }));
    say(`+ ${item.name}`);
  };
  const dec = (id) => setPicks((p) => {
    const n = { ...p }; const q = (n[id] || 0) - 1;
    if (q <= 0) delete n[id]; else n[id] = q;
    return n;
  });
  const inc = (id) => setPicks((p) => ((p[id] || 0) >= MAX_QTY ? p : { ...p, [id]: (p[id] || 0) + 1 }));
  const drop = (id) => setPicks((p) => { const n = { ...p }; delete n[id]; return n; });
  const reset = () => { setPicks({}); setLast(null); setPulse((n) => n + 1); };
  const submit = () => onAddBowl(makeBowl(flavourId, picks));

  return (
    <main>
      <section className="page-head bg-lime">
        <div className="wrap">
          <h1>Build your bowl</h1>
          <p className="lede">Choose your oats, then drop in fruits, dry fruits and protein. Calories, protein and price update as you go.</p>
        </div>
      </section>

      <section className="section builder">
        <div className="wrap build-grid">
          <div className="build-visual">
            <div className="bowl-card">
              <div className="bowl-top">
                <div><small>Your bowl</small><strong className="bowl-name">{r.flavour.name}</strong></div>
                <div className="bowl-price" aria-live="polite">{rupee(price)}</div>
              </div>
              <BowlStage flavour={r.flavour} lines={r.lines} pulse={pulse} last={last} />
              {r.lines.length > 0 ? (
                <div className="mini-chips" aria-label="In your bowl">
                  {r.lines.map(({ item, q }) => (
                    <button key={item.id} className="mini" onClick={() => dec(item.id)} aria-label={`Remove one ${item.name}`} title="Tap to remove one">
                      <Glyph item={item} />{q > 1 && <b>x{q}</b>}<X size={12} />
                    </button>
                  ))}
                </div>
              ) : <p className="bowl-hint">Open a step below and tap anything to drop it in.</p>}
              <div className="stats">
                <Stat label="Calories" value={Math.round(kcal)} unit="kcal" pct={(kcal / GOALS.kcal) * 100} />
                <Stat label="Protein" value={prot.toFixed(1)} unit="g" pct={(prot / GOALS.p) * 100} />
                <Stat label="Carbs" value={Math.round(carb)} unit="g" pct={(carb / GOALS.c) * 100} />
                <Stat label="Fat" value={Math.round(fat)} unit="g" pct={(fat / GOALS.f) * 100} />
              </div>
              <div className="goal"><small>Bars fill toward a sample meal: {GOALS.kcal} kcal, {GOALS.p} g protein, {GOALS.c} g carbs, {GOALS.f} g fat.</small></div>
              <button className="btn btn-dark add-bowl" onClick={submit}><ShoppingBag size={18} /> Add to bag &middot; {rupee(price)}</button>
            </div>
          </div>

          <div className="build-controls">
            {groups.map((g, i) => {
              const isOpen = open === g.id;
              const used = g.single ? 1 : g.items.reduce((s, it) => s + (picks[it.id] || 0), 0);
              return (
                <div key={g.id} className={isOpen ? 'acc open' : 'acc'}>
                  <button className="acc-head" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : g.id)}>
                    <span className="acc-n">{i + 1}</span>
                    <span className="acc-t"><strong>{g.title}</strong><small>{g.single ? r.flavour.name : (used ? `${used} added` : g.hint)}</small></span>
                    {!g.single && used > 0 && <span className="acc-badge">{used}</span>}
                    <ChevronDown className="acc-chev" size={22} />
                  </button>
                  <div className="acc-panel"><div>
                    <div className="opts">
                      {g.items.map((it) => {
                        const q = g.single ? (it.id === flavourId ? 1 : 0) : (picks[it.id] || 0);
                        return (
                          <button key={it.id} className={q ? 'opt on' : 'opt'} onClick={() => pick(g, it)} aria-pressed={q > 0}>
                            <span className="opt-art"><Glyph item={it} /></span>
                            <span className="opt-name">{it.name}</span>
                            <span className="opt-meta">{it.portion} &middot; {Math.round(it.kcal)} kcal &middot; {it.p}g protein</span>
                            <span className="opt-price">{g.single ? rupee(it.price) : `+${rupee(it.price)}`}</span>
                            {q > 0 && !g.single && <span className="opt-q">x{q}</span>}
                            {q > 0 && g.single && <span className="opt-q">Selected</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div></div>
                </div>
              );
            })}

            <div className="receipt">
              <div className="receipt-head"><h3>Your bowl</h3><button className="text-btn" onClick={reset}><RotateCcw size={15} /> Clear toppings</button></div>
              <ul>
                <li><span>{r.flavour.name} <small>base</small></span><b>{rupee(r.flavour.price)}</b></li>
                {r.lines.map(({ item, q }) => (
                  <li key={item.id}>
                    <span className="r-name"><Glyph item={item} /> {item.name}</span>
                    <span className="r-ctrl">
                      <button onClick={() => dec(item.id)} aria-label={`Remove one ${item.name}`}><Minus size={14} /></button>
                      <em>{q}</em>
                      <button onClick={() => inc(item.id)} aria-label={`Add one more ${item.name}`} disabled={q >= MAX_QTY}><Plus size={14} /></button>
                    </span>
                    <b>{rupee(item.price * q)}</b>
                    <button className="r-x" onClick={() => drop(item.id)} aria-label={`Remove ${item.name}`}><X size={14} /></button>
                  </li>
                ))}
              </ul>
              {count === 0 && <p className="muted">No toppings yet. Your base bowl is {rupee(r.flavour.price)}.</p>}
              <p className="receipt-total"><span>Total</span><b>{rupee(price)}</b></p>
              <p className="receipt-note">{Math.round(kcal)} kcal &middot; {prot.toFixed(1)} g protein &middot; {Math.round(carb)} g carbs &middot; {Math.round(fat)} g fat</p>
              <small className="muted">Nutrition values are approximate estimates.</small>
              <button className="btn btn-dark" onClick={submit}><ShoppingBag size={18} /> Add to bag &middot; {rupee(price)}</button>
            </div>
          </div>
        </div>
      </section>
      <p className="wrap credit">Fruit photos: Fruits-360 dataset by Mihai Oltean (CC BY-SA 4.0). Mango, almond, cashew, pistachio, raisin and seeds are illustrations until you add your own photos.</p>
      {footer}
    </main>
  );
}
