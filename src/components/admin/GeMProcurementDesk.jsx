import React, { useState } from 'react';
import { Building, FileCheck, CheckCircle2, ShieldCheck, Download, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePlatform } from '../../context/PlatformContext';

export const GeMProcurementDesk = () => {
  const { showToast, language } = usePlatform();
  const isHi = language === 'hi';

  const [tenders, setTenders] = useState([
    {
      bidId: "GEM/2026/B/891204",
      department: isHi ? "कार्यालय जिला कलेक्टर / जिला परिषद" : "Office of District Collector / Zila Parishad",
      workName: isHi ? "42 ग्राम पंचायत सचिवालयों हेतु वार्षिक विद्युत सबस्टेशन एवं सोलर रखरखाव" : "Annual Electrical Substation & Solar Maintenance for 42 Gram Panchayat Secretariats",
      estimatedValue: "₹18,50,000",
      cooperativePreference: isHi ? "GFR नियम 153 के तहत 100% आरक्षित" : "100% Reserved under GFR Rule 153",
      assignedSociety: isHi ? "दिल्ली श्रमिक सहकारी महासंघ" : "Delhi Shramik Sahakari Federation",
      status: isHi ? "कार्य आदेश जारी" : "Work Order Awarded",
      artisansDeployed: 32
    },
    {
      bidId: "GEM/2026/B/771092",
      department: isHi ? "नवोदय विद्यालय समिति (वाराणसी क्लस्टर)" : "Navodaya Vidyalaya Samiti (Varanasi Cluster)",
      workName: isHi ? "स्वच्छता उपकरण उन्नयन एवं रिवर्स ऑस्मोसिस (RO) वाटर प्लांट वार्षिक अनुबंध" : "Sanitary Fixture Upgrades & Reverse Osmosis (RO) Water Plant Annual Contract",
      estimatedValue: "₹7,20,000",
      cooperativePreference: isHi ? "NCCT प्रमाणित सहकारी वरीयता छूट" : "NCCT Certified Cooperative Exemption",
      assignedSociety: isHi ? "पूर्वांचल कारीगर सहकारी समिति" : "Purvanchal Karigar Sahakari Samiti",
      status: isHi ? "सक्रिय निष्पादन" : "Active Execution",
      artisansDeployed: 14
    },
    {
      bidId: "GEM/2026/B/992410",
      department: isHi ? "प्राथमिक स्वास्थ्य केंद्र (PHC) नेटवर्क, पुणे ग्रामीण" : "Primary Health Center (PHC) Network, Pune Rural",
      workName: isHi ? "कोल्ड-चेन डीप फ्रीज वैक्सीन रेफ्रिजरेटर आपातकालीन रखरखाव अनुबंध" : "Cold-Chain Deep Freeze Vaccine Refrigerator Emergency Maintenance Contract",
      estimatedValue: "₹12,40,000",
      cooperativePreference: isHi ? "सहकारी महासंघ सीधा आवंटन" : "Cooperative Federation Direct Allocation",
      assignedSociety: isHi ? "महाराष्ट्र राज्य मजदूर सहकारी संघ" : "Maharashtra Rajya Mazdoor Sahakari Sangh",
      status: isHi ? "बोली मूल्यांकन" : "Bidding Evaluation",
      artisansDeployed: 18
    }
  ]);

  const handleAwardWorkOrder = (bidId) => {
    confetti({ particleCount: 60 });
    showToast(isHi ? "GeM कार्य आदेश निष्पादित" : "GeM Work Order Executed", isHi ? "GFR नियम 153 के तहत सहकारी महासंघ अनुबंध जारी किया गया।" : `Cooperative Federation contract issued under GFR Rule 153.`, "success");
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <div
        className="glass-panel"
        style={{
          padding: '26px',
          marginBottom: '26px',
          background: 'linear-gradient(135deg, rgba(244,140,6,0.15) 0%, rgba(10,24,48,0.9) 100%)',
          border: '1.5px solid var(--saffron)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-saffron">{isHi ? "GeM एकीकरण" : "GeM Integration"}</span>
              <span className="badge badge-emerald">{isHi ? "GFR नियम 153 अनुपालित" : "GFR Rule 153 Compliant"}</span>
            </div>
            <h2 style={{ fontSize: '22px', marginTop: '6px' }}>
              {isHi ? "गवर्नमेंट ई-मार्केटप्लेस (GeM) संस्थागत खरीद डेस्क" : "Government e-Marketplace (GeM) Institutional Procurement Desk"}
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', maxWidth: '700px' }}>
              {isHi ? "केंद्रीय मंत्रालयों, राज्य सरकारों एवं पंचायती राज संस्थाओं को बिना किसी बिचौलिया ठेकेदार कमीशन के सीधे श्रम सहकारी महासंघों से सत्यापित कुशल कार्यबल की खरीद में सक्षम बनाता है।" : "Enables Central Ministries, State Governments, and Panchayati Raj institutions to procure verified skilled labor directly from Labour Cooperative Federations with zero middleman contractor commissions."}
            </p>
          </div>

          <div style={{ textAlign: 'right', background: 'rgba(0,0,0,0.3)', padding: '12px 18px', borderRadius: '14px', border: '1px solid rgba(244,140,6,0.3)' }}>
            <span style={{ fontSize: '11px', color: 'var(--saffron-light)', fontWeight: 700 }}>
              {isHi ? "सक्रिय GeM कार्य आदेश" : "Active GeM Work Orders"}
            </span>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff' }}>₹38.10 {isHi ? "लाख" : "Lakhs"}</div>
            <span style={{ fontSize: '11px', color: '#34d399' }}>
              {isHi ? "64 सहकारी कारीगर तैनात" : "64 Cooperative Artisans Deployed"}
            </span>
          </div>
        </div>
      </div>

      {/* GeM Orders Table */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {tenders.map(t => (
          <div key={t.bidId} className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-blue">{t.bidId}</span>
                  <span style={{ fontSize: '12px', color: '#34d399', fontWeight: 600 }}>{t.cooperativePreference}</span>
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginTop: '6px' }}>
                  {t.workName}
                </h4>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {isHi ? "खरीद प्राधिकरण:" : "Procuring Authority:"} <b>{t.department}</b>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span className="badge badge-emerald">
                  <CheckCircle2 size={12} /> {t.status}
                </span>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>
                  {t.estimatedValue}
                </div>
              </div>
            </div>

            <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {isHi ? "संबद्ध महासंघ:" : "Assigned Federation:"} <b style={{ color: '#ffffff' }}>{t.assignedSociety}</b> ({t.artisansDeployed} {isHi ? "सक्रिय कारीगर" : "Active Artisans"})
              </div>

              <button
                onClick={() => handleAwardWorkOrder(t.bidId)}
                className="btn-secondary"
                style={{ fontSize: '12px', padding: '6px 14px' }}
              >
                <Download size={14} /> {isHi ? "GeM स्वीकृति आदेश डाउनलोड करें" : "Download GeM Sanction Order"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
