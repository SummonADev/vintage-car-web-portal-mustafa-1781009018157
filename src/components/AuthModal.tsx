import { useState } from 'react';
import { X, Eye, EyeOff, User, Mail, Lock, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Logo from '@/components/Logo';
import clsx from 'clsx';

type AuthModalProps = {
  mode: 'login' | 'register';
  onClose: () => void;
  onSuccess: () => void;
  redirectMessage?: string;
};

export default function AuthModal({ mode, onClose, onSuccess, redirectMessage }: AuthModalProps) {
  const [activeMode, setActiveMode] = useState<'login' | 'register'>(mode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'seller' | 'bidder' | 'both'>('both');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (activeMode === 'login') {
        const res = login(email, password);
        if (res.success) {
          onSuccess();
        } else {
          setError(res.error || 'Login failed');
        }
      } else {
        if (!name.trim()) { setError('Name is required'); setLoading(false); return; }
        const res = register(name, email, password, role);
        if (res.success) {
          onSuccess();
        } else {
          setError(res.error || 'Registration failed');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const inputWrapCls = 'relative';
  const inputCls = 'w-full bg-brand-darker border border-white/10 rounded-xl px-4 py-3.5 pl-11 text-brand-light text-sm focus:outline-none focus:border-brand-gold/50 focus:ring-2 focus:ring-brand-gold/10 transition-all placeholder-brand-muted';
  const iconCls = 'absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted';

  const roles = [
    { value: 'both', label: 'Buyer & Seller', desc: 'Full access' },
    { value: 'bidder', label: 'Buyer / Bidder', desc: 'Browse & bid' },
    { value: 'seller', label: 'Seller', desc: 'List & auction' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-brand-surface border border-white/10 rounded-3xl w-full max-w-md shadow-[0_30px_80px_rgba(0,0,0,0.7)] animate-slide-up">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-brand-muted hover:text-brand-light hover:bg-white/10 transition-all z-10"
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-white/5">
          <div className="flex justify-center mb-5">
            <Logo size="sm" />
          </div>

          {redirectMessage && (
            <div className="mb-4 px-4 py-3 bg-brand-gold/10 border border-brand-gold/20 rounded-xl text-brand-gold text-sm text-center">
              {redirectMessage}
            </div>
          )}

          {/* Tab switcher */}
          <div className="flex bg-brand-darker rounded-2xl p-1">
            <button
              onClick={() => { setActiveMode('login'); setError(''); }}
              className={clsx(
                'flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all',
                activeMode === 'login'
                  ? 'bg-brand-gold text-brand-darker shadow-gold'
                  : 'text-brand-muted hover:text-brand-light'
              )}
            >
              Log In
            </button>
            <button
              onClick={() => { setActiveMode('register'); setError(''); }}
              className={clsx(
                'flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all',
                activeMode === 'register'
                  ? 'bg-brand-gold text-brand-darker shadow-gold'
                  : 'text-brand-muted hover:text-brand-light'
              )}
            >
              Register
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="px-8 py-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {activeMode === 'register' && (
              <>
                <div className={inputWrapCls}>
                  <User size={16} className={iconCls} />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    required
                    className={inputCls}
                  />
                </div>

                {/* Role selector */}
                <div>
                  <label className="block text-brand-muted text-xs font-medium uppercase tracking-wider mb-2">
                    Account Type
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {roles.map(r => (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() => setRole(r.value as typeof role)}
                        className={clsx(
                          'px-3 py-2.5 rounded-xl border text-center transition-all',
                          role === r.value
                            ? 'border-brand-gold/50 bg-brand-gold/10 text-brand-gold'
                            : 'border-white/10 bg-brand-darker text-brand-muted hover:border-white/20'
                        )}
                      >
                        <div className="text-xs font-semibold">{r.label}</div>
                        <div className="text-xs opacity-60 mt-0.5">{r.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className={inputWrapCls}>
              <Mail size={16} className={iconCls} />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required
                className={inputCls}
              />
            </div>

            <div className={clsx(inputWrapCls, 'relative')}>
              <Lock size={16} className={iconCls} />
              <input
                type={showPw ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                required
                minLength={6}
                className={clsx(inputCls, 'pr-12')}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-light transition-colors"
              >
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 px-3 py-2.5 bg-red-500/10 border border-red-500/20 rounded-xl">
                <Shield size={14} className="text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-brand-gold to-yellow-500 text-brand-darker font-bold py-3.5 rounded-xl hover:opacity-90 transition-all disabled:opacity-50 shadow-gold text-sm mt-2"
            >
              {loading ? 'Please wait...' : activeMode === 'login' ? 'Log In to VCCP' : 'Create Account'}
            </button>
          </form>

          {activeMode === 'login' && (
            <p className="mt-4 text-center text-brand-muted text-xs">
              New to VCCP?{' '}
              <button
                onClick={() => setActiveMode('register')}
                className="text-brand-gold hover:text-brand-gold-light transition-colors"
              >
                Create a free account
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
