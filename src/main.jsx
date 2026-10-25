import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Check, Clock3, Instagram, MapPin, Menu as MenuIcon, Phone, MessageCircle, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import { BuilderPage } from './builder.jsx';
import { FruitDefs } from './fruits.jsx';
import './styles.css';

const BASE = import.meta.env.BASE_URL; // '/' locally, '/Nature-box/' on GitHub Pages

/* ---------- Edit these ---------- */
const business = {
  whatsappNumber: '918374335934', // country code + number, digits only
  phoneDisplay: '+91 83743 35934',
  locationText: 'Add your stall location',
  hoursText: 'Add your opening hours',
  instagramUrl: '',
};

// kind: 'fruit' | 'oats'. tone: tile background colour.
// photo: optional path to your own photo (e.g. '/photos/everyday-box.jpg' inside /public). Leave '' to use the illustration.
const products = [
  { id: 'classic-fruit', kind: 'fruit', name: 'The Everyday Box', category: 'Fruit boxes', price: 50, tone: '#D6EA72', photo: BASE + 'photos/everyday-box.webp', note: 'A colourful mix of fresh-cut fruit.', description: 'A colourful mix of fresh, ready-to-eat fruit. The exact selection follows what is fresh and in season.' },
  { id: 'seasonal-fruit', kind: 'fruit', name: 'Seasonal Fruit Box', category: 'Fruit boxes', price: 65, tone: '#FFB3BE', photo: BASE + 'photos/seasonal-box.webp', note: 'A bigger box built around the best fruit of the day.', description: 'A generous box built around the best fruit available that day, prepared fresh for an easy snack.' },
  { id: 'banana-oats', kind: 'oats', name: 'Banana Oats Cup', category: 'Oats', price: 65, tone: '#FFE08A', photo: BASE + 'photos/banana-oats-cup.webp', note: 'Creamy oats with banana.', description: 'A filling oats cup with banana. Ask us about today\u2019s toppings.' },
  { id: 'fruit-oats', kind: 'oats', name: 'Chocolate Banana Oats Cup', category: 'Oats', price: 85, tone: '#FFD3A1', photo: BASE + 'photos/chocolate-banana-oats.webp', note: 'Chocolate oats topped with banana and nuts.', description: 'Creamy chocolate overnight oats topped with banana, chocolate chips and nuts. Ask us about today\u2019s toppings.' },
  { id: 'sprout-salad', kind: 'oats', name: 'Sprout Salad Cup', category: 'Sprouts', price: 55, tone: '#D6EA72', photo: BASE + 'photos/sprout-salad-cup.webp', note: 'Fresh sprouts with veggies, pomegranate and lime.', description: 'A crunchy, protein-rich cup of fresh sprouts tossed with chopped vegetables, pomegranate and a squeeze of lime.' },
  { id: 'sattu-drink', kind: 'oats', name: 'Sattu Drink', category: 'Sattu Instants', price: 40, tone: '#FFC83D', photo: BASE + 'photos/sattu-drink.webp', note: 'Cooling roasted-gram sattu, salt and lemon.', description: 'A traditional sattu drink with lemon, mint and a pinch of spice. Filling, cooling and full of plant protein.' },
  { id: 'sattu-packet', kind: 'oats', name: 'Sattu Instant Packet', category: 'Sattu Instants', price: 35, tone: '#FFE08A', photo: BASE + 'photos/sattu-packet.webp', note: 'Just add water and mix. Salt and lemon flavour.', description: 'Our instant sattu drink mix. Tear the packet, stir it into a glass of water and your cooling salt and lemon sattu drink is ready in a minute.' },
  { id: 'energy-ladu', kind: 'oats', name: 'Seed and Nut Energy Ladu', category: 'Energy Ladu', price: 35, tone: '#FFC83D', photo: BASE + 'photos/energy-ladu.webp', note: 'Dates, nuts and seeds rolled into an energy ball.', description: 'Hand-rolled ladu made from dates, almonds and mixed seeds. A natural, no-fuss energy boost.' },
  { id: 'lemon-water', kind: 'oats', name: 'Lemon Water', category: 'Drinks', price: 30, tone: '#FFE08A', photo: BASE + 'photos/lemon-water.webp', note: 'Fresh lemon, mint and a pinch of rock salt.', description: 'Fresh lemon water with mint and a pinch of rock salt. Light, refreshing and good any time of day.' },
];

