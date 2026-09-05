import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { ShieldCheck, TrendingUp, Users, MapPin, Wallet, AlertTriangle } from 'lucide-react';
import { AIDemandForecaster } from './AIDemandForecaster';
import { WorkerVerificationDesk } from './WorkerVerificationDesk';
import { DisputeDesk } from './DisputeDesk';
import { GeMProcurementDesk } from './GeMProcurementDesk';

const TABS = [
  { id: 'overview',    en: 'Overview',          hi: 'अवलोकन' },
  { id: 'ai',         en: 'AI Forecasting',     hi: 'AI पूर्वानुमान' },
  { id: 'verify',     en: 'Worker Verification', hi: 'कामगार सत्यापन' },
  { id: 'dispute',    en: 'Dispute Desk',        hi: 'शिकायत लोकपाल' },
  { id: 'gem',        en: 'GeM Procurement',     hi: 'GeM खरीद' },
];

const SOCIETIES = [
  { name: 'Delhi Shramik Sahakari Federation',    state: 'Delhi',         workers: 2840, active: 1820, rating: 4.8, compliance: 'GFR-153 Compliant', status: 'active' },
  { name: 'Maharashtra Kamgar Sahakari Mandal',   state: 'Maharashtra',   workers: 3120, active: 2100, rating: 4.7, compliance: 'GFR-153 Compliant', status: 'active' },
  { name: 'Karnataka Karmika Sahakari Sangha',    state: 'Karnataka',     workers: 1950, active: 1400, rating: 4.9, compliance: 'GFR-153 Compliant', status: 'active' },
  { name: 'UP Mahila Shramik Sahakari',           state: 'Uttar Pradesh', workers: 1680, active: 1100, rating: 4.6, compliance: 'Audit Pending',     status: 'audit' },
  { name: 'Gujarat Cooperative Labour Union',     state: 'Gujarat',       workers: 2200, active: 1650, rating: 4.8, compliance: 'GFR-153 Compliant', status: 'active' },
];

export const FederationDashboard = () => {
  const { language, workers, pendingWorkers, societies } = usePlatform();
  const isHi = language === 'hi';
  const [activeTab, setActiveTab] = useState('overview');

  const KPIs = [
    { label: isHi ? 'कुल सत्यापित कामगार' : 'Total Verified Workers', value: '4,20,840', icon: '👷', color: 'var(--navy)' },
    { label: isHi ? 'आज सक्रिय कामगार' : 'Active Workers Today',     value: '1,82,350', icon: '🟢', color: 'var(--green)' },
    { label: isHi ? 'सक्रिय गिग (लाइव)' : 'Live Active Gigs',        value: '12,840',   icon: '🔧', color: 'var(--saffron)' },
    { label: isHi ? 'कुल वितरित मज़दूरी' : 'Total Wages Distributed', value: '₹84.2Cr',  icon: '💰', color: 'var(--green)' },
    { label: isHi ? 'कल्याण कोष' : 'Welfare Fund',                   value: '₹6.7Cr',   icon: '🏥', color: 'var(--amber)' },
    { label: isHi ? 'सत्यापन प्रतीक्षा' : 'Pending Verification',    value: '284',       icon: '⏳', color: 'var(--sos)' },
  ];

  return (
    <div className="container" style={{ paddingTop: 'var(--sp-lg)' }}>
      {/* ── Header ───────────────────────────────────────── */}
      <div style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)', borderRadius: 'var(--r-xl)', padding: 'var(--sp-lg) var(--sp-xl)', marginBottom: 'var(--sp-lg)', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <div style={{ fontSize: 28 }}>🏛</div>
              <div>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: 20, fontWeight: 800 }}>
                  {isHi ? 'सहकारी श्रम महासंघ नियंत्रण कक्ष' : 'Labour Cooperative Federation Control'}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>
                  {isHi ? 'सहकारिता मंत्रालय • NCCT • GFR 153 अनुपालन' : 'Ministry of Cooperation • NCCT • GFR 153 Compliant'}
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(255,183,77,0.2)', color: '#FFB74D', border: '1px solid rgba(255,183,77,0.3)', borderRadius: 'var(--r-full)', padding: '4px 12px', fontSize: 12, fontWeight: 700 }}>
              🔴 {isHi ? 'लाइव' : 'LIVE'}
            </span>
            <span style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--r-full)', padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>
              {isHi ? 'SIH 2026 • समस्या #26089' : 'SIH 2026 • Problem #26089'}
            </span>
          </div>
        </div>
      </div>

      {/* ── KPI Grid ──────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 'var(--sp-md)', marginBottom: 'var(--sp-lg)' }}>
        {KPIs.map((k, i) => (
          <div key={i} className="kpi-card">
            <div style={{ fontSize: 22 }}>{k.icon}</div>
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value" style={{ color: k.color, fontSize: 22 }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* ── Tabs ──────────────────────────────────────────── */}
      <div className="tab-bar" style={{ marginBottom: 'var(--sp-lg)' }}>
        {TABS.map(t => (
          <button key={t.id} className={`tab-btn ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
            {isHi ? t.hi : t.en}
          </button>
        ))}
      </div>

      {/* ── Tab Content ──────────────────────────────────── */}
      {activeTab === 'overview' && (
        <div>
          <div className="section-header">
            <div>
              <h2 className="section-title" style={{ fontSize: 18 }}>{isHi ? 'पंजीकृत सहकारी समितियां' : 'Registered Cooperative Societies'}</h2>
              <p className="section-subtitle">{isHi ? 'GFR 153 और NCCT अनुपालन स्थिति' : 'GFR 153 and NCCT compliance status'}</p>
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{isHi ? 'समिति का नाम' : 'Society Name'}</th>
                  <th>{isHi ? 'राज्य' : 'State'}</th>
                  <th>{isHi ? 'कुल कामगार' : 'Workers'}</th>
                  <th>{isHi ? 'सक्रिय' : 'Active'}</th>
                  <th>{isHi ? 'रेटिंग' : 'Rating'}</th>
                  <th>{isHi ? 'अनुपालन' : 'Compliance'}</th>
                </tr>
              </thead>
              <tbody>
                {SOCIETIES.map((s, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600, fontSize: 14 }}>{s.name}</td>
                    <td style={{ color: 'var(--text-muted)', fontSize: 13 }}><MapPin size={11} style={{ display: 'inline' }} /> {s.state}</td>
                    <td style={{ fontWeight: 600 }}>{s.workers.toLocaleString('en-IN')}</td>
                    <td style={{ fontWeight: 600, color: 'var(--green)' }}>{s.active.toLocaleString('en-IN')}</td>
                    <td><span style={{ fontWeight: 700, color: '#F59E0B' }}>★ {s.rating}</span></td>
                    <td>
                      {s.status === 'active'
                        ? <span className="badge badge-green"><ShieldCheck size={10} /> {s.compliance}</span>
                        : <span className="badge badge-amber"><AlertTriangle size={10} /> {s.compliance}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {activeTab === 'ai' && <AIDemandForecaster />}
      {activeTab === 'verify' && <WorkerVerificationDesk />}
      {activeTab === 'dispute' && <DisputeDesk />}
      {activeTab === 'gem' && <GeMProcurementDesk />}
    </div>
  );
};
