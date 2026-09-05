import React from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { MapPin, Star, ShieldCheck, Wrench, Award, Clock } from 'lucide-react';

export const WorkerProfile = () => {
  const { language, currentWorker } = usePlatform();
  const isHi = language === 'hi';
  const w = currentWorker;

  const SPECIALIZATIONS = [
    { en: 'LT/HT Wiring & Switchgear',    hi: 'LT/HT वायरिंग और स्विचगियर' },
    { en: 'AC Installation & Servicing',   hi: 'AC इंस्टॉलेशन और सर्विसिंग' },
    { en: 'Solar Panel Wiring (NCCT)',      hi: 'सौर पैनल वायरिंग (NCCT)' },
    { en: 'Inverter & Battery Systems',    hi: 'इनवर्टर और बैटरी सिस्टम' },
  ];

  const TOOLS = [
    { en: 'Insulated Screwdrivers Set', hi: 'इंसुलेटेड पेचकस सेट', verified: true },
    { en: 'Digital Multimeter', hi: 'डिजिटल मल्टीमीटर', verified: true },
    { en: 'Wire Stripper & Crimper', hi: 'वायर स्ट्रिपर और क्रिम्पर', verified: true },
    { en: 'Safety Harness & Gloves', hi: 'सेफ्टी हार्नेस और दस्ताने', verified: true },
  ];

  const REVIEWS = [
    { name: 'Rajesh Kumar', rating: 5, text_en: 'Excellent work, very professional. Came on time.', text_hi: 'बेहतरीन काम, बहुत पेशेवर। समय पर आए।', date: '2 Sep 2026' },
    { name: 'Sunita Sharma', rating: 5, text_en: 'Fixed the AC quickly. Good cooperative worker.', text_hi: 'AC जल्दी ठीक किया। अच्छे सहकारी कामगार।', date: '1 Sep 2026' },
    { name: 'Mohan Lal', rating: 4, text_en: 'Very knowledgeable. Price was fair and transparent.', text_hi: 'बहुत जानकार। कीमत उचित और पारदर्शी थी।', date: '30 Aug 2026' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-lg)' }}>
      {/* Profile card */}
      <div className="card">
        <div style={{ display: 'flex', gap: 'var(--sp-lg)', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <img
              src={w?.photo || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80'}
              alt={w?.name}
              style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--border)' }}
              onError={e => { e.target.style.display = 'none'; }}
            />
            <span className="badge badge-green"><ShieldCheck size={11} /> {isHi ? 'NCCT सत्यापित' : 'NCCT Verified'}</span>
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 22, fontWeight: 800, color: 'var(--navy)', marginBottom: 4 }}>
              {w?.name || 'Satish Kumar Verma'}
            </h2>
            <div style={{ fontSize: 15, color: 'var(--text-muted)', marginBottom: 8 }}>
              {isHi ? 'मुख्य इलेक्ट्रीशियन एवं सौर तकनीशियन' : 'Chief Electrician & Solar Technician'}
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
              <span className="ncct-badge">NCCT Level 4</span>
              <span className="badge badge-navy"><MapPin size={11} /> {w?.district || 'New Delhi'}</span>
              <span className="badge badge-amber">8 {isHi ? 'वर्ष अनुभव' : 'yrs experience'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ display: 'flex', gap: 2 }}>
                {[1,2,3,4,5].map(s => (
                  <span key={s} style={{ color: s <= 4.9 ? '#F59E0B' : 'var(--border)', fontSize: 18 }}>★</span>
                ))}
              </div>
              <span style={{ fontWeight: 700, fontSize: 16 }}>4.9</span>
              <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>({w?.reviews || 312} {isHi ? 'समीक्षाएं' : 'reviews'})</span>
            </div>
            <div style={{ fontSize: 14, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
              🏛 {w?.society || 'Delhi Shramik Sahakari Federation'}
            </div>
          </div>

          {/* Rate card */}
          <div style={{ textAlign: 'center', background: 'var(--saffron-pale)', border: '2px solid #FFCCBC', borderRadius: 'var(--r-lg)', padding: 'var(--sp-md) var(--sp-lg)', minWidth: 140 }}>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: 32, fontWeight: 800, color: 'var(--saffron)' }}>₹350</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{isHi ? 'प्रति घंटा (NCCT दर)' : 'per hour (NCCT rate)'}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>+ {isHi ? 'न्यूनतम 1 घंटा' : '1 hr minimum'}</div>
          </div>
        </div>
      </div>

      {/* Specializations */}
      <div className="card">
        <h3 style={{ fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 700, color: 'var(--navy)', marginBottom: 'var(--sp-md)' }}>
          <Award size={16} style={{ display: 'inline', marginRight: 6 }} />
          {isHi ? 'विशेषज्ञता' : 'Specializations'}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {SPECIALIZATIONS.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', background: 'var(--bg)', borderRadius: 'var(--r-md)', border: '1px solid var(--border)', fontSize: 14 }}>
              <span style={{ color: 'var(--green)', flexShrink: 0 }}>✓</span>
              <span style={{ color: 'var(--text)' }}>{isHi ? s.hi : s.en}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tools & Safety */}
      <div className="card">
        <h3 style={{ fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 700, color: 'var(--navy)', marginBottom: 'var(--sp-md)' }}>
          <Wrench size={16} style={{ display: 'inline', marginRight: 6 }} />
          {isHi ? 'सत्यापित उपकरण व सुरक्षा गियर' : 'Verified Tools & Safety Gear'}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {TOOLS.map((t, i) => (
            <div key={i} className="flex-between" style={{ padding: '10px 12px', background: 'var(--bg)', borderRadius: 'var(--r-md)', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: 14 }}>{isHi ? t.hi : t.en}</span>
              {t.verified && <span className="badge badge-green"><ShieldCheck size={10} /> {isHi ? 'सत्यापित' : 'Verified'}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="card">
        <h3 style={{ fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 700, color: 'var(--navy)', marginBottom: 'var(--sp-md)' }}>
          <Star size={16} style={{ display: 'inline', marginRight: 6 }} />
          {isHi ? 'ग्राहक समीक्षाएं' : 'Customer Reviews'}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {REVIEWS.map((r, i) => (
            <div key={i} style={{ padding: 'var(--sp-md)', background: 'var(--bg)', borderRadius: 'var(--r-md)', border: '1px solid var(--border)' }}>
              <div className="flex-between" style={{ marginBottom: 6 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{r.name}</div>
                <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                  <span style={{ color: '#F59E0B' }}>{'★'.repeat(r.rating)}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 4 }}>{r.date}</span>
                </div>
              </div>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                "{isHi ? r.text_hi : r.text_en}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
