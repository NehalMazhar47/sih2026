import React, { useState, useEffect, useRef } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import {
  Navigation, Phone, MapPin, CheckCircle2, ShieldCheck,
  Volume2, AlertTriangle, ChevronRight, Clock, Gauge, ArrowUpRight
} from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const DEFAULT_ROUTE_STEPS_EN = [
  { dist: '200m', text: 'Head north towards Main Sector Road', icon: '⬆️' },
  { dist: '400m', text: 'Turn right at Rajiv Chowk Red Light', icon: '↗️' },
  { dist: '600m', text: 'Merge onto Ring Road (Vikas Marg)', icon: '⬆️' },
  { dist: '150m', text: 'Turn left into Block-C Gate No. 2', icon: '↖️' },
  { dist: '50m',  text: 'Arrive at Flat 3B, Lajpat Nagar', icon: '📍' },
];

const DEFAULT_ROUTE_STEPS_HI = [
  { dist: '200m', text: 'मुख्य सेक्टर मार्ग की ओर उत्तर बढ़ें', icon: '⬆️' },
  { dist: '400m', text: 'राजीव चौक रेड लाइट पर दाएं मुड़ें', icon: '↗️' },
  { dist: '600m', text: 'रिंग रोड (विकास मार्ग) पर शामिल हों', icon: '⬆️' },
  { dist: '150m', text: 'ब्लॉक-सी गेट नंबर 2 में बाएं मुड़ें', icon: '↖️' },
  { dist: '50m',  text: 'फ्लैट 3B, लाजपत नगर गंतव्य पहुंचे', icon: '📍' },
];

