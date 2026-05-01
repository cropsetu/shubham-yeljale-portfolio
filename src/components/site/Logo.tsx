type LogoProps = {
  /** Pixel size of the icon mark (the badge to the left of the wordmark). */
  size?: number;
  /** Show the wordmark text next to the icon. */
  showWordmark?: boolean;
  /** Tailwind class for wordmark sizing — defaults to text-base / md:text-lg. */
  wordmarkClassName?: string;
  className?: string;
};

/**
 * typingCodeAI brand logo — a code-bracket badge with a blinking cursor
 * inside, plus an AI sparkle, paired with the wordmark.
 *
 *   ┌──────┐
 *   │ </>▍ │  typingCode AI
 *   └──────┘
 */
export function Logo({
  size = 36,
  showWordmark = true,
  wordmarkClassName = "text-base md:text-lg",
  className = "",
}: LogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} />
      {showWordmark && (
        <span
          className={`font-display font-bold tracking-tight whitespace-nowrap ${wordmarkClassName}`}
        >
          <span className="text-foreground/90">typing</span>
          <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
            Code
          </span>
          <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
            AI
          </span>
        </span>
      )}
    </div>
  );
}

/**
 * Animated icon mark — rotating conic-gradient halo, downward scan-line,
 * code brackets, blinking typing cursor, and a gold AI sparkle.
 */
export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <span
      className="relative inline-flex shrink-0 rounded-[26%] conic-border animate-glow-pulse"
      style={{ width: size, height: size }}
      role="img"
      aria-label="typingCodeAI logo"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative rounded-[26%] overflow-hidden"
      >
        <defs>
          <linearGradient id="lm-bg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="55%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <radialGradient id="lm-sparkle" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="60%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="lm-scan" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* badge background */}
        <rect x="0" y="0" width="48" height="48" fill="url(#lm-bg)" />

        {/* faint vertical code lines (binary ambience) */}
        <g opacity="0.2" stroke="white" strokeWidth="0.5">
          <line x1="6"  y1="38" x2="6"  y2="44" />
          <line x1="10" y1="40" x2="10" y2="44" />
          <line x1="42" y1="4"  x2="42" y2="9" />
          <line x1="38" y1="4"  x2="38" y2="7" />
        </g>

        {/* code bracket: < > */}
        <path
          d="M18 16 L11 24 L18 32"
          stroke="white"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M30 16 L37 24 L30 32"
          stroke="white"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* blinking typing cursor inside the brackets */}
        <rect
          x="22.5"
          y="17.5"
          width="3"
          height="13"
          rx="1.2"
          fill="white"
          className="animate-blink"
        />

        {/* AI sparkle (gold) */}
        <circle cx="38" cy="11" r="6" fill="url(#lm-sparkle)" />
        <path
          d="M38 6.5 L38.9 9.6 L42 10.5 L38.9 11.4 L38 14.5 L37.1 11.4 L34 10.5 L37.1 9.6 Z"
          fill="#fef9c3"
        />
      </svg>

      {/* horizontal scan line sweeping top→bottom */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[26%] overflow-hidden"
      >
        <span
          className="absolute left-0 right-0 h-[2px] animate-scan-down"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(190 100% 60% / 0.9), transparent)",
            boxShadow: "0 0 12px hsl(190 100% 60% / 0.7)",
          }}
        />
      </span>
    </span>
  );
}
