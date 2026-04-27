import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { useEffect, useState } from "react";
import { useProjects } from "@/hooks/use-projects";
import type { Project } from "@/lib/projects";

function Card({
  p,
  featured = false,
  priority = false,
}: {
  p: Project;
  featured?: boolean;
  priority?: boolean;
}) {
  const [imgOk, setImgOk] = useState(true);
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7 }}
      className={`group relative overflow-hidden rounded-3xl glass-strong ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      {p.liveUrl && (
        <a
          href={p.liveUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${p.title}`}
          className="absolute inset-0 z-[2]"
        />
      )}

      <div
        className={`relative overflow-hidden ${
          featured ? "aspect-[2.4/1]" : "aspect-[16/10]"
        }`}
      >
        {/* gradient skeleton — visible until image paints */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            loaded ? "opacity-0" : "opacity-100"
          }`}
          style={{
            background:
              "linear-gradient(135deg, hsl(220 100% 60% / 0.25) 0%, hsl(280 70% 30% / 0.25) 50%, hsl(43 96% 56% / 0.20) 100%)",
            backgroundSize: "200% 200%",
            animation: "gradient-shift 3s ease infinite",
          }}
        />
        {/* shimmer overlay while loading */}
        {!loaded && (
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, hsl(0 0% 100% / 0.08) 50%, transparent 100%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.6s linear infinite",
            }}
          />
        )}
        {imgOk ? (
          <img
            src={p.coverImage}
            alt={`${p.title} preview`}
            loading={priority ? "eager" : "lazy"}
            // @ts-expect-error fetchpriority is valid HTML, supported by major browsers
            fetchpriority={priority ? "high" : "auto"}
            decoding="async"
            referrerPolicy="no-referrer"
            onLoad={() => setLoaded(true)}
            onError={() => setImgOk(false)}
            className={`relative h-full w-full object-cover object-top transition-all duration-[1.2s] group-hover:scale-110 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : (
          <div className="relative grid h-full w-full place-items-center">
            <span className="font-display text-3xl text-foreground/80">
              {p.title}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute top-3 left-3 md:top-4 md:left-4 rounded-full glass px-3 py-1 text-[10px] font-mono uppercase tracking-wider z-[3]">
          · {p.role}
        </div>
        <div className="absolute top-3 right-3 md:top-4 md:right-4 rounded-full glass px-3 py-1 text-[10px] font-mono z-[3]">
          {p.year}
        </div>
      </div>

      <div className="relative z-[3] p-5 md:p-8 pointer-events-none">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3
            className={`font-display font-bold ${featured ? "text-2xl md:text-3xl" : "text-xl"}`}
          >
            {p.title}
          </h3>
          <div className="flex gap-2 md:opacity-0 md:group-hover:opacity-100 md:transition-opacity pointer-events-auto">
            {p.githubUrl && (
              <a
                href={p.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Open GitHub"
                onClick={(e) => e.stopPropagation()}
                className="h-9 w-9 rounded-full glass flex items-center justify-center hover:text-accent-glow"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {p.liveUrl && (
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Open live site"
                onClick={(e) => e.stopPropagation()}
                className="h-9 w-9 rounded-full bg-neon flex items-center justify-center text-primary-foreground glow-magenta"
              >
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {p.shortDescription}
        </p>
        <div className="flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span
              key={s}
              className="rounded-md glass px-2.5 py-1 text-[10px] font-mono"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectsGrid() {
  const { projects, hydrated } = useProjects();

  // Preload every project screenshot as soon as the component mounts so they're
  // already in the browser cache by the time the user scrolls down.
  useEffect(() => {
    if (!hydrated) return;
    const imgs: HTMLImageElement[] = [];
    projects.forEach((p) => {
      const img = new Image();
      img.src = p.coverImage;
      imgs.push(img);
    });
    return () => {
      imgs.forEach((img) => (img.src = ""));
    };
  }, [hydrated, projects]);

  return (
    <section id="projects" className="relative py-24 md:py-32 px-4 overflow-hidden">
      {/* decorative SVG flourishes */}
      <svg
        aria-hidden
        className="absolute top-32 right-8 hidden md:block opacity-30 animate-float pointer-events-none"
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
      >
        <rect
          x="8"
          y="8"
          width="44"
          height="44"
          rx="8"
          stroke="hsl(var(--gold))"
          strokeWidth="2"
          strokeDasharray="4 4"
          transform="rotate(15 30 30)"
        />
      </svg>

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6 mb-12 md:mb-16"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-300 mb-4">
              // selected_work
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
              Recent{" "}
              <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                missions.
              </span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            A glimpse of products I&apos;ve designed, built and shipped — from
            solo experiments to sites used by thousands of customers.
          </p>
        </motion.div>

        {!hydrated ? (
          <div className="grid md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={`rounded-3xl glass-strong overflow-hidden ${
                  i === 0 ? "md:col-span-2" : ""
                }`}
              >
                <div
                  className={`relative ${i === 0 ? "aspect-[2.4/1]" : "aspect-[16/10]"}`}
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(220 100% 60% / 0.18), hsl(280 70% 30% / 0.18), hsl(43 96% 56% / 0.15))",
                    backgroundSize: "200% 200%",
                    animation: "gradient-shift 3s ease infinite",
                  }}
                />
                <div className="p-6 space-y-3">
                  <div className="h-5 w-1/3 rounded bg-white/5" />
                  <div className="h-3 w-2/3 rounded bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((p, i) => (
              <Card key={p.id} p={p} featured={i === 0} priority={i < 3} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
