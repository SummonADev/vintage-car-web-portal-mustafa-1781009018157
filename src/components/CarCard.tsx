import { Link } from 'react-router-dom';
import { MapPin, Gauge, Calendar, Tag } from 'lucide-react';
import { CarListing } from '@/types';
import { formatCurrency, formatMileage } from '@/lib/utils';
import clsx from 'clsx';

type CarCardProps = {
  listing: CarListing;
};

const conditionColors: Record<string, string> = {
  Excellent: 'text-green-400 bg-green-900/30 border-green-700/50',
  Good: 'text-blue-400 bg-blue-900/30 border-blue-700/50',
  Fair: 'text-yellow-400 bg-yellow-900/30 border-yellow-700/50',
  Poor: 'text-orange-400 bg-orange-900/30 border-orange-700/50',
  Project: 'text-red-400 bg-red-900/30 border-red-700/50',
};

export default function CarCard({ listing }: CarCardProps) {
  return (
    <Link to={`/listings/${listing.id}`} className="block group">
      <div className="vintage-card rounded-lg overflow-hidden transition-all duration-300 group-hover:transform group-hover:-translate-y-1">
        <div className="relative bg-brand-dark/80 h-48 flex items-center justify-center overflow-hidden">
          {listing.images && listing.images.length > 0 ? (
            <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-brand-dark to-brand-darker">
              <svg width="80" height="50" viewBox="0 0 80 50" fill="none">
                <path d="M5 35 L8 28 L18 18 L62 18 L72 28 L75 35 Z" fill="#2a1500" stroke="#c9a84c" strokeWidth="1.5"/>
                <path d="M18 18 L24 10 L56 10 L62 18" fill="#1a0a00" stroke="#c9a84c" strokeWidth="1"/>
                <circle cx="18" cy="38" r="6" fill="none" stroke="#c9a84c" strokeWidth="1.5"/>
                <circle cx="62" cy="38" r="6" fill="none" stroke="#c9a84c" strokeWidth="1.5"/>
              </svg>
              <p className="text-brand-gold/40 text-xs mt-2">No Photo Available</p>
            </div>
          )}
          <div className="absolute top-2 left-2">
            <span className={clsx('text-xs px-2 py-1 rounded border', conditionColors[listing.condition] || 'text-brand-gold')}>
              {listing.condition}
            </span>
          </div>
          <div className="absolute top-2 right-2">
            <span className="text-brand-gold text-sm font-bold bg-brand-dark/80 px-2 py-1 rounded">
              {formatCurrency(listing.price)}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-brand-gold font-semibold text-sm leading-tight mb-2 line-clamp-2 group-hover:text-brand-light transition-colors">
            {listing.title}
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs text-brand-light/60">
            <div className="flex items-center gap-1">
              <Calendar size={12} className="text-brand-gold/60" />
              <span>{listing.year}</span>
            </div>
            <div className="flex items-center gap-1">
              <Gauge size={12} className="text-brand-gold/60" />
              <span>{formatMileage(listing.mileage)}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={12} className="text-brand-gold/60" />
              <span className="truncate">{listing.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Tag size={12} className="text-brand-gold/60" />
              <span>{listing.bodyStyle}</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-brand-gold/10 flex items-center justify-between">
            <span className="text-brand-light/40 text-xs">{listing.transmission} · {listing.fuelType}</span>
            <span className="text-brand-gold/60 text-xs">{listing.engineSize}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
