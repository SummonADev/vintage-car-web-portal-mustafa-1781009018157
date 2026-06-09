import { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Logo from '@/components/Logo';

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

  const inputCls = 'w-full bg-brand-darker border border-brand-gold/30 rounded px-4 py-3 text-brand-light text-sm focus:outline-none focus:border-brand-gold transition-colors';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-brand-dark border border-brand-gold/40 rounded-xl p-8 w-full max-w-md mx-4 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-brand-light/40 hover:text-brand-light">
          <X size={20} />
        </button>
        <div className="flex justify-center mb-6">
          <Logo size="sm" />
        </div>
        {redirectMessage && (
          <div className="mb-4 p-3 bg-brand-gold/10 border border-brand-gold/30 rounded text-brand-gold text-sm text-center">
            {redirectMessage}
          </div>
        )}
        <div className="flex border-b border-brand-gold/20 mb-6">
          <button
            onClick={() => setActiveMode('login')}
            className={`flex-1 pb-3 text-sm font-semibold transition-colors ${
              activeMode === 'login' ? 'text-brand-gold border-b-2 border-brand-gold' : 'text-brand-light/40'
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => setActiveMode('register')}
            className={`flex-1 pb-3 text-sm font-semibold transition-colors ${
              activeMode === 'register' ? 'text-brand-gold border-b-2 border-brand-gold' : 'text-brand-light/40'
            }`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {activeMode === 'register' && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e: any) => setName(e.target.value)}
                required
                className={inputCls}
              />
              <div>
                <label className="block text-brand-light/60 text-xs mb-2 uppercase tracking-wider">Account Type</label>
                <select value={role} onChange={(e: any) => setRole(e.target.value)} className={inputCls}>
                  <option value="both">Buyer & Seller</option>
                  <option value="bidder">Bidder / Buyer</option>
                  <option value="seller">Seller Only</option>
                </select>
              </div>
            </>
          )}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            required
            className={inputCls}
          />
          <div className="relative">
            <input
              type={showPw ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              required
              minLength={6}
              className={clsx(inputCls, 'pr-12')}
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-light/40 hover:text-brand-light"
            >
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-gold text-brand-dark font-bold py-3 rounded hover:bg-brand-gold/80 transition-colors disabled:opacity-50"
          >
            {loading ? 'Please wait...' : activeMode === 'login' ? 'Log In' : 'Create Account'}
          </button>
        </form>

        {activeMode === 'login' && (
          <p className="mt-4 text-center text-brand-light/40 text-xs">
            Demo: register any account to test all features
          </p>
        )}
      </div>
    </div>
  );
}

function clsx(...args: any[]): string {
  return args.filter(Boolean).join(' ');
}
