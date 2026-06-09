import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, ChevronDown, Gavel, Car, PlusCircle, LayoutDashboard } from 'lucide-react';
import Logo from '@/components/Logo';
import { useAuth } from '@/hooks/useAuth';
import clsx from 'clsx';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/listings', label: 'Browse Cars', icon: <Car size={14} /> },
    { to: '/sell', label: 'Sell', icon: <PlusCircle size={14} /> },
    { to: '/auction', label: 'Auctions', icon: <Gavel size={14} /> },
  ];

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-brand-darker/95 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <Logo size="sm" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={clsx(
                  'relative flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                  isActive(link.to)
                    ? 'text-brand-gold bg-brand-gold/10'
                    : 'text-brand-light/60 hover:text-brand-light hover:bg-white/5'
                )}
              >
                {link.icon}
                {link.label}
                {isActive(link.to) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-gold" />
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-brand-gold/20 bg-brand-gold/5 hover:bg-brand-gold/10 hover:border-brand-gold/40 transition-all duration-200 text-sm"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-gold to-yellow-600 flex items-center justify-center text-xs font-bold text-brand-darker">
                    {currentUser.name[0].toUpperCase()}
                  </div>
                  <span className="hidden sm:block text-brand-light/80 max-w-[100px] truncate">{currentUser.name}</span>
                  <ChevronDown size={13} className={clsx('text-brand-gold/60 transition-transform', userMenuOpen && 'rotate-180')} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-brand-surface border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] z-50 overflow-hidden animate-fade-in">
                    <div className="px-4 py-3 bg-brand-gold/5 border-b border-white/5">
                      <p className="text-brand-gold text-sm font-semibold truncate">{currentUser.name}</p>
                      <p className="text-brand-muted text-xs mt-0.5 truncate">{currentUser.email}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-brand-light/70 hover:text-brand-light hover:bg-white/5 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <LayoutDashboard size={15} className="text-brand-gold/60" />
                        My Dashboard
                      </Link>
                      <button
                        onClick={() => { logout(); setUserMenuOpen(false); }}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-brand-light/70 hover:text-red-400 hover:bg-red-500/5 transition-colors"
                      >
                        <LogOut size={15} className="text-red-400/60" />
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="hidden sm:block px-4 py-2 text-sm font-medium text-brand-light/70 hover:text-brand-light transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-brand-gold to-yellow-500 text-brand-darker rounded-lg hover:opacity-90 transition-all shadow-gold"
                >
                  Register
                </Link>
              </div>
            )}

            <button
              className="md:hidden p-2 text-brand-light/60 hover:text-brand-light transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-brand-surface/95 backdrop-blur-xl border-t border-white/5 animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                  isActive(link.to)
                    ? 'text-brand-gold bg-brand-gold/10'
                    : 'text-brand-light/60 hover:text-brand-light hover:bg-white/5'
                )}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            {!currentUser && (
              <div className="pt-3 pb-2 flex gap-2">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center py-2.5 border border-brand-gold/30 text-brand-gold rounded-xl text-sm font-medium"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center py-2.5 bg-brand-gold text-brand-darker rounded-xl text-sm font-semibold"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
