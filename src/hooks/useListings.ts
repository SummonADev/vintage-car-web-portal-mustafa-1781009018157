import { useState, useCallback } from 'react';
import { CarListing, SearchFilters } from '@/types';
import { getListings } from '@/lib/storage';

export function useListings() {
  const [listings, setListings] = useState<CarListing[]>([]);

  const refresh = useCallback(() => {
    setListings(getListings());
  }, []);

  const filterListings = useCallback((filters: Partial<SearchFilters>): CarListing[] => {
    let result = getListings().filter(l => l.status === 'active');

    if (filters.keyword) {
      const kw = filters.keyword.toLowerCase();
      result = result.filter(l =>
        l.title.toLowerCase().includes(kw) ||
        l.make.toLowerCase().includes(kw) ||
        l.model.toLowerCase().includes(kw) ||
        l.description.toLowerCase().includes(kw)
      );
    }
    if (filters.make && filters.make !== '') {
      result = result.filter(l => l.make === filters.make);
    }
    if (filters.model && filters.model !== '') {
      result = result.filter(l => l.model.toLowerCase().includes((filters.model as string).toLowerCase()));
    }
    if (filters.yearMin !== '' && filters.yearMin !== undefined) {
      result = result.filter(l => l.year >= Number(filters.yearMin));
    }
    if (filters.yearMax !== '' && filters.yearMax !== undefined) {
      result = result.filter(l => l.year <= Number(filters.yearMax));
    }
    if (filters.priceMin !== '' && filters.priceMin !== undefined) {
      result = result.filter(l => l.price >= Number(filters.priceMin));
    }
    if (filters.priceMax !== '' && filters.priceMax !== undefined) {
      result = result.filter(l => l.price <= Number(filters.priceMax));
    }
    if (filters.mileageMax !== '' && filters.mileageMax !== undefined) {
      result = result.filter(l => l.mileage <= Number(filters.mileageMax));
    }
    if (filters.condition) {
      const cond = filters.condition as string;
      if (cond !== '') {
        result = result.filter(l => (l.condition as string) === cond);
      }
    }
    if (filters.bodyStyle) {
      const bs = filters.bodyStyle as string;
      if (bs !== '') {
        result = result.filter(l => (l.bodyStyle as string) === bs);
      }
    }
    if (filters.fuelType) {
      const ft = filters.fuelType as string;
      if (ft !== '') {
        result = result.filter(l => (l.fuelType as string) === ft);
      }
    }
    if (filters.transmission) {
      const tr = filters.transmission as string;
      if (tr !== '') {
        result = result.filter(l => (l.transmission as string) === tr);
      }
    }
    if (filters.location && filters.location !== '') {
      result = result.filter(l => l.location.toLowerCase().includes((filters.location as string).toLowerCase()));
    }
    return result;
  }, []);

  return { listings, refresh, filterListings };
}
