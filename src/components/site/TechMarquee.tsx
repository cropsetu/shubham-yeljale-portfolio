/**
 * Edge-faded, infinite horizontal marquee of the tech stack we ship in.
 * Two duplicates side-by-side scroll left at the same speed; the whole strip
 * loops seamlessly because translateX(-50%) lands exactly where we started.
 */

const stack = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind",
  "Node.js",
  "Python",
  "React Native",
  "Expo",
  "Postgres",
  "Supabase",
  "Firebase",
  "OpenAI",
  "Claude",
  "Gemini",
  "Three.js",
  "Framer Motion",
  "Vercel",
  "AWS",
];

export function TechMarquee() {
  return (
    <section
      aria-label="Tech stack"
      className="relative py-10 sm:py-14 border-y border-white/[0.06] bg-white/[0.015] overflow-hidden"
    >
      <p className="text-center text-[11px] font-mono uppercase tracking-[0.4em] text-foreground/45 mb-6">
        // built with
      </p>

      <div
        className="relative"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="flex w-max animate-scroll-x will-change-transform">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center gap-10 sm:gap-14 pr-10 sm:pr-14">
              {stack.map((name, i) => (
                <div
                  key={`${dup}-${name}`}
                  className="flex items-center gap-3 text-foreground/60 hover:text-foreground transition-colors"
                >
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{
                      background:
                        i % 3 === 0
                          ? "hsl(220 100% 65%)"
                          : i % 3 === 1
                            ? "hsl(190 100% 60%)"
                            : "hsl(43 96% 60%)",
                      boxShadow: "0 0 10px currentColor",
                    }}
                  />
                  <span className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight whitespace-nowrap">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
