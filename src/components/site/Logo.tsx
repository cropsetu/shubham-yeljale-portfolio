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

/** Just the icon mark — gradient rounded square with `</>` and a gold AI sparkle. */
export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="typingCodeAI logo"
      className="shrink-0 drop-shadow-[0_0_12px_rgba(59,130,246,0.45)]"
    >
      <defs>
        <linearGradient id="lm-bg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1e40af" />
          <stop offset="55%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="lm-stroke" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.4" />
        </linearGradient>
        <radialGradient id="lm-sparkle" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="60%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* badge */}
      <rect x="2" y="2" width="44" height="44" rx="11" fill="url(#lm-bg)" />
      <rect
        x="2"
        y="2"
        width="44"
        height="44"
        rx="11"
        fill="none"
        stroke="url(#lm-stroke)"
        strokeWidth="1.2"
      />

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
  );
}
