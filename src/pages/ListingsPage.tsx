import { useEffect, useState, useCallback } from 'react';
import { Grid, List, SortDesc } from 'lucide-react';
import CarCard from '@/components/CarCard';
import SearchBar from '@/components/SearchBar';
import { useListings } from '@/hooks/useListings';
import { CarListing, SearchFilters } from '@/types';
import { initSampleData } from '@/lib/storage';
import { CAR_MAKES } from '@/lib/utils';
import clsx from 'clsx';

type SortOption = 'newest' | 'price_asc' | 'price_desc' | 'year_asc' | 'year_desc' | 'mileage_asc';

export default function ListingsPage() {
  const { filterListings } = useListings();
  const [results, setResults] = useState<CarListing[]>([]);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sort, setSort] = useState<SortOption>('newest');
  const [activeFilters, setActiveFilters] = useState<Partial<SearchFilters>>({});
  const [selectedMake, setSelectedMake] = useState('');

  useEffect(() => {
    initSampleData();
    setResults(filterListings({}));
  }, [filterListings]);

  const handleSearch = useCallback((filters: Partial<SearchFilters>) => {
    setActiveFilters(filters);
    const filtered = filterListings(filters);
    setResults(sortResults(filtered, sort));
  }, [filterListings, sort]);

  const handleMakeFilter = (make: string) => {
    setSelectedMake(make);
    const filters = { ...activeFilters, make };
    setActiveFilters(filters);
    setResults(sortResults(filterListings(filters), sort));
  };

  const sortResults = (items: CarListing[], s: SortOption): CarListing[] => {
    const sorted = [...items];
    switch (s) {
      case 'price_asc': return sorted.sort((a, b) => a.price - b.price);
      case 'price_desc': return sorted.sort((a, b) => b.price - a.price);
      case 'year_asc': return sorted.sort((a, b) => a.year - b.year);
      case 'year_desc': return sorted.sort((a, b) => b.year - a.year);
      case 'mileage_asc': return sorted.sort((a, b) => a.mileage - b.mileage);
      default: return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  };

  const handleSort = (s: SortOption) => {
    setSort(s);
    setResults(sortResults(results, s));
  };

  const makeCounts: Record<string, number> = {};
  const allListings = filterListings({});
  allListings.forEach(l => {
    makeCounts[l.make] = (makeCounts[l.make] || 0) + 1;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-serif font-bold text-brand-gold mb-2">Browse Classic Cars</h1>
        <p className="text-brand-light/50">{results.length} vehicles found</p>
      </div>

      <div className="mb-6">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="vintage-card rounded-lg p-4 mb-4">
            <h3 className="text-brand-gold font-semibold text-sm uppercase tracking-wider mb-4">Browse by Make</h3>
            <button
              onClick={() => handleMakeFilter('')}
              className={clsx(
                'w-full text-left px-2 py-1.5 text-sm rounded mb-1 transition-colors',
                selectedMake === '' ? 'text-brand-gold bg-brand-gold/10' : 'text-brand-light/60 hover:text-brand-gold'
              )}
            >
              All Makes ({allListings.length})
            </button>
            {Object.entries(makeCounts).sort((a, b) => b[1] - a[1]).map(([make, count]) => (
              <button
                key={make}
                onClick={() => handleMakeFilter(make)}
                className={clsx(
                  'w-full text-left px-2 py-1.5 text-sm rounded mb-1 transition-colors flex justify-between',
                  selectedMake === make ? 'text-brand-gold bg-brand-gold/10' : 'text-brand-light/60 hover:text-brand-gold'
                )}
              >
                <span>{make}</span>
                <span className="text-brand-light/30">{count}</span>
              </button>
            ))}
          </div>

          <div className="vintage-card rounded-lg p-4">
            <h3 className="text-brand-gold font-semibold text-sm uppercase tracking-wider mb-4">Browse by Era</h3>
            {[
              { label: 'Pre-War (before 1945)', min: 1900, max: 1944 },
              { label: 'Post-War (1945–1959)', min: 1945, max: 1959 },
              { label: 'Classic Era (1960–1979)', min: 1960, max: 1979 },
              { label: 'Modern Classic (1980–2000)', min: 1980, max: 2000 },
            ].map(era => (
              <button
                key={era.label}
                onClick={() => handleSearch({ ...activeFilters, yearMin: era.min, yearMax: era.max })}
                className="w-full text-left px-2 py-1.5 text-sm text-brand-light/60 hover:text-brand-gold rounded transition-colors"
              >
                {era.label}
              </button>
            ))}
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <SortDesc size={16} className="text-brand-gold/60" />
              <select
                value={sort}
                onChange={(e: any) => handleSort(e.target.value as SortOption)}
                className="bg-brand-dark border border-brand-gold/30 text-brand-light text-sm rounded px-3 py-1.5 focus:outline-none focus:border-brand-gold"
              >
                <option value="newest">Newest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="year_desc">Year: Newest</option>
                <option value="year_asc">Year: Oldest</option>
                <option value="mileage_asc">Lowest Mileage</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setView('grid')}
                className={clsx('p-2 rounded', view === 'grid' ? 'text-brand-gold bg-brand-gold/10' : 'text-brand-light/40 hover:text-brand-gold')}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setView('list')}
                className={clsx('p-2 rounded', view === 'list' ? 'text-brand-gold bg-brand-gold/10' : 'text-brand-light/40 hover:text-brand-gold')}
              >
                <List size={18} />
              </button>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="text-center py-20 text-brand-light/40">
              <p className="text-lg">No vehicles found</p>
              <p className="text-sm mt-2">Try adjusting your search filters</p>
            </div>
          ) : (
            <div className={clsx(
              view === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                : 'space-y-4'
            )}>
              {results.map(l => (
                <CarCard key={l.id} listing={l} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
