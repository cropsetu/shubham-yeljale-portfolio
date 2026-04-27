import { useRef } from "react";
import { useSectionProgress } from "@/lib/scroll";
import { HoloFigure } from "./HoloFigure";
import { HoloTag } from "./HoloTag";
import { ScrollCounter } from "./ScrollCounter";

export function HoloAbout() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const progress = useSectionProgress(sectionRef);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-[var(--navy)] text-white"
      style={{ height: "260vh" }}
    >
      {/* Cream wave at top — visually links to the Hero's cream above */}
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        className="absolute left-0 right-0 top-0 h-[220px] w-full"
        aria-hidden
      >
        <path
          d="M0 0 L1440 0 L1440 60 Q1180 200 720 130 Q280 60 0 180 Z"
          fill="var(--background)"
        />
      </svg>

      {/* Holo grid backdrop */}
      <div className="pointer-events-none absolute inset-0 holo-grid opacity-60" />

      {/* Pinned stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Receding floor perspective grid */}
        <svg
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 w-full"
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="grid-fade" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#5ac8fa" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#5ac8fa" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Horizontal lines */}
          {Array.from({ length: 8 }).map((_, i) => {
            const t = i / 7;
            const y = 600 - Math.pow(t, 1.4) * 600;
            return (
              <line
                key={`h-${i}`}
                x1="0"
                x2="1440"
                y1={y}
                y2={y}
                stroke="url(#grid-fade)"
                strokeWidth="1"
              />
            );
          })}
          {/* Radial perspective lines */}
          {Array.from({ length: 11 }).map((_, i) => {
            const x = (i / 10) * 1440;
            return (
              <line
                key={`r-${i}`}
                x1={720}
                y1={300}
                x2={x}
                y2={600}
                stroke="url(#grid-fade)"
                strokeWidth="1"
              />
            );
          })}
        </svg>

        {/* Figure */}
        <div className="absolute inset-0 flex items-end justify-center pb-20">
          <HoloFigure progress={Math.min(progress * 1.15, 1)} />
        </div>

        {/* Tags */}
        <HoloTag visible={progress > 0.18} side="left" yPercent={28}>
          <div className="font-display text-xl font-bold leading-tight">Shubham</div>
          <div className="mt-1 flex items-center gap-1 text-sm opacity-80">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
            </svg>
            Pune, India
          </div>
        </HoloTag>

        <HoloTag visible={progress > 0.45} side="left" yPercent={56}>
          <div className="text-[16px] leading-relaxed">
            Builds full-stack web apps and AI-powered systems that are fast, responsive, and fun to
            use.
          </div>
        </HoloTag>

        <HoloTag visible={progress > 0.72} side="right" yPercent={36}>
          <div className="font-display text-lg font-bold uppercase tracking-wide">Skills</div>
          <ul className="mt-2 space-y-1 text-[15px] leading-snug">
            <li>· Full-stack AI Developer</li>
            <li>· Web Developer</li>
            <li>· React &amp; Next.js</li>
            <li>· Node.js &amp; Python</li>
            <li>· Real-time &amp; WebSockets</li>
          </ul>
        </HoloTag>

        <ScrollCounter progress={progress} />
      </div>

      {/* Bottom wave back to cream */}
      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 right-0 h-[160px] w-full"
        aria-hidden
      >
        <path
          d="M0 160 L1440 160 L1440 80 Q960 0 720 60 Q360 120 0 40 Z"
          fill="var(--background)"
        />
      </svg>
    </section>
  );
}
