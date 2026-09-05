import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { TrendingUp, AlertTriangle, Zap } from 'lucide-react';

const SCENARIOS = [
  {
    id: 'diwali',
    icon: '🪔',
    label_en: 'Pre-Diwali Surge',
    label_hi: 'दीपावली पूर्व मांग',
    desc_en: 'Painting & cleaning demand spikes before festival season',
    desc_hi: 'त्योहार सीजन से पहले रंगाई व सफाई की मांग में उछाल',
    deficits: [
      { trade: 'Painter / पेंटर', deficit: 340, pct: 180 },
      { trade: 'Cleaner / सफाईकर्मी', deficit: 220, pct: 140 },
      { trade: 'Electrician / इलेक्ट्रीशियन', deficit: 85, pct: 60 },
    ]
  },
  {
    id: 'monsoon',
    icon: '🌧️',
    label_en: 'Monsoon Emergency',
    label_hi: 'मानसून आपातकाल',
    desc_en: 'Flooding & leakage drives urgent plumbing demand',
    desc_hi: 'जलभराव व रिसाव से तत्काल प्लंबिंग मांग बढ़ती है',
    deficits: [
      { trade: 'Plumber / प्लंबर', deficit: 520, pct: 210 },
      { trade: 'Carpenter / बढ़ई', deficit: 180, pct: 90 },
      { trade: 'Electrician / इलेक्ट्रीशियन', deficit: 290, pct: 130 },
    ]
  },
  {
    id: 'summer',
    icon: '☀️',
    label_en: 'Summer Heat Wave',
    label_hi: 'भीषण ग्रीष्म लहर',
    desc_en: 'AC & refrigeration demand peaks during heatwaves',
    desc_hi: 'गर्मी की लहर में AC और रेफ्रिजरेशन सेवाओं की मांग चरम पर',
    deficits: [
      { trade: 'HVAC/AC Tech / AC तकनीशियन', deficit: 680, pct: 250 },
      { trade: 'Electrician / इलेक्ट्रीशियन', deficit: 240, pct: 120 },
      { trade: 'Caregiver / देखभालकर्ता', deficit: 160, pct: 85 },
    ]
  },
];

export const AIDemandForecaster = () => {
  const { language } = usePlatform();
  const isHi = language === 'hi';
  const [activeScenario, setActiveScenario] = useState('diwali');
  const [rebalanced, setRebalanced] = useState(false);

  const scenario = SCENARIOS.find(s => s.id === activeScenario);

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title" style={{ fontSize: 18 }}>
            🤖 {isHi ? 'AI मौसमी मांग पूर्वानुमान' : 'AI Seasonal Demand Forecaster'}
          </h2>
          <p className="section-subtitle">
            {isHi
              ? 'मौसम, त्योहार और ऐतिहासिक डेटा से भविष्य की श्रम मांग का पूर्वानुमान'
              : 'Predict future labour demand using weather, festivals & historical data'}
          </p>
        </div>
        <span className="badge badge-navy">AI Engine v3.2</span>
      </div>

      {/* Scenario selector */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 'var(--sp-lg)', flexWrap: 'wrap' }}>
        {SCENARIOS.map(s => (
          <button
            key={s.id}
            onClick={() => { setActiveScenario(s.id); setRebalanced(false); }}
            className={`btn btn-sm ${activeScenario === s.id ? 'btn-navy' : 'btn-ghost'}`}
          >
            {s.icon} {isHi ? s.label_hi : s.label_en}
          </button>
        ))}
      </div>

      {scenario && (
        <div>
          {/* Scenario card */}
          <div className="card" style={{ marginBottom: 'var(--sp-lg)', borderLeft: '4px solid var(--saffron)' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 32 }}>{scenario.icon}</span>
              <div>
                <h3 style={{ fontFamily: 'var(--font-head)', fontSize: 18, fontWeight: 700, color: 'var(--navy)' }}>
                  {isHi ? scenario.label_hi : scenario.label_en}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                  {isHi ? scenario.desc_hi : scenario.desc_en}
                </p>
              </div>
            </div>
          </div>

          {/* Deficit bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-md)', marginBottom: 'var(--sp-lg)' }}>
            {scenario.deficits.map((d, i) => (
              <div key={i} className="card" style={{ padding: 'var(--sp-md)' }}>
                <div className="flex-between" style={{ marginBottom: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{d.trade}</div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span className="badge badge-red">
                      <AlertTriangle size={10} /> +{d.pct}% {isHi ? 'मांग' : 'demand'}
                    </span>
                    <span style={{ fontWeight: 800, color: 'var(--sos)', fontSize: 16 }}>-{d.deficit} {isHi ? 'कामगार' : 'workers'}</span>
                  </div>
                </div>
                <div style={{ background: 'var(--bg)', borderRadius: 'var(--r-full)', height: 12, overflow: 'hidden', position: 'relative' }}>
                  <div style={{ width: `${Math.min(d.pct / 3, 100)}%`, height: '100%', background: 'linear-gradient(to right, var(--saffron), var(--sos))', borderRadius: 'var(--r-full)', transition: 'width 0.6s ease' }} />
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>
                  {isHi
                    ? `सुझाव: ${Math.round(d.deficit * 0.7)} कामगारों को पड़ोसी जिलों से पुनः आवंटित करें`
                    : `Suggestion: Reallocate ${Math.round(d.deficit * 0.7)} workers from adjacent districts`}
                </div>
              </div>
            ))}
          </div>

          {/* AI Action */}
          {!rebalanced ? (
            <button className="btn btn-primary btn-full" onClick={() => setRebalanced(true)}>
              <Zap size={16} /> {isHi ? 'AI पुनर्संतुलन चलाएं' : 'Run AI Rebalancing'} →
            </button>
          ) : (
            <div className="alert alert-success">
              <span>✅</span>
              <span style={{ fontWeight: 600 }}>
                {isHi
                  ? `AI पुनर्संतुलन सफल: ${Math.round(scenario.deficits.reduce((a, d) => a + d.deficit, 0) * 0.7)} कामगारों को पुनः आवंटित किया गया।`
                  : `AI Rebalancing complete: ${Math.round(scenario.deficits.reduce((a, d) => a + d.deficit, 0) * 0.7)} workers reallocated successfully.`}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
