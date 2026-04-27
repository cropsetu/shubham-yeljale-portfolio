import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Star,
  Clock,
  Zap,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";

const PHONE = "9970014674";
const WHATSAPP = `https://wa.me/91${PHONE}?text=Hi%20Shubham%2C%20I%27d%20like%20a%20free%20mockup%20for%20my%20project.`;

export function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Mouse-tracked blob parallax (verelios pattern)
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12"
    >
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
            transform: "translate(calc(var(--mx, 0) * -0.015px), calc(var(--my, 0) * 0.015px))",
            transition: "transform 0.4s ease-out",
            animationDelay: "1.5s",
          }}
        />
        <div
          className="absolute bottom-10 left-1/3 w-72 md:w-96 h-72 md:h-96 rounded-full mix-blend-screen blur-3xl opacity-30 animate-pulse-glow"
          style={{
            background:
              "radial-gradient(circle, hsl(280 80% 60% / 0.45) 0%, transparent 70%)",
            transform: "translate(calc(var(--mx, 0) * 0.01px), calc(var(--my, 0) * -0.01px))",
            transition: "transform 0.4s ease-out",
            animationDelay: "3s",
          }}
        />

        {/* decorative SVG — floating sparkles & code brackets */}
        <svg
          aria-hidden
          className="absolute top-32 left-8 hidden md:block opacity-40 animate-float"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
        >
          <path
            d="M16 12L8 24l8 12M32 12l8 12-8 12"
            stroke="hsl(var(--gold))"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          aria-hidden
          className="absolute bottom-40 right-12 hidden md:block opacity-50 animate-float"
          style={{ animationDelay: "2s" }}
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
        >
          <path
            d="M18 2L21 15L34 18L21 21L18 34L15 21L2 18L15 15Z"
            fill="hsl(var(--gold))"
            fillOpacity="0.7"
          />
        </svg>
        <svg
          aria-hidden
          className="absolute top-1/2 right-1/4 hidden lg:block opacity-30 animate-float"
          style={{ animationDelay: "4s" }}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle cx="12" cy="12" r="6" fill="hsl(190 100% 55%)" fillOpacity="0.6" />
          <circle cx="12" cy="12" r="11" stroke="hsl(190 100% 55%)" strokeOpacity="0.4" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center"
        >
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full glass border border-amber-300/30 text-amber-100 text-xs sm:text-sm font-medium mb-8 backdrop-blur-sm shadow-[0_0_30px_rgba(251,191,36,0.15)]">
            <span className="relative flex items-center justify-center">
              <span className="absolute w-5 h-5 rounded-full bg-emerald-400/30 animate-ping" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </span>
            <span>10+ projects shipped · Pune-based, working worldwide</span>
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
          <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-[1.05] tracking-tight">
            Beautiful{" "}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              websites &amp; apps
            </span>
            <br />
            shipped in weeks, not months.
          </h1>

          {/* Subhead */}
          <p className="text-base sm:text-lg lg:text-xl text-foreground/75 mb-10 max-w-3xl mx-auto leading-relaxed">
            I&apos;m Shubham — a full-stack developer in Pune turning ideas into
            production-ready{" "}
            <span className="text-blue-300 font-semibold">websites</span>,{" "}
            <span className="text-cyan-300 font-semibold">mobile apps</span> and{" "}
            <span className="bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent font-semibold">
              AI tools
            </span>
            .
            <br className="hidden sm:block" />
            Free mockup in 48 hours. Pay only when each milestone ships.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center text-base sm:text-lg px-7 sm:px-10 py-3.5 sm:py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold rounded-xl shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_50px_rgba(59,130,246,0.6)] transition-all duration-300 hover:scale-105 overflow-hidden w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center">
                Get Your Free Mockup
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
              className="inline-flex items-center justify-center text-base sm:text-lg px-7 sm:px-8 py-3.5 sm:py-4 border-2 border-emerald-500/50 bg-emerald-500/10 hover:bg-emerald-500/20 hover:border-emerald-400/70 text-foreground font-medium rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:shadow-[0_0_35px_rgba(16,185,129,0.3)] transition-all duration-300 w-full sm:w-auto"
            >
              <MessageCircle className="mr-2 w-5 h-5 text-emerald-400" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Urgency */}
          <p className="text-xs text-foreground/55 mb-12 sm:mb-14 flex items-center justify-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            Limited slots — currently accepting only 3 new projects this month
          </p>

          {/* Stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 max-w-3xl mx-auto">
            {[
              { Icon: Zap, value: "10+", label: "Projects Delivered" },
              { Icon: Star, value: "10+", label: "Happy Clients" },
              { Icon: Clock, value: "<3 wk", label: "Avg. Delivery" },
              { Icon: CheckCircle2, value: "48 hr", label: "Free Mockup" },
            ].map((s) => (
              <div
                key={s.label}
                className="group relative p-3 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-blue-500/30 hover:bg-blue-500/[0.05] transition-all duration-500 hover:scale-105"
              >
                <s.Icon className="w-5 h-5 text-blue-400 mx-auto mb-2 opacity-70 group-hover:opacity-100 transition-opacity" />
                <div className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1 tabular-nums">
                  {s.value}
                </div>
                <div className="text-[10px] sm:text-sm text-foreground/55">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
