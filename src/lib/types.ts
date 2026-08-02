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
  { id: 'Car', name: 'Car / Hatchback / Sedan', desc: 'Hatchback, Sedan & Saloon' },
  { id: 'SUV', name: 'SUV / MUV', desc: 'Creta, Innova, Fortuner' },
  { id: 'Bike', name: 'Standard / Heavy Bike', desc: 'Commuter to Superbike' },
  { id: 'Scooter', name: 'Scooter', desc: 'Gearless Scooters' },
  { id: 'Truck', name: 'Truck', desc: 'Mini to Heavy Freight' },
  { id: 'Van', name: 'Van / Commercial', desc: 'Eeco, Omni, Traveler' },
  { id: 'Tractor', name: 'Tractor', desc: 'Farm & Commercial' },
  { id: 'Auto', name: 'Auto Rickshaw', desc: 'Passenger & Cargo Auto' },
  { id: 'JCB', name: 'JCB / Earth Mover', desc: 'Heavy Machinery' },
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
  { id: 'interior', name: 'Interior Cleaning', desc: 'Deep vacuuming & dashboard wiping' },
  { id: 'polish', name: 'Polish & Shine', desc: 'Protective gloss wax coating' },
  { id: 'pressure', name: 'Pressure Wash', desc: 'High-pressure underbody dirt removal' },
];
