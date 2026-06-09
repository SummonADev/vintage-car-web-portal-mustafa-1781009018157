import clsx from 'clsx';

type LogoProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

export default function Logo({ size = 'md', className }: LogoProps) {
  const configs = {
    sm: { svgW: 28, svgH: 28, titleSize: '13px', subtitleSize: '7px', gap: '8px' },
    md: { svgW: 38, svgH: 38, titleSize: '17px', subtitleSize: '8.5px', gap: '10px' },
    lg: { svgW: 56, svgH: 56, titleSize: '26px', subtitleSize: '12px', gap: '14px' },
  }[size];

  return (
    <div className={clsx('flex items-center', className)} style={{ gap: configs.gap }}>
      {/* SVG Logo Mark */}
      <svg
        width={configs.svgW}
        height={configs.svgH}
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoOrange" x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
          <linearGradient id="logoBg" x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1c1c1c" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </linearGradient>
          <filter id="logoGlow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background hex */}
        <path
          d="M28 2 L52 15 L52 41 L28 54 L4 41 L4 15 Z"
          fill="url(#logoBg)"
          stroke="url(#logoOrange)"
          strokeWidth="1.5"
        />

        {/* Car silhouette */}
        <path
          d="M9 35 L11.5 29.5 L19 23 L37 23 L44.5 29.5 L47 35 Z"
          fill="#0a0a0a"
          stroke="url(#logoOrange)"
          strokeWidth="1.2"
          strokeLinejoin="round"
          filter="url(#logoGlow)"
        />
        <path
          d="M19 23 L22.5 17.5 L33.5 17.5 L37 23"
          fill="#141414"
          stroke="url(#logoOrange)"
          strokeWidth="1"
          strokeLinejoin="round"
        />

        {/* Windows */}
        <path
          d="M23.5 22.5 L25.5 18.5 L30.5 18.5 L32.5 22.5 Z"
          fill="rgba(249,115,22,0.18)"
          stroke="url(#logoOrange)"
          strokeWidth="0.6"
        />

        {/* Wheels */}
        <circle cx="16" cy="36" r="4.5" fill="#0a0a0a" stroke="url(#logoOrange)" strokeWidth="1.5" />
        <circle cx="16" cy="36" r="1.8" fill="url(#logoOrange)" opacity="0.9" />
        <circle cx="40" cy="36" r="4.5" fill="#0a0a0a" stroke="url(#logoOrange)" strokeWidth="1.5" />
        <circle cx="40" cy="36" r="1.8" fill="url(#logoOrange)" opacity="0.9" />

        {/* Headlight */}
        <ellipse cx="45.5" cy="33" rx="2" ry="1.5" fill="#fb923c" opacity="0.9" filter="url(#logoGlow)" />
        {/* Tail light */}
        <ellipse cx="10.5" cy="33" rx="2" ry="1.5" fill="#f97316" opacity="0.55" />

        {/* Speed lines */}
        <line x1="11" y1="30" x2="6" y2="30" stroke="url(#logoOrange)" strokeWidth="0.8" opacity="0.5" />
        <line x1="11" y1="32.5" x2="4" y2="32.5" stroke="url(#logoOrange)" strokeWidth="0.6" opacity="0.35" />
        <line x1="12" y1="27.5" x2="7" y2="27.5" stroke="url(#logoOrange)" strokeWidth="0.5" opacity="0.25" />
      </svg>

      {/* Text */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: configs.titleSize,
            letterSpacing: '0.2em',
            background: 'linear-gradient(90deg, #fb923c, #f97316, #fb923c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: 700,
            textTransform: 'uppercase' as const,
          }}
        >
          VCCP
        </span>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: configs.subtitleSize,
            letterSpacing: '0.18em',
            color: '#a0522d',
            textTransform: 'uppercase' as const,
            marginTop: '2px',
            fontWeight: 500,
          }}
        >
          Vintage Car Collectors Portal
        </span>
      </div>
    </div>
  );
}
