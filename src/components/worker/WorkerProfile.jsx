import React from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { ShieldCheck, Award, QrCode, CheckCircle, Wrench, FileCheck, Phone, MapPin, Building, LogOut } from 'lucide-react';

export const WorkerProfile = () => {
  const { currentWorker, language, logoutUser } = usePlatform();
  const isHi = language === 'hi';

  const verifiedTools = isHi ? [
    "फ्लूक डिजिटल मल्टीमीटर (CAT III 600V)",
    "1000V इंसुलेटेड VDE स्क्रूड्राइवर सेट",
    "बॉश रोटरी हैमर ड्रिल मशीन (GBH 2-20)",
    "गैर-संपर्क एसी वोल्टेज डिटेक्टर",
    "इंसुलेटेड सुरक्षा दस्ताने एवं ISI सुरक्षा हेलमेट"
  ] : [
    "Fluke Digital Multimeter (CAT III 600V)",
    "1000V Insulated VDE Screwdriver Set",
    "Bosch Rotary Hammer Drill (GBH 2-20)",
    "Non-Contact AC Voltage Detector",
    "Insulated Safety Gloves & ISI Helmet"
  ];

  return (
    <div style={{ maxWidth: '780px', margin: '0 auto' }}>
      {/* Official Cooperative Digital ID Card */}
      <div
        style={{
          background: 'linear-gradient(135deg, #091a32 0%, #15325c 50%, #0c203f 100%)',
          border: '2px solid var(--saffron)',
          borderRadius: '24px',
          padding: '28px',
          boxShadow: '0 20px 45px rgba(0,0,0,0.6), 0 0 25px rgba(244,140,6,0.25)',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '28px'
        }}
      >
        {/* Top Ribbon */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '14px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', background: 'var(--saffron)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={24} color="#ffffff" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '15px', letterSpacing: '0.04em', color: '#ffffff' }}>
                {isHi ? "राष्ट्रीय सहकारी प्रशिक्षण परिषद (NCCT)" : "NATIONAL COUNCIL FOR COOPERATIVE TRAINING"}
              </div>
              <div style={{ fontSize: '11px', color: '#34d399' }}>
                {isHi ? "सहकारिता मंत्रालय • डिजिटल कारीगर पहचान पत्र" : "Ministry of Cooperation • Digital Artisan Credential"}
              </div>
            </div>
          </div>

          <span className="badge badge-saffron" style={{ fontSize: '11px' }}>
            {isHi ? "NCCT लेवल-4 मास्टर" : "NCCT LEVEL-4 MASTER"}
          </span>
        </div>

        {/* Card Body */}
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Avatar with Gold Border */}
          <div style={{ position: 'relative' }}>
            <img
              src={currentWorker.avatarUrl}
              alt={currentWorker.name}
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '20px',
                objectFit: 'cover',
                border: '3px solid var(--saffron)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.5)'
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-8px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#10b981',
                color: 'white',
                fontSize: '10px',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '12px',
                whiteSpace: 'nowrap'
              }}
            >
              {isHi ? "सत्यापित" : "VERIFIED"}
            </div>
          </div>

          {/* Details */}
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff' }}>{currentWorker.name}</h2>
            <div style={{ fontSize: '13px', color: 'var(--saffron-light)', fontWeight: 600, marginTop: '2px' }}>
              {isHi ? "व्यवसाय: मुख्य इलेक्ट्रीशियन एवं सोलर इन्वर्टर विशेषज्ञ" : "Trade: Master Electrician & Solar Inverter Specialist"}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '14px', fontSize: '12px' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>{isHi ? "सहकारी समिति:" : "Cooperative Society:"}</span>
                <div style={{ fontWeight: 600, color: '#ffffff' }}>{currentWorker.societyName}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>{isHi ? "NCCT प्रमाण पत्र क्रमांक:" : "NCCT Certificate ID:"}</span>
                <div style={{ fontWeight: 700, color: '#38bdf8' }}>{currentWorker.ncctCertId}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>{isHi ? "कार्य अनुभव:" : "Experience:"}</span>
                <div style={{ fontWeight: 600, color: '#ffffff' }}>{currentWorker.experienceYears} {isHi ? "वर्ष पंजीकृत" : "Years Registered"}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>{isHi ? "रेटिंग:" : "Rating:"}</span>
                <div style={{ fontWeight: 700, color: '#ffba08' }}>★ {currentWorker.rating} ({currentWorker.ratingCount} {isHi ? "समीक्षाएं" : "Reviews"})</div>
              </div>
            </div>
          </div>

          {/* QR Code for instant consumer scan */}
          <div
            style={{
              background: '#ffffff',
              padding: '12px',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
            }}
          >
            <div style={{ width: '80px', height: '80px', background: '#091a32', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <QrCode size={64} color="#ffffff" />
            </div>
            <span style={{ fontSize: '9px', fontWeight: 700, color: '#091a32', marginTop: '4px' }}>
              {isHi ? "सत्यापन हेतु स्कैन करें" : "SCAN TO VERIFY"}
            </span>
          </div>
        </div>

        {/* Verification Checkmarks Footer */}
        <div
          style={{
            marginTop: '22px',
            paddingTop: '14px',
            borderTop: '1px solid rgba(255,255,255,0.12)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '11px',
            flexWrap: 'wrap',
            gap: '10px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#34d399' }}>
            <CheckCircle size={14} /> {isHi ? "आधार e-KYC प्रमाणित" : "Aadhaar e-KYC Linked"}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#34d399' }}>
            <CheckCircle size={14} /> {isHi ? "पुलिस सत्यापन (PCC-DL-491)" : "Police Clearance (PCC-DL-491)"}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#34d399' }}>
            <CheckCircle size={14} /> {isHi ? "NCCT प्रैक्टिकल लैब उत्तीर्ण (98%)" : "NCCT Practical Lab Passed (98%)"}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#34d399' }}>
            <CheckCircle size={14} /> {isHi ? "औजार सुरक्षा प्रमाणित" : "Tool Safety Certified"}
          </div>
        </div>
      </div>

      {/* Verified Professional Toolset Inventory */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Wrench size={20} color="var(--saffron)" />
          <h3 style={{ fontSize: '18px' }}>
            {isHi ? "प्रमाणित औजार सूची एवं सुरक्षा उपकरण" : "Certified Tool Inventory & Safety Gear"}
          </h3>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
          {isHi ? "क्षेत्रीय सहकारी प्रबंधन संस्थान (RICM) कार्यशाला द्वारा वार्षिक रूप से प्रमाणित।" : "Inspected annually at the Regional Institute of Cooperative Management (RICM) training workshop."}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {verifiedTools.map((tool, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(255,255,255,0.03)',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.06)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
                <CheckCircle size={16} color="#10b981" />
                <span>{tool}</span>
              </div>
              <span className="badge badge-emerald" style={{ fontSize: '9px' }}>
                {isHi ? "ISI प्रमाणित" : "ISI Verified"}
              </span>
            </div>
          ))}
        </div>

        {/* Log Out Control Bar */}
        <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text)' }}>
              {isHi ? "श्रमिक खाता सत्र" : "Shramik Account Session"}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {isHi ? "सुरक्षित रूप से बाहर निकलने हेतु लॉग आउट करें" : "Logged in as Satish Kumar Verma (NCCT Level 4)"}
            </div>
          </div>
          <button
            onClick={logoutUser}
            className="btn btn-outline"
            style={{ borderColor: 'var(--sos)', color: 'var(--sos)', fontWeight: 700, padding: '10px 18px' }}
          >
            <LogOut size={16} /> {isHi ? "लॉग आउट करें (Log Out)" : "Log Out Shramik Account"}
          </button>
        </div>
      </div>
    </div>
  );
};
