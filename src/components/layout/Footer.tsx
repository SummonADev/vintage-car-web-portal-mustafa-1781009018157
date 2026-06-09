import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';

export default function Footer() {
  return (
    <footer className="bg-brand-darker border-t border-brand-gold/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Logo size="md" className="mb-4" />
            <p className="text-brand-light/60 text-sm leading-relaxed max-w-sm">
              The premier marketplace for vintage and classic automobiles. Buy, sell, and auction the world's finest collector cars.
            </p>
          </div>
          <div>
            <h4 className="text-brand-gold font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm text-brand-light/60">
              <li><Link to="/listings" className="hover:text-brand-gold transition-colors">Browse Listings</Link></li>
              <li><Link to="/sell" className="hover:text-brand-gold transition-colors">Sell Your Car</Link></li>
              <li><Link to="/auction" className="hover:text-brand-gold transition-colors">Live Auctions</Link></li>
              <li><Link to="/auction/create" className="hover:text-brand-gold transition-colors">Create Auction</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-brand-gold font-semibold mb-4 text-sm uppercase tracking-wider">Account</h4>
            <ul className="space-y-2 text-sm text-brand-light/60">
              <li><Link to="/login" className="hover:text-brand-gold transition-colors">Log In</Link></li>
              <li><Link to="/register" className="hover:text-brand-gold transition-colors">Register</Link></li>
              <li><Link to="/dashboard" className="hover:text-brand-gold transition-colors">Dashboard</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-brand-gold/20 mt-8 pt-8 text-center text-brand-light/40 text-xs">
          <p>© {new Date().getFullYear()} VCCP — Vintage Car Collectors Portal. All rights reserved.</p>
          <p className="mt-1">All vehicle information provided by sellers. VCCP does not guarantee accuracy.</p>
        </div>
      </div>
    </footer>
  );
}
