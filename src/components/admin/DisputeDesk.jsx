import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { Scale, MessageSquare, CheckCircle2, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export const DisputeDesk = () => {
  const { showToast, language } = usePlatform();
  const isHi = language === 'hi';

  const [grievances, setGrievances] = useState([
    {
      id: "DISP-410",
      customerName: isHi ? "आलोक सेनगुप्ता (साउथ एक्स, दिल्ली)" : "Alok Sengupta (South Ext, Delhi)",
      workerName: "दिनेश बाबू चौहान",
      trade: isHi ? "पेंटर" : "Painter",
      issue: isHi ? "ग्राहक का दावा था कि मास्टर बेडरूम की 1 दीवार पर प्राइमर का अतिरिक्त कोट लगना चाहिए था।" : "Customer claimed 1 wall in master bedroom required an extra coat of primer.",
      resolutionProposed: isHi ? "समिति लोकपाल ने 1.5 घंटे का निःशुल्क सुधार कार्य आयोजित किया; सामग्री खर्च सहकारी गुणवत्ता कोष से दिया गया।" : "Society Ombudsman arranged 1.5 hr touch-up free of cost; material reimbursed from Cooperative Quality Fund.",
      status: isHi ? "निस्तारित - सौहार्दपूर्ण समझौता" : "Resolved - Amicable Agreement",
      date: "2026-09-02"
    },
    {
      id: "DISP-412",
      customerName: isHi ? "किरण मजूमदार (वसंत विहार)" : "Kiran Mazumdar (Vasant Vihar)",
      workerName: "गुरप्रीत सिंह गिल",
      trade: isHi ? "तकनीशियन" : "Technician",
      issue: isHi ? "देर रात एसी ब्रेकडाउन सेवा के दौरान स्पेयर कैपेसिटर की कीमत पर विवाद।" : "Dispute over spare capacitor cost during late night AC breakdown service.",
      resolutionProposed: isHi ? "सहकारी मानक एमआरपी पुर्जों की सूची प्रस्तुत की गई; ग्राहक ने सत्यापित कर रियायती मूल्य का भुगतान किया।" : "Cooperative standard MRP parts catalog presented; customer verified and paid exact subsidized price.",
      status: isHi ? "निस्तारित - सत्यापित मूल्य" : "Resolved - Verified Pricing",
      date: "2026-09-03"
    }
  ]);

  const [newDisputeInput, setNewDisputeInput] = useState("");

  const handleAddMediation = (e) => {
    e.preventDefault();
    if (!newDisputeInput) return;
    const newGrievance = {
      id: `DISP-${Math.floor(420 + Math.random() * 50)}`,
      customerName: isHi ? "अनाम नागरिक प्रतिपुष्टि" : "Anonymous Household Feedback",
      workerName: isHi ? "आवंटित सहकारी कारीगर" : "Assigned Cooperative Artisan",
      trade: isHi ? "इलेक्ट्रीशियन" : "Electrician",
      issue: newDisputeInput,
      resolutionProposed: isHi ? "सहकारी समिति ने 24 घंटे के अंदर मध्यस्थता समीक्षा प्रारंभ की।" : "Cooperative Society Committee initiated 24-hr resolution review.",
      status: isHi ? "मध्यस्थता जारी" : "In Mediation",
      date: isHi ? "आज" : "Today"
    };
    setGrievances([newGrievance, ...grievances]);
    setNewDisputeInput("");
    confetti({ particleCount: 30 });
    showToast(isHi ? "शिकायत दर्ज की गई" : "Grievance Logged", isHi ? "सहकारी लोकपाल समिति को प्रेषित। कारीगर का खाता बिना किसी जुर्माने के सक्रिय रहेगा।" : "Referred to Cooperative Ombudsman Panel. Worker account remains active without penalty.", "info");
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div
        className="glass-panel"
        style={{
          padding: '26px',
          marginBottom: '26px',
          background: 'linear-gradient(135deg, rgba(20,40,75,0.7) 0%, rgba(10,24,48,0.9) 100%)',
          border: '1.5px solid var(--teal-accent)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
          <Scale size={24} color="#06b6d4" />
          <h2 style={{ fontSize: '22px' }}>
            {isHi ? "सहकारी शिकायत निवारण एवं लोकपाल डेस्क" : "Cooperative Grievance Redressal & Ombudsman Desk"}
          </h2>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          {isHi ? "पारंपरिक निजी कंपनियों में, एल्गोरिदम बिना मानवीय सुनवाई के श्रमिकों को प्रतिबंधित कर देते हैं। श्रमसेतु में, सभी शिकायतों का समाधान लोकतांत्रिक सहकारी सिद्धांतों के तहत सहकारी समिति द्वारा किया जाता है, जिससे श्रमिक की आजीविका की रक्षा होती है और नागरिक को गुणवत्ता की गारंटी मिलती है।" : "In traditional private gig platforms, algorithms arbitrarily ban workers without human hearing. In ShramSetu, all customer complaints are mediated by the Cooperative Society Committee under democratic cooperative principles, protecting worker livelihood while guaranteeing consumer quality."}
        </p>
      </div>

      {/* Grievance Quick Log */}
      <form onSubmit={handleAddMediation} className="glass-panel" style={{ padding: '20px', marginBottom: '26px' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '10px' }}>
          {isHi ? "सहकारी मध्यस्थता हेतु शिकायत दर्ज करें" : "Log a Cooperative Mediation Case"}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            className="form-input"
            placeholder={isHi ? "शिकायत का विवरण लिखें (उदा. ट्रैफिक के कारण देरी, अतिरिक्त पुर्जे)..." : "Describe customer or artisan grievance (e.g. delay due to traffic, parts availability)..."}
            value={newDisputeInput}
            onChange={(e) => setNewDisputeInput(e.target.value)}
          />
          <button type="submit" className="btn-primary" style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>
            {isHi ? "मध्यस्थता हेतु भेजें" : "Submit for Mediation"}
          </button>
        </div>
      </form>

      {/* Grievances List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {grievances.map(g => (
          <div
            key={g.id}
            className="glass-panel"
            style={{ padding: '20px', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-saffron">{g.id}</span>
                <span style={{ fontWeight: 700, fontSize: '14px', color: '#ffffff' }}>{g.trade}: {g.workerName}</span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{isHi ? "बनाम" : "vs"} {g.customerName}</span>
              </div>
              <span className="badge badge-emerald">
                <CheckCircle2 size={12} /> {g.status}
              </span>
            </div>

            <div style={{ fontSize: '13px', color: '#e2e8f0', marginBottom: '8px' }}>
              <b>{isHi ? "उपभोक्ता फीडबैक:" : "Customer Feedback:"}</b> {g.issue}
            </div>

            <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', padding: '10px 14px', borderRadius: '10px', fontSize: '12px', color: '#34d399' }}>
              <b>{isHi ? "लोकपाल समिति समाधान:" : "Ombudsman Resolution:"}</b> {g.resolutionProposed}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
