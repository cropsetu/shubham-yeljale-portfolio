import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { SplitReveal } from "./SplitReveal";
import { Marquee } from "./Marquee";

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [val, setVal] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(to);
      return;
    }
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {val}
      {suffix}
    </span>
  );
}

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node",
  "Tailwind",
  "Framer Motion",
  "GSAP",
  "Three.js",
  "Figma",
  "Supabase",
  "Shopify",
  "Vite",
  "Postgres",
  "WebGL",
];

export function About() {
  return (
    <section id="about" className="relative py-32 md:py-48">
      <div className="container-edge">
        <div className="mb-16 flex items-end justify-between gap-8">
          <div>
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              · 01 / About
            </p>
            <SplitReveal
              as="h2"
              className="font-display text-[clamp(40px,7vw,96px)] leading-[0.95] text-foreground"
            >
              A developer obsessed with craft.
            </SplitReveal>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-lg leading-relaxed text-muted-foreground md:col-span-7"
          >
            <p>
              I&apos;m Shubham — a software developer based in Pune. I help studios, founders, and
              teams ship websites and products that move with intention.
            </p>
            <p>
              My focus is the intersection of motion, performance, and detail. The kind of work that
              loads in under a second and still feels handcrafted when you scroll.
            </p>
            <p className="text-foreground">
              When the brief reads &ldquo;just a website,&rdquo; I read it as &ldquo;something
              memorable.&rdquo;
            </p>
          </motion.div>

          <div className="md:col-span-5">
            <div className="sticky top-24 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border">
              {[
                { value: 30, suffix: "+", label: "Projects shipped" },
                { value: 4, suffix: "+", label: "Years building for the web" },
                { value: 100, suffix: "%", label: "Client satisfaction" },
              ].map((s) => (
                <div key={s.label} className="bg-surface p-8">
                  <div className="font-display text-5xl text-foreground md:text-6xl">
                    <CountUp to={s.value} suffix={s.suffix} />
                  </div>
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Skill ribbon */}
      <div className="mt-24 border-y border-border py-6">
        <Marquee items={skills} duration={50} separator="/" />
      </div>
    </section>
  );
}
