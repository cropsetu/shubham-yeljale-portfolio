import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone, MessageCircle, Send, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const NAME = "Shubham Yeljale";
const EMAIL = "shubhamyeljalebcs@gmail.com";
const PHONE = "9970014674";
const WHATSAPP = `https://wa.me/91${PHONE}`;
const PHONE_HREF = `tel:+91${PHONE}`;
const LINKEDIN = "https://www.linkedin.com/in/shubham-yeljale-13191b174/";
const GITHUB = "https://github.com/cropsetu";

const SERVICES = [
  "Website (full-stack)",
  "Mobile App (iOS / Android / React Native)",
  "AI / Chatbot integration",
  "Landing page + SEO",
  "E-commerce store",
  "Custom web app / SaaS",
  "Other / I'll explain in the message",
];

const BUDGETS = [
  "Under ₹25k",
  "₹25k – ₹75k",
  "₹75k – ₹2L",
  "₹2L – ₹5L",
  "₹5L+",
  "Not sure yet",
];

const TIMELINES = ["ASAP", "Within 1 month", "1–3 months", "3–6 months", "Just exploring"];

// FormSubmit endpoint — no signup, no API key. The first time anyone submits
// this form, FormSubmit emails the OWNER (Shubham) a one-click verification
// link. After clicking it, every subsequent submission auto-arrives in the
// inbox with no further setup. Free, unlimited.
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${EMAIL}`;

// File path kept (ContactCream) so existing imports keep working — content fully cosmic.
export function ContactCream() {
  const [loading, setLoading] = useState(false);

  const buildMailto = (
    fromName: string,
    fromEmail: string,
    fromPhone: string,
    service: string,
    budget: string,
    timeline: string,
    message: string
  ) => {
    const subject = encodeURIComponent(
      `New project enquiry — ${service || "general"} from ${fromName || "your site"}`
    );
    const body = encodeURIComponent(
      [
        "Hi Shubham,",
        "",
        `I'd like to discuss a ${service || "project"}.`,
        "",
        "----- Project details -----",
        `Service:   ${service || "—"}`,
        `Budget:    ${budget || "—"}`,
        `Timeline:  ${timeline || "—"}`,
        "",
        "----- Message -----",
        message || "—",
        "",
        "----- Contact -----",
        `Name:      ${fromName || "—"}`,
        `Email:     ${fromEmail || "—"}`,
        `Phone:     ${fromPhone || "—"}`,
      ].join("\n")
    );
    return `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const fromName = String(data.get("name") ?? "").trim();
    const fromEmail = String(data.get("email") ?? "").trim();
    const fromPhone = String(data.get("phone") ?? "").trim();
    const service = String(data.get("service") ?? "").trim();
    const budget = String(data.get("budget") ?? "").trim();
    const timeline = String(data.get("timeline") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const payload = {
      // FormSubmit-specific: nicer subject, plain-text template, captcha off
      _subject: `New enquiry · ${service || "general"} · ${fromName || "site visitor"}`,
      _template: "table",
      _captcha: "false",
      // Actual form fields (these become the email body rows)
      Name: fromName,
      Email: fromEmail,
      Phone: fromPhone || "—",
      Service: service || "—",
      Budget: budget || "—",
      Timeline: timeline || "—",
      Message: message,
    };

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && (json.success === "true" || json.success === true)) {
        toast.success("Inquiry sent ✦", {
          description: `Thanks ${fromName || "there"} — I'll reply within 24 hours.`,
        });
        form.reset();
      } else {
        // Likely the verify-email step — fall back to mailto so they still reach me.
        window.location.href = buildMailto(
          fromName,
          fromEmail,
          fromPhone,
          service,
          budget,
          timeline,
          message
        );
        toast.message("Opening your email app as a backup", {
          description: "If nothing opens, ping me on WhatsApp +91 " + PHONE,
        });
      }
    } catch {
      window.location.href = buildMailto(
        fromName,
        fromEmail,
        fromPhone,
        service,
        budget,
        timeline,
        message
      );
      toast.message("Network hiccup — opened email app as fallback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-20 items-start">
          {/* LEFT — contact details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-glow mb-4">
              // make_contact
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold leading-tight mb-6">
              Let&apos;s build <span className="text-gradient">something cosmic.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
              Got an ambitious idea, a stalled project, or just want to talk full-stack & AI?
              Drop me an enquiry — I usually reply within 24 hours.
            </p>

            <div className="space-y-3 mb-8">
              <a
                href={`mailto:${EMAIL}`}
                className="group flex items-center gap-3 rounded-2xl glass px-4 py-3 hover:bg-secondary/40 transition-colors"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-neon glow-magenta">
                  <Mail className="h-5 w-5 text-primary-foreground" />
                </span>
                <div className="min-w-0">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                    Email
                  </div>
                  <div className="font-display text-base md:text-lg truncate group-hover:text-accent-glow transition-colors">
                    {EMAIL}
                  </div>
                </div>
              </a>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={PHONE_HREF}
                  className="group flex items-center gap-3 rounded-2xl glass px-4 py-3 hover:bg-secondary/40 transition-colors"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-neon glow-blue">
                    <Phone className="h-5 w-5 text-primary-foreground" />
                  </span>
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                      Call
                    </div>
                    <div className="font-display text-base md:text-lg group-hover:text-accent-glow transition-colors">
                      +91 {PHONE}
                    </div>
                  </div>
                </a>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 rounded-2xl glass px-4 py-3 hover:bg-secondary/40 transition-colors"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#25D366] to-[#128C7E]">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </span>
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                      WhatsApp
                    </div>
                    <div className="font-display text-base md:text-lg group-hover:text-accent-glow transition-colors">
                      Chat now
                    </div>
                  </div>
                </a>
              </div>

              <div className="flex items-center gap-3 rounded-2xl glass px-4 py-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary/60">
                  <MapPin className="h-5 w-5 text-accent-glow" />
                </span>
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                    Based in
                  </div>
                  <div className="font-display text-base md:text-lg">Pune, India</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              {[
                { Icon: Linkedin, href: LINKEDIN, label: "LinkedIn" },
                { Icon: Github, href: GITHUB, label: "GitHub" },
                { Icon: Mail, href: `mailto:${EMAIL}`, label: "Email" },
                { Icon: Phone, href: PHONE_HREF, label: "Call" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={label}
                  className="h-12 w-12 rounded-full glass flex items-center justify-center hover:bg-accent/20 hover:text-accent-glow transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — proper inquiry form */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="rounded-3xl glass-strong p-6 md:p-10 space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2"
                >
                  Name *
                </label>
                <input
                  id="contact-name"
                  required
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="w-full rounded-xl bg-background/40 border border-border focus:border-accent focus:ring-2 focus:ring-accent/30 px-4 py-3 outline-none transition-all"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2"
                >
                  Email *
                </label>
                <input
                  id="contact-email"
                  required
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="w-full rounded-xl bg-background/40 border border-border focus:border-accent focus:ring-2 focus:ring-accent/30 px-4 py-3 outline-none transition-all"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-phone"
                className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2"
              >
                Mobile / WhatsApp
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                className="w-full rounded-xl bg-background/40 border border-border focus:border-accent focus:ring-2 focus:ring-accent/30 px-4 py-3 outline-none transition-all"
                placeholder="+91 98XXXXXXXX"
              />
            </div>

            <div>
              <label
                htmlFor="contact-service"
                className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2"
              >
                What do you need? *
              </label>
              <select
                id="contact-service"
                required
                name="service"
                defaultValue=""
                className="w-full rounded-xl bg-background/40 border border-border focus:border-accent focus:ring-2 focus:ring-accent/30 px-4 py-3 outline-none transition-all"
              >
                <option value="" disabled className="bg-background">
                  Pick a service…
                </option>
                {SERVICES.map((s) => (
                  <option key={s} value={s} className="bg-background">
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="contact-budget"
                  className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2"
                >
                  Budget (optional)
                </label>
                <select
                  id="contact-budget"
                  name="budget"
                  defaultValue=""
                  className="w-full rounded-xl bg-background/40 border border-border focus:border-accent focus:ring-2 focus:ring-accent/30 px-4 py-3 outline-none transition-all"
                >
                  <option value="" className="bg-background">
                    —
                  </option>
                  {BUDGETS.map((b) => (
                    <option key={b} value={b} className="bg-background">
                      {b}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="contact-timeline"
                  className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2"
                >
                  Timeline (optional)
                </label>
                <select
                  id="contact-timeline"
                  name="timeline"
                  defaultValue=""
                  className="w-full rounded-xl bg-background/40 border border-border focus:border-accent focus:ring-2 focus:ring-accent/30 px-4 py-3 outline-none transition-all"
                >
                  <option value="" className="bg-background">
                    —
                  </option>
                  {TIMELINES.map((t) => (
                    <option key={t} value={t} className="bg-background">
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2"
              >
                Message *
              </label>
              <textarea
                id="contact-message"
                required
                name="message"
                rows={5}
                className="w-full rounded-xl bg-background/40 border border-border focus:border-accent focus:ring-2 focus:ring-accent/30 px-4 py-3 outline-none transition-all resize-none"
                placeholder="Tell me about your project — what are you trying to build?"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group w-full rounded-xl bg-neon px-6 py-3.5 font-medium text-primary-foreground glow-magenta hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? "Opening mail..." : "Send Inquiry"}
              <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-[11px] text-muted-foreground/70 text-center">
              Sends straight to <strong>{EMAIL}</strong> — no app needed. Prefer chat?{" "}
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-accent-glow"
              >
                WhatsApp me
              </a>
              .
            </p>
          </motion.form>
        </div>

        <footer className="mt-24 md:mt-32 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} {NAME} · Crafted in deep space.</div>
          <a href="#hero" className="hover:text-accent-glow transition-colors">
            Back to top ↑
          </a>
        </footer>
      </div>
    </section>
  );
}
