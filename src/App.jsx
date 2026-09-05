import React, { useState, useEffect } from 'react';
import { PlatformProvider, usePlatform } from './context/PlatformContext';
import { Navbar } from './components/common/Navbar';
import { Toast } from './components/common/Toast';
import { CustomerHome } from './components/customer/CustomerHome';
import { WorkerDashboard } from './components/worker/WorkerDashboard';
import { FederationDashboard } from './components/admin/FederationDashboard';
import { OfflineModeIndicator } from './components/common/OfflineModeIndicator';
import { HackathonPitchModal } from './components/common/HackathonPitchModal';
import { VoiceBookingAssistant } from './components/common/VoiceBookingAssistant';

const AppContent = () => {
  const { role, t, language } = usePlatform();
  const [isPitchOpen, setIsPitchOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);

  useEffect(() => {
    const handleOpenPitch = () => setIsPitchOpen(true);
    const handleOpenVoice = () => setIsVoiceOpen(true);
    window.addEventListener('open-sih-pitch', handleOpenPitch);
    window.addEventListener('open-voice-assistant', handleOpenVoice);
    return () => {
      window.removeEventListener('open-sih-pitch', handleOpenPitch);
      window.removeEventListener('open-voice-assistant', handleOpenVoice);
    };
  }, []);

  return (
    <div className="page-wrapper">
      <Navbar onOpenPitch={() => setIsPitchOpen(true)} />

      <main className="main-content">
        {role === 'customer' && <CustomerHome />}
        {role === 'worker'   && <WorkerDashboard />}
        {role === 'admin'    && <FederationDashboard />}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="brand-name">🤝 SahakarSeva</div>
              <p>
                {language === 'hi'
                  ? 'सहकारिता मंत्रालय एवं एनसीसीटी द्वारा समर्थित। सत्यापित सहकारी कामगारों के लिए भारत का विश्वसनीय सेवा मंच।'
                  : 'Supported by the Ministry of Cooperation & NCCT. India\'s trusted cooperative service platform for verified skilled workers.'}
              </p>
            </div>
            <div className="footer-col">
              <h4>{language === 'hi' ? 'त्वरित लिंक' : 'Quick Links'}</h4>
              <ul>
                <li>{language === 'hi' ? 'सेवाएं' : 'Services'}</li>
                <li>{language === 'hi' ? 'बुकिंग इतिहास' : 'Booking History'}</li>
                <li>{language === 'hi' ? 'सहकारी समितियां' : 'Cooperative Societies'}</li>
                <li>{language === 'hi' ? 'शिकायत निवारण' : 'Grievance Portal'}</li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>{language === 'hi' ? 'संपर्क करें' : 'Contact'}</h4>
              <ul>
                <li>📞 1800-111-SEVA</li>
                <li>✉ help@sahakarseva.gov.in</li>
                <li>{language === 'hi' ? '🏛 सहकारिता मंत्रालय' : '🏛 Ministry of Cooperation'}</li>
                <li>SIH 2026 • Problem #26089</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 SahakarSeva • {language === 'hi' ? 'भारत सरकार' : 'Government of India'} Initiative</span>
            <span>{language === 'hi' ? 'सहकार से समृद्धि' : '"Sahakar se Samriddhi"'}</span>
          </div>
        </div>
      </footer>

      <OfflineModeIndicator />

      <HackathonPitchModal
        isOpen={isPitchOpen}
        onClose={() => setIsPitchOpen(false)}
      />

      <VoiceBookingAssistant
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
      />

      <Toast />
    </div>
  );
};

export function App() {
  return (
    <PlatformProvider>
      <AppContent />
    </PlatformProvider>
  );
}

export default App;
