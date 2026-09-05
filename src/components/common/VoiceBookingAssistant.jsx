import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { Mic, X, Volume2, ArrowRight } from 'lucide-react';

const PROMPTS = [
  { text: 'Mujhe kal subah ek plumber chahiye', lang: 'Hindi', intent: { label_en: 'Plumber – Scheduled', label_hi: 'प्लंबर – निर्धारित सेवा', category: 'plumber', isEmergency: false } },
  { text: 'मेरी बिजली चली गई, कोई भेजो अभी', lang: 'हिन्दी', intent: { label_en: 'Electrician – Emergency', label_hi: 'इलेक्ट्रीशियन – आपातकाल', category: 'electrician', isEmergency: true } },
  { text: 'Need a carpenter for furniture repair', lang: 'English', intent: { label_en: 'Carpenter – Scheduled', label_hi: 'बढ़ई – निर्धारित', category: 'carpenter', isEmergency: false } },
  { text: 'Ghar ki safai karwani hai deepawali se pehle', lang: 'Hinglish', intent: { label_en: 'Deep Cleaning – Scheduled', label_hi: 'गहन सफाई – निर्धारित', category: 'cleaning', isEmergency: false } },
];

export const VoiceBookingAssistant = ({ isOpen, onClose }) => {
  const { language, setRole } = usePlatform();
  const isHi = language === 'hi';
  const [listening, setListening] = useState(false);
  const [detectedIntent, setDetectedIntent] = useState(null);

  if (!isOpen) return null;

  const handleSimulate = (p) => {
    setListening(true);
    setTimeout(() => { setListening(false); setDetectedIntent(p.intent); }, 1200);
  };

  const handleConfirm = () => {
    onClose();
    window.dispatchEvent(new CustomEvent('open-booking', { detail: detectedIntent }));
  };

  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="modal-header">
          <div>
            <div className="modal-title">
              <Mic size={18} style={{ display: 'inline', marginRight: 6, color: 'var(--saffron)' }} />
              {isHi ? 'आवाज बुकिंग सहायक' : 'Voice Booking Assistant'}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              {isHi ? 'बोलें या नीचे से चुनें' : 'Speak or tap a sample below'}
            </div>
          </div>
          <button className="btn btn-ghost btn-icon btn-sm" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="modal-body" style={{ padding: 'var(--sp-lg) var(--sp-xl)' }}>
          {/* Mic button */}
          <div style={{ textAlign: 'center', marginBottom: 'var(--sp-lg)' }}>
            <button
              onClick={() => { setListening(true); setTimeout(() => setListening(false), 3000); }}
              style={{
                width: 80, height: 80, borderRadius: '50%',
                background: listening ? 'var(--sos)' : 'var(--navy)',
                border: listening ? '3px solid rgba(220,38,38,0.3)' : '3px solid rgba(15,41,66,0.2)',
                color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', margin: '0 auto',
                boxShadow: listening ? '0 0 0 12px rgba(220,38,38,0.1)' : 'var(--shadow-md)',
                transition: 'all 0.3s ease'
              }}
            >
              <Mic size={32} />
            </button>
            <div style={{ marginTop: 12, fontSize: 14, color: 'var(--text-muted)', fontWeight: 600 }}>
              {listening
                ? (isHi ? '🔴 सुन रहा हूं...' : '🔴 Listening...')
                : (isHi ? 'बोलने के लिए दबाएं' : 'Tap to speak')}
            </div>
          </div>

          {/* Detected intent */}
          {detectedIntent && (
            <div style={{ background: 'var(--green-pale)', border: '2px solid #A7DFC4', borderRadius: 'var(--r-lg)', padding: 'var(--sp-md)', marginBottom: 'var(--sp-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--green)', marginBottom: 4 }}>
                  {isHi ? 'AI ने पहचाना:' : 'AI Detected Intent:'}
                </div>
                <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--navy)' }}>{isHi ? detectedIntent.label_hi : detectedIntent.label_en}</div>
                {detectedIntent.isEmergency && <span className="badge badge-red mt-sm">🚨 {isHi ? 'आपातकाल' : 'Emergency'}</span>}
              </div>
              <button className="btn btn-green btn-sm" onClick={handleConfirm}>
                {isHi ? 'बुकिंग करें' : 'Proceed'} <ArrowRight size={14} />
              </button>
            </div>
          )}

          {/* Sample prompts */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>
              {isHi ? 'उदाहरण वाक्य (क्लिक करें):' : 'Sample voice prompts (click to try):'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {PROMPTS.map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleSimulate(p)}
                  style={{
                    background: 'var(--bg)',
                    border: '1.5px solid var(--border)',
                    borderRadius: 'var(--r-md)',
                    padding: '10px var(--sp-md)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 10,
                    fontSize: 14,
                    color: 'var(--text)',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--navy)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Volume2 size={14} color="var(--saffron)" />
                    <span>"{p.text}"</span>
                  </div>
                  <span className="badge badge-gray" style={{ fontSize: 10 }}>{p.lang}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
