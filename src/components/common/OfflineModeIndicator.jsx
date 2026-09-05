import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { WifiOff, Wifi } from 'lucide-react';

export const OfflineModeIndicator = () => {
  const { language } = usePlatform();
  const isHi = language === 'hi';
  const [isOffline, setIsOffline] = useState(false);

  if (!isOffline) return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 999 }}>
      <button
        className="btn btn-ghost btn-sm"
        style={{ background: 'white', boxShadow: 'var(--shadow-md)', borderRadius: 'var(--r-full)' }}
        onClick={() => setIsOffline(true)}
        title={isHi ? 'ऑफलाइन मोड का अनुकरण करें' : 'Simulate offline mode'}
      >
        <Wifi size={14} color="var(--green)" />
        {isHi ? 'ऑनलाइन' : 'Online'}
      </button>
    </div>
  );

  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999, background: 'var(--navy)', color: 'white', padding: '10px var(--sp-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600 }}>
        <WifiOff size={16} color="#FCA5A5" />
        {isHi ? 'ऑफलाइन मोड — SMS बुकिंग उपलब्ध' : 'Offline Mode — SMS Booking Available'}
      </div>
      <button className="btn btn-ghost btn-sm" style={{ color: 'white', border: '1px solid rgba(255,255,255,0.2)' }} onClick={() => setIsOffline(false)}>
        {isHi ? 'पुनः कनेक्ट करें' : 'Reconnect'}
      </button>
    </div>
  );
};
