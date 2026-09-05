import React, { useState } from 'react';
import { MapPin, Users, TrendingUp, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const GISDensityHeatmap = () => {
  const [selectedWard, setSelectedWard] = useState(null);

  const wardZones = [
    {
      id: "ward-01",
      name: "Connaught Place & Barakhamba Sector",
      type: "High Density Metro",
      activeDemand: 184,
      availableArtisans: 142,
      ratio: "1 : 1.3 (Deficit)",
      status: "deficit",
      color: "#ef4444",
      topTrade: "Electrician & Deep Cleaner",
      recommendedAction: "Mobilize 30 technicians from Outer Sonipat Rural Society."
    },
    {
      id: "ward-02",
      name: "Najafgarh & Dwarka Sub-City Cluster",
      type: "Semi-Urban & Agro Belt",
      activeDemand: 68,
      availableArtisans: 110,
      ratio: "1.6 : 1 (Surplus)",
      status: "surplus",
      color: "#10b981",
      topTrade: "Plumber & Agro Pump Specialist",
      recommendedAction: "Artisan pool ready for inter-ward deployment with 15% cooperative incentive."
    },
    {
      id: "ward-03",
      name: "South Extension & Lajpat Nagar",
      type: "Commercial & Residential",
      activeDemand: 210,
      availableArtisans: 165,
      ratio: "1 : 1.27 (Deficit)",
      status: "deficit",
      color: "#f59e0b",
      topTrade: "Painter & Carpenter",
      recommendedAction: "Pre-festival painting batch on standby."
    },
    {
      id: "ward-04",
      name: "Varanasi Ramnagar Industrial & Karigar Hub",
      type: "Artisanal Cluster",
      activeDemand: 95,
      availableArtisans: 130,
      ratio: "1.37 : 1 (Surplus)",
      status: "surplus",
      color: "#10b981",
      topTrade: "Master Woodcraft & Masonry",
      recommendedAction: "High capacity for institutional GeM school furniture restoration."
    }
  ];

  return (
    <div className="glass-panel" style={{ padding: '24px', marginBottom: '26px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h3 style={{ fontSize: '18px' }}>Geo-Spatial Density & Workforce Balance Matrix</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Real-time ratio of active household bookings vs available verified cooperative artisans by municipal ward.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px', fontSize: '11px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#10b981' }}>
            ● Surplus Capacity
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#f59e0b' }}>
            ● Moderate Strain
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#ef4444' }}>
            ● Severe Shortage Deficit
          </span>
        </div>
      </div>

      {/* Ward Grid Matrix */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '18px' }}>
        {wardZones.map(w => {
          const isSelected = selectedWard?.id === w.id;
          return (
            <div
              key={w.id}
              onClick={() => setSelectedWard(w)}
              style={{
                background: isSelected ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.03)',
                border: `1.5px solid ${isSelected ? '#38bdf8' : w.color}`,
                borderRadius: '12px',
                padding: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{w.type}</span>
                <span className={w.status === 'surplus' ? "badge badge-emerald" : "badge badge-danger"} style={{ fontSize: '9px' }}>
                  {w.ratio}
                </span>
              </div>

              <div style={{ fontWeight: 700, fontSize: '14px', color: '#ffffff', margin: '6px 0 2px' }}>
                {w.name}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Demand: <b>{w.activeDemand}</b> | Artisans: <b>{w.availableArtisans}</b>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Ward Deep Dive Drawer */}
      {selectedWard && (
        <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--primary-border)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>
              Ward Deep Dive: {selectedWard.name}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Primary Trade Pressure: <b style={{ color: 'var(--saffron-light)' }}>{selectedWard.topTrade}</b>
            </div>
            <div style={{ fontSize: '12px', color: '#38bdf8', marginTop: '4px' }}>
              <b>Cooperative Balancing Directive:</b> {selectedWard.recommendedAction}
            </div>
          </div>

          <button
            onClick={() => alert(`Reallocation order issued to Society for ${selectedWard.name}!`)}
            className="btn-primary"
            style={{ fontSize: '12px', padding: '8px 16px' }}
          >
            Dispatch Reallocation Order →
          </button>
        </div>
      )}
    </div>
  );
};
