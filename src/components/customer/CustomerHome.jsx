import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { BookingModal } from './BookingModal';
import { ActiveBooking } from './ActiveBooking';
import { PriceBreakdown } from './PriceBreakdown';
import {
  Search, Zap, Star, MapPin, Clock, ShieldCheck,
  ArrowRight, Mic, ChevronRight, Users, Award, TrendingUp, Phone
} from 'lucide-react';

const SERVICE_CATEGORIES = [
  { id: 'electrician', icon: '⚡', label_en: 'Electrician & AC', label_hi: 'इलेक्ट्रीशियन व AC', color: '#FFF3E0', iconColor: '#E65100', desc_en: 'Wiring, switchboards, AC repair', desc_hi: 'वायरिंग, स्विचबोर्ड, AC मरम्मत' },
  { id: 'plumber',     icon: '🔧', label_en: 'Plumbing',         label_hi: 'प्लंबिंग',          color: '#E3F2FD', iconColor: '#0369A1', desc_en: 'Pipes, taps, drainage',        desc_hi: 'पाइप, नल, जल निकासी' },
  { id: 'carpenter',  icon: '🪚', label_en: 'Carpenter',        label_hi: 'बढ़ई',              color: '#FFF8E1', iconColor: '#F57C00', desc_en: 'Furniture, doors, windows',    desc_hi: 'फर्नीचर, दरवाजे, खिड़कियां' },
  { id: 'cleaning',   icon: '🧹', label_en: 'Deep Cleaning',    label_hi: 'गहन सफाई',          color: '#E8F5EE', iconColor: '#1B8754', desc_en: 'Home, bathroom, kitchen',     desc_hi: 'घर, बाथरूम, किचन' },
  { id: 'caregiver',  icon: '🏥', label_en: 'Caregiver',        label_hi: 'देखभाल कर्ता',       color: '#F3E5F5', iconColor: '#7B1FA2', desc_en: 'Elderly & patient care',      desc_hi: 'बुजुर्ग व रोगी सेवा' },
  { id: 'driver',     icon: '🚗', label_en: 'Driver',           label_hi: 'चालक',              color: '#E0F2F1', iconColor: '#00695C', desc_en: 'Verified cooperative drivers', desc_hi: 'सत्यापित सहकारी चालक' },
  { id: 'painter',    icon: '🎨', label_en: 'Painter',          label_hi: 'रंगाई-पुताई',       color: '#FCE4EC', iconColor: '#C2185B', desc_en: 'Interior & exterior painting', desc_hi: 'अंदर व बाहर रंगाई' },
  { id: 'domestic',   icon: '🏠', label_en: 'Domestic Help',    label_hi: 'घरेलू सहायक',       color: '#E8EAF6', iconColor: '#303F9F', desc_en: 'Cooking, cleaning, errands',   desc_hi: 'खाना, सफाई, काम' },
];

