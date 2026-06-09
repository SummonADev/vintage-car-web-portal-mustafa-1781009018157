import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, Phone, Mail, MapPin, Calendar, Gauge, Settings2,
  ChevronLeft, ChevronRight, CheckCircle2, Heart, Share2,
  Fuel, Users, Info, Tag
} from 'lucide-react';
import { CarListing } from '@/types';
import { getListings } from '@/lib/storage';
import { formatCurrency, formatMileage, formatDate } from '@/lib/utils';
import clsx from 'clsx';

export default function ListingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<CarListing | null>(null);
  const [imgIdx, setImgIdx] = useState(0);
  const [contactVisible, setContactVisible] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!id) return;
    const listings = getListings();
    const found = listings.find(l => l.id === id);
    setListing(found || null);
  }, [id]);

  if (!listing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <p className="text-brand-muted text-lg mb-4">Listing not found.</p>
          <Link to="/listings" className="text-brand-gold hover:text-brand-gold-light transition-colors font-medium">
            ← Back to listings
          </Link>
        </div>
      </div>
    );
  }

  const conditionColors: Record<string, string> = {
    Excellent: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
    Good: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
    Fair: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
    Poor: 'bg-orange-500/15 text-orange-400 border-orange-500/25',
    Project: 'bg-red-500/15 text-red-400 border-red-500/25',
  };

  const keySpecs = [
    { icon: <Calendar size={16} />, label: 'Year', value: String(listing.year) },
    { icon: <Gauge size={16} />, label: 'Mileage', value: formatMileage(listing.mileage) },
    { icon: <Fuel size={16} />, label: 'Fuel', value: listing.fuelType },
    { icon: <Settings2 size={16} />, label: 'Transmission', value: listing.transmission },
    { icon: <Users size={16} />, label: 'Doors', value: String(listing.doors) },
    { icon: <Tag size={16} />, label: 'Body', value: listing.bodyStyle },
  ];

  const allSpecs = [
    { label: 'Make', value: listing.make },
    { label: 'Model', value: listing.model },
    { label: 'Year', value: String(listing.year) },
    { label: 'Body Style', value: listing.bodyStyle },
    { label: 'Condition', value: listing.condition },
    { label: 'Mileage', value: formatMileage(listing.mileage) },
    { label: 'Engine', value: listing.engineSize },
    { label: 'Horsepower', value: `${listing.horsepower} hp` },
    { label: 'Cylinders', value: String(listing.cylinders) },
    { label: 'Transmission', value: listing.transmission },
    { label: 'Drive Type', value: listing.driveType },
    { label: 'Fuel Type', value: listing.fuelType },
    { label: 'Doors', value: String(listing.doors) },
    { label: 'Ext. Color', value: listing.exteriorColor },
    { label: 'Int. Color', value: listing.interiorColor },
    { label: 'VIN', value: listing.vin },
  ];

  return (
    <div className="min-h-screen bg-brand-darker">
      {/* Breadcrumb */}
      <div className="border-b border-white/5 bg-brand-darker/80 backdrop-blur-xl sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link
            to="/listings"
            className="flex items-center gap-2 text-brand-muted hover:text-brand-gold transition-colors text-sm font-medium"
          >
            <ArrowLeft size={15} />
            Back to Listings
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLiked(l => !l)}
              className={clsx(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm transition-all border',
                liked
                  ? 'bg-red-500/15 text-red-400 border-red-500/25'
                  : 'bg-brand-surface border-white/10 text-brand-muted hover:text-brand-light'
              )}
            >
              <Heart size={14} className={liked ? 'fill-red-400' : ''} />
              Save
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm bg-brand-surface border border-white/10 text-brand-muted hover:text-brand-light transition-all">
              <Share2 size={14} />
              Share
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image gallery */}
            <div className="relative rounded-3xl overflow-hidden bg-brand-surface" style={{ height: '420px' }}>
              {listing.images && listing.images.length > 0 ? (
                <>
                  <img
                    src={listing.images[imgIdx]}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
                  {listing.images.length > 1 && (
                    <>
                      <button
                        onClick={() => setImgIdx(i => Math.max(0, i - 1))}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70 transition-all"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={() => setImgIdx(i => Math.min(listing.images.length - 1, i + 1))}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70 transition-all"
                      >
                        <ChevronRight size={20} />
                      </button>
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                        {listing.images.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setImgIdx(i)}
                            className={clsx(
                              'rounded-full transition-all',
                              i === imgIdx ? 'w-6 h-2 bg-brand-gold' : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                            )}
                          />
                        ))}
                      </div>
                    </>
                  )}
                  {/* Image count */}
                  {listing.images.length > 1 && (
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
                      {imgIdx + 1} / {listing.images.length}
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-brand-surface to-brand-surface-2">
                  <svg width="120" height="75" viewBox="0 0 90 55" fill="none">
                    <path d="M6 40 L9 32 L21 21 L69 21 L81 32 L84 40 Z" fill="#13131f" stroke="#c9a84c" strokeWidth="1.5" strokeLinejoin="round"/>
                    <path d="M21 21 L27 13 L63 13 L69 21" fill="#0f0f1a" stroke="#c9a84c" strokeWidth="1" strokeLinejoin="round"/>
                    <circle cx="21" cy="43" r="7" fill="none" stroke="#c9a84c" strokeWidth="1.5"/>
                    <circle cx="69" cy="43" r="7" fill="none" stroke="#c9a84c" strokeWidth="1.5"/>
                  </svg>
                  <p className="text-brand-muted text-sm mt-4">No Photos Available</p>
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {listing.images && listing.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {listing.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    className={clsx(
                      'flex-shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all',
                      i === imgIdx ? 'border-brand-gold' : 'border-transparent opacity-60 hover:opacity-100'
                    )}
                  >
                    <img src={img} alt={`view ${i+1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Title + key specs */}
            <div className="bg-brand-surface border border-white/6 rounded-2xl p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-display font-bold text-brand-light leading-tight">
                    {listing.title}
                  </h1>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={clsx('text-xs px-2.5 py-1 rounded-full border font-medium', conditionColors[listing.condition])}>
                      {listing.condition}
                    </span>
                    <div className="flex items-center gap-1.5 text-brand-muted text-sm">
                      <MapPin size={13} />
                      <span>{listing.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-brand-muted text-sm">
                      <Calendar size={13} />
                      <span>Listed {formatDate(listing.createdAt)}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-3xl font-bold text-brand-gold font-display">{formatCurrency(listing.price)}</p>
                </div>
              </div>

              {/* Key specs row */}
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-4">
                {keySpecs.map(spec => (
                  <div key={spec.label} className="bg-brand-darker rounded-xl p-3 text-center">
                    <div className="text-brand-gold/60 flex justify-center mb-1">{spec.icon}</div>
                    <p className="text-brand-light text-xs font-semibold">{spec.value}</p>
                    <p className="text-brand-muted text-xs mt-0.5">{spec.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Full specs */}
            <div className="bg-brand-surface border border-white/6 rounded-2xl p-6">
              <h2 className="text-brand-light font-semibold mb-5 flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-brand-gold/10 flex items-center justify-center">
                  <Info size={15} className="text-brand-gold" />
                </div>
                Vehicle Specifications
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
                {allSpecs.map(s => (
                  <div key={s.label} className="">
                    <p className="text-brand-muted text-xs font-medium uppercase tracking-wider">{s.label}</p>
                    <p className="text-brand-light text-sm font-semibold mt-1">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-brand-surface border border-white/6 rounded-2xl p-6">
              <h2 className="text-brand-light font-semibold mb-4">Description</h2>
              <p className="text-brand-muted leading-relaxed text-sm">{listing.description}</p>
            </div>

            {/* Features */}
            {listing.features && listing.features.length > 0 && (
              <div className="bg-brand-surface border border-white/6 rounded-2xl p-6">
                <h2 className="text-brand-light font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-brand-gold" />
                  Features & Options
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {listing.features.map(f => (
                    <div key={f} className="flex items-center gap-2.5 bg-brand-darker rounded-xl px-3 py-2.5">
                      <CheckCircle2 size={13} className="text-brand-gold/70 flex-shrink-0" />
                      <span className="text-brand-muted text-xs font-medium">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-4">
              {/* Price card */}
              <div className="bg-brand-surface border border-white/8 rounded-2xl p-6">
                <div className="text-center pb-5 border-b border-white/5">
                  <p className="text-brand-muted text-xs font-medium uppercase tracking-wider mb-2">Asking Price</p>
                  <p className="text-4xl font-bold text-brand-gold font-display">{formatCurrency(listing.price)}</p>
                </div>

                {/* Seller info */}
                <div className="py-5 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-gold to-yellow-600 flex items-center justify-center font-bold text-brand-darker text-base">
                      {listing.sellerName[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-brand-light font-semibold text-sm">{listing.sellerName}</p>
                      <p className="text-brand-muted text-xs flex items-center gap-1 mt-0.5">
                        <MapPin size={11} />
                        {listing.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact button */}
                <div className="pt-5">
                  <button
                    onClick={() => setContactVisible(!contactVisible)}
                    className="w-full bg-brand-gold text-brand-darker font-bold py-3.5 rounded-xl hover:bg-brand-gold-light transition-all shadow-gold text-sm mb-3"
                  >
                    {contactVisible ? 'Hide Contact Info' : 'Show Contact Info'}
                  </button>

                  {contactVisible && (
                    <div className="space-y-3 animate-slide-up">
                      <a
                        href={`tel:${listing.sellerPhone}`}
                        className="flex items-center gap-3 p-3 rounded-xl bg-brand-darker border border-white/8 hover:border-brand-gold/30 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center">
                          <Phone size={14} className="text-brand-gold" />
                        </div>
                        <span className="text-brand-light text-sm group-hover:text-brand-gold transition-colors">{listing.sellerPhone}</span>
                      </a>
                      <a
                        href={`mailto:${listing.sellerEmail}`}
                        className="flex items-center gap-3 p-3 rounded-xl bg-brand-darker border border-white/8 hover:border-brand-gold/30 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center">
                          <Mail size={14} className="text-brand-gold" />
                        </div>
                        <span className="text-brand-light text-sm group-hover:text-brand-gold transition-colors break-all">{listing.sellerEmail}</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick specs */}
              <div className="bg-brand-surface border border-white/6 rounded-2xl p-5">
                <h3 className="text-brand-muted text-xs font-semibold uppercase tracking-wider mb-4">Quick Specs</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Year', value: String(listing.year) },
                    { label: 'Make', value: listing.make },
                    { label: 'Model', value: listing.model },
                    { label: 'Mileage', value: formatMileage(listing.mileage) },
                    { label: 'Transmission', value: listing.transmission },
                    { label: 'Engine', value: listing.engineSize },
                    { label: 'Drive', value: listing.driveType },
                  ].map(s => (
                    <div key={s.label} className="flex items-center justify-between">
                      <span className="text-brand-muted text-xs">{s.label}</span>
                      <span className="text-brand-light text-xs font-semibold">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
