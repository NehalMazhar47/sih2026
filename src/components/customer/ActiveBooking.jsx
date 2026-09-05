import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { MapPin, Phone, Star, CheckCircle2, Clock, ShieldCheck, Receipt } from 'lucide-react';

const STEPS = [
  { en: 'Confirmed', hi: 'पुष्टि हुई' },
  { en: 'En Route', hi: 'रास्ते में' },
  { en: 'Arrived', hi: 'पहुंच गए' },
  { en: 'Working', hi: 'काम चल रहा' },
  { en: 'Completed', hi: 'पूर्ण' },
];

export const ActiveBooking = () => {
  const { language, activeBooking, setActiveBooking } = usePlatform();
  const isHi = language === 'hi';
  const [currentStep, setCurrentStep] = useState(0);
  const [rating, setRating] = useState(0);
  const [hoverStar, setHoverStar] = useState(0);
  const [showInvoice, setShowInvoice] = useState(false);

  if (!activeBooking) return null;

  const isDone = currentStep === 4;

  return (
    <div id="active-booking-modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(15,41,66,0.55)', zIndex: 500, display: 'flex', alignItems: 'flex-end', backdropFilter: 'blur(3px)' }}>
      <div style={{ width: '100%', maxWidth: 600, margin: '0 auto', background: 'var(--card)', borderRadius: 'var(--r-xl) var(--r-xl) 0 0', maxHeight: '90vh', overflowY: 'auto' }}>

        {/* Header */}
        <div style={{ padding: 'var(--sp-lg) var(--sp-xl)', borderBottom: '1.5px solid var(--border)', background: isDone ? 'var(--green-pale)' : 'var(--saffron-pale)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ fontSize: 28 }}>{isDone ? '✅' : '🔔'}</div>
            <div>
              <div style={{ fontFamily: 'var(--font-head)', fontSize: 18, fontWeight: 800, color: isDone ? 'var(--green)' : 'var(--saffron)' }}>
                {isDone
                  ? (isHi ? 'सेवा पूर्ण हुई!' : 'Service Completed!')
                  : (isHi ? 'बुकिंग सक्रिय है' : 'Booking Active')}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                {activeBooking.serviceName} • {isHi ? 'बुकिंग ID:' : 'ID:'} {activeBooking.id}
              </div>
            </div>
          </div>
          <button
            onClick={() => setActiveBooking(null)}
            style={{ background: 'none', border: 'none', fontSize: 22, color: 'var(--text-muted)', cursor: 'pointer', padding: 4 }}
            title="Minimize"
          >
            ✕
          </button>
        </div>

        <div style={{ padding: 'var(--sp-lg) var(--sp-xl)' }}>
          {/* Status stepper */}
          <div style={{ display: 'flex', gap: 0, marginBottom: 'var(--sp-xl)' }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div style={{
                    position: 'absolute',
                    top: 15,
                    left: '50%',
                    width: '100%',
                    height: 2,
                    background: i < currentStep ? 'var(--green)' : 'var(--border)',
                    zIndex: 1,
                    transition: 'background 0.4s ease'
                  }} />
                )}
                {/* Dot */}
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', zIndex: 2,
                  background: i < currentStep ? 'var(--green)' : i === currentStep ? 'var(--saffron)' : 'var(--bg)',
                  border: `2.5px solid ${i < currentStep ? 'var(--green)' : i === currentStep ? 'var(--saffron)' : 'var(--border)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: i <= currentStep ? 'white' : 'var(--text-muted)',
                  fontSize: i < currentStep ? 16 : 12,
                  fontWeight: 700,
                  transition: 'all 0.3s ease',
                  boxShadow: i === currentStep ? '0 0 0 4px rgba(230,81,0,0.15)' : 'none'
                }}>
                  {i < currentStep ? '✓' : i + 1}
                </div>
                <div style={{ fontSize: 10, fontWeight: 600, marginTop: 6, textAlign: 'center', color: i <= currentStep ? 'var(--text)' : 'var(--text-muted)', lineHeight: 1.2 }}>
                  {isHi ? s.hi : s.en}
                </div>
              </div>
            ))}
          </div>

          {/* Worker card */}
          <div className="card" style={{ marginBottom: 'var(--sp-md)', padding: 'var(--sp-md)' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <img src={activeBooking.workerAvatar} alt={activeBooking.workerName}
                style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', border: '2.5px solid var(--border)' }}
                onError={e => { e.target.style.display = 'none'; }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--navy)' }}>{activeBooking.workerName}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{activeBooking.societyName}</div>
                <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                  <span className="badge badge-verified">✓ {isHi ? 'सत्यापित' : 'Verified'}</span>
                </div>
              </div>
              {!isDone && (
                <div style={{ display: 'flex', flex: 'column', gap: 8 }}>
                  <button className="btn btn-ghost btn-icon btn-sm" title="Call">
                    <Phone size={16} color="var(--green)" />
                  </button>
                </div>
              )}
            </div>
            {!isDone && (
              <div style={{ marginTop: 12, padding: '10px var(--sp-md)', background: 'var(--bg)', borderRadius: 'var(--r-md)', fontSize: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{isHi ? 'OTP (आगमन पर दें)' : 'OTP (share on arrival)'}</span>
                  <strong style={{ fontSize: 18, letterSpacing: 4, color: 'var(--saffron)' }}>{activeBooking.otp}</strong>
                </div>
              </div>
            )}
          </div>

          {/* Simulate progress (demo) */}
          {!isDone && (
            <button
              className="btn btn-outline btn-full"
              onClick={() => setCurrentStep(s => Math.min(s + 1, 4))}
            >
              {isHi ? 'अगले चरण का अनुकरण (Demo)' : 'Simulate Next Step (Demo)'}
            </button>
          )}

          {/* Completed: Rating */}
          {isDone && (
            <div>
              <div className="card" style={{ marginBottom: 'var(--sp-md)', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 700, color: 'var(--navy)', marginBottom: 'var(--sp-md)' }}>
                  {isHi ? 'कामगार को रेट करें' : 'Rate Your Worker'}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 'var(--sp-md)' }}>
                  {[1,2,3,4,5].map(s => (
                    <button
                      key={s}
                      onClick={() => setRating(s)}
                      onMouseEnter={() => setHoverStar(s)}
                      onMouseLeave={() => setHoverStar(0)}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        fontSize: 36, color: s <= (hoverStar || rating) ? '#F59E0B' : 'var(--border)',
                        transition: 'color 0.1s ease'
                      }}
                    >★</button>
                  ))}
                </div>
                {rating > 0 && (
                  <div style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 'var(--sp-md)' }}>
                    {rating === 5 ? (isHi ? 'उत्कृष्ट! शुक्रिया।' : 'Excellent! Thank you.') :
                     rating === 4 ? (isHi ? 'बहुत अच्छा' : 'Very Good') :
                     rating === 3 ? (isHi ? 'ठीक था' : 'Satisfactory') :
                     (isHi ? 'सुधार की ज़रूरत है' : 'Needs Improvement')}
                  </div>
                )}
                <button className="btn btn-green btn-full" onClick={() => { setShowInvoice(true); setActiveBooking(null); }}>
                  {isHi ? 'डिजिटल रसीद देखें' : 'View Digital Invoice'} <Receipt size={15} />
                </button>
              </div>
            </div>
          )}

          {/* Payment summary */}
          <div style={{ background: 'var(--green-pale)', border: '1.5px solid #A7DFC4', borderRadius: 'var(--r-lg)', padding: 'var(--sp-md)', fontSize: 13 }}>
            <div style={{ fontWeight: 700, color: 'var(--green)', marginBottom: 10 }}>
              💰 {isHi ? 'भुगतान का पारदर्शी विवरण' : 'Transparent Payment Breakdown'}
            </div>
            {[
              { label: isHi ? 'कामगार को (88%)' : 'Worker direct (88%)', value: `₹${activeBooking.workerWage}`, color: 'var(--green)' },
              { label: isHi ? 'कल्याण व पेंशन (7%)' : 'Welfare & Pension (7%)', value: `₹${Math.round(activeBooking.welfareContribution)}`, color: 'var(--amber)' },
              { label: isHi ? 'NCCT व मंच (5%)' : 'NCCT & Platform (5%)', value: `₹${activeBooking.platformNcctShare}`, color: 'var(--navy)' },
              { label: isHi ? 'कुल राशि' : 'Total', value: `₹${activeBooking.amount}`, color: 'var(--text)', bold: true },
            ].map((r, i) => (
              <div key={i} className="flex-between" style={{ paddingBottom: i < 3 ? 8 : 0, borderBottom: i < 3 ? '1px solid #A7DFC4' : 'none', marginBottom: i < 3 ? 8 : 0 }}>
                <span style={{ color: 'var(--text-muted)' }}>{r.label}</span>
                <span style={{ fontWeight: r.bold ? 800 : 700, color: r.color }}>{r.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
