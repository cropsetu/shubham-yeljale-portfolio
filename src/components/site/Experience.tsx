import { motion } from "framer-motion";

const journey = [
  {
    year: "2026",
    role: "Independent Full-Stack Developer",
    company: "Freelance · Pune, India",
    desc: "Building full-stack websites, AI integrations and mobile apps for global clients.",
  },
  {
    year: "2025",
    role: "Full-Stack Web & Mobile",
    company: "Multiple client projects",
    desc: "Shipped Artistly, SmartRO, Star Security, Jahiratbazi, YesITryMe and more — frontend through deployment.",
  },
  {
    year: "2024",
    role: "AI & Real-Time Engineer",
    company: "Side projects + freelance",
    desc: "Built a multi-tool chatbot AI, a real-time collaborative whiteboard and several React Native apps.",
  },
  {
    year: "2023",
    role: "Mid-Level Web Developer",
    company: "Agency work",
    desc: "Production React + Node sites, marketing pages, e-commerce integrations and dashboards.",
  },
  {
    year: "2022",
    role: "Frontend Developer",
    company: "First production work",
    desc: "Started shipping real client sites with React, Tailwind and Vercel — learned design systems on the job.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-32 px-4">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-glow mb-4">
            // trajectory
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
            The <span className="text-gradient">journey</span> so far.
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px bg-gradient-to-b from-primary via-accent to-primary opacity-50" />

          <div className="space-y-8 md:space-y-12">
            {journey.map((item, i) => {
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7 }}
                  className={`relative flex md:items-center ${
                    left ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                    <div className="relative h-4 w-4 rounded-full bg-accent glow-magenta">
                      <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-40" />
                    </div>
                  </div>

                  <div className="hidden md:block flex-1" />
                  <div
                    className={`pl-12 md:pl-0 md:w-1/2 ${
                      left ? "md:pr-12 md:text-right" : "md:pl-12"
                    }`}
                  >
                    <div className="rounded-2xl glass-strong p-5 md:p-6 hover:-translate-y-1 transition-transform">
                      <div className="font-mono text-xs text-accent-glow mb-2">{item.year}</div>
                      <h3 className="font-display text-xl font-bold mb-1">{item.role}</h3>
                      <div className="text-sm text-muted-foreground mb-3">{item.company}</div>
                      <p className="text-sm text-muted-foreground/90 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
