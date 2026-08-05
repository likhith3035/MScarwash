'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'te';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    home: 'Home',
    bookWash: 'Book Service',
    pricing: 'Pricing & Services',
    adminDesk: 'Admin Desk',
    heroTag: 'Srikalahasti Vehicle Wash & Car Service Center',
    heroTitle: 'Clean Car & Full Repair.',
    heroSubtitle: 'Happy & Safe Ride.',
    heroDesc: 'Scratch-free foam washing, complete car mechanic repairs, engine service & doorstep pickup in Srikalahasti.',
    bookPickupOrSlot: 'Book Wash or Repair',
    viewPricing: 'View Services & Pricing',
    scratchFree: '100% Scratch Free Wash',
    allCarRepairs: 'All Car Repairs & Mechanic Service',
    freePerks: 'Free Water + Tissue Box',
    perksTitle: 'Free Perks With Every Car Wash',
    perksDesc: 'Every wash customer gets a complimentary mineral water bottle and car tissue paper box.',
    freeWater: 'Free Mineral Water Bottle',
    freeWaterDesc: 'Chilled, sealed drinking water bottle handed over to every customer after wash completion.',
    freeTissue: 'Free Car Tissue Paper Box',
    freeTissueDesc: 'A dashboard tissue box included free with every car & SUV wash service.',
    servicesTitle: 'Wash & Detailing Services',
    servicesDesc: 'Professional water washing, snow foam detailing & hygiene treatment.',
    repairsTitle: 'Complete Car Repairs & Mechanic Services',
    repairsDesc: 'Expert mechanics handling all types of vehicle maintenance & repairs in Srikalahasti.',
    engineOilService: 'Engine Diagnostic & Oil Change',
    engineOilDesc: 'Synthetic oil replacement, filter cleaning & computer engine diagnosis.',
    brakeSuspension: 'Brake & Suspension Repairs',
    brakeSuspensionDesc: 'Brake pad replacement, clutch work & suspension noise fixing.',
    carACService: 'Car AC Service & Gas Refill',
    carACDesc: 'AC filter deep clean, leak testing & cooling gas top-up.',
    electricalBattery: 'Electrical & Battery Repairs',
    electricalBatteryDesc: 'Wiring repair, alternator fix, battery replacement & lighting.',
    breakdownAssist: 'Emergency Breakdown Assist',
    breakdownAssistDesc: 'Towing, battery jumpstart & roadside emergency assistance in Srikalahasti.',
    vehiclesWeWash: 'Vehicles We Wash & Service',
    viewAllPrices: 'View All Prices',
    visitOurCenter: 'Visit Our Center',
    openInGoogleMaps: 'Open in Google Maps',
    // Booking page
    easyBooking: 'Easy Service Booking',
    bookVehicleWash: 'Book Wash or Car Repair',
    selectModeDesc: 'Select Doorstep Pickup or Service Center Slot Booking.',
    doorstepPickup: 'Doorstep Pickup',
    centerDriveIn: 'Center Drive-In',
    serviceCategory: 'Service Type *',
    waterWashCategory: 'Water Wash & Detailing',
    carRepairCategory: 'Car Repair & Mechanic Work',
    combinedCategory: 'Water Wash + Car Repair (Combo)',
    repairTypeLabel: 'Specific Repair Required (Optional)',
    slotRule: 'Book your slot before 10 AM on the day of service for guaranteed fast turnaround.',
    yourName: 'Your Name *',
    phoneNumber: 'Phone Number *',
    vehicleType: 'Vehicle Type *',
    vehicleModel: 'Vehicle Model *',
    pickupAddress: 'Pickup Address in Srikalahasti',
    pickupWindow: 'Preferred Pickup Window',
    preferredDate: 'Preferred Date',
    timeSlot: 'Time Slot',
    submitWhatsapp: 'Submit Request & Open WhatsApp',
    bookingReceived: 'Booking Received',
    openWhatsapp: 'Open WhatsApp',
    bookAnother: 'Book Another Service',
  },
  te: {
    home: 'హోమ్ (Home)',
    bookWash: 'బుక్ చేయండి (Book)',
    pricing: 'ధరలు & సర్వీసులు',
    adminDesk: 'అడ్మిన్ డెస్క్',
    heroTag: 'శ్రీకాళహస్తి వెహికల్ వాష్ & కార్ రిపేర్ సెంటర్',
    heroTitle: 'శుభ్రమైన కారు & సంపూర్ణ రిపేర్.',
    heroSubtitle: 'సురక్షితమైన ప్రయాణం.',
    heroDesc: 'శ్రీకాళహస్తిలో గీతలు పడని ఫోమ్ వాషింగ్, అన్ని రకాల కార్ మెకానిక్ రిపేర్లు, ఇంజన్ సర్వీస్ మరియు డోర్‌స్టెప్ పికప్.',
    bookPickupOrSlot: 'వాష్ / రిపేర్ బుక్ చేయండి',
    viewPricing: 'ధరలు & వివరాలు చూడండి',
    scratchFree: '100% స్క్రాచ్ ఫ్రీ వాష్',
    allCarRepairs: 'అన్ని రకాల కార్ రిపేర్లు & మెకానిక్ సర్వీస్',
    freePerks: 'ఉచిత వాటర్ బాటిల్ + టిష్యూ బాక్స్',
    perksTitle: 'ప్రతి వాష్‌పై ఉచిత బహుమతులు',
    perksDesc: 'ప్రతి కస్టమర్‌కు ఒక ఉచిత మినరల్ వాటర్ బాటిల్ మరియు కార్ టిష్యూ బాక్స్ అందజేయబడుతుంది.',
    freeWater: 'ఉచిత మినరల్ వాటర్ బాటిల్',
    freeWaterDesc: 'వాష్ పూర్తయిన తర్వాత ప్రతి కస్టమర్‌కు చల్లని, సీల్ చేసిన మినరల్ వాటర్ బాటిల్ ఉచితంగా అందజేయబడుతుంది.',
    freeTissue: 'ఉచిత కార్ టిష్యూ బాక్స్',
    freeTissueDesc: 'ప్రతి కారు & SUV వాష్ సర్వీస్‌తో పాటు ఉచిత కార్ డాష్‌బోర్డ్ టిష్యూ బాక్స్ అందించబడుతుంది.',
    servicesTitle: 'వాష్ & డిటైలింగ్ సర్వీసెస్',
    servicesDesc: 'ప్రొఫెషనల్ వాటర్ వాషింగ్, స్నో ఫోమ్ డిటైలింగ్ & ఇంటీరియర్ క్లీనింగ్.',
    repairsTitle: 'అన్ని రకాల కార్ రిపేర్లు & మెకానిక్ సర్వీసులు',
    repairsDesc: 'శ్రీకాళహస్తిలో నిపుణులైన మెకానిక్స్ ద్వారా ఇంజన్, బ్రేక్స్, AC & ఎలక్ట్రికల్ రిపేర్లు.',
    engineOilService: 'ఇంజన్ చెకప్ & ఆయిల్ ఛేంజ్',
    engineOilDesc: 'సింథటిక్ ఇంజన్ ఆయిల్ మార్పిడి, ఫిల్టర్ క్లీనింగ్ & ఇంజన్ చెకప్.',
    brakeSuspension: 'బ్రేక్ & సస్పెన్షన్ రిపేర్లు',
    brakeSuspensionDesc: 'బ్రేక్ ప్యాడ్ల మార్పిడి, క్లచ్ వర్క్ & సస్పెన్షన్ సమస్యల పరిష్కారం.',
    carACService: 'కార్ AC సర్వీసింగ్ & గ్యాస్ నింపడం',
    carACDesc: 'AC ఫిల్టర్ క్లీనింగ్, లీకేజ్ చెకింగ్ & కూలింగ్ గ్యాస్ టాప్-అప్.',
    electricalBattery: 'ఎలక్ట్రికల్ & బ్యాటరీ సర్వీస్',
    electricalBatteryDesc: 'వైరింగ్ రిపేర్, బ్యాటరీ మార్పిడి & కార్ లైటింగ్ రిపేర్.',
    breakdownAssist: 'ఎమర్జెన్సీ రోడ్‌సైడ్ సహాయం (Breakdown)',
    breakdownAssistDesc: 'శ్రీకాళహస్తి పరిసరాల్లో కారు ఆగిపోతే రోడ్‌సైడ్ హెల్ప్ & టోయింగ్.',
    vehiclesWeWash: 'మేము సర్వీస్ చేసే వాహనాలు',
    viewAllPrices: 'అన్ని ధరలు చూడండి',
    visitOurCenter: 'మా సెంటర్‌ను సందర్శించండి',
    openInGoogleMaps: 'గూగుల్ మ్యాప్స్‌లో చూడండి',
    // Booking page
    easyBooking: 'సులభమైన సర్వీస్ బుకింగ్',
    bookVehicleWash: 'వాష్ లేదా కార్ రిపేర్ బుక్ చేయండి',
    selectModeDesc: 'డోర్‌స్టెప్ పికప్ లేదా సెంటర్ స్లాట్ బుకింగ్ ఎంచుకోండి.',
    doorstepPickup: 'ఇంటి దగ్గర పికప్ (Pickup)',
    centerDriveIn: 'వాష్ / రిపేర్ సెంటర్ వద్ద (Drive-In)',
    serviceCategory: 'సర్వీస్ రకం (Service Type) *',
    waterWashCategory: 'వాటర్ వాష్ & ఫోమ్ డిటైలింగ్',
    carRepairCategory: 'కార్ రిపేర్ & మెకానిక్ వర్క్',
    combinedCategory: 'వాటర్ వాష్ + కార్ రిపేర్ (Combo)',
    repairTypeLabel: 'మీ కారుకి ఏ రిపేర్ కావాలి? (Optional)',
    slotRule: 'సులభమైన సర్వీస్ కోసం ఉదయం 10 గంటల ముందే బుక్ చేసుకోండి.',
    yourName: 'మీ పేరు (Your Name) *',
    phoneNumber: 'ఫోన్ నంబర్ (Phone) *',
    vehicleType: 'వాహనం రకం (Vehicle Type) *',
    vehicleModel: 'వాహనం మోడల్ (Vehicle Model) *',
    pickupAddress: 'పికప్ చిరునామా (Address)',
    pickupWindow: 'పికప్ సమయం (Time)',
    preferredDate: 'తేదీ (Date)',
    timeSlot: 'సమయం (Time Slot)',
    submitWhatsapp: 'బుక్ చేసి వాట్సాప్‌లో పంపండి',
    bookingReceived: 'బుకింగ్ పూర్తయింది!',
    openWhatsapp: 'వాట్సాప్ ఓపెన్ చేయండి',
    bookAnother: 'మరొక సర్వీస్ బుక్ చేయండి',
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('ms_car_wash_lang') as Language;
      if (savedLang === 'en' || savedLang === 'te') {
        setLanguageState(savedLang);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ms_car_wash_lang', lang);
    }
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
