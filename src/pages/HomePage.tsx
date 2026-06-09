import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Gavel, Search, TrendingUp } from 'lucide-react';
import Logo from '@/components/Logo';
import CarCard from '@/components/CarCard';
import AuctionCard from '@/components/AuctionCard';
import { initSampleData, getListings, getAuctions } from '@/lib/storage';
import { useState } from 'react';
import { CarListing, AuctionListing } from '@/types';

export default function HomePage() {
  const [featuredListings, setFeaturedListings] = useState<CarListing[]>([]);
  const [featuredAuctions, setFeaturedAuctions] = useState<AuctionListing[]>([]);

  useEffect(() => {
    initSampleData();
    setFeaturedListings(getListings().slice(0, 4));
    const auctions = getAuctions();
    setFeaturedAuctions(auctions.filter(a => a.status === 'live' || a.status === 'upcoming').slice(0, 3));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative hero-gradient py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-brand-gold/5 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-brand-gold/3 blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <Logo size="lg" className="justify-center mb-8" />
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-gold mb-4 leading-tight">
            Where Classic Cars
            <br />
            <span className="text-brand-light">Find New Owners</span>
          </h1>
          <p className="text-brand-light/60 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            The premier marketplace for vintage and collector automobiles. Buy, sell, and auction the world's finest classic cars.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/listings"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-brand-gold text-brand-dark font-bold rounded-lg hover:bg-brand-gold/80 transition-colors text-lg"
            >
              <Search size={20} /> Browse Listings
            </Link>
            <Link
              to="/auction"
              className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-brand-gold text-brand-gold font-bold rounded-lg hover:bg-brand-gold/10 transition-colors text-lg"
            >
              <Gavel size={20} /> Live Auctions
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-4xl mx-auto mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Cars Listed', value: '2,400+' },
            { label: 'Auctions Held', value: '850+' },
            { label: 'Happy Collectors', value: '12,000+' },
            { label: 'Years of Trust', value: '15+' },
          ].map(stat => (
            <div key={stat.label} className="text-center p-4 border border-brand-gold/20 rounded-lg bg-brand-dark/40">
              <p className="text-brand-gold text-2xl font-bold">{stat.value}</p>
              <p className="text-brand-light/50 text-xs mt-1 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-brand-gold text-center mb-12">Why Choose VCCP?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Shield size={32} />, title: 'Verified Sellers', desc: 'Every seller is verified and all listings are reviewed for accuracy and authenticity.' },
              { icon: <Star size={32} />, title: 'Expert Curation', desc: 'Our team of classic car experts curates every auction to ensure quality and value.' },
              { icon: <TrendingUp size={32} />, title: 'Market Transparency', desc: 'Full bid history, transparent reserve prices, and fair market valuations for every car.' },
            ].map(f => (
              <div key={f.title} className="vintage-card rounded-lg p-6 text-center">
                <div className="text-brand-gold mb-4 flex justify-center">{f.icon}</div>
                <h3 className="text-brand-gold font-semibold mb-2">{f.title}</h3>
                <p className="text-brand-light/60 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Auctions */}
      {featuredAuctions.length > 0 && (
        <section className="py-16 px-4 bg-brand-dark/40">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-serif font-bold text-brand-gold">Live Auctions</h2>
                <p className="text-brand-light/50 text-sm mt-1">Bid on the finest vintage automobiles</p>
              </div>
              <Link
                to="/auction"
                className="flex items-center gap-2 text-brand-gold hover:text-brand-light transition-colors text-sm"
              >
                View All <ArrowRight size={16} />
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

      {/* Featured Listings */}
      {featuredListings.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-serif font-bold text-brand-gold">Featured Listings</h2>
                <p className="text-brand-light/50 text-sm mt-1">Hand-picked classics available now</p>
              </div>
              <Link
                to="/listings"
                className="flex items-center gap-2 text-brand-gold hover:text-brand-light transition-colors text-sm"
              >
                View All <ArrowRight size={16} />
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

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-brand-darker via-brand-dark to-brand-darker">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-brand-gold mb-4">Ready to Sell Your Classic?</h2>
          <p className="text-brand-light/60 mb-8">Join thousands of sellers who have found new homes for their vintage automobiles through VCCP.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/sell" className="px-8 py-4 bg-brand-gold text-brand-dark font-bold rounded-lg hover:bg-brand-gold/80 transition-colors">
              List Your Car
            </Link>
            <Link to="/auction/create" className="px-8 py-4 border border-brand-gold text-brand-gold font-bold rounded-lg hover:bg-brand-gold/10 transition-colors">
              Create Auction
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
