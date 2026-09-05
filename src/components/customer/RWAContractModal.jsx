import React, { useState } from 'react';
import { Building, CheckCircle2, ShieldCheck, Calendar, Users, X, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePlatform } from '../../context/PlatformContext';

export const RWAContractModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const { showToast, speakText, language } = usePlatform();
  const isHi = language === 'hi';

  const [societyName, setSocietyName] = useState(isHi ? "नवजीवन सहकारी आवास समिति" : "Navjeevan Cooperative Group Housing Society");
  const [unitsCount, setUnitsCount] = useState(120);
  const [selectedServices, setSelectedServices] = useState(["sanitation", "electrical_audit", "gardening"]);
  const [durationMonths, setDurationMonths] = useState(12);

  const availableServices = [
    { id: "sanitation", label: isHi ? "सप्ताह में दो बार साझा क्षेत्रों की डीप सैनिटाइजेशन व सफाई" : "Twice-Weekly Common Area Deep Sanitation", base: 8000 },
    { id: "electrical_audit", label: isHi ? "मासिक विद्युत सबस्टेशन, लिफ्ट एवं मीटरिंग सुरक्षा ऑडिट" : "Monthly Substation, Elevator & Metering Audit", base: 6500 },
    { id: "gardening", label: isHi ? "दैनिक लॉन, बालकनी एवं जैविक वृक्ष छंटाई (माली सेवा)" : "Daily Balcony, Lawn & Organic Tree Pruning", base: 7500 },
    { id: "plumbing_drainage", label: isHi ? "द्वि-मासिक ओवरहेड वाटर टैंक एवं संप सफाई व जल निकासी" : "Bi-Monthly Overhead Water Tank & Sump Scrubbing", base: 9000 },
    { id: "rooftop_solar", label: isHi ? "त्रैमासिक रूफटॉप सोलर पीवी पैनल जेट धुलाई व दक्षता जांच" : "Quarterly Solar Rooftop PV Panel Jet Cleaning", base: 4500 }
  ];

  const toggleService = (id) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter(s => s !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const monthlyTotal = selectedServices.reduce((sum, sId) => {
    const item = availableServices.find(a => a.id === sId);
    return sum + (item ? item.base : 0);
  }, 0);

  // 15% cooperative bulk contract discount
  const discountedMonthly = Math.round(monthlyTotal * 0.85);

  const handleSignContract = (e) => {
    e.preventDefault();
    confetti({ particleCount: 90, spread: 80 });
    showToast(isHi ? "सामुदायिक अनुबंध निष्पादित!" : "Community Contract Signed!", isHi ? `${societyName} के साथ वार्षिक समझौता सहकारी महासंघ को प्रेषित।` : `Annual agreement with ${societyName} submitted to Cooperative Federation.`, "success");
    speakText(isHi ? `${societyName} हेतु सामुदायिक सेवा अनुबंध निष्पादित किया गया। सत्यापित सहकारी टीम आवंटित।` : `Community service contract executed for ${societyName}. Verified cooperative team assigned.`);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content" style={{ maxWidth: '700px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '40px', height: '40px', background: 'rgba(16,185,129,0.2)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Building size={22} color="#10b981" />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', color: '#ffffff' }}>
                {isHi ? "आवासीय समिति एवं संस्थागत सामूहिक अनुबंध" : "Housing Society & Institutional Group Contract"}
              </h3>
              <div style={{ fontSize: '11px', color: '#34d399' }}>
                {isHi ? "रेजिडेंट वेलफेयर एसोसिएशन (RWA) एवं सामुदायिक परिसर" : "Residential Welfare Associations (RWAs) & Community Facilities"}
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>✕</button>
        </div>

        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '18px' }}>
          {isHi ? "अपार्टमेंट, स्कूलों अथवा ग्राम पंचायतों हेतु सत्यापित सहकारी टीमों का सामूहिक अनुबंध। 15% थोक संस्थागत बचत और समर्पित सहकारी पर्यवेक्षक निगरानी का लाभ उठाएं।" : "Contract verified cooperative teams for residential apartments, schools, or community panchayats. Enjoy 15% bulk institutional savings and dedicated cooperative supervisor oversight."}
        </p>

        <form onSubmit={handleSignContract}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                {isHi ? "हाउसिंग सोसायटी / संस्थान का नाम" : "Housing Society / Institution Name"}
              </label>
              <input
                type="text"
                className="form-input"
                value={societyName}
                onChange={(e) => setSocietyName(e.target.value)}
                required
              />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                {isHi ? "फ्लैट / यूनिट्स की संख्या" : "Number of Flats / Units"}
              </label>
              <input
                type="number"
                className="form-input"
                value={unitsCount}
                onChange={(e) => setUnitsCount(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
              {isHi ? "आवश्यक सामूहिक सेवाएं चुनें:" : "Select Bundled Services Required:"}
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {availableServices.map(srv => {
                const isSelected = selectedServices.includes(srv.id);
                return (
                  <div
                    key={srv.id}
                    onClick={() => toggleService(srv.id)}
                    style={{
                      background: isSelected ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.03)',
                      border: isSelected ? '1.5px solid #10b981' : '1px solid var(--primary-border)',
                      borderRadius: '10px',
                      padding: '12px 16px',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <CheckCircle2 size={16} color={isSelected ? "#10b981" : "#64748b"} />
                      <span style={{ fontSize: '13px', color: '#ffffff' }}>{srv.label}</span>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#34d399' }}>
                      ₹{srv.base}/{isHi ? "माह" : "mo"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pricing Calculation */}
          <div style={{ background: 'rgba(244,140,6,0.1)', border: '1px solid rgba(244,140,6,0.3)', borderRadius: '12px', padding: '16px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--saffron-light)', fontWeight: 700 }}>
                {isHi ? "सहकारी संस्थागत सामूहिक दर (15% बचत लागू):" : "Cooperative Institutional Group Rate (15% Savings Applied):"}
              </div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff' }}>
                ₹{discountedMonthly.toLocaleString()} <span style={{ fontSize: '12px', fontWeight: 400, color: 'var(--text-muted)' }}>/ {isHi ? "प्रति माह" : "Month"}</span>
              </div>
            </div>
            <div style={{ textAlign: 'right', fontSize: '11px', color: 'var(--text-muted)' }}>
              <div>{isHi ? "मासिक आधार:" : "Monthly Base:"} <del>₹{monthlyTotal.toLocaleString()}</del></div>
              <div style={{ color: '#34d399', fontWeight: 600 }}>
                {isHi ? `लगभग ₹${Math.round(discountedMonthly / unitsCount)}/फ्लैट प्रति माह` : `Approx ₹${Math.round(discountedMonthly / unitsCount)}/flat per month`}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="button" onClick={onClose} className="btn-secondary" style={{ flex: 1 }}>
              {isHi ? "रद्द करें" : "Cancel"}
            </button>
            <button type="submit" className="btn-primary" style={{ flex: 2 }}>
              {isHi ? "सहकारी संस्थागत अनुबंध निष्पादित करें" : "Execute Cooperative Institutional Agreement"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
