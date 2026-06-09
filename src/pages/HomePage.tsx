import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Gavel, Search, TrendingUp, Clock, ChevronRight, Zap, Award } from 'lucide-react';
import CarCard from '@/components/CarCard';
import AuctionCard from '@/components/AuctionCard';
import SearchBar from '@/components/SearchBar';
import { initSampleData, getListings, getAuctions } from '@/lib/storage';
import { CarListing, AuctionListing, SearchFilters } from '@/types';
import { useNavigate } from 'react-router-dom';
import { getBrandLogo } from '@/lib/brandLogos';

export default function HomePage() {
  const [featuredListings, setFeaturedListings] = useState<CarListing[]>([]);
  const [featuredAuctions, setFeaturedAuctions] = useState<AuctionListing[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    initSampleData();
    setFeaturedListings(getListings().slice(0, 4));
    const auctions = getAuctions();
    setFeaturedAuctions(auctions.filter(a => a.status === 'live' || a.status === 'upcoming').slice(0, 3));
  }, []);

  const handleSearch = (filters: Partial<SearchFilters>) => {
    const params = new URLSearchParams();
    if (filters.keyword) params.set('keyword', filters.keyword);
    if (filters.make) params.set('make', filters.make);
    if (filters.yearMin) params.set('yearMin', String(filters.yearMin));
    if (filters.yearMax) params.set('yearMax', String(filters.yearMax));
    navigate(`/listings?${params.toString()}`);
  };

  const makes = ['Ferrari', 'Porsche', 'Mercedes-Benz', 'Jaguar', 'Aston Martin', 'Bentley', 'Rolls-Royce', 'Bugatti', 'BMW', 'Ford', 'Chevrolet', 'Dodge'];

  const eras = [
    { label: 'Pre-War', years: 'Before 1945', color: 'from-orange-950/40 to-orange-900/10' },
    { label: 'Post-War', years: '1945 – 1959', color: 'from-orange-900/30 to-orange-800/10' },
    { label: 'Classic Era', years: '1960 – 1979', color: 'from-orange-800/25 to-orange-700/10' },
    { label: 'Modern Classic', years: '1980 – 2000', color: 'from-orange-700/20 to-orange-600/10' },
  ];

  return (
    <div className="min-h-screen">
      {/* ─── HERO ─── */}
      <section className="relative hero-bg min-h-[88vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute top-1/4 left-[10%] w-96 h-96 rounded-full bg-brand-gold/6 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-[10%] w-72 h-72 rounded-full bg-orange-900/15 blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-brand-gold/3 blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/25 text-brand-gold text-xs font-semibold uppercase tracking-widest mb-8 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
            The Premier Vintage Car Marketplace
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-bold leading-[1.05] mb-6 animate-slide-up">
            <span className="text-brand-light">Discover </span>
            <span className="gradient-text">Classic Cars</span>
            <br />
            <span className="text-brand-light">Like Never Before</span>
          </h1>

          <p className="text-brand-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in">
            Buy, sell, and auction the world's finest vintage automobiles.
            From pre-war classics to modern icons — all in one portal.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14 animate-fade-in">
            <Link
              to="/listings"
              className="group flex items-center justify-center gap-2.5 px-8 py-4 bg-brand-gold text-white font-bold rounded-2xl hover:bg-brand-gold-light transition-all shadow-gold text-base"
            >
              <Search size={18} />
              Browse All Cars
              <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/auction"
              className="group flex items-center justify-center gap-2.5 px-8 py-4 bg-white/5 border border-white/15 text-brand-light font-bold rounded-2xl hover:bg-white/10 hover:border-brand-gold/30 transition-all text-base backdrop-blur-sm"
            >
              <Gavel size={18} />
              Live Auctions
            </Link>
          </div>

          <div className="max-w-3xl mx-auto animate-slide-up">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative z-10 border-t border-white/5 bg-brand-darker/60 backdrop-blur-xl">
          <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Cars Listed', value: '2,400+', icon: '🚗' },
              { label: 'Auctions Held', value: '850+', icon: '🔨' },
              { label: 'Happy Collectors', value: '12,000+', icon: '⭐' },
              { label: 'Years of Trust', value: '15+', icon: '🏆' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <p className="text-brand-gold font-bold text-xl font-display">{stat.value}</p>
                <p className="text-brand-muted text-xs font-medium mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BROWSE BY MAKE ─── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-brand-gold text-xs font-semibold uppercase tracking-widest mb-2">Explore</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-light">Browse by Make</h2>
            </div>
            <Link to="/listings" className="hidden sm:flex items-center gap-2 text-brand-muted hover:text-brand-gold transition-colors text-sm font-medium">
              View All <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {makes.map((make) => {
              const logo = getBrandLogo(make);
              return (
                <Link
                  key={make}
                  to={`/listings?make=${encodeURIComponent(make)}`}
                  className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-brand-surface border border-white/6 hover:border-brand-gold/40 hover:bg-brand-gold/8 transition-all text-center card-hover"
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                    {logo ? (
                      logo
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-brand-gold/12 flex items-center justify-center">
                        <span className="text-brand-gold text-xs font-bold">{make.slice(0, 2).toUpperCase()}</span>
                      </div>
                    )}
                  </div>
                  <span className="text-brand-light text-xs font-medium group-hover:text-brand-gold transition-colors leading-tight">{make}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── BROWSE BY ERA ─── */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-brand-gold text-xs font-semibold uppercase tracking-widest mb-2">Eras</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-light">Browse by Era</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {eras.map(era => (
              <Link
                key={era.label}
                to={`/listings`}
                className={`group relative p-6 rounded-2xl bg-gradient-to-br ${era.color} border border-brand-gold/10 hover:border-brand-gold/35 transition-all card-hover overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/0 to-brand-gold/8 opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="text-brand-gold font-bold text-lg font-display relative z-10">{era.label}</p>
                <p className="text-brand-muted text-sm mt-1 relative z-10">{era.years}</p>
                <ArrowRight size={16} className="text-brand-gold/40 mt-4 group-hover:translate-x-1 transition-transform relative z-10" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LIVE AUCTIONS ─── */}
      {featuredAuctions.length > 0 && (
        <section className="py-20 px-4 bg-brand-surface/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-red-400 uppercase tracking-widest">
                    <span className="w-2 h-2 rounded-full bg-red-500 auction-pulse" />
                    Live Now
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-light">Active Auctions</h2>
              </div>
              <Link to="/auction" className="hidden sm:flex items-center gap-2 text-brand-muted hover:text-brand-gold transition-colors text-sm font-medium">
                View All <ArrowRight size={15} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredAuctions.map(a => (
                <AuctionCard key={a.id} auction={a} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── FEATURED LISTINGS ─── */}
      {featuredListings.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-brand-gold text-xs font-semibold uppercase tracking-widest mb-2">Hand-Picked</p>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-light">Featured Listings</h2>
              </div>
              <Link to="/listings" className="hidden sm:flex items-center gap-2 text-brand-muted hover:text-brand-gold transition-colors text-sm font-medium">
                View All <ArrowRight size={15} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredListings.map(l => (
                <CarCard key={l.id} listing={l} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── WHY VCCP ─── */}
      <section className="py-20 px-4 bg-brand-surface/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-brand-gold text-xs font-semibold uppercase tracking-widest mb-3">Why Choose Us</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-light">The VCCP Difference</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Shield size={24} />,
                title: 'Verified Sellers',
                desc: 'Every seller is verified and all listings reviewed for accuracy and authenticity.',
                tag: 'Trust'
              },
              {
                icon: <Award size={24} />,
                title: 'Expert Curation',
                desc: 'Our team of classic car experts ensures every auction meets our quality standards.',
                tag: 'Quality'
              },
              {
                icon: <TrendingUp size={24} />,
                title: 'Market Transparency',
                desc: 'Full bid history, reserve prices, and fair market valuations for every vehicle.',
                tag: 'Fair'
              },
            ].map(f => (
              <div key={f.title} className="relative p-6 rounded-2xl bg-brand-surface border border-white/6 hover:border-brand-gold/25 transition-all group">
                <div className="absolute top-4 right-4 px-2 py-1 bg-brand-gold/10 rounded-lg">
                  <span className="text-brand-gold text-xs font-semibold">{f.tag}</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-4 group-hover:bg-brand-gold/18 transition-colors">
                  {f.icon}
                </div>
                <h3 className="text-brand-light font-semibold mb-2">{f.title}</h3>
                <p className="text-brand-muted text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/10 via-brand-darker to-brand-darker" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-brand-gold/25 via-brand-gold/8 to-transparent" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/25 text-brand-gold text-xs font-semibold mb-6">
            <Zap size={12} />
            Ready to Sell?
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-light mb-5">
            Your Classic Deserves
            <br />
            <span className="gradient-text">a Premium Platform</span>
          </h2>
          <p className="text-brand-muted text-lg mb-10 leading-relaxed">
            Join thousands of collectors who have found new homes for their vintage automobiles through VCCP.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/sell"
              className="px-8 py-4 bg-brand-gold text-white font-bold rounded-2xl hover:bg-brand-gold-light transition-all shadow-gold text-base"
            >
              List Your Car
            </Link>
            <Link
              to="/auction/create"
              className="px-8 py-4 bg-white/5 border border-white/15 text-brand-light font-bold rounded-2xl hover:bg-white/10 hover:border-brand-gold/30 transition-all text-base"
            >
              Create Auction
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
