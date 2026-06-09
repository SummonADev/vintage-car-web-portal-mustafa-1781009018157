import clsx from 'clsx';

type LogoProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

export default function Logo({ size = 'md', className }: LogoProps) {
  const dims = {
    sm: { w: 32, h: 32, font: 11, sub: 7 },
    md: { w: 48, h: 48, font: 16, sub: 10 },
    lg: { w: 72, h: 72, font: 24, sub: 14 },
  }[size];

  return (
    <div className={clsx('flex items-center gap-2', className)}>
      <svg width={dims.w} height={dims.h} viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="72" height="72" rx="10" fill="#1a0a00" />
        <rect width="72" height="72" rx="10" stroke="#c9a84c" strokeWidth="2" />
        {/* Wheel */}
        <circle cx="22" cy="52" r="7" fill="none" stroke="#c9a84c" strokeWidth="2" />
        <circle cx="22" cy="52" r="2" fill="#c9a84c" />
        <circle cx="50" cy="52" r="7" fill="none" stroke="#c9a84c" strokeWidth="2" />
        <circle cx="50" cy="52" r="2" fill="#c9a84c" />
        {/* Car body */}
        <path d="M12 45 L15 38 L25 30 L47 30 L57 38 L60 45 Z" fill="#2a1500" stroke="#c9a84c" strokeWidth="1.5" />
        <path d="M25 30 L30 22 L42 22 L47 30" fill="#1a0a00" stroke="#c9a84c" strokeWidth="1" />
        {/* Headlights */}
        <ellipse cx="58" cy="43" rx="3" ry="2" fill="#c9a84c" opacity="0.8" />
        <ellipse cx="14" cy="43" rx="3" ry="2" fill="#c9a84c" opacity="0.4" />
        {/* Stars */}
        <circle cx="56" cy="12" r="1.5" fill="#c9a84c" />
        <circle cx="62" cy="18" r="1" fill="#c9a84c" opacity="0.6" />
        <circle cx="50" cy="16" r="1" fill="#c9a84c" opacity="0.8" />
      </svg>
      <div className="flex flex-col leading-none">
        <span
          style={{ fontFamily: 'Georgia, serif', fontSize: dims.font, letterSpacing: '0.15em', color: '#c9a84c', fontWeight: 700, textTransform: 'uppercase' }}
        >
          VCCP
        </span>
        <span
          style={{ fontFamily: 'Georgia, serif', fontSize: dims.sub, letterSpacing: '0.08em', color: '#a08040', textTransform: 'uppercase' }}
        >
          Vintage Car Collectors Portal
        </span>
      </div>
    </div>
  );
}
