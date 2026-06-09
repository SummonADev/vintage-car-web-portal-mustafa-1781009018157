import { useEffect, useState, useCallback } from 'react';
import { Grid, List, SortDesc, ChevronRight, X, Filter } from 'lucide-react';
import CarCard from '@/components/CarCard';
import SearchBar from '@/components/SearchBar';
import { useListings } from '@/hooks/useListings';
import { CarListing, SearchFilters } from '@/types';
import { initSampleData } from '@/lib/storage';
import { getBrandLogo } from '@/lib/brandLogos';
import clsx from 'clsx';

type SortOption = 'newest' | 'price_asc' | 'price_desc' | 'year_asc' | 'year_desc' | 'mileage_asc';

export default function ListingsPage() {
  const { filterListings } = useListings();
  const [results, setResults] = useState<CarListing[]>([]);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sort, setSort] = useState<SortOption>('newest');
  const [activeFilters, setActiveFilters] = useState<Partial<SearchFilters>>({});
  const [selectedMake, setSelectedMake] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    initSampleData();
    setResults(filterListings({}));
  }, [filterListings]);

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

  const handleSort = (s: SortOption) => {
    setSort(s);
    setResults(sortResults(results, s));
  };

  const allListings = filterListings({});
  const makeCounts: Record<string, number> = {};
  allListings.forEach(l => {
    makeCounts[l.make] = (makeCounts[l.make] || 0) + 1;
  });

  const eras = [
    { label: 'Pre-War', min: 1900, max: 1944 },
    { label: '1945–1959', min: 1945, max: 1959 },
    { label: '1960–1979', min: 1960, max: 1979 },
    { label: '1980–2000', min: 1980, max: 2000 },
  ];

  const Sidebar = (
    <div className="space-y-4">
      {/* Makes */}
      <div className="bg-brand-surface border border-white/6 rounded-2xl p-4">
        <h3 className="text-brand-light text-xs font-semibold uppercase tracking-widest mb-4">By Make</h3>
        <button
          onClick={() => handleMakeFilter('')}
          className={clsx(
            'w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all mb-1',
            selectedMake === ''
              ? 'bg-brand-gold/10 text-brand-gold border border-brand-gold/20'
              : 'text-brand-muted hover:text-brand-light hover:bg-white/5'
          )}
        >
          <span>All Makes</span>
          <span className="text-xs opacity-60">{allListings.length}</span>
        </button>
        {Object.entries(makeCounts).sort((a, b) => b[1] - a[1]).map(([make, count]) => {
          const logo = getBrandLogo(make);
          return (
            <button
              key={make}
              onClick={() => handleMakeFilter(make)}
              className={clsx(
                'w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all mb-1',
                selectedMake === make
                  ? 'bg-brand-gold/10 text-brand-gold border border-brand-gold/20'
                  : 'text-brand-muted hover:text-brand-light hover:bg-white/5'
              )}
            >
              {logo ? (
                <span className="w-6 h-6 rounded flex-shrink-0 overflow-hidden flex items-center justify-center" style={{ transform: 'scale(0.5)', transformOrigin: 'center', width: '24px', height: '24px' }}>
                  <span className="block" style={{ transform: 'scale(0.4)', transformOrigin: 'center' }}>
                    {logo}
                  </span>
                </span>
              ) : (
                <span className="w-6 h-6 rounded bg-brand-gold/15 flex-shrink-0 flex items-center justify-center text-brand-gold" style={{ fontSize: '8px', fontWeight: 700 }}>
                  {make.slice(0, 2).toUpperCase()}
                </span>
              )}
              <span className="flex-1 text-left truncate">{make}</span>
              <span className="text-xs opacity-50 flex-shrink-0">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Eras */}
      <div className="bg-brand-surface border border-white/6 rounded-2xl p-4">
        <h3 className="text-brand-light text-xs font-semibold uppercase tracking-widest mb-4">By Era</h3>
        {eras.map(era => (
          <button
            key={era.label}
            onClick={() => handleSearch({ ...activeFilters, yearMin: era.min, yearMax: era.max })}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm text-brand-muted hover:text-brand-light hover:bg-white/5 transition-all mb-1 group"
          >
            <span>{era.label}</span>
            <ChevronRight size={13} className="opacity-0 group-hover:opacity-60 transition-opacity" />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-darker">
      {/* Header bar */}
      <div className="border-b border-white/5 bg-brand-darker/80 backdrop-blur-xl sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-display font-bold text-brand-light">Browse Classic Cars</h1>
              <p className="text-brand-muted text-xs mt-0.5">{results.length} vehicles found</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-xl bg-brand-surface border border-white/10 text-brand-muted hover:text-brand-light text-sm transition-all"
              >
                <Filter size={14} />
                Filters
              </button>

              <select
                value={sort}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSort(e.target.value as SortOption)}
                className="bg-brand-surface border border-white/10 text-brand-light text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-brand-gold/40 cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="year_desc">Year: Newest</option>
                <option value="year_asc">Year: Oldest</option>
                <option value="mileage_asc">Lowest Mileage</option>
              </select>

              <div className="flex items-center bg-brand-surface border border-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => setView('grid')}
                  className={clsx('p-2.5 transition-all', view === 'grid' ? 'bg-brand-gold/15 text-brand-gold' : 'text-brand-muted hover:text-brand-light')}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={clsx('p-2.5 transition-all', view === 'list' ? 'bg-brand-gold/15 text-brand-gold' : 'text-brand-muted hover:text-brand-light')}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            {Sidebar}
          </aside>

          {/* Mobile Sidebar Overlay */}
          {sidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-40 flex">
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
              <div className="relative bg-brand-darker w-72 max-w-[85vw] h-full overflow-y-auto p-5 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-brand-light font-semibold">Filters</h2>
                  <button onClick={() => setSidebarOpen(false)} className="text-brand-muted hover:text-brand-light">
                    <X size={18} />
                  </button>
                </div>
                {Sidebar}
              </div>
            </div>
          )}

          {/* Results */}
          <div className="flex-1 min-w-0">
            {results.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-20 h-20 rounded-2xl bg-brand-surface flex items-center justify-center mb-6">
                  <svg width="36" height="28" viewBox="0 0 90 55" fill="none">
                    <path d="M6 40 L9 32 L21 21 L69 21 L81 32 L84 40 Z" fill="#13131f" stroke="#c9a84c" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M21 21 L27 13 L63 13 L69 21" fill="#0f0f1a" stroke="#c9a84c" strokeWidth="1.5" strokeLinejoin="round"/>
                    <circle cx="21" cy="43" r="7" fill="none" stroke="#c9a84c" strokeWidth="2"/>
                    <circle cx="69" cy="43" r="7" fill="none" stroke="#c9a84c" strokeWidth="2"/>
                  </svg>
                </div>
                <p className="text-brand-light text-lg font-semibold mb-2">No vehicles found</p>
                <p className="text-brand-muted text-sm">Try adjusting your search filters</p>
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
    </div>
  );
}
