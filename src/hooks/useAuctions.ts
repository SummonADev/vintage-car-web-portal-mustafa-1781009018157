import { useState, useCallback } from 'react';
import { AuctionListing } from '@/types';
import { getAuctions, saveAuctions } from '@/lib/storage';

export function useAuctions() {
  const [auctions, setAuctions] = useState<AuctionListing[]>([]);

  const refresh = useCallback(() => {
    const all = getAuctions();
    const now = new Date();
    const updated = all.map(a => {
      if (a.status === 'live' && new Date(a.endTime) <= now) {
        const reserveMet = a.currentHighBid >= a.reservePrice;
        return { ...a, status: (reserveMet ? 'sold' : 'no_reserve_met') as any };
      }
      if (a.status === 'upcoming' && new Date(a.startTime) <= now) {
        return { ...a, status: 'live' as any };
      }
      return a;
    });
    saveAuctions(updated);
    setAuctions(updated);
  }, []);

  return { auctions, refresh };
}
