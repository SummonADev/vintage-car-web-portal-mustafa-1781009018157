import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
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

  const handleChange = (field: string, value: any) => {
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

  const labelCls = 'block text-brand-light/60 text-xs mb-1 uppercase tracking-wider';
  const inputCls = 'w-full bg-brand-dark border border-brand-gold/30 rounded px-3 py-2 text-brand-light text-sm focus:outline-none focus:border-brand-gold transition-colors';
  const selectCls = 'w-full bg-brand-dark border border-brand-gold/30 rounded px-3 py-2 text-brand-light text-sm focus:outline-none focus:border-brand-gold transition-colors';

  return (
    <form onSubmit={handleSubmit} className="bg-brand-dark/80 border border-brand-gold/30 rounded-lg p-4">
      <div className="flex gap-3 items-center">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gold/50" />
          <input
            type="text"
            placeholder="Search by make, model, or keyword..."
            value={filters.keyword || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('keyword', e.target.value)}
            className={clsx(inputCls, 'pl-9')}
          />
        </div>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 px-4 py-2 border border-brand-gold/40 text-brand-gold rounded hover:bg-brand-gold/10 transition-colors text-sm"
        >
          <SlidersHorizontal size={16} />
          <span className="hidden sm:block">Filters</span>
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-brand-gold text-brand-dark font-bold rounded hover:bg-brand-gold/80 transition-colors text-sm"
        >
          Search
        </button>
        {Object.values(filters).some(v => v !== '' && v !== undefined) && (
          <button type="button" onClick={handleReset} className="text-brand-light/40 hover:text-brand-light transition-colors">
            <X size={18} />
          </button>
        )}
      </div>

      {expanded && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pt-4 border-t border-brand-gold/20">
          <div>
            <label className={labelCls}>Make</label>
            <select value={filters.make || ''} onChange={(e: any) => handleChange('make', e.target.value)} className={selectCls}>
              <option value="">Any Make</option>
              {CAR_MAKES.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Model</label>
            <input type="text" placeholder="Any model" value={filters.model || ''} onChange={(e: any) => handleChange('model', e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Year From</label>
            <select value={filters.yearMin || ''} onChange={(e: any) => handleChange('yearMin', e.target.value ? Number(e.target.value) : '')} className={selectCls}>
              <option value="">Any</option>
              {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Year To</label>
            <select value={filters.yearMax || ''} onChange={(e: any) => handleChange('yearMax', e.target.value ? Number(e.target.value) : '')} className={selectCls}>
              <option value="">Any</option>
              {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Min Price</label>
            <input type="number" placeholder="$0" value={filters.priceMin || ''} onChange={(e: any) => handleChange('priceMin', e.target.value ? Number(e.target.value) : '')} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Max Price</label>
            <input type="number" placeholder="Any" value={filters.priceMax || ''} onChange={(e: any) => handleChange('priceMax', e.target.value ? Number(e.target.value) : '')} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Max Mileage</label>
            <input type="number" placeholder="Any" value={filters.mileageMax || ''} onChange={(e: any) => handleChange('mileageMax', e.target.value ? Number(e.target.value) : '')} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Condition</label>
            <select value={filters.condition || ''} onChange={(e: any) => handleChange('condition', e.target.value as CarCondition | '')} className={selectCls}>
              <option value="">Any</option>
              {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Body Style</label>
            <select value={filters.bodyStyle || ''} onChange={(e: any) => handleChange('bodyStyle', e.target.value as BodyStyle | '')} className={selectCls}>
              <option value="">Any</option>
              {BODY_STYLES.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Fuel Type</label>
            <select value={filters.fuelType || ''} onChange={(e: any) => handleChange('fuelType', e.target.value as FuelType | '')} className={selectCls}>
              <option value="">Any</option>
              {FUEL_TYPES.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Transmission</label>
            <select value={filters.transmission || ''} onChange={(e: any) => handleChange('transmission', e.target.value as TransmissionType | '')} className={selectCls}>
              <option value="">Any</option>
              {TRANSMISSION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Location</label>
            <input type="text" placeholder="City, State" value={filters.location || ''} onChange={(e: any) => handleChange('location', e.target.value)} className={inputCls} />
          </div>
        </div>
      )}
    </form>
  );
}
