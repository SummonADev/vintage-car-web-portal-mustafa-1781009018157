import { useState } from 'react';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { SearchFilters, CarCondition, BodyStyle, FuelType, TransmissionType } from '@/types';
import { CAR_MAKES, YEARS, BODY_STYLES, CONDITIONS, FUEL_TYPES, TRANSMISSION_TYPES } from '@/lib/utils';
import clsx from 'clsx';

type SearchBarProps = {
  onSearch: (filters: Partial<SearchFilters>) => void;
  initialFilters?: Partial<SearchFilters>;
};

const DEFAULT_FILTERS: Partial<SearchFilters> = {
  make: '',
  model: '',
  yearMin: '',
  yearMax: '',
  priceMin: '',
  priceMax: '',
  mileageMax: '',
  condition: '',
  bodyStyle: '',
  fuelType: '',
  transmission: '',
  location: '',
  keyword: '',
};

export default function SearchBar({ onSearch, initialFilters = {} }: SearchBarProps) {
  const [filters, setFilters] = useState<Partial<SearchFilters>>({ ...DEFAULT_FILTERS, ...initialFilters });
  const [expanded, setExpanded] = useState(false);

  const handleChange = (field: string, value: string | number) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS);
    onSearch(DEFAULT_FILTERS);
  };

  const hasFilters = Object.values(filters).some(v => v !== '' && v !== undefined);

  const selectCls = 'w-full bg-brand-darker border border-white/10 rounded-xl px-3 py-2.5 text-brand-light text-sm focus:outline-none focus:border-brand-gold/60 focus:ring-2 focus:ring-brand-gold/12 transition-all appearance-none cursor-pointer';
  const inputCls = 'w-full bg-brand-darker border border-white/10 rounded-xl px-3 py-2.5 text-brand-light text-sm focus:outline-none focus:border-brand-gold/60 focus:ring-2 focus:ring-brand-gold/12 transition-all placeholder-brand-muted';
  const labelCls = 'block text-brand-muted text-xs font-medium mb-1.5 uppercase tracking-wider';

  return (
    <form onSubmit={handleSubmit} className="">
      {/* Main search row */}
      <div className="flex gap-2 items-center">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none" />
          <input
            type="text"
            placeholder="Search make, model, year..."
            value={filters.keyword || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('keyword', e.target.value)}
            className="w-full bg-brand-surface border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-brand-light text-sm focus:outline-none focus:border-brand-gold/60 focus:ring-2 focus:ring-brand-gold/12 transition-all placeholder-brand-muted"
          />
        </div>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className={clsx(
            'flex items-center gap-2 px-4 py-3.5 rounded-2xl border text-sm font-medium transition-all',
            expanded
              ? 'bg-brand-gold/15 border-brand-gold/50 text-brand-gold'
              : 'bg-brand-surface border-white/10 text-brand-muted hover:text-brand-light hover:border-white/20'
          )}
        >
          <SlidersHorizontal size={15} />
          <span className="hidden sm:block">Filters</span>
          <ChevronDown size={13} className={clsx('transition-transform', expanded && 'rotate-180')} />
        </button>
        <button
          type="submit"
          className="px-6 py-3.5 bg-brand-gold text-white font-semibold rounded-2xl hover:bg-brand-gold-light transition-all text-sm shadow-gold whitespace-nowrap"
        >
          Search
        </button>
        {hasFilters && (
          <button
            type="button"
            onClick={handleReset}
            className="p-3.5 rounded-2xl bg-brand-surface border border-white/10 text-brand-muted hover:text-brand-light hover:border-white/20 transition-all"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Expanded filters */}
      {expanded && (
        <div className="mt-4 bg-brand-surface border border-white/8 rounded-2xl p-5 animate-slide-up">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            <div>
              <label className={labelCls}>Make</label>
              <div className="relative">
                <select
                  value={filters.make || ''}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange('make', e.target.value)}
                  className={selectCls}
                >
                  <option value="">Any Make</option>
                  {CAR_MAKES.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className={labelCls}>Model</label>
              <input
                type="text"
                placeholder="Any model"
                value={filters.model || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('model', e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Year From</label>
              <select
                value={filters.yearMin || ''}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange('yearMin', e.target.value ? Number(e.target.value) : '')}
                className={selectCls}
              >
                <option value="">Any</option>
                {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Year To</label>
              <select
                value={filters.yearMax || ''}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange('yearMax', e.target.value ? Number(e.target.value) : '')}
                className={selectCls}
              >
                <option value="">Any</option>
                {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Min Price</label>
              <input
                type="number"
                placeholder="$0"
                value={filters.priceMin || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('priceMin', e.target.value ? Number(e.target.value) : '')}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Max Price</label>
              <input
                type="number"
                placeholder="Any"
                value={filters.priceMax || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('priceMax', e.target.value ? Number(e.target.value) : '')}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Max Mileage</label>
              <input
                type="number"
                placeholder="Any"
                value={filters.mileageMax || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('mileageMax', e.target.value ? Number(e.target.value) : '')}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Condition</label>
              <select
                value={filters.condition || ''}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange('condition', e.target.value as CarCondition | '')}
                className={selectCls}
              >
                <option value="">Any</option>
                {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Body Style</label>
              <select
                value={filters.bodyStyle || ''}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange('bodyStyle', e.target.value as BodyStyle | '')}
                className={selectCls}
              >
                <option value="">Any</option>
                {BODY_STYLES.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Fuel Type</label>
              <select
                value={filters.fuelType || ''}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange('fuelType', e.target.value as FuelType | '')}
                className={selectCls}
              >
                <option value="">Any</option>
                {FUEL_TYPES.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Transmission</label>
              <select
                value={filters.transmission || ''}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange('transmission', e.target.value as TransmissionType | '')}
                className={selectCls}
              >
                <option value="">Any</option>
                {TRANSMISSION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Location</label>
              <input
                type="text"
                placeholder="City, State"
                value={filters.location || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('location', e.target.value)}
                className={inputCls}
              />
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
