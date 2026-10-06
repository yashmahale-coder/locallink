export type Provider = {
  id: string;
  name: string;
  role: string;
  category: string;
  location: string;
  rating: number;
  reviews: number;
  price: number;
  available: string;
  score: number;
  image: string;
  verified: boolean;
  bio: string;
  tags: string[];
};

export type BookingStatus = 'Pending' | 'Accepted' | 'Rejected' | 'Completed' | 'Cancelled';

export type Booking = {
  id: string;
  service: string;
  provider: string;
  date: string;
  time: string;
  address: string;
  price: number;
  status: BookingStatus;
  image: string;
};

export const images = {
  hero: 'https://images.pexels.com/photos/17063686/pexels-photo-17063686.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  tools: 'https://images.pexels.com/photos/16243258/pexels-photo-16243258.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  electrician: 'https://images.pexels.com/photos/8486929/pexels-photo-8486929.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  plumber: 'https://images.pexels.com/photos/32588548/pexels-photo-32588548.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  technician: 'https://images.pexels.com/photos/33388390/pexels-photo-33388390.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

export const providers: Provider[] = [
  { id: '1', name: 'Jordan Mitchell', role: 'Master Plumber', category: 'Plumbing', location: 'Austin, TX', rating: 4.9, reviews: 128, price: 85, available: 'Today, 2:00 PM', score: 96, image: images.plumber, verified: true, bio: 'Licensed plumber with 12 years of experience helping Austin homeowners keep things flowing.', tags: ['Leak repair', 'Fixtures', 'Water heaters'] },
  { id: '2', name: 'Maya Rodriguez', role: 'Residential Electrician', category: 'Electrical', location: 'Austin, TX', rating: 4.8, reviews: 96, price: 95, available: 'Today, 4:30 PM', score: 93, image: images.electrician, verified: true, bio: 'Friendly, detail-focused electrician for safe installations, repairs, and honest advice.', tags: ['Wiring', 'Lighting', 'Panels'] },
  { id: '3', name: 'Chris Okafor', role: 'Finish Carpenter', category: 'Carpentry', location: 'Round Rock, TX', rating: 5.0, reviews: 74, price: 72, available: 'Tomorrow, 9:00 AM', score: 91, image: images.hero, verified: true, bio: 'Crafting thoughtful, durable home details from custom shelving to precise trim work.', tags: ['Trim', 'Cabinetry', 'Furniture'] },
  { id: '4', name: 'Samir Patel', role: 'General Handyman', category: 'Handyman', location: 'Austin, TX', rating: 4.7, reviews: 51, price: 60, available: 'Today, 6:00 PM', score: 88, image: images.technician, verified: true, bio: 'Your go-to for the small jobs that make a big difference around the house.', tags: ['Assembly', 'Mounting', 'Repairs'] },
];

export const bookings: Booking[] = [
  { id: 'LL-2048', service: 'Faucet replacement', provider: 'Jordan Mitchell', date: 'Oct 12, 2026', time: '2:00 PM – 3:30 PM', address: '1240 W 5th Street, Austin', price: 128, status: 'Accepted', image: images.plumber },
  { id: 'LL-2027', service: 'Ceiling light installation', provider: 'Maya Rodriguez', date: 'Oct 18, 2026', time: '4:30 PM – 6:00 PM', address: '1240 W 5th Street, Austin', price: 145, status: 'Pending', image: images.electrician },
  { id: 'LL-1983', service: 'Floating shelf installation', provider: 'Chris Okafor', date: 'Sep 29, 2026', time: '10:00 AM – 12:00 PM', address: '1240 W 5th Street, Austin', price: 96, status: 'Completed', image: images.hero },
];

export const categories = [
  { name: 'Plumbing', icon: 'Droplets', jobs: '1.2k jobs', color: 'blue' },
  { name: 'Electrical', icon: 'Zap', jobs: '840 jobs', color: 'yellow' },
  { name: 'Carpentry', icon: 'Hammer', jobs: '620 jobs', color: 'orange' },
  { name: 'Cleaning', icon: 'Sparkles', jobs: '980 jobs', color: 'green' },
];
