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
    bookWash: 'Book Wash',
    pricing: 'Pricing',
    adminDesk: 'Admin Desk',
    heroTag: 'Srikalahasti Vehicle Wash Center',
    heroTitle: 'Clean Car.',
    heroSubtitle: 'Happy Ride.',
    heroDesc: 'Scratch-free foam washing, doorstep vehicle pickup, and center slot booking in Srikalahasti.',
    bookPickupOrSlot: 'Book Pickup or Slot',
    viewPricing: 'View Pricing (From ₹100)',
    scratchFree: '100% Scratch Free',
    freePerks: 'Free Water + Tissue Box',
    perksTitle: 'Free Perks With Every Wash',
    perksDesc: 'Every customer gets a complimentary water bottle and car tissue paper box.',
    freeWater: 'Free Mineral Water Bottle',
    freeWaterDesc: 'Chilled, sealed drinking water bottle handed over to every customer after wash completion.',
    freeTissue: 'Free Car Tissue Paper Box',
    freeTissueDesc: 'A dashboard tissue box included free with every car & SUV wash service.',
    servicesTitle: 'Wash & Detailing Services',
    servicesDesc: 'Professional water washing, snow foam detailing & hygiene treatment.',
    vehiclesWeWash: 'Vehicles We Wash',
    viewAllPrices: 'View All Prices',
    visitOurCenter: 'Visit Our Center',
    openInGoogleMaps: 'Open in Google Maps',
    // Booking page
    easyBooking: 'Easy Wash Booking',
    bookVehicleWash: 'Book Vehicle Wash',
    selectModeDesc: 'Select Doorstep Pickup or Wash Center Slot Booking.',
    doorstepPickup: 'Doorstep Pickup',
    centerDriveIn: 'Center Drive-In',
    slotRule: 'Book your slot before 10 AM on the day of wash for guaranteed access.',
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
    bookAnother: 'Book Another',
  },
  te: {
    home: 'హోమ్ (Home)',
    bookWash: 'వాష్ బుక్ చేయండి',
    pricing: 'ధరలు (Pricing)',
    adminDesk: 'అడ్మిన్ డెస్క్',
    heroTag: 'శ్రీకాళహస్తి వెహికల్ వాష్ సెంటర్',
    heroTitle: 'శుభ్రమైన కారు.',
    heroSubtitle: 'హ్యాపీ రైడ్.',
    heroDesc: 'శ్రీకాళహస్తిలో గీతలు పడని ఫోమ్ వాషింగ్, డోర్‌స్టెప్ పికప్ మరియు వాష్ సెంటర్ స్లాట్ బుకింగ్.',
    bookPickupOrSlot: 'పికప్ లేదా స్లాట్ బుక్ చేయండి',
    viewPricing: 'ధరల వివరాలు (₹100 నుండి)',
    scratchFree: '100% స్క్రాచ్ ఫ్రీ',
    freePerks: 'ఉచిత వాటర్ బాటిల్ + టిష్యూ బాక్స్',
    perksTitle: 'ప్రతి వాష్‌పై ఉచిత బహుమతులు',
    perksDesc: 'ప్రతి కస్టమర్‌కు ఒక ఉచిత మినరల్ వాటర్ బాటిల్ మరియు కార్ టిష్యూ బాక్స్ అందజేయబడుతుంది.',
    freeWater: 'ఉచిత మినరల్ వాటర్ బాటిల్',
    freeWaterDesc: 'వాష్ పూర్తయిన తర్వాత ప్రతి కస్టమర్‌కు చల్లని, సీల్ చేసిన మినరల్ వాటర్ బాటిల్ ఉచితంగా అందజేయబడుతుంది.',
    freeTissue: 'ఉచిత కార్ టిష్యూ బాక్స్',
    freeTissueDesc: 'ప్రతి కారు & SUV వాష్ సర్వీస్‌తో పాటు ఉచిత కార్ డాష్‌బోర్డ్ టిష్యూ బాక్స్ అందించబడుతుంది.',
    servicesTitle: 'వాష్ & డిటైలింగ్ సర్వీసెస్',
    servicesDesc: 'ప్రొఫెషనల్ వాటర్ వాషింగ్, స్నో ఫోమ్ డిటైలింగ్ & ఇంటీరియర్ క్లీనింగ్.',
    vehiclesWeWash: 'మేము వాష్ చేసే వాహనాలు',
    viewAllPrices: 'అన్ని ధరలు చూడండి',
    visitOurCenter: 'మా సెంటర్‌ను సందర్శించండి',
    openInGoogleMaps: 'గూగుల్ మ్యాప్స్‌లో చూడండి',
    // Booking page
    easyBooking: 'సులభమైన వాష్ బుకింగ్',
    bookVehicleWash: 'వాష్ సర్వీస్ బుక్ చేయండి',
    selectModeDesc: 'డోర్‌స్టెప్ పికప్ లేదా వాష్ సెంటర్ స్లాట్ బుకింగ్ ఎంచుకోండి.',
    doorstepPickup: 'ఇంటి దగ్గర పికప్ (Pickup)',
    centerDriveIn: 'వాష్ సెంటర్ వద్ద (Drive-In)',
    slotRule: 'వాష్ సెంటర్ వద్ద సులభమైన ప్రవేశం కోసం ఉదయం 10 గంటల ముందే బుక్ చేసుకోండి.',
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
    bookAnother: 'మరొక వాష్ బుక్ చేయండి',
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
