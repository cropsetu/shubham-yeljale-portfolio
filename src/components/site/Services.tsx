import { motion } from "framer-motion";
import {
  Smartphone,
  Globe,
  Code2,
  Palette,
  Zap,
  Wrench,
} from "lucide-react";

type ServiceColor = {
  ring: string;
  iconBg: string;
  iconColor: string;
  hoverBorder: string;
  hoverText: string;
  blob: string;
  dot: string;
};

const palettes: Record<string, ServiceColor> = {
  blue: {
    ring: "border-blue-500/30",
    iconBg: "from-blue-500/25 to-cyan-500/25",
    iconColor: "text-blue-300",
    hoverBorder: "hover:border-blue-400/50",
    hoverText: "group-hover:text-blue-300",
    blob: "bg-blue-500/15 group-hover:bg-blue-500/30",
    dot: "bg-cyan-400",
  },
  emerald: {
    ring: "border-emerald-500/30",
    iconBg: "from-emerald-500/25 to-teal-500/25",
    iconColor: "text-emerald-300",
    hoverBorder: "hover:border-emerald-400/50",
    hoverText: "group-hover:text-emerald-300",
    blob: "bg-emerald-500/15 group-hover:bg-emerald-500/30",
    dot: "bg-teal-400",
  },
  violet: {
    ring: "border-violet-500/30",
    iconBg: "from-violet-500/25 to-fuchsia-500/25",
    iconColor: "text-violet-300",
    hoverBorder: "hover:border-violet-400/50",
    hoverText: "group-hover:text-violet-300",
    blob: "bg-violet-500/15 group-hover:bg-violet-500/30",
    dot: "bg-fuchsia-400",
  },
  rose: {
    ring: "border-rose-500/30",
    iconBg: "from-rose-500/25 to-pink-500/25",
    iconColor: "text-rose-300",
    hoverBorder: "hover:border-rose-400/50",
    hoverText: "group-hover:text-rose-300",
    blob: "bg-rose-500/15 group-hover:bg-rose-500/30",
    dot: "bg-pink-400",
  },
  amber: {
    ring: "border-amber-400/30",
    iconBg: "from-amber-400/25 to-yellow-500/25",
    iconColor: "text-amber-300",
    hoverBorder: "hover:border-amber-400/50",
    hoverText: "group-hover:text-amber-300",
    blob: "bg-amber-500/15 group-hover:bg-amber-500/30",
    dot: "bg-yellow-400",
  },
  cyan: {
    ring: "border-cyan-500/30",
    iconBg: "from-cyan-500/25 to-sky-500/25",
    iconColor: "text-cyan-300",
    hoverBorder: "hover:border-cyan-400/50",
    hoverText: "group-hover:text-cyan-300",
    blob: "bg-cyan-500/15 group-hover:bg-cyan-500/30",
    dot: "bg-sky-400",
  },
};

const services = [
  {
    Icon: Globe,
    title: "Web Development",
    desc: "Production-grade marketing sites, SaaS dashboards and full-stack apps with React, Next.js and Node.js.",
    features: ["React + Next.js", "Node + Postgres", "Edge deployment"],
    color: palettes.blue,
  },
  {
    Icon: Smartphone,
    title: "Mobile Apps",
    desc: "Native-feel iOS and Android apps in React Native — push notifications, offline-first, and App Store launch handled.",
    features: ["React Native + Expo", "Push & analytics", "App Store + Play Store"],
    color: palettes.emerald,
  },
  {
    Icon: Code2,
    title: "Custom Software",
    desc: "Internal tools, AI-powered automations and custom workflows tailored to your team's exact needs.",
    features: ["AI / LLM integrations", "REST + GraphQL APIs", "Real-time tools"],
    color: palettes.violet,
  },
  {
    Icon: Palette,
    title: "UI / UX Design",
    desc: "Pixel-perfect interfaces designed in Figma — handed off as production-ready components, not pretty pictures.",
    features: ["Figma → Tailwind", "Design systems", "Motion + micro-interactions"],
    color: palettes.rose,
  },
  {
    Icon: Zap,
    title: "Performance & SEO",
    desc: "Make your site fast and findable. Core Web Vitals, image pipelines, structured data, edge caching — measurable wins.",
    features: ["Lighthouse > 90", "CWV in the green", "Schema + sitemap"],
    color: palettes.amber,
  },
  {
    Icon: Wrench,
    title: "Maintenance & Support",
    desc: "Ongoing fixes, content updates, monitoring and analytics so your launched product stays healthy.",
    features: ["7-day post-launch", "Monthly retainers", "24h response"],
    color: palettes.cyan,
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-20 sm:py-32 px-4 overflow-hidden">
      {/* decorative SVG flourish */}
      <svg
        aria-hidden
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[200px] opacity-[0.08] pointer-events-none"
        viewBox="0 0 600 200"
      >
        <defs>
          <linearGradient id="svcLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(220 100% 60%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--gold))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(320 95% 55%)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,100 Q150,30 300,100 T600,100"
          stroke="url(#svcLine)"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      <div className="relative mx-auto max-w-6xl">
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
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-amber-300 bg-clip-text text-transparent">
              You
            </span>
          </h2>
          <p className="text-base sm:text-lg text-foreground/65 max-w-2xl mx-auto">
            From a single landing page to a full-stack SaaS — six services I deliver
            end-to-end, with measurable outcomes.
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
              className={`group relative rounded-2xl bg-white/[0.03] border border-white/[0.06] ${s.color.hoverBorder} p-6 transition-all duration-500 hover:-translate-y-1 overflow-hidden`}
            >
              <div
                className={`absolute -top-12 -right-12 h-32 w-32 rounded-full ${s.color.blob} blur-2xl transition-colors duration-700`}
              />
              <div className="relative">
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${s.color.iconBg} border ${s.color.ring} mb-5 group-hover:scale-110 transition-all`}
                >
                  <s.Icon className={`w-6 h-6 ${s.color.iconColor}`} />
                </div>
                <h3
                  className={`text-xl font-bold text-foreground mb-2 ${s.color.hoverText} transition-colors`}
                >
                  {s.title}
                </h3>
                <p className="text-sm text-foreground/65 leading-relaxed mb-4">
                  {s.desc}
                </p>
                <ul className="space-y-1.5">
                  {s.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-xs text-foreground/55"
                    >
                      <span className={`h-1 w-1 rounded-full ${s.color.dot}`} />
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
