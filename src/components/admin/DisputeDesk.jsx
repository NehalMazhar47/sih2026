import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';

const DISPUTES = [
  { id: 'D-221', customer: 'Priya Nair', worker: 'Satish Verma', issue_en: 'Work not completed as promised', issue_hi: 'वादे के अनुसार काम नहीं हुआ', amount: 450, status: 'open', filed: '03 Sep 2026' },
  { id: 'D-219', customer: 'Mohan Das', worker: 'Ramesh Gaikwad', issue_en: 'Overcharged beyond fixed rate', issue_hi: 'निश्चित दर से अधिक शुल्क लिया', amount: 280, status: 'under_review', filed: '02 Sep 2026' },
  { id: 'D-215', customer: 'Sunita Patel', worker: 'Arvind Singh', issue_en: 'Worker arrived late by 2 hours', issue_hi: 'कामगार 2 घंटे देरी से आया', amount: 320, status: 'resolved', resolution_en: 'Partial refund of ₹80 issued', resolution_hi: '₹80 का आंशिक रिफंड दिया गया', filed: '30 Aug 2026' },
];

export const DisputeDesk = () => {
  const { language, triggerToast } = usePlatform();
  const isHi = language === 'hi';
  const [disputes, setDisputes] = useState(DISPUTES);
  const [newIssue, setNewIssue] = useState('');

  const resolve = (id) => {
    setDisputes(d => d.map(disp => disp.id === id ? { ...disp, status: 'resolved', resolution_en: 'Resolved by ombudsman', resolution_hi: 'लोकपाल द्वारा निराकृत' } : disp));
    triggerToast && triggerToast(isHi ? '✓ विवाद निराकृत।' : '✓ Dispute resolved.');
  };

  const STATUS_CONFIG = {
    open:         { label_en: 'Open',         label_hi: 'खुला',          badge: 'badge-red' },
    under_review: { label_en: 'Under Review', label_hi: 'समीक्षाधीन',   badge: 'badge-amber' },
    resolved:     { label_en: 'Resolved',     label_hi: 'निराकृत',        badge: 'badge-green' },
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title" style={{ fontSize: 18 }}>
            ⚖️ {isHi ? 'शिकायत व विवाद लोकपाल' : 'Grievance & Dispute Ombudsman'}
          </h2>
          <p className="section-subtitle">
            {isHi ? 'निष्पक्ष मानवीय सुनवाई — कोई एल्गोरिदमिक प्रतिबंध नहीं' : 'Fair human hearings — no algorithmic bans'}
          </p>
        </div>
      </div>

      {/* File new grievance */}
      <div className="card" style={{ marginBottom: 'var(--sp-lg)', background: 'var(--bg)' }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--navy)', marginBottom: 10 }}>
          📝 {isHi ? 'नई शिकायत दर्ज करें' : 'File a New Grievance'}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            type="text"
            className="form-input"
            style={{ flex: 1 }}
            placeholder={isHi ? 'शिकायत का विवरण...' : 'Describe the issue...'}
            value={newIssue}
            onChange={e => setNewIssue(e.target.value)}
          />
          <button className="btn btn-primary" onClick={() => { setNewIssue(''); triggerToast && triggerToast(isHi ? 'शिकायत दर्ज हुई।' : 'Grievance filed.'); }}>
            {isHi ? 'दर्ज करें' : 'Submit'}
          </button>
        </div>
      </div>

      {/* Disputes list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-md)' }}>
        {disputes.map(d => {
          const cfg = STATUS_CONFIG[d.status];
          return (
            <div key={d.id} className="card">
              <div className="flex-between" style={{ marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: 15, fontWeight: 700, color: 'var(--navy)' }}>#{d.id}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{d.filed}</div>
                </div>
                <span className={`badge ${cfg.badge}`}>{isHi ? cfg.label_hi : cfg.label_en}</span>
              </div>
              <div style={{ fontSize: 14, marginBottom: 8 }}>
                <strong>{isHi ? 'समस्या:' : 'Issue:'}</strong> {isHi ? d.issue_hi : d.issue_en}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 10 }}>
                <span>👤 {isHi ? 'ग्राहक:' : 'Customer:'} {d.customer}</span>
                <span>🔧 {isHi ? 'कामगार:' : 'Worker:'} {d.worker}</span>
                <span>💰 {isHi ? 'राशि:' : 'Amount:'} ₹{d.amount}</span>
              </div>
              {d.status === 'resolved' && d.resolution_en && (
                <div className="alert alert-success" style={{ fontSize: 13, marginBottom: 10 }}>
                  <CheckCircle2 size={15} /> {isHi ? d.resolution_hi : d.resolution_en}
                </div>
              )}
              {d.status !== 'resolved' && (
                <button className="btn btn-green btn-sm" onClick={() => resolve(d.id)}>
                  <CheckCircle2 size={14} /> {isHi ? 'निराकृत करें' : 'Mark Resolved'}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
