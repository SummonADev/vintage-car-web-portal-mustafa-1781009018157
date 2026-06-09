import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Gavel, Users, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { AuctionListing } from '@/types';
import { formatCurrency, getTimeRemaining, pad } from '@/lib/utils';
import clsx from 'clsx';

type AuctionCardProps = {
  auction: AuctionListing;
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

  const reserveMet = auction.currentHighBid >= auction.reservePrice;
  const isLive = auction.status === 'live';
  const isUpcoming = auction.status === 'upcoming';
  const isEnded = auction.status === 'ended' || auction.status === 'sold' || auction.status === 'no_reserve_met';

  const statusDisplay = {
    live: { label: '● LIVE', cls: 'bg-red-500/15 text-red-400 border-red-500/30' },
    upcoming: { label: 'Upcoming', cls: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
    ended: { label: 'Ended', cls: 'bg-gray-500/15 text-gray-400 border-gray-500/30' },
    sold: { label: '✓ Sold', cls: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
    no_reserve_met: { label: 'Reserve Not Met', cls: 'bg-orange-500/15 text-orange-400 border-orange-500/30' },
  }[auction.status] || { label: 'Ended', cls: 'bg-gray-500/15 text-gray-400 border-gray-500/30' };

  return (
    <Link to={`/auction/${auction.id}`} className="block group card-hover">
      <div className="rounded-2xl overflow-hidden bg-brand-surface border border-white/6 shadow-card">
        {/* Image */}
        <div className="relative h-52 bg-brand-surface-2 overflow-hidden">
          {auction.car.images && auction.car.images.length > 0 ? (
            <img
              src={auction.car.images[0]}
              alt={auction.car.title}
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
              <p className="text-brand-muted text-xs mt-3 font-medium">No Photo</p>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          {/* Status badge */}
          <div className="absolute top-3 left-3">
            <span className={clsx(
              'text-xs px-3 py-1 rounded-full border font-semibold backdrop-blur-sm',
              statusDisplay.cls,
              isLive && 'auction-pulse'
            )}>
              {statusDisplay.label}
            </span>
          </div>

          {/* Countdown timer */}
          {isLive && (
            <div className="absolute bottom-3 left-3 right-3">
              <div className="bg-black/60 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-brand-muted text-xs">
                  <Clock size={11} />
                  <span>Time Left</span>
                </div>
                <span className="font-mono font-bold text-brand-gold text-sm tracking-wider">
                  {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
                </span>
              </div>
            </div>
          )}

          {isUpcoming && (
            <div className="absolute bottom-3 left-3 right-3">
              <div className="bg-black/60 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center justify-center">
                <span className="text-blue-400 text-xs font-medium">Starts Soon</span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-brand-light font-semibold text-sm leading-snug mb-3 line-clamp-1 group-hover:text-brand-gold transition-colors">
            {auction.car.year} {auction.car.make} {auction.car.model}
          </h3>

          {/* Bid info */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-brand-muted text-xs flex items-center gap-1.5">
                <TrendingUp size={11} className="text-brand-gold/60" />
                {isEnded ? 'Final Bid' : 'Current Bid'}
              </span>
              <span className={clsx('font-bold text-sm', isEnded ? 'text-brand-muted' : 'text-brand-gold')}>
                {auction.currentHighBid > 0 ? formatCurrency(auction.currentHighBid) : '—'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-brand-muted text-xs flex items-center gap-1.5">
                <Users size={11} className="text-brand-gold/60" />
                Bids
              </span>
              <span className="text-brand-light/70 text-xs font-medium">{auction.bids.length}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-brand-muted text-xs">Reserve</span>
              <div className="flex items-center gap-1">
                {reserveMet ? (
                  <span className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
                    <CheckCircle2 size={11} /> Met
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-amber-400 font-medium">
                    <AlertCircle size={11} /> Not Met
                  </span>
                )}
              </div>
            </div>
          </div>

          {auction.currentHighBidder && (
            <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-2">
              <Gavel size={11} className="text-brand-gold/60" />
              <span className="text-brand-muted text-xs">Leading: </span>
              <span className="text-brand-light/70 text-xs font-medium truncate">{auction.currentHighBidder}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
