import { motion } from "framer-motion";
import { MessageSquare, Layout, Code2, Rocket } from "lucide-react";

const steps = [
  {
    Icon: MessageSquare,
    title: "Free Consultation",
    desc: "We talk for 20 minutes — what you need, your goals, your budget. No commitment.",
    duration: "Day 0",
  },
  {
    Icon: Layout,
    title: "Free Mockup in 48 Hours",
    desc: "I send you a clickable design + scope + timeline. You decide if it's a fit.",
    duration: "48 hrs",
  },
  {
    Icon: Code2,
    title: "Development & Updates",
    desc: "I build in milestones. You see progress every few days, not at the end. Pay only when each milestone is approved.",
    duration: "1–3 wks",
  },
  {
    Icon: Rocket,
    title: "Launch & Support",
    desc: "Deploy to production, hand over the keys, plus 7 days of free post-launch fixes and tweaks.",
    duration: "Launch",
  },
];

export function Experience() {
  return (
    <section id="process" className="relative py-20 sm:py-32 px-4">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-blue-300 mb-4">
            // process
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            How It{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-base sm:text-lg text-foreground/65 max-w-2xl mx-auto">
            From first message to live product in four steps. No surprises, no upfront payment.
          </p>
        </motion.div>

        {/* Connecting line behind cards (desktop only) */}
        <div className="relative">
          <div className="hidden lg:block absolute left-0 right-0 top-12 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative"
              >
                {/* Step number badge */}
                <div className="relative z-10 inline-flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-[0_0_30px_rgba(59,130,246,0.4)] mb-6 mx-auto group-hover:scale-110 transition-transform">
                  <s.Icon className="w-10 h-10 text-white" />
                  <span className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-foreground text-background grid place-items-center text-xs font-bold border-2 border-background">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-blue-500/30 p-5 sm:p-6 text-center transition-colors duration-500">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-cyan-400 mb-2">
                    {s.duration}
                  </p>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-foreground/65 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
