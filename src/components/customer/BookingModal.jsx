import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import {
  X, Zap, Calendar, Clock, MapPin, User, ShieldCheck,
  CheckCircle2, ArrowRight, ArrowLeft, CreditCard, Phone
} from 'lucide-react';

const WORKER_POOL = [
  { id: 'wkr-101', name: 'Satish Kumar Verma', rating: 4.9, reviews: 312, distance: '0.8 km', eta: '12 min', society: 'Delhi Shramik Sahakari', ncct: 'Level 4', rate: 350, avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80' },
  { id: 'wkr-104', name: 'Arvind Singh Patel', rating: 4.7, reviews: 198, distance: '1.4 km', eta: '18 min', society: 'Delhi Shramik Sahakari', ncct: 'Level 3', rate: 320, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
];

const PROBLEMS = {
  electrician: [
    { en: 'Power outage / trip', hi: 'बिजली गुल / ट्रिपिंग' },
    { en: 'New wiring / switchboard', hi: 'नई वायरिंग / स्विचबोर्ड' },
    { en: 'Fan / light fitting', hi: 'पंखा / लाइट फिटिंग' },
    { en: 'AC installation / repair', hi: 'AC इंस्टॉलेशन / मरम्मत' },
    { en: 'Inverter / battery', hi: 'इन्वर्टर / बैटरी' },
    { en: 'Other electrical work', hi: 'अन्य बिजली कार्य' },
  ],
  plumber: [
    { en: 'Leaking pipe / tap', hi: 'पाइप / नल रिसाव' },
    { en: 'Blocked drain / toilet', hi: 'बंद नाली / शौचालय' },
    { en: 'Geyser installation', hi: 'गीज़र इंस्टॉलेशन' },
    { en: 'Water tank cleaning', hi: 'पानी टंकी सफाई' },
    { en: 'Other plumbing', hi: 'अन्य प्लंबिंग कार्य' },
  ],
  default: [
    { en: 'General repair / maintenance', hi: 'सामान्य मरम्मत / रखरखाव' },
    { en: 'New installation', hi: 'नई स्थापना' },
    { en: 'Deep cleaning', hi: 'गहन सफाई' },
    { en: 'Inspection / quote', hi: 'निरीक्षण / कोटेशन' },
    { en: 'Emergency service', hi: 'आपातकालीन सेवा' },
    { en: 'Other', hi: 'अन्य' },
  ]
};

export const BookingModal = ({ category, onClose }) => {
  const { language, setActiveBooking, triggerToast } = usePlatform();
  const isHi = language === 'hi';

  const [step, setStep] = useState(1); // 1=problem, 2=schedule, 3=worker, 4=confirm
  const [isEmergency, setIsEmergency] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [address, setAddress] = useState('');
  const [selectedWorker, setSelectedWorker] = useState(WORKER_POOL[0]);
  const [bookingDone, setBookingDone] = useState(false);
  const [otp, setOtp] = useState('');

  const problems = PROBLEMS[category?.id] || PROBLEMS.default;
  const estimatedAmount = selectedWorker?.rate ? selectedWorker.rate * 1.5 : 500;
  const workerWage = Math.round(estimatedAmount * 0.88);
  const welfare   = Math.round(estimatedAmount * 0.07);
  const ncct      = Math.round(estimatedAmount * 0.05);

  const handleConfirm = () => {
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setOtp(generatedOtp);
    setActiveBooking({
      id: `BK-${Date.now()}`,
      category: category?.id,
      serviceName: selectedProblem || (isHi ? 'सामान्य सेवा' : 'General Service'),
      workerName: selectedWorker.name,
      workerAvatar: selectedWorker.avatar,
      societyName: selectedWorker.society,
      date: scheduledDate || new Date().toLocaleDateString('en-IN'),
      amount: estimatedAmount,
      workerWage,
      welfareContribution: welfare,
      platformNcctShare: ncct,
      otp: generatedOtp,
      isEmergency,
      status: 'confirmed'
    });
    setBookingDone(true);
    triggerToast && triggerToast(isHi ? '✓ बुकिंग सफलतापूर्वक की गई!' : '✓ Booking confirmed!');
  };

  const catLabel = isHi ? category?.label_hi : category?.label_en;

  if (bookingDone) return (
    <div className="modal-backdrop">
      <div className="modal-box" style={{ textAlign: 'center', padding: 'var(--sp-xl)' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
        <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 22, fontWeight: 800, color: 'var(--green)', marginBottom: 8 }}>
          {isHi ? 'बुकिंग सफल!' : 'Booking Confirmed!'}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 15, marginBottom: 'var(--sp-lg)' }}>
          {isHi
            ? `${selectedWorker.name} ${isEmergency ? '15 मिनट में' : 'निर्धारित समय पर'} पहुंचेंगे।`
            : `${selectedWorker.name} will arrive ${isEmergency ? 'within 15 minutes' : 'at scheduled time'}.`}
        </p>

        <div className="card" style={{ background: 'var(--bg)', marginBottom: 'var(--sp-lg)', textAlign: 'left' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
            <div className="flex-between"><span style={{ color: 'var(--text-muted)' }}>{isHi ? 'OTP (आगमन पर बताएं)' : 'OTP (share on arrival)'}</span><strong style={{ fontSize: 20, letterSpacing: 4, color: 'var(--saffron)' }}>{otp}</strong></div>
            <div className="flex-between"><span style={{ color: 'var(--text-muted)' }}>{isHi ? 'कामगार' : 'Worker'}</span><strong>{selectedWorker.name}</strong></div>
            <div className="flex-between"><span style={{ color: 'var(--text-muted)' }}>{isHi ? 'अनुमानित राशि' : 'Estimated Amount'}</span><strong>₹{estimatedAmount}</strong></div>
            <div className="flex-between"><span style={{ color: 'var(--text-muted)' }}>{isHi ? 'कामगार को प्रत्यक्ष (88%)' : 'Worker direct (88%)'}</span><strong style={{ color: 'var(--green)' }}>₹{workerWage}</strong></div>
          </div>
        </div>

        <button className="btn btn-primary btn-full" onClick={onClose}>
          {isHi ? 'बुकिंग ट्रैक करें' : 'Track Booking'} <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        {/* Header */}
        <div className="modal-header">
          <div>
            <div className="modal-title">
              {step === 1 && (isHi ? 'समस्या चुनें' : 'Select Problem')}
              {step === 2 && (isHi ? 'समय चुनें' : 'Schedule Service')}
              {step === 3 && (isHi ? 'कामगार चुनें' : 'Choose Worker')}
              {step === 4 && (isHi ? 'बुकिंग की पुष्टि करें' : 'Confirm Booking')}
            </div>
            <div style={{ fontSize: 13, color: 'var(--saffron)', fontWeight: 600 }}>
              {catLabel} &nbsp;•&nbsp; {isHi ? `चरण ${step}/4` : `Step ${step} of 4`}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Step progress dots */}
            <div style={{ display: 'flex', gap: 5 }}>
              {[1,2,3,4].map(s => (
                <div key={s} style={{
                  width: s <= step ? 20 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: s < step ? 'var(--green)' : s === step ? 'var(--saffron)' : 'var(--border)',
                  transition: 'all 0.3s ease'
                }} />
              ))}
            </div>
            <button className="btn btn-ghost btn-icon btn-sm" onClick={onClose}><X size={18} /></button>
          </div>
        </div>

        {/* Body */}
        <div className="modal-body" style={{ padding: 'var(--sp-lg) var(--sp-xl)' }}>

          {/* STEP 1: Problem */}
          {step === 1 && (
            <div>
              {/* Emergency toggle */}
              <div
                onClick={() => setIsEmergency(!isEmergency)}
                style={{
                  cursor: 'pointer',
                  padding: 'var(--sp-md)',
                  borderRadius: 'var(--r-lg)',
                  border: `2px solid ${isEmergency ? 'var(--sos)' : 'var(--border)'}`,
                  background: isEmergency ? 'var(--sos-light)' : 'var(--bg)',
                  marginBottom: 'var(--sp-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ fontSize: 28 }}>🚨</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: isEmergency ? 'var(--sos)' : 'var(--text)' }}>
                    {isHi ? 'आपातकालीन सेवा — 15 मिनट में' : 'Emergency Service — Within 15 min'}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                    {isHi ? 'SOS: निकटतम कामगार को तुरंत भेजा जाएगा' : 'SOS: Nearest worker dispatched immediately'}
                  </div>
                </div>
                <div className={`toggle-track ${isEmergency ? 'on' : ''}`} style={{ background: isEmergency ? 'var(--sos)' : 'var(--border)' }}>
                  <div className="toggle-thumb" />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 'var(--sp-md)' }}>
                <label className="form-label">{isHi ? 'समस्या का विवरण चुनें' : 'Select the problem type'}</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {problems.map((p, i) => (
                    <label key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '12px var(--sp-md)',
                      borderRadius: 'var(--r-md)',
                      border: `2px solid ${selectedProblem === (isHi ? p.hi : p.en) ? 'var(--navy)' : 'var(--border)'}`,
                      background: selectedProblem === (isHi ? p.hi : p.en) ? '#EFF4FB' : 'var(--card)',
                      cursor: 'pointer',
                      fontSize: 14,
                      fontWeight: 600,
                      transition: 'all 0.15s ease'
                    }}>
                      <input
                        type="radio"
                        name="problem"
                        value={isHi ? p.hi : p.en}
                        checked={selectedProblem === (isHi ? p.hi : p.en)}
                        onChange={e => setSelectedProblem(e.target.value)}
                        style={{ accentColor: 'var(--navy)', width: 18, height: 18 }}
                      />
                      {isHi ? p.hi : p.en}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Schedule */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-md)' }}>
              {isEmergency ? (
                <div className="alert alert-error">
                  <span>🚨</span>
                  <span>{isHi ? 'आपातकालीन बुकिंग: कामगार 15 मिनट में पहुंचेगा। तारीख/समय की ज़रूरत नहीं।' : 'Emergency booking: Worker will arrive within 15 minutes. No scheduling needed.'}</span>
                </div>
              ) : (
                <>
                  <div className="form-group">
                    <label className="form-label"><Calendar size={15} style={{ display: 'inline', marginRight: 4 }} />{isHi ? 'तारीख चुनें' : 'Select Date'}</label>
                    <input
                      type="date"
                      className="form-input"
                      value={scheduledDate}
                      onChange={e => setScheduledDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label"><Clock size={15} style={{ display: 'inline', marginRight: 4 }} />{isHi ? 'समय चुनें' : 'Select Time'}</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                      {['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM', '7:00 PM'].map(t => (
                        <button
                          key={t}
                          onClick={() => setScheduledTime(t)}
                          className={`btn btn-sm ${scheduledTime === t ? 'btn-navy' : 'btn-ghost'}`}
                        >{t}</button>
                      ))}
                    </div>
                  </div>
                </>
              )}
              <div className="form-group">
                <label className="form-label"><MapPin size={15} style={{ display: 'inline', marginRight: 4 }} />{isHi ? 'पूरा पता' : 'Full Address'}</label>
                <textarea
                  className="form-input"
                  placeholder={isHi ? 'गली, मोहल्ला, शहर, पिन कोड...' : 'Street, locality, city, PIN code...'}
                  rows={3}
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  style={{ resize: 'vertical', minHeight: 80 }}
                />
              </div>
            </div>
          )}

          {/* STEP 3: Worker */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-md)' }}>
              {WORKER_POOL.map(w => (
                <div
                  key={w.id}
                  onClick={() => setSelectedWorker(w)}
                  style={{
                    border: `2px solid ${selectedWorker?.id === w.id ? 'var(--navy)' : 'var(--border)'}`,
                    borderRadius: 'var(--r-lg)',
                    padding: 'var(--sp-md)',
                    cursor: 'pointer',
                    background: selectedWorker?.id === w.id ? '#EFF4FB' : 'var(--card)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <img src={w.avatar} alt={w.name} style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border)', flexShrink: 0 }} onError={e => { e.target.style.display = 'none'; }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--navy)' }}>{w.name}</div>
                      <div style={{ fontSize: 13, color: 'var(--text-muted)', margin: '2px 0' }}>{w.society}</div>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
                        <span className="badge badge-verified">✓ {isHi ? 'सत्यापित' : 'Verified'}</span>
                        <span className="ncct-badge">NCCT {w.ncct}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 16, color: 'var(--saffron)' }}>₹{w.rate}/hr</div>
                      <div style={{ fontSize: 12, color: '#F59E0B' }}>★ {w.rating}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 16, marginTop: 10, fontSize: 12, color: 'var(--text-muted)' }}>
                    <span><MapPin size={11} style={{ display: 'inline' }} /> {w.distance}</span>
                    <span><Clock size={11} style={{ display: 'inline' }} /> {isHi ? `ETA: ${w.eta}` : `ETA: ${w.eta}`}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* STEP 4: Confirm */}
          {step === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-md)' }}>
              {/* Summary */}
              <div className="card" style={{ background: 'var(--bg)', border: '1.5px solid var(--border)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
                  {[
                    { label: isHi ? 'सेवा' : 'Service', value: catLabel },
                    { label: isHi ? 'समस्या' : 'Problem', value: selectedProblem || '—' },
                    { label: isHi ? 'कामगार' : 'Worker', value: selectedWorker?.name },
                    { label: isHi ? 'समय' : 'Timing', value: isEmergency ? (isHi ? '🚨 15 मिनट में' : '🚨 Within 15 min') : `${scheduledDate} ${scheduledTime}` },
                  ].map((row, i) => (
                    <div key={i} className="flex-between" style={{ paddingBottom: i < 3 ? 10 : 0, borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
                      <span style={{ color: 'var(--text-muted)' }}>{row.label}</span>
                      <span style={{ fontWeight: 600, textAlign: 'right', maxWidth: '60%' }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment split */}
              <div style={{ background: 'var(--green-pale)', border: '1.5px solid #A7DFC4', borderRadius: 'var(--r-lg)', padding: 'var(--sp-md)' }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--green)', marginBottom: 12 }}>
                  💰 {isHi ? 'भुगतान कैसे जाएगा?' : 'Payment Breakdown'}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { label: isHi ? '🧑‍🔧 कामगार को (88%)' : '🧑‍🔧 Worker direct (88%)', value: `₹${workerWage}`, color: 'var(--green)' },
                    { label: isHi ? '🏥 कल्याण व पेंशन (7%)' : '🏥 Welfare & Pension (7%)', value: `₹${welfare}`, color: 'var(--amber)' },
                    { label: isHi ? '🏛 NCCT व मंच (5%)' : '🏛 NCCT & Platform (5%)', value: `₹${ncct}`, color: 'var(--navy)' },
                  ].map((r, i) => (
                    <div key={i} className="flex-between" style={{ fontSize: 13 }}>
                      <span>{r.label}</span>
                      <span style={{ fontWeight: 800, color: r.color }}>{r.value}</span>
                    </div>
                  ))}
                  <div style={{ borderTop: '1.5px solid #A7DFC4', paddingTop: 10, marginTop: 4 }} className="flex-between">
                    <span style={{ fontWeight: 700 }}>{isHi ? 'कुल अनुमानित राशि' : 'Total Estimated'}</span>
                    <span style={{ fontWeight: 800, fontSize: 18, fontFamily: 'var(--font-head)' }}>₹{estimatedAmount}</span>
                  </div>
                </div>
              </div>

              <div className="alert alert-info" style={{ fontSize: 13 }}>
                <ShieldCheck size={16} />
                {isHi
                  ? 'OTP सत्यापन के बाद UPI/AePS से तत्काल भुगतान। कोई नकद नहीं।'
                  : 'Instant UPI/AePS payment after OTP verification. No cash needed.'}
              </div>
            </div>
          )}
        </div>

        {/* Footer nav */}
        <div className="modal-footer">
          {step > 1 && (
            <button className="btn btn-ghost" onClick={() => setStep(s => s - 1)}>
              <ArrowLeft size={15} /> {isHi ? 'वापस' : 'Back'}
            </button>
          )}
          {step < 4 ? (
            <button
              className="btn btn-primary"
              onClick={() => setStep(s => s + 1)}
              disabled={step === 1 && !selectedProblem}
              style={{ opacity: step === 1 && !selectedProblem ? 0.5 : 1 }}
            >
              {isHi ? 'आगे बढ़ें' : 'Continue'} <ArrowRight size={15} />
            </button>
          ) : (
            <button className="btn btn-green" onClick={handleConfirm}>
              <CheckCircle2 size={15} /> {isHi ? 'बुकिंग की पुष्टि करें' : 'Confirm Booking'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
