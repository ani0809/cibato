const TOKENS = {
  sky: {
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
  },
  blue: {
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
  },
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
};

interface BgGridProps {
  density?: number;
  glow?: number;
  haze?: number;
}

const BgGrid = ({ density = 40, glow = 0.25, haze = 0.08 }: BgGridProps) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="radialGlow" cx="50%" cy="40%">
            <stop offset="0%" stopColor={TOKENS.sky[400]} stopOpacity={glow} />
            <stop offset="50%" stopColor={TOKENS.blue[500]} stopOpacity={glow * 0.3} />
            <stop offset="100%" stopColor={TOKENS.slate[900]} stopOpacity="0" />
          </radialGradient>

          <linearGradient id="verticalHaze" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={TOKENS.sky[300]} stopOpacity={haze} />
            <stop offset="50%" stopColor={TOKENS.blue[400]} stopOpacity={haze * 0.5} />
            <stop offset="100%" stopColor={TOKENS.slate[800]} stopOpacity="0" />
          </linearGradient>

          <pattern
            id="gridPattern"
            width={density}
            height={density}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${density} 0 L 0 0 0 ${density}`}
              fill="none"
              stroke={TOKENS.slate[300]}
              strokeWidth="0.5"
              opacity="0.15"
            />
          </pattern>

          <mask id="vignetteMask">
            <rect width="100%" height="100%" fill="white" />
            <radialGradient id="vignetteGrad" cx="50%" cy="50%">
              <stop offset="50%" stopColor="white" />
              <stop offset="100%" stopColor="black" />
            </radialGradient>
            <rect width="100%" height="100%" fill="url(#vignetteGrad)" />
          </mask>
        </defs>

        <rect width="100%" height="100%" fill="url(#radialGlow)" />
        <rect width="100%" height="100%" fill="url(#verticalHaze)" />
        <rect
          width="100%"
          height="100%"
          fill="url(#gridPattern)"
          mask="url(#vignetteMask)"
        />
      </svg>
    </div>
  );
};

export default BgGrid;