export const NavigationMap = ({
  jobDetails = null,
  onArrival = null,
  isCustomerView = false
}) => {
  const { language, speakText, advanceBookingStatus } = usePlatform();
  const isHi = language === 'hi';

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const workerMarkerRef = useRef(null);

  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [etaMins, setEtaMins] = useState(10);
  const [distanceKm, setDistanceKm] = useState(1.8);
  const [speedKmh, setSpeedKmh] = useState(24);
  const [isMuted, setIsMuted] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [showOtpPrompt, setShowOtpPrompt] = useState(false);
  const [otpError, setOtpError] = useState('');

  const steps = isHi ? DEFAULT_ROUTE_STEPS_HI : DEFAULT_ROUTE_STEPS_EN;

  // Worker coordinates moving from Connaught Place to Lajpat Nagar
  const routePoints = [
    [28.6289, 77.2065], // Start: Connaught Place
    [28.6189, 77.2145], // Waypoint 1
    [28.6000, 77.2280], // Waypoint 2
    [28.5720, 77.2400], // Waypoint 3: Lajpat Nagar
  ];

  const destinationCoord = [28.5720, 77.2400];

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Custom Icons
    const workerIcon = L.divIcon({
      className: 'custom-worker-pin',
      html: `<div style="background:#E65100;color:white;width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid white;box-shadow:0 4px 12px rgba(0,0,0,0.3);font-size:18px;">⚡</div>`,
      iconSize: [38, 38],
      iconAnchor: [19, 19]
    });

    const destIcon = L.divIcon({
      className: 'custom-dest-pin',
      html: `<div style="background:#0F2942;color:#FFB74D;width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid white;box-shadow:0 4px 12px rgba(0,0,0,0.3);font-size:18px;">📍</div>`,
      iconSize: [38, 38],
      iconAnchor: [19, 19]
    });

    // Initialize Map if not existing
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [28.6000, 77.2200],
        zoom: 13,
        zoomControl: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      // Draw polyline
      const polyline = L.polyline(routePoints, {
        color: '#E65100',
        weight: 5,
        opacity: 0.8,
        dashArray: '8, 8'
      }).addTo(map);

      // Add markers
      workerMarkerRef.current = L.marker(routePoints[0], { icon: workerIcon }).addTo(map);
      L.marker(destinationCoord, { icon: destIcon }).addTo(map);

      map.fitBounds(polyline.getBounds(), { padding: [40, 40] });
      mapInstanceRef.current = map;
    }

    // Live Animation Loop
    let stepCount = 0;
    const interval = setInterval(() => {
      stepCount++;
      const progress = (stepCount % 100) / 100;
      
      // Interpolate along routePoints
      const pIdx = Math.floor(progress * (routePoints.length - 1));
      const nextIdx = Math.min(pIdx + 1, routePoints.length - 1);
      const ratio = (progress * (routePoints.length - 1)) - pIdx;

      const lat = routePoints[pIdx][0] + ratio * (routePoints[nextIdx][0] - routePoints[pIdx][0]);
      const lng = routePoints[pIdx][1] + ratio * (routePoints[nextIdx][1] - routePoints[pIdx][1]);

      if (workerMarkerRef.current) {
        workerMarkerRef.current.setLatLng([lat, lng]);
      }

      // Update step instructions dynamically
      const nextStepIdx = Math.min(Math.floor(progress * steps.length), steps.length - 1);
      setCurrentStepIdx(nextStepIdx);

      const remKm = (1.8 * (1 - progress)).toFixed(1);
      const remMins = Math.max(1, Math.ceil(10 * (1 - progress)));
      setDistanceKm(remKm);
      setEtaMins(remMins);
      setSpeedKmh(Math.floor(20 + Math.random() * 8));
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const handleVerifyOtp = () => {
    if (otpInput.trim() === '8914' || otpInput.trim().length === 4) {
      if (advanceBookingStatus) advanceBookingStatus('in_progress');
      if (onArrival) onArrival();
      speakText(isHi ? "OTP सत्यापित। सेवा कार्य आरंभ किया गया।" : "OTP verified. Service work started.");
      setShowOtpPrompt(false);
    } else {
      setOtpError(isHi ? "अमान्य OTP! कृपया ग्राहक से 4-अंकों का OTP प्राप्त करें।" : "Invalid OTP! Please get the 4-digit OTP from customer.");
    }
  };

  return (
    <div style={{ borderRadius: 'var(--r-xl)', overflow: 'hidden', border: '1.5px solid var(--border)', background: 'var(--card)', boxShadow: 'var(--shadow-lg)' }}>
      {/* ── Top Turn-by-Turn Guidance Banner ──────────────── */}
      <div style={{ background: '#0F2942', color: 'white', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: '50%', background: '#E65100', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 800 }}>
            {steps[currentStepIdx]?.icon || '⬆️'}
          </div>
          <div>
            <div style={{ fontSize: 12, color: '#FFB74D', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {isHi ? 'अगला मोड़' : 'NEXT TURN'} • {steps[currentStepIdx]?.dist}
            </div>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 700, marginTop: 2 }}>
              {steps[currentStepIdx]?.text}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#4ADE80' }}>
              {etaMins} {isHi ? 'मिनट' : 'mins'}
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>
              {distanceKm} km • {speedKmh} km/h
            </div>
          </div>

          <button
            onClick={() => {
              setIsMuted(!isMuted);
              if (isMuted) speakText(steps[currentStepIdx]?.text);
            }}
            style={{ background: 'rgba(255,255,255,0.12)', border: 'none', color: 'white', padding: 10, borderRadius: '50%', cursor: 'pointer' }}
            title="Toggle Voice Directions"
          >
            <Volume2 size={18} color={isMuted ? 'rgba(255,255,255,0.4)' : '#FFB74D'} />
          </button>
        </div>
      </div>

      {/* ── Leaflet Interactive Map Container ────────────── */}
      <div style={{ position: 'relative', height: '340px', width: '100%', background: '#E2E8F0' }}>
        <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />

        {/* Live GPS Floating Badge */}
        <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 400, background: 'rgba(15, 41, 66, 0.85)', backdropFilter: 'blur(6px)', color: 'white', padding: '6px 12px', borderRadius: 'var(--r-full)', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', animation: 'pulse 1.5s infinite' }} />
          {isHi ? 'लाइव GPS नेविगेशन' : 'LIVE GPS NAVIGATION'}
        </div>

        {/* Recenter Button */}
        <button
          onClick={() => {
            if (mapInstanceRef.current) {
              mapInstanceRef.current.setView([28.6000, 77.2200], 13);
            }
          }}
          style={{ position: 'absolute', bottom: 12, right: 12, zIndex: 400, background: 'white', border: '1.5px solid var(--border)', borderRadius: 'var(--r-full)', padding: '8px 14px', fontSize: 12, fontWeight: 700, color: 'var(--primary-navy)', boxShadow: 'var(--shadow-md)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <Navigation size={14} /> {isHi ? 'पुनः केंद्रित करें' : 'Recenter Route'}
        </button>
      </div>

      {/* ── Bottom Action & Customer Details Console ─────── */}
      <div style={{ padding: 'var(--sp-md)', background: 'var(--card)', borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>
              {isHi ? 'गंतव्य पता (ग्राहक)' : 'Destination Address'}
            </div>
            <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <MapPin size={16} color="#E65100" />
              {jobDetails?.address || (isHi ? 'फ्लैट 3B, ब्लॉक-सी, लाजपत नगर, नई दिल्ली' : 'Flat 3B, Block-C, Lajpat Nagar, New Delhi')}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <a
              href="tel:+919876543210"
              className="btn btn-outline"
              style={{ padding: '8px 14px', fontSize: 13 }}
            >
              <Phone size={14} color="#168A4A" /> {isHi ? 'कॉल करें' : 'Call'}
            </a>
            {!isCustomerView && (
              <button
                className="btn btn-primary"
                style={{ padding: '8px 16px', fontSize: 13, background: 'var(--coop-green)' }}
                onClick={() => setShowOtpPrompt(true)}
              >
                <CheckCircle2 size={16} /> {isHi ? 'पहुंच गए - OTP दर्ज करें' : 'Arrived - Enter OTP'}
              </button>
            )}
          </div>
        </div>

        {/* OTP Input Modal Dialog */}
        {showOtpPrompt && (
          <div style={{ background: 'var(--saffron-pale)', border: '2px solid var(--saffron)', borderRadius: 'var(--r-lg)', padding: 'var(--sp-md)', marginTop: 12 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--saffron-dark)', marginBottom: 4 }}>
              🔒 {isHi ? 'ग्राहक सुरक्षा OTP दर्ज करें' : 'Enter Customer Security OTP'}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10 }}>
              {isHi ? 'काम शुरू करने से पहले ग्राहक के फोन से 4-अंकों का OTP प्राप्त करें।' : 'Ask the customer for their 4-digit security OTP to begin service work.'}
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <input
                type="text"
                maxLength={4}
                placeholder="Ex: 8914"
                value={otpInput}
                onChange={e => { setOtpInput(e.target.value); setOtpError(''); }}
                style={{ width: 120, padding: '10px 14px', fontSize: 18, fontWeight: 800, letterSpacing: '4px', textAlign: 'center', border: '2px solid var(--border-strong)', borderRadius: 'var(--r-md)' }}
              />
              <button className="btn btn-primary" onClick={handleVerifyOtp} style={{ padding: '10px 18px' }}>
                {isHi ? 'सत्यापित करें व कार्य शुरू करें' : 'Verify & Start Work'}
              </button>
              <button className="btn btn-ghost" onClick={() => setShowOtpPrompt(false)}>
                {isHi ? 'रद्द करें' : 'Cancel'}
              </button>
            </div>
            {otpError && <div style={{ color: 'var(--sos)', fontSize: 12, marginTop: 6, fontWeight: 600 }}>{otpError}</div>}
          </div>
        )}
      </div>
    </div>
  );
};
