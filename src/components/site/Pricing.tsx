import { motion } from "framer-motion";
import { Check, Globe, Smartphone, Cog, Sparkles, Crown } from "lucide-react";

const PHONE = "9970014674";
const wa = (msg: string) =>
  `https://wa.me/91${PHONE}?text=${encodeURIComponent(msg)}`;

type Tier = {
  Icon: typeof Globe;
  name: string;
  tagline: string;
  price: string;
  unit: string;
  delivery: string;
  features: string[];
  cta: string;
  ctaLink: string;
  highlighted?: boolean;
  badge?: string;
};

const tiers: Tier[] = [
  {
    Icon: Globe,
    name: "Business Website",
    tagline: "Perfect for startups, small businesses & personal brands.",
    price: "₹9,999",
    unit: "starting",
    delivery: "7–14 days",
    features: [
      "Up to 5 custom-designed pages",
      "Fully mobile-responsive",
      "On-page SEO + meta tags",
      "Contact form + WhatsApp button",
      "Free domain & hosting setup",
      "7 days of post-launch support",
    ],
    cta: "Start My Website",
    ctaLink: wa(
      "Hi Shubham, I want a Business Website (₹9,999 plan). Can we discuss?",
    ),
  },
  {
    Icon: Smartphone,
    name: "Mobile App",
    tagline: "Native-feel iOS + Android, built once and shipped to both stores.",
    price: "₹49,999",
    unit: "starting",
    delivery: "3–5 weeks",
    features: [
      "iOS + Android from a single codebase",
      "Custom UI/UX tailored to your brand",
      "Push notifications baked in",
      "Backend API + secure database",
      "App Store + Play Store submission",
      "7 days of post-launch support",
    ],
    cta: "Start My App",
    ctaLink: wa(
      "Hi Shubham, I want a Mobile App (₹49,999 plan). Can we discuss?",
    ),
    highlighted: true,
    badge: "Most Popular",
  },
  {
    Icon: Cog,
    name: "Custom Software",
    tagline: "Internal tools, dashboards & SaaS platforms built from scratch.",
    price: "₹99,999",
    unit: "starting",
    delivery: "4–8 weeks",
    features: [
      "Fully custom architecture",
      "Admin dashboard with analytics",
      "Third-party API integrations",
      "Role-based access + security",
      "Scalable cloud infrastructure",
      "Dedicated project manager",
    ],
    cta: "Discuss My Project",
    ctaLink: wa(
      "Hi Shubham, I need Custom Software (₹99,999 plan). Can we discuss?",
    ),
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-20 sm:py-32 px-4 overflow-hidden">
      {/* decorative SVG flourishes */}
      <svg
        aria-hidden
        className="absolute -top-10 -right-10 w-64 h-64 opacity-20 blur-2xl pointer-events-none"
        viewBox="0 0 200 200"
      >
        <defs>
          <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--gold))" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(var(--gold))" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="100" fill="url(#goldGlow)" />
      </svg>
      <svg
        aria-hidden
        className="absolute -bottom-10 -left-10 w-72 h-72 opacity-15 blur-3xl pointer-events-none"
        viewBox="0 0 200 200"
      >
        <defs>
          <radialGradient id="cyanGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(220 100% 60%)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(220 100% 60%)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="100" fill="url(#cyanGlow)" />
      </svg>

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-300 mb-4 inline-flex items-center gap-2 justify-center">
            <Sparkles className="w-3.5 h-3.5" />
            // pricing
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Honest Pricing,{" "}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Premium Quality
            </span>
          </h2>
          <p className="text-base sm:text-lg text-foreground/65 max-w-2xl mx-auto">
            No hidden fees. No agency markups. Pay in milestones, only when you&apos;re happy
            with what you see.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative rounded-3xl p-6 sm:p-8 flex flex-col ${
                t.highlighted
                  ? "bg-gradient-to-b from-amber-500/10 via-amber-500/[0.04] to-transparent border-2 border-amber-400/40 shadow-[0_0_60px_rgba(251,191,36,0.25)]"
                  : "bg-white/[0.03] border border-white/[0.08] hover:border-blue-500/30"
              } transition-all duration-500 hover:scale-[1.015]`}
            >
              {t.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-black shadow-[0_4px_20px_rgba(251,191,36,0.4)]">
                  <Crown className="w-3 h-3" />
                  {t.badge}
                </div>
              )}

              <div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-xl mb-5 ${
                  t.highlighted
                    ? "bg-gradient-to-br from-amber-400/30 to-yellow-500/30 border border-amber-400/40"
                    : "bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30"
                }`}
              >
                <t.Icon
                  className={`w-6 h-6 ${
                    t.highlighted ? "text-amber-300" : "text-blue-300"
                  }`}
                />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                {t.name}
              </h3>
              <p className="text-sm text-foreground/60 mb-6 min-h-[2.5rem]">
                {t.tagline}
              </p>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-foreground/50">
                    {t.unit}
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span
                    className={`font-display text-4xl sm:text-5xl font-bold ${
                      t.highlighted
                        ? "bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent"
                        : "text-foreground"
                    }`}
                  >
                    {t.price}
                  </span>
                </div>
                <p className="text-xs text-foreground/50 font-mono mt-2">
                  Delivery in {t.delivery}
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        t.highlighted
                          ? "bg-amber-400/20 border border-amber-400/40"
                          : "bg-blue-500/15 border border-blue-500/30"
                      }`}
                    >
                      <Check
                        className={`w-3 h-3 ${
                          t.highlighted ? "text-amber-300" : "text-blue-300"
                        }`}
                      />
                    </span>
                    <span className="text-sm text-foreground/80">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={t.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center w-full rounded-xl px-5 py-3 text-sm font-semibold transition-all hover:scale-[1.02] ${
                  t.highlighted
                    ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-black shadow-[0_0_30px_rgba(251,191,36,0.4)] hover:shadow-[0_0_40px_rgba(251,191,36,0.6)]"
                    : "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                }`}
              >
                {t.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-foreground/55 mt-10"
        >
          Need something different?{" "}
          <a
            href="#contact"
            className="text-amber-300 hover:text-amber-200 underline underline-offset-4 decoration-amber-400/40"
          >
            Get a custom quote in 24 hours →
          </a>
        </motion.p>
      </div>
    </section>
  );
}
