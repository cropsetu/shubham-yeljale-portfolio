import { motion, useReducedMotion } from "framer-motion";

export function HeroDeskScene() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="relative aspect-square w-full max-w-[640px]"
      data-cursor="hello"
    >
      <svg
        viewBox="0 0 600 600"
        className="h-full w-full drop-shadow-[0_30px_50px_rgba(23,20,19,0.18)]"
        aria-label="Developer at desk illustration"
        role="img"
      >
        <defs>
          <linearGradient id="skin-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d6a884" />
            <stop offset="60%" stopColor="#c89570" />
            <stop offset="100%" stopColor="#a87a55" />
          </linearGradient>
          <linearGradient id="hair-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3d2a1c" />
            <stop offset="100%" stopColor="#1f1410" />
          </linearGradient>
          <linearGradient id="shirt-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3a414c" />
            <stop offset="60%" stopColor="#2a2f38" />
            <stop offset="100%" stopColor="#171a20" />
          </linearGradient>
          <linearGradient id="desk-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e8dcc4" />
          </linearGradient>
          <linearGradient id="monitor-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3a4150" />
            <stop offset="100%" stopColor="#181c24" />
          </linearGradient>
          <linearGradient id="screen-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#202632" />
            <stop offset="100%" stopColor="#0e1119" />
          </linearGradient>
          <linearGradient id="cork-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d4a984" />
            <stop offset="100%" stopColor="#a8825a" />
          </linearGradient>
          <linearGradient id="rug-grad-outer" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f0a557" />
            <stop offset="100%" stopColor="#d97a2c" />
          </linearGradient>
          <linearGradient id="rug-grad-mid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f8d873" />
            <stop offset="100%" stopColor="#e6b440" />
          </linearGradient>
          <linearGradient id="leaf-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7cd676" />
            <stop offset="100%" stopColor="#3e9c45" />
          </linearGradient>
          <linearGradient id="frame-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#bfd2e6" />
            <stop offset="100%" stopColor="#7d9bbb" />
          </linearGradient>
          <radialGradient id="screen-glow" cx="0.4" cy="0.35" r="0.6">
            <stop offset="0%" stopColor="#5ac8fa" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#5ac8fa" stopOpacity="0" />
          </radialGradient>
          <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" />
            <feOffset dx="0" dy="4" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.35" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="hard-shadow">
            <feGaussianBlur stdDeviation="2" />
            <feOffset dx="0" dy="3" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.45" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Floor shadow */}
        <ellipse cx="300" cy="556" rx="220" ry="14" fill="#171413" opacity="0.12" />

        {/* Floating shelf with books + plant */}
        <g transform="translate(120 60)" filter="url(#soft-shadow)">
          <rect x="0" y="44" width="110" height="8" rx="2" fill="#cdb37e" />
          <rect x="0" y="52" width="110" height="3" fill="#9c8559" />
          <rect x="6" y="6" width="16" height="38" rx="2" fill="#9fb6cf" />
          <rect x="6" y="6" width="3" height="38" fill="#7d97b3" />
          <rect x="24" y="2" width="20" height="42" rx="2" fill="#e9a247" />
          <rect x="24" y="2" width="3" height="42" fill="#bf7e2c" />
          <rect x="46" y="10" width="16" height="34" rx="2" fill="#bd906c" />
          <rect x="46" y="10" width="3" height="34" fill="#8e6a4d" />
          <path d="M70 18 L94 18 L92 44 Q83 47 72 44 Z" fill="#fafaf2" />
          <path d="M70 18 L94 18 L93 22 L71 22 Z" fill="#e2dccf" />
          <path d="M76 18 q4 -22 12 -2 q-8 -10 -12 2z" fill="url(#leaf-grad)" />
          <path d="M82 18 q2 -16 10 0 q-6 -8 -10 0z" fill="#5fb05a" />
          <path d="M78 18 q-4 -10 -2 -14 q4 4 6 14z" fill="#4a9943" />
        </g>

        {/* Cork board */}
        <g transform="translate(252 56)" filter="url(#soft-shadow)">
          <rect x="0" y="0" width="240" height="130" rx="12" fill="url(#cork-grad)" />
          <rect x="6" y="6" width="228" height="118" rx="8" fill="#c79f78" />
          {Array.from({ length: 18 }).map((_, i) => (
            <circle
              key={i}
              cx={20 + (i * 13) % 200}
              cy={20 + Math.floor(i / 14) * 80 + ((i * 7) % 30)}
              r="1.2"
              fill="#a37c54"
              opacity="0.5"
            />
          ))}
          <g transform="rotate(-6 56 60)">
            <rect x="22" y="22" width="64" height="64" rx="3" fill="#bcd3eb" />
            <rect x="22" y="22" width="64" height="10" rx="3" fill="#aac5e0" />
            <rect x="30" y="40" width="44" height="3" fill="#7d97b3" opacity="0.5" />
            <rect x="30" y="48" width="38" height="3" fill="#7d97b3" opacity="0.5" />
            <rect x="30" y="56" width="48" height="3" fill="#7d97b3" opacity="0.5" />
          </g>
          <circle cx="55" cy="22" r="6" fill="#e35949" />
          <circle cx="53" cy="20" r="2" fill="#f6a89c" />
          <g transform="rotate(4 165 70)">
            <rect x="130" y="34" width="68" height="64" rx="3" fill="#fafaf2" />
            <rect x="138" y="48" width="48" height="3" fill="#cabea4" />
            <rect x="138" y="56" width="42" height="3" fill="#cabea4" />
            <rect x="138" y="64" width="50" height="3" fill="#cabea4" />
            <rect x="138" y="72" width="36" height="3" fill="#cabea4" />
          </g>
          <circle cx="166" cy="34" r="6" fill="#e35949" />
          <circle cx="164" cy="32" r="2" fill="#f6a89c" />
        </g>

        {/* Picture frame */}
        <g transform="translate(508 224)" filter="url(#soft-shadow)">
          <rect x="0" y="0" width="68" height="64" rx="9" fill="url(#frame-grad)" />
          <rect x="6" y="6" width="56" height="52" rx="6" fill="#dfe9f4" />
          <path d="M10 42 l14 -16 l10 8 l18 -22 l8 30z" fill="#7d9bbb" />
          <circle cx="22" cy="20" r="4" fill="#fafaf2" />
        </g>

        {/* Desk surface */}
        <g filter="url(#soft-shadow)">
          <rect x="160" y="320" width="350" height="16" rx="5" fill="url(#desk-grad)" />
          <rect x="160" y="336" width="350" height="8" fill="#c9b894" />
          <ellipse cx="335" cy="340" rx="170" ry="3" fill="#171413" opacity="0.25" />
          <rect x="186" y="344" width="12" height="86" rx="2" fill="#cab695" />
          <rect x="472" y="344" width="12" height="86" rx="2" fill="#cab695" />
        </g>

        {/* Monitor LEFT */}
        <g transform="translate(196 222)" filter="url(#hard-shadow)">
          <rect x="0" y="0" width="148" height="100" rx="10" fill="url(#monitor-grad)" />
          <rect x="6" y="6" width="136" height="86" rx="6" fill="url(#screen-grad)" />
          <rect x="6" y="6" width="136" height="86" rx="6" fill="url(#screen-glow)" />
          <rect x="10" y="12" width="26" height="74" rx="3" fill="#0a0d14" />
          {Array.from({ length: 6 }).map((_, i) => (
            <rect
              key={i}
              x="14"
              y={18 + i * 11}
              width="18"
              height="3"
              rx="1.5"
              fill="#5a6371"
              opacity="0.7"
            />
          ))}
          <rect x="42" y="14" width="92" height="6" rx="2" fill="#3a4250" />
          {Array.from({ length: 8 }).map((_, i) => (
            <rect
              key={i}
              x="42"
              y={26 + i * 8}
              width={60 + (i % 3) * 18}
              height="3"
              rx="1.5"
              fill="#404a5c"
            />
          ))}
          <rect x="58" y="100" width="32" height="14" fill="#181c24" />
          <rect x="38" y="114" width="72" height="6" rx="3" fill="#181c24" />
        </g>

        {/* Monitor RIGHT — code editor */}
        <g transform="translate(354 214)" filter="url(#hard-shadow)">
          <rect x="0" y="0" width="148" height="108" rx="10" fill="url(#monitor-grad)" />
          <rect x="6" y="6" width="136" height="94" rx="6" fill="url(#screen-grad)" />
          <rect x="6" y="6" width="136" height="94" rx="6" fill="url(#screen-glow)" />
          <circle cx="14" cy="14" r="2" fill="#e35949" />
          <circle cx="22" cy="14" r="2" fill="#f4c057" />
          <circle cx="30" cy="14" r="2" fill="#5fb05a" />
          {[
            { y: 26, w: 96, c: "#c678dd" },
            { y: 32, w: 64, c: "#56b6c2" },
            { y: 38, w: 84, c: "#e5c07b" },
            { y: 44, w: 50, c: "#98c379" },
            { y: 50, w: 90, c: "#61afef" },
            { y: 56, w: 42, c: "#e06c75" },
            { y: 62, w: 72, c: "#c678dd" },
            { y: 68, w: 104, c: "#56b6c2" },
            { y: 74, w: 58, c: "#98c379" },
            { y: 80, w: 80, c: "#e5c07b" },
            { y: 86, w: 32, c: "#61afef" },
            { y: 92, w: 90, c: "#c678dd" },
          ].map((l, i) => (
            <rect key={i} x={14} y={l.y} width={l.w} height="3" rx="1.5" fill={l.c} />
          ))}
          <rect x="58" y="108" width="32" height="14" fill="#181c24" />
          <rect x="38" y="122" width="72" height="6" rx="3" fill="#181c24" />
        </g>

        {/* Keyboard */}
        <g transform="translate(244 322)">
          <rect x="0" y="0" width="160" height="14" rx="3" fill="#fafaf2" />
          <rect x="0" y="0" width="160" height="3" rx="3" fill="#e0d4be" />
          {Array.from({ length: 13 }).map((_, i) => (
            <rect
              key={i}
              x={6 + i * 12}
              y="4"
              width="8"
              height="6"
              rx="1.2"
              fill="#cabea4"
              opacity="0.6"
            />
          ))}
        </g>
        {/* Mouse */}
        <g transform="translate(420 320)">
          <ellipse cx="14" cy="10" rx="14" ry="9" fill="#fafaf2" />
          <line x1="14" y1="3" x2="14" y2="9" stroke="#cabea4" strokeWidth="1" />
        </g>
        {/* Coffee cup */}
        <g transform="translate(186 296)" filter="url(#hard-shadow)">
          <rect x="0" y="0" width="20" height="26" rx="3" fill="#fafaf2" />
          <rect x="0" y="0" width="20" height="6" rx="3" fill="#a8825a" />
          <path d="M20 8 q8 0 8 8 q0 8 -8 8" fill="none" stroke="#fafaf2" strokeWidth="3" />
          <path
            d="M2 -2 q4 -8 8 0 M10 -2 q4 -8 8 0"
            fill="none"
            stroke="#cfc0a8"
            strokeWidth="1"
            opacity="0.7"
          />
        </g>
        {/* Penguin mascot */}
        <g transform="translate(178 270)" filter="url(#hard-shadow)">
          <ellipse cx="12" cy="20" rx="12" ry="16" fill="#171a20" />
          <ellipse cx="12" cy="22" rx="7" ry="10" fill="#fafaf2" />
          <circle cx="8" cy="14" r="2" fill="#fafaf2" />
          <circle cx="16" cy="14" r="2" fill="#fafaf2" />
          <circle cx="8" cy="14" r="1" fill="#171a20" />
          <circle cx="16" cy="14" r="1" fill="#171a20" />
          <path d="M9 18 l3 3 l3 -3z" fill="#f4a04a" />
          <ellipse cx="6" cy="32" rx="4" ry="2" fill="#f4a04a" />
          <ellipse cx="18" cy="32" rx="4" ry="2" fill="#f4a04a" />
        </g>

        {/* Rug */}
        <g filter="url(#soft-shadow)">
          <rect x="174" y="492" width="280" height="92" rx="16" fill="url(#rug-grad-outer)" />
          <rect x="194" y="504" width="240" height="68" rx="12" fill="url(#rug-grad-mid)" />
          <rect x="216" y="516" width="196" height="44" rx="8" fill="#fff5d8" />
          <rect x="234" y="530" width="160" height="16" rx="4" fill="#f8d873" />
        </g>

        {/* Chair (back) */}
        <g filter="url(#hard-shadow)">
          <rect x="252" y="346" width="138" height="78" rx="16" fill="#fafaf2" />
          <rect x="252" y="346" width="138" height="14" rx="16" fill="#e0d4be" />
          <rect x="314" y="424" width="14" height="46" fill="#9ba3ad" />
          <path d="M280 466 l40 4 l40 -4 l-12 16 h-56z" fill="#7e8691" />
        </g>

        {/* Character (Indian male, back view) */}
        <g filter="url(#hard-shadow)">
          <path d="M260 340 q60 -36 120 0 v66 q-60 16 -120 0z" fill="url(#shirt-grad)" />
          <path
            d="M268 336 q40 -22 80 -8"
            fill="none"
            stroke="#5d6675"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path d="M298 308 q22 -8 44 0 l-2 12 q-20 -6 -40 0z" fill="#1a1d23" />
          <rect x="312" y="294" width="28" height="22" rx="6" fill="url(#skin-grad)" />
          <ellipse cx="288" cy="282" rx="7" ry="11" fill="url(#skin-grad)" />
          <ellipse cx="362" cy="282" rx="7" ry="11" fill="url(#skin-grad)" />
          <ellipse cx="288" cy="282" rx="3" ry="5" fill="#a87a55" opacity="0.5" />
          <ellipse cx="362" cy="282" rx="3" ry="5" fill="#a87a55" opacity="0.5" />
          <ellipse cx="326" cy="276" rx="40" ry="44" fill="url(#skin-grad)" />
          <path
            d="M286 270 q0 -48 40 -50 q46 -2 48 42 q-12 -22 -42 -20 q-30 -2 -46 28z"
            fill="url(#hair-grad)"
          />
          <path
            d="M298 248 q14 -16 30 -14"
            fill="none"
            stroke="#6d4c33"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.55"
          />
        </g>
      </svg>

      {/* Floating $ npm chip */}
      <motion.div
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="absolute -right-4 top-12 hidden rounded-2xl bg-white px-4 py-2 font-mono text-[16px] text-foreground shadow-[0_12px_28px_-12px_rgba(23,20,19,0.3)] md:block"
      >
        $ npm run dev
      </motion.div>
    </motion.div>
  );
}
