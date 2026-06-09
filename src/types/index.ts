export type CarCondition = 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Project';
export type FuelType = 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid' | 'Other';
export type TransmissionType = 'Manual' | 'Automatic' | 'Semi-Automatic';
export type DriveType = '2WD' | '4WD' | 'AWD' | 'RWD' | 'FWD';
export type BodyStyle = 'Coupe' | 'Convertible' | 'Sedan' | 'Wagon' | 'SUV' | 'Truck' | 'Van' | 'Roadster' | 'Hardtop';
export type ListingStatus = 'active' | 'sold' | 'pending';
export type AuctionStatus = 'upcoming' | 'live' | 'ended' | 'sold' | 'no_reserve_met';

export interface CarListing {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  condition: CarCondition;
  fuelType: FuelType;
  transmission: TransmissionType;
  driveType: DriveType;
  bodyStyle: BodyStyle;
  engineSize: string;
  horsepower: number;
  exteriorColor: string;
  interiorColor: string;
  vin: string;
  description: string;
  features: string[];
  images: string[];
  location: string;
  sellerName: string;
  sellerPhone: string;
  sellerEmail: string;
  status: ListingStatus;
  createdAt: string;
  doors: number;
  cylinders: number;
}

export interface Bid {
  id: string;
  auctionId: string;
  bidderId: string;
  bidderName: string;
  amount: number;
  timestamp: string;
}

export interface AuctionListing {
  id: string;
  carId: string;
  car: CarListing;
  sellerId: string;
  sellerName: string;
  reservePrice: number;
  startingBid: number;
  currentHighBid: number;
  currentHighBidder: string;
  bids: Bid[];
  status: AuctionStatus;
  durationHours: number;
  startTime: string;
  endTime: string;
  createdAt: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'seller' | 'bidder' | 'both';
  createdAt: string;
}

export interface SearchFilters {
  make: string;
  model: string;
  yearMin: number | '';
  yearMax: number | '';
  priceMin: number | '';
  priceMax: number | '';
  mileageMax: number | '';
  condition: CarCondition | '';
  bodyStyle: BodyStyle | '';
  fuelType: FuelType | '';
  transmission: TransmissionType | '';
  location: string;
  keyword: string;
}
