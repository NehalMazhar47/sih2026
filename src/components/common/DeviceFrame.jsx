import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

export const DeviceFrame = ({ children, isMobile }) => {
  if (!isMobile) {
    return <div style={{ minHeight: 'calc(100vh - 120px)', paddingBottom: '60px' }}>{children}</div>;
  }

  return (
    <div style={{ padding: '20px 0', display: 'flex', justifyContent: 'center' }}>
      <div className="device-preview-wrapper">
        {/* Device Top Status Bar */}
        <div className="device-notch">
          <div className="device-camera"></div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '4px 20px',
            fontSize: '11px',
            color: 'var(--text-muted)',
            borderBottom: '1px solid rgba(255,255,255,0.06)'
          }}
        >
          <span style={{ fontWeight: 600 }}>09:41 AM</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Signal size={12} />
            <Wifi size={12} />
            <Battery size={13} />
          </div>
        </div>

        {/* Scrollable Phone Screen Container */}
        <div style={{ height: '780px', overflowY: 'auto', padding: '16px' }}>
          {children}
        </div>
      </div>
    </div>
  );
};
