import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const items = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export function NavPill() {
  const [active, setActive] = useState<string>("about");

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="pointer-events-auto fixed left-1/2 top-6 z-50 -translate-x-1/2">
      <ul className="glass-card flex items-center gap-1 rounded-full px-2 py-1.5 font-display text-sm font-bold uppercase tracking-wide">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => onClick(e, item.id)}
                data-cursor="view"
                className={`relative inline-flex items-center rounded-full px-5 py-2 transition-colors ${
                  isActive ? "text-white" : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="navpill-active"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "linear-gradient(135deg, #6a3cf4 0%, #d946ef 100%)",
                      boxShadow: "0 0 24px -6px rgba(217,70,239,0.55)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
