import React from 'react';
import { usePlatform } from '../../context/PlatformContext';
import {
  ShieldCheck,
  FileCheck,
  Award,
  CheckCircle2,
  XCircle,
  AlertCircle,
  UserCheck,
  Building,
  GraduationCap
} from 'lucide-react';

export const WorkerVerificationDesk = () => {
  const { pendingWorkers, approveWorkerVerification, showToast, language, t } = usePlatform();
  const isHi = language === 'hi';

  const handleFlagRetest = (workerName) => {
    showToast(isHi ? "आवेदन चिह्नित किया गया" : "Application Flagged", isHi ? `${workerName} को NCCT संस्थान में 2-दिवसीय प्रैक्टिकल पुनश्चर्या लैब हेतु निर्धारित किया गया।` : `${workerName} scheduled for 2-day practical refresher lab at NCCT Institute.`, "warning");
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-saffron">{isHi ? "अनुपालन एवं ऑनबोर्डिंग डेस्क" : "Compliance & Onboarding Desk"}</span>
            <span className="badge badge-blue">
              {pendingWorkers.length} {isHi ? "आवेदन समीक्षाधीन" : "Applications In Review"}
            </span>
          </div>
          <h2 style={{ fontSize: '24px', marginTop: '4px' }}>
            {isHi ? "श्रमिक कौशल प्रोफाइलिंग एवं सहकारी प्रमाणन डेस्क" : "Worker Skill Profiling & Cooperative Certification Desk"}
          </h2>
        </div>
      </div>

      {pendingWorkers.length === 0 ? (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
          <CheckCircle2 size={48} color="#10b981" style={{ margin: '0 auto 14px' }} />
          <h3 style={{ fontSize: '18px' }}>{isHi ? "सभी सत्यापन आवेदन स्वीकृत" : "All Verification Applications Cleared"}</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
            {isHi ? "सभी अभ्यर्थी कारीगरों का परीक्षण, प्रमाणन एवं NCCT डिजिटल बैज जारी कर दिया गया है।" : "All candidate artisans have been tested, certified, and issued NCCT Digital Badges."}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {pendingWorkers.map(cand => (
            <div
              key={cand.id}
              className="glass-panel"
              style={{
                padding: '24px',
                border: '1px solid rgba(244,140,6,0.3)',
                display: 'flex',
                gap: '20px',
                flexWrap: 'wrap',
                alignItems: 'center'
              }}
            >
              <img
                src={cand.avatarUrl}
                alt={cand.name}
                style={{ width: '80px', height: '80px', borderRadius: '18px', objectFit: 'cover', border: '2px solid var(--saffron)' }}
              />

              <div style={{ flex: 1, minWidth: '240px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ fontSize: '18px', color: '#ffffff' }}>{cand.name}</h3>
                  <span className="badge badge-saffron" style={{ textTransform: 'capitalize' }}>
                    {isHi ? (cand.trade === 'electrician' ? 'इलेक्ट्रीशियन' : (cand.trade === 'plumber' ? 'प्लंबर' : (cand.trade === 'painter' ? 'पेंटर' : cand.trade))) : cand.trade}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {isHi ? "संबद्ध समिति:" : "Affiliated Society:"} <b>{cand.societyName}</b> • {isHi ? "आवेदन दिनांक:" : "Applied:"} {cand.appliedDate}
                </div>

                {/* Criteria Checks Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginTop: '14px', fontSize: '12px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '8px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '10px' }}>{isHi ? "NCCT पाठ्यक्रम पूर्ण:" : "NCCT Course Completed:"}</span>
                    <div style={{ fontWeight: 600, color: '#38bdf8' }}>{cand.ncctCourseTaken}</div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '8px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '10px' }}>{isHi ? "ट्रेड प्रैक्टिकल अंक:" : "Trade Practical Score:"}</span>
                    <div style={{ fontWeight: 800, color: '#34d399' }}>{cand.tradeTestScore}% ({isHi ? "विशिष्ट" : "Distinction"})</div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '8px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '10px' }}>{isHi ? "पुलिस क्लीयरेंस:" : "Police Clearance:"}</span>
                    <div style={{ fontWeight: 600, color: '#34d399' }}>{cand.policeClearanceCert}</div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '8px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '10px' }}>{isHi ? "आधार e-KYC:" : "Aadhaar e-KYC:"}</span>
                    <div style={{ fontWeight: 600, color: '#ffffff' }}>{cand.aadhaarNumber} ({isHi ? "सत्यापित" : "Linked"})</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '180px' }}>
                <button
                  id={`approve-worker-${cand.id}-btn`}
                  onClick={() => approveWorkerVerification(cand.id)}
                  className="btn-emerald"
                  style={{ fontSize: '13px', padding: '10px 16px' }}
                >
                  <CheckCircle2 size={16} /> {isHi ? "स्वीकृत करें व NCCT बैज जारी करें" : "Approve & Issue NCCT Badge"}
                </button>

                <button
                  onClick={() => handleFlagRetest(cand.name)}
                  className="btn-secondary"
                  style={{ fontSize: '12px', padding: '8px 14px' }}
                >
                  <AlertCircle size={14} /> {isHi ? "पुनश्चर्या प्रशिक्षण लैब भेजें" : "Schedule Refresher Lab"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
