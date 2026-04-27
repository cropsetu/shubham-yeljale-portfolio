import { useRef } from "react";
import { motion } from "framer-motion";
import { useSectionProgress } from "@/lib/scroll";
import { HeroCharacter } from "./HeroCharacter";
import { HoloFigure3D } from "./HoloFigure3D";
import { HoloTag } from "./HoloTag";
import { ScrollCounter } from "./ScrollCounter";

export function HeroToAbout() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const progress = useSectionProgress(sectionRef);

  // Sub-progress windows for layered effects
  const heroFade = Math.min(progress * 2.2, 1);
  const characterTuck = Math.min(progress * 1.8, 1);
  const figureEntry = Math.min(Math.max((progress - 0.18) / 0.32, 0), 1);
  const fillProgress = Math.min(Math.max((progress - 0.35) / 0.55, 0), 1);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative"
      style={{ height: "380vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Plasma curtain band that drops from top as we transition to "about" */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[140px]"
          style={{
            background:
              "linear-gradient(180deg, rgba(34,211,238,0.0) 0%, rgba(34,211,238,0.55) 35%, rgba(217,70,239,0.55) 65%, rgba(7,4,26,0.0) 100%)",
            filter: "blur(28px)",
            opacity: Math.min(progress * 2.4, 0.9) * (1 - Math.max(0, progress - 0.85) * 6),
            y: -120 + Math.min(progress, 0.6) * 180,
          }}
        />

        {/* Holographic perspective floor (always cosmic) */}
        <PerspectiveFloor opacity={Math.min(progress * 1.5, 1)} />

        {/* HERO TEXT (left) — fades + lifts as we scroll */}
        <motion.div
          className="container-edge absolute inset-0 z-[4] flex items-center"
          style={{ opacity: 1 - heroFade, y: -heroFade * 80 }}
        >
          <div className="relative z-10 max-w-xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="holo-text font-display text-[clamp(64px,11vw,160px)] leading-[0.92]"
            >
              Shubham
              <br />
              Yeljale
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="holo-border mt-6 inline-flex -rotate-2 items-center rounded-md px-5 py-2 font-mono text-[24px] uppercase tracking-[0.12em] text-white"
              style={{
                background:
                  "linear-gradient(135deg, rgba(106,60,244,0.6) 0%, rgba(217,70,239,0.6) 100%)",
                boxShadow: "0 10px 36px -12px rgba(217,70,239,0.6)",
              }}
            >
              Full-stack AI Developer
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.0 }}
              className="mt-10 max-w-md text-base leading-relaxed text-foreground/75 md:text-lg"
            >
              Building interactive 3D experiences, AI-powered products, and real-time systems that
              are fast, responsive, and fun to use.
            </motion.p>
          </div>
        </motion.div>

        {/* HERO CHARACTER — right side, tucks toward upper-right as we scroll */}
        <motion.div
          className="absolute right-[6%] top-1/2 z-[5] hidden md:block"
          style={{
            transformOrigin: "top right",
            scale: 1 - characterTuck * 0.55,
            x: characterTuck * 80,
            y: -250 + -characterTuck * 220,
            opacity: 1 - Math.max(0, progress - 0.78) * 4.5,
          }}
        >
          <div className="w-[520px] max-w-[44vw]">
            <HeroCharacter />
          </div>
        </motion.div>

        {/* HOLO FIGURE — rises up out of the cosmic void */}
        <motion.div
          className="absolute inset-0 z-[6] flex items-center justify-center"
          style={{
            opacity: figureEntry,
            y: (1 - figureEntry) * 240,
          }}
        >
          <HoloFigure3D progress={fillProgress} />
        </motion.div>

        {/* TAGS */}
        <HoloTag visible={progress > 0.55} side="left" yPercent={26}>
          <div className="font-display text-xl font-bold leading-tight">Shubham</div>
          <div className="mt-1 flex items-center gap-1 text-[16px] opacity-80">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
            </svg>
            Pune, India
          </div>
        </HoloTag>

        <HoloTag visible={progress > 0.72} side="left" yPercent={62}>
          <div className="text-[16px] leading-relaxed">
            Builds full-stack web apps and AI-powered systems that are fast, responsive, and fun to
            use.
          </div>
        </HoloTag>

        <HoloTag visible={progress > 0.86} side="right" yPercent={38}>
          <div className="font-display text-lg font-bold uppercase tracking-wide">Skills</div>
          <ul className="mt-2 space-y-1 text-[16px] leading-snug">
            <li>· Full-stack AI Developer</li>
            <li>· Web Developer</li>
            <li>· React &amp; Next.js</li>
            <li>· Node.js &amp; Python</li>
            <li>· Real-time &amp; WebSockets</li>
          </ul>
        </HoloTag>

        {/* Counter */}
        <motion.div
          className="absolute bottom-8 left-0 right-0 z-10 flex justify-center"
          style={{ opacity: figureEntry }}
        >
          <ScrollCounter progress={fillProgress} />
        </motion.div>
      </div>
    </section>
  );
}

function PerspectiveFloor({ opacity }: { opacity: number }) {
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-2/3 w-full"
      viewBox="0 0 1440 600"
      preserveAspectRatio="none"
      aria-hidden
      style={{ opacity }}
    >
      <defs>
        <linearGradient id="floor-fade" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>
      </defs>
      {Array.from({ length: 9 }).map((_, i) => {
        const t = i / 8;
        const y = 600 - Math.pow(t, 1.5) * 600;
        return (
          <line
            key={`h-${i}`}
            x1="0"
            x2="1440"
            y1={y}
            y2={y}
            stroke="url(#floor-fade)"
            strokeWidth="1"
          />
        );
      })}
      {Array.from({ length: 13 }).map((_, i) => {
        const x = (i / 12) * 1440;
        return (
          <line
            key={`r-${i}`}
            x1={720}
            y1={300}
            x2={x}
            y2={600}
            stroke="url(#floor-fade)"
            strokeWidth="1"
          />
        );
      })}
    </svg>
  );
}
