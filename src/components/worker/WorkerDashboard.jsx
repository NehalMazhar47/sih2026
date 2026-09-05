import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { WorkerProfile } from './WorkerProfile';
import { WelfareVault } from './WelfareVault';
import { SkillAssessmentModal } from './SkillAssessmentModal';
import { NavigationMap } from '../common/NavigationMap';
import {
  CheckCircle2, XCircle, MapPin, Clock, TrendingUp,
  User, ShieldCheck, Award, Wallet, BookOpen, BarChart2, Phone
} from 'lucide-react';

const TABS = [
  { id: 'earnings',  icon: <BarChart2 size={16} />, en: 'Earnings',     hi: 'आय व पासबुक' },
  { id: 'profile',   icon: <User size={16} />,      en: 'My Profile',   hi: 'मेरी प्रोफ़ाइल' },
  { id: 'welfare',   icon: <Wallet size={16} />,    en: 'Welfare',      hi: 'कल्याण कोष' },
  { id: 'skills',    icon: <BookOpen size={16} />,  en: 'Skills',       hi: 'कौशल परीक्षा' },
];

const LEDGER = [
  { date: '04 Sep', service: 'AC Repair',          customer: 'Rajesh Gupta',    gross: 480, wage: 422, status: 'paid' },
  { date: '03 Sep', service: 'Fan Wiring',          customer: 'Sunita Sharma',   gross: 280, wage: 246, status: 'paid' },
  { date: '02 Sep', service: 'MCB Replacement',     customer: 'Mohan Lal',       gross: 350, wage: 308, status: 'paid' },
  { date: '01 Sep', service: 'Switchboard Fix',     customer: 'Priya Nair',      gross: 340, wage: 299, status: 'paid' },
];

const INCOMING_JOB = {
  id: 'GIG-4421',
  service: 'MCB Tripping Fix',
  service_hi: 'एमसीबी ट्रिपिंग मरम्मत',
  customer: 'Kavita Mehta',
  address: 'Flat 3B, Lajpat Nagar, Delhi',
  address_hi: 'फ्लैट 3B, लाजपत नगर, दिल्ली',
  distance: '1.2 km',
  eta: '10 min',
  estimatedAmount: 350,
  workerWage: 308,
  isEmergency: false,
};

