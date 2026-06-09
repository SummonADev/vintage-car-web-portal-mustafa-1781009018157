import { Link } from 'react-router-dom';
import { MapPin, Gauge, Calendar, Fuel, Settings2, Heart } from 'lucide-react';
import { CarListing } from '@/types';
import { formatCurrency, formatMileage } from '@/lib/utils';
import { getBrandLogo } from '@/lib/brandLogos';
import clsx from 'clsx';
import { useState } from 'react';

type CarCardProps = {
  listing: CarListing;
};

const conditionConfig: Record<string, { label: string; cls: string }> = {
  Excellent: { label: 'Excellent', cls: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25' },
  Good: { label: 'Good', cls: 'bg-blue-500/15 text-blue-400 border-blue-500/25' },
  Fair: { label: 'Fair', cls: 'bg-amber-500/15 text-amber-400 border-amber-500/25' },
  Poor: { label: 'Poor', cls: 'bg-orange-500/15 text-orange-400 border-orange-500/25' },
  Project: { label: 'Project', cls: 'bg-red-500/15 text-red-400 border-red-500/25' },
};

export default function CarCard({ listing }: CarCardProps) {
  const [liked, setLiked] = useState(false);
  const cond = conditionConfig[listing.condition] || conditionConfig.Good;
  const brandLogo = getBrandLogo(listing.make);

  return (
    <Link to={`/listings/${listing.id}`} className="block group card-hover">
      <div className="rounded-2xl overflow-hidden bg-brand-surface border border-white/6 shadow-card">
        {/* Image */}
        <div className="relative h-52 bg-brand-surface-2 overflow-hidden">
          {listing.images && listing.images.length > 0 ? (
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-brand-surface to-brand-surface-2">
              <svg width="90" height="55" viewBox="0 0 90 55" fill="none">
                <path d="M6 40 L9 32 L21 21 L69 21 L81 32 L84 40 Z" fill="#141414" stroke="#f97316" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M21 21 L27 13 L63 13 L69 21" fill="#1c1c1c" stroke="#f97316" strokeWidth="1" strokeLinejoin="round"/>
                <circle cx="21" cy="43" r="7" fill="none" stroke="#f97316" strokeWidth="1.5"/>
                <circle cx="21" cy="43" r="2.5" fill="#f97316" opacity="0.7"/>
                <circle cx="69" cy="43" r="7" fill="none" stroke="#f97316" strokeWidth="1.5"/>
                <circle cx="69" cy="43" r="2.5" fill="#f97316" opacity="0.7"/>
              </svg>
              <p className="text-brand-muted text-xs mt-3 font-medium">No Photo Available</p>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
            <span className={clsx('text-xs px-2.5 py-1 rounded-full border font-medium backdrop-blur-sm', cond.cls)}>
              {cond.label}
            </span>
            <button
              onClick={(e) => { e.preventDefault(); setLiked(l => !l); }}
              className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-colors"
            >
              <Heart
                size={15}
                className={liked ? 'fill-red-500 text-red-500' : 'text-white/70'}
              />
            </button>
          </div>

          {/* Price overlay */}
          <div className="absolute bottom-3 left-3">
            <span className="text-white font-bold text-lg bg-black/50 backdrop-blur-sm px-3 py-1 rounded-xl">
              {formatCurrency(listing.price)}
            </span>
          </div>

          {/* Brand logo overlay */}
          {brandLogo && (
            <div className="absolute bottom-3 right-3">
              <div className="w-9 h-9 rounded-lg overflow-hidden shadow-lg bg-black/30 backdrop-blur-sm flex items-center justify-center" style={{ padding: '2px' }}>
                <div style={{ transform: 'scale(0.6)', transformOrigin: 'center', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {brandLogo}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            {brandLogo && (
              <div className="w-6 h-6 rounded overflow-hidden flex-shrink-0" style={{ overflow: 'hidden' }}>
                <div style={{ transform: 'scale(0.4)', transformOrigin: 'top left', width: '60px', height: '60px' }}>
                  {brandLogo}
                </div>
              </div>
            )}
            <h3 className="text-brand-light font-semibold text-sm leading-snug line-clamp-1 group-hover:text-brand-gold transition-colors flex-1">
              {listing.title}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-y-2 gap-x-3">
            <div className="flex items-center gap-1.5 text-xs text-brand-muted">
              <Calendar size={11} className="text-brand-gold/60 flex-shrink-0" />
              <span>{listing.year}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-brand-muted">
              <Gauge size={11} className="text-brand-gold/60 flex-shrink-0" />
              <span>{formatMileage(listing.mileage)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-brand-muted">
              <Fuel size={11} className="text-brand-gold/60 flex-shrink-0" />
              <span>{listing.fuelType}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-brand-muted">
              <Settings2 size={11} className="text-brand-gold/60 flex-shrink-0" />
              <span>{listing.transmission}</span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-brand-muted">
              <MapPin size={11} className="text-brand-gold/50" />
              <span className="truncate max-w-[100px]">{listing.location}</span>
            </div>
            <span className="text-xs text-brand-gold/70 font-medium">{listing.bodyStyle}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
