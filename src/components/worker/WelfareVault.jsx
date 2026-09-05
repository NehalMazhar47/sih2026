import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import {
  ShieldAlert,
  ShieldCheck,
  Coins,
  Wrench,
  GraduationCap,
  HeartHandshake,
  CheckCircle2,
  TrendingUp,
  PlusCircle,
  X,
  CreditCard,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const WelfareVault = () => {
  const {
    welfarePrograms,
    upskillingCourses,
    workerLoans,
    applyDistressLoan,
    workerEarnings,
    showToast,
    language,
    t
  } = usePlatform();

  const isHi = language === 'hi';

  const [showLoanModal, setShowLoanModal] = useState(false);
  const [loanAmount, setLoanAmount] = useState(15000);
  const [loanPurpose, setLoanPurpose] = useState(isHi ? "थर्मल इमेजिंग रिसाव डिटेक्टर औजार" : "Thermal Imaging Leak Detector Tool");
  const [enrolledCourses, setEnrolledCourses] = useState(["ncct-crs-1"]);

  const handleEnrollCourse = (courseId, title) => {
    if (enrolledCourses.includes(courseId)) {
      showToast(isHi ? "पहले से नामांकित" : "Already Enrolled", isHi ? `आप ${title} में पहले से पंजीकृत हैं।` : `You are actively registered in ${title}.`, "info");
      return;
    }
    setEnrolledCourses([...enrolledCourses, courseId]);
    confetti({ particleCount: 50, spread: 60 });
    showToast(isHi ? "वाउचर भुनाया गया!" : "Voucher Redeemed!", isHi ? `${title} में नामांकन सफल। ₹2,500 का स्टाइपेंड सहकारिता मंत्रालय द्वारा प्रायोजित।` : `Enrolled in ${title}. ₹2,500 stipend sponsored by Ministry of Cooperation.`, "success");
  };

  const handleLoanSubmit = (e) => {
    e.preventDefault();
    applyDistressLoan({
      purpose: loanPurpose,
      amount: loanAmount
    });
    setShowLoanModal(false);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header Banner */}
      <div
        className="glass-panel"
        style={{
          padding: '28px',
          marginBottom: '26px',
          background: 'linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(14,35,68,0.85) 100%)',
          border: '1.5px solid var(--emerald)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-emerald">{isHi ? "सार्वभौमिक सामाजिक सुरक्षा" : "Universal Social Security"}</span>
              <span className="badge badge-saffron">{isHi ? "शून्य अतिरिक्त खर्च" : "Zero Out-Of-Pocket Cost"}</span>
            </div>
            <h2 style={{ fontSize: '24px', marginTop: '6px' }}>
              {isHi ? "श्रमिक कल्याण एवं सामाजिक सुरक्षा कोष" : "Worker Welfare & Social Security Vault"}
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', maxWidth: '640px' }}>
              {isHi ? "निजी गिग कंपनियों के विपरीत जो श्रमिकों को अधिकारहीन मानती हैं, सहकार सेवा पर प्रत्येक सेवा से आपका आयुष्मान भारत स्वास्थ्य कार्ड, PMJJBY जीवन बीमा, PM-SYM पेंशन एवं संकटकालीन ऋण स्वतः वित्तपोषित होता है।" : "Unlike private gig platforms that treat workers as disposable contractors, every gig on SahakarSeva automatically funds your Ayushman Bharat health card, PMJJBY life insurance, PM-SYM pension, and distress micro-credit."}
            </p>
          </div>

          <div style={{ textAlign: 'right', background: 'rgba(0,0,0,0.3)', padding: '14px 20px', borderRadius: '16px', border: '1px solid rgba(16,185,129,0.3)' }}>
            <span style={{ fontSize: '11px', color: '#34d399', textTransform: 'uppercase', fontWeight: 700 }}>
              {isHi ? "आपका संचित कल्याण कोष" : "Your Accumulated Welfare Pool"}
            </span>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', margin: '2px 0' }}>
              ₹{workerEarnings.welfareBalance.toLocaleString()}
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              {isHi ? "प्रत्येक कार्य के 7% से स्वतः संचित" : "Auto-deducted from 7% gig allocation"}
            </span>
          </div>
        </div>
      </div>

      {/* Welfare Programs Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        {/* Ayushman Bharat PM-JAY Card */}
        <div className="glass-panel" style={{ padding: '22px', border: '1px solid rgba(16,185,129,0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldAlert size={22} color="#10b981" />
            </div>
            <span className="badge badge-emerald">{isHi ? "सक्रिय बीमा कवर" : "ACTIVE COVER"}</span>
          </div>

          <h3 style={{ fontSize: '17px', fontWeight: 700 }}>{isHi ? "आयुष्मान भारत (PM-JAY)" : "Ayushman Bharat (PM-JAY)"}</h3>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', margin: '6px 0' }}>
            ₹5,00,000 / {isHi ? "वार्षिक" : "Year"}
          </div>
          <div style={{ fontSize: '12px', color: '#34d399', fontWeight: 600 }}>
            {isHi ? "कैशलेस द्वितीयक एवं तृतीयक अस्पताल उपचार" : "Cashless Secondary & Tertiary Hospital Care"}
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px', lineHeight: 1.4 }}>
            {isHi ? "28,000+ सरकारी एवं निजी अस्पतालों में मान्य। सहकारी महासंघ द्वारा सपरिवार नवीनीकृत पॉलिसी।" : "Empanelled across 28,000+ public and private hospitals. Family floater policy renewed by Cooperative Federation."}
          </p>
          <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: '11px', color: 'var(--text-muted)' }}>
            {isHi ? "ई-कार्ड संख्या:" : "E-Card No:"} <b>PMJAY-COOP-8821049-A</b>
          </div>
        </div>

        {/* PMJJBY & PMSBY Life & Accident Bima */}
        <div className="glass-panel" style={{ padding: '22px', border: '1px solid rgba(244,140,6,0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(244,140,6,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={22} color="#f48c06" />
            </div>
            <span className="badge badge-saffron">{isHi ? "प्रीमियम भुगतान पूर्ण" : "PREMIUM PAID"}</span>
          </div>

          <h3 style={{ fontSize: '17px', fontWeight: 700 }}>{isHi ? "PMJJBY एवं PMSBY बीमा कॉम्बो" : "PMJJBY & PMSBY Bima Combo"}</h3>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', margin: '6px 0' }}>
            ₹4,00,000 {isHi ? "कुल कवर" : "Total Cover"}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--saffron-light)', fontWeight: 600 }}>
            {isHi ? "₹2 लाख जीवन बीमा + ₹2 लाख दुर्घटना कवर" : "₹2L Term Life + ₹2L Accidental Disability"}
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px', lineHeight: 1.4 }}>
            {isHi ? "आपके परिवार हेतु पूर्ण वित्तीय सुरक्षा। सहकारी कल्याण कोष से निर्बाध वार्षिक प्रीमियम कटौती।" : "Full financial security for your family. Annual premium of ₹456 deducted seamlessly from cooperative welfare reserve."}
          </p>
          <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: '11px', color: 'var(--text-muted)' }}>
            {isHi ? "बीमा प्रदाता:" : "Policy Underwriter:"} <b>भारतीय जीवन बीमा निगम (LIC)</b>
          </div>
        </div>

        {/* PM-SYM Pension Tracker */}
        <div className="glass-panel" style={{ padding: '22px', border: '1px solid rgba(59,130,246,0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(59,130,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Coins size={22} color="#3b82f6" />
            </div>
            <span className="badge badge-blue">{isHi ? "भविष्य सुरक्षित" : "RETIREMENT READY"}</span>
          </div>

          <h3 style={{ fontSize: '17px', fontWeight: 700 }}>{isHi ? "PM-SYM सहकार पेंशन" : "PM-SYM Sahakar Pension"}</h3>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', margin: '6px 0' }}>
            ₹3,000 / {isHi ? "प्रति माह" : "Month"}
          </div>
          <div style={{ fontSize: '12px', color: '#93c5fd', fontWeight: 600 }}>
            {isHi ? "60 वर्ष उपरांत गारंटीशुदा मासिक पेंशन" : "Guaranteed Pension after 60 Years"}
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px', lineHeight: 1.4 }}>
            {isHi ? "केंद्र सरकार द्वारा 50% समान अंशदान। प्रति 10 सेवाओं पर स्वतः पेंशन PRAN खाते में जमा।" : "50% matched by Central Government. Every 10 gigs add automated micro-deposits directly to your Pension PRAN ledger."}
          </p>
          <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: '11px', color: 'var(--text-muted)' }}>
            {isHi ? "वर्तमान पेंशन कोष:" : "Current PRAN Corpus:"} <b style={{ color: '#38bdf8' }}>₹{workerEarnings.pensionBalance.toLocaleString()}</b>
          </div>
        </div>
      </div>

      {/* 0% Interest Tool & Distress Loans Section */}
      <div className="glass-panel" style={{ padding: '26px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Wrench size={22} color="var(--saffron)" />
              <h3 style={{ fontSize: '20px' }}>{isHi ? "सहकार उपकरण एवं संकटकालीन सूक्ष्म-ऋण" : "Sahakar Equipment & Distress Micro-Credit"}</h3>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
              {isHi ? "बिजली औजारों, वाहन मरम्मत अथवा चिकित्सा आपातकाल हेतु शून्य प्रतिशत ब्याज ऋण।" : "Zero-interest or low-interest micro-loans for power tools, vehicle repair, or medical emergencies."}
            </p>
          </div>

          <button
            id="apply-tool-loan-btn"
            onClick={() => setShowLoanModal(true)}
            className="btn-primary"
            style={{ fontSize: '13px' }}
          >
            <PlusCircle size={16} /> {isHi ? "0% ब्याज औजार ऋण हेतु आवेदन करें" : "Request Zero-Interest Tool Loan"}
          </button>
        </div>

        {/* Existing Active Loans Table */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {workerLoans.map(loan => (
            <div
              key={loan.id}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '14px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 700, fontSize: '15px' }}>
                    {isHi ? (loan.purpose.includes("Thermal") ? "थर्मल इमेजिंग लीक डिटेक्टर औजार" : loan.purpose) : loan.purpose}
                  </span>
                  <span className="badge badge-saffron" style={{ fontSize: '10px' }}>{loan.id}</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {isHi ? "ब्याज दर:" : "Interest:"} <b style={{ color: '#34d399' }}>{isHi ? "0% (सहकारी)" : loan.interestRate}</b> • {isHi ? "चुकता:" : "Repaid:"} ₹{loan.repaid} / ₹{loan.amount}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{isHi ? "प्रति कार्य स्वतः कटौती" : "Auto-deducted per gig"}</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>₹{loan.monthlyDeduction}/{isHi ? "माह" : "mo"}</div>
                </div>
                <span className="badge badge-emerald">
                  <CheckCircle2 size={12} /> {isHi ? "नियमित (सक्रिय)" : loan.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NCCT Free Upskilling Vouchers Section */}
      <div className="glass-panel" style={{ padding: '26px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
          <GraduationCap size={24} color="#06b6d4" />
          <div>
            <h3 style={{ fontSize: '20px' }}>{isHi ? "NCCT निःशुल्क कौशल उन्नयन पाठ्यक्रम एवं प्रमाणन" : "NCCT Free Upskilling Courses & Certification"}</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {isHi ? "राष्ट्रीय सहकारी प्रशिक्षण परिषद (NCCT) द्वारा 100% प्रायोजित। उच्च पारिश्रमिक दरें अनलॉक करने हेतु पाठ्यक्रम पूर्ण करें।" : "100% sponsored by the National Council for Cooperative Training. Complete courses to unlock higher job rates."}
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {upskillingCourses.map(course => {
            const isEnrolled = enrolledCourses.includes(course.id);
            return (
              <div
                key={course.id}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: isEnrolled ? '1.5px solid #10b981' : '1px solid var(--primary-border)',
                  borderRadius: '14px',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span className="badge badge-blue" style={{ fontSize: '10px' }}>
                    {isHi ? (course.duration.includes("Days") ? `${course.duration.replace("Days", "दिन")}` : course.duration) : course.duration}
                  </span>
                  <span className="badge badge-emerald" style={{ fontSize: '10px' }}>
                    {isHi ? `${course.stipend} स्टाइपेंड` : course.stipend}
                  </span>
                </div>

                <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff' }}>
                  {isHi ? (course.title.includes("Solar") ? "सोलर रूफटॉप एवं ग्रिड इन्वर्टर संस्थापन" : (course.title.includes("EV") ? "ईवी होम चार्जर संस्थापन एवं सुरक्षा" : "उन्नत डायग्नोस्टिक एवं स्मार्ट प्लंबिंग")) : course.title}
                </h4>
                <div style={{ fontSize: '12px', color: '#38bdf8' }}>
                  {isHi ? "प्रमाणन:" : "Certification:"} {course.certification}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {isHi ? "प्रायोजक: राष्ट्रीय सहकारी प्रशिक्षण परिषद (NCCT)" : `Sponsor: ${course.sponsoredBy}`}
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
                  <button
                    onClick={() => handleEnrollCourse(course.id, course.title)}
                    className={isEnrolled ? "btn-emerald" : "btn-primary"}
                    style={{ width: '100%', fontSize: '12px', padding: '8px' }}
                  >
                    {isEnrolled ? (isHi ? "✓ नामांकित (प्रशिक्षण जारी)" : "✓ Enrolled (In Training)") : (isHi ? "मुफ्त NCCT वाउचर प्राप्त करें" : "Claim Free NCCT Voucher")}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Loan Request Modal */}
      {showLoanModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Wrench size={22} color="var(--saffron)" />
                <h3 style={{ fontSize: '20px' }}>
                  {isHi ? "0% ब्याज औजार एवं संकटकालीन ऋण आवेदन" : "Apply 0% Tool & Distress Credit"}
                </h3>
              </div>
              <button
                onClick={() => setShowLoanModal(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleLoanSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  {isHi ? "ऋण का उद्देश्य (औजार / प्रशिक्षण / चिकित्सा)" : "Loan Purpose (Equipment / Training / Medical)"}
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={loanPurpose}
                  onChange={(e) => setLoanPurpose(e.target.value)}
                  required
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  {isHi ? "ऋण राशि (अधिकतम ₹25,000 शून्य-ब्याज)" : "Loan Amount (Max ₹25,000 Zero-Interest)"}
                </label>
                <select
                  className="form-select"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                >
                  <option value={5000} style={{ background: '#091a32' }}>{isHi ? "₹5,000 (सुरक्षा उपकरण एवं मीटर)" : "₹5,000 (Safety Gear & Meter)"}</option>
                  <option value={10000} style={{ background: '#091a32' }}>{isHi ? "₹10,000 (पावर टूल अपग्रेड)" : "₹10,000 (Power Tool Upgrade)"}</option>
                  <option value={15000} style={{ background: '#091a32' }}>{isHi ? "₹15,000 (व्यावसायिक डायग्नोस्टिक किट)" : "₹15,000 (Professional Diagnostic Kit)"}</option>
                  <option value={25000} style={{ background: '#091a32' }}>{isHi ? "₹25,000 (सोलर / ईवी विशेष उपकरण)" : "₹25,000 (Solar / EV Specialized Equipment)"}</option>
                </select>
              </div>

              <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '10px', padding: '12px', marginBottom: '20px', fontSize: '12px', color: '#34d399' }}>
                <div style={{ fontWeight: 700, marginBottom: '4px' }}>{isHi ? "सहकारी गारंटी:" : "Cooperative Guarantee:"}</div>
                {isHi ? (
                  <>
                    • सहकारिता मंत्रालय कारीगर निधि के तहत 0% ब्याज।<br />
                    • भविष्य के कार्यों में से ₹100 की आसान किस्त में स्वतः भुगतान।
                  </>
                ) : (
                  <>
                    • 0% interest under Ministry of Cooperation Artisans Fund.<br />
                    • Repayable seamlessly through ₹100 deduction on future gig completions.
                  </>
                )}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowLoanModal(false)}
                  className="btn-secondary"
                  style={{ flex: 1 }}
                >
                  {isHi ? "रद्द करें" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ flex: 2 }}
                >
                  {isHi ? "सीधे बैंक में तुरंत प्राप्त करें" : "Instant Disburse to Bank"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
