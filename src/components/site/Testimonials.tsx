import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const quotes = [
  {
    text: "Shubham shipped our marketing platform in record time. Clean code, fast feedback loops, and the motion design felt premium.",
    name: "Client",
    role: "Marketing Agency",
  },
  {
    text: "The most thoughtful developer we've worked with. He owns the problem end-to-end — from design to deployment.",
    name: "Founder",
    role: "Wellness Brand",
  },
  {
    text: "Took a vague idea and turned it into a beautiful, fast mobile-friendly site. Highly recommend.",
    name: "Client",
    role: "Service Business",
  },
  {
    text: "Rare combination of full-stack depth, mobile chops and strong product instincts. Just hire him.",
    name: "Client",
    role: "Tech Startup",
  },
  {
    text: "Made our landing page feel like the future. Conversion went up the week after launch.",
    name: "Client",
    role: "E-commerce",
  },
];

export function Testimonials() {
  const loop = [...quotes, ...quotes];
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-glow mb-4">
            // signals_from_clients
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
            Kind words across <span className="text-gradient">the galaxy.</span>
          </h2>
        </motion.div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex gap-4 md:gap-6 animate-scroll-x w-max px-4">
          {loop.map((q, i) => (
            <article
              key={i}
              className="w-[280px] sm:w-[340px] md:w-[400px] shrink-0 rounded-3xl glass-strong p-6 md:p-8"
            >
              <Quote className="h-6 w-6 text-accent-glow mb-4" />
              <p className="text-foreground/90 mb-6 leading-relaxed text-sm md:text-base">
                {q.text}
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-neon flex items-center justify-center font-display font-bold text-primary-foreground">
                  {q.name[0]}
                </div>
                <div>
                  <div className="font-medium text-sm">{q.name}</div>
                  <div className="text-xs text-muted-foreground">{q.role}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
