import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Star,
  Clock,
  Zap,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import { CodeTyper } from "@/components/site/CodeTyper";

const PHONE = "9970014674";
const WHATSAPP = `https://wa.me/91${PHONE}?text=Hi%20Shubham%2C%20I%27d%20like%20a%20free%20mockup%20for%20my%20project.`;

export function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Mouse-tracked blob parallax
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const x = e.clientX - window.innerWidth / 2;
      const y = e.clientY - window.innerHeight / 2;
      document.documentElement.style.setProperty("--mx", String(x));
      document.documentElement.style.setProperty("--my", String(y));
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16"
    >
      {/* Blueprint grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 grid-backdrop opacity-60"
      />

      {/* Animated colorful blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute top-10 left-4 md:left-10 w-72 md:w-96 h-72 md:h-96 rounded-full mix-blend-screen blur-3xl opacity-40 animate-pulse-glow"
          style={{
            background:
              "radial-gradient(circle, hsl(220 100% 60% / 0.55) 0%, transparent 70%)",
            transform: "translate(calc(var(--mx, 0) * 0.02px), calc(var(--my, 0) * 0.02px))",
            transition: "transform 0.4s ease-out",
          }}
        />
        <div
          className="absolute top-40 right-4 md:right-10 w-72 md:w-96 h-72 md:h-96 rounded-full mix-blend-screen blur-3xl opacity-40 animate-pulse-glow"
          style={{
            background:
              "radial-gradient(circle, hsl(43 96% 56% / 0.45) 0%, transparent 70%)",
            transform:
              "translate(calc(var(--mx, 0) * -0.015px), calc(var(--my, 0) * 0.015px))",
            transition: "transform 0.4s ease-out",
            animationDelay: "1.5s",
          }}
        />
        <div
          className="absolute bottom-10 left-1/3 w-72 md:w-96 h-72 md:h-96 rounded-full mix-blend-screen blur-3xl opacity-30 animate-pulse-glow"
          style={{
            background:
              "radial-gradient(circle, hsl(280 80% 60% / 0.45) 0%, transparent 70%)",
            transform:
              "translate(calc(var(--mx, 0) * 0.01px), calc(var(--my, 0) * -0.01px))",
            transition: "transform 0.4s ease-out",
            animationDelay: "3s",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-12 lg:gap-16 items-center">
          {/* ── LEFT: Brand + Headline + CTAs + Stats ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full glass border border-amber-300/30 text-amber-100 text-xs sm:text-sm font-medium mb-7 backdrop-blur-sm shadow-[0_0_30px_rgba(251,191,36,0.15)]">
              <span className="relative flex items-center justify-center">
                <span className="absolute w-5 h-5 rounded-full bg-emerald-400/30 animate-ping" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </span>
              <span>10+ projects shipped · accepting 3 new builds</span>
              <span className="hidden sm:flex -space-x-1 ml-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                  />
                ))}
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 leading-[1.05] tracking-tight">
              From{" "}
              <span className="relative inline-block">
                <span className="font-mono text-foreground/90">{`{idea}`}</span>
              </span>
              <br />
              to{" "}
              <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
                live product
              </span>
              ,<br />
              <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                in weeks.
              </span>
            </h1>

            {/* Subhead */}
            <p className="text-base sm:text-lg text-foreground/75 mb-9 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              <span className="font-display font-semibold">
                <span className="text-foreground/90">typing</span>
                <span className="text-blue-300">Code</span>
                <span className="text-amber-300">AI</span>
              </span>{" "}
              designs, builds and ships{" "}
              <span className="text-blue-300 font-semibold">websites</span>,{" "}
              <span className="text-cyan-300 font-semibold">mobile apps</span>{" "}
              &amp;{" "}
              <span className="bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent font-semibold">
                AI tools
              </span>{" "}
              end-to-end. Free 48-hour mockup, pay only on delivery — founded by{" "}
              <a
                href="#about"
                className="underline decoration-amber-400/40 underline-offset-4 hover:text-amber-200"
              >
                Shubham Yeljale
              </a>
              .
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-stretch sm:items-center mb-5">
              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center text-base px-7 sm:px-9 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold rounded-xl shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_50px_rgba(59,130,246,0.6)] transition-all duration-300 hover:scale-[1.02] overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Get a Free Mockup
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </span>
                <span
                  className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 pointer-events-none"
                  style={{ animation: "gradient-shift 3s ease-in-out infinite" }}
                />
              </a>

              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center text-base px-6 sm:px-7 py-3.5 border-2 border-emerald-500/50 bg-emerald-500/10 hover:bg-emerald-500/20 hover:border-emerald-400/70 text-foreground font-medium rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:shadow-[0_0_35px_rgba(16,185,129,0.3)] transition-all duration-300"
              >
                <MessageCircle className="mr-2 w-5 h-5 text-emerald-400" />
                WhatsApp Shubham
              </a>
            </div>

            {/* Urgency */}
            <p className="text-xs text-foreground/55 mb-10 flex items-center justify-center lg:justify-start gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Limited slots — only 3 new project kick-offs this month
            </p>

            {/* Stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto lg:mx-0">
              {[
                { Icon: Zap, value: 10, suffix: "+", label: "Projects Shipped" },
                { Icon: Star, value: 10, suffix: "+", label: "Happy Clients" },
                { Icon: Clock, value: 3, suffix: " wk", label: "Avg. Delivery" },
                { Icon: CheckCircle2, value: 48, suffix: " hr", label: "Free Mockup" },
              ].map((s, i) => (
                <StatCard key={s.label} {...s} delay={i * 0.1} />
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: Animated terminal + floating chips ─────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={mounted ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="relative"
          >
            {/* Floating tech chips around the terminal */}
            <FloatingChip
              label="React"
              dot="hsl(190 100% 60%)"
              className="absolute -top-3 -left-3 sm:-top-5 sm:-left-6"
              delay="0s"
            />
            <FloatingChip
              label="Next.js"
              dot="hsl(0 0% 95%)"
              className="absolute top-12 -right-2 sm:-right-6"
              delay="1s"
            />
            <FloatingChip
              label="OpenAI ✦"
              dot="hsl(43 96% 60%)"
              className="absolute -bottom-3 left-6 sm:-bottom-5 sm:left-10"
              delay="2s"
            />
            <FloatingChip
              label="Tailwind"
              dot="hsl(190 100% 60%)"
              className="absolute -bottom-2 right-3 sm:-bottom-4 sm:right-12"
              delay="2.6s"
            />
            <FloatingChip
              label="Node"
              dot="hsl(140 70% 60%)"
              className="hidden md:flex absolute top-1/3 -left-10"
              delay="1.6s"
            />

            {/* Halo behind the terminal */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10 rounded-3xl blur-3xl opacity-70"
              style={{
                background:
                  "radial-gradient(60% 60% at 50% 50%, hsl(220 100% 55% / 0.45), transparent 70%)",
              }}
            />

            {/* Code-style brand line — reads like an SDK install */}
            <div className="mb-3 flex items-center justify-center gap-2 font-mono text-[11px] sm:text-xs text-foreground/55">
              <span className="text-emerald-400">$</span>
              <span>npm install</span>
              <span className="font-semibold tracking-tight">
                <span className="text-foreground/85">typing</span>
                <span className="text-blue-300">Code</span>
                <span className="text-amber-300">AI</span>
              </span>
              <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/25 px-2 py-0.5 text-[10px] text-emerald-300">
                <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
                v1.0.0
              </span>
            </div>

            <CodeTyper className="rounded-2xl" />

            {/* Caption under the terminal */}
            <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-foreground/45 px-1">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                LIVE BUILD · auto-deploying
              </span>
              <span className="hidden sm:inline">typingcodeai · v1.0.0</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────── */

function FloatingChip({
  label,
  dot,
  className = "",
  delay = "0s",
}: {
  label: string;
  dot: string;
  className?: string;
  delay?: string;
}) {
  return (
    <div
      className={`z-10 inline-flex items-center gap-2 rounded-full glass-strong px-3 py-1.5 text-[11px] font-mono shadow-[0_8px_30px_rgba(0,0,0,0.35)] animate-drift-y ${className}`}
      style={{ animationDelay: delay }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: dot, boxShadow: `0 0 10px ${dot}` }}
      />
      <span className="text-foreground/85">{label}</span>
    </div>
  );
}

function StatCard({
  Icon,
  value,
  suffix,
  label,
  delay,
}: {
  Icon: typeof Zap;
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);
  const [seen, setSeen] = useState(false);

  // Count up once when scrolled into view
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !seen) {
          setSeen(true);
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [seen]);

  useEffect(() => {
    if (!seen) return;
    const start = performance.now() + delay * 1000;
    const duration = 1100;
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start) / duration));
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, value, delay]);

  return (
    <div
      ref={ref}
      className="group relative p-3 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-blue-500/30 hover:bg-blue-500/[0.05] transition-all duration-500 hover:scale-[1.04]"
    >
      <Icon className="w-5 h-5 text-blue-400 mx-auto mb-2 opacity-70 group-hover:opacity-100 transition-opacity" />
      <div className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-blue-300 via-cyan-300 to-amber-300 bg-clip-text text-transparent mb-1 tabular-nums">
        {n}
        {suffix}
      </div>
      <div className="text-[10px] sm:text-xs text-foreground/55">{label}</div>
    </div>
  );
}
