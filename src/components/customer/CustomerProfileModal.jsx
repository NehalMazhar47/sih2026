import React from 'react';
import { usePlatform } from '../../context/PlatformContext';
import {
  User, ShieldCheck, MapPin, Building, Phone, LogOut,
  Award, Heart, Calendar, CheckCircle2, X
} from 'lucide-react';

export const CustomerProfileModal = ({ isOpen, onClose }) => {
  const { currentUser, logoutUser, language, setRole, bookingHistory } = usePlatform();
  const isHi = language === 'hi';

  if (!isOpen) return null;

  const handleLogout = () => {
    logoutUser();
    onClose();
  };

  const user = currentUser || {
    name: isHi ? 'राजेश शर्मा' : 'Rajesh Sharma',
    phone: '+91 98765 43210',
    society: isHi ? 'नवजीवन सहकारी हाउसिंग सोसायटी' : 'Navjeevan Cooperative Housing Society',
    address: 'Flat 402, Block C, Connaught Place, New Delhi',
    pincode: '110001',
    isSeniorCitizen: false,
    memberId: 'SHRAM-CUST-8812'
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content" style={{ maxWidth: '620px', padding: 0, overflow: 'hidden' }}>
        {/* Top Header Card */}
        <div style={{ background: 'linear-gradient(135deg, #0F2942 0%, #184A90 100%)', color: 'white', padding: '24px', position: 'relative' }}>
          <button
            onClick={onClose}
            style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ width: 68, height: 68, borderRadius: '50%', background: '#E65100', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, border: '3px solid #FFB74D', fontWeight: 800 }}>
              🏡
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: 'white', margin: 0 }}>{user.name}</h2>
                <span className="badge badge-saffron" style={{ fontSize: 11 }}>
                  ✓ {isHi ? 'सहकारी सदस्य' : 'COOP MEMBER'}
                </span>
              </div>
              <div style={{ fontSize: 13, color: '#FFB74D', marginTop: 4 }}>
                🆔 {user.memberId} • {isHi ? 'सत्यापित गृहस्थ खाता' : 'Verified Household Profile'}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Body */}
        <div style={{ padding: '24px' }}>
          <div style={{ display: 'grid', gap: 14, marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: 'var(--bg)', borderRadius: 'var(--r-md)' }}>
              <Phone size={18} color="var(--primary-navy)" />
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700 }}>{isHi ? 'मोबाइल नंबर' : 'Phone Number'}</div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{user.phone}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: 'var(--bg)', borderRadius: 'var(--r-md)' }}>
              <Building size={18} color="var(--saffron-dark)" />
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700 }}>{isHi ? 'संबद्ध सहकारी सोसायटी' : 'Affiliated Cooperative Society'}</div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{user.society}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: 'var(--bg)', borderRadius: 'var(--r-md)' }}>
              <MapPin size={18} color="var(--coop-green)" />
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700 }}>{isHi ? 'पंजीकृत पता' : 'Registered Household Address'}</div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{user.address} ({user.pincode})</div>
              </div>
            </div>
          </div>

          {/* Member Impact KPI */}
          <div style={{ background: 'var(--green-pale)', border: '1.5px solid #A7F3D0', borderRadius: 'var(--r-lg)', padding: '16px', marginBottom: 20 }}>
            <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--green-dark)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Heart size={16} /> {isHi ? 'सहकारी सामाजिक प्रभाव' : 'Your Cooperative Fair Living Wage Impact'}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text)', marginTop: 4 }}>
              {isHi ? 'आपने सीधे 88% फेयर लिविंग वेज के जरिए स्थानीय कारीगरों को सहायता पहुंचाई है।' : 'Through 88% living wage transparency, your bookings directly fund local worker welfare.'}
            </div>
          </div>

          {/* Action Controls & Logout */}
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={handleLogout}
              className="btn btn-outline"
              style={{ flex: 1, padding: 12, borderColor: 'var(--sos)', color: 'var(--sos)', fontWeight: 700 }}
            >
              <LogOut size={16} /> {isHi ? 'लॉग आउट (Log Out)' : 'Log Out Account'}
            </button>
            <button
              onClick={onClose}
              className="btn btn-primary"
              style={{ flex: 1, padding: 12 }}
            >
              {isHi ? 'होम पर लौटें' : 'Back to Platform'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
