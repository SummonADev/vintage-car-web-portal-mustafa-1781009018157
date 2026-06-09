import { CarListing, AuctionListing, User, Bid } from '@/types';

const LISTINGS_KEY = 'vccp_listings';
const AUCTIONS_KEY = 'vccp_auctions';
const USERS_KEY = 'vccp_users';
const CURRENT_USER_KEY = 'vccp_current_user';

export function getListings(): CarListing[] {
  try {
    const data = localStorage.getItem(LISTINGS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveListings(listings: CarListing[]): void {
  localStorage.setItem(LISTINGS_KEY, JSON.stringify(listings));
}

export function addListing(listing: CarListing): void {
  const listings = getListings();
  listings.unshift(listing);
  saveListings(listings);
}

export function updateListing(id: string, updates: Partial<CarListing>): void {
  const listings = getListings();
  const idx = listings.findIndex(l => l.id === id);
  if (idx !== -1) {
    listings[idx] = { ...listings[idx], ...updates };
    saveListings(listings);
  }
}

export function getAuctions(): AuctionListing[] {
  try {
    const data = localStorage.getItem(AUCTIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveAuctions(auctions: AuctionListing[]): void {
  localStorage.setItem(AUCTIONS_KEY, JSON.stringify(auctions));
}

export function addAuction(auction: AuctionListing): void {
  const auctions = getAuctions();
  auctions.unshift(auction);
  saveAuctions(auctions);
}

export function updateAuction(id: string, updates: Partial<AuctionListing>): void {
  const auctions = getAuctions();
  const idx = auctions.findIndex(a => a.id === id);
  if (idx !== -1) {
    auctions[idx] = { ...auctions[idx], ...updates };
    saveAuctions(auctions);
  }
}

export function placeBid(auctionId: string, bid: Bid): void {
  const auctions = getAuctions();
  const idx = auctions.findIndex(a => a.id === auctionId);
  if (idx !== -1) {
    auctions[idx].bids.push(bid);
    auctions[idx].currentHighBid = bid.amount;
    auctions[idx].currentHighBidder = bid.bidderName;
    saveAuctions(auctions);
  }
}

export function getUsers(): User[] {
  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveUsers(users: User[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function registerUser(user: User): void {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
}

export function loginUser(email: string, password: string): User | null {
  const users = getUsers();
  return users.find(u => u.email === email && u.password === password) || null;
}

export function getCurrentUser(): User | null {
  try {
    const data = sessionStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: User | null): void {
  if (user) {
    sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    sessionStorage.removeItem(CURRENT_USER_KEY);
  }
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

const MAKES = ['Ford', 'Chevrolet', 'Dodge', 'Buick', 'Cadillac', 'Pontiac', 'Oldsmobile', 'Plymouth', 'Mercury', 'Lincoln', 'Studebaker', 'Packard', 'Hudson', 'Nash', 'DeSoto', 'Chrysler', 'AMC', 'Ferrari', 'Alfa Romeo', 'Jaguar', 'MG', 'Triumph', 'Austin-Healey', 'Porsche', 'Mercedes-Benz', 'BMW', 'Volkswagen', 'Aston Martin', 'Bentley', 'Rolls-Royce'];

export function initSampleData(): void {
  const existing = getListings();
  if (existing.length > 0) return;

  const sampleListings: CarListing[] = [
    {
      id: generateId(),
      title: '1965 Ford Mustang Fastback - Numbers Matching',
      make: 'Ford',
      model: 'Mustang',
      year: 1965,
      price: 85000,
      mileage: 42000,
      condition: 'Excellent',
      fuelType: 'Gasoline',
      transmission: 'Manual',
      driveType: 'RWD',
      bodyStyle: 'Coupe',
      engineSize: '4.7L',
      horsepower: 271,
      exteriorColor: 'Wimbledon White',
      interiorColor: 'Black',
      vin: '5F07C123456',
      description: 'Stunning 1965 Ford Mustang Fastback with the legendary 289 Hi-Po V8 engine. Numbers matching, professionally restored, documented history.',
      features: ['Power Steering', 'Rally-Pac', 'Fold-Down Rear Seat', 'Chrome Wheels', 'Original Radio'],
      images: [],
      location: 'Los Angeles, CA',
      sellerName: 'Classic Rides Gallery',
      sellerPhone: '(555) 123-4567',
      sellerEmail: 'info@classicrides.com',
      status: 'active',
      createdAt: new Date().toISOString(),
      doors: 2,
      cylinders: 8,
    },
    {
      id: generateId(),
      title: '1957 Chevrolet Bel Air Convertible',
      make: 'Chevrolet',
      model: 'Bel Air',
      year: 1957,
      price: 125000,
      mileage: 28000,
      condition: 'Excellent',
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      driveType: 'RWD',
      bodyStyle: 'Convertible',
      engineSize: '4.6L',
      horsepower: 283,
      exteriorColor: 'Tropical Turquoise',
      interiorColor: 'White',
      vin: '57B123456',
      description: 'Iconic 1957 Chevrolet Bel Air Convertible with the 283 V8. Frame-off restoration completed in 2021. Show quality throughout.',
      features: ['Fuel Injection', 'Power Top', 'Power Windows', 'Continental Kit', 'Dual Exhaust', 'Spinner Hubcaps'],
      images: [],
      location: 'Detroit, MI',
      sellerName: 'Motor City Classics',
      sellerPhone: '(555) 987-6543',
      sellerEmail: 'sales@motorcityclassics.com',
      status: 'active',
      createdAt: new Date().toISOString(),
      doors: 2,
      cylinders: 8,
    },
    {
      id: generateId(),
      title: '1969 Dodge Charger R/T - 440 Six Pack',
      make: 'Dodge',
      model: 'Charger',
      year: 1969,
      price: 145000,
      mileage: 55000,
      condition: 'Excellent',
      fuelType: 'Gasoline',
      transmission: 'Manual',
      driveType: 'RWD',
      bodyStyle: 'Coupe',
      engineSize: '7.2L',
      horsepower: 390,
      exteriorColor: 'Charger Orange',
      interiorColor: 'Black',
      vin: 'XS29H9B123456',
      description: 'The most iconic muscle car ever built. Original 440 Six Pack, 4-speed Hurst shifter. Documented Broadcast Sheet.',
      features: ['Sure Grip Rear', 'Rallye Suspension', 'Bucket Seats', 'Center Console', 'Tachometer', 'Track Pack'],
      images: [],
      location: 'Nashville, TN',
      sellerName: 'Muscle Car Heaven',
      sellerPhone: '(555) 456-7890',
      sellerEmail: 'sell@musclecarheaven.com',
      status: 'active',
      createdAt: new Date().toISOString(),
      doors: 2,
      cylinders: 8,
    },
    {
      id: generateId(),
      title: '1963 Ferrari 250 GT Lusso',
      make: 'Ferrari',
      model: '250 GT',
      year: 1963,
      price: 1250000,
      mileage: 18000,
      condition: 'Excellent',
      fuelType: 'Gasoline',
      transmission: 'Manual',
      driveType: 'RWD',
      bodyStyle: 'Coupe',
      engineSize: '3.0L',
      horsepower: 250,
      exteriorColor: 'Rosso Corsa',
      interiorColor: 'Tan Leather',
      vin: 'ZFFAB12B000004891',
      description: 'One of only 350 examples built, this Ferrari 250 GT Lusso is one of the most beautiful Gran Turismo cars ever created. Matching numbers throughout.',
      features: ['Borrani Wire Wheels', 'Leather Interior', 'Original Tool Roll', 'Marelli Ignition', 'Weber Carburetors'],
      images: [],
      location: 'Beverly Hills, CA',
      sellerName: 'Prestige Motor Cars',
      sellerPhone: '(555) 800-0001',
      sellerEmail: 'auction@prestigemotors.com',
      status: 'active',
      createdAt: new Date().toISOString(),
      doors: 2,
      cylinders: 12,
    },
    {
      id: generateId(),
      title: '1970 Plymouth Barracuda 426 HEMI',
      make: 'Plymouth',
      model: 'Barracuda',
      year: 1970,
      price: 380000,
      mileage: 12000,
      condition: 'Excellent',
      fuelType: 'Gasoline',
      transmission: 'Manual',
      driveType: 'RWD',
      bodyStyle: 'Coupe',
      engineSize: '7.0L',
      horsepower: 425,
      exteriorColor: 'Vitamin C Orange',
      interiorColor: 'Black',
      vin: 'BS23V0B123456',
      description: 'The holy grail of muscle cars. One of only 652 Barracudas equipped with the 426 HEMI in 1970. Broadcast sheet, fender tag, and VIN plate all match.',
      features: ['Dana 60 Rear', '4-Speed Close Ratio', 'Pistol Grip Shifter', 'Air Grabber Hood', 'Rallye Instrument Cluster'],
      images: [],
      location: 'Phoenix, AZ',
      sellerName: 'HEMI Hunter Classics',
      sellerPhone: '(555) 426-4260',
      sellerEmail: 'hemi@hemihunter.com',
      status: 'active',
      createdAt: new Date().toISOString(),
      doors: 2,
      cylinders: 8,
    },
    {
      id: generateId(),
      title: '1955 Mercedes-Benz 300SL Gullwing',
      make: 'Mercedes-Benz',
      model: '300SL',
      year: 1955,
      price: 1800000,
      mileage: 22000,
      condition: 'Excellent',
      fuelType: 'Gasoline',
      transmission: 'Manual',
      driveType: 'RWD',
      bodyStyle: 'Coupe',
      engineSize: '3.0L',
      horsepower: 215,
      exteriorColor: 'Silver',
      interiorColor: 'Red Leather',
      vin: '198040',
      description: 'The iconic Gullwing coupe with direct fuel injection. One of 1400 built, this example has been in a private collection for 30 years.',
      features: ['Gullwing Doors', 'Fuel Injection', 'Alloy Body Panels', 'Rudge Knock-Off Wheels', 'Original Tool Kit'],
      images: [],
      location: 'New York, NY',
      sellerName: 'Manhattan Classic Cars',
      sellerPhone: '(555) 300-3000',
      sellerEmail: 'gullwing@manhattanclassics.com',
      status: 'active',
      createdAt: new Date().toISOString(),
      doors: 2,
      cylinders: 6,
    },
    {
      id: generateId(),
      title: '1967 Pontiac GTO The Judge',
      make: 'Pontiac',
      model: 'GTO',
      year: 1967,
      price: 78000,
      mileage: 68000,
      condition: 'Good',
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      driveType: 'RWD',
      bodyStyle: 'Coupe',
      engineSize: '6.6L',
      horsepower: 360,
      exteriorColor: 'Carousel Red',
      interiorColor: 'Black',
      vin: 'GTO67123456',
      description: 'Numbers matching 1967 GTO with the 400 cubic inch V8. PHS documented. Solid driver with no rust issues.',
      features: ['Tri-Power Carbs', 'Positraction', 'Safe-T-Track', 'Bucket Seats', 'Floor Shifter'],
      images: [],
      location: 'Chicago, IL',
      sellerName: 'Great Lakes Classics',
      sellerPhone: '(555) 321-4567',
      sellerEmail: 'gto@greatlakesclassics.com',
      status: 'active',
      createdAt: new Date().toISOString(),
      doors: 2,
      cylinders: 8,
    },
    {
      id: generateId(),
      title: '1961 Jaguar E-Type Roadster Series 1',
      make: 'Jaguar',
      model: 'E-Type',
      year: 1961,
      price: 275000,
      mileage: 31000,
      condition: 'Excellent',
      fuelType: 'Gasoline',
      transmission: 'Manual',
      driveType: 'RWD',
      bodyStyle: 'Roadster',
      engineSize: '3.8L',
      horsepower: 265,
      exteriorColor: 'British Racing Green',
      interiorColor: 'Tan',
      vin: '875001',
      description: 'The car Enzo Ferrari called the most beautiful car ever made. Early Series 1 flat floor roadster with 3.8 XK engine.',
      features: ['Wire Wheels', 'Triple SU Carbs', 'Tonneau Cover', 'Matching Hard Top', 'Blaupunkt Radio'],
      images: [],
      location: 'San Francisco, CA',
      sellerName: 'British Motor Gallery',
      sellerPhone: '(555) 789-0123',
      sellerEmail: 'etype@britishmotors.com',
      status: 'active',
      createdAt: new Date().toISOString(),
      doors: 2,
      cylinders: 6,
    },
  ];

  saveListings(sampleListings);

  const existingAuctions = getAuctions();
  if (existingAuctions.length > 0) return;

  const now = new Date();
  const liveCar = sampleListings[3];
  const upcomingCar = sampleListings[4];

  const liveAuction: AuctionListing = {
    id: generateId(),
    carId: liveCar.id,
    car: liveCar,
    sellerId: 'demo-seller',
    sellerName: 'Prestige Motor Cars',
    reservePrice: 1100000,
    startingBid: 900000,
    currentHighBid: 1050000,
    currentHighBidder: 'VintageHunter99',
    bids: [
      { id: generateId(), auctionId: 'a1', bidderId: 'b1', bidderName: 'ClassicCarCollector', amount: 900000, timestamp: new Date(now.getTime() - 3600000).toISOString() },
      { id: generateId(), auctionId: 'a1', bidderId: 'b2', bidderName: 'FerrariEnthusiast', amount: 950000, timestamp: new Date(now.getTime() - 1800000).toISOString() },
      { id: generateId(), auctionId: 'a1', bidderId: 'b3', bidderName: 'VintageHunter99', amount: 1050000, timestamp: new Date(now.getTime() - 600000).toISOString() },
    ],
    status: 'live',
    durationHours: 24,
    startTime: new Date(now.getTime() - 18000000).toISOString(),
    endTime: new Date(now.getTime() + 21600000).toISOString(),
    createdAt: new Date().toISOString(),
    description: 'Rare opportunity to acquire one of the most beautiful Ferrari grand tourers. No reserve met yet — don\'t miss this!',
  };

  const upcomingAuction: AuctionListing = {
    id: generateId(),
    carId: upcomingCar.id,
    car: upcomingCar,
    sellerId: 'demo-seller-2',
    sellerName: 'HEMI Hunter Classics',
    reservePrice: 350000,
    startingBid: 250000,
    currentHighBid: 0,
    currentHighBidder: '',
    bids: [],
    status: 'upcoming',
    durationHours: 12,
    startTime: new Date(now.getTime() + 86400000).toISOString(),
    endTime: new Date(now.getTime() + 86400000 + 43200000).toISOString(),
    createdAt: new Date().toISOString(),
    description: 'The holy grail HEMI Cuda comes to auction. Reserve price is firm. Serious bidders only.',
  };

  saveAuctions([liveAuction, upcomingAuction]);
}

export { MAKES };
