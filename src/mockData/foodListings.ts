export interface FoodListing {
  id: string;
  title: string;
  description: string;
  location: string;
  pickupTime: string;
  quantity: number;
  status: 'available' | 'claimed' | 'soldout';
  type: 'cafe' | 'event';
  source: string; // e.g., "Mission Bakery" or "Club Fair"
}

export const initialFoodListings: FoodListing[] = [
  // Cafés
  {
    id: '1',
    title: 'Assorted Pastries',
    description: 'Fresh pastries from Mission Bakery.',
    location: 'Mission Bakery, Benson Dining Hall',
    pickupTime: '2:00 PM - 4:00 PM',
    quantity: 10,
    status: 'available',
    type: 'cafe',
    source: 'Mission Bakery',
  },
  {
    id: '2',
    title: 'Pepperoni Pizza Slices',
    description: 'Hot pizza slices from The Slice.',
    location: 'The Slice, Benson Dining Hall',
    pickupTime: '1:00 PM - 3:00 PM',
    quantity: 12,
    status: 'available',
    type: 'cafe',
    source: 'The Slice',
  },
  {
    id: '3',
    title: 'Grilled Chicken Sandwiches',
    description: 'Juicy grilled chicken sandwiches from The Fire Grill.',
    location: 'The Fire Grill, Benson Dining Hall',
    pickupTime: '5:00 PM - 7:00 PM',
    quantity: 8,
    status: 'available',
    type: 'cafe',
    source: 'The Fire Grill',
  },
  {
    id: '4',
    title: 'Vegan Wraps',
    description: 'Healthy vegan wraps from Simply Oasis.',
    location: 'Simply Oasis, Benson Dining Hall',
    pickupTime: '12:00 PM - 2:00 PM',
    quantity: 6,
    status: 'available',
    type: 'cafe',
    source: 'Simply Oasis',
  },
  {
    id: '5',
    title: 'Freshly Brewed Coffee',
    description: 'Morning coffee from Sunstream Cafe.',
    location: 'Sunstream Cafe, Learning Commons',
    pickupTime: '8:00 AM - 10:00 AM',
    quantity: 15,
    status: 'available',
    type: 'cafe',
    source: 'Sunstream Cafe',
  },
  {
    id: '6',
    title: 'Breakfast Burritos',
    description: 'Hearty breakfast burritos from Cadence.',
    location: 'Cadence, Lucas Hall',
    pickupTime: '9:00 AM - 11:00 AM',
    quantity: 5,
    status: 'available',
    type: 'cafe',
    source: 'Cadence',
  },
  {
    id: '7',
    title: 'Smoothie Bowls',
    description: 'Refreshing smoothie bowls from Fresh Bytes.',
    location: 'Fresh Bytes, SCDI',
    pickupTime: '3:00 PM - 5:00 PM',
    quantity: 7,
    status: 'available',
    type: 'cafe',
    source: 'Fresh Bytes',
  },
  // Events
  {
    id: '8',
    title: 'Leftover Bagels',
    description: 'Bagels from Club Fair event.',
    location: 'Student Union Hall',
    pickupTime: '11:00 AM - 1:00 PM',
    quantity: 10,
    status: 'available',
    type: 'event',
    source: 'Club Fair',
  },
  {
    id: '9',
    title: 'Sandwich Platters',
    description: 'Sandwiches from Engineering Conference.',
    location: 'SCDI Conference Room',
    pickupTime: '4:00 PM - 6:00 PM',
    quantity: 20,
    status: 'available',
    type: 'event',
    source: 'Engineering Conference',
  },
  {
    id: '10',
    title: 'Assorted Snacks',
    description: 'Snacks from Career Night.',
    location: 'Lucas Hall Lobby',
    pickupTime: '6:00 PM - 8:00 PM',
    quantity: 15,
    status: 'available',
    type: 'event',
    source: 'Career Night',
  },
  {
    id: '11',
    title: 'Popcorn + Drinks',
    description: 'Movie Night treats.',
    location: 'Benson Hall',
    pickupTime: '7:00 PM - 9:00 PM',
    quantity: 30,
    status: 'available',
    type: 'event',
    source: 'Movie Night',
  },
]; 