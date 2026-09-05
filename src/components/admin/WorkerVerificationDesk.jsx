import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import {
  ShieldCheck, FileCheck, Award, CheckCircle2, XCircle,
  AlertCircle, UserCheck, Building, GraduationCap,
  X, PenLine, Clock, ChevronRight, User, Phone,
  CreditCard, Wrench, BadgeCheck, AlertTriangle
} from 'lucide-react';

const TRADE_LABELS = {
  electrician: { en: 'Electrician & Wireman', hi: 'इलेक्ट्रीशियन' },
  plumber:     { en: 'Plumber & Drainage',   hi: 'प्लंबर' },
  carpenter:   { en: 'Carpenter',             hi: 'बढ़ई' },
  caregiver:   { en: 'Elderly Caregiver',     hi: 'देखभालकर्ता' },
  cleaning:    { en: 'Deep Cleaning',         hi: 'सफाई विशेषज्ञ' },
  painter:     { en: 'Painter',               hi: 'रंगाई-पुताई' },
  driver:      { en: 'Commercial Driver',     hi: 'चालक' },
};

const ScoreBar = ({ score }) => {
  const color = score >= 85 ? '#10b981' : score >= 70 ? '#F59E0B' : '#ef4444';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{ width: `${score}%`, height: '100%', background: color, borderRadius: 99, transition: 'width 0.6s ease' }} />
      </div>
      <span style={{ fontWeight: 800, color, fontSize: 14, minWidth: 36 }}>{score}%</span>
    </div>
  );
};

const DocRow = ({ label, value, verified }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
    <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{label}</span>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{value}</span>
      {verified && <CheckCircle2 size={14} color="#10b981" />}
    </div>
  </div>
);

