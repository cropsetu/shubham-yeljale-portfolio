import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 px-4">
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative mx-auto"
        >
          <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-primary/30 via-accent/30 to-primary-glow/30 blur-3xl animate-pulse-glow" />
          <div className="relative h-64 w-64 sm:h-80 sm:w-80 md:h-96 md:w-96 rounded-full overflow-hidden neon-border glass-strong grid place-items-center">
            <span className="font-display text-[140px] md:text-[180px] font-black leading-none text-gradient">
              SY
            </span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-background/40 via-transparent to-transparent" />
          </div>
          <div
            className="absolute inset-0 rounded-full border border-accent/20 animate-spin"
            style={{ animationDuration: "30s" }}
          />
          <div
            className="absolute -inset-4 rounded-full border border-primary/15 animate-spin"
            style={{ animationDuration: "45s", animationDirection: "reverse" }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-glow mb-4">
            // about_me
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
            A full-stack craftsman in the{" "}
            <span className="text-gradient">space between</span> code and motion.
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I&apos;m Shubham Yeljale, a full-stack developer based in Pune, India. I build
            production-grade websites and mobile applications end-to-end — design, frontend,
            backend, APIs, and deployment.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            I&apos;ve shipped 10+ projects across marketing platforms, e-commerce, AI chatbots,
            real-time tools, and brand sites. I obsess over performance, accessibility, and
            motion design that makes people whisper &ldquo;how did they do that?&rdquo;.
          </p>

          <div className="flex flex-wrap gap-2 md:gap-3">
            {["React", "Next.js", "TypeScript", "Node.js", "React Native", "Tailwind", "Three.js", "AI"].map((t) => (
              <span key={t} className="rounded-full glass px-3 py-1.5 text-xs font-mono">
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
