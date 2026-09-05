import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, ArrowRight, Building, Coins, CreditCard, RefreshCw, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

export const PaymentSplitSimulator = ({ amount = 450, workerName = "Satish Kumar Verma", onClose }) => {
  const { language } = usePlatform ? usePlatform() : { language: 'en' };
  const isHi = language === 'hi';
  const [step, setStep] = useState(0); // 0: initiated, 1: authenticating, 2: split complete

  const workerShare = (amount * 0.88).toFixed(2);
  const welfareShare = (amount * 0.07).toFixed(2);
  const platformShare = (amount * 0.05).toFixed(2);

  const triggerSimulation = () => {
    setStep(1);
    setTimeout(() => {
      setStep(2);
      confetti({ particleCount: 70, spread: 80 });
    }, 1200);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content" style={{ maxWidth: '650px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', background: 'rgba(16,185,129,0.2)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Coins size={22} color="#10b981" />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', color: '#ffffff' }}>
                {isHi ? "NPCI सजीव विभाजित भुगतान इंजन (88-7-5 मॉडल)" : "NPCI Real-Time Split Payment Engine"}
              </h3>
              <div style={{ fontSize: '11px', color: '#34d399' }}>
                {isHi ? "त्वरित आधार-सक्षम बैंक निपटान (AePS / UPI 2.0)" : "Instant Aadhaar-Enabled Settlement (AePS / UPI 2.0)"}
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>✕</button>
        </div>

        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '20px' }}>
          {isHi ? "यह सिम्युलेटर दर्शाता है कि उपभोक्ता का भुगतान गेटवे स्तर पर स्वतः कैसे विभाजित होता है, जिससे कोई भी बिचौलिया प्लेटफॉर्म श्रमिक की कमाई को रोक नहीं सकता।" : "This simulated banking workflow demonstrates how the customer's payment automatically splits at the transaction gateway level, preventing platform operators from withholding worker earnings."}
        </p>

        {/* Amount Card */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--primary-border)', borderRadius: '14px', padding: '16px', marginBottom: '22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{isHi ? "उपभोक्ता कुल भुगतान" : "Customer Gross Payment"}</span>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff' }}>₹{amount}.00</div>
          </div>
          <span className="badge badge-saffron">{isHi ? "UPI 2.0 एस्क्रो विभाजन" : "UPI 2.0 Split Escrow"}</span>
        </div>

        {/* Dynamic Payment Split Tree */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          {/* Node 1: Worker Account */}
          <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '12px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '12px' }}>
                88%
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#ffffff' }}>
                  {isHi ? `${workerName} का बैंक खाता (AePS)` : `${workerName}'s Bank (AePS)`}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {isHi ? "प्रत्यक्ष जीवन निर्वाह मजदूरी • भारतीय स्टेट बैंक (खाता अंत 4812)" : "Direct Living Wage • State Bank of India • A/C Ending in 4812"}
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#34d399' }}>₹{workerShare}</div>
              <span className="badge badge-emerald" style={{ fontSize: '9px' }}>
                {step === 2 ? (isHi ? "जमा हुआ" : "CREDITED") : (isHi ? "रूटेड" : "ROUTED")}
              </span>
            </div>
          </div>

          {/* Node 2: Welfare & Pension Escrow */}
          <div style={{ background: 'rgba(244,140,6,0.08)', border: '1px solid rgba(244,140,6,0.3)', borderRadius: '12px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f48c06', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '12px' }}>
                7%
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#ffffff' }}>
                  {isHi ? "सहकारी श्रमिक कल्याण ट्रस्ट निधि" : "Cooperative Welfare Trust Fund"}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {isHi ? "विभाजित: PM-JAY स्वास्थ्य एवं PM-SYM पेंशन PRAN खाता" : "Bifurcated: PM-JAY Health & PM-SYM Pension PRAN Account"}
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--saffron-light)' }}>₹{welfareShare}</div>
              <span className="badge badge-saffron" style={{ fontSize: '9px' }}>
                {step === 2 ? (isHi ? "एस्क्रो सुरक्षित" : "ESCROWED") : (isHi ? "रूटेड" : "ROUTED")}
              </span>
            </div>
          </div>

          {/* Node 3: NCCT & Cloud Fund */}
          <div style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '12px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '12px' }}>
                5%
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#ffffff' }}>
                  {isHi ? "NCCT प्रशिक्षण एवं तकनीकी परिचालन" : "NCCT Training & Platform Ops"}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {isHi ? "कौशल प्रमाणन लैब्स, मैपबॉक्स जीआईएस एवं क्लाउड सर्वर" : "Skill Certification Labs, Mapbox/GIS & Cloud Servers"}
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#93c5fd' }}>₹{platformShare}</div>
              <span className="badge badge-blue" style={{ fontSize: '9px' }}>
                {step === 2 ? (isHi ? "निपटान पूर्ण" : "SETTLED") : (isHi ? "रूटेड" : "ROUTED")}
              </span>
            </div>
          </div>
        </div>

        {/* Transaction Trace Details */}
        {step === 2 && (
          <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '12px', marginBottom: '20px', fontSize: '11px', color: 'var(--text-muted)' }}>
            <div><b>NPCI UTR:</b> NPCI-COOP-2026-98124719-X</div>
            <div><b>{isHi ? "निपटान समय:" : "Settlement Time:"}</b> {new Date().toLocaleTimeString()} (0.42 {isHi ? "सेकंड" : "seconds"})</div>
            <div style={{ color: '#34d399', marginTop: '2px' }}>
              {isHi ? "✓ सहकारी स्मार्ट अनुबंध द्वारा दोहरे डिजिटल हस्ताक्षर से सत्यापित" : "✓ Dual-signed with Cooperative Smart Contract Signature"}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={onClose} className="btn-secondary" style={{ flex: 1 }}>
            {isHi ? "बंद करें" : "Close"}
          </button>
          {step !== 2 ? (
            <button
              onClick={triggerSimulation}
              className="btn-primary"
              style={{ flex: 2 }}
              disabled={step === 1}
            >
              {step === 1 ? (isHi ? "NPCI विभाजन प्रक्रिया जारी..." : "Executing NPCI Split...") : (isHi ? "लाइव बैंक निपटान सिम्युलेट करें" : "Simulate Live Bank Settlement")}
            </button>
          ) : (
            <button onClick={onClose} className="btn-emerald" style={{ flex: 2 }}>
              {isHi ? "✓ बैंक निपटान सफल" : "✓ Settlement Confirmed"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
