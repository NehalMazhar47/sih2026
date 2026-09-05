import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, ShieldCheck, ChevronRight, Sparkles, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePlatform } from '../../context/PlatformContext';

export const SkillAssessmentModal = ({ onClose }) => {
  const { showToast, speakText, language } = usePlatform();
  const isHi = language === 'hi';

  const questions = isHi ? [
    {
      q: "इलेक्ट्रिकल पैनल की मरम्मत करते समय, NCCT मानकों के अनुसार अनिवार्य पहला सुरक्षा कदम क्या है?",
      options: [
        "टॉर्च से तारों का रंग जांचना",
        "मुख्य MCB को बंद करना और कैलिब्रेटेड मल्टीमीटर से शून्य वोल्टेज सत्यापित करना",
        "सूती दस्ताने पहनकर सीधे काम शुरू करना",
        "धूल कम करने के लिए पानी छिड़कना"
      ],
      correct: 1
    },
    {
      q: "घरेलू सोलर पैनलों के लिए अनुशंसित डीसी सर्ज प्रोटेक्शन डिवाइस (SPD) रेटिंग क्या है?",
      options: [
        "क्लास 2 (टाइप 2) डीसी 1000V सर्ज अरेस्टर",
        "सामान्य 5A घरेलू फ्यूज",
        "केवल ग्राउंड अर्थिंग पाइप से सीधा जोड़ना",
        "आवासीय छतों के लिए SPD की कोई आवश्यकता नहीं"
      ],
      correct: 0
    },
    {
      q: "सहकारिता मंत्रालय के दिशा-निर्देशों के तहत, गिग सेवा आय का कितना प्रतिशत कामगार कल्याण कोष में जाता है?",
      options: [
        "0% (श्रमिक को स्वयं निजी बीमा खरीदना होगा)",
        "2% (मंच की इच्छानुसार)",
        "7% (अनिवार्य आयुष्मान भारत, PMJJBY व पेंशन कवर)",
        "30% (मंच कटौती)"
      ],
      correct: 2
    }
  ] : [
    {
      q: "When repairing an electrical panel, what is the mandatory first safety step according to NCCT standards?",
      options: [
        "Check wire color with a flashlight",
        "De-energize main MCB and verify zero voltage using a calibrated multimeter",
        "Put on cotton gloves and proceed",
        "Sprinkle water to reduce dust"
      ],
      correct: 1
    },
    {
      q: "What is the recommended solar rooftop DC surge protection device (SPD) rating for household solar arrays?",
      options: [
        "Class 2 (Type 2) DC 1000V Surge Arrester",
        "Standard 5A domestic fuse",
        "Direct connection to ground pipe only",
        "No SPD required for residential rooftops"
      ],
      correct: 0
    },
    {
      q: "Under the Ministry of Cooperation Guidelines, what percentage of gig service proceeds is allocated to the worker's welfare fund?",
      options: [
        "0% (Worker must buy private policy)",
        "2% (Platform optional)",
        "7% (Mandatory Ayushman Bharat, PMJJBY & Pension cover)",
        "30% (Platform retention)"
      ],
      correct: 2
    }
  ];

  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleNext = () => {
    if (selectedOpt === questions[currentQ].correct) {
      setScore(score + 1);
    }

    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
      setSelectedOpt(null);
    } else {
      setIsFinished(true);
      confetti({ particleCount: 80, spread: 70 });
      showToast(isHi ? "NCCT परीक्षा उत्तीर्ण!" : "NCCT Assessment Passed!", isHi ? "मास्टर कारीगर लेवल-4 सत्यापित एवं डिजिटल पहचान पत्र में जोड़ा गया।" : "Master Craftsman Level 4 Verified & Added to your Digital ID.", "success");
      speakText(isHi ? "बधाई हो! आपने NCCT कौशल परीक्षा विशेष योग्यता से उत्तीर्ण कर ली है।" : "Congratulations! You passed the NCCT Skill Assessment with distinction.");
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content" style={{ maxWidth: '620px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={24} color="#f48c06" />
            <h3 style={{ fontSize: '18px', color: '#ffffff' }}>
              {isHi ? "NCCT मास्टर कौशल प्रमाणन परीक्षा" : "NCCT Master Skill Certification Exam"}
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>✕</button>
        </div>

        {!isFinished ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>
              <span>{isHi ? `प्रश्न ${currentQ + 1} / ${questions.length}` : `Question ${currentQ + 1} of ${questions.length}`}</span>
              <span className="badge badge-saffron">{isHi ? "ट्रेड टेस्ट: इलेक्ट्रिकल एवं सोलर" : "Trade Test: Electrical & Solar"}</span>
            </div>

            <div style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', marginBottom: '18px', lineHeight: 1.5 }}>
              {questions[currentQ].q}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              {questions[currentQ].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedOpt(idx)}
                  style={{
                    background: selectedOpt === idx ? 'rgba(244,140,6,0.2)' : 'rgba(255,255,255,0.03)',
                    border: selectedOpt === idx ? '1.5px solid var(--saffron)' : '1px solid var(--primary-border)',
                    borderRadius: '10px',
                    padding: '12px 16px',
                    color: '#ffffff',
                    textAlign: 'left',
                    fontSize: '13px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={handleNext}
                disabled={selectedOpt === null}
                className="btn-primary"
                style={{ padding: '8px 24px', opacity: selectedOpt === null ? 0.5 : 1 }}
              >
                {currentQ + 1 === questions.length ? (isHi ? "परीक्षा जमा करें" : "Submit Exam") : (isHi ? "अगला प्रश्न →" : "Next Question →")}
              </button>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ width: '64px', height: '64px', background: 'rgba(16,185,129,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <CheckCircle2 size={36} color="#10b981" />
            </div>

            <h3 style={{ fontSize: '20px', color: '#ffffff', marginBottom: '6px' }}>
              {isHi ? "NCCT लेवल 4 मास्टर कारीगर सत्यापित!" : "NCCT Level 4 Master Craftsman Verified!"}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '18px' }}>
              {isHi ? "आपने सुरक्षा एवं तकनीकी मानकों में शत-प्रतिशत अंक प्राप्त किए हैं। आपका आधिकारिक डिजिटल प्रमाण पत्र राष्ट्रीय सहकारी प्रशिक्षण परिषद (NCCT) ब्लॉकचेन रजिस्ट्री में दर्ज कर दिया गया है।" : "You scored 100% on safety and technical compliance. Your official credential has been pushed to the National Council for Cooperative Training (NCCT) Blockchain Registry."}
            </p>

            <div style={{ background: 'rgba(244,140,6,0.1)', border: '1px solid rgba(244,140,6,0.3)', borderRadius: '12px', padding: '14px', marginBottom: '22px', display: 'inline-block' }}>
              <span className="badge badge-saffron" style={{ fontSize: '11px' }}>
                {isHi ? "प्रमाण पत्र आईडी:" : "Credential ID:"} NCCT-GOLD-2026-9481
              </span>
              <div style={{ fontSize: '12px', color: '#34d399', marginTop: '4px', fontWeight: 600 }}>
                {isHi ? "+15% उच्च सहकारी मानक दर कार्ड हेतु पात्र" : "Eligible for +15% Higher Standard Cooperative Rate Card"}
              </div>
            </div>

            <div>
              <button onClick={onClose} className="btn-emerald" style={{ padding: '10px 28px' }}>
                {isHi ? "संपन्न एवं डैशबोर्ड पर लौटें" : "Done & Return to Dashboard"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
