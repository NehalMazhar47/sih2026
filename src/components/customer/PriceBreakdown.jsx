import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { ShieldCheck, TrendingDown, HeartHandshake, CheckCircle2, XCircle, Info } from 'lucide-react';

export const PriceBreakdown = ({ amount = 450, serviceName = "Electrical Inspection & Repair" }) => {
  const { t } = usePlatform();
  const [showComparison, setShowComparison] = useState(true);

  // Cooperative Fair Share Model
  const workerWage = Math.round(amount * 0.88);
  const welfareCorpus = Math.round(amount * 0.07);
  const ncctPlatformShare = amount - workerWage - welfareCorpus;

  // Private Aggregator Model (e.g. 30% commission, 0% welfare)
  const privateCommission = Math.round(amount * 0.30);
  const privateWorkerGets = amount - privateCommission;

  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={22} color="#10b981" />
            <h3 style={{ fontSize: '18px' }}>{t('fairWageGuarantee')}</h3>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
            {t('fairWageSub')}
          </p>
        </div>

        <button
          onClick={() => setShowComparison(!showComparison)}
          className="btn-secondary"
          style={{ fontSize: '12px', padding: '6px 14px' }}
        >
          {showComparison ? t('hideComparison') : t('showComparison')}
        </button>
      </div>

      {/* Visual Fair-Wage Bar */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
          <span style={{ fontWeight: 600, color: '#34d399' }}>{t('barWorker')}</span>
          <span style={{ color: '#f48c06', fontWeight: 600 }}>{t('barWelfare')}</span>
          <span style={{ color: '#60a5fa', fontWeight: 600 }}>{t('barNcct')}</span>
        </div>
        <div
          style={{
            display: 'flex',
            height: '14px',
            borderRadius: '999px',
            overflow: 'hidden',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4)'
          }}
        >
          <div style={{ width: '88%', background: 'linear-gradient(90deg, #059669, #10b981)' }} title="Worker Wage: 88%" />
          <div style={{ width: '7%', background: 'linear-gradient(90deg, #d97706, #f59e0b)' }} title="Welfare Pool: 7%" />
          <div style={{ width: '5%', background: 'linear-gradient(90deg, #2563eb, #3b82f6)' }} title="NCCT / Cloud: 5%" />
        </div>
      </div>

      {/* Breakdown Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '24px' }}>
        <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', padding: '14px', borderRadius: '12px' }}>
          <div style={{ fontSize: '11px', color: '#34d399', fontWeight: 700, textTransform: 'uppercase' }}>{t('cardWorkerTitle')}</div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', margin: '4px 0' }}>₹{workerWage}</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t('cardWorkerSub')}</div>
        </div>

        <div style={{ background: 'rgba(244,140,6,0.1)', border: '1px solid rgba(244,140,6,0.3)', padding: '14px', borderRadius: '12px' }}>
          <div style={{ fontSize: '11px', color: 'var(--saffron-light)', fontWeight: 700, textTransform: 'uppercase' }}>{t('cardWelfareTitle')}</div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', margin: '4px 0' }}>₹{welfareCorpus}</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t('cardWelfareSub')}</div>
        </div>

        <div style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', padding: '14px', borderRadius: '12px' }}>
          <div style={{ fontSize: '11px', color: '#93c5fd', fontWeight: 700, textTransform: 'uppercase' }}>{t('cardNcctTitle')}</div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', margin: '4px 0' }}>₹{ncctPlatformShare}</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t('cardNcctSub')}</div>
        </div>
      </div>

      {/* Comparison Grid (ShramSetu vs Private Giants) */}
      {showComparison && (
        <div className="comparison-grid">
          <div className="coop-card-highlight">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span style={{ fontSize: '18px' }}>🤝</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: '15px', color: '#34d399' }}>{t('coopTitle')}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t('coopSub')}</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#10b981" />
                <span>{t('coopPoint1')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#10b981" />
                <span>{t('coopPoint2')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#10b981" />
                <span>{t('coopPoint3')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#10b981" />
                <span>{t('coopPoint4')}</span>
              </div>
            </div>
          </div>

          <div className="private-card-dim">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span style={{ fontSize: '18px' }}>🏢</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '15px', color: '#fca5a5' }}>{t('privateTitle')}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t('privateSub')}</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <XCircle size={16} color="#ef4444" />
                <span>{t('privatePoint1')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <XCircle size={16} color="#ef4444" />
                <span>{t('privatePoint2')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <XCircle size={16} color="#ef4444" />
                <span>{t('privatePoint3')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <XCircle size={16} color="#ef4444" />
                <span>{t('privatePoint4')}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
