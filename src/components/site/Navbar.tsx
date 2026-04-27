import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "Why Me" },
  { href: "#projects", label: "Portfolio" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2 md:py-3" : "py-4 md:py-6"
      }`}
    >
      <div className="mx-auto max-w-6xl px-3 md:px-4">
        <div
          className={`flex items-center justify-between rounded-full px-4 md:px-6 py-2.5 md:py-3 ${
            scrolled ? "glass-strong" : "glass"
          }`}
        >
          <a href="#hero" className="font-display text-base md:text-lg font-bold text-gradient">
            ◆ SHUBHAM
          </a>

          <div className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-primary to-accent transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden md:inline-flex rounded-full bg-neon px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity glow-magenta"
          >
            Hire Me
          </a>

          {/* Mobile burger */}
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full glass"
          >
            <span className="sr-only">menu</span>
            <div className="flex flex-col gap-1.5">
              <span
                className={`h-px w-5 bg-foreground transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-5 bg-foreground transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
              />
            </div>
          </button>
        </div>

        {/* Mobile drawer */}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
            className="md:hidden mt-2 rounded-2xl glass-strong p-4"
          >
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-1 rounded-full bg-neon px-4 py-2 text-center text-sm font-medium text-primary-foreground glow-magenta"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
