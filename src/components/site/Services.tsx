import { motion } from "framer-motion";
import { Globe, Cpu, Smartphone, Sparkles } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Platforms",
    desc: "Production-grade websites, SaaS dashboards and marketing sites built with React, Next.js and Node.js.",
    features: ["Custom design systems", "Server components", "SEO & Core Web Vitals"],
  },
  {
    icon: Cpu,
    title: "AI Integration",
    desc: "From RAG chat to autonomous agents — I plug intelligent capabilities into your product without the science-project mess.",
    features: ["LLM agents & RAG", "Voice & vision pipelines", "Eval & guardrails"],
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    desc: "Native-feel iOS and Android apps in React Native — all the way from idea to App Store launch.",
    features: ["Cross-platform speed", "Offline-first", "Push & analytics"],
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32 px-4">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-glow mb-4">
            // services
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
            What I <span className="text-gradient">build for you.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative rounded-3xl glass-strong p-6 md:p-8 overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-accent/20 blur-3xl group-hover:bg-accent/40 transition-colors duration-700" />
              <s.icon className="relative h-10 w-10 text-accent-glow mb-6" />
              <h3 className="relative font-display text-2xl font-bold mb-3">{s.title}</h3>
              <p className="relative text-sm text-muted-foreground mb-6 leading-relaxed">
                {s.desc}
              </p>
              <ul className="relative space-y-2">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Sparkles className="h-3.5 w-3.5 text-primary-glow" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
