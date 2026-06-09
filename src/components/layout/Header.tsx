import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import Logo from '@/components/Logo';
import { useAuth } from '@/hooks/useAuth';
import clsx from 'clsx';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/listings', label: 'Browse Cars' },
    { to: '/sell', label: 'Sell Your Car' },
    { to: '/auction', label: 'Live Auctions' },
  ];

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <header className="bg-brand-dark border-b border-brand-gold/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/"><Logo size="sm" /></Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={clsx(
                  'px-4 py-2 text-sm font-serif transition-colors rounded',
                  isActive(link.to)
                    ? 'text-brand-gold bg-brand-gold/10'
                    : 'text-brand-light/70 hover:text-brand-gold hover:bg-brand-gold/5'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 text-brand-gold border border-brand-gold/40 rounded hover:bg-brand-gold/10 transition-colors text-sm"
                >
                  <User size={16} />
                  <span className="hidden sm:block">{currentUser.name}</span>
                  <ChevronDown size={14} />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-brand-dark border border-brand-gold/40 rounded shadow-xl z-50">
                    <div className="px-4 py-3 border-b border-brand-gold/20">
                      <p className="text-brand-gold text-sm font-semibold">{currentUser.name}</p>
                      <p className="text-brand-light/50 text-xs">{currentUser.email}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 text-brand-light/70 hover:text-brand-gold hover:bg-brand-gold/5 text-sm"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <User size={14} /> My Dashboard
                    </Link>
                    <button
                      onClick={() => { logout(); setUserMenuOpen(false); }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-brand-light/70 hover:text-red-400 hover:bg-red-900/10 text-sm"
                    >
                      <LogOut size={14} /> Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm text-brand-gold border border-brand-gold/40 rounded hover:bg-brand-gold/10 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm bg-brand-gold text-brand-dark rounded hover:bg-brand-gold/80 transition-colors font-semibold"
                >
                  Register
                </Link>
              </div>
            )}
            <button
              className="md:hidden text-brand-gold"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-brand-gold/20 bg-brand-dark">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={clsx(
                'block px-6 py-3 text-sm border-b border-brand-gold/10',
                isActive(link.to) ? 'text-brand-gold' : 'text-brand-light/70'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
