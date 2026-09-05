import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { User, Phone, MapPin, Building, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const CustomerRegisterModal = ({ onSuccess, onSwitchToWorker }) => {
  const { language, setRole, registerUserSession, setIsCustomerProfileOpen, showToast, speakText } = usePlatform();
  const isHi = language === 'hi';

  const [step, setStep] = useState('phone'); // 'phone' | 'otp' | 'details'
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [society, setSociety] = useState('Navjeevan Cooperative Housing');
  const [pincode, setPincode] = useState('110001');
  const [isSeniorCitizen, setIsSeniorCitizen] = useState(false);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phone.length < 10) return;
    setStep('otp');
    showToast(
      isHi ? "OTP भेजा गया" : "OTP Sent",
      isHi ? `आपके मोबाइल ${phone} पर 6-अंकों का OTP भेजा गया है।` : `6-digit verification code sent to +91 ${phone}`,
      "info"
    );
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp.length < 4) return;
    setStep('details');
  };

  const handleCompleteRegistration = (e) => {
    e.preventDefault();
    setRole('customer');
    registerUserSession({
      role: 'customer',
      name: fullName || 'Rajesh Sharma',
      phone: phone || '+91 98765 43210',
      society: society || 'Navjeevan Cooperative Housing',
      address: address || 'Flat 402, Block C, Connaught Place, New Delhi',
      pincode: pincode || '110001',
      isSeniorCitizen
    });
    showToast(
      isHi ? "पंजीकरण सफल!" : "Registration Complete!",
      isHi ? `स्वागत है ${fullName}! आपकी ShramSetu प्रोफ़ाइल खोल दी गई है।` : `Welcome ${fullName}! Opening your household profile page.`,
      "success"
    );
    speakText(isHi ? `स्वागत है ${fullName}। आपकी ग्राहक प्रोफ़ाइल तैयार है।` : `Welcome ${fullName}. Your household profile is active.`);
    if (onSuccess) onSuccess();
    setIsCustomerProfileOpen(true);
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'var(--saffron-pale)', color: 'var(--saffron-dark)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 8 }}>
          🏡
        </div>
        <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 20, fontWeight: 800, color: 'var(--primary-navy)' }}>
          {isHi ? 'ग्राहक / गृहस्थ पंजीकरण' : 'Customer / Household Registration'}
        </h2>
        <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          {isHi ? 'सत्यापित सहकारी कारीगरों को पारदर्शी दरों पर बुक करें' : 'Book verified cooperative artisans at government-regulated rates'}
        </p>
      </div>

      {step === 'phone' && (
        <form onSubmit={handleSendOtp}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 6 }}>
              {isHi ? 'मोबाइल नंबर' : 'Mobile Number'}
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              <span style={{ padding: '10px 14px', background: 'var(--bg)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-md)', fontWeight: 700, fontSize: 14 }}>+91</span>
              <input
                type="tel"
                required
                maxLength={10}
                placeholder="98765 43210"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                style={{ flex: 1, padding: '10px 14px', border: '1.5px solid var(--border)', borderRadius: 'var(--r-md)', fontSize: 14, fontWeight: 600 }}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', fontSize: 15 }}>
            {isHi ? 'OTP प्राप्त करें' : 'Get Verification OTP'} <ArrowRight size={16} />
          </button>
        </form>
      )}

      {step === 'otp' && (
        <form onSubmit={handleVerifyOtp}>
          <div style={{ background: 'var(--saffron-pale)', padding: 12, borderRadius: 'var(--r-md)', fontSize: 13, color: 'var(--saffron-dark)', marginBottom: 16, textAlign: 'center' }}>
            📱 {isHi ? 'कोड भेजा गया' : 'Verification Code Sent to'} +91 {phone}
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 6, textAlign: 'center' }}>
              {isHi ? '4-अंकों का OTP दर्ज करें (परीक्षण: 8914)' : 'Enter 4-Digit OTP (Demo: 8914)'}
            </label>
            <input
              type="text"
              required
              maxLength={4}
              placeholder="8914"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              style={{ width: '100%', padding: '12px', textAlign: 'center', fontSize: 22, fontWeight: 800, letterSpacing: 8, border: '2px solid var(--border-strong)', borderRadius: 'var(--r-md)' }}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', fontSize: 15, background: 'var(--coop-green)' }}>
            {isHi ? 'OTP सत्यापित करें' : 'Verify OTP & Continue'} <CheckCircle2 size={16} />
          </button>
        </form>
      )}

      {step === 'details' && (
        <form onSubmit={handleCompleteRegistration}>
          <div style={{ display: 'grid', gap: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                {isHi ? 'पूरा नाम' : 'Full Name'}
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Rajesh Sharma"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--border)', borderRadius: 'var(--r-md)', fontSize: 14 }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                {isHi ? 'सोसायटी / अपार्टमेंट का नाम' : 'Society / Apartment Name'}
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Navjeevan Cooperative Society"
                value={society}
                onChange={e => setSociety(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--border)', borderRadius: 'var(--r-md)', fontSize: 14 }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                  {isHi ? 'पूरा पता' : 'Full Address'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="Flat 402, Block C"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--border)', borderRadius: 'var(--r-md)', fontSize: 14 }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                  {isHi ? 'पिन कोड' : 'Pincode'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="110001"
                  value={pincode}
                  onChange={e => setPincode(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--border)', borderRadius: 'var(--r-md)', fontSize: 14 }}
                />
              </div>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', padding: '8px 12px', background: 'var(--bg)', borderRadius: 'var(--r-md)' }}>
              <input
                type="checkbox"
                checked={isSeniorCitizen}
                onChange={e => setIsSeniorCitizen(e.target.checked)}
              />
              <span>👵 {isHi ? 'वरिष्ठ नागरिक / दिव्यांग सेवा प्राथमिकता (Senior Citizen SOS)' : 'Senior Citizen Priority Service Account'}</span>
            </label>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', fontSize: 15, marginTop: 6 }}>
              {isHi ? 'पंजीकरण पूरा करें' : 'Complete Account Registration'} <CheckCircle2 size={16} />
            </button>
          </div>
        </form>
      )}

      <div style={{ textAlign: 'center', marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--border)', fontSize: 13, color: 'var(--text-muted)' }}>
        {isHi ? 'क्या आप कारीगर/श्रमिक हैं?' : 'Are you a skilled worker / artisan?'}{' '}
        <button
          type="button"
          onClick={onSwitchToWorker}
          style={{ background: 'none', border: 'none', color: 'var(--saffron-dark)', fontWeight: 800, cursor: 'pointer', textDecoration: 'underline' }}
        >
          {isHi ? 'श्रमिक सहकारी पंजीकरण करें ➔' : 'Register as Shramik Member ➔'}
        </button>
      </div>
    </div>
  );
};
