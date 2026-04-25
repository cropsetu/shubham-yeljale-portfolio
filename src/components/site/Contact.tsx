import { useEffect, useState } from "react";
import { Github, Linkedin, Instagram, Twitter, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { SplitReveal } from "./SplitReveal";
import { MagneticButton } from "./MagneticButton";

const EMAIL = "shubham@example.com";

function LiveClock() {
  const [time, setTime] = useState(() => formatTime(new Date()));
  useEffect(() => {
    const id = setInterval(() => setTime(formatTime(new Date())), 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{time}</span>;
}

function formatTime(d: Date) {
  const fmt = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  return `Pune, India · ${fmt.format(d)} IST`;
}

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
];

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      toast.success("Email copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy email");
    }
  };

  return (
    <footer id="contact" className="relative border-t border-border pt-32 md:pt-48">
      <div className="container-edge">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          · 06 / Contact
        </p>
        <SplitReveal
          as="h2"
          className="font-display text-[clamp(48px,11vw,176px)] leading-[0.92] text-foreground"
        >
          Let&apos;s build something memorable.
        </SplitReveal>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Email
            </p>
            <button
              onClick={copyEmail}
              data-cursor="copy"
              className="group mt-4 flex items-center gap-3 text-3xl text-foreground transition-colors hover:text-[var(--accent-cyan)] md:text-5xl"
            >
              <span className="font-display">{EMAIL}</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors group-hover:border-[var(--accent-cyan)] group-hover:text-[var(--accent-cyan)]">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </span>
            </button>

            <MagneticButton
              onClick={() => (window.location.href = `mailto:${EMAIL}`)}
              data-cursor="open"
              className="mt-10 border border-border bg-foreground text-background hover:bg-foreground/90"
            >
              Start a project →
            </MagneticButton>
          </div>

          <div className="md:justify-self-end">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Elsewhere
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="open"
                      className="group inline-flex items-center gap-3 text-foreground/80 transition-colors hover:text-foreground"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-all group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-base">{s.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-32 flex flex-col items-start justify-between gap-4 border-t border-border py-8 md:flex-row md:items-center">
          <LiveClock />
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Crafted with care by Shubham Yeljale, 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
