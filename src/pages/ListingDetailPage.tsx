import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, MapPin, Calendar, Gauge, Zap, Settings, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { CarListing } from '@/types';
import { getListings } from '@/lib/storage';
import { formatCurrency, formatMileage, formatDate } from '@/lib/utils';
import clsx from 'clsx';

export default function ListingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<CarListing | null>(null);
  const [imgIdx, setImgIdx] = useState(0);
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    if (!id) return;
    const listings = getListings();
    const found = listings.find(l => l.id === id);
    setListing(found || null);
  }, [id]);

  if (!listing) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-brand-light/50 text-lg">Listing not found.</p>
        <Link to="/listings" className="mt-4 inline-block text-brand-gold hover:underline">← Back to listings</Link>
      </div>
    );
  }

  const specs = [
    { label: 'Year', value: listing.year },
    { label: 'Make', value: listing.make },
    { label: 'Model', value: listing.model },
    { label: 'Body Style', value: listing.bodyStyle },
    { label: 'Mileage', value: formatMileage(listing.mileage) },
    { label: 'Condition', value: listing.condition },
    { label: 'Engine', value: listing.engineSize },
    { label: 'Horsepower', value: `${listing.horsepower} hp` },
    { label: 'Cylinders', value: listing.cylinders },
    { label: 'Transmission', value: listing.transmission },
    { label: 'Drive Type', value: listing.driveType },
    { label: 'Fuel Type', value: listing.fuelType },
    { label: 'Doors', value: listing.doors },
    { label: 'Exterior Color', value: listing.exteriorColor },
    { label: 'Interior Color', value: listing.interiorColor },
    { label: 'VIN', value: listing.vin },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/listings" className="flex items-center gap-2 text-brand-gold/60 hover:text-brand-gold mb-6 text-sm transition-colors">
        <ArrowLeft size={16} /> Back to Listings
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Images + specs */}
        <div className="lg:col-span-2">
          {/* Image gallery */}
          <div className="relative bg-brand-dark rounded-lg overflow-hidden mb-6 h-80 md:h-96">
            {listing.images && listing.images.length > 0 ? (
              <>
                <img src={listing.images[imgIdx]} alt={listing.title} className="w-full h-full object-cover" />
                {listing.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setImgIdx(i => Math.max(0, i - 1))}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-brand-dark/80 text-brand-gold p-2 rounded-full"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() => setImgIdx(i => Math.min(listing.images.length - 1, i + 1))}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-dark/80 text-brand-gold p-2 rounded-full"
                    >
                      <ChevronRight size={20} />
                    </button>
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                      {listing.images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setImgIdx(i)}
                          className={clsx('w-2 h-2 rounded-full transition-colors', i === imgIdx ? 'bg-brand-gold' : 'bg-brand-light/30')}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-brand-dark to-brand-darker">
                <svg width="160" height="100" viewBox="0 0 80 50" fill="none">
                  <path d="M5 35 L8 28 L18 18 L62 18 L72 28 L75 35 Z" fill="#2a1500" stroke="#c9a84c" strokeWidth="1.5"/>
                  <path d="M18 18 L24 10 L56 10 L62 18" fill="#1a0a00" stroke="#c9a84c" strokeWidth="1"/>
                  <circle cx="18" cy="38" r="6" fill="none" stroke="#c9a84c" strokeWidth="1.5"/>
                  <circle cx="62" cy="38" r="6" fill="none" stroke="#c9a84c" strokeWidth="1.5"/>
                </svg>
                <p className="text-brand-gold/40 text-sm mt-3">No Photos Available</p>
              </div>
            )}
          </div>

          {/* Title + price */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-brand-gold mb-2">{listing.title}</h1>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-brand-light">{formatCurrency(listing.price)}</span>
              <span className={clsx(
                'px-3 py-1 rounded border text-sm',
                listing.condition === 'Excellent' ? 'text-green-400 border-green-600/50 bg-green-900/20' :
                listing.condition === 'Good' ? 'text-blue-400 border-blue-600/50 bg-blue-900/20' :
                'text-yellow-400 border-yellow-600/50 bg-yellow-900/20'
              )}>
                {listing.condition}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2 text-brand-light/50 text-sm">
              <MapPin size={14} />
              <span>{listing.location}</span>
              <span className="mx-2">·</span>
              <Calendar size={14} />
              <span>Listed {formatDate(listing.createdAt)}</span>
            </div>
          </div>

          {/* Specs grid */}
          <div className="vintage-card rounded-lg p-6 mb-6">
            <h2 className="text-brand-gold font-semibold mb-4 flex items-center gap-2">
              <Settings size={18} /> Vehicle Specifications
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {specs.map(s => (
                <div key={s.label} className="border-b border-brand-gold/10 pb-2">
                  <p className="text-brand-light/40 text-xs uppercase tracking-wider">{s.label}</p>
                  <p className="text-brand-light text-sm font-medium mt-0.5">{s.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="vintage-card rounded-lg p-6 mb-6">
            <h2 className="text-brand-gold font-semibold mb-4">Description</h2>
            <p className="text-brand-light/70 leading-relaxed text-sm">{listing.description}</p>
          </div>

          {/* Features */}
          {listing.features && listing.features.length > 0 && (
            <div className="vintage-card rounded-lg p-6">
              <h2 className="text-brand-gold font-semibold mb-4 flex items-center gap-2">
                <CheckCircle size={18} /> Features & Options
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {listing.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-brand-light/70 text-sm">
                    <CheckCircle size={12} className="text-brand-gold/60 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Contact card */}
        <div className="lg:col-span-1">
          <div className="vintage-card rounded-lg p-6 sticky top-20">
            <div className="text-center mb-6">
              <p className="text-brand-light/50 text-sm">Asking Price</p>
              <p className="text-4xl font-bold text-brand-gold">{formatCurrency(listing.price)}</p>
            </div>
            <div className="border-t border-brand-gold/20 pt-6 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center">
                  <span className="text-brand-gold font-bold text-sm">{listing.sellerName[0]}</span>
                </div>
                <div>
                  <p className="text-brand-light font-semibold text-sm">{listing.sellerName}</p>
                  <p className="text-brand-light/40 text-xs">{listing.location}</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setContactVisible(!contactVisible)}
              className="w-full bg-brand-gold text-brand-dark font-bold py-3 rounded-lg hover:bg-brand-gold/80 transition-colors mb-3"
            >
              {contactVisible ? 'Hide Contact' : 'Show Contact Info'}
            </button>
            {contactVisible && (
              <div className="space-y-3 mt-4">
                <div className="flex items-center gap-3 text-sm">
                  <Phone size={16} className="text-brand-gold" />
                  <a href={`tel:${listing.sellerPhone}`} className="text-brand-light hover:text-brand-gold">{listing.sellerPhone}</a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail size={16} className="text-brand-gold" />
                  <a href={`mailto:${listing.sellerEmail}`} className="text-brand-light hover:text-brand-gold break-all">{listing.sellerEmail}</a>
                </div>
              </div>
            )}
            <div className="mt-6 pt-6 border-t border-brand-gold/20 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-brand-light/50">Year</span>
                <span className="text-brand-light">{listing.year}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-light/50">Mileage</span>
                <span className="text-brand-light">{formatMileage(listing.mileage)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-light/50">Transmission</span>
                <span className="text-brand-light">{listing.transmission}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-light/50">Engine</span>
                <span className="text-brand-light">{listing.engineSize}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
