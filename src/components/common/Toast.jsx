import React from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = () => {
  const { toastMessage } = usePlatform();

  if (!toastMessage) return null;

  const icons = {
    success: <CheckCircle2 size={20} color="#10b981" />,
    warning: <AlertCircle size={20} color="#f59e0b" />,
    error: <AlertCircle size={20} color="#ef4444" />,
    info: <Info size={20} color="#06b6d4" />
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        background: '#0d2242',
        border: '1px solid rgba(244, 140, 6, 0.4)',
        boxShadow: '0 12px 35px rgba(0,0,0,0.6)',
        borderRadius: '16px',
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        maxWidth: '420px',
        animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div>{icons[toastMessage.type] || icons.info}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: '14px', color: '#ffffff' }}>
          {toastMessage.title}
        </div>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
          {toastMessage.message}
        </div>
      </div>
    </div>
  );
};