const WorkerDetailModal = ({ worker, onClose, onSign, onApprove, onReject, isHi }) => {
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);

  const hasFedSign = !!worker.federationSign;
  const hasNcctSign = !!worker.ncctSign;
  const bothSigned = hasFedSign && hasNcctSign;
  const isRejected = worker.status === 'rejected';

  const tradeName = TRADE_LABELS[worker.trade]?.[isHi ? 'hi' : 'en'] || worker.trade;

  return (
    <div className="modal-backdrop" style={{ alignItems: 'flex-start', paddingTop: 40 }}>
      <div className="modal-content" style={{ maxWidth: 720, padding: 0, overflow: 'hidden' }}>

        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #07192C 0%, #103568 100%)', padding: '22px 28px', position: 'relative' }}>
          <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer' }}>
            <X size={17} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <img src={worker.avatarUrl} alt={worker.name} style={{ width: 72, height: 72, borderRadius: 18, objectFit: 'cover', border: '3px solid var(--saffron)' }} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: 'white', margin: 0 }}>{worker.name}</h2>
                <span className="badge badge-saffron" style={{ textTransform: 'capitalize' }}>{tradeName}</span>
                {isRejected && <span className="badge" style={{ background: '#ef4444', color: 'white' }}>✕ Rejected</span>}
                {!isRejected && bothSigned && <span className="badge badge-green">✓ Dual-Signed</span>}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>
                <Building size={12} style={{ display: 'inline', marginRight: 4 }} />{worker.societyName}
                &nbsp;•&nbsp;{isHi ? 'आवेदन:' : 'Applied:'} {worker.appliedDate}
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: '24px 28px', maxHeight: 'calc(90vh - 200px)', overflowY: 'auto' }}>

          {/* Trade Test Score */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
              {isHi ? 'व्यापार परीक्षा स्कोर' : 'TRADE PRACTICAL SCORE'}
            </div>
            <ScoreBar score={worker.tradeTestScore || 0} />
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
              {worker.tradeTestScore >= 85 ? (isHi ? '✓ विशिष्टता (Distinction) — स्वीकृति हेतु पात्र' : '✓ Distinction — Eligible for approval') :
               worker.tradeTestScore >= 70 ? (isHi ? '⚠ पास — पुनश्चर्या अनुशंसित' : '⚠ Pass — Refresher recommended') :
               (isHi ? '✕ अनुत्तीर्ण — आवेदन अस्वीकार करें' : '✕ Fail — Reject application')}
            </div>
          </div>

          {/* Document Checklist */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>
              {isHi ? 'दस्तावेज़ सत्यापन' : 'DOCUMENT VERIFICATION'}
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: '4px 16px' }}>
              <DocRow label={isHi ? 'आधार e-KYC' : 'Aadhaar e-KYC'} value={worker.aadhaarNumber} verified />
              <DocRow label={isHi ? 'पुलिस क्लीयरेंस प्रमाण पत्र' : 'Police Clearance Certificate'} value={worker.policeClearanceCert} verified />
              <DocRow label={isHi ? 'NCCT प्रशिक्षण पाठ्यक्रम' : 'NCCT Training Course'} value={worker.ncctCourseTaken} verified />
              <DocRow label={isHi ? 'सहकारी समिति सदस्यता' : 'Cooperative Society Membership'} value={worker.societyName} verified />
              {worker.documents?.map((doc, i) => <DocRow key={i} label={doc} value="Uploaded" verified />)}
            </div>
          </div>

          {/* Dual Signature Status */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>
              {isHi ? 'द्वि-हस्ताक्षर अनुमोदन ट्रैकर' : 'DUAL-SIGNATURE APPROVAL TRACKER'}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {/* Federation Signature */}
              <div style={{ background: hasFedSign ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.04)', border: `1px solid ${hasFedSign ? '#10b981' : 'rgba(255,255,255,0.1)'}`, borderRadius: 14, padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <Building size={16} color={hasFedSign ? '#10b981' : 'var(--text-muted)'} />
                  <span style={{ fontWeight: 700, fontSize: 13, color: hasFedSign ? '#10b981' : 'var(--text-muted)' }}>
                    {isHi ? 'महासंघ निदेशक' : 'Federation Director'}
                  </span>
                </div>
                {hasFedSign ? (
                  <div>
                    <div style={{ fontSize: 11, color: '#10b981', fontWeight: 600 }}>✓ Signed</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{worker.federationSign}</div>
                  </div>
                ) : (
                  !isRejected && (
                    <button
                      id={`sign-federation-${worker.id}`}
                      onClick={() => { onSign(worker.id, 'federation'); }}
                      style={{ background: 'var(--primary-navy)', color: 'white', border: 'none', borderRadius: 8, padding: '7px 14px', fontSize: 12, cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}
                    >
                      <PenLine size={13} /> {isHi ? 'हस्ताक्षर करें' : 'Sign Now'}
                    </button>
                  )
                )}
              </div>

              {/* NCCT Signature */}
              <div style={{ background: hasNcctSign ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.04)', border: `1px solid ${hasNcctSign ? '#10b981' : 'rgba(255,255,255,0.1)'}`, borderRadius: 14, padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <GraduationCap size={16} color={hasNcctSign ? '#10b981' : 'var(--text-muted)'} />
                  <span style={{ fontWeight: 700, fontSize: 13, color: hasNcctSign ? '#10b981' : 'var(--text-muted)' }}>
                    {isHi ? 'NCCT क्षेत्रीय अधिकारी' : 'NCCT Regional Officer'}
                  </span>
                </div>
                {hasNcctSign ? (
                  <div>
                    <div style={{ fontSize: 11, color: '#10b981', fontWeight: 600 }}>✓ Signed</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{worker.ncctSign}</div>
                  </div>
                ) : (
                  !isRejected && hasFedSign && (
                    <button
                      id={`sign-ncct-${worker.id}`}
                      onClick={() => { onSign(worker.id, 'ncct'); }}
                      style={{ background: '#7c3aed', color: 'white', border: 'none', borderRadius: 8, padding: '7px 14px', fontSize: 12, cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}
                    >
                      <PenLine size={13} /> {isHi ? 'NCCT हस्ताक्षर करें' : 'Counter-Sign'}
                    </button>
                  )
                )}
                {!isRejected && !hasFedSign && (
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                    <Clock size={11} style={{ display: 'inline', marginRight: 4 }} />
                    {isHi ? 'महासंघ हस्ताक्षर प्रतीक्षित' : 'Awaiting Federation signature first'}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Rejection Section */}
          {isRejected && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 14, padding: '16px', marginBottom: 16 }}>
              <div style={{ fontWeight: 700, color: '#ef4444', fontSize: 14, marginBottom: 4 }}>
                <AlertTriangle size={14} style={{ display: 'inline', marginRight: 6 }} />
                {isHi ? 'अस्वीकृति कारण' : 'Rejection Reason'}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>{worker.rejectionReason}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Rejected on {worker.rejectedDate}</div>
            </div>
          )}

          {/* Action Buttons */}
          {!isRejected && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {/* Approve — only enabled when both signed */}
              <button
                id={`approve-worker-${worker.id}-btn`}
                onClick={() => bothSigned && onApprove(worker.id)}
                className="btn-emerald"
                style={{
                  flex: 1, padding: '12px 18px', fontSize: 14, opacity: bothSigned ? 1 : 0.4,
                  cursor: bothSigned ? 'pointer' : 'not-allowed'
                }}
                title={!bothSigned ? 'Both Federation & NCCT signatures required before approval' : ''}
              >
                <BadgeCheck size={17} />
                {isHi ? 'NCCT बैज जारी करें व स्वीकृत करें' : 'Issue NCCT Badge & Approve'}
              </button>

              <button
                onClick={() => { onSign(worker.id, 'federation'); }}
                className="btn"
                style={{ padding: '10px 14px', fontSize: 13, background: '#1e40af', color: 'white', border: 'none', borderRadius: 10 }}
              >
                <AlertCircle size={14} />
                {isHi ? 'पुनश्चर्या भेजें' : 'Flag for Refresher'}
              </button>

              {!showRejectForm ? (
                <button
                  onClick={() => setShowRejectForm(true)}
                  style={{ padding: '10px 14px', fontSize: 13, background: 'rgba(239,68,68,0.15)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  <XCircle size={14} /> {isHi ? 'अस्वीकार करें' : 'Reject'}
                </button>
              ) : (
                <div style={{ width: '100%', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 12, padding: 14 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#ef4444', marginBottom: 8 }}>
                    {isHi ? 'अस्वीकृति का कारण लिखें' : 'State rejection reason (mandatory)'}
                  </div>
                  <textarea
                    value={rejectReason}
                    onChange={e => setRejectReason(e.target.value)}
                    rows={3}
                    placeholder={isHi ? 'कारण टाइप करें...' : 'Type detailed reason for rejection...'}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '8px 12px', color: 'white', fontSize: 13, resize: 'vertical', boxSizing: 'border-box' }}
                  />
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <button
                      onClick={() => { onReject(worker.id, rejectReason || 'Application does not meet minimum standards.'); onClose(); }}
                      style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
                    >
                      {isHi ? 'अस्वीकृत करें' : 'Confirm Reject'}
                    </button>
                    <button onClick={() => setShowRejectForm(false)} style={{ background: 'transparent', color: 'var(--text-muted)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '8px 14px', fontSize: 13, cursor: 'pointer' }}>
                      {isHi ? 'रद्द करें' : 'Cancel'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const WorkerVerificationDesk = () => {
  const { pendingWorkers, approveWorkerVerification, rejectWorkerVerification, signVerification, language } = usePlatform();
  const isHi = language === 'hi';

  const [selectedWorker, setSelectedWorker] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'rejected'

  const filtered = pendingWorkers.filter(w => {
    if (filter === 'pending') return w.status !== 'rejected';
    if (filter === 'rejected') return w.status === 'rejected';
    return true;
  });

  const pendingCount = pendingWorkers.filter(w => w.status !== 'rejected').length;
  const rejectedCount = pendingWorkers.filter(w => w.status === 'rejected').length;

  const handleSign = (id, role) => {
    signVerification(id, role);
    // Update selected worker to reflect new signature state
    setSelectedWorker(prev => {
      if (!prev || prev.id !== id) return prev;
      const updated = { ...prev };
      if (role === 'federation') updated.federationSign = `Federation Director — ${new Date().toLocaleDateString('en-IN')}`;
      if (role === 'ncct') updated.ncctSign = `NCCT Regional Officer — ${new Date().toLocaleDateString('en-IN')}`;
      return updated;
    });
  };

  const handleApprove = (id) => {
    approveWorkerVerification(id);
    setSelectedWorker(null);
  };

  const handleReject = (id, reason) => {
    rejectWorkerVerification(id, reason);
    setSelectedWorker(null);
  };

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span className="badge badge-saffron">{isHi ? 'अनुपालन एवं ऑनबोर्डिंग डेस्क' : 'Compliance & Onboarding Desk'}</span>
            {pendingCount > 0 && <span className="badge badge-blue">{pendingCount} {isHi ? 'समीक्षाधीन' : 'In Review'}</span>}
            {rejectedCount > 0 && <span className="badge" style={{ background: 'rgba(239,68,68,0.2)', color: '#ef4444' }}>{rejectedCount} Rejected</span>}
          </div>
          <h2 style={{ fontSize: 22, marginTop: 6, marginBottom: 2 }}>
            {isHi ? 'श्रमिक सत्यापन एवं द्वि-हस्ताक्षर अनुमोदन डेस्क' : 'Worker Verification & Dual-Signature Approval Desk'}
          </h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>
            {isHi ? 'महासंघ निदेशक + NCCT क्षेत्रीय अधिकारी — दोनों के हस्ताक्षर अनिवार्य हैं।' : 'Both Federation Director & NCCT Regional Officer signatures required before badge issuance.'}
          </p>
        </div>

        {/* Filter pills */}
        <div style={{ display: 'flex', gap: 6 }}>
          {['all', 'pending', 'rejected'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: '6px 14px', fontSize: 12, fontWeight: 700, borderRadius: 99, border: '1px solid', cursor: 'pointer', background: filter === f ? 'var(--primary-navy)' : 'transparent', color: filter === f ? 'white' : 'var(--text-muted)', borderColor: filter === f ? 'var(--primary-navy)' : 'rgba(255,255,255,0.15)' }}>
              {f === 'all' ? (isHi ? 'सभी' : 'All') : f === 'pending' ? (isHi ? 'समीक्षाधीन' : 'Pending') : (isHi ? 'अस्वीकृत' : 'Rejected')}
            </button>
          ))}
        </div>
      </div>

      {/* Process Guide */}
      <div style={{ background: 'rgba(14,116,144,0.1)', border: '1px solid rgba(14,116,144,0.3)', borderRadius: 14, padding: '14px 20px', marginBottom: 22, display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
        {[
          { step: '1', label: isHi ? 'दस्तावेज़ समीक्षा' : 'Document Review', desc: isHi ? 'आधार, पुलिस, NCCT जांचें' : 'Check Aadhaar, PCC, NCCT cert' },
          { step: '2', label: isHi ? 'महासंघ हस्ताक्षर' : 'Federation Sign', desc: isHi ? 'निदेशक अनुमोदन' : 'Director approval' },
          { step: '3', label: isHi ? 'NCCT प्रतिहस्ताक्षर' : 'NCCT Counter-Sign', desc: isHi ? 'क्षेत्रीय अधिकारी' : 'Regional officer sign' },
          { step: '4', label: isHi ? 'NCCT बैज जारी' : 'Issue NCCT Badge', desc: isHi ? 'कारीगर सक्रिय होता है' : 'Worker goes live' },
        ].map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--coop-green)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12, flexShrink: 0 }}>{s.step}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{s.label}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.desc}</div>
            </div>
            {i < 3 && <ChevronRight size={14} color="var(--text-muted)" />}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="glass-panel" style={{ padding: 48, textAlign: 'center' }}>
          <CheckCircle2 size={52} color="#10b981" style={{ margin: '0 auto 14px' }} />
          <h3 style={{ fontSize: 18 }}>{isHi ? 'कोई आवेदन नहीं' : 'No Applications in Queue'}</h3>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
            {filter === 'rejected' ? (isHi ? 'कोई अस्वीकृत आवेदन नहीं।' : 'No rejected applications.') : (isHi ? 'सभी आवेदन प्रसंस्कृत हो चुके हैं।' : 'All applications have been processed.')}
          </p>
        </div>
      )}

      {/* Worker Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {filtered.map(cand => {
          const hasFed = !!cand.federationSign;
          const hasNcct = !!cand.ncctSign;
          const both = hasFed && hasNcct;
          const isRejected = cand.status === 'rejected';
          const tradeName = TRADE_LABELS[cand.trade]?.[isHi ? 'hi' : 'en'] || cand.trade;

          return (
            <div
              key={cand.id}
              className="glass-panel"
              style={{ padding: '20px 24px', border: `1px solid ${isRejected ? 'rgba(239,68,68,0.3)' : both ? 'rgba(16,185,129,0.3)' : 'rgba(244,140,6,0.3)'}`, display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}
            >
              <img src={cand.avatarUrl} alt={cand.name} style={{ width: 72, height: 72, borderRadius: 16, objectFit: 'cover', border: '2px solid var(--saffron)' }} />

              <div style={{ flex: 1, minWidth: 240 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 17, fontWeight: 800, color: '#ffffff' }}>{cand.name}</span>
                  <span className="badge badge-saffron" style={{ textTransform: 'capitalize', fontSize: 11 }}>{tradeName}</span>
                  {isRejected && <span className="badge" style={{ background: '#ef4444', color: 'white', fontSize: 11 }}>✕ Rejected</span>}
                  {!isRejected && both && <span className="badge badge-green" style={{ fontSize: 11 }}>✓ Both Signed</span>}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 3 }}>
                  {cand.societyName} • {isHi ? 'आवेदन:' : 'Applied:'} {cand.appliedDate}
                </div>

                {/* Signature chips */}
                <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 99, background: hasFed ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.06)', color: hasFed ? '#10b981' : 'var(--text-muted)', border: `1px solid ${hasFed ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.1)'}`, fontWeight: 600 }}>
                    🏛️ {isHi ? 'महासंघ' : 'Federation'}: {hasFed ? '✓' : '—'}
                  </span>
                  <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 99, background: hasNcct ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.06)', color: hasNcct ? '#10b981' : 'var(--text-muted)', border: `1px solid ${hasNcct ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.1)'}`, fontWeight: 600 }}>
                    🎓 NCCT: {hasNcct ? '✓' : '—'}
                  </span>
                  <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 99, background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    {isHi ? 'परीक्षा:' : 'Score:'} {cand.tradeTestScore}%
                  </span>
                </div>
              </div>

              {/* Review button */}
              <button
                id={`review-worker-${cand.id}-btn`}
                onClick={() => setSelectedWorker(cand)}
                style={{ padding: '10px 20px', fontSize: 13, fontWeight: 700, background: isRejected ? 'rgba(239,68,68,0.15)' : both ? 'rgba(16,185,129,0.15)' : 'rgba(244,140,6,0.15)', color: isRejected ? '#ef4444' : both ? '#10b981' : '#F59E0B', border: `1px solid ${isRejected ? 'rgba(239,68,68,0.3)' : both ? 'rgba(16,185,129,0.3)' : 'rgba(244,140,6,0.3)'}`, borderRadius: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
              >
                {isRejected ? <XCircle size={15} /> : both ? <BadgeCheck size={15} /> : <UserCheck size={15} />}
                {isRejected ? (isHi ? 'विवरण देखें' : 'View Details') : both ? (isHi ? 'अनुमोदित करें' : 'Issue Badge') : (isHi ? 'समीक्षा करें' : 'Review & Sign')}
              </button>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedWorker && (
        <WorkerDetailModal
          worker={selectedWorker}
          isHi={isHi}
          onClose={() => setSelectedWorker(null)}
          onSign={handleSign}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
};
