import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import {
  X,
  Zap,
  Calendar,
  Building,
  ShieldCheck,
  Clock,
  MapPin,
  CheckCircle,
  AlertTriangle,
  Award
} from 'lucide-react';
import { PriceBreakdown } from './PriceBreakdown';

export const BookingModal = ({ category, initialCategory = null, isEmergencyDefault = false, onClose }) => {
  const { categories, workers, createBooking, t, language } = usePlatform();

  const [bookingType, setBookingType] = useState(isEmergencyDefault ? 'emergency' : 'scheduled');
  const [selectedCategory, setSelectedCategory] = useState(
    category || initialCategory || categories[0].id
  );
  const [address, setAddress] = useState(language === 'hi' ? "फ्लैट 402, नवजीवन अपार्टमेंट्स, कनाट प्लेस, नई दिल्ली" : "Flat 402, Navjeevan Apartments, Connaught Place, New Delhi");
  const [selectedDate, setSelectedDate] = useState(language === 'hi' ? "आज (तत्काल)" : "Today, Immediate");
  const [selectedSlot, setSelectedSlot] = useState(language === 'hi' ? "15-25 मिनट (त्वरित SOS)" : "15-25 Mins (Fast SOS)");
  const [specialInstructions, setSpecialInstructions] = useState("");

  const catObj = categories.find(c => c.id === selectedCategory) || categories[0];
  // Match closest qualified worker
  const matchedWorker = workers.find(w => w.trade === selectedCategory && w.isAvailable) || workers[0];

  const basePrice = catObj.baseRate;
  const bookingTotal = bookingType === 'emergency' ? basePrice + 50 : (bookingType === 'community' ? Math.round(basePrice * 0.9) : basePrice);
  const workerWage = Math.round(bookingTotal * 0.88);
  const welfareAmount = Math.round(bookingTotal * 0.07);
  const platformAmount = bookingTotal - workerWage - welfareAmount;

  const handleConfirm = () => {
    createBooking({
      category: selectedCategory,
      serviceName: language === 'hi' ? `${catObj.hindiName} सेवा` : `${catObj.name} Service`,
      workerId: matchedWorker.id,
      workerName: matchedWorker.name,
      workerAvatar: matchedWorker.avatarUrl,
      workerPhone: matchedWorker.phone,
      societyName: matchedWorker.societyName,
      ncctLevel: matchedWorker.ncctLevel,
      ncctCertId: matchedWorker.ncctCertId,
      bookingType,
      address,
      scheduledTime: bookingType === 'emergency' ? (language === 'hi' ? '15-20 मिनट आपात प्रेषण' : '15-20 mins emergency dispatch') : `${selectedDate} (${selectedSlot})`,
      amount: bookingTotal,
      workerWage,
      welfareContribution: welfareAmount,
      platformNcctShare: platformAmount,
      isEmergency: bookingType === 'emergency',
      instructions: specialInstructions
    });
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content" style={{ maxWidth: '680px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-saffron">
                {language === 'hi' ? "सहकारी प्रेषण" : "Cooperative Dispatch"}
              </span>
              {bookingType === 'emergency' && (
                <span className="badge badge-danger">
                  {language === 'hi' ? "15-मिनट SOS SLA" : "15-Min SOS SLA"}
                </span>
              )}
            </div>
            <h2 style={{ fontSize: '22px', marginTop: '6px' }}>
              {language === 'hi' ? "सत्यापित सहकारी सेवा बुकिंग" : "Book Verified Cooperative Service"}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Booking Type Selector */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '22px' }}>
          <button
            type="button"
            onClick={() => setBookingType('emergency')}
            style={{
              padding: '12px',
              borderRadius: '12px',
              border: bookingType === 'emergency' ? '2px solid #ef4444' : '1px solid var(--primary-border)',
              background: bookingType === 'emergency' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255,255,255,0.03)',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              textAlign: 'center'
            }}
          >
            <Zap size={20} color="#ef4444" />
            <span style={{ fontWeight: 700, fontSize: '12px' }}>
              {language === 'hi' ? "आपातकालीन SOS" : "Emergency SOS"}
            </span>
            <span style={{ fontSize: '10px', color: '#fca5a5' }}>
              {language === 'hi' ? "15-30 मिनट में आगमन" : "15-30 Min Arrival"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setBookingType('scheduled')}
            style={{
              padding: '12px',
              borderRadius: '12px',
              border: bookingType === 'scheduled' ? '2px solid var(--saffron)' : '1px solid var(--primary-border)',
              background: bookingType === 'scheduled' ? 'rgba(244, 140, 6, 0.15)' : 'rgba(255,255,255,0.03)',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              textAlign: 'center'
            }}
          >
            <Calendar size={20} color="#f48c06" />
            <span style={{ fontWeight: 700, fontSize: '12px' }}>
              {language === 'hi' ? "समय स्लॉट चुनें" : "Scheduled Slot"}
            </span>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
              {language === 'hi' ? "तारीख व समय चुनें" : "Choose Date & Time"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setBookingType('community')}
            style={{
              padding: '12px',
              borderRadius: '12px',
              border: bookingType === 'community' ? '2px solid var(--emerald)' : '1px solid var(--primary-border)',
              background: bookingType === 'community' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.03)',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              textAlign: 'center'
            }}
          >
            <Building size={20} color="#10b981" />
            <span style={{ fontWeight: 700, fontSize: '12px' }}>
              {language === 'hi' ? "हाउसिंग सोसायटी" : "Housing Society"}
            </span>
            <span style={{ fontSize: '10px', color: '#34d399' }}>
              {language === 'hi' ? "10% नियमित छूट" : "Recurring 10% Off"}
            </span>
          </button>
        </div>

        {/* Trade Category Selector */}
        <div style={{ marginBottom: '18px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px', display: 'block' }}>
            {language === 'hi' ? "सेवा का प्रकार" : "Service Trade"}
          </label>
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(c => (
              <option key={c.id} value={c.id} style={{ background: '#091a32' }}>
                {language === 'hi' ? `${c.hindiName} - आधार दर ₹${c.baseRate}` : `${c.name} (${c.hindiName}) - Base ₹${c.baseRate}`}
              </option>
            ))}
          </select>
        </div>

        {/* Matched Nearest Cooperative Artisan Card */}
        <div
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(244,140,6,0.3)',
            borderRadius: '14px',
            padding: '16px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}
        >
          <img
            src={matchedWorker.avatarUrl}
            alt={matchedWorker.name}
            style={{ width: '56px', height: '56px', borderRadius: '50%', border: '2px solid #f48c06' }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontWeight: 700, fontSize: '15px' }}>{matchedWorker.name}</span>
              <span className="badge badge-emerald" style={{ fontSize: '10px', padding: '1px 6px' }}>
                <ShieldCheck size={11} /> {language === 'hi' ? "NCCT सत्यापित" : "NCCT Verified"}
              </span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
              {matchedWorker.societyName} • {language === 'hi' ? 'NCCT स्तर-4' : matchedWorker.ncctLevel}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px', fontSize: '12px' }}>
              <span style={{ color: '#ffba08', fontWeight: 700 }}>★ {matchedWorker.rating}</span>
              <span style={{ color: 'var(--text-muted)' }}>
                • {matchedWorker.gigsCompleted} {language === 'hi' ? "कार्य पूरे किए" : "jobs"}
              </span>
              <span style={{ color: '#34d399' }}>
                • {language === 'hi' ? "1.8 किमी दूरी (~12 मिनट)" : "1.8 km away (~12m ETA)"}
              </span>
            </div>
          </div>
        </div>

        {/* Address Input */}
        <div style={{ marginBottom: '18px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={14} color="#f48c06" /> {language === 'hi' ? "सेवा का पता एवं वार्ड" : "Service Address & Ward"}
          </label>
          <input
            type="text"
            className="form-input"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder={language === 'hi' ? "फ्लैट / मकान नंबर, सोसायटी, वार्ड दर्ज करें" : "Enter flat / house number, society, ward"}
          />
        </div>

        {/* Schedule Inputs if Scheduled */}
        {bookingType === 'scheduled' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '18px' }}>
            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>
                {language === 'hi' ? "दिन चुनें" : "Select Day"}
              </label>
              <select
                className="form-select"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                <option value="Today" style={{ background: '#091a32' }}>{language === 'hi' ? "आज (तत्काल)" : "Today (Urgent)"}</option>
                <option value="Tomorrow" style={{ background: '#091a32' }}>{language === 'hi' ? "कल" : "Tomorrow"}</option>
                <option value="This Weekend" style={{ background: '#091a32' }}>{language === 'hi' ? "इस सप्ताहांत" : "This Weekend"}</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>
                {language === 'hi' ? "समय स्लॉट" : "Time Slot"}
              </label>
              <select
                className="form-select"
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
              >
                <option value="09:00 AM - 11:00 AM" style={{ background: '#091a32' }}>09:00 AM - 11:00 AM</option>
                <option value="12:00 PM - 02:00 PM" style={{ background: '#091a32' }}>12:00 PM - 02:00 PM</option>
                <option value="03:00 PM - 05:00 PM" style={{ background: '#091a32' }}>03:00 PM - 05:00 PM</option>
                <option value="06:00 PM - 08:00 PM" style={{ background: '#091a32' }}>06:00 PM - 08:00 PM</option>
              </select>
            </div>
          </div>
        )}

        {/* Fair Price Summary */}
        <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '12px', padding: '14px', marginBottom: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '12px', color: '#34d399', fontWeight: 600 }}>
                {language === 'hi' ? "पारदर्शी उचित कुल दर" : "Total Transparent Fair Rate"}
              </span>
              <div style={{ fontSize: '24px', fontWeight: 800, color: 'white' }}>₹{bookingTotal}</div>
            </div>
            <div style={{ textAlign: 'right', fontSize: '12px', color: 'var(--text-muted)' }}>
              <div>{language === 'hi' ? "सीधा कामगार वेतन:" : "Worker Living Wage:"} <b style={{ color: '#34d399' }}>₹{workerWage} (88%)</b></div>
              <div>{language === 'hi' ? "कल्याण एवं पेंशन कोष:" : "Worker Welfare & Pension:"} <b style={{ color: '#f48c06' }}>₹{welfareAmount} (7%)</b></div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary"
            style={{ flex: 1 }}
          >
            {language === 'hi' ? "रद्द करें" : "Cancel"}
          </button>
          <button
            id="confirm-booking-btn"
            type="button"
            onClick={handleConfirm}
            className="btn-primary"
            style={{ flex: 2, padding: '12px 20px', fontSize: '15px' }}
          >
            {bookingType === 'emergency'
              ? (language === 'hi' ? "🚨 आपातकालीन कारीगर भेजें" : "🚨 Dispatch Emergency Artisan")
              : (language === 'hi' ? "सहकारी बुकिंग पक्की करें" : "Confirm Cooperative Booking")}
          </button>
        </div>
      </div>
    </div>
  );
};
