import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { HardHat, User, Phone, CreditCard, Wrench, Building2, CheckCircle2 } from 'lucide-react';

const COOP_SOCIETIES = [
  'Delhi Shramik Sahakari Samiti Ltd.',
  'UP Mahila & Shramik Sahakari Federation',
  'Maharashtra Shramik Swavalamban Society',
  'Bihar Gramin PACS & Gig Cooperative',
  'Karnataka Shramik Sahakari Sangha'
];

const TRADES = [
  { id: 'electrician', en: 'Electrician',     hi: 'इलेक्ट्रीशियन' },
  { id: 'plumber',     en: 'Plumber',          hi: 'प्लंबर' },
  { id: 'carpenter',  en: 'Carpenter',         hi: 'बढ़ई' },
  { id: 'caregiver',  en: 'Caregiver',         hi: 'देखभालकर्ता' },
  { id: 'cleaning',   en: 'Cleaning',          hi: 'सफाई' },
  { id: 'painter',    en: 'Painter',           hi: 'पेंटर' },
  { id: 'driver',     en: 'Driver',            hi: 'चालक' },
];

const Field = ({ label, children }) => (
  <div>
    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
      {label}
    </label>
    {children}
  </div>
);

const inputStyle = {
  width: '100%',
  padding: '11px 14px',
  border: '1.5px solid var(--border)',
  borderRadius: 10,
  fontSize: 14,
  background: 'var(--bg)',
  color: 'var(--text)',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
};