const heroSlides = [
  { src: BASE + 'photos/hero-1.webp', alt: 'A Nature Box fruit box beside banana and chocolate oats cups' },
  { src: BASE + 'photos/hero-2.webp', alt: 'Fruit box, sattu drink, sprout salad cup, oats cup and energy ladu' },
  { src: BASE + 'photos/hero-3.webp', alt: 'Fruit box with a sprout salad cup and seed and nut energy ladu' },
  { src: BASE + 'photos/hero-4.webp', alt: 'Banana oats, sattu drink, fruit box and fresh ingredients' },
  { src: BASE + 'photos/hero-5.webp', alt: 'Sattu drink, fruit box, sprout salad cup and energy ladu' },
  { src: BASE + 'photos/sattu-packet.webp', alt: 'Nature Box instant sattu drink packet, salt and lemon' },
];
const SLIDE_MS = 2000;

function HeroSlider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [bad, setBad] = useState([]);
  const slides = heroSlides.filter((s) => !bad.includes(s.src));
  const cur = i % slides.length;
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), SLIDE_MS);
    return () => clearInterval(t);
  }, [paused, i, slides.length]);
  return (
    <div className="hero-art" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="hero-slides">
        {slides.map((s, n) => (
          <img key={s.src} className={n === cur ? 'hero-photo on' : 'hero-photo'} src={s.src} alt={s.alt} aria-hidden={n !== cur} width="1312" height="1199" fetchpriority={n === 0 ? 'high' : undefined} onError={() => setBad((b) => [...b, s.src])} />
        ))}
      </div>
      <div className="hero-dots" role="group" aria-label="Choose picture">
        {slides.map((s, n) => <button key={s.src} className={n === cur ? 'dot on' : 'dot'} onClick={() => setI(n)} aria-label={`Show picture ${n + 1}`} aria-pressed={n === cur} />)}
      </div>
      <span className="sticker" aria-hidden="true">Cut<br />fresh<br />today</span>
    </div>
  );
}

/* ---------- Illustrations ---------- */
const INK = '#14342A';
const lines = { stroke: INK, strokeWidth: 4, strokeLinejoin: 'round', strokeLinecap: 'round' };

function Mark() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill="#D6EA72" stroke={INK} strokeWidth="2.5" />
      <path d="M20 31V16M20 24C13 24 10 19 10 14c6 0 10 3 10 10ZM20 21c0-6 3-9 10-9 0 6-4 9-10 9Z" fill="#fff" stroke={INK} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function FruitArt({ className }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      <g {...lines}>
        <circle cx="104" cy="62" r="24" fill="#BEE04A" />
        <circle cx="104" cy="62" r="16" fill="#E6F4A6" strokeWidth="0" />
        <path d="M104 46V78M90 54L118 70M118 54L90 70" strokeWidth="2.5" />
        <circle cx="58" cy="94" r="28" fill="#FFA62B" />
        <circle cx="58" cy="94" r="19" fill="#FFD58A" strokeWidth="0" />
        <path d="M58 75V113M41 84L75 104M75 84L41 104" strokeWidth="2.5" />
        <path d="M96 100A34 34 0 0 1 164 100Z" fill="#3FA34D" />
        <path d="M103 100A27 27 0 0 1 157 100Z" fill="#FF5C70" strokeWidth="0" />
        <g fill={INK} stroke="none"><circle cx="118" cy="90" r="2.5" /><circle cx="130" cy="84" r="2.5" /><circle cx="142" cy="90" r="2.5" /></g>
        <path d="M26 100H174L164 170Q163 178 155 178H45Q37 178 36 170Z" fill="#fff" />
        <path d="M29 120H171" />
        <path d="M100 166V146M100 156C92 156 88 151 88 145C95 145 100 149 100 156ZM100 152C100 146 103 143 109 143C109 148 106 152 100 152Z" fill="#BEE04A" strokeWidth="3" />
      </g>
    </svg>
  );
}

