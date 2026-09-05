import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { ShieldCheck, X, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

const PENDING = [
  { id: 'P-001', name: 'Ravi Shankar Yadav',   trade: 'Electrician', trade_hi: 'इलेक्ट्रीशियन', state: 'UP',      ncct: 'Level 3', aadhaar: '✓', police: '✓', medical: '✓', experience: '5 yrs' },
  { id: 'P-002', name: 'Lalita Kumari',         trade: 'Caregiver',   trade_hi: 'देखभालकर्ता',  state: 'Bihar',   ncct: 'Level 2', aadhaar: '✓', police: '✓', medical: '⏳', experience: '3 yrs' },
  { id: 'P-003', name: 'Suresh Mistry',         trade: 'Carpenter',   trade_hi: 'बढ़ई',          state: 'Gujarat', ncct: 'Level 3', aadhaar: '✓', police: '⏳', medical: '✓', experience: '9 yrs' },
];

export const WorkerVerificationDesk = () => {
  const { language, triggerToast } = usePlatform();
  const isHi = language === 'hi';
  const [pending, setPending] = useState(PENDING);

  const approve = (id) => {
    setPending(p => p.filter(w => w.id !== id));
    triggerToast && triggerToast(isHi ? '✓ कामगार सत्यापित और अनुमोदित!' : '✓ Worker verified and approved!');
  };
  const reject = (id) => {
    setPending(p => p.filter(w => w.id !== id));
    triggerToast && triggerToast(isHi ? 'आवेदन अस्वीकृत।' : 'Application rejected.');
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title" style={{ fontSize: 18 }}>
            🔍 {isHi ? 'NCCT कामगार सत्यापन डेस्क' : 'NCCT Worker Verification Desk'}
          </h2>
          <p className="section-subtitle">
            {isHi ? 'आधार, पुलिस क्लियरेंस, चिकित्सा और NCCT प्रमाणपत्र जांच' : 'Aadhaar, Police Clearance, Medical & NCCT credential checks'}
          </p>
        </div>
        <span className="badge badge-amber"><Clock size={11} /> {pending.length} {isHi ? 'प्रतीक्षारत' : 'Pending'}</span>
      </div>

      {pending.length === 0 ? (
        <div className="alert alert-success">
          <CheckCircle2 size={18} />
          <span style={{ fontWeight: 600 }}>{isHi ? 'सभी आवेदन निपटाए गए!' : 'All applications processed!'}</span>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-md)' }}>
          {pending.map(w => (
            <div key={w.id} className="card">
              <div className="flex-between" style={{ marginBottom: 'var(--sp-md)', flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 700, color: 'var(--navy)' }}>{w.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                    {isHi ? w.trade_hi : w.trade} • {w.state} • {w.experience} • {w.ncct}
                  </div>
                </div>
                <span className="badge badge-gray">#{w.id}</span>
              </div>

              {/* Criteria checks */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 8, marginBottom: 'var(--sp-md)' }}>
                {[
                  { label: isHi ? 'आधार ई-केवाईसी' : 'Aadhaar e-KYC', status: w.aadhaar },
                  { label: isHi ? 'पुलिस क्लियरेंस' : 'Police Clearance', status: w.police },
                  { label: isHi ? 'चिकित्सा जांच' : 'Medical Check', status: w.medical },
                  { label: `NCCT ${w.ncct}`, status: '✓' },
                ].map((c, i) => (
                  <div key={i} style={{
                    padding: '8px 12px',
                    borderRadius: 'var(--r-md)',
                    background: c.status === '✓' ? 'var(--green-pale)' : 'var(--amber-pale)',
                    border: `1px solid ${c.status === '✓' ? '#A7DFC4' : '#FFE082'}`,
                    fontSize: 12
                  }}>
                    <div style={{ fontWeight: 700, color: c.status === '✓' ? 'var(--green)' : 'var(--amber)' }}>
                      {c.status === '✓' ? '✅' : '⏳'} {c.status === '✓' ? (isHi ? 'सत्यापित' : 'Verified') : (isHi ? 'प्रतीक्षारत' : 'Pending')}
                    </div>
                    <div style={{ color: 'var(--text-muted)', marginTop: 2 }}>{c.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  className="btn btn-green"
                  style={{ flex: 1 }}
                  onClick={() => approve(w.id)}
                  disabled={w.police === '⏳' || w.medical === '⏳'}
                >
                  <CheckCircle2 size={15} /> {isHi ? 'अनुमोदन करें' : 'Approve & Badge'}
                </button>
                <button className="btn btn-ghost" onClick={() => reject(w.id)}>
                  <X size={15} /> {isHi ? 'अस्वीकार' : 'Reject'}
                </button>
              </div>
              {(w.police === '⏳' || w.medical === '⏳') && (
                <div className="alert alert-warning mt-sm" style={{ fontSize: 12 }}>
                  <AlertTriangle size={14} />
                  {isHi ? 'अनुमोदन से पहले सभी जांच पूर्ण होनी चाहिए।' : 'All checks must be complete before approval.'}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
