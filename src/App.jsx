import React, { useState, useEffect } from 'react';
import { PlatformProvider, usePlatform } from './context/PlatformContext';
import { Navbar } from './components/common/Navbar';
import { DeviceFrame } from './components/common/DeviceFrame';
import { Toast } from './components/common/Toast';
import { CustomerHome } from './components/customer/CustomerHome';
import { WorkerDashboard } from './components/worker/WorkerDashboard';
import { FederationDashboard } from './components/admin/FederationDashboard';
import { OfflineModeIndicator } from './components/common/OfflineModeIndicator';
import { HackathonPitchModal } from './components/common/HackathonPitchModal';
import { VoiceBookingAssistant } from './components/common/VoiceBookingAssistant';
import { AuthModal } from './components/auth/AuthModal';
import { CustomerProfileModal } from './components/customer/CustomerProfileModal';
import { ShieldCheck } from 'lucide-react';

const AppContent = () => {
  const { role, isMobileView, t, isCustomerProfileOpen, setIsCustomerProfileOpen } = usePlatform();
  const [isPitchOpen, setIsPitchOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authModalRole, setAuthModalRole] = useState('customer');

  useEffect(() => {
    const handleOpenPitch = () => setIsPitchOpen(true);
    const handleOpenVoice = () => setIsVoiceOpen(true);
    const handleOpenAuth = (e) => {
      if (e.detail?.role) setAuthModalRole(e.detail.role);
      setIsAuthOpen(true);
    };
    const handleOpenCustomerProfile = () => setIsCustomerProfileOpen(true);

    window.addEventListener('open-sih-pitch', handleOpenPitch);
    window.addEventListener('open-voice-assistant', handleOpenVoice);
    window.addEventListener('open-auth-modal', handleOpenAuth);
    window.addEventListener('open-customer-profile', handleOpenCustomerProfile);

    return () => {
      window.removeEventListener('open-sih-pitch', handleOpenPitch);
      window.removeEventListener('open-voice-assistant', handleOpenVoice);
      window.removeEventListener('open-auth-modal', handleOpenAuth);
      window.removeEventListener('open-customer-profile', handleOpenCustomerProfile);
    };
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar onOpenPitch={() => setIsPitchOpen(true)} />

      <main style={{ flex: 1 }}>
        <DeviceFrame isMobile={isMobileView}>
          {role === 'customer' && <CustomerHome />}
          {role === 'worker' && <WorkerDashboard />}
          {role === 'admin' && <FederationDashboard />}
        </DeviceFrame>
      </main>

      {/* Official Government Footer */}
      <footer
        className="no-print"
        style={{
          background: 'var(--navy-dark)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '24px 20px',
          fontSize: '13px',
          color: 'rgba(255,255,255,0.6)'
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div style={{ fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>🇮🇳</span> {t('footerTitle')}
            </div>
            <div style={{ fontSize: '11px', marginTop: '3px' }}>
              {t('footerProblem')}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px' }}>
            <span>{t('footerTheme')}</span>
            <span style={{ color: '#FFB74D' }}>{t('footerTagline')}</span>
          </div>
        </div>
      </footer>

      {/* Floating Low-Bandwidth / Rural Gram Panchayat Indicator */}
      <OfflineModeIndicator />

      {/* SIH Hackathon Pitch & System Architecture Modal */}
      <HackathonPitchModal
        isOpen={isPitchOpen}
        onClose={() => setIsPitchOpen(false)}
      />

      {/* Voice Booking Assistant */}
      <VoiceBookingAssistant
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onSelectService={(serviceId) => {
          setIsVoiceOpen(false);
          // Customer portal will handle via its own state
        }}
      />

      {/* Customer & Worker Registration Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialRole={authModalRole}
      />

      {/* Customer Profile View Modal */}
      <CustomerProfileModal
        isOpen={isCustomerProfileOpen}
        onClose={() => setIsCustomerProfileOpen(false)}
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
