import React from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { ShieldCheck } from 'lucide-react';

export const PriceBreakdown = () => {
  const { language } = usePlatform();
  const isHi = language === 'hi';

  const ROWS = [
    { label_en: 'Platform (e.g. Urban Company)', label_hi: 'निजी प्लेटफॉर्म (जैसे अर्बन कंपनी)', worker: 65, welfare: 0, platform: 35, highlight: false },
    { label_en: 'SahakarSeva (Cooperative)', label_hi: 'सहकारसेवा (सहकारी मंच)', worker: 88, welfare: 7, platform: 5, highlight: true },
  ];

  return (
    <div className="card">
      <div className="flex-between flex-gap-md" style={{ marginBottom: 'var(--sp-md)', flexWrap: 'wrap' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-head)', fontSize: 17, fontWeight: 700, color: 'var(--navy)' }}>
            {isHi ? 'पारदर्शी भुगतान मॉडल की तुलना' : 'Transparent Payment Model Comparison'}
          </h3>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
            {isHi ? '₹500 की सेवा पर कामगार को कितना मिलता है?' : 'How much does the worker receive on a ₹500 service?'}
          </p>
        </div>
        <span className="badge badge-green"><ShieldCheck size={11} /> {isHi ? 'NCCT प्रमाणित मॉडल' : 'NCCT Approved Model'}</span>
      </div>

      {ROWS.map((r, i) => (
        <div key={i} style={{
          border: `2px solid ${r.highlight ? 'var(--green)' : 'var(--border)'}`,
          borderRadius: 'var(--r-lg)',
          padding: 'var(--sp-md)',
          marginBottom: i === 0 ? 12 : 0,
          background: r.highlight ? 'var(--green-pale)' : 'var(--bg)'
        }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: r.highlight ? 'var(--green)' : 'var(--text-muted)', marginBottom: 12 }}>
            {isHi ? r.label_hi : r.label_en}
          </div>

          {[
            { label_en: `Worker (${r.worker}%)`, label_hi: `कामगार (${r.worker}%)`, pct: r.worker, amount: Math.round(500 * r.worker / 100), color: 'var(--green)' },
            { label_en: `Welfare (${r.welfare}%)`, label_hi: `कल्याण (${r.welfare}%)`, pct: r.welfare, amount: Math.round(500 * r.welfare / 100), color: 'var(--amber)' },
            { label_en: `Platform (${r.platform}%)`, label_hi: `मंच (${r.platform}%)`, pct: r.platform, amount: Math.round(500 * r.platform / 100), color: r.highlight ? 'var(--navy)' : 'var(--sos)' },
          ].map((bar, j) => (
            <div key={j} className="split-bar-row" style={{ marginBottom: j < 2 ? 10 : 0 }}>
              <div className="split-bar-label" style={{ fontSize: 13, color: 'var(--text)' }}>{isHi ? bar.label_hi : bar.label_en}</div>
              <div className="split-bar-track">
                <div className="split-bar-fill" style={{ width: `${bar.pct}%`, background: bar.color }} />
              </div>
              <div className="split-bar-pct" style={{ color: bar.color, fontSize: 14, fontWeight: 800, minWidth: 55, textAlign: 'right' }}>
                ₹{bar.amount}
              </div>
            </div>
          ))}
        </div>
      ))}

      <div style={{ marginTop: 'var(--sp-md)', fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
        <strong style={{ color: 'var(--green)' }}>SahakarSeva</strong> {isHi
          ? 'में ₹500 की सेवा पर कामगार को ₹440 मिलता है — जबकि निजी प्लेटफॉर्म पर केवल ₹325 मिलता।'
          : 'gives ₹440 to the worker on a ₹500 service — while private platforms give only ₹325.'}
      </div>
    </div>
  );
};
