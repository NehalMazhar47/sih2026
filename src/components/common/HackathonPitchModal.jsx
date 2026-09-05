import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import {
  ShieldCheck,
  Building2,
  Cpu,
  Coins,
  MapPin,
  Users,
  Award,
  ChevronRight,
  Sparkles,
  Layers,
  FileText,
  X,
  CheckCircle2
} from 'lucide-react';

export const HackathonPitchModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const { language } = usePlatform();
  const isHi = language === 'hi';
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'architecture' | 'economics' | 'policy'

  return (
    <div className="modal-backdrop">
      <div className="modal-content" style={{ maxWidth: '850px', maxHeight: '88vh' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.12)', paddingBottom: '16px', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', background: 'linear-gradient(135deg, #f48c06, #d00000)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Award size={24} color="#ffffff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-saffron" style={{ fontSize: '10px' }}>
                  {isHi ? "एस.आई.एच. 2026 समस्या आईडी: 26089" : "SIH 2026 Problem ID: 26089"}
                </span>
                <span className="badge badge-emerald" style={{ fontSize: '10px' }}>
                  {isHi ? "सहकारिता मंत्रालय एवं NCCT" : "Ministry of Cooperation & NCCT"}
                </span>
              </div>
              <h2 style={{ fontSize: '20px', marginTop: '4px' }}>
                {isHi ? "सहकारसेवा: सहकारी गिग सेवा डिजिटल मंच" : "SahakarSeva: Cooperative Gig Services Platform"}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Tab Pills */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px', overflowX: 'auto' }}>
          <button
            onClick={() => setActiveTab('summary')}
            className={`role-pill ${activeTab === 'summary' ? 'active' : ''}`}
            style={{ fontSize: '13px', padding: '6px 16px' }}
          >
            {isHi ? "समस्या एवं समाधान" : "Problem & Solution"}
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`role-pill ${activeTab === 'architecture' ? 'active' : ''}`}
            style={{ fontSize: '13px', padding: '6px 16px' }}
          >
            {isHi ? "सिस्टम संरचना (Architecture)" : "System Architecture"}
          </button>
          <button
            onClick={() => setActiveTab('economics')}
            className={`role-pill ${activeTab === 'economics' ? 'active' : ''}`}
            style={{ fontSize: '13px', padding: '6px 16px' }}
          >
            {isHi ? "पारदर्शी अर्थशास्त्र बनाम निजी दिग्गज" : "Fair Economics vs VC Giants"}
          </button>
          <button
            onClick={() => setActiveTab('policy')}
            className={`role-pill ${activeTab === 'policy' ? 'active' : ''}`}
            style={{ fontSize: '13px', padding: '6px 16px' }}
          >
            {isHi ? "राष्ट्रीय नीति अनुरूपता" : "National Policy Alignment"}
          </button>
        </div>

        {/* Content Tabs */}
        {activeTab === 'summary' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13px', lineHeight: 1.6 }}>
            <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontWeight: 700, color: '#fca5a5', marginBottom: '4px' }}>
                {isHi ? "बाज़ार की मूल विफलता:" : "The Core Market Failure:"}
              </div>
              {isHi ? (
                <>भारत में 4.5 करोड़ से अधिक कुशल कारीगर (इलेक्ट्रीशियन, प्लंबर, बढ़ई, सफाईकर्मी) प्राथमिक कृषि ऋण समितियों (PACS) और श्रम सहकारी समितियों में संगठित हैं। हालांकि, निजी गिग एग्रीगेटर बाज़ार पर हावी हैं और <b>30% तक का अनुचित कमीशन</b> वसूलते हैं, उपभोक्ताओं पर मनमाने सरचार्ज लगाते हैं तथा कामगारों को <b>शून्य स्वास्थ्य या पेंशन सुरक्षा</b> देते हैं। एल्गोरिदम द्वारा कामगारों की आईडी बिना सुनवाई बंद कर दी जाती है।</>
              ) : (
                <>India has over 4.5 crore skilled artisanal workers (electricians, plumbers, carpenters, cleaners), many organized under Primary Agricultural Credit Societies (PACS) and Labour Cooperative Federations. However, private VC-backed gig aggregators dominate the household market, extracting up to <b>30% commissions</b>, forcing surge fees on consumers, and providing <b>zero health or pension benefits</b>. Workers remain underutilized and vulnerable to arbitrary algorithmic deplatforming.</>
              )}
            </div>

            <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontWeight: 700, color: '#34d399', marginBottom: '4px' }}>
                {isHi ? "सहकारसेवा का अभूतपूर्व समाधान:" : "The SahakarSeva Breakthrough:"}
              </div>
              {isHi ? "सहकारी स्वामित्व वाला डिजिटल सेवा मंच जो व्यावसायिक आधुनिक तकनीक को सहकारी मूल्यों से जोड़ता है:" : "A cooperative-federated digital service marketplace that couples commercial-grade UX with cooperative governance:"}
              <ul style={{ paddingLeft: '20px', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {isHi ? (
                  <>
                    <li><b>प्रत्यक्ष पारिश्रमिक (88%):</b> आधार-सक्षम भुगतान (AePS) / UPI द्वारा सीधे कामगार के बैंक खाते में बिना बिचौलिये के।</li>
                    <li><b>सार्वभौमिक सामाजिक सुरक्षा (7%):</b> आयुष्मान भारत PM-JAY स्वास्थ्य सुरक्षा (₹5 लाख), PMJJBY जीवन बीमा और PM-SYM पेंशन का स्वतः संचय।</li>
                    <li><b>राष्ट्रीय सहकारी प्रशिक्षण परिषद (NCCT):</b> डिजिटल कौशल प्रमाणपत्र, सत्यापित उपकरण और निरंतर निःशुल्क प्रशिक्षण वाउचर।</li>
                    <li><b>एआई मौसमी पूर्वानुमान मॉडल:</b> मानसून, गर्मी और त्योहारी सीजन के दौरान कामगारों की उपलब्धता का अग्रिम संतुलन।</li>
                  </>
                ) : (
                  <>
                    <li><b>Direct Living Wages (88%)</b> transferred via AePS/UPI with zero middleman deductions.</li>
                    <li><b>Universal Social Security (7%)</b> automatically funding Ayushman Bharat PM-JAY health insurance, PMJJBY term life, and PM-SYM pension.</li>
                    <li><b>National Council for Cooperative Training (NCCT)</b> accreditation with digital credentials, verified tools, and free upskilling vouchers.</li>
                    <li><b>AI-Powered Demand Forecasting</b> to rebalance workforces across seasonal monsoons, summer heatwaves, and festive surges.</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'architecture' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--primary-border)', borderRadius: '12px', padding: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f48c06', fontWeight: 700 }}>
                  <MapPin size={16} /> {isHi ? "भू-स्थानिक लेयर" : "Geo-Spatial Layer"}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {isHi ? "ओपनस्ट्रीटमैप / जीआईएस तकनीक, वार्ड-स्तरीय क्लस्टर मैपिंग, 15-मिनट निकटतम प्रेषण और लाइव ओटीपी सत्यापन।" : "OpenStreetMap / GIS telemetry, ward-level polygon matching, proximity dispatching, and live OTP arrival handshake."}
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--primary-border)', borderRadius: '12px', padding: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: 700 }}>
                  <Coins size={16} /> {isHi ? "रीयल-टाइम NPCI विभाजन" : "Real-Time NPCI Split"}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {isHi ? "स्मार्ट एस्क्रो प्रणाली: 88% सीधे कामगार बैंक खाते में, 7% एलआईसी/कल्याण कोष में, 5% एनसीटीसी प्रशिक्षण में।" : "Smart split-payment escrow: 88% direct to worker bank, 7% to LIC/PM-JAY welfare pool, 5% to NCCT training."}
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--primary-border)', borderRadius: '12px', padding: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', fontWeight: 700 }}>
                  <Cpu size={16} /> {isHi ? "एआई मौसमी पूर्वानुमान" : "AI Seasonal Model"}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {isHi ? "मौसम, जलभराव और त्योहारों के अग्रिम आंकड़ों का विश्लेषण कर कामगारों की कमी को समय से पहले समाप्त करना।" : "Multi-factor predictive algorithms assessing weather, monsoon flooding, and festivals to prevent artisan shortage."}
                </div>
              </div>
            </div>

            {/* Architecture Stack Table */}
            <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                {isHi ? "प्रौद्योगिकी स्टैक सारांश:" : "Technology Stack Summary:"}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '8px', fontSize: '12px' }}>
                <span style={{ color: 'var(--text-muted)' }}>{isHi ? "फ़्रंटएंड आर्किटेक्चर:" : "Frontend Framework:"}</span>
                <span>{isHi ? "रिएक्ट 19, विट, लीफ़लेट जीआईएस, परिष्कृत वैनिला सीएसएस डिज़ाइन प्रणाली" : "React 19, Vite, Leaflet GIS, Pure Bespoke Vanilla CSS Design System"}</span>
                <span style={{ color: 'var(--text-muted)' }}>{isHi ? "एआई पूर्वानुमान इंजन:" : "AI Forecasting:"}</span>
                <span>{isHi ? "मौसमी मल्टीप्लायर एल्गोरिदम, गतिशील वार्ड आवंटन" : "Seasonal Multiplier Engine, Dynamic Ward Cluster Allocation"}</span>
                <span style={{ color: 'var(--text-muted)' }}>{isHi ? "आवाज सुगमता:" : "Voice Accessibility:"}</span>
                <span>{isHi ? "वेब स्पीच एपीआई संश्लेषण (11 भारतीय क्षेत्रीय भाषाएं)" : "Web Speech API Synthesis (Multilingual Hindi/English/Regional)"}</span>
                <span style={{ color: 'var(--text-muted)' }}>{isHi ? "राष्ट्रीय एकीकरण:" : "National Integrations:"}</span>
                <span>{isHi ? "आधार ई-केवाईसी, आयुष्मान भारत, पीएम-एसवाईएम, एनसीटीसी डिजिटल रजिस्ट्री" : "Aadhaar e-KYC, PM-JAY, PM-SYM, NCCT Digital Badge Registry"}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'economics' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.06)', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <th style={{ padding: '10px' }}>{isHi ? "मापदंड / पहलू" : "Feature / Dimension"}</th>
                  <th style={{ padding: '10px', color: '#34d399' }}>{isHi ? "सहकारसेवा (सहकारी मंच)" : "SahakarSeva (Cooperative)"}</th>
                  <th style={{ padding: '10px', color: '#f87171' }}>{isHi ? "निजी कंपनियाँ (जैसे अर्बन कंपनी)" : "Private Giants (e.g. Urban Company)"}</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <td style={{ padding: '10px' }}>{isHi ? "कामगार की आय हिस्सेदारी" : "Worker Share of Payment"}</td>
                  <td style={{ padding: '10px', color: '#34d399', fontWeight: 700 }}>{isHi ? "88% (सीधा न्यायसंगत पारिश्रमिक)" : "88% (Direct Living Wage)"}</td>
                  <td style={{ padding: '10px', color: '#f87171' }}>{isHi ? "65% - 72% (28-35% भारी कमीशन कटौती)" : "65% - 72% (After 28-35% cut)"}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <td style={{ padding: '10px' }}>{isHi ? "स्वास्थ्य व जीवन सुरक्षा" : "Health & Life Insurance"}</td>
                  <td style={{ padding: '10px', color: '#34d399' }}>{isHi ? "आयुष्मान भारत (₹5 लाख) + PMJJBY (₹4 लाख)" : "Ayushman Bharat (₹5L) + PMJJBY (₹4L)"}</td>
                  <td style={{ padding: '10px', color: '#f87171' }}>{isHi ? "शून्य / महंगे वैकल्पिक विकल्प" : "None / Expensive optional opt-in"}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <td style={{ padding: '10px' }}>{isHi ? "वृद्धावस्था पेंशन" : "Old-Age Pension"}</td>
                  <td style={{ padding: '10px', color: '#34d399' }}>{isHi ? "PM-SYM ₹3,000/माह गारंटीकृत" : "PM-SYM ₹3,000/mo guaranteed"}</td>
                  <td style={{ padding: '10px', color: '#f87171' }}>{isHi ? "शून्य सेवानिवृत्ति सुरक्षा" : "Zero retirement security"}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <td style={{ padding: '10px' }}>{isHi ? "उपकरण व आपातकालीन ऋण" : "Tool & Emergency Micro-Loans"}</td>
                  <td style={{ padding: '10px', color: '#34d399' }}>{isHi ? "कल्याण कोष से 0% ब्याज पर ऋण" : "0% Interest from Welfare Pool"}</td>
                  <td style={{ padding: '10px', color: '#f87171' }}>{isHi ? "महंगे तीसरे पक्ष के ऐप लोन" : "Predatory third-party loan apps"}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <td style={{ padding: '10px' }}>{isHi ? "विवाद निवारण व लोकपाल" : "Governance & Dispute Handling"}</td>
                  <td style={{ padding: '10px', color: '#34d399' }}>{isHi ? "सहकारी लोकपाल / निष्पक्ष मानवीय सुनवाई" : "Cooperative Ombudsman / Human hearing"}</td>
                  <td style={{ padding: '10px', color: '#f87171' }}>{isHi ? "एल्गोरिदम द्वारा तत्काल आईडी ब्लॉक" : "Instant automated algorithmic ban"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'policy' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', lineHeight: 1.6 }}>
            <div style={{ background: 'rgba(244,140,6,0.08)', border: '1px solid rgba(244,140,6,0.25)', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontWeight: 700, color: 'var(--saffron-light)', marginBottom: '4px' }}>
                {isHi ? "सहकारिता मंत्रालय के विज़न के साथ पूर्ण समन्वय:" : "Direct Alignment with Ministry of Cooperation Vision:"}
              </div>
              <b>{isHi ? "“सहकार से समृद्धि” (Prosperity through Cooperation):" : "\"Sahakar se Samriddhi\" (Prosperity through Cooperation):"}</b>
              <br />
              {isHi ? (
                <>सहकारसेवा श्रम सहकारी संघों को आधुनिक तकनीक से जोड़कर उन्हें प्रतिस्पर्धी आधुनिक डिजिटल उद्यम में रूपांतरित करता है, जिससे कामगारों के अधिकारों और गरिमा की पूर्ण रक्षा होती है।</>
              ) : (
                <>SahakarSeva directly fulfills the national agenda of computerizing and digitally empowering Labour Cooperative Federations, transforming them from passive registries into competitive modern gig service enterprises capable of rivaling venture capital platforms while protecting artisan rights.</>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontWeight: 700, color: '#38bdf8' }}>{isHi ? "एनसीटीसी प्रशिक्षण केंद्र:" : "NCCT Training Hubs:"}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {isHi ? "क्षेत्रीय सहकारी प्रबंधन संस्थानों (RICM) के सहयोग से सौर ऊर्जा, ईवी चार्जिंग और आधुनिक स्वच्छता तकनीकों में निरंतर कौशल विकास।" : "Integrates with Regional Institutes of Cooperative Management (RICMs) to provide continuous upskilling into modern green jobs (solar, EV chargers, green sanitation)."}
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontWeight: 700, color: '#34d399' }}>{isHi ? "बहु-राज्यीय अंतर-संचालनीयता:" : "Multi-State Coops:"}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {isHi ? "विभिन्न राज्य सहकारी संघों में आपसी सहयोग, जिससे मौसमी चरम मांग के समय कामगारों का अंतर्राज्यीय नियोजन पारदर्शी तरीके से संभव हो सके।" : "Interoperable across state cooperative federations, enabling seamless interstate worker mobility during seasonal peak demand."}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: '22px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} className="btn-primary" style={{ padding: '8px 24px' }}>
            {isHi ? "प्रस्तुति मार्गदर्शिका बंद करें" : "Close Pitch Guide"}
          </button>
        </div>
      </div>
    </div>
  );
};
