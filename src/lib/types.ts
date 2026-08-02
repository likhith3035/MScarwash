export type BookingMode = 'pickup' | 'slot';
export type BookingStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export interface Booking {
  id: string; // e.g. MSCW-1001
  mode: BookingMode;
  name: string;
  phone: string;
  vehicleType: string; // Car, SUV, Bike, Scooter, Truck, Van, Tractor, Auto, JCB
  vehicleModel: string;
  address?: string; // For pickup wash
  timeWindow?: string; // For pickup wash
  date?: string; // For slot booking
  timeSlot?: string; // For slot booking e.g. "9-11 AM"
  notes?: string;
  addOns?: string[];
  status: BookingStatus;
  createdAt: string; // ISO String
  totalAmount?: number;
  beforePhotoUrl?: string;
  afterPhotoUrl?: string;
}

export interface PricingTier {
  category: string;
  segment: string;
  examples: string;
  price: string;
  priceValue?: number;
}

export const TWO_WHEELER_PRICING: PricingTier[] = [
  { category: 'Two-Wheeler', segment: 'Standard Bike', examples: 'Splendor, Pulsar, Shine, FZ', price: '₹100', priceValue: 100 },
  { category: 'Two-Wheeler', segment: 'Premium / Heavy Bike', examples: 'Royal Enfield, Dominar, Cruiser', price: '₹150', priceValue: 150 },
  { category: 'Two-Wheeler', segment: 'Scooter', examples: 'Activa, Jupiter, Access, Ntorq', price: '₹100 – ₹130', priceValue: 100 },
];

export const FOUR_WHEELER_PRICING: PricingTier[] = [
  { category: 'Four-Wheeler', segment: 'Hatchback', examples: 'Alto, Swift, i10, WagonR, Baleno', price: '₹350', priceValue: 350 },
  { category: 'Four-Wheeler', segment: 'Sedan', examples: 'Honda City, Verna, Ciaz, Dzire', price: '₹450', priceValue: 450 },
  { category: 'Four-Wheeler', segment: 'Compact SUV', examples: 'Venue, Brezza, Nexon, Sonet', price: '₹500', priceValue: 500 },
  { category: 'Four-Wheeler', segment: 'SUV / MUV', examples: 'Creta, Innova, XUV700, Fortuner, Harrier', price: '₹600', priceValue: 600 },
];

export const VEHICLE_TYPES = [
  { id: 'Car', name: 'Car / Hatchback / Sedan', desc: 'Hatchback, Sedan & Saloon', basePrice: 350 },
  { id: 'SUV', name: 'SUV / MUV', desc: 'Creta, Innova, Fortuner', basePrice: 500 },
  { id: 'Bike', name: 'Standard / Heavy Bike', desc: 'Commuter to Superbike', basePrice: 120 },
  { id: 'Scooter', name: 'Scooter', desc: 'Gearless Scooters', basePrice: 100 },
  { id: 'Truck', name: 'Truck', desc: 'Mini to Heavy Freight', basePrice: 800 },
  { id: 'Van', name: 'Van / Commercial', desc: 'Eeco, Omni, Traveler', basePrice: 450 },
  { id: 'Tractor', name: 'Tractor', desc: 'Farm & Commercial', basePrice: 600 },
  { id: 'Auto', name: 'Auto Rickshaw', desc: 'Passenger & Cargo Auto', basePrice: 200 },
  { id: 'JCB', name: 'JCB / Earth Mover', desc: 'Heavy Machinery', basePrice: 1000 },
];

export const TIME_SLOTS = [
  { slot: '7:00 AM – 9:00 AM', isPeak: false },
  { slot: '9:00 AM – 11:00 AM', isPeak: true },
  { slot: '11:00 AM – 1:00 PM', isPeak: false },
  { slot: '1:00 PM – 3:00 PM', isPeak: false },
  { slot: '3:00 PM – 5:00 PM', isPeak: false },
  { slot: '5:00 PM – 7:00 PM', isPeak: true },
  { slot: '7:00 PM – 9:00 PM', isPeak: false },
  { slot: '9:00 PM – 10:00 PM', isPeak: false },
];

export const ADD_ONS = [
  { id: 'interior', name: 'Interior Deep Clean', desc: 'Vacuuming, upholstery & dashboard polishing', price: 150 },
  { id: 'polish', name: 'Liquid Wax Polish & Gloss Shine', desc: 'Protective hydrophobic gloss wax coating', price: 100 },
  { id: 'pressure', name: 'High-Pressure Underbody Wash', desc: 'High-pressure underbody mud & rust removal', price: 100 },
];
