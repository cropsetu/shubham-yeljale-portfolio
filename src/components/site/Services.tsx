import { motion } from "framer-motion";
import {
  Smartphone,
  Globe,
  Code2,
  Palette,
  Zap,
  Wrench,
} from "lucide-react";

const services = [
  {
    Icon: Smartphone,
    title: "App Development",
    desc: "Native-feel iOS and Android apps in React Native — push notifications, offline-first, and App Store launch handled.",
    features: ["React Native + Expo", "Push & analytics", "App Store + Play Store"],
  },
  {
    Icon: Globe,
    title: "Web Development",
    desc: "Production-grade marketing sites, SaaS dashboards and full-stack apps with React, Next.js and Node.js.",
    features: ["React + Next.js", "Node + Postgres", "Edge deployment"],
  },
  {
    Icon: Code2,
    title: "Custom Software",
    desc: "Internal tools, AI-powered automations and custom workflows tailored to your team's exact needs.",
    features: ["AI / LLM integrations", "REST + GraphQL APIs", "Real-time tools"],
  },
  {
    Icon: Palette,
    title: "UI / UX Design",
    desc: "Pixel-perfect interfaces designed in Figma — handed off as production-ready components, not pretty pictures.",
    features: ["Figma → Tailwind", "Design systems", "Motion + micro-interactions"],
  },
  {
    Icon: Zap,
    title: "Performance Optimization",
    desc: "Make your site fast. Core Web Vitals, image pipelines, code splitting, edge caching — measurable speed wins.",
    features: ["Lighthouse > 90", "CWV in the green", "CDN + caching"],
  },
  {
    Icon: Wrench,
    title: "Maintenance & Support",
    desc: "Ongoing fixes, content updates, monitoring and analytics so your launched product stays healthy.",
    features: ["7-day post-launch", "Monthly retainers", "24h response"],
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-20 sm:py-32 px-4">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-blue-300 mb-4">
            // services
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            What I Build for{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              You
            </span>
          </h2>
          <p className="text-base sm:text-lg text-foreground/65 max-w-2xl mx-auto">
            From a single landing page to a full-stack SaaS — six services I deliver end-to-end,
            with measurable outcomes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              className="group relative rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-blue-500/30 hover:bg-blue-500/[0.05] p-6 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl group-hover:bg-blue-500/25 transition-colors duration-700" />
              <div className="relative">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 mb-5 group-hover:scale-110 group-hover:border-blue-400/60 transition-all">
                  <s.Icon className="w-6 h-6 text-blue-300" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-blue-300 transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-foreground/65 leading-relaxed mb-4">{s.desc}</p>
                <ul className="space-y-1.5">
                  {s.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-xs text-foreground/55"
                    >
                      <span className="h-1 w-1 rounded-full bg-cyan-400" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
