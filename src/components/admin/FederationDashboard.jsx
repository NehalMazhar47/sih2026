import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { AIDemandForecaster } from './AIDemandForecaster';
import { WorkerVerificationDesk } from './WorkerVerificationDesk';
import { DisputeDesk } from './DisputeDesk';
import { GeMProcurementDesk } from './GeMProcurementDesk';
import {
  Building2, Brain, UserCheck, ShieldAlert, ShoppingBag,
  TrendingUp, Users, CheckCircle2, MapPin, ArrowUpRight
} from 'lucide-react';

const ADMIN_TABS = [
  { id: 'overview',     icon: <Building2 size={16} />,   en: 'Overview & Societies', hi: 'महासंघ अवलोकन' },
  { id: 'ai-demand',    icon: <Brain size={16} />,       en: 'AI Demand Forecast',   hi: 'AI मांग पूर्वानुमान' },
  { id: 'verification', icon: <UserCheck size={16} />,   en: 'Verification Desk',    hi: 'सत्यापन डेस्क' },
  { id: 'disputes',     icon: <ShieldAlert size={16} />, en: 'Grievances & Disputes',hi: 'विवाद निवारण' },
  { id: 'gem-procure',  icon: <ShoppingBag size={16} />, en: 'GeM Procurement',     hi: 'GeM सरकारी खरीद' },
];

export const FederationDashboard = () => {
  const { language, societies, workers, pendingWorkers } = usePlatform();
  const isHi = language === 'hi';

  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container" style={{ paddingTop: 'var(--sp-lg)' }}>
      {/* ── Admin Header Banner ───────────────────────────── */}
      <div className="id-card" style={{ marginBottom: 'var(--sp-lg)', background: 'linear-gradient(135deg, #07192C 0%, #0B3D91 100%)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 24 }}>🏛️</span>
              <h1 style={{ fontFamily: 'var(--font-head)', fontSize: 22, fontWeight: 800, color: 'white', margin: 0 }}>
                {isHi ? 'सहकारी श्रम महासंघ केंद्रीय नियंत्रण केंद्र' : 'Labour Cooperative Federation Control Center'}
              </h1>
            </div>
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, marginTop: 4 }}>
              {isHi ? 'राष्ट्रीय सहकारी प्रशिक्षण परिषद (NCCT) व सहकारिता मंत्रालय से संबद्ध' : 'Affiliated with National Council for Cooperative Training (NCCT) & Ministry of Cooperation'}
            </div>
          </div>
          <span className="ncct-badge" style={{ padding: '6px 14px', fontSize: 12 }}>
            ✓ GFR Rule 153 Compliant
          </span>
        </div>
      </div>

      {/* ── Federation KPIs ───────────────────────────────── */}
      <div className="kpi-grid" style={{ marginBottom: 'var(--sp-lg)' }}>
        {[
          { label: isHi ? 'संबद्ध समितियां' : 'Affiliated Societies', value: societies.length.toString(), sub: isHi ? '28 राज्यों में' : 'across 28 states', color: 'var(--primary-navy)', icon: '🏛️' },
          { label: isHi ? 'सत्यापित कामगार' : 'Verified Workers', value: '4,28,450', sub: isHi ? '100% आधार व NCCT जांची' : '100% Aadhaar & NCCT verified', color: 'var(--coop-green)', icon: '👨‍🔧' },
          { label: isHi ? 'लंबित सत्यापन' : 'Pending Verification', value: pendingWorkers.length.toString(), sub: isHi ? 'सत्यापन कतार' : 'verification queue', color: 'var(--saffron-dark)', icon: '⏳' },
          { label: isHi ? 'कुल वितरण' : 'Total Wage Disbursed', value: '₹14.8 Cr', sub: isHi ? '88% सीधे खाते में' : '88% direct bank credit', color: 'var(--info)', icon: '🏦' },
        ].map((k, i) => (
          <div key={i} className="kpi-card">
            <div style={{ fontSize: 22 }}>{k.icon}</div>
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value" style={{ color: k.color }}>{k.value}</div>
            <div className="kpi-sub">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* ── Admin Tabs ───────────────────────────────────── */}
      <div className="tab-bar" style={{ marginBottom: 'var(--sp-lg)' }}>
        {ADMIN_TABS.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {isHi ? tab.hi : tab.en}
          </button>
        ))}
      </div>

      {/* ── Tab Content ──────────────────────────────────── */}
      {activeTab === 'overview' && (
        <div>
          <div className="section-header">
            <div>
              <h2 className="section-title" style={{ fontSize: 18 }}>
                {isHi ? 'पंजीकृत श्रम सहकारी समितियां' : 'Registered Labour Cooperative Societies'}
              </h2>
              <p className="section-subtitle">
                {isHi ? 'NCCT-संबद्ध राज्य और जिला स्तरीय प्राथमिक श्रम समितियां' : 'NCCT-affiliated state and district primary labor cooperatives'}
              </p>
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{isHi ? 'समिति का नाम' : 'Society Name'}</th>
                  <th>{isHi ? 'राज्य' : 'State'}</th>
                  <th>{isHi ? 'कामगार संख्या' : 'Workers'}</th>
                  <th>{isHi ? 'औसत रेटिंग' : 'Rating'}</th>
                  <th>{isHi ? 'स्थिति' : 'Status'}</th>
                </tr>
              </thead>
              <tbody>
                {societies.map((s, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 700, color: 'var(--navy)' }}>{s.name}</td>
                    <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{s.state}</td>
                    <td style={{ fontWeight: 700, color: 'var(--coop-green)' }}>{s.memberCount?.toLocaleString('en-IN') || '2,840'}</td>
                    <td><span style={{ color: '#F59E0B', fontWeight: 700 }}>★ {s.rating || '4.8'}</span></td>
                    <td><span className="badge badge-green">✓ {isHi ? 'NCCT स्वीकृत' : 'NCCT Certified'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'ai-demand' && <AIDemandForecaster />}
      {activeTab === 'verification' && <WorkerVerificationDesk />}
      {activeTab === 'disputes' && <DisputeDesk />}
      {activeTab === 'gem-procure' && <GeMProcurementDesk />}
    </div>
  );
};
