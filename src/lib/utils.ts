export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatMileage(mileage: number): string {
  return new Intl.NumberFormat('en-US').format(mileage) + ' mi';
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getTimeRemaining(endTime: string): { hours: number; minutes: number; seconds: number; total: number } {
  const total = new Date(endTime).getTime() - Date.now();
  if (total <= 0) return { hours: 0, minutes: 0, seconds: 0, total: 0 };
  const hours = Math.floor(total / (1000 * 60 * 60));
  const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((total % (1000 * 60)) / 1000);
  return { hours, minutes, seconds, total };
}

export function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

export const CAR_MAKES = [
  'AMC', 'Alfa Romeo', 'Aston Martin', 'Austin-Healey', 'Bentley', 'BMW',
  'Buick', 'Cadillac', 'Chevrolet', 'Chrysler', 'DeSoto', 'Dodge',
  'Ferrari', 'Ford', 'Hudson', 'Jaguar', 'Lincoln', 'Lotus',
  'MG', 'Mercury', 'Mercedes-Benz', 'Nash', 'Oldsmobile', 'Packard',
  'Plymouth', 'Pontiac', 'Porsche', 'Rolls-Royce', 'Studebaker', 'Triumph',
  'Volkswagen', 'Other'
];

export const BODY_STYLES = [
  'Coupe', 'Convertible', 'Sedan', 'Wagon', 'SUV', 'Truck', 'Van', 'Roadster', 'Hardtop'
];

export const FUEL_TYPES = ['Gasoline', 'Diesel', 'Electric', 'Hybrid', 'Other'];
export const TRANSMISSION_TYPES = ['Manual', 'Automatic', 'Semi-Automatic'];
export const DRIVE_TYPES = ['2WD', '4WD', 'AWD', 'RWD', 'FWD'];
export const CONDITIONS = ['Excellent', 'Good', 'Fair', 'Poor', 'Project'];

export const YEARS: number[] = [];
for (let y = 2000; y >= 1900; y--) {
  YEARS.push(y);
}

export const CAR_FEATURES = [
  'Air Conditioning', 'Power Steering', 'Power Brakes', 'Power Windows', 'Power Locks',
  'Power Seats', 'Cruise Control', 'AM/FM Radio', 'CD Player', 'Original Radio',
  'Leather Interior', 'Vinyl Interior', 'Bucket Seats', 'Bench Seat', 'Center Console',
  'Floor Shifter', 'Column Shift', 'Tachometer', 'Gauge Package', 'Rally Instrument Cluster',
  'Chrome Bumpers', 'Painted Bumpers', 'Chrome Trim', 'Two-Tone Paint', 'Special Order Color',
  'Wire Wheels', 'Alloy Wheels', 'Steel Wheels', 'Hubcaps', 'Spinner Hubcaps',
  'Positraction', 'Limited Slip Differential', 'Overdrive', 'Four Wheel Drive',
  'Disc Brakes', 'Drum Brakes', 'Front Disc Brakes', 'Anti-Roll Bar',
  'Sunroof', 'T-Tops', 'Convertible Top', 'Hard Top', 'Landau Top', 'Vinyl Top',
  'Numbers Matching', 'Frame Off Restoration', 'Documented History', 'Original Paint',
  'Matching Numbers Engine', 'Broadcast Sheet', 'Build Sheet', 'PHS Documentation',
  'Dual Exhaust', 'Side Pipes', 'Headers', 'Performance Exhaust',
  'Supercharger', 'Turbocharger', 'Fuel Injection', 'Carbureted', 'Triple Carbs',
  'Show Quality', 'Driver Quality', 'Investment Grade', 'Barn Find', 'Unrestored Original'
];
