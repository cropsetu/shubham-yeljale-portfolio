import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import type { Project } from "@/lib/projects";

type Props = { project: Project; index: number };

export function ProjectCosmicCard({ project, index }: Props) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 240, damping: 30, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 240, damping: 30, mass: 0.5 });
  const rotateX = useTransform(sy, [-1, 1], ["6deg", "-6deg"]);
  const rotateY = useTransform(sx, [-1, 1], ["-6deg", "6deg"]);
  const [imgOk, setImgOk] = useState(true);

  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(px * 2);
    my.set(py * 2);
  };
  const onMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.a
      href={project.liveUrl || "#"}
      target={project.liveUrl ? "_blank" : undefined}
      rel={project.liveUrl ? "noreferrer" : undefined}
      data-cursor="open"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.06 }}
      className="group relative block"
      style={{ perspective: 1200 }}
    >
      <motion.div
        className="holo-border glass-card scan-lines relative overflow-hidden rounded-3xl"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {/* Shimmer placeholder behind image */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(106,60,244,0.4) 0%, rgba(34,211,238,0.25) 50%, rgba(217,70,239,0.35) 100%)",
              backgroundSize: "200% 200%",
              animation: "holo-shimmer 6s ease-in-out infinite",
            }}
          />
          {imgOk ? (
            <img
              src={project.coverImage}
              alt={project.title}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setImgOk(false)}
              className="relative h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="relative grid h-full w-full place-items-center">
              <span className="font-display text-3xl text-white/80">{project.title}</span>
            </div>
          )}

          {/* Top scan-line overlay (subtle) */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(7,4,26,0) 60%, rgba(7,4,26,0.55) 100%)",
            }}
          />

          {/* Hover external chip */}
          <div className="pointer-events-none absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 font-mono text-[14px] text-white/90 opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
            Live
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>

        {/* Body */}
        <div className="relative p-5 md:p-6">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-2xl font-bold leading-tight text-white md:text-3xl">
              <span className="group-hover:holo-text transition-colors">{project.title}</span>
            </h3>
            <span className="font-mono text-[16px] text-cosmic-cyan/80">{project.year}</span>
          </div>
          <p className="mt-2 text-foreground/75">{project.shortDescription}</p>

          {/* Stack chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.slice(0, 5).map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[14px] text-foreground/70"
              >
                {s}
              </span>
            ))}
          </div>

          {/* Bottom row */}
          <div className="mt-5 flex items-center justify-between">
            <span className="font-mono text-[14px] uppercase tracking-wider text-cosmic-magenta/80">
              · {project.role}
            </span>
            <span className="inline-flex items-center gap-1 font-mono text-[14px] text-foreground/80 transition-colors group-hover:text-white">
              VIEW <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </motion.div>
    </motion.a>
  );
}
