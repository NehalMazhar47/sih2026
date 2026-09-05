import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import {
  Users, HardHat, Building2, Globe, Mic, Phone,
  ShieldCheck, Sparkles, ChevronDown
} from 'lucide-react';

export const Navbar = ({ onOpenPitch }) => {
  const {
    role, setRole,
    language, setLanguage,
    currentUser,
    setWorkerTab,
    setIsCustomerProfileOpen,
    t, speakText, activeBooking
  } = usePlatform();

  const isHi = language === 'hi';
  const [showLangMenu, setShowLangMenu] = useState(false);

  const LANG_GROUPS = [
    {
      label: isHi ? 'राष्ट्रीय / आधिकारिक' : 'National / Official',
      langs: [
        { code: 'en', label: 'English' },
        { code: 'hi', label: 'हिन्दी' },
      ]
    },
    {
      label: isHi ? 'पश्चिम भारत' : 'West India',
      langs: [
        { code: 'mr', label: 'मराठी' },
        { code: 'gu', label: 'ગુજરાતી' },
      ]
    },
    {
      label: isHi ? 'दक्षिण भारत' : 'South India',
      langs: [
        { code: 'ta', label: 'தமிழ்' },
        { code: 'te', label: 'తెలుగు' },
        { code: 'kn', label: 'ಕನ್ನಡ' },
        { code: 'ml', label: 'മലയാളം' },
      ]
    },
    {
      label: isHi ? 'पूर्व और उत्तर भारत' : 'East & North India',
      langs: [
        { code: 'bn', label: 'বাংলা' },
        { code: 'od', label: 'ଓଡ଼ିଆ' },
        { code: 'pa', label: 'ਪੰਜਾਬੀ' },
      ]
    }
  ];

  const currentLang = LANG_GROUPS.flatMap(g => g.langs).find(l => l.code === language);

  const handleSOS = () => {
    const msg = isHi
      ? 'आपातकालीन SOS भेजा जा रहा है। निकटतम सत्यापित कामगार को सूचित किया जा रहा है।'
      : 'Emergency SOS dispatched. Nearest verified worker is being alerted.';
    speakText(msg);
    alert(isHi ? '🚨 SOS भेजा गया! आपका निकटतम कारीगर 15 मिनट में पहुंचेगा।' : '🚨 SOS Dispatched! Nearest verified worker will reach you within 15 minutes.');
  };

  return (
    <header className="no-print" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      {/* Government top bar */}
      <div className="gov-strip">
        <div className="gov-strip-left">
          <span>🇮🇳</span>
          <span>{t('govLabel')}</span>
          <span style={{ opacity: 0.5 }}>|</span>
          <span style={{ color: '#FFB74D', fontWeight: 700 }}>{t('tagline')}</span>
        </div>
        <div className="gov-strip-right">
          <button
            id="sih-pitch-modal-btn"
            onClick={onOpenPitch}
            style={{
              background: 'rgba(230,81,0,0.85)',
              border: 'none',
              color: 'white',
              borderRadius: '12px',
              padding: '3px 11px',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Sparkles size={11} /> {t('sihPitchBtn')}
          </button>
          <span>📞 1800-111-SEVA</span>
        </div>
      </div>

      {/* Tricolor stripe */}
      <div className="tricolor-stripe" />

      {/* Main navbar */}
      <nav className="navbar">
        <div className="navbar-inner">
          {/* Brand */}
          <div className="brand" onClick={() => setRole('customer')}>
            <div className="brand-icon">
              <ShieldCheck size={24} color="#FFB74D" />
            </div>
            <div className="brand-text">
              <div className="brand-name">ShramSetu</div>
              <div className="brand-tagline">{t('appSubtitle')}</div>
            </div>
          </div>

          {/* Role tabs */}
          <div className="role-tabs">
            <button
              id="role-customer-btn"
              className={`role-tab ${role === 'customer' ? 'active' : ''}`}
              onClick={() => setRole('customer')}
            >
              <Users size={15} />
              <span className="label-full">{t('roleCustomer')}</span>
              <span className="label-short">नागरिक</span>
              {activeBooking && (
                <span style={{
                  width: 7, height: 7, borderRadius: '50%',
                  background: '#22c55e',
                  flexShrink: 0,
                  display: 'inline-block'
                }} />
              )}
            </button>
            <button
              id="role-worker-btn"
              className={`role-tab ${role === 'worker' ? 'active' : ''}`}
              onClick={() => setRole('worker')}
            >
              <HardHat size={15} />
              <span className="label-full">{t('roleWorker')}</span>
              <span className="label-short">कामगार</span>
            </button>
            <button
              id="role-admin-btn"
              className={`role-tab ${role === 'admin' ? 'active' : ''}`}
              onClick={() => setRole('admin')}
            >
              <Building2 size={15} />
              <span className="label-full">{t('roleAdmin')}</span>
              <span className="label-short">फेडरेशन</span>
            </button>
          </div>

          {/* Controls */}
          <div className="nav-controls">
            {/* Quick 1-click Hindi Toggle */}
            <button
              id="quick-toggle-hindi-btn"
              className="btn btn-ghost btn-sm"
              onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
              style={{
                border: '1.5px solid var(--border)',
                borderRadius: 'var(--r-full)',
                fontWeight: 700,
                fontSize: 12,
                color: language === 'hi' ? 'var(--saffron)' : 'var(--navy)',
                background: language === 'hi' ? 'var(--saffron-pale)' : 'var(--bg)',
                padding: '5px 12px'
              }}
            >
              {language === 'hi' ? '🌐 English' : '🇮🇳 हिन्दी'}
            </button>

            {/* Regional Language dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                className="lang-select"
                onClick={() => setShowLangMenu(!showLangMenu)}
                id="language-selector-dropdown"
              >
                <Globe size={15} color="var(--text-muted)" />
                <span style={{ minWidth: 50, textAlign: 'left' }}>{currentLang?.label || 'English'}</span>
                <ChevronDown size={13} color="var(--text-muted)" />
              </button>
              {showLangMenu && (
                <>
                  <div
                    style={{ position: 'fixed', inset: 0, zIndex: 998 }}
                    onClick={() => setShowLangMenu(false)}
                  />
                  <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 6px)',
                    right: 0,
                    background: 'white',
                    border: '1.5px solid var(--border)',
                    borderRadius: 'var(--r-lg)',
                    boxShadow: 'var(--shadow-lg)',
                    minWidth: 180,
                    zIndex: 999,
                    overflow: 'hidden',
                    padding: '6px 0'
                  }}>
                    {LANG_GROUPS.map(g => (
                      <div key={g.label}>
                        <div style={{
                          fontSize: 10, fontWeight: 700, color: 'var(--text-muted)',
                          textTransform: 'uppercase', letterSpacing: '0.08em',
                          padding: '8px 14px 4px'
                        }}>{g.label}</div>
                        {g.langs.map(l => (
                          <button
                            key={l.code}
                            id={`lang-select-option-${l.code}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setLanguage(l.code);
                              setShowLangMenu(false);
                            }}
                            style={{
                              width: '100%',
                              background: l.code === language ? 'var(--saffron-pale)' : 'transparent',
                              border: 'none',
                              padding: '9px 14px',
                              textAlign: 'left',
                              fontSize: 14,
                              fontWeight: l.code === language ? 700 : 500,
                              color: l.code === language ? 'var(--saffron)' : 'var(--text)',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              transition: 'background 0.1s'
                            }}
                            onMouseEnter={e => { if (l.code !== language) e.currentTarget.style.background = 'var(--bg)'; }}
                            onMouseLeave={e => { if (l.code !== language) e.currentTarget.style.background = 'transparent'; }}
                          >
                            {l.label}
                            {l.code === language && <ShieldCheck size={12} />}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Voice Search button */}
            <button
              id="toggle-mobile-view-btn"
              className="btn btn-ghost btn-icon"
              title={isHi ? 'आवाज से खोजें' : 'Voice Search'}
              onClick={() => window.dispatchEvent(new CustomEvent('open-voice-assistant'))}
            >
              <Mic size={17} color="var(--navy)" />
            </button>

            {/* My Profile Button */}
            {currentUser && (
              <button
                id="my-profile-btn"
                className="btn btn-outline"
                style={{ padding: '6px 14px', fontSize: 13, borderColor: 'var(--coop-green)', color: 'var(--coop-green)', fontWeight: 700 }}
                onClick={() => {
                  if (role === 'worker') {
                    setWorkerTab('profile');
                  } else {
                    setIsCustomerProfileOpen(true);
                  }
                }}
              >
                <Users size={14} />
                {isHi ? 'मेरी प्रोफ़ाइल' : 'My Profile'}
              </button>
            )}

            {/* Register / Login Modal Trigger */}
            <button
              id="auth-register-btn"
              className="btn btn-outline"
              style={{ padding: '6px 14px', fontSize: 13, borderColor: 'var(--primary-navy)', color: 'var(--primary-navy)', fontWeight: 700 }}
              onClick={() => window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { role } }))}
            >
              {isHi ? 'पंजीकरण / लॉग इन' : 'Register / Login'}
            </button>

            {/* Emergency SOS button */}
            <button
              id="sos-btn"
              className="btn-sos"
              onClick={handleSOS}
              aria-label="Emergency SOS"
            >
              <Phone size={15} />
              {isHi ? 'SOS' : 'SOS'}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