function OatsArt({ className }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      <g {...lines}>
        <path d="M40 100Q40 68 100 68Q160 68 160 100Z" fill="#F0D49C" />
        <g fill="#FFE066" strokeWidth="3">
          <circle cx="76" cy="78" r="12" /><circle cx="104" cy="70" r="12" /><circle cx="132" cy="79" r="12" />
        </g>
        <g fill="#FF5C70" strokeWidth="3"><circle cx="90" cy="90" r="6" /><circle cx="119" cy="91" r="6" /></g>
        <path d="M44 100H156L144 176Q143 184 135 184H65Q57 184 56 176Z" fill="#fff" />
        <path d="M50 126H150L147 152H53Z" fill={INK} />
        <path d="M100 148C90 148 86 140 88 134C96 134 102 140 100 148Z" fill="#BEE04A" strokeWidth="2.5" />
      </g>
    </svg>
  );
}

function Art({ product }) {
  const [src, setSrc] = useState(product.photo || '');
  useEffect(() => { setSrc(product.photo || ''); }, [product.photo]);
  if (src) {
    return <img className="photo" src={src} alt={product.name} loading="lazy" onError={() => setSrc(product.fallbackPhoto && src !== product.fallbackPhoto ? product.fallbackPhoto : '')} />;
  }
  return product.kind === 'oats' ? <OatsArt /> : <FruitArt />;
}