const FEATURED_WORKERS = [
  { id: 'wkr-101', name: 'Satish Kumar Verma', trade: 'Electrician', trade_hi: 'इलेक्ट्रीशियन', rating: 4.9, reviews: 312, experience: '8 yrs', district: 'Delhi', society: 'Delhi Shramik Sahakari', ncct: 'Level 4', rate: 350, avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80' },
  { id: 'wkr-102', name: 'Meena Devi Yadav',   trade: 'Caregiver',   trade_hi: 'देखभालकर्ता', rating: 4.8, reviews: 187, experience: '5 yrs', district: 'Lucknow', society: 'UP Mahila Sahakari',  ncct: 'Level 3', rate: 280, avatar: 'https://images.unsplash.com/photo-1614436163996-25cee5f54290?w=150&auto=format&fit=crop&q=80' },
  { id: 'wkr-103', name: 'Ramesh Gaikwad',     trade: 'Plumber',     trade_hi: 'प्लंबर',       rating: 4.7, reviews: 243, experience: '11 yrs', district: 'Pune',  society: 'Maharashtra Shramik', ncct: 'Level 4', rate: 320, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
];

const HOW_IT_WORKS = [
  { en: 'Search & Select',  hi: 'खोजें व चुनें',      desc_en: 'Choose a service category and enter your location', desc_hi: 'सेवा चुनें और अपना पता दर्ज करें' },
  { en: 'Match & Book',     hi: 'मिलान व बुकिंग',     desc_en: 'See verified cooperative workers near you with fixed rates', desc_hi: 'निकटतम सत्यापित कारीगर देखें व निश्चित दर पर बुक करें' },
  { en: 'Track & Pay',      hi: 'ट्रैक करें व भुगतान', desc_en: 'Track in real-time. 88% goes directly to your worker via UPI', desc_hi: 'रीयल-टाइम ट्रैकिंग। 88% सीधे कामगार को UPI से' },
  { en: 'Rate Service',     hi: 'रेटिंग दें',        desc_en: 'Rate your worker and support cooperative living wage', desc_hi: 'कारीगर को रेटिंग दें और सहकारी आजीविका का समर्थन करें' }
];

export const CustomerHome = () => {
  const { language, activeBooking, t, speakText } = usePlatform();
  const isHi = language === 'hi';

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setBookingOpen(true);
  };

  const handleVoiceSearch = () => {
    window.dispatchEvent(new CustomEvent('open-voice-assistant'));
  };

  const handleSearchSubmit = () => {
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase();
    const found = SERVICE_CATEGORIES.find(c =>
      c.label_en.toLowerCase().includes(q) ||
      c.label_hi.includes(q) ||
      c.id.includes(q) ||
      c.desc_en.toLowerCase().includes(q)
    );
    handleCategorySelect(found || SERVICE_CATEGORIES[0]);
  };

  return (
    <div>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-badge">
            <ShieldCheck size={13} />
            {isHi ? 'NCCT सत्यापित • सहकारिता मंत्रालय' : 'NCCT Verified • Ministry of Cooperation'}
          </div>

          <h1 className="hero-title">
            {isHi ? (
              <>भारत का <span>सहकारी सेवा</span> डिजिटल मंच</>
            ) : (
              <>Trusted Services. <span>Fair Work.</span> Stronger Communities.</>
            )}
          </h1>

          <p className="hero-sub">
            {isHi
              ? 'NCCT प्रमाणित सहकारी कामगारों द्वारा घरेलू सेवाएं। निश्चित दरें, पारदर्शी भुगतान, सामाजिक सुरक्षा।'
              : 'Book NCCT-certified cooperative workers for home and community services. Fixed rates, transparent payments, worker welfare guaranteed.'}
          </p>

          {/* Search bar */}
          <div style={{ maxWidth: 620 }}>
            <div className="search-box">
              <Search size={18} color="var(--text-muted)" />
              <input
                type="text"
                placeholder={isHi ? 'प्लंबर, इलेक्ट्रीशियन, सफाई... खोजें' : 'Search electrician, plumber, cleaning...'}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSearchSubmit(); }}
              />
              <button
                className="btn btn-ghost btn-icon"
                onClick={handleVoiceSearch}
                title={isHi ? 'आवाज से खोजें' : 'Search by voice'}
              >
                <Mic size={18} color="var(--saffron)" />
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSearchSubmit}
                style={{ borderRadius: 'var(--r-full)', padding: '8px 22px' }}
              >
                {isHi ? 'खोजें' : 'Search'}
              </button>
            </div>

            {/* Quick picks */}
            <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
              {[
                { id: 'electrician', label: isHi ? '⚡ इलेक्ट्रीशियन' : '⚡ Electrician' },
                { id: 'plumber',     label: isHi ? '🔧 प्लंबर' : '🔧 Plumber' },
                { id: 'cleaning',    label: isHi ? '🧹 सफाई' : '🧹 Cleaning' },
                { id: 'domestic',    label: isHi ? '🏠 घरेलू सहायक' : '🏠 Domestic Help' },
              ].map(q => (
                <button
                  key={q.id}
                  onClick={() => handleCategorySelect(SERVICE_CATEGORIES.find(c => c.id === q.id))}
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: 'var(--r-full)',
                    padding: '6px 14px',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    backdropFilter: 'blur(4px)'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Active Booking Banner ──────────────────────────── */}
      {activeBooking && (
        <div style={{ background: '#E8F5EE', borderBottom: '2px solid var(--green)', padding: '12px 0' }}>
          <div className="container flex-between flex-gap-md">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>🔔</span>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--green)', fontSize: 15 }}>
                  {isHi ? 'आपकी बुकिंग सक्रिय है' : 'Your Booking is Active'}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  {activeBooking.workerName} • {activeBooking.serviceName}
                </div>
              </div>
            </div>
            <button
              className="btn btn-green btn-sm"
              onClick={() => {
                const el = document.getElementById('active-booking-modal-overlay');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {isHi ? 'ट्रैक करें' : 'Track'} <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ── Trust Stats ────────────────────────────────────── */}
      <section style={{ background: 'var(--primary-navy)', padding: 'var(--sp-lg) 0', color: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, textAlign: 'center' }}>
            {[
              { value: '4.2L+', label: isHi ? 'सत्यापित कामगार' : 'Verified Workers' },
              { value: '28',    label: isHi ? 'राज्यों में उपस्थित' : 'States Covered' },
              { value: '88%',   label: isHi ? 'कामगार को प्रत्यक्ष' : 'Direct to Worker' },
              { value: '₹320+', label: isHi ? 'औसत घंटे की मज़दूरी' : 'Avg Hourly Wage' },
            ].map(s => (
              <div key={s.value}>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: 28, fontWeight: 800, color: '#FFB74D' }}>{s.value}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service Categories ─────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">
                {isHi ? 'सेवाएं चुनें' : 'Our Services'}
              </h2>
              <p className="section-subtitle">
                {isHi ? 'NCCT-प्रमाणित सहकारी कामगार, निश्चित दरें' : 'NCCT-certified cooperative workers at fixed rates'}
              </p>
            </div>
          </div>
          <div className="service-grid">
            {SERVICE_CATEGORIES.map(cat => (
              <div
                key={cat.id}
                className="service-card card-hover"
                onClick={() => handleCategorySelect(cat)}
                role="button"
                tabIndex={0}
              >
                <div className="service-card-icon" style={{ background: cat.color }}>
                  <span style={{ fontSize: 26 }}>{cat.icon}</span>
                </div>
                <div className="service-card-label">
                  {isHi ? cat.label_hi : cat.label_en}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.4 }}>
                  {isHi ? cat.desc_hi : cat.desc_en}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Emergency Booking Banner ────────────────────────── */}
      <section style={{ background: 'var(--saffron-pale)', borderTop: '1.5px solid #FDE68A', borderBottom: '1.5px solid #FDE68A', padding: 'var(--sp-lg) 0' }}>
        <div className="container flex-between flex-gap-md" style={{ flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--saffron)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
              ⚡
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-head)', fontSize: 18, fontWeight: 800, color: 'var(--navy)' }}>
                {isHi ? '15-मिनट आपातकालीन सेवा चाहिए?' : 'Need Urgent Emergency Help Right Now?'}
              </h3>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
                {isHi ? 'निकटतम 24/7 आपातकालीन इलेक्ट्रीशियन या प्लंबर 15 मिनट में पहुंचेगा।' : 'Instant dispatch of nearest emergency electrician or plumber within 15 mins.'}
              </p>
            </div>
          </div>
          <button
            className="btn btn-primary"
            style={{ background: 'var(--saffron-dark)', borderColor: 'var(--saffron-dark)' }}
            onClick={() => handleCategorySelect(SERVICE_CATEGORIES[0])}
          >
            <Phone size={15} /> {isHi ? 'आपातकालीन बुक करें' : 'Get Emergency Help'}
          </button>
        </div>
      </section>

      {/* ── Wage Transparency ──────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-xl)', alignItems: 'center' }}>
            <div>
              <span className="badge badge-green" style={{ marginBottom: 12, display: 'inline-flex' }}>
                <ShieldCheck size={11} />
                {isHi ? 'पारदर्शी सहकारी मॉडल' : 'Transparent Cooperative Model'}
              </span>
              <h2 className="section-title">
                {isHi ? '88% सीधे आपके कामगार को' : '88% Goes Directly to Your Worker'}
              </h2>
              <p style={{ color: 'var(--text-muted)', marginTop: 10, lineHeight: 1.7, fontSize: 15 }}>
                {isHi
                  ? 'प्राइवेट कंपनियां 30-35% कमीशन लेती हैं। हम सिर्फ 12% — बाकी सब कामगार की उचित मज़दूरी और सामाजिक सुरक्षा।'
                  : 'Private platforms take 30-35% commission. We retain only 12% — the rest is fair wages and worker welfare.'}
              </p>
              <div className="wage-pct-row">
                <div className="wage-pct-block">
                  <div className="wage-pct-number" style={{ color: 'var(--coop-green)' }}>88%</div>
                  <div className="wage-pct-label">{isHi ? 'कामगार को सीधा वेतन' : 'Direct Worker Wage'}</div>
                </div>
                <div className="wage-pct-block">
                  <div className="wage-pct-number" style={{ color: 'var(--saffron-dark)' }}>7%</div>
                  <div className="wage-pct-label">{isHi ? 'कल्याण व पेंशन कोष' : 'Welfare & Pension'}</div>
                </div>
                <div className="wage-pct-block">
                  <div className="wage-pct-number" style={{ color: 'var(--primary-navy)' }}>5%</div>
                  <div className="wage-pct-label">{isHi ? 'NCCT प्रशिक्षण व मंच' : 'NCCT & Platform'}</div>
                </div>
              </div>
              <button
                className="btn btn-outline mt-lg"
                onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}
              >
                {isHi ? 'भुगतान विवरण देखें' : 'See Payment Breakdown'} <ChevronRight size={15} />
              </button>
            </div>

            {/* Comparison */}
            <div className="card">
              <h3 style={{ fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 700, color: 'var(--navy)', marginBottom: 'var(--sp-md)' }}>
                {isHi ? 'श्रमसेतु बनाम निजी प्लेटफॉर्म' : 'ShramSetu vs Private Platforms'}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { label: isHi ? 'कामगार को हिस्सा' : 'Worker share', us: '88%', them: '65-70%', good: true },
                  { label: isHi ? 'स्वास्थ्य बीमा' : 'Health insurance', us: isHi ? '✓ आयुष्मान' : '✓ Ayushman', them: '✗', good: true },
                  { label: isHi ? 'पेंशन' : 'Pension', us: isHi ? '✓ PM-SYM' : '✓ PM-SYM', them: '✗', good: true },
                  { label: isHi ? 'सरचार्ज / सर्ज प्राइसिंग' : 'Surge pricing', us: '✗', them: '✓', good: false },
                  { label: isHi ? 'विवाद निवारण' : 'Dispute resolution', us: isHi ? '✓ लोकपाल' : '✓ Ombudsman', them: isHi ? 'एल्गो बैन' : 'Algo ban', good: true },
                ].map((r, i) => (
                  <div key={i} style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto auto',
                    gap: 12,
                    alignItems: 'center',
                    padding: '8px 0',
                    borderBottom: i < 4 ? '1px solid var(--border)' : 'none',
                    fontSize: 13
                  }}>
                    <span style={{ color: 'var(--text-muted)' }}>{r.label}</span>
                    <span style={{ fontWeight: 700, color: 'var(--coop-green)', textAlign: 'center' }}>{r.us}</span>
                    <span style={{ fontWeight: 600, color: r.good ? '#DC2626' : 'var(--coop-green)', textAlign: 'center' }}>{r.them}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {showPriceBreakdown && <div style={{ marginTop: 'var(--sp-xl)' }}><PriceBreakdown /></div>}
        </div>
      </section>

      {/* ── Featured Workers ───────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">{isHi ? 'आपके निकट सत्यापित कामगार' : 'Verified Workers Near You'}</h2>
              <p className="section-subtitle">{isHi ? 'NCCT डिजिटल प्रमाणपत्र और सहकारी बैज के साथ' : 'With NCCT digital credentials and cooperative badge'}</p>
            </div>
            <button className="btn btn-ghost btn-sm">
              {isHi ? 'सभी देखें' : 'View All'} <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--sp-md)' }}>
            {FEATURED_WORKERS.map(w => (
              <div key={w.id} className="card card-hover" style={{ padding: 'var(--sp-md)' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <img
                    src={w.avatar}
                    alt={w.name}
                    style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: '50%', border: '2.5px solid var(--border)', flexShrink: 0 }}
                    onError={e => { e.target.style.display = 'none'; }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 15, color: 'var(--navy)', marginBottom: 2 }}>{w.name}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 6 }}>{isHi ? w.trade_hi : w.trade} • {w.experience}</div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      <span className="badge badge-verified">✓ {isHi ? 'सत्यापित' : 'Verified'}</span>
                      <span className="ncct-badge">NCCT {w.ncct}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--sp-md)', paddingTop: 'var(--sp-md)', borderTop: '1px solid var(--border)' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ color: '#F59E0B', fontSize: 14 }}>★</span>
                      <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--navy)' }}>{w.rating}</span>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>({w.reviews})</span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                      <MapPin size={11} style={{ display: 'inline' }} /> {w.district}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 16, color: 'var(--saffron-dark)' }}>₹{w.rate}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{isHi ? 'प्रति घंटा' : 'per hour'}</div>
                  </div>
                </div>

                <button
                  className="btn btn-primary btn-full mt-md"
                  onClick={() => {
                    const cat = SERVICE_CATEGORIES.find(c => c.id === w.trade.toLowerCase());
                    setSelectedCategory(cat || SERVICE_CATEGORIES[0]);
                    setBookingOpen(true);
                  }}
                >
                  {isHi ? 'बुक करें' : 'Book Now'} <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────── */}
      <section style={{ background: 'var(--primary-navy)', padding: 'var(--sp-2xl) 0', color: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--sp-xl)' }}>
            <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 26, fontWeight: 800 }}>
              {isHi ? 'श्रमसेतु कैसे काम करता है?' : 'How ShramSetu Works'}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', marginTop: 8, fontSize: 15 }}>
              {isHi ? 'सिर्फ 4 आसान चरणों में' : 'Just 4 simple steps'}
            </p>
          </div>
          <div className="how-steps">
            {HOW_IT_WORKS.map((s, i) => (
              <div key={i} className="how-step" style={{ alignItems: 'center', textAlign: 'center' }}>
                <div className="how-step-num">{i + 1}</div>
                <div className="how-step-title" style={{ color: 'white' }}>{isHi ? s.hi : s.en}</div>
                <div className="how-step-sub" style={{ color: 'rgba(255,255,255,0.75)' }}>{isHi ? s.desc_hi : s.desc_en}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--sp-xl)' }}>
            <button className="btn btn-green btn-lg" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              {isHi ? 'अभी सेवा बुक करें' : 'Book a Service Now'} <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Modals */}
      {bookingOpen && (
        <BookingModal
          category={selectedCategory}
          onClose={() => setBookingOpen(false)}
        />
      )}
      {activeBooking && <ActiveBooking />}
    </div>
  );
};
