import { motion } from "framer-motion";
import {
  Clock3,
  UserCheck,
  Target,
  Wallet,
  ShieldCheck,
  Search,
} from "lucide-react";

const benefits = [
  {
    Icon: Clock3,
    title: "Under 3-Week Delivery",
    desc: "Most projects ship in 1–3 weeks. I keep scope tight and communicate every step so there are zero surprises.",
  },
  {
    Icon: UserCheck,
    title: "Direct Communication",
    desc: "You're talking to the person who's actually building it. No account managers, no telephone game.",
  },
  {
    Icon: Target,
    title: "Built to Convert",
    desc: "I optimize for the metric that matters to you — bookings, signups, sales — not just pixels.",
  },
  {
    Icon: Wallet,
    title: "Pay in Milestones",
    desc: "No upfront payment. You only pay when each agreed milestone is delivered and you're happy.",
  },
  {
    Icon: ShieldCheck,
    title: "7-Day Free Post-Launch Support",
    desc: "After launch, a full week of free fixes and tweaks. Bugs and small adjustments are on me.",
  },
  {
    Icon: Search,
    title: "Free SEO & Speed Optimization",
    desc: "Every site ships with proper meta tags, OG images, sitemap, and Core Web Vitals tuned green.",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-20 sm:py-32 px-4">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-blue-300 mb-4">
            // why_me
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
              typingCode
            </span>
            <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              AI
            </span>
            <span className="text-foreground">?</span>
          </h2>
          <p className="text-base sm:text-lg text-foreground/65 max-w-2xl mx-auto">
            A boutique dev studio founded by{" "}
            <span className="text-amber-200 font-semibold">Shubham Yeljale</span> —
            agency-level output without agency-level overhead, timelines, or
            invoices.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group relative rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-blue-500/30 hover:bg-blue-500/[0.05] p-5 sm:p-6 transition-all duration-500"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 mb-4 group-hover:scale-110 transition-transform">
                <b.Icon className="w-5 h-5 text-blue-300" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">{b.title}</h3>
              <p className="text-sm text-foreground/65 leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Closing CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 rounded-3xl bg-gradient-to-r from-blue-600/15 via-cyan-500/15 to-blue-600/15 border border-blue-500/25 p-6 sm:p-10 text-center"
        >
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Got an idea? Let&apos;s make it real.
          </h3>
          <p className="text-foreground/70 mb-6 max-w-xl mx-auto">
            Free consultation, free mockup in 48 hours, and you only pay when you see results.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-7 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold rounded-xl shadow-[0_0_28px_rgba(59,130,246,0.45)] transition-all hover:scale-105"
          >
            Get Started — It&apos;s Free
          </a>
        </motion.div>
      </div>
    </section>
  );
}
