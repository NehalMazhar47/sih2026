import React, { useState } from 'react';
import { Sprout, Sun, Droplets, Zap, ShieldCheck, CheckCircle2, ChevronRight, Building } from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { getLocalizedAgroService } from '../../data/translations';

export const AgroRuralHub = ({ onSelectAgroService }) => {
  const { showToast, t, language } = usePlatform();

  const agroServices = [
    {
      id: "agro_solar_pump",
      title: "Solar Agri-Pump & Micro-Grid Inverter Servicing",
      hindi: "सौर कृषि पंप एवं इनवर्टर मरम्मत",
      baseRate: 480,
      icon: Sun,
      color: "#f59e0b",
      tag: "PM-KUSUM Aligned",
      tag_hi: "PM-कुसुम संबद्ध",
      description: "DC submersible motor repair, solar MPPT controller diagnosis, and panel tracking alignment."
    },
    {
      id: "agro_cold_storage",
      title: "Cold Storage & Dairy Chilling Plant Overhaul",
      hindi: "कोल्ड स्टोरेज व डेयरी चिलर मरम्मत",
      baseRate: 750,
      icon: Zap,
      color: "#06b6d4",
      tag: "FoodTech Chain",
      tag_hi: "खाद्य श्रृंखला",
      description: "Compressor ammonia/R404a gas recharge, condenser coil descaling, and milk tank thermostat repair."
    },
    {
      id: "agro_drip_irrigation",
      title: "Automated Drip Irrigation & Solenoid Valve Setup",
      hindi: "टपक सिंचाई व स्वचालित वाल्व मरम्मत",
      baseRate: 380,
      icon: Droplets,
      color: "#10b981",
      tag: "Water Conservation",
      tag_hi: "जल संरक्षण",
      description: "Fertigation venturi setup, sand media backwash filter unclogging, and inline emitter pressure tests."
    },
    {
      id: "agro_tractor_electrical",
      title: "Tractor & Harvester Agro-Electrical Dynamo Fix",
      hindi: "ट्रैक्टर एवं हार्वेस्टर डायनमो रिपेयर",
      baseRate: 420,
      icon: Sprout,
      color: "#ec4899",
      tag: "Farm Mechanization",
      tag_hi: "कृषि यंत्रीकरण",
      description: "Alternator rewinding, starting motor solenoid fix, and GPS auto-steer wiring troubleshooting."
    }
  ];

  return (
    <div className="glass-panel" style={{ padding: '28px', marginBottom: '40px', border: '1.5px solid var(--emerald)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-emerald">
              <Sprout size={12} /> {t('agroTheme')}
            </span>
            <span className="badge badge-saffron">{t('pacsNetwork')}</span>
          </div>
          <h3 style={{ fontSize: '22px', marginTop: '6px' }}>{t('agroTitle')}</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
            {t('agroDesc')}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(16,185,129,0.1)', padding: '6px 14px', borderRadius: '12px', border: '1px solid rgba(16,185,129,0.3)' }}>
          <ShieldCheck size={18} color="#10b981" />
          <span style={{ fontSize: '12px', color: '#34d399', fontWeight: 600 }}>
            {t('pmKusumBadge')}
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
        {agroServices.map(srv => {
          const locSrv = getLocalizedAgroService(srv, language);
          const IconC = srv.icon;
          return (
            <div
              key={srv.id}
              onClick={() => onSelectAgroService(srv.id, locSrv.title)}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--primary-border)',
                borderRadius: '14px',
                padding: '18px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#10b981';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary-border)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: `${srv.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconC size={22} color={srv.color} />
                </div>
                <span className="badge badge-emerald" style={{ fontSize: '9px' }}>
                  {language === 'hi' ? srv.tag_hi : srv.tag}
                </span>
              </div>

              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff' }}>{locSrv.title}</h4>
                {language !== 'hi' && (
                  <div style={{ fontSize: '12px', color: '#34d399', marginTop: '2px' }}>{srv.hindi}</div>
                )}
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px', lineHeight: 1.4 }}>
                  {locSrv.description}
                </p>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{t('coopRate')}</span>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>₹{srv.baseRate}</div>
                </div>
                <button className="btn-emerald" style={{ fontSize: '11px', padding: '6px 12px' }}>
                  {t('bookArtisan')} →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
