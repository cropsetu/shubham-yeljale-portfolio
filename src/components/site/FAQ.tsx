import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "How quickly can you deliver my project?",
    a: "Most websites ship in 7–14 days. Mobile apps take 3–5 weeks, custom software 4–8 weeks. You see a live preview within 48 hours of starting, and I share progress every few days so you're never waiting in the dark.",
  },
  {
    q: "Do I really pay nothing upfront?",
    a: "Correct. You only pay when each agreed milestone is delivered and you've approved it. If you're not happy with a milestone, we iterate until it's right — you're not locked into a deposit you can't get back.",
  },
  {
    q: "What if I don't like the design?",
    a: "The free 48-hour mockup exists for exactly this reason. If the direction isn't right, you tell me before any code is written and we revise — or you walk away with no obligation. Once we start building, two rounds of design revisions are included in every plan.",
  },
  {
    q: "Will my site work well on phones?",
    a: "Every project is mobile-first by default. I test on real iOS and Android devices, not just browser dev tools. Your site will load fast, look sharp, and feel native on phones, tablets, and desktops.",
  },
  {
    q: "Do you handle hosting and domain setup?",
    a: "Yes — for the Business Website tier, hosting and domain setup are included free for the first year. For apps and custom software, I'll set up production infrastructure (AWS, Vercel, Firebase, etc.) and hand you the keys with full documentation.",
  },
  {
    q: "What happens after launch?",
    a: "Every plan includes 7 days of free post-launch support. Bugs, small tweaks, content fixes — all on me. After that, ongoing maintenance plans start at ₹2,999/month if you'd like me to keep things humming.",
  },
  {
    q: "Can you work with my existing team or designer?",
    a: "Absolutely. I regularly collaborate with in-house designers, marketers, and dev teams. I can take Figma files and ship them pixel-perfect, or jump into an existing codebase to add features without breaking anything.",
  },
  {
    q: "Do you build with AI features?",
    a: "Yes — chatbots, AI-powered search, content generation, image processing, voice agents, and OpenAI/Claude/Gemini integrations are part of my regular toolkit. If you have an AI idea, we can scope it together.",
  },
  {
    q: "What tech stack do you use?",
    a: "Web: React, Next.js, TypeScript, Tailwind, Node.js. Mobile: React Native, Expo. Backend: Node, Python, Postgres, Supabase, Firebase. I pick the stack that fits the project, not the other way around.",
  },
  {
    q: "How do we get started?",
    a: "Click any \"Free Mockup\" button or message me on WhatsApp at +91 99700 14674. We'll have a 20-minute call about your goals, then I send you a clickable mockup within 48 hours. No commitment until you see it.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-20 sm:py-32 px-4 overflow-hidden">
      {/* decorative SVG accents */}
      <svg
        aria-hidden
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[300px] opacity-[0.07] pointer-events-none"
        viewBox="0 0 800 300"
      >
        <defs>
          <linearGradient id="faqLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(var(--gold))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--gold))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--gold))" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,150 Q200,50 400,150 T800,150"
          fill="none"
          stroke="url(#faqLine)"
          strokeWidth="2"
        />
      </svg>

      <div className="relative mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-300 mb-4 inline-flex items-center gap-2 justify-center">
            <HelpCircle className="w-3.5 h-3.5" />
            // faq
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Questions?{" "}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              I&apos;ve got answers.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-foreground/65 max-w-2xl mx-auto">
            Everything you need to know before we start building together.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className={`rounded-2xl border transition-colors ${
                  isOpen
                    ? "bg-amber-500/[0.04] border-amber-400/30"
                    : "bg-white/[0.03] border-white/[0.06] hover:border-white/[0.12]"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                >
                  <span
                    className={`text-base sm:text-lg font-semibold transition-colors ${
                      isOpen ? "text-amber-200" : "text-foreground"
                    }`}
                  >
                    {f.q}
                  </span>
                  <span
                    className={`shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full transition-all ${
                      isOpen
                        ? "bg-gradient-to-br from-amber-400 to-yellow-500 text-black rotate-45"
                        : "bg-white/[0.06] text-foreground/70"
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 -mt-1 text-sm sm:text-base text-foreground/70 leading-relaxed">
                        {f.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center rounded-2xl bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/10 border border-amber-400/25 p-6 sm:p-8"
        >
          <p className="text-foreground/80 mb-3 text-sm sm:text-base">
            Still have a question I haven&apos;t answered?
          </p>
          <a
            href="https://wa.me/919970014674?text=Hi%20Shubham%2C%20I%20have%20a%20question%20before%20I%20get%20started."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-semibold text-sm hover:scale-105 transition-transform shadow-[0_0_30px_rgba(251,191,36,0.4)]"
          >
            Ask me directly on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
