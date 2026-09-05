import React, { useState } from 'react';
import { CustomerRegisterModal } from './CustomerRegisterModal';
import { WorkerRegisterModal } from './WorkerRegisterModal';
import { X } from 'lucide-react';

export const AuthModal = ({ isOpen, onClose, initialRole = 'customer' }) => {
  const [activeTab, setActiveTab] = useState(initialRole);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content" style={{ maxWidth: '580px', position: 'relative' }}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
        >
          <X size={20} />
        </button>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', borderBottom: '2px solid var(--border)', marginBottom: 20 }}>
          <button
            onClick={() => setActiveTab('customer')}
            style={{
              flex: 1, padding: '12px', border: 'none', background: 'none',
              fontWeight: 800, fontSize: 14, cursor: 'pointer',
              color: activeTab === 'customer' ? 'var(--primary-navy)' : 'var(--text-muted)',
              borderBottom: activeTab === 'customer' ? '3px solid var(--primary-navy)' : '3px solid transparent'
            }}
          >
            🏡 Customer Sign In / Register
          </button>
          <button
            onClick={() => setActiveTab('worker')}
            style={{
              flex: 1, padding: '12px', border: 'none', background: 'none',
              fontWeight: 800, fontSize: 14, cursor: 'pointer',
              color: activeTab === 'worker' ? 'var(--coop-green)' : 'var(--text-muted)',
              borderBottom: activeTab === 'worker' ? '3px solid var(--coop-green)' : '3px solid transparent'
            }}
          >
            👷‍♂️ Worker (Shramik) Induction
          </button>
        </div>

        {activeTab === 'customer' ? (
          <CustomerRegisterModal
            onSuccess={onClose}
            onSwitchToWorker={() => setActiveTab('worker')}
          />
        ) : (
          <WorkerRegisterModal
            onSuccess={onClose}
            onSwitchToCustomer={() => setActiveTab('customer')}
          />
        )}
      </div>
    </div>
  );
};