export const WorkerRegisterModal = ({ onSuccess, onSwitchToCustomer }) => {
  const { language, setRole, registerUserSession, setPendingWorkers, showToast, speakText } = usePlatform();
  const isHi = language === 'hi';

  const [name, setName]         = useState('');
  const [phone, setPhone]       = useState('');
  const [aadhaar, setAadhaar]   = useState('');
  const [trade, setTrade]       = useState('electrician');
  const [society, setSociety]   = useState(COOP_SOCIETIES[0]);
  const [upiId, setUpiId]       = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !aadhaar) return;

    const pendingId = `pnd-${Date.now()}`;

    // Add to admin verification queue
    setPendingWorkers(prev => [{
      id: pendingId,
      name,
      phone,
      trade,
      societyName: society,
      ncctLevel: 'Level 3 (Certified Skilled)',
      ncctCourseTaken: `${trade.charAt(0).toUpperCase() + trade.slice(1)} Practical Certification (120 hrs)`,
      aadhaarNumber: `XXXX-XXXX-${aadhaar.slice(-4)}`,
      policeClearanceCert: `PCC/ND/2026/${Math.floor(1000 + Math.random() * 9000)} (Verified)`,
      tradeTestScore: Math.floor(82 + Math.random() * 16),
      appliedDate: new Date().toISOString().split('T')[0],
      experienceYears: 3,
      hourlyRate: 320,
      status: 'pending',
      documents: ['Aadhaar Card (e-KYC)', 'NCCT Skill Certificate', 'Police Verification', 'Society Membership Proof'],
      avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'
    }, ...prev]);

    // Register session as pending
    setRole('worker');
    registerUserSession({
      role: 'worker',
      status: 'pending',
      pendingId,
      name,
      phone,
      trade,
      society,
      upiId,
      avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'
    });

    showToast(
      isHi ? '📋 आवेदन सबमिट हुआ!' : '📋 Application Submitted!',
      isHi
        ? `${name}, आपका आवेदन सत्यापन कतार में है। महासंघ व NCCT की स्वीकृति प्रतीक्षित।`
        : `${name}, your application is in the verification queue. Awaiting dual approval.`,
      'info'
    );
    speakText(isHi ? `धन्यवाद ${name}। आवेदन प्रस्तुत हो गया।` : `Thank you ${name}. Application submitted for verification.`);

    setSubmitted(true);
    setTimeout(() => { if (onSuccess) onSuccess(); }, 1800);
  };

  // ── Success state ────────────────────────────────────
  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '32px 16px' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <CheckCircle2 size={36} />
        </div>
        <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', margin: '0 0 8px' }}>
          {isHi ? 'आवेदन सफलतापूर्वक सबमिट!' : 'Application Submitted!'}
        </h3>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>
          {isHi
            ? 'महासंघ एवं NCCT अधिकारी आपके दस्तावेज़ों की समीक्षा करेंगे।'
            : 'Federation & NCCT officers will review your documents and approve you.'}
        </p>
      </div>
    );
  }

  // ── Form ─────────────────────────────────────────────
  return (
    <div>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 22 }}>
        <div style={{ width: 54, height: 54, borderRadius: '50%', background: 'rgba(16,185,129,0.12)', color: 'var(--coop-green)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
          <HardHat size={28} />
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--coop-green)', margin: '0 0 4px' }}>
          {isHi ? 'श्रमिक पंजीकरण' : 'Worker Registration'}
        </h2>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>
          {isHi ? 'सहकारी श्रम प्लेटफ़ॉर्म — ShramSetu' : 'Cooperative Labour Platform — ShramSetu'}
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 14 }}>

        {/* Name */}
        <Field label={isHi ? 'पूरा नाम' : 'Full Name'}>
          <div style={{ position: 'relative' }}>
            <User size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              id="worker-reg-name"
              required
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder={isHi ? 'जैसे: सतीश कुमार वर्मा' : 'e.g. Satish Kumar Verma'}
              style={{ ...inputStyle, paddingLeft: 36 }}
            />
          </div>
        </Field>

        {/* Phone + Aadhaar row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Field label={isHi ? 'मोबाइल नंबर' : 'Mobile Number'}>
            <div style={{ position: 'relative' }}>
              <Phone size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                id="worker-reg-phone"
                required
                type="tel"
                maxLength={10}
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="98765 43210"
                style={{ ...inputStyle, paddingLeft: 36 }}
              />
            </div>
          </Field>
          <Field label={isHi ? 'आधार नंबर' : 'Aadhaar No.'}>
            <div style={{ position: 'relative' }}>
              <CreditCard size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                id="worker-reg-aadhaar"
                required
                type="text"
                maxLength={12}
                value={aadhaar}
                onChange={e => setAadhaar(e.target.value)}
                placeholder="4521 8812 9012"
                style={{ ...inputStyle, paddingLeft: 36, letterSpacing: 2 }}
              />
            </div>
          </Field>
        </div>

        {/* Trade */}
        <Field label={isHi ? 'मुख्य कौशल / व्यापार' : 'Primary Trade / Skill'}>
          <div style={{ position: 'relative' }}>
            <Wrench size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <select
              id="worker-reg-trade"
              value={trade}
              onChange={e => setTrade(e.target.value)}
              style={{ ...inputStyle, paddingLeft: 36, cursor: 'pointer' }}
            >
              {TRADES.map(t => (
                <option key={t.id} value={t.id}>{isHi ? t.hi : t.en}</option>
              ))}
            </select>
          </div>
        </Field>

        {/* Society */}
        <Field label={isHi ? 'सहकारी समिति' : 'Cooperative Society'}>
          <div style={{ position: 'relative' }}>
            <Building2 size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <select
              id="worker-reg-society"
              value={society}
              onChange={e => setSociety(e.target.value)}
              style={{ ...inputStyle, paddingLeft: 36, cursor: 'pointer' }}
            >
              {COOP_SOCIETIES.map((s, i) => (
                <option key={i} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </Field>

        {/* UPI */}
        <Field label={isHi ? 'UPI आई डी (मजदूरी के लिए)' : 'UPI ID (for wage payout)'}>
          <input
            id="worker-reg-upi"
            type="text"
            value={upiId}
            onChange={e => setUpiId(e.target.value)}
            placeholder="satish@upi  or  9876543210@paytm"
            style={inputStyle}
          />
        </Field>

        {/* Info box */}
        <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 10, padding: '10px 14px', fontSize: 12, color: 'var(--coop-green)', lineHeight: 1.5 }}>
          🏛️ {isHi
            ? 'आवेदन के बाद महासंघ व NCCT अधिकारी द्वारा दोहरे हस्ताक्षर से सत्यापन होगा।'
            : 'After submission, Federation Director & NCCT Officer will dual-sign to verify your account.'}
        </div>

        {/* Submit */}
        <button
          type="submit"
          id="worker-reg-submit-btn"
          style={{ width: '100%', padding: '13px', fontSize: 15, fontWeight: 800, background: 'var(--coop-green)', color: 'white', border: 'none', borderRadius: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 2 }}
        >
          <HardHat size={18} />
          {isHi ? 'पंजीकरण करें व आवेदन सबमिट करें' : 'Register & Submit Application'}
        </button>
      </form>

      {/* Switch to customer */}
      <div style={{ textAlign: 'center', marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--border)', fontSize: 13, color: 'var(--text-muted)' }}>
        {isHi ? 'क्या आप ग्राहक हैं?' : 'Hiring for home instead?'}{' '}
        <button
          type="button"
          onClick={onSwitchToCustomer}
          style={{ background: 'none', border: 'none', color: 'var(--primary-navy)', fontWeight: 800, cursor: 'pointer', textDecoration: 'underline', fontSize: 13 }}
        >
          {isHi ? 'ग्राहक खाता बनाएं →' : 'Register as Customer →'}
        </button>
      </div>
    </div>
  );
};
