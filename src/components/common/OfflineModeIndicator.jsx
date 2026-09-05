import React, { useState } from 'react';
import { WifiOff, Radio, MessageSquare, PhoneCall, X, CheckCircle2 } from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';

export const OfflineModeIndicator = () => {
  const [isSimulatingOffline, setIsSimulatingOffline] = useState(false);
  const [showUssdModal, setShowUssdModal] = useState(false);
  const { showToast, t, language } = usePlatform();

  const handleToggleOffline = () => {
    const next = !isSimulatingOffline;
    setIsSimulatingOffline(next);
    if (next) {
      showToast(
        language === 'hi' ? "ऑफलाइन मोड सक्रिय" : "Offline Mode Active",
        language === 'hi' ? "ग्रामीण कनेक्टिविटी हेतु USSD *99*26089# एवं SMS प्रेषण चालू।" : "Switched to USSD *99*26089# and SMS dispatch for rural connectivity.",
        "warning"
      );
    } else {
      showToast(
        language === 'hi' ? "ऑनलाइन मोड पुनः स्थापित" : "Online Mode Restored",
        language === 'hi' ? "हाई-स्पीड क्लाउड सिंक से पुनः कनेक्ट हुआ।" : "Reconnected to high-speed cloud sync.",
        "success"
      );
    }
  };

  return (
    <>
      {/* Floating Low-Bandwidth Mode Button */}
      <button
        id="rural-offline-mode-btn"
        onClick={() => setShowUssdModal(true)}
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          zIndex: 800,
          background: isSimulatingOffline ? '#ef4444' : 'rgba(9, 26, 50, 0.9)',
          border: isSimulatingOffline ? '2px solid #ffffff' : '1px solid var(--primary-border)',
          borderRadius: '30px',
          padding: '8px 16px',
          color: '#ffffff',
          fontSize: '12px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          backdropFilter: 'blur(8px)'
        }}
        title="Simulate Low-Bandwidth / Rural Gram Panchayat Connectivity"
      >
        <Radio size={14} color={isSimulatingOffline ? "#ffffff" : "#f48c06"} />
        <span>{isSimulatingOffline ? t('gramPanchayatSms') : t('ruralOfflineBtn')}</span>
      </button>

      {/* Modal Explaining Rural Connectivity Architecture */}
      {showUssdModal && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '580px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Radio size={22} color="#f48c06" />
                <h3 style={{ fontSize: '18px', color: '#ffffff' }}>
                  {language === 'hi' ? "ग्रामीण एवं ऑफलाइन सहकारिता (ग्राम पंचायत सक्षम)" : "Rural & Offline Resilience (Gram Panchayat Ready)"}
                </h3>
              </div>
              <button onClick={() => setShowUssdModal(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>✕</button>
            </div>

            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '18px', lineHeight: 1.5 }}>
              {language === 'hi'
                ? "ग्रामीण व अर्ध-शहरी पंचायतों में जहां 4G/5G डेटा नेटवर्क अनियमित होता है, श्रमसेतु USSD (*99#) और SMS टेलीफोनी गेटवे का स्वचालित उपयोग करती है। साधारण फीचर फोन रखने वाले ग्रामीण कुशल कारीगर SMS द्वारा कार्य सूचना पाते हैं और कोड भेजकर तुरंत स्वीकार करते हैं।"
                : "In rural and semi-urban panchayats where 4G/5G data is intermittent, ShramSetu includes automated fallbacks using USSD (*99#) and SMS Telephony Gateways. Skilled rural cooperative artisans with basic feature phones receive gig notifications via SMS and accept via return code."}
            </p>

            {/* Feature Phone Simulator Box */}
            <div style={{ background: '#071324', border: '2px solid #334155', borderRadius: '16px', padding: '18px', marginBottom: '20px' }}>
              <div style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 700, marginBottom: '8px' }}>
                {language === 'hi' ? "फीचर फोन SMS प्रेषण सिम्युलेशन:" : "FEATURE PHONE SMS DISPATCH SIMULATION:"}
              </div>
              <div style={{ background: '#0b1d36', padding: '12px', borderRadius: '10px', fontSize: '12px', fontFamily: 'monospace', color: '#e2e8f0', lineHeight: 1.4 }}>
                {language === 'hi' ? (
                  <>
                    [श्रमसेतु SMS]:<br />
                    आपकी पंचायत वार्ड में नया कार्य: पाइपलाइन लीकेज मरम्मत।<br />
                    ग्राहक: वर्मा फार्महाउस।<br />
                    गारंटीकृत आजीविका आय: रु 320 (88%)।<br />
                    स्वीकार करने हेतु 'ACCEPT 4829' लिखकर भेजें या अगले सदस्य को देने हेतु 'PASS' लिखें।
                  </>
                ) : (
                  <>
                    [ShramSetu SMS]:<br />
                    New Gig in your Panchayat Ward: Pipeline Leakage Fix.<br />
                    Customer: Verma Farmhouse.<br />
                    Guaranteed Living Wage: Rs 320 (88%).<br />
                    Reply 'ACCEPT 4829' to claim or 'PASS' to route to next cooperative member.
                  </>
                )}
              </div>
            </div>

            <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '12px', padding: '14px', marginBottom: '20px', fontSize: '12px', color: '#34d399' }}>
              <div style={{ fontWeight: 700, marginBottom: '4px' }}>{t('footerTheme')}</div>
              {language === 'hi'
                ? "ग्रामीण भारत के कारीगरों को बिना स्मार्टफोन के संस्थागत कार्य (सौर पंप, कोल्ड स्टोरेज, ट्रैक्टर वायरिंग) से जोड़ता है।"
                : "Empowers artisans in rural Bharat to find institutional gigs (solar pumps, cold storage refrigeration, agro-tractor wiring) without requiring smartphones."}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                onClick={handleToggleOffline}
                className={isSimulatingOffline ? "btn-emerald" : "btn-primary"}
                style={{ fontSize: '13px' }}
              >
                {isSimulatingOffline
                  ? (language === 'hi' ? "वापस ऑनलाइन वेब ऐप पर आएं" : "Switch Back to Online Web App")
                  : (language === 'hi' ? "ग्राम पंचायत SMS मोड चालू करें" : "Activate Gram Panchayat SMS Mode")}
              </button>
              <button onClick={() => setShowUssdModal(false)} className="btn-secondary" style={{ fontSize: '13px' }}>
                {language === 'hi' ? "बंद करें" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
