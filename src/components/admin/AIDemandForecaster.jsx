import React from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { AI_SEASONAL_FORECAST } from '../../data/initialData';
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  Users,
  Sun,
  CloudRain,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { GISDensityHeatmap } from './GISDensityHeatmap';

export const AIDemandForecaster = () => {
  const {
    activeAiScenario,
    setActiveAiScenario,
    reallocatedWorkersTotal,
    triggerAiReallocation,
    language,
    t
  } = usePlatform();

  const isHi = language === 'hi';

  const scenarios = AI_SEASONAL_FORECAST.simulationScenarios;
  const currentScenarioObj = scenarios.find(s => s.id === activeAiScenario) || scenarios[0];
  const clusters = AI_SEASONAL_FORECAST.clusters;

  const getScenarioName = (scId, fallback) => {
    if (!isHi) return fallback;
    if (scId === 'diwali') return "दीपावली पूर्व मांग (पेंटिंग व सफाई)";
    if (scId === 'monsoon') return "मानसून आपातकाल (प्लंबिंग व छत मरम्मत)";
    if (scId === 'heatwave') return "ग्रीष्म लहर (AC व कूलर मांग)";
    return fallback;
  };

  const getScenarioDesc = (scId) => {
    if (isHi) {
      if (scId === 'diwali') return "पेंटिंग, डीप क्लीनिंग एवं बढ़ईगीरी में 2.8 गुना मांग वृद्धि";
      if (scId === 'monsoon') return "जलभराव से प्लंबिंग, सीपेज एवं शॉर्ट सर्किट में अत्यधिक वृद्धि";
      return "भीषण गर्मी से AC मरम्मत एवं इन्वर्टर इलेक्ट्रीशियन ओवरलोड";
    }
    return scId === 'diwali' ? 'Surge in painting, deep cleaning & carpentry' : (scId === 'monsoon' ? 'Critical surge in plumbing, roofs & electrical' : 'Severe AC, cooling & electrician overload');
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* AI Forecaster Header */}
      <div
        className="glass-panel"
        style={{
          padding: '28px',
          marginBottom: '26px',
          background: 'linear-gradient(135deg, rgba(37,99,235,0.18) 0%, rgba(10,24,48,0.9) 100%)',
          border: '1.5px solid #3b82f6'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-blue">
                <Brain size={14} /> {isHi ? "AI पूर्वानुमानात्मक इंजन v4.2" : "AI Predictive Engine v4.2"}
              </span>
              <span className="badge badge-emerald">
                {isHi ? "सजीव मौसम एवं भू-जनसांख्यिकी डेटा" : "Real-time Weather & Geo-Demographics"}
              </span>
            </div>
            <h2 style={{ fontSize: '24px', marginTop: '6px' }}>
              {t('aiForecastingTitle')}
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', maxWidth: '680px' }}>
              {isHi ? "ऐतिहासिक मौसमी मांग पैटर्न, नगर निगम मानसून जलभराव जीआईएस मानचित्र तथा आगामी त्योहारों के समय का उपयोग करके व्यवसायों में कमी का पूर्वानुमान लगाता है और सहकारी कार्यबल को गतिशील करता है।" : "Utilizes historical seasonal demand patterns, municipal monsoon water-logging GIS maps, and upcoming cultural festival timelines to forecast trade shortages and dynamically mobilize cooperative workforces."}
            </p>
          </div>

          <div style={{ textAlign: 'right', background: 'rgba(0,0,0,0.3)', padding: '14px 20px', borderRadius: '16px', border: '1px solid rgba(59,130,246,0.3)' }}>
            <span style={{ fontSize: '11px', color: '#93c5fd', textTransform: 'uppercase', fontWeight: 700 }}>
              {isHi ? "AI द्वारा पुनर्संतुलित कारीगर" : "Artisans Rebalanced by AI"}
            </span>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', margin: '2px 0' }}>
              {reallocatedWorkersTotal} {isHi ? "कारीगर" : "Workers"}
            </div>
            <span style={{ fontSize: '11px', color: '#34d399' }}>
              {isHi ? "शून्य अप्रयुक्त खाली घंटे" : "Zero unutilized idle hours"}
            </span>
          </div>
        </div>
      </div>

      {/* Scenario Simulation Switcher */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '26px' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '14px' }}>
          {isHi ? "इंटरैक्टिव परिस्थिति सिम्युलेटर: प्रमुख मौसमी स्थिति चुनें" : "Interactive Scenario Simulator: Select Macro Condition"}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          {scenarios.map(sc => {
            const isSelected = sc.id === activeAiScenario;
            return (
              <button
                key={sc.id}
                onClick={() => setActiveAiScenario(sc.id)}
                style={{
                  background: isSelected ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.03)',
                  border: isSelected ? '2px solid #3b82f6' : '1px solid var(--primary-border)',
                  borderRadius: '14px',
                  padding: '16px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  color: 'white',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '22px' }}>
                    {sc.id === 'diwali' ? '🪔' : (sc.id === 'monsoon' ? '🌧️' : '☀️')}
                  </span>
                  {isSelected && <span className="badge badge-blue" style={{ fontSize: '9px' }}>{isHi ? "सक्रिय" : "ACTIVE"}</span>}
                </div>
                <div style={{ fontWeight: 700, fontSize: '14px' }}>{getScenarioName(sc.id, sc.name)}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.4 }}>
                  {getScenarioDesc(sc.id)}
                </div>
              </button>
            );
          })}
        </div>

        {/* AI Insight for Selected Scenario */}
        <div style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.25)', borderRadius: '12px', padding: '16px', marginTop: '18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Brain size={24} color="#60a5fa" />
          <div style={{ fontSize: '13px', color: '#e2e8f0', lineHeight: 1.5 }}>
            <b>{isHi ? "AI समग्र विश्लेषण:" : "AI Macro Analysis:"}</b> {currentScenarioObj.aiSummary}
          </div>
        </div>
      </div>

      {/* GIS Density & Workforce Balance Heatmap */}
      <GISDensityHeatmap />

      {/* Trade Demand Multipliers Visualizer */}
      <div className="glass-panel" style={{ padding: '26px', marginBottom: '26px' }}>
        <h3 style={{ fontSize: '18px', marginBottom: '18px' }}>
          {isHi ? "अनुमानित मांग गुणक:" : "Predicted Trade Multipliers for"} <span style={{ color: '#38bdf8' }}>{getScenarioName(currentScenarioObj.id, currentScenarioObj.name)}</span>
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '14px' }}>
          {Object.entries(currentScenarioObj.multipliers).map(([trade, multiplier]) => {
            const isHigh = multiplier >= 1.5;
            const percent = Math.round((multiplier - 1) * 100);
            return (
              <div
                key={trade}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: isHigh ? '1px solid rgba(244,140,6,0.4)' : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '12px',
                  padding: '14px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, textTransform: 'capitalize', color: '#ffffff' }}>
                    {isHi ? (trade === 'electrician' ? 'इलेक्ट्रीशियन' : (trade === 'plumber' ? 'प्लंबर' : (trade === 'painter' ? 'पेंटर' : (trade === 'carpenter' ? 'बढ़ई' : (trade === 'technician' ? 'तकनीशियन' : trade))))) : trade.replace('_', ' ')}
                  </span>
                  <span className={isHigh ? "badge badge-saffron" : "badge badge-blue"} style={{ fontSize: '10px' }}>
                    {multiplier}x
                  </span>
                </div>

                <div style={{ fontSize: '18px', fontWeight: 800, color: percent >= 0 ? '#34d399' : '#f87171', margin: '8px 0 4px' }}>
                  {percent >= 0 ? `+${percent}%` : `${percent}%`}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {percent >= 0 ? (isHi ? "तीव्र वृद्धि अपेक्षित" : "Spike Expected") : (isHi ? "सामान्य / आधारभूत" : "Normal / Baseline")}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ward Clusters Deficit & Auto-Rebalance Action */}
      <div className="glass-panel" style={{ padding: '26px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '20px' }}>{isHi ? "वार्ड स्तरीय कार्यबल कमी विश्लेषण" : "Ward Level Allocation Deficits"}</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {isHi ? "उन वार्डों की पहचान जहां नागरिक मांग स्थानीय प्राथमिक सहकारी क्षमता से अधिक है।" : "Identifies wards where household demand exceeds localized primary cooperative capacity."}
            </p>
          </div>

          <button
            id="ai-auto-rebalance-btn"
            onClick={() => triggerAiReallocation(25)}
            className="btn-primary"
            style={{ fontSize: '13px', padding: '10px 20px' }}
          >
            <Cpu size={16} /> {isHi ? "AI स्वचालित पुनर्संतुलन क्रियान्वित करें (25 कारीगर)" : "Execute AI Auto-Rebalance (25 Artisans)"}
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {clusters.map((cluster, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '14px',
                padding: '20px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>{cluster.wardName}</h4>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                    {cluster.tradeSurges.map((surge, sIdx) => (
                      <span key={sIdx} className="badge badge-saffron" style={{ fontSize: '11px' }}>
                        {surge.trade}: {surge.projectedIncrease} ({surge.driver})
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', color: '#f87171', fontWeight: 700 }}>
                    {isHi ? "अनुमानित कमी" : "Projected Deficit"}
                  </div>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff' }}>
                    -{cluster.currentWorkerDeficit} {isHi ? "कारीगर" : "Artisans"}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ fontSize: '12px', color: '#93c5fd', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={14} color="#60a5fa" />
                  <b>{isHi ? "AI संस्तुति:" : "AI Action:"}</b> {cluster.suggestedAction}
                </div>

                <button
                  onClick={() => triggerAiReallocation(cluster.tradeSurges[0].recommendedTransfers)}
                  className="btn-secondary"
                  style={{ fontSize: '12px', padding: '6px 14px' }}
                >
                  {isHi ? `${cluster.tradeSurges[0].recommendedTransfers} कारीगर तैनात करें →` : `Mobilize ${cluster.tradeSurges[0].recommendedTransfers} Artisans →`}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