/* ---------- Shop state + routing ---------- */
const Shop = createContext(null);
const useShop = () => useContext(Shop);
const pages = ['home', 'menu', 'build', 'story', 'contact'];
const readPage = () => {
  const p = window.location.hash.replace(/^#\/?/, '');
  return pages.includes(p) ? p : 'home';
};
const rupee = (n) => `\u20B9${n}`;

function Link({ to, className, children }) {
  const { page } = useShop();
  return <a href={`#/${to}`} className={className} aria-current={page === to ? 'page' : undefined}>{children}</a>;
}

function AddControl({ product }) {
  const { qtyOf, add, changeQty } = useShop();
  const qty = qtyOf(product.id);
  if (!qty) {
    return <button className="btn btn-add" onClick={() => add(product.id)} aria-label={`Add ${product.name} to bag`}>Add to bag</button>;
  }
  return (
    <div className="qty" role="group" aria-label={`${product.name} quantity`}>
      <button onClick={() => changeQty(product.id, -1)} aria-label="Remove one"><Minus size={18} /></button>
      <span aria-live="polite">{qty} in bag</span>
      <button onClick={() => changeQty(product.id, 1)} aria-label="Add one more"><Plus size={18} /></button>
    </div>
  );
}

function Tile({ product, roomy = false }) {
  const { setSelected } = useShop();
  return (
    <article className="tile">
      <button className="tile-art" style={{ background: product.tone }} onClick={() => setSelected(product)} aria-label={`View details for ${product.name}`}>
        <Art product={product} />
      </button>
      <div className="tile-body">
        <div className="tile-head"><h3>{product.name}</h3><span className="price">{rupee(product.price)}</span></div>
        <p>{roomy ? product.description : product.note}</p>
        <AddControl product={product} />
      </div>
    </article>
  );
}

const categories = Array.from(new Set(products.map((p) => p.category)));

function MenuBrowser({ withAll = false }) {
  const [category, setCategory] = useState(categories[0]);
  const tabs = withAll ? ['All', ...categories] : categories;
  const list = products.filter((p) => category === 'All' || p.category === category);
  return (
    <>
      <div className="chips" role="group" aria-label="Filter menu">
        {tabs.map((c) => <button key={c} aria-pressed={category === c} className={category === c ? 'chip on' : 'chip'} onClick={() => setCategory(c)}>{c}</button>)}
      </div>
      <div className={list.length <= 3 ? 'grid roomy' : 'grid'}>{list.map((p) => <Tile key={p.id} product={p} roomy={list.length <= 3} />)}</div>
    </>
  );
}

function Header() {
  const { itemCount, setCartOpen, mobileOpen, setMobileOpen } = useShop();
  const items = [['home', 'Home'], ['menu', 'Menu'], ['build', 'Build a bowl'], ['story', 'Our story'], ['contact', 'Find us']];
  return (
    <header className="site-header">
      <div className="wrap bar">
        <a className="brand" href="#/home"><Mark /><span>Nature Box</span></a>
        <nav className="nav" aria-label="Main">{items.map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}</nav>
        <div className="bar-actions">
          <button className="bag-btn" onClick={() => setCartOpen(true)} aria-label={`Open bag, ${itemCount} items`}><ShoppingBag size={18} /><span className="bag-label">Bag</span><b>{itemCount}</b></button>
          <button className="burger" onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen} aria-label="Menu">{mobileOpen ? <X size={22} /> : <MenuIcon size={22} />}</button>
        </div>
      </div>
      {mobileOpen && <nav className="mnav" aria-label="Mobile">{items.map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}</nav>}
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <a className="brand" href="#/home"><Mark /><span>Nature Box</span></a>
          <p className="footer-note">Fresh fruit, oats, sprouts and sattu, made at our stall.</p>
        </div>
        <div>
          <h3>Pages</h3>
          <ul><li><Link to="menu">Menu</Link></li><li><Link to="build">Build a bowl</Link></li><li><Link to="story">Our story</Link></li><li><Link to="contact">Find us</Link></li></ul>
        </div>
        <div>
          <h3>Visit</h3>
          <ul>
            <li><MapPin size={16} /> {business.locationText}</li>
            <li><Clock3 size={16} /> {business.hoursText}</li>
            <li><Phone size={16} /> <a href={`tel:+${business.whatsappNumber}`}>{business.phoneDisplay}</a></li>
            <li><Instagram size={16} /> {business.instagramUrl ? <a href={business.instagramUrl} target="_blank" rel="noreferrer">Instagram</a> : 'Instagram coming soon'}</li>
          </ul>
        </div>
      </div>
      <div className="wrap footer-bottom">&copy; {new Date().getFullYear()} Nature Box</div>
    </footer>
  );
}

