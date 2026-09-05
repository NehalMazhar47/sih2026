import React, { useState } from 'react';
import { Mic, MicOff, Volume2, Sparkles, X, CheckCircle2, ArrowRight } from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';

export const VoiceBookingAssistant = ({ isOpen, onClose, onSelectService }) => {
  if (!isOpen) return null;

  const { speakText, showToast, language } = usePlatform();
  const isHi = language === 'hi';

  const [isListening, setIsListening] = useState(false);
  const [transcribedText, setTranscribedText] = useState("");
  const [detectedIntent, setDetectedIntent] = useState(null);

  const samplePrompts = [
    {
      text: "बिजली का शॉर्ट सर्किट हो गया है, तुरंत इलेक्ट्रीशियन भेजो",
      lang: "हिन्दी (Hindi - North)",
      category: "electrician",
      isEmergency: true,
      label: isHi ? "विद्युत शॉर्ट सर्किट (आपातकालीन SOS)" : "Electrical Short Circuit (Emergency SOS)"
    },
    {
      text: "ઘરમાં શોર્ટ સર્કિટ થઈ ગયું છે, તાત્કાલિક ઇલેક્ટ્રિશિયન મોકલો",
      lang: "ગુજરાતી (Gujarati - West)",
      category: "electrician",
      isEmergency: true,
      label: isHi ? "विद्युत शॉर्ट सर्किट (आपातकालीन SOS)" : "Electrical Short Circuit (Emergency SOS)"
    },
    {
      text: "घरामध्ये सणापूर्वी पेंटिंग आणि डीप क्लिनिंग करायचे आहे",
      lang: "मराठी (Marathi - West)",
      category: "painter",
      isEmergency: false,
      label: isHi ? "त्योहार पूर्व पेंटिंग एवं डीप क्लीनिंग" : "Festival Painting & Deep Cleaning"
    },
    {
      text: "வீட்டில் தண்ணீர் குழாய் உடைந்துவிட்டது, உடனடியாக பிளम्बर வேண்டும்",
      lang: "தமிழ் (Tamil - South)",
      category: "plumber",
      isEmergency: true,
      label: isHi ? "पाइपलाइन लीकेज आपातकाल (प्लंबर SOS)" : "Pipeline Burst Emergency (Plumber SOS)"
    },
    {
      text: "మా ఇంట్లో కరెంట్ పోయింది, అర్జెంటుగా ఎలక్ట్రీషియన్ కావాలి",
      lang: "తెలుగు (Telugu - South)",
      category: "electrician",
      isEmergency: true,
      label: isHi ? "विद्युत खराबी एवं ट्रिपिंग मरम्मत" : "Power Outage & Tripping Fix"
    },
    {
      text: "ಮನೆಯಲ್ಲಿ ನೀರಿನ ಪೈಪ್ ಲೀಕ್ ಆಗಿದೆ, ತುರ್ತು ಪ್ಲಂಬರ್ ಬೇಕು",
      lang: "ಕನ್ನಡ (Kannada - South)",
      category: "plumber",
      isEmergency: true,
      label: isHi ? "पानी का रिसाव एवं पाइपलाइन मरम्मत" : "Water Seepage & Leakage Repair"
    },
    {
      text: "മുതിർന്ന രോഗിയുടെ പരിചരണത്തിനായി വിദഗ്ദ്ധയായ സഹായികയെ വേണം",
      lang: "മലയാളം (Malayalam - South)",
      category: "caregiver",
      isEmergency: false,
      label: isHi ? "वरिष्ठ नागरिक देखभालकर्ता" : "Geriatric Bedside Caregiver"
    },
    {
      text: "ਘਰ ਵਿੱਚ ਪਾਣੀ ਦਾ ਪਾਈਪ ਲੀਕ ਕਰ ਰਿਹਾ ਹੈ, ਤੁਰੰਤ ਪਲੰਬਰ ਭੇਜੋ",
      lang: "ਪੰਜਾਬੀ (Punjabi - North)",
      category: "plumber",
      isEmergency: true,
      label: isHi ? "आपातकालीन प्लंबिंग SOS" : "Emergency Plumbing SOS"
    },
    {
      text: "পূজার আগে ঘরের দেওয়াল রঙ ও গভীর পরিষ্কার করাতে হবে",
      lang: "বাংলা (Bengali - East)",
      category: "painter",
      isEmergency: false,
      label: isHi ? "त्योहार हेतु दीवार रंगाई व सफाई" : "Festive Wall Painting & Housekeeping"
    },
    {
      text: "ଘରେ ବିଦ୍ୟୁତ୍ ତାର ପୋଡ଼ି ଯାଇଛି, ତୁରନ୍ତ ଇଲେକ୍ଟ୍ରିସିଆନ୍ ପଠାନ୍ତୁ",
      lang: "ଓଡ଼ିଆ (Odia - East)",
      category: "electrician",
      isEmergency: true,
      label: isHi ? "इलेक्ट्रिकल इमरजेंसी ब्रेकडाउन" : "Electrical Emergency Breakdown"
    },
    {
      text: "Need a certified technician for solar inverter battery diagnostics",
      lang: "English (National)",
      category: "technician",
      isEmergency: false,
      label: isHi ? "सोलर पीवी इन्वर्टर निरीक्षण" : "Solar PV Inverter Inspection"
    }
  ];

  const handleSimulateVoice = (sample) => {
    setIsListening(true);
    setTranscribedText(sample.text);
    speakText(sample.text);

    setTimeout(() => {
      setIsListening(false);
      setDetectedIntent(sample);
    }, 1200);
  };

  const handleConfirmIntent = () => {
    if (detectedIntent) {
      onSelectService(detectedIntent.category, detectedIntent.isEmergency);
      onClose();
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content" style={{ maxWidth: '600px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '38px', height: '38px', background: 'rgba(244,140,6,0.2)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Mic size={22} color="var(--saffron)" />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', color: '#ffffff' }}>
                {isHi ? "बहुभाषी वॉइस एआई बुकिंग सहायक" : "Multilingual Voice AI Booking Assistant"}
              </h3>
              <div style={{ fontSize: '11px', color: '#34d399' }}>
                {isHi ? "वरिष्ठ नागरिकों एवं बोलकर सेवा बुक करने हेतु" : "Designed for Illiterate Citizens & Senior Citizens"}
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>✕</button>
        </div>

        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
          {isHi ? "अपनी मातृभाषा में बोलें। सहकारी नैचुरल लैंग्वेज प्रोसेसिंग (NLP) तुरंत कार्य की पहचान कर निकटतम प्रमाणित कारीगर को जोड़ेगा।" : "Speak in your native dialect (Hindi, Marathi, Tamil, Bengali, English). The Cooperative Natural Language Processing (NLP) engine extracts trade requirements and dispatches verified artisans without typing."}
        </p>

        {/* Voice Listening Animation Box */}
        <div
          style={{
            background: '#071326',
            border: isListening ? '2px solid #ef4444' : '1px solid var(--primary-border)',
            borderRadius: '16px',
            padding: '24px',
            textAlign: 'center',
            marginBottom: '20px',
            boxShadow: isListening ? '0 0 25px rgba(239,68,68,0.4)' : 'none'
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: isListening ? '#ef4444' : 'rgba(244,140,6,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px',
              animation: isListening ? 'pulseSOS 1.5s infinite' : 'none'
            }}
          >
            <Mic size={30} color={isListening ? "#ffffff" : "#f48c06"} />
          </div>

          <div style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff' }}>
            {isListening ? (isHi ? "सुन रहा है और ध्वनि विश्लेषण जारी है..." : "Listening & Parsing Voice Audio...") : (transcribedText || (isHi ? "नीचे दिए गए किसी भी वाक्य पर टैप करें अथवा माइक में बोलें" : "Tap a sample voice command below or speak into microphone"))}
          </div>
          {isListening && (
            <div style={{ fontSize: '11px', color: '#fca5a5', marginTop: '4px' }}>
              {isHi ? "● वेब स्पीच एपीआई द्वारा वाणी से पाठ में रूपांतरण" : "● Converting speech to text via Web Speech API"}
            </div>
          )}
        </div>

        {/* Detected Intent Card */}
        {detectedIntent && (
          <div style={{ background: 'rgba(16,185,129,0.1)', border: '1.5px solid #10b981', borderRadius: '12px', padding: '14px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#34d399', fontWeight: 700 }}>
                {isHi ? "AI द्वारा पहचानी गई सेवा:" : "AI Intent Extraction Result:"}
              </div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff' }}>{detectedIntent.label}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {isHi ? "प्राथमिकता: " : "Priority: "}
                {detectedIntent.isEmergency ? (isHi ? '🚨 तत्काल आपातकालीन SOS' : '🚨 Immediate Emergency SOS') : (isHi ? '📅 निर्धारित मानक सेवा' : '📅 Scheduled Standard Service')}
              </div>
            </div>
            <button onClick={handleConfirmIntent} className="btn-emerald" style={{ padding: '8px 18px', fontSize: '12px' }}>
              {isHi ? "कारीगर भेजें " : "Proceed to Dispatch "} <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* Sample Voice Prompts Grid */}
        <div style={{ marginBottom: '14px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
            {isHi ? "प्राकृतिक भाषा के उदाहरण (क्लिक करके जांचें):" : "Click to Simulate Natural Speech Prompts:"}
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSimulateVoice(p)}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  color: '#ffffff',
                  fontSize: '12px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Volume2 size={14} color="#f48c06" />
                  <span>"{p.text}"</span>
                </div>
                <span className="badge badge-saffron" style={{ fontSize: '9px' }}>{p.lang}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '14px' }}>
          <button onClick={onClose} className="btn-secondary" style={{ fontSize: '12px' }}>
            {isHi ? "सहायक बंद करें" : "Close Assistant"}
          </button>
        </div>
      </div>
    </div>
  );
};

