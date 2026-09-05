import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

const TENDERS = [
  { id: 'GEM/2026/B/4521890', title_en: 'Annual Electrical Maintenance – AIIMS Delhi', title_hi: 'वार्षिक विद्युत रखरखाव – AIIMS दिल्ली', ministry: 'Ministry of Health', value: '₹48.5L', deadline: '20 Sep 2026', status: 'open', ncct: 'Level 4 Required' },
  { id: 'GEM/2026/B/4498721', title_en: 'Office Cleaning Services – PMO Campus', title_hi: 'कार्यालय सफाई सेवाएं – PMO परिसर', ministry: 'Cabinet Secretariat', value: '₹28.2L', deadline: '25 Sep 2026', status: 'open', ncct: 'Level 2 Required' },
  { id: 'GEM/2026/B/4412365', title_en: 'Plumbing Works – Central Govt Housing', title_hi: 'प्लंबिंग कार्य – केंद्र सरकार आवास', ministry: 'MoHUA', value: '₹18.9L', deadline: '15 Sep 2026', status: 'awarded', awardee: 'Delhi Shramik Sahakari' },
];

export const GeMProcurementDesk = () => {
  const { language, triggerToast } = usePlatform();
  const isHi = language === 'hi';
  const [tenders, setTenders] = useState(TENDERS);

  const bid = (id) => {
    setTenders(t => t.map(ten => ten.id === id ? { ...ten, status: 'bid_submitted' } : ten));
    triggerToast && triggerToast(isHi ? '✓ GeM पर बोली दाखिल की गई!' : '✓ Bid submitted on GeM!');
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title" style={{ fontSize: 18 }}>
            🏛 {isHi ? 'GeM सार्वजनिक खरीद (GFR 153)' : 'GeM Public Procurement (GFR 153)'}
          </h2>
          <p className="section-subtitle">
            {isHi
              ? 'सरकारी निविदाओं में सहकारी समितियों को प्राथमिकता के साथ बोली लगाएं'
              : 'Bid on government tenders with cooperative preference under GFR 153'}
          </p>
        </div>
        <span className="badge badge-navy"><ShieldCheck size={11} /> GFR 153</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-md)' }}>
        {tenders.map(t => (
          <div key={t.id} className="card">
            <div className="flex-between" style={{ marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
              <div>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: 15, fontWeight: 700, color: 'var(--navy)', marginBottom: 2 }}>
                  {isHi ? t.title_hi : t.title_en}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.id}</div>
              </div>
              {t.status === 'open' && <span className="badge badge-green">🟢 {isHi ? 'खुली निविदा' : 'Open'}</span>}
              {t.status === 'bid_submitted' && <span className="badge badge-amber">⏳ {isHi ? 'बोली दाखिल' : 'Bid Submitted'}</span>}
              {t.status === 'awarded' && <span className="badge badge-navy">✓ {isHi ? 'आवंटित' : 'Awarded'}</span>}
            </div>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 13, color: 'var(--text-muted)', marginBottom: 10 }}>
              <span>🏛 {t.ministry}</span>
              <span>💰 {t.value}</span>
              <span>📅 {isHi ? 'अंतिम तिथि:' : 'Deadline:'} {t.deadline}</span>
              <span className="badge badge-navy" style={{ fontSize: 11 }}>{t.ncct}</span>
            </div>

            {t.status === 'awarded' && t.awardee && (
              <div className="alert alert-success" style={{ fontSize: 13, marginBottom: 10 }}>
                <CheckCircle2 size={14} />
                {isHi ? `आवंटित: ${t.awardee}` : `Awarded to: ${t.awardee}`}
              </div>
            )}

            {t.status === 'open' && (
              <button className="btn btn-primary btn-sm" onClick={() => bid(t.id)}>
                {isHi ? 'GeM पर बोली दें' : 'Submit Bid on GeM'} →
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="alert alert-info mt-lg" style={{ fontSize: 13 }}>
        <ShieldCheck size={16} />
        {isHi
          ? 'GFR 153 के तहत सहकारी समितियों को GeM खरीद में निजी कंपनियों पर प्राथमिकता मिलती है।'
          : 'Under GFR 153, cooperative societies get preference over private companies in GeM procurement.'}
      </div>
    </div>
  );
};