/* ---------- Pages ---------- */
function Home() {
  const { openWhatsApp } = useShop();
  const fromCat = (cat) => Math.min(...products.filter((p) => p.category === cat).map((p) => p.price));
  return (
    <main>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <h1>Fresh fruit, oats, sprouts and sattu.</h1>
            <p className="lede">Fruit boxes, oats cups, sprout salads, sattu drinks and energy ladu, all prepared fresh at our stall. Pick what you like, send your bag on WhatsApp, and collect it when it is ready.</p>
            <div className="actions">
              <Link to="menu" className="btn btn-dark">Order now</Link>
              <Link to="build" className="btn btn-ghost">Build your bowl</Link>
              <Link to="contact" className="btn btn-ghost">Find the stall</Link>
            </div>
            <dl className="hero-prices">
              <div><dt>Fruit boxes</dt><dd>from {rupee(fromCat('Fruit boxes'))}</dd></div>
              <div><dt>Oats cups</dt><dd>from {rupee(fromCat('Oats'))}</dd></div>
              <div><dt>Sprouts</dt><dd>from {rupee(fromCat('Sprouts'))}</dd></div>
            </dl>
          </div>
          <HeroSlider />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div><h2>The menu</h2><p>Pick a category to see what we make. Fruit changes with the season, so ask what is fresh today.</p></div>
            <Link to="menu" className="text-link">See the full menu</Link>
          </div>
          <MenuBrowser />
        </div>
      </section>

      <section className="section band-mango builder-promo">
        <div className="wrap more">
          <div>
            <h2>Build your own bowl.</h2>
            <p>Pick your oats flavour, then add fruits, dry fruits and a protein boost. Watch the bowl fill up while calories, protein and price update live.</p>
            <Link to="build" className="btn btn-dark">Start building</Link>
          </div>
          <div className="promo-video"><video src={BASE + 'photos/build-bowl.mp4'} poster={BASE + 'photos/build-bowl-poster.webp'} autoPlay muted loop playsInline preload="metadata" aria-label="Fruits dropping into an oats bowl" /></div>
        </div>
      </section>

      <section className="section band-ink">
        <div className="wrap">
          <h2>Ordering takes three steps</h2>
          <ol className="steps">
            {[['Choose', 'Add your favourites from the menu to your bag.'], ['Send', 'Your bag becomes a ready-written WhatsApp message.'], ['Collect', 'We confirm what is fresh and have it ready at the stall.']].map(([t, d], i) => (
              <li key={t}><span className="step-n">{i + 1}</span><h3>{t}</h3><p>{d}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section sattu-feature">
        <div className="wrap more">
          <img className="sattu-steps" src={BASE + 'photos/sattu-steps.webp'} alt="Tear the Sattu Drink packet, pour the powder into a glass, add water and stir. Salt and lemon flavour." width="1400" height="932" loading="lazy" />
          <div>
            <h2>Sattu Instants. Just add water.</h2>
            <p>Tear the packet, stir it into a glass of water and your cooling sattu drink is ready in a minute. Salt and lemon flavour, easy to carry anywhere.</p>
            <div className="actions">
              <AddControl product={products.find((p) => p.id === 'sattu-packet')} />
              <Link to="menu" className="btn btn-ghost">See Sattu Instants</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section band-lime">
        <div className="wrap more">
          <div>
            <h2>High protein range coming soon.</h2>
            <p>Protein drinks, protein bars, high-protein food and more are on the way. Have a look at what is on the menu now, and check back soon.</p>
            <Link to="menu" className="btn btn-dark">See what is on now</Link>
          </div>
          <img className="more-photo" src={BASE + 'photos/high-protein.webp'} alt="Upcoming high-protein range from Nature Box: protein oats cups, bowl, energy ladu, protein bars and roasted nuts" width="1400" height="788" loading="lazy" />
        </div>
      </section>

      <section className="section band-pink">
        <div className="wrap find">
          <div>
            <h2>Find the stall</h2>
            <p className="find-line"><MapPin size={18} /> {business.locationText}</p>
            <p className="find-line"><Clock3 size={18} /> {business.hoursText}</p>
            <p className="find-line"><Phone size={18} /> <a href={`tel:+${business.whatsappNumber}`}>{business.phoneDisplay}</a></p>
          </div>
          <div className="actions">
            <button className="btn btn-dark" onClick={() => openWhatsApp()}>Message on WhatsApp</button>
            <Link to="contact" className="btn btn-ghost">Contact details</Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function MenuPage() {
  return (
    <main>
      <section className="page-head bg-lime">
        <div className="wrap"><h1>Menu</h1><p className="lede">Fruit boxes, oats, sprouts, sattu instants, energy ladu and fresh drinks. Prices are per item.</p></div>
      </section>
      <section className="section">
        <div className="wrap">
          <MenuBrowser withAll />
          <p className="note">Fruit depends on the season and what is fresh each day. More flavours and new items will be added here.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function StoryPage() {
  const values = [['Keep it fresh', 'Fruit is cut and boxed for the day, and it follows the season.'], ['Keep it simple', 'Ingredients you recognise, prepared without fuss.'], ['Serve with care', 'A friendly counter and food made the way we would want it.']];
  return (
    <main>
      <section className="page-head bg-pink">
        <div className="wrap"><h1>Our story</h1><p className="lede">Nature Box is a small stall built around one idea: everyday food can be fresh and still easy.</p></div>
      </section>
      <section className="section">
        <div className="wrap story">
          <div className="story-text">
            <p>Fruit boxes are for the quick bite. Oats, sprouts and sattu are for when you want something that keeps you going, and energy ladu and fresh lemon water round it out. Everything is made fresh, in small batches, and kept simple.</p>
            <p>As the stall grows we will add more flavours and new items. The goal stays the same: food you look forward to, from people you can talk to.</p>
            <Link to="menu" className="btn btn-dark">See the menu</Link>
          </div>
          <dl className="values">{values.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}</dl>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function QueryForm() {
  const { openWhatsApp } = useShop();
  const [f, setF] = useState({ name: '', phone: '', message: '' });
  const [err, setErr] = useState('');
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    if (!f.name.trim() || !f.message.trim()) { setErr('Please add your name and your question.'); return; }
    setErr('');
    openWhatsApp(`Hi Nature Box! I have a query.\n\nName: ${f.name.trim()}${f.phone.trim() ? `\nPhone: ${f.phone.trim()}` : ''}\n\nMessage: ${f.message.trim()}`);
  };
  return (
    <div className="card query">
      <h2>Ask us a question</h2>
      <p>Fill this in and it opens WhatsApp with your message ready to send to us.</p>
      <div className="form-grid">
        <label>Your name<input value={f.name} onChange={set('name')} autoComplete="name" /></label>
        <label>Phone (optional)<input value={f.phone} onChange={set('phone')} inputMode="tel" autoComplete="tel" /></label>
        <label className="full">Your question<textarea rows="4" value={f.message} onChange={set('message')} /></label>
      </div>
      {err && <p className="form-err" role="alert">{err}</p>}
      <button className="btn btn-dark" onClick={submit}>Send on WhatsApp</button>
    </div>
  );
}

function ContactPage() {
  const { openWhatsApp } = useShop();
  return (
    <main>
      <section className="page-head bg-mango">
        <div className="wrap"><h1>Find us</h1><p className="lede">Check what is fresh today, ask a question or place an order.</p></div>
      </section>
      <section className="section">
        <div className="wrap grid-3">
          <div className="card bg-lime">
            <MapPin size={26} /><h2>The stall</h2>
            <p>{business.locationText}</p><p><Clock3 size={16} /> {business.hoursText}</p>
          </div>
          <div className="card bg-pink">
            <MessageCircle size={26} /><h2>WhatsApp</h2>
            <p>Message or call us to check what is fresh today, ask about the menu, or confirm an order.</p>
            <p><Phone size={16} /> <a href={`tel:+${business.whatsappNumber}`}><strong>{business.phoneDisplay}</strong></a></p>
            <button className="btn btn-dark" onClick={() => openWhatsApp()}>Message us</button>
          </div>
          <div className="card bg-apricot">
            <Instagram size={26} /><h2>Instagram</h2>
            <p>Menu updates and new flavours as they arrive.</p>
            {business.instagramUrl ? <a className="btn btn-dark" href={business.instagramUrl} target="_blank" rel="noreferrer">Follow us</a> : <p className="muted">Link coming soon.</p>}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap"><QueryForm /></div>
      </section>
      <Footer />
    </main>
  );
}

/* ---------- App ---------- */
function App() {
  const [page, setPage] = useState(readPage);
  const [cart, setCart] = useState(() => { try { return JSON.parse(localStorage.getItem('naturebox-cart') || '{}'); } catch { return {}; } });
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState('');
  const [bowls, setBowls] = useState(() => { try { return JSON.parse(localStorage.getItem('naturebox-bowls') || '[]'); } catch { return []; } });
  const [details, setDetails] = useState(() => { try { return { name: '', phone: '', mode: 'Pickup', address: '', notes: '', ...JSON.parse(localStorage.getItem('naturebox-details') || '{}') }; } catch { return { name: '', phone: '', mode: 'Pickup', address: '', notes: '' }; } });
  const [formErr, setFormErr] = useState('');

  useEffect(() => {
    const onHash = () => { setPage(readPage()); setMobileOpen(false); setSelected(null); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  useEffect(() => { try { localStorage.setItem('naturebox-details', JSON.stringify(details)); } catch {} }, [details]);
  useEffect(() => { try { localStorage.setItem('naturebox-bowls', JSON.stringify(bowls)); } catch {} }, [bowls]);
  useEffect(() => { try { localStorage.setItem('naturebox-cart', JSON.stringify(cart)); } catch {} }, [cart]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 2400);
    return () => clearTimeout(t);
  }, [toast]);
  useEffect(() => {
    const open = cartOpen || selected;
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => { if (e.key === 'Escape') { setCartOpen(false); setSelected(null); setMobileOpen(false); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [cartOpen, selected]);

  const cartItems = useMemo(() => [
    ...products.filter((p) => cart[p.id] > 0).map((p) => ({ ...p, qty: cart[p.id] })),
    ...bowls.map((b) => ({ id: b.uid, name: b.name, price: b.price, qty: b.qty, tone: b.tone, kind: 'oats', category: 'Custom', detail: b.detail })),
  ], [cart, bowls]);
  const itemCount = cartItems.reduce((s, p) => s + p.qty, 0);
  const subtotal = cartItems.reduce((s, p) => s + p.qty * p.price, 0);

  const add = (id) => { setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 })); setToast('Added to your bag'); };
  const qtyOf = (id) => (id.startsWith('bowl-') ? (bowls.find((b) => b.uid === id)?.qty || 0) : (cart[id] || 0));
  const addBowl = (bowl) => {
    setBowls((bs) => {
      const hit = bs.find((b) => b.signature === bowl.signature);
      if (hit) return bs.map((b) => (b === hit ? { ...b, qty: b.qty + 1 } : b));
      return [...bs, { ...bowl, uid: `bowl-${Date.now()}`, qty: 1 }];
    });
    setToast('Custom bowl added to your bag');
    setCartOpen(true);
  };
  const changeQty = (id, d) => id.startsWith('bowl-') ? setBowls((bs) => bs.map((b) => (b.uid === id ? { ...b, qty: b.qty + d } : b)).filter((b) => b.qty > 0)) : setCart((c) => {
    const q = Math.max(0, (c[id] || 0) + d); const n = { ...c };
    if (q === 0) delete n[id]; else n[id] = q;
    return n;
  });
  const openWhatsApp = (text = '') => {
    window.open(`https://wa.me/${business.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ''}`, '_blank', 'noopener,noreferrer');
  };
  const setD = (k) => (e) => setDetails((d) => ({ ...d, [k]: e.target.value }));
  const sendOrder = () => {
    const phone = details.phone.replace(/\D/g, '');
    if (!details.name.trim()) { setFormErr('Please enter your name.'); return; }
    if (phone.length < 10) { setFormErr('Please enter a valid phone number.'); return; }
    if (details.mode === 'Delivery' && !details.address.trim()) { setFormErr('Please enter your delivery address.'); return; }
    setFormErr('');
    const rows = cartItems.flatMap((p, i) => {
      const head = `${i + 1}. ${p.name} x ${p.qty} = ${rupee(p.qty * p.price)}`;
      return p.detail ? [head, `   ${p.detail}`] : [head];
    });
    const msg = [
      'New order from the Nature Box website',
      '',
      `Name: ${details.name.trim()}`,
      `Phone: ${details.phone.trim()}`,
      `Type: ${details.mode}`,
      ...(details.mode === 'Delivery' ? [`Address: ${details.address.trim()}`] : []),
      '',
      'Items:',
      ...rows,
      '',
      `Total: ${rupee(subtotal)}`,
      ...(details.notes.trim() ? ['', `Notes: ${details.notes.trim()}`] : []),
      '',
      'Please confirm availability.',
    ].join('\n');
    openWhatsApp(msg);
  };

  const value = { page, cart, qtyOf, add, changeQty, itemCount, setCartOpen, mobileOpen, setMobileOpen, setSelected, openWhatsApp };
  return (
    <Shop.Provider value={value}>
      <FruitDefs />
      <a className="skip" href="#content">Skip to content</a>
      <Header />
      <div id="content">
        {page === 'home' && <Home />}
        {page === 'menu' && <MenuPage />}
        {page === 'build' && <BuilderPage onAddBowl={addBowl} footer={<Footer />} />}
        {page === 'story' && <StoryPage />}
        {page === 'contact' && <ContactPage />}
      </div>

      {itemCount > 0 && !cartOpen && <button className="bagbar" onClick={() => setCartOpen(true)}><span>View bag ({itemCount})</span><b>{rupee(subtotal)}</b></button>}

      {cartOpen && (
        <div className="overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) setCartOpen(false); }}>
          <aside className="drawer" aria-label="Your bag">
            <div className="drawer-head"><h2>Your bag</h2><button className="icon-btn" onClick={() => setCartOpen(false)} aria-label="Close bag"><X size={22} /></button></div>
            {cartItems.length === 0 ? (
              <div className="empty"><h3>Your bag is empty</h3><p>Add something from the menu to get started.</p><a className="btn btn-dark" href="#/menu" onClick={() => setCartOpen(false)}>Open the menu</a></div>
            ) : (
              <>
                <ul className="cart-list">
                  {cartItems.map((p) => (
                    <li key={p.id} className="cart-row">
                      <span className="thumb" style={{ background: p.tone }}><Art product={p} /></span>
                      <div><strong>{p.name}</strong><small>{rupee(p.price)} each</small>{p.detail && <small className="cart-detail">{p.detail}</small>}<AddControl product={p} /></div>
                      <strong>{rupee(p.price * p.qty)}</strong>
                    </li>
                  ))}
                </ul>
                <div className="cart-foot">
                  <p className="row"><span>Subtotal</span><strong>{rupee(subtotal)}</strong></p>
                  <div className="form-grid checkout">
                    <label className="full">Your name<input value={details.name} onChange={setD('name')} autoComplete="name" /></label>
                    <label className="full">Phone number<input value={details.phone} onChange={setD('phone')} inputMode="tel" autoComplete="tel" /></label>
                    <div className="full seg" role="group" aria-label="Pickup or delivery">
                      {['Pickup', 'Delivery'].map((m) => <button key={m} type="button" className={details.mode === m ? 'chip on' : 'chip'} aria-pressed={details.mode === m} onClick={() => setDetails((d) => ({ ...d, mode: m }))}>{m}</button>)}
                    </div>
                    {details.mode === 'Delivery' && <label className="full">Delivery address<textarea rows="2" value={details.address} onChange={setD('address')} autoComplete="street-address" /></label>}
                    <label className="full">Notes (optional)<input value={details.notes} onChange={setD('notes')} /></label>
                  </div>
                  {formErr && <p className="form-err" role="alert">{formErr}</p>}
                  <small>Your order opens in WhatsApp, ready to send to us. We confirm availability there.</small>
                  <button className="btn btn-dark" onClick={sendOrder}>Send order on WhatsApp</button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {selected && (
        <div className="overlay modal-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) setSelected(null); }}>
          <div className="modal" role="dialog" aria-label={selected.name}>
            <button className="icon-btn modal-close" onClick={() => setSelected(null)} aria-label="Close"><X size={22} /></button>
            <div className="modal-art" style={{ background: selected.tone }}><Art product={selected} /></div>
            <div className="modal-copy">
              <p className="muted">{selected.category}</p>
              <h2>{selected.name}</h2>
              <p>{selected.description}</p>
              <p className="price big">{rupee(selected.price)}</p>
              <AddControl product={selected} />
              <small>Availability can change during the day.</small>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="toast" role="status"><Check size={16} />{toast}</div>}
    </Shop.Provider>
  );
}

createRoot(document.getElementById('root')).render(<App />);
