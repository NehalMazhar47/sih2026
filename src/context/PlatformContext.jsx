import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  COOPERATIVE_SOCIETIES,
  SERVICE_CATEGORIES,
  VERIFIED_WORKERS,
  PENDING_VERIFICATION_WORKERS,
  WELFARE_PROGRAMS,
  AI_SEASONAL_FORECAST,
  NCCT_UPSKILLING_COURSES
} from '../data/initialData';
import { translations } from '../data/translations';
import confetti from 'canvas-confetti';

const PlatformContext = createContext();

export const PlatformProvider = ({ children }) => {
  // Navigation & Multi-Role Persona
  const [role, setRole] = useState('customer'); // 'customer' | 'worker' | 'admin'
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('sahakar_language') || 'en';
  });

  const setLanguage = (lang) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('sahakar_language', lang);
    } catch (e) {}
  };

  useEffect(() => {
    const handleLangEvent = (e) => {
      if (e.detail) setLanguage(e.detail);
    };
    window.addEventListener('set-platform-language', handleLangEvent);
    return () => window.removeEventListener('set-platform-language', handleLangEvent);
  }, []);

  const [isMobileView, setIsMobileView] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Entities Data
  const [workers, setWorkers] = useState(VERIFIED_WORKERS);
  const [pendingWorkers, setPendingWorkers] = useState(PENDING_VERIFICATION_WORKERS);
  const [societies, setSocieties] = useState(COOPERATIVE_SOCIETIES);
  const [categories] = useState(SERVICE_CATEGORIES);
  const [welfarePrograms, setWelfarePrograms] = useState(WELFARE_PROGRAMS);
  const [upskillingCourses, setUpskillingCourses] = useState(NCCT_UPSKILLING_COURSES);

  // Logged-in Worker Persona State (Mapped to Worker wkr-101: Satish Kumar Verma)
  const [currentWorker, setCurrentWorker] = useState(VERIFIED_WORKERS[0]);
  const [workerDuty, setWorkerDuty] = useState({
    isOnDuty: true,
    isEmergencyResponder: true
  });
  const [workerEarnings, setWorkerEarnings] = useState({
    todayGross: 1450,
    monthGross: 32400,
    gigsCompletedCount: 428,
    welfareBalance: 18450,
    pensionBalance: 12600
  });

  // Loans State
  const [workerLoans, setWorkerLoans] = useState([
    {
      id: "LN-8821",
      purpose: "Heavy Duty Bosch Hammer Drill Kit",
      amount: 12000,
      interestRate: "0% (NCCT Subsidized)",
      status: "Active - On Schedule",
      repaid: 7000,
      monthlyDeduction: 1000
    }
  ]);

  // Active Customer Booking State
  const [activeBooking, setActiveBooking] = useState(null);
  const [bookingHistory, setBookingHistory] = useState([
    {
      id: "BK-9021",
      category: "electrician",
      serviceName: "Switchboard Rewiring & MCB Tripping Fix",
      workerName: "Satish Kumar Verma",
      workerAvatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80",
      societyName: "Delhi Shramik Sahakari Federation",
      date: "2026-09-02",
      amount: 450,
      workerWage: 396,
      welfareContribution: 31.5,
      platformNcctShare: 22.5,
      rating: 5,
      otp: "8914",
      status: "completed",
      isEmergency: false
    }
  ]);

  // AI Forecasting & Simulation State
  const [activeAiScenario, setActiveAiScenario] = useState("diwali");
  const [reallocatedWorkersTotal, setReallocatedWorkersTotal] = useState(48);

  // Voice Assistant Synthesis
  const speakText = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    // Attempt to pick Indian voice if available
    const voices = window.speechSynthesis.getVoices();
    const indianVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('IN'));
    if (indianVoice) utterance.voice = indianVoice;
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  const showToast = (title, message, type = 'info') => {
    setToastMessage({ title, message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Helper translation getter
  const t = (key) => {
    const langDict = translations[language] || translations.en;
    return langDict[key] || translations.en[key] || key;
  };

  // Action: Customer places a booking
  const createBooking = (bookingData) => {
    const newBooking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: 'assigned', // assigned -> en_route -> arrived -> in_progress -> completed
      otp: Math.floor(1000 + Math.random() * 9000).toString(),
      ...bookingData
    };
    setActiveBooking(newBooking);
    showToast("Booking Confirmed!", `Assigned to ${newBooking.workerName} from ${newBooking.societyName}`, "success");
    speakText(`Booking confirmed. Your cooperative artisan is ${newBooking.workerName}. Security OTP is ${newBooking.otp.split('').join(' ')}.`);
  };

  // Action: Advance booking stage
  const advanceBookingStatus = (nextStatus) => {
    if (!activeBooking) return;
    const updated = { ...activeBooking, status: nextStatus };
    setActiveBooking(updated);

    if (nextStatus === 'en_route') {
      showToast("Artisan En Route", `${updated.workerName} is travelling to your location. ETA 12 mins.`, "info");
      speakText(`${updated.workerName} is on the way. Please keep your OTP ready.`);
    } else if (nextStatus === 'arrived') {
      showToast("Artisan Arrived", `Please verify OTP with ${updated.workerName}`, "warning");
      speakText(`${updated.workerName} has arrived at your doorstep. Please share your OTP.`);
    } else if (nextStatus === 'in_progress') {
      showToast("Service In Progress", `Work safely started under cooperative standard checklist.`, "info");
    } else if (nextStatus === 'completed') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      // Add to completed history
      setBookingHistory([updated, ...bookingHistory]);
      showToast("Service Completed Successfully!", `Digital invoice generated. 88% fair wage credited to ${updated.workerName}`, "success");
      speakText(`Service completed. Fair living wage has been credited to ${updated.workerName}.`);
      
      // Update Worker Earnings & Welfare
      setWorkerEarnings(prev => ({
        ...prev,
        todayGross: prev.todayGross + updated.workerWage,
        monthGross: prev.monthGross + updated.workerWage,
        gigsCompletedCount: prev.gigsCompletedCount + 1,
        welfareBalance: prev.welfareBalance + updated.welfareContribution,
        pensionBalance: prev.pensionBalance + (updated.welfareContribution * 0.5)
      }));
    }
  };

  // Action: Admin approves worker
  const approveWorkerVerification = (pendingId) => {
    const workerToApprove = pendingWorkers.find(p => p.id === pendingId);
    if (!workerToApprove) return;

    const newVerifiedWorker = {
      id: `wkr-${Date.now()}`,
      name: workerToApprove.name,
      trade: workerToApprove.trade,
      societyId: "soc-1",
      societyName: workerToApprove.societyName,
      ncctCertId: `NCCT-${workerToApprove.trade.toUpperCase().slice(0, 3)}-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      ncctLevel: "Level 4 (NCCT Certified Master)",
      experienceYears: 6,
      rating: 5.0,
      ratingCount: 1,
      gigsCompleted: 0,
      isAvailable: true,
      isEmergencyResponder: true,
      phone: "+91 98765 43210",
      aadhaarVerified: true,
      policeVerified: true,
      toolsCertified: true,
      coordinates: [28.6140, 77.2100],
      hourlyRate: 350,
      avatarUrl: workerToApprove.avatarUrl,
      welfareBalance: 5000,
      badges: ["NCCT New Master", "Police Cleared", "Coop Member"],
      recentReview: "Freshly inducted into cooperative federation with distinction."
    };

    setWorkers([newVerifiedWorker, ...workers]);
    setPendingWorkers(pendingWorkers.filter(p => p.id !== pendingId));
    confetti({ particleCount: 50, spread: 60 });
    showToast("Worker Verified!", `${workerToApprove.name} has been certified and issued NCCT Badge.`, "success");
  };

  // Action: Request Distress Loan
  const applyDistressLoan = (loanData) => {
    const newLoan = {
      id: `LN-${Math.floor(1000 + Math.random() * 9000)}`,
      purpose: loanData.purpose,
      amount: Number(loanData.amount),
      interestRate: "0% (NCCT & Cooperative Subsidized)",
      status: "Approved - Disbursed to Bank Account",
      repaid: 0,
      monthlyDeduction: Math.round(Number(loanData.amount) / 6)
    };
    setWorkerLoans([newLoan, ...workerLoans]);
    confetti({ particleCount: 40 });
    showToast("Loan Sanctioned!", `₹${loanData.amount} disbursed immediately under Cooperative Welfare Fund.`, "success");
    speakText(`Zero interest distress loan of rupees ${loanData.amount} has been sanctioned.`);
  };

  // Action: AI Reallocation Trigger
  const triggerAiReallocation = (count = 25) => {
    setReallocatedWorkersTotal(prev => prev + count);
    confetti({ particleCount: 70, spread: 80 });
    showToast("AI Workforce Rebalanced", `${count} artisans reallocated from rural buffer to high-demand urban clusters with 15% bonus stipend.`, "success");
    speakText(`AI workforce rebalance executed. ${count} workers mobilized.`);
  };

  // triggerToast — simple alias used by rebuilt components
  const triggerToast = (message) => {
    setToastMessage(typeof message === 'string' ? message : message?.message || String(message));
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <PlatformContext.Provider
      value={{
        role,
        setRole,
        language,
        setLanguage,
        isMobileView,
        setIsMobileView,
        t,
        workers,
        pendingWorkers,
        societies,
        categories,
        welfarePrograms,
        upskillingCourses,
        currentWorker,
        workerDuty,
        setWorkerDuty,
        workerEarnings,
        workerLoans,
        activeBooking,
        setActiveBooking,
        bookingHistory,
        createBooking,
        advanceBookingStatus,
        approveWorkerVerification,
        applyDistressLoan,
        activeAiScenario,
        setActiveAiScenario,
        reallocatedWorkersTotal,
        triggerAiReallocation,
        speakText,
        showToast,
        triggerToast,
        toastMessage,
        setToastMessage,
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatform = () => useContext(PlatformContext);
