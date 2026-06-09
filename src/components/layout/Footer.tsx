import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Twitter, Instagram, Facebook } from 'lucide-react';
import Logo from '@/components/Logo';

export default function Footer() {
  return (
    <footer className="bg-brand-darker border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <Logo size="md" className="mb-5" />
            <p className="text-brand-muted text-sm leading-relaxed max-w-xs">
              The world's premier marketplace for vintage and collector automobiles. Where passion meets premium.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[Twitter, Instagram, Facebook].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-brand-muted hover:text-brand-gold hover:border-brand-gold/35 hover:bg-brand-gold/8 transition-all"
                >
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-2">
            <h4 className="text-brand-light text-xs font-semibold uppercase tracking-widest mb-5">Marketplace</h4>
            <ul className="space-y-3">
              {[
                { to: '/listings', label: 'Browse Cars' },
                { to: '/sell', label: 'Sell Your Car' },
                { to: '/auction', label: 'Live Auctions' },
                { to: '/auction/create', label: 'Create Auction' },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-brand-muted text-sm hover:text-brand-gold transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-brand-light text-xs font-semibold uppercase tracking-widest mb-5">Account</h4>
            <ul className="space-y-3">
              {[
                { to: '/login', label: 'Log In' },
                { to: '/register', label: 'Register' },
                { to: '/dashboard', label: 'Dashboard' },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-brand-muted text-sm hover:text-brand-gold transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="text-brand-light text-xs font-semibold uppercase tracking-widest mb-5">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-brand-muted text-sm">
                <div className="w-7 h-7 rounded-lg bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={13} className="text-brand-gold" />
                </div>
                Beverly Hills, CA 90210
              </li>
              <li className="flex items-center gap-3 text-brand-muted text-sm">
                <div className="w-7 h-7 rounded-lg bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                  <Phone size={13} className="text-brand-gold" />
                </div>
                +1 (800) VCCP-CAR
              </li>
              <li className="flex items-center gap-3 text-brand-muted text-sm">
                <div className="w-7 h-7 rounded-lg bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={13} className="text-brand-gold" />
                </div>
                hello@vccp.com
              </li>
            </ul>
          </div>
        </div>

        <div className="section-divider mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-brand-muted text-xs">
            © {new Date().getFullYear()} VCCP — Vintage Car Collectors Portal. All rights reserved.
          </p>
          <p className="text-brand-muted text-xs">
            All vehicle information provided by sellers. VCCP does not guarantee accuracy.
          </p>
        </div>
      </div>
    </footer>
  );
}
