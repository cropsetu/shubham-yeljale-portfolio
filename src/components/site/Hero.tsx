import { Link } from "@tanstack/react-router";
import { Monogram } from "./Monogram";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Marquee } from "./Marquee";

const headlineWords = ["I", "build", "websites", "that", "feel", "alive."];

export function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const indicatorOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden">
      <div className="vignette" />

      {/* Top nav */}
      <header className="container-edge relative z-10 flex items-center justify-between pt-8">
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
          data-cursor="home"
        >
          <Monogram className="h-6 w-12 text-foreground" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            JahiratBazi
          </span>
        </motion.div>
        <motion.nav
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="hidden items-center gap-8 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground md:flex"
        >
          <a href="#work" className="transition-colors hover:text-foreground" data-cursor="view">
            Work
          </a>
          <a href="#about" className="transition-colors hover:text-foreground" data-cursor="view">
            About
          </a>
          <a href="#services" className="transition-colors hover:text-foreground" data-cursor="view">
            Services
          </a>
          <a href="#contact" className="transition-colors hover:text-foreground" data-cursor="view">
            Contact
          </a>
        </motion.nav>
      </header>

      {/* Headline */}
      <div className="container-edge relative z-10 flex flex-1 flex-col justify-center pb-32 pt-20">
        <motion.span
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8 inline-flex w-fit items-center gap-3 rounded-full border border-border bg-surface/50 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-cyan)] shadow-[0_0_8px_var(--accent-cyan)]" />
          Available for select projects · 2025–2026
        </motion.span>

        <h1 className="font-display text-[clamp(48px,11vw,176px)] leading-[0.92] text-foreground">
          {headlineWords.map((w, i) => {
            const isAccent = w === "alive.";
            return (
              <span key={i} className="inline-block overflow-hidden align-bottom pr-[0.18em]">
                <motion.span
                  className={`inline-block ${isAccent ? "accent-gradient-text font-serif italic" : ""}`}
                  initial={reduce ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.6 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {w}
                </motion.span>
              </span>
            );
          })}
        </h1>

        <motion.p
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Software developer based in Pune, India — turning ideas into cinematic, fast,
          conversion-ready products.
        </motion.p>
      </div>

      {/* Bottom marquee */}
      <div className="relative z-10 border-y border-border bg-surface/30 py-4 backdrop-blur">
        <Marquee
          items={[
            "Available for freelance",
            "React",
            "Next.js",
            "Motion design",
            "Full-stack",
            "2025 / 2026",
          ]}
        />
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: indicatorOpacity }}
        className="pointer-events-none fixed bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          scroll
        </span>
        <motion.span
          className="block h-12 w-px origin-top bg-foreground/40"
          animate={reduce ? undefined : { scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
