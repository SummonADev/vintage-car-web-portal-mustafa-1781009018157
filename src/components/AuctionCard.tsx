import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Gavel, TrendingUp, AlertCircle } from 'lucide-react';
import { AuctionListing } from '@/types';
import { formatCurrency, getTimeRemaining, pad } from '@/lib/utils';
import clsx from 'clsx';

type AuctionCardProps = {
  auction: AuctionListing;
};

const statusConfig: Record<string, { label: string; color: string }> = {
  upcoming: { label: 'Upcoming', color: 'text-blue-400 bg-blue-900/30 border-blue-700/50' },
  live: { label: 'LIVE', color: 'text-red-400 bg-red-900/40 border-red-600/60 auction-pulse' },
  ended: { label: 'Ended', color: 'text-gray-400 bg-gray-900/30 border-gray-700/50' },
  sold: { label: 'SOLD', color: 'text-green-400 bg-green-900/30 border-green-700/50' },
  no_reserve_met: { label: 'Reserve Not Met', color: 'text-orange-400 bg-orange-900/30 border-orange-700/50' },
};

export default function AuctionCard({ auction }: AuctionCardProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(auction.endTime));

  useEffect(() => {
    if (auction.status !== 'live') return;
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining(auction.endTime));
    }, 1000);
    return () => clearInterval(interval);
  }, [auction.endTime, auction.status]);

  const sc = statusConfig[auction.status] || statusConfig.ended;
  const reserveMet = auction.currentHighBid >= auction.reservePrice;

  return (
    <Link to={`/auction/${auction.id}`} className="block group">
      <div className="vintage-card rounded-lg overflow-hidden transition-all duration-300 group-hover:transform group-hover:-translate-y-1">
        <div className="relative bg-brand-dark/80 h-48 flex items-center justify-center">
          {auction.car.images && auction.car.images.length > 0 ? (
            <img src={auction.car.images[0]} alt={auction.car.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-brand-dark to-brand-darker">
              <svg width="80" height="50" viewBox="0 0 80 50" fill="none">
                <path d="M5 35 L8 28 L18 18 L62 18 L72 28 L75 35 Z" fill="#2a1500" stroke="#c9a84c" strokeWidth="1.5"/>
                <path d="M18 18 L24 10 L56 10 L62 18" fill="#1a0a00" stroke="#c9a84c" strokeWidth="1"/>
                <circle cx="18" cy="38" r="6" fill="none" stroke="#c9a84c" strokeWidth="1.5"/>
                <circle cx="62" cy="38" r="6" fill="none" stroke="#c9a84c" strokeWidth="1.5"/>
              </svg>
              <p className="text-brand-gold/40 text-xs mt-2">No Photo</p>
            </div>
          )}
          <div className="absolute top-2 left-2">
            <span className={clsx('text-xs px-2 py-1 rounded border font-semibold', sc.color)}>
              {sc.label}
            </span>
          </div>
          {auction.status === 'live' && (
            <div className="absolute bottom-2 left-2 right-2 bg-brand-dark/80 rounded px-2 py-1">
              <div className="flex items-center justify-center gap-1 text-brand-gold text-sm font-mono font-bold">
                <Clock size={12} />
                <span>{pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}</span>
              </div>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-brand-gold font-semibold text-sm leading-tight mb-3 line-clamp-2">
            {auction.car.year} {auction.car.make} {auction.car.model}
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-brand-light/60">
                <TrendingUp size={12} className="text-brand-gold/60" />
                <span>Current Bid</span>
              </div>
              <span className="text-brand-gold font-bold text-sm">
                {auction.currentHighBid > 0 ? formatCurrency(auction.currentHighBid) : 'No bids yet'}
              </span>
            </div>
            {auction.currentHighBidder && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-brand-light/60">
                  <Gavel size={12} className="text-brand-gold/60" />
                  <span>Leading</span>
                </div>
                <span className="text-brand-light/80 text-xs">{auction.currentHighBidder}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-xs text-brand-light/60">Reserve</span>
              <div className="flex items-center gap-1">
                {reserveMet ? (
                  <span className="text-green-400 text-xs font-semibold">✓ Met</span>
                ) : (
                  <span className="text-orange-400 text-xs flex items-center gap-1"><AlertCircle size={10}/> Not Met</span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-brand-light/60">Bids</span>
              <span className="text-brand-light/80 text-xs">{auction.bids.length}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
