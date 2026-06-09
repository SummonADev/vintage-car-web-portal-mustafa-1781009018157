import React from 'react';

// SVG logos for vintage car brands
export const brandLogos: Record<string, React.ReactNode> = {
  Ferrari: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect width="60" height="60" rx="8" fill="#CC0000"/>
      <text x="30" y="38" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#FFD700" fontFamily="serif">FERRARI</text>
      <path d="M30 8 L34 20 L30 16 L26 20 Z" fill="#FFD700"/>
      <path d="M26 20 L30 16 L34 20 L36 30 L24 30 Z" fill="#FFD700"/>
      <path d="M28 30 L26 38 L30 34 L34 38 L32 30 Z" fill="#FFD700"/>
    </svg>
  ),
  Porsche: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect width="60" height="60" rx="8" fill="#1a1a1a"/>
      <circle cx="30" cy="30" r="20" fill="none" stroke="#C5A028" strokeWidth="1.5"/>
      <circle cx="30" cy="30" r="12" fill="none" stroke="#C5A028" strokeWidth="1"/>
      <path d="M18 30 L42 30" stroke="#C5A028" strokeWidth="1"/>
      <path d="M30 18 L30 42" stroke="#C5A028" strokeWidth="1"/>
      <rect x="21" y="21" width="9" height="9" fill="#C5A028" opacity="0.3"/>
      <rect x="30" y="30" width="9" height="9" fill="#C5A028" opacity="0.3"/>
      <text x="30" y="54" textAnchor="middle" fontSize="6" fill="#C5A028" fontWeight="bold" letterSpacing="1">PORSCHE</text>
    </svg>
  ),
  Mercedes: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect width="60" height="60" rx="8" fill="#1a1a1a"/>
      <circle cx="30" cy="30" r="20" fill="none" stroke="#C0C0C0" strokeWidth="2"/>
      <circle cx="30" cy="30" r="18" fill="none" stroke="#C0C0C0" strokeWidth="0.5"/>
      <path d="M30 12 L30 30" stroke="#C0C0C0" strokeWidth="2" strokeLinecap="round"/>
      <path d="M30 30 L45.6 39" stroke="#C0C0C0" strokeWidth="2" strokeLinecap="round"/>
      <path d="M30 30 L14.4 39" stroke="#C0C0C0" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="30" cy="30" r="3" fill="#C0C0C0"/>
    </svg>
  ),
  'Mercedes-Benz': (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect width="60" height="60" rx="8" fill="#1a1a1a"/>
      <circle cx="30" cy="30" r="20" fill="none" stroke="#C0C0C0" strokeWidth="2"/>
      <path d="M30 12 L30 30" stroke="#C0C0C0" strokeWidth="2" strokeLinecap="round"/>
      <path d="M30 30 L45.6 39" stroke="#C0C0C0" strokeWidth="2" strokeLinecap="round"/>
      <path d="M30 30 L14.4 39" stroke="#C0C0C0" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="30" cy="30" r="3" fill="#C0C0C0"/>
    </svg>
  ),
  Jaguar: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect width="60" height="60" rx="8" fill="#1a3a1a"/>
      <path d="M30 10 C30 10 20 18 18 26 C16 34 20 40 30 42 C40 40 44 34 42 26 C40 18 30 10 30 10 Z" fill="none" stroke="#C5A028" strokeWidth="1.5"/>
      <path d="M22 28 C24 24 28 22 30 22 C32 22 36 24 38 28" stroke="#C5A028" strokeWidth="1.5" fill="none"/>
      <circle cx="25" cy="26" r="2" fill="#C5A028" opacity="0.8"/>
      <circle cx="35" cy="26" r="2" fill="#C5A028" opacity="0.8"/>
      <text x="30" y="54" textAnchor="middle" fontSize="6" fill="#C5A028" fontWeight="bold" letterSpacing="1">JAGUAR</text>
    </svg>
  ),
  'Aston Martin': (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect width="60" height="60" rx="8" fill="#0a2a4a"/>
      <ellipse cx="30" cy="30" rx="24" ry="14" fill="none" stroke="#C5A028" strokeWidth="1.5"/>
      <text x="30" y="27" textAnchor="middle" fontSize="7" fill="#C5A028" fontWeight="bold" letterSpacing="0.5">ASTON</text>
      <text x="30" y="36" textAnchor="middle" fontSize="7" fill="#C5A028" fontWeight="bold" letterSpacing="0.5">MARTIN</text>
      <path d="M6 30 L12 30" stroke="#C5A028" strokeWidth="1.5"/>
      <path d="M48 30 L54 30" stroke="#C5A028" strokeWidth="1.5"/>
    </svg>
  ),
  Bentley: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect width="60" height="60" rx="8" fill="#1a1a2e"/>
      <circle cx="30" cy="30" r="18" fill="none" stroke="#C5A028" strokeWidth="1.5"/>
      <text x="30" y="33" textAnchor="middle" fontSize="16" fill="#C5A028" fontWeight="bold" fontFamily="serif">B</text>
      <path d="M18 28 C18 22 22 18 28 18" stroke="#C5A028" strokeWidth="1" fill="none"/>
      <path d="M42 28 C42 22 38 18 32 18" stroke="#C5A028" strokeWidth="1" fill="none"/>
    </svg>
  ),
  'Rolls-Royce': (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect width="60" height="60" rx="8" fill="#1a1a1a"/>
      <circle cx="30" cy="28" r="16" fill="none" stroke="#C5A028" strokeWidth="1.5"/>
      <text x="30" y="32" textAnchor="middle" fontSize="14" fill="#C5A028" fontWeight="bold" fontFamily="serif">RR</text>
      <path d="M14 44 L46 44" stroke="#C5A028" strokeWidth="1"/>
      <text x="30" y="54" textAnchor="middle" fontSize="5" fill="#C5A028" fontWeight="bold" letterSpacing="1">ROLLS-ROYCE</text>
    </svg>
  ),
  Bugatti: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect width="60" height="60" rx="8" fill="#c41230"/>
      <rect x="8" y="8" width="44" height="44" rx="4" fill="none" stroke="#C5A028" strokeWidth="1.5"/>
      <text x="30" y="34" textAnchor="middle" fontSize="12" fill="#C5A028" fontWeight="bold" letterSpacing="1" fontFamily="serif">EB</text>
      <path d="M12 22 L48 22" stroke="#C5A028" strokeWidth="0.8"/>
      <path d="M12 38 L48 38" stroke="#C5A028" strokeWidth="0.8"/>
    </svg>
  ),
  Ford: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect width="60" height="60" rx="8" fill="#003087"/>
      <ellipse cx="30" cy="30" rx="24" ry="16" fill="#003087" stroke="#fff" strokeWidth="2"/>
      <text x="30" y="35" textAnchor="middle" fontSize="16" fill="white" fontWeight="bold" fontFamily="serif" fontStyle="italic">Ford</text>
    </svg>
  ),
  Chevrolet: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect width="60" height="60" rx="8" fill="#1a1a1a"/>
      <path d="M8 24 L24 24 L24 30 L36 30 L36 24 L52 24 L52 36 L36 36 L36 30 L24 30 L24 36 L8 36 Z" fill="#C5A028"/>
    </svg>
  ),
  Cadillac: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect width="60" height="60" rx="8" fill="#1a1a1a"/>
      <rect x="14" y="14" width="32" height="32" fill="none" stroke="#C5A028" strokeWidth="1.5"/>
      <rect x="18" y="18" width="10" height="10" fill="#C41230"/>
      <rect x="32" y="18" width="10" height="10" fill="#C5A028"/>
      <rect x="18" y="32" width="10" height="10" fill="#C5A028"/>
      <rect x="32" y="32" width="10" height="10" fill="#C41230"/>
      <rect x="26" y="22" width="8" height="16" fill="#003087"/>
    </svg>
  ),
  BMW: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect width="60" height="60" rx="8" fill="#1a1a1a"/>
      <circle cx="30" cy="30" r="20" fill="none" stroke="#C0C0C0" strokeWidth="2"/>
      <circle cx="30" cy="30" r="14" fill="none" stroke="#C0C0C0" strokeWidth="1"/>
      <path d="M30 16 L30 30 L16 30" fill="#0066CC"/>
      <path d="M30 16 L30 30 L44 30" fill="white"/>
      <path d="M30 44 L30 30 L16 30" fill="white"/>
      <path d="M30 44 L30 30 L44 30" fill="#0066CC"/>
      <text x="30" y="54" textAnchor="middle" fontSize="6" fill="#C0C0C0" fontWeight="bold" letterSpacing="1">BMW</text>
    </svg>
  ),
  Dodge: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect width="60" height="60" rx="8" fill="#1a1a1a"/>
      <path d="M10 20 L38 20 L50 30 L38 40 L10 40 Z" fill="none" stroke="#C41230" strokeWidth="2"/>
      <path d="M15 26 L32 26 L40 30 L32 34 L15 34 Z" fill="#C41230" opacity="0.3"/>
      <text x="27" y="34" textAnchor="middle" fontSize="9" fill="#C41230" fontWeight="bold" letterSpacing="1">DODGE</text>
    </svg>
  ),
  Pontiac: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect width="60" height="60" rx="8" fill="#1a1a1a"/>
      <circle cx="30" cy="30" r="18" fill="none" stroke="#C41230" strokeWidth="2"/>
      <path d="M30 14 L30 46" stroke="#C41230" strokeWidth="3" strokeLinecap="round"/>
      <path d="M14 30 L46 30" stroke="#C41230" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="30" cy="30" r="5" fill="#C41230"/>
    </svg>
  ),
  Buick: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect width="60" height="60" rx="8" fill="#1a1a2e"/>
      <circle cx="22" cy="30" r="7" fill="none" stroke="#C41230" strokeWidth="2"/>
      <circle cx="30" cy="30" r="7" fill="none" stroke="#C5A028" strokeWidth="2"/>
      <circle cx="38" cy="30" r="7" fill="none" stroke="#003087" strokeWidth="2"/>
    </svg>
  ),
  Volkswagen: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect width="60" height="60" rx="8" fill="#003087"/>
      <circle cx="30" cy="30" r="20" fill="none" stroke="#fff" strokeWidth="2"/>
      <path d="M20 22 L30 42 L40 22" stroke="white" strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
      <path d="M23 30 L37 30" stroke="white" strokeWidth="2"/>
    </svg>
  ),
  Alfa: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect width="60" height="60" rx="8" fill="#C41230"/>
      <circle cx="30" cy="30" r="20" fill="none" stroke="#fff" strokeWidth="1.5"/>
      <rect x="10" y="18" width="20" height="24" fill="#C41230"/>
      <rect x="30" y="18" width="20" height="24" fill="white"/>
      <path d="M20 20 L20 40" stroke="white" strokeWidth="2"/>
      <text x="15" y="33" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">AR</text>
      <circle cx="38" cy="26" r="5" fill="none" stroke="#C41230" strokeWidth="1.5"/>
      <path d="M34 30 L42 30" stroke="#C41230" strokeWidth="1.5"/>
    </svg>
  ),
  'Alfa Romeo': (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect width="60" height="60" rx="8" fill="#C41230"/>
      <circle cx="30" cy="30" r="20" fill="none" stroke="#fff" strokeWidth="1.5"/>
      <path d="M30 10 L30 50" stroke="white" strokeWidth="1.5"/>
      <text x="20" y="33" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">ALFA</text>
      <text x="40" y="33" textAnchor="middle" fontSize="5" fill="#C41230" fontWeight="bold">ROMEO</text>
      <rect x="30" y="10" width="20" height="40" fill="white" opacity="0.15"/>
    </svg>
  ),
  Lotus: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect width="60" height="60" rx="8" fill="#1a3a1a"/>
      <ellipse cx="30" cy="30" rx="20" ry="14" fill="none" stroke="#C5A028" strokeWidth="1.5"/>
      <path d="M16 30 C16 22 22 16 30 16 C38 16 44 22 44 30" stroke="#C5A028" strokeWidth="1" fill="none"/>
      <text x="30" y="34" textAnchor="middle" fontSize="8" fill="#C5A028" fontWeight="bold" letterSpacing="1">LOTUS</text>
    </svg>
  ),
  Triumph: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect width="60" height="60" rx="8" fill="#1a1a1a"/>
      <path d="M10 38 L30 14 L50 38" fill="none" stroke="#C41230" strokeWidth="2.5" strokeLinejoin="round"/>
      <text x="30" y="50" textAnchor="middle" fontSize="7" fill="#C41230" fontWeight="bold" letterSpacing="0.5">TRIUMPH</text>
    </svg>
  ),
  Lincoln: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect width="60" height="60" rx="8" fill="#1a1a2e"/>
      <path d="M30 10 L30 50 M10 30 L50 30" stroke="#C5A028" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M18 18 L42 42 M42 18 L18 42" stroke="#C5A028" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
      <circle cx="30" cy="30" r="6" fill="#C5A028" opacity="0.3"/>
    </svg>
  ),
  Packard: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect width="60" height="60" rx="8" fill="#1a1a2e"/>
      <rect x="12" y="18" width="36" height="24" rx="2" fill="none" stroke="#C5A028" strokeWidth="1.5"/>
      <text x="30" y="33" textAnchor="middle" fontSize="10" fill="#C5A028" fontWeight="bold" letterSpacing="1">P</text>
      <path d="M12 26 L48 26" stroke="#C5A028" strokeWidth="0.8" opacity="0.5"/>
      <path d="M12 34 L48 34" stroke="#C5A028" strokeWidth="0.8" opacity="0.5"/>
    </svg>
  ),
  Plymouth: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect width="60" height="60" rx="8" fill="#003087"/>
      <path d="M20 16 L40 16 L46 30 L40 44 L20 44 L14 30 Z" fill="none" stroke="#C5A028" strokeWidth="1.5"/>
      <text x="30" y="34" textAnchor="middle" fontSize="7" fill="#C5A028" fontWeight="bold">PLYMOUTH</text>
    </svg>
  ),
  Oldsmobile: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect width="60" height="60" rx="8" fill="#1a1a1a"/>
      <circle cx="30" cy="30" r="18" fill="none" stroke="#C5A028" strokeWidth="2"/>
      <text x="30" y="34" textAnchor="middle" fontSize="11" fill="#C5A028" fontWeight="bold">OLDS</text>
    </svg>
  ),
  MG: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect width="60" height="60" rx="8" fill="#8B0000"/>
      <rect x="10" y="16" width="40" height="28" rx="3" fill="none" stroke="#C5A028" strokeWidth="2"/>
      <text x="30" y="35" textAnchor="middle" fontSize="16" fill="#C5A028" fontWeight="bold" letterSpacing="2">MG</text>
    </svg>
  ),
  Hudson: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect width="60" height="60" rx="8" fill="#1a1a2e"/>
      <path d="M10 20 L50 20 L50 40 L10 40 Z" fill="none" stroke="#C5A028" strokeWidth="1.5"/>
      <text x="30" y="34" textAnchor="middle" fontSize="8" fill="#C5A028" fontWeight="bold" letterSpacing="1">HUDSON</text>
    </svg>
  ),
};

export function getBrandLogo(make: string): React.ReactNode | null {
  return brandLogos[make] || null;
}

export function getBrandInitials(make: string): string {
  return make.slice(0, 2).toUpperCase();
}
