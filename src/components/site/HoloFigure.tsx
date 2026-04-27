type Props = { progress: number };

const FIG_W = 320;
const FIG_H = 540;

function Humanoid({ stroke, fill }: { stroke?: string; fill?: string }) {
  const common = {
    stroke: stroke ?? "none",
    fill: fill ?? "none",
    strokeWidth: 2,
    strokeLinejoin: "round" as const,
  };
  return (
    <g>
      {/* Head */}
      <ellipse cx="160" cy="80" rx="46" ry="50" {...common} />
      {/* Hair cap (suggests Indian male, dark hair shape) */}
      <path d="M118 64 Q160 18 200 60 Q200 50 188 44 Q160 26 132 44 Q120 52 118 64Z" {...common} />
      {/* Neck */}
      <rect x="146" y="124" width="28" height="20" rx="6" {...common} />
      {/* Torso */}
      <path d="M104 156 Q160 138 216 156 L216 290 Q160 304 104 290 Z" {...common} />
      {/* Left arm */}
      <path d="M104 162 Q92 220 100 300 Q108 318 124 318 Q124 296 116 280 Q116 220 124 168" {...common} />
      {/* Right arm */}
      <path d="M216 162 Q228 220 220 300 Q212 318 196 318 Q196 296 204 280 Q204 220 196 168" {...common} />
      {/* Hip */}
      <path d="M108 286 Q160 296 212 286 L210 320 Q160 330 110 320 Z" {...common} />
      {/* Left leg */}
      <path d="M118 318 Q116 410 122 480 L150 480 Q156 412 152 320 Z" {...common} />
      {/* Right leg */}
      <path d="M168 320 Q164 412 170 480 L198 480 Q204 410 202 318 Z" {...common} />
      {/* Feet/boots */}
      <path d="M114 474 Q116 498 124 504 L162 504 L162 478 Z" {...common} />
      <path d="M158 478 L158 504 L196 504 Q204 498 206 474 Z" {...common} />
      {/* Chest panel detail */}
      <path d="M150 168 L170 168 L168 196 L152 196 Z" {...common} />
    </g>
  );
}

export function HoloFigure({ progress }: Props) {
  const fillY = FIG_H - progress * FIG_H;
  const showScan = progress > 0.02 && progress < 0.98;

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${FIG_W} ${FIG_H + 60}`}
        className="h-[540px] w-auto md:h-[600px]"
        aria-hidden
      >
        <defs>
          <clipPath id="holo-fill-clip">
            <rect x="0" y={fillY} width={FIG_W} height={FIG_H - fillY} />
          </clipPath>
          <linearGradient id="holo-grad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#9be8ff" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#5ac8fa" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3aa5ea" stopOpacity="0.55" />
          </linearGradient>
          <filter id="holo-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="1.6" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="holo-glow-soft">
            <feGaussianBlur stdDeviation="2" />
          </filter>
          <linearGradient id="platform-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9be8ff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1f5fa0" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Light beam from platform */}
        <path
          d="M70 510 L250 510 L210 130 L110 130 Z"
          fill="url(#platform-grad)"
          opacity="0.18"
          filter="url(#holo-glow-soft)"
        />

        {/* Outline (always visible, faint cyan wireframe) */}
        <g opacity="0.5">
          <Humanoid stroke="#5ac8fa" />
        </g>

        {/* Scanline rings sliding up */}
        {[0.15, 0.3, 0.45, 0.6, 0.75, 0.9].map((p, i) => {
          const localY = FIG_H - ((progress * FIG_H + i * 60) % FIG_H);
          return (
            <line
              key={i}
              x1="80"
              y1={localY}
              x2="240"
              y2={localY}
              stroke="#9be8ff"
              strokeWidth="1"
              opacity="0.35"
            />
          );
        })}

        {/* Solid fill clipped by progress */}
        <g clipPath="url(#holo-fill-clip)" filter="url(#holo-glow)">
          <Humanoid stroke="#9be8ff" fill="url(#holo-grad)" />
        </g>

        {/* Bright leading scan line */}
        {showScan && (
          <rect
            x="60"
            y={fillY - 2}
            width="200"
            height="3"
            fill="#ffffff"
            opacity="0.85"
            filter="url(#holo-glow)"
          />
        )}

        {/* Holo platform */}
        <g transform={`translate(0 ${FIG_H + 6})`}>
          <ellipse cx="160" cy="22" rx="116" ry="22" fill="#5ac8fa" opacity="0.18" />
          <ellipse cx="160" cy="22" rx="96" ry="18" fill="none" stroke="#9be8ff" strokeWidth="2" />
          <ellipse cx="160" cy="22" rx="76" ry="14" fill="none" stroke="#5ac8fa" strokeWidth="1" opacity="0.7" />
          <ellipse cx="160" cy="20" rx="60" ry="10" fill="#9be8ff" opacity="0.35" />
        </g>
      </svg>
    </div>
  );
}