export const WorkerDashboard = () => {
  const { language, currentWorker, currentUser, workerDuty, setWorkerDuty, workerEarnings, workerTab, setWorkerTab, showToast, setRole } = usePlatform();
  const isHi = language === 'hi';

  const activeTab = workerTab || 'earnings';
  const setActiveTab = (t) => setWorkerTab(t);
  const [showIncoming, setShowIncoming] = useState(true);
  const [activeJobNav, setActiveJobNav] = useState(false);
  const [skillOpen, setSkillOpen] = useState(false);

  const toggleDuty = () => {
    const nextDuty = !workerDuty.isOnDuty;
    setWorkerDuty(d => ({ ...d, isOnDuty: nextDuty }));
    showToast(
      nextDuty ? "Status: ON DUTY" : "Status: OFF DUTY",
      nextDuty ? "You are now visible for incoming jobs in your area." : "Job dispatch paused.",
      nextDuty ? "success" : "info"
    );
  };

  const handleAcceptJob = () => {
    setShowIncoming(false);
    setActiveJobNav(true);
    showToast(
      isHi ? "काम स्वीकार किया गया!" : "Job Accepted!",
      isHi ? "लाइव नेविगेशन शुरू हो गया है। ग्राहक स्थान की ओर बढ़ें।" : "Live GPS turn-by-turn navigation started. Proceed to customer location.",
      "success"
    );
  };

  const w = currentWorker;

  // ── NEW WORKER: Show Pending Verification Screen ─────────
  if (currentUser && currentUser.role === 'worker' && currentUser.status === 'pending') {
    return (
      <div className="container" style={{ paddingTop: 'var(--sp-lg)', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: 560, width: '100%', textAlign: 'center' }}>
          {/* Animated status card */}
          <div style={{ background: 'linear-gradient(135deg, #07192C 0%, #103568 100%)', border: '2px solid var(--saffron)', borderRadius: 28, padding: '40px 36px', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}>
            {/* Spinner animation */}
            <div style={{ width: 80, height: 80, borderRadius: '50%', border: '4px solid rgba(244,140,6,0.2)', borderTop: '4px solid var(--saffron)', margin: '0 auto 24px', animation: 'spin 1.5s linear infinite' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

            <span className="badge badge-saffron" style={{ fontSize: 12, marginBottom: 16, display: 'inline-block' }}>
              ⏳ {isHi ? 'सत्यापन प्रतीक्षा में' : 'VERIFICATION PENDING'}
            </span>

            <h2 style={{ fontSize: 24, fontWeight: 800, color: 'white', margin: '12px 0 8px' }}>
              {isHi ? `स्वागत है, ${currentUser.name}!` : `Welcome, ${currentUser.name}!`}
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginBottom: 28, lineHeight: 1.6 }}>
              {isHi
                ? 'आपका आवेदन प्राप्त हो गया है। महासंघ निदेशक और NCCT क्षेत्रीय अधिकारी आपके दस्तावेज़ों की जांच कर रहे हैं।'
                : 'Your application has been received. The Federation Director & NCCT Regional Officer are reviewing your documents.'}
            </p>

            {/* Progress Steps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'left', marginBottom: 28 }}>
              {[
                { done: true,  step: '1', label: isHi ? 'आवेदन दर्ज हुआ' : 'Application Submitted', sub: isHi ? 'आज, ' + new Date().toLocaleDateString('en-IN') : 'Today, ' + new Date().toLocaleDateString('en-IN') },
                { done: false, step: '2', label: isHi ? 'महासंघ निदेशक समीक्षा' : 'Federation Director Review', sub: isHi ? 'कार्यरत...' : 'In progress...' },
                { done: false, step: '3', label: isHi ? 'NCCT प्रतिहस्ताक्षर' : 'NCCT Counter-Signature', sub: isHi ? 'प्रतीक्षारत' : 'Awaiting' },
                { done: false, step: '4', label: isHi ? 'NCCT डिजिटल बैज जारी' : 'NCCT Digital Badge Issued', sub: isHi ? 'अनुमोदन के बाद सक्रिय' : 'Active after dual approval' },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: s.done ? '#10b981' : 'rgba(255,255,255,0.1)', color: s.done ? 'white' : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>
                    {s.done ? '✓' : s.step}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: s.done ? '#10b981' : 'rgba(255,255,255,0.85)' }}>{s.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: 'rgba(244,140,6,0.1)', border: '1px solid rgba(244,140,6,0.3)', borderRadius: 12, padding: '12px 16px', fontSize: 13, color: '#FFB74D', marginBottom: 20 }}>
              📱 {isHi ? 'अनुमोदन होने पर आपको SMS सूचना मिलेगी।' : 'You will receive an SMS notification once approved.'}
            </div>

            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => setRole('admin')} className="btn btn-outline" style={{ fontSize: 13, padding: '8px 18px', borderColor: 'var(--saffron)', color: 'var(--saffron)' }}>
                🏛️ {isHi ? 'Admin पोर्टल देखें' : 'View Admin Portal'}
              </button>
              <button onClick={() => setRole('customer')} className="btn btn-outline" style={{ fontSize: 13, padding: '8px 18px' }}>
                🏠 {isHi ? 'होम पर जाएं' : 'Go to Home'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: 'var(--sp-lg)' }}>
      {/* ── Active Job Navigation Map ──────────────────────── */}
      {activeJobNav && (
        <div style={{ marginBottom: 'var(--sp-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 18, fontWeight: 800, color: 'var(--saffron-dark)' }}>
              🧭 {isHi ? 'सक्रिय कार्य नेविगेशन कंसोल' : 'Active Job GPS Navigation Console'}
            </h2>
            <button
              className="btn btn-ghost"
              style={{ fontSize: 12, color: 'var(--sos)' }}
              onClick={() => setActiveJobNav(false)}
            >
              {isHi ? 'नेविगेशन बंद करें' : 'Close Navigation'}
            </button>
          </div>
          <NavigationMap
            jobDetails={{
              address: isHi ? INCOMING_JOB.address_hi : INCOMING_JOB.address,
              customerName: INCOMING_JOB.customer,
              serviceName: isHi ? INCOMING_JOB.service_hi : INCOMING_JOB.service
            }}
            onArrival={() => {
              showToast(isHi ? "कार्य शुरू!" : "Work Started!", isHi ? "ग्राहकतल पर कार्य प्रगति पर है।" : "Service job in progress under cooperative checklist.", "info");
            }}
          />
        </div>
      )}

      {/* ── Worker Header Card ────────────────────────────── */}
      {/* ── Worker Header Card ────────────────────────────── */}
      <div className="id-card" style={{ marginBottom: 'var(--sp-lg)' }}>
        <div style={{ display: 'flex', gap: 'var(--sp-md)', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <img
            src={w?.photo || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80'}
            alt={w?.name}
            style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,183,77,0.5)', flexShrink: 0 }}
            onError={e => { e.target.style.display = 'none'; }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <h1 style={{ fontFamily: 'var(--font-head)', fontSize: 20, fontWeight: 800, color: 'white', margin: 0 }}>{w?.name || 'Satish Kumar Verma'}</h1>
              <span className="ncct-badge">✓ NCCT Level 4</span>
            </div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, marginTop: 4 }}>
              {isHi ? 'मुख्य इलेक्ट्रीशियन' : 'Chief Electrician'} • {w?.society || 'Delhi Shramik Sahakari'}
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
              <span style={{ background: 'rgba(255,183,77,0.15)', color: '#FFB74D', border: '1px solid rgba(255,183,77,0.3)', borderRadius: 'var(--r-full)', padding: '3px 10px', fontSize: 12, fontWeight: 700 }}>
                ★ {w?.rating || '4.9'} ({w?.reviews || 312} {isHi ? 'समीक्षा' : 'reviews'})
              </span>
              <span style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--r-full)', padding: '3px 10px', fontSize: 12, fontWeight: 600 }}>
                🔧 {isHi ? '428 गिग पूर्ण' : '428 gigs done'}
              </span>
            </div>
          </div>
          {/* Duty toggle */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
            <div
              className="toggle-wrap"
              onClick={toggleDuty}
              style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 'var(--r-lg)', padding: '8px 12px' }}
            >
              <div style={{ fontSize: 13, color: workerDuty.isOnDuty ? '#4ADE80' : 'rgba(255,255,255,0.5)', fontWeight: 700 }}>
                {workerDuty.isOnDuty ? (isHi ? '🟢 ड्यूटी पर' : '🟢 On Duty') : (isHi ? '🔴 ऑफ ड्यूटी' : '🔴 Off Duty')}
              </div>
              <div className={`toggle-track ${workerDuty.isOnDuty ? 'on' : ''}`} style={{ background: workerDuty.isOnDuty ? '#22c55e' : 'rgba(255,255,255,0.2)' }}>
                <div className="toggle-thumb" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Incoming Job Alert ───────────────────────────── */}
      {showIncoming && workerDuty.isOnDuty && (
        <div className="job-card" style={{ marginBottom: 'var(--sp-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--sp-sm)', flexWrap: 'wrap', gap: 8 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-head)', fontSize: 17, fontWeight: 800, color: 'var(--saffron-dark)' }}>
                🔔 {isHi ? 'नया काम आया!' : 'New Job Request!'}
              </div>
              <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', marginTop: 2 }}>
                {isHi ? INCOMING_JOB.service_hi : INCOMING_JOB.service}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--font-head)', fontSize: 20, fontWeight: 800, color: 'var(--coop-green)' }}>₹{INCOMING_JOB.workerWage}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{isHi ? 'आपकी कमाई (88%)' : 'Your earning (88%)'}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16, fontSize: 13, color: 'var(--text-muted)', marginBottom: 'var(--sp-md)', flexWrap: 'wrap' }}>
            <span><MapPin size={12} style={{ display: 'inline' }} /> {isHi ? INCOMING_JOB.address_hi : INCOMING_JOB.address}</span>
            <span><Clock size={12} style={{ display: 'inline' }} /> {isHi ? `ETA: ${INCOMING_JOB.eta}` : `ETA: ${INCOMING_JOB.eta}`}</span>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-green" style={{ flex: 1 }} onClick={handleAcceptJob}>
              <CheckCircle2 size={16} /> {isHi ? 'स्वीकार करें' : 'Accept Job'}
            </button>
            <button className="btn btn-ghost" onClick={() => setShowIncoming(false)}>
              <XCircle size={16} /> {isHi ? 'अस्वीकार' : 'Decline'}
            </button>
          </div>
        </div>
      )}

      {/* ── KPI Cards ────────────────────────────────────── */}
      <div className="kpi-grid" style={{ marginBottom: 'var(--sp-lg)' }}>
        {[
          { label: isHi ? 'आज की कमाई' : "Today's Earnings", value: `₹${workerEarnings.todayGross.toLocaleString('en-IN')}`, sub: isHi ? 'शुद्ध (88%)' : 'net (88%)', color: 'var(--coop-green)', icon: '💰' },
          { label: isHi ? 'माह की कमाई' : 'Monthly Earnings', value: `₹${workerEarnings.monthGross.toLocaleString('en-IN')}`, sub: isHi ? 'इस माह' : 'this month', color: 'var(--primary-navy)', icon: '📅' },
          { label: isHi ? 'कल्याण कोष' : 'Welfare Balance', value: `₹${workerEarnings.welfareBalance.toLocaleString('en-IN')}`, sub: isHi ? 'Ayushman + PMJJBY' : 'Ayushman + PMJJBY', color: 'var(--saffron-dark)', icon: '🏥' },
          { label: isHi ? 'पेंशन संचय' : 'Pension Balance', value: `₹${workerEarnings.pensionBalance.toLocaleString('en-IN')}`, sub: isHi ? 'PM-SYM' : 'PM-SYM', color: 'var(--info)', icon: '🏦' },
        ].map((k, i) => (
          <div key={i} className="kpi-card">
            <div style={{ fontSize: 22 }}>{k.icon}</div>
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value" style={{ color: k.color }}>{k.value}</div>
            <div className="kpi-sub">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* ── Tabs ─────────────────────────────────────────── */}
      <div className="tab-bar" style={{ marginBottom: 'var(--sp-lg)' }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => { setActiveTab(tab.id); if (tab.id === 'skills') setSkillOpen(true); }}
          >
            {tab.icon} {isHi ? tab.hi : tab.en}
          </button>
        ))}
      </div>

      {/* ── Tab Content ──────────────────────────────────── */}
      {activeTab === 'earnings' && (
        <div>
          <div className="section-header">
            <div>
              <h2 className="section-title" style={{ fontSize: 18 }}>{isHi ? 'आय पासबुक' : 'Earnings Passbook'}</h2>
              <p className="section-subtitle">{isHi ? 'हाल की गिग — 88% आपकी सीधी कमाई' : 'Recent gigs — 88% direct to your account'}</p>
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{isHi ? 'तारीख' : 'Date'}</th>
                  <th>{isHi ? 'सेवा' : 'Service'}</th>
                  <th>{isHi ? 'ग्राहक' : 'Customer'}</th>
                  <th>{isHi ? 'कुल राशि' : 'Total'}</th>
                  <th>{isHi ? 'आपकी कमाई' : 'Your Wage'}</th>
                  <th>{isHi ? 'स्थिति' : 'Status'}</th>
                </tr>
              </thead>
              <tbody>
                {LEDGER.map((row, i) => (
                  <tr key={i}>
                    <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{row.date}</td>
                    <td style={{ fontWeight: 600 }}>{row.service}</td>
                    <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{row.customer}</td>
                    <td>₹{row.gross}</td>
                    <td style={{ fontWeight: 700, color: 'var(--coop-green)' }}>₹{row.wage}</td>
                    <td><span className="badge badge-green">✓ {isHi ? 'भुगतान हुआ' : 'Paid'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Monthly summary */}
          <div className="card" style={{ marginTop: 'var(--sp-lg)', background: 'var(--primary-navy)', color: 'white' }}>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: 15, fontWeight: 700, marginBottom: 'var(--sp-md)', color: 'rgba(255,255,255,0.85)' }}>
              📊 {isHi ? 'सितंबर 2026 — मासिक सारांश' : 'September 2026 — Monthly Summary'}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--sp-md)' }}>
              {[
                { label: isHi ? 'कुल गिग' : 'Total Gigs', value: '14', color: '#FFB74D' },
                { label: isHi ? 'ब्रूटो आय' : 'Gross Earned', value: '₹32,400', color: '#4ADE80' },
                { label: isHi ? 'कल्याण संचय' : 'Welfare Added', value: '₹2,268', color: '#60A5FA' },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'profile' && <WorkerProfile />}
      {activeTab === 'welfare' && <WelfareVault />}
      {activeTab === 'skills' && (
        <div className="card" style={{ textAlign: 'center', padding: 'var(--sp-xl)' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎓</div>
          <h3 style={{ fontFamily: 'var(--font-head)', color: 'var(--navy)', marginBottom: 8 }}>
            {isHi ? 'एनसीटीसी कौशल मूल्यांकन' : 'NCCT Skill Assessment'}
          </h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--sp-lg)', fontSize: 14 }}>
            {isHi ? 'अपनी NCCT लेवल परीक्षा दें और डिजिटल प्रमाणपत्र प्राप्त करें।' : 'Take your NCCT level exam and earn a digital credential.'}
          </p>
          <button className="btn btn-primary" onClick={() => setSkillOpen(true)}>
            {isHi ? 'परीक्षा शुरू करें' : 'Start Assessment'} <Award size={16} />
          </button>
        </div>
      )}

      {skillOpen && <SkillAssessmentModal onClose={() => { setSkillOpen(false); setActiveTab('earnings'); }} />}
    </div>
  );
};
