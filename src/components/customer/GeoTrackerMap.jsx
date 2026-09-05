import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Navigation, Clock, ShieldCheck, PhoneCall } from 'lucide-react';

export const GeoTrackerMap = ({
  workerLocation = [28.6180, 77.2150],
  customerLocation = [28.6139, 77.2090],
  societyLocation = [28.6250, 77.2000],
  workerName = "Satish Kumar Verma",
  etaMinutes = 12,
  status = "en_route"
}) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const workerMarkerRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Destroy existing instance if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Initialize map
    const map = L.map(mapContainerRef.current, {
      center: customerLocation,
      zoom: 14,
      zoomControl: false
    });

    // Dark sleek OpenStreetMap tiles (CartoDB Dark Matter)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      maxZoom: 19
    }).addTo(map);

    // Custom Customer Icon
    const customerIcon = L.divIcon({
      className: 'custom-customer-pin',
      html: `
        <div style="background:#10b981; width:34px; height:34px; border-radius:50%; border:3px solid white; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 12px rgba(0,0,0,0.4);">
          <span style="font-size:16px;">🏠</span>
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    });

    // Custom Worker Icon
    const workerIcon = L.divIcon({
      className: 'custom-worker-pin',
      html: `
        <div style="position:relative;">
          <div style="background:#f48c06; width:38px; height:38px; border-radius:50%; border:3px solid white; display:flex; align-items:center; justify-content:center; box-shadow:0 0 16px rgba(244,140,6,0.8); animation:radarPulse 2s infinite;">
            <span style="font-size:18px;">👷</span>
          </div>
          <div style="position:absolute; top:-18px; left:-25px; background:#091a32; color:#f48c06; font-size:10px; font-weight:700; padding:2px 6px; border-radius:10px; border:1px solid #f48c06; white-space:nowrap;">
            ${etaMinutes}m ETA
          </div>
        </div>
      `,
      iconSize: [38, 38],
      iconAnchor: [19, 19]
    });

    // Custom Society Hub Icon
    const societyIcon = L.divIcon({
      className: 'custom-society-pin',
      html: `
        <div style="background:#3b82f6; width:30px; height:30px; border-radius:8px; border:2px solid white; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 10px rgba(0,0,0,0.3);">
          <span style="font-size:14px;">🏛️</span>
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });

    // Add Markers
    L.marker(customerLocation, { icon: customerIcon })
      .addTo(map)
      .bindPopup("<b>Your Household Location</b><br/>Ward 42, Connaught Sector");

    const wMarker = L.marker(workerLocation, { icon: workerIcon })
      .addTo(map)
      .bindPopup(`<b>${workerName}</b><br/>NCCT Certified Artisan (En Route)`);
    workerMarkerRef.current = wMarker;

    L.marker(societyLocation, { icon: societyIcon })
      .addTo(map)
      .bindPopup("<b>Delhi Shramik Sahakari Federation</b><br/>Cooperative Hub #04");

    // Polyline connecting worker to customer
    const routeCoords = [workerLocation, [28.6160, 77.2120], customerLocation];
    L.polyline(routeCoords, {
      color: '#f48c06',
      weight: 4,
      dashArray: '8, 8',
      opacity: 0.85
    }).addTo(map);

    // Cooperative Service Ward Coverage Circle
    L.circle(societyLocation, {
      radius: 2200,
      color: '#06b6d4',
      fillColor: '#06b6d4',
      fillOpacity: 0.08,
      weight: 1.5,
      dashArray: '4, 4'
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [workerLocation, customerLocation, etaMinutes, workerName]);

  return (
    <div style={{ position: 'relative' }}>
      {/* Map Element */}
      <div
        ref={mapContainerRef}
        style={{
          height: '320px',
          width: '100%',
          borderRadius: '16px',
          border: '1px solid var(--primary-border)',
          overflow: 'hidden'
        }}
      />

      {/* Floating Telemetry Card */}
      <div
        style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          right: '12px',
          background: 'rgba(8, 20, 42, 0.92)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(244,140,6,0.4)',
          borderRadius: '14px',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 400,
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(244,140,6,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Navigation size={18} color="#f48c06" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '13px', color: '#ffffff' }}>
              {workerName}
            </div>
            <div style={{ fontSize: '11px', color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={12} /> Cooperative Verified Proximity Match
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Estimated ETA</div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#f48c06', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={14} /> {etaMinutes} Mins
            </div>
          </div>
          <a
            href="tel:+919811245890"
            className="btn-emerald"
            style={{ padding: '8px 14px', fontSize: '12px' }}
            onClick={(e) => { e.preventDefault(); alert("Calling artisan Satish Kumar Verma (+91 98112 45890)..."); }}
          >
            <PhoneCall size={14} /> Call
          </a>
        </div>
      </div>
    </div>
  );
};
