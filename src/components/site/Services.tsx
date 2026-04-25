import { Code2, Sparkles, Layers } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { SplitReveal } from "./SplitReveal";

const services = [
  {
    icon: Code2,
    title: "Web development",
    body: "React, Next.js, and full-stack apps engineered for speed and a long shelf life.",
  },
  {
    icon: Sparkles,
    title: "Motion & interaction",
    body: "Scroll experiences, micro-interactions, and animations that earn their place.",
  },
  {
    icon: Layers,
    title: "UI engineering",
    body: "Design systems and component libraries your team will actually want to use.",
  },
];

export function Services() {
  const reduce = useReducedMotion();
  return (
    <section id="services" className="relative py-32 md:py-48">
      <div className="container-edge">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          · 03 / What I do
        </p>
        <SplitReveal
          as="h2"
          className="mb-20 font-display text-[clamp(40px,7vw,96px)] leading-[0.95] text-foreground"
        >
          Three things, done well.
        </SplitReveal>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.a
                key={s.title}
                href="#contact"
                data-cursor="open"
                initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                whileHover="hover"
                className="group relative flex min-h-[320px] flex-col justify-between bg-surface p-10 transition-colors hover:bg-[var(--accent)]"
              >
                <motion.div
                  variants={{ hover: { rotate: -8, scale: 1.05 } }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background text-foreground"
                >
                  <Icon className="h-5 w-5" />
                </motion.div>
                <div>
                  <h3 className="font-display text-3xl text-foreground">{s.title}</h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-foreground/80 transition-transform group-hover:translate-x-1">
                    Learn more →
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
