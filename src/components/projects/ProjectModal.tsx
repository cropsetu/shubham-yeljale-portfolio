import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { ArrowUpRight, Github, X } from "lucide-react";
import type { Project } from "@/lib/projects";

type Props = {
  project: Project | null;
  onClose: () => void;
  onNext: () => void;
};

export function ProjectModal({ project, onClose, onNext }: Props) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key={project.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] overflow-y-auto bg-background"
        >
          <button
            onClick={onClose}
            data-cursor="close"
            className="fixed right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface/80 text-foreground backdrop-blur hover:bg-surface"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <motion.div
            layoutId={`project-cover-${project.id}`}
            className="relative h-[70vh] w-full overflow-hidden"
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={project.coverImage}
              alt={project.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <div className="container-edge absolute inset-x-0 bottom-12">
              <div className="mb-4 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <span>{project.year}</span>
                <span className="h-px w-6 bg-border" />
                <span>{project.role}</span>
              </div>
              <h2 className="font-display text-[clamp(48px,9vw,144px)] leading-[0.92] text-foreground">
                {project.title}
              </h2>
            </div>
          </motion.div>

          <div className="container-edge py-20">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
              <div className="md:col-span-4">
                <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  · Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] text-foreground/80"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-12 flex flex-col gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="open"
                      className="inline-flex items-center justify-between gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform hover:translate-y-[-2px]"
                    >
                      View live <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="open"
                      className="inline-flex items-center justify-between gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-[var(--accent)]"
                    >
                      View source <Github className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>

              <div className="space-y-8 md:col-span-8">
                <div>
                  <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    · The brief
                  </p>
                  <p className="text-2xl leading-[1.4] text-foreground md:text-3xl">
                    {project.shortDescription}
                  </p>
                </div>
                {project.longDescription && (
                  <div>
                    <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      · What we built
                    </p>
                    <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                      {project.longDescription}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-24 flex flex-col items-start justify-between gap-6 border-t border-border pt-12 md:flex-row md:items-center">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Up next
              </p>
              <button
                onClick={onNext}
                data-cursor="next"
                className="group inline-flex items-center gap-3 font-display text-3xl text-foreground hover:text-[var(--accent-cyan)] md:text-5xl"
              >
                Next project
                <ArrowUpRight className="h-6 w-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
