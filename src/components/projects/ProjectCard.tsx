import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { MoreHorizontal, Pencil, Trash2, ArrowUpRight, Star } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

type Props = {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
};

export function ProjectCard({ project, index, onOpen, onEdit, onDelete }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="group relative grid grid-cols-1 gap-8 border-t border-border py-12 md:grid-cols-12 md:gap-10 md:py-20"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="absolute left-0 top-12 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground md:top-20">
        · {String(index + 1).padStart(2, "0")}
      </span>

      <button
        onClick={() => onOpen(project)}
        data-cursor="open"
        className="relative col-span-1 block aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-surface md:col-span-7"
        aria-label={`Open ${project.title} case study`}
      >
        <motion.img
          src={project.coverImage}
          alt={project.title}
          loading="lazy"
          style={{ y: imgY }}
          className={cn(
            "h-[115%] w-full object-cover transition-transform duration-700 ease-out",
            hovered && !reduce ? "scale-[1.04]" : "scale-100",
          )}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
        {project.featured && (
          <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-border bg-background/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground backdrop-blur">
            <Star className="h-3 w-3 fill-[var(--accent-cyan)] text-[var(--accent-cyan)]" />
            Featured
          </span>
        )}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-background"
        >
          View live <ArrowUpRight className="h-3.5 w-3.5" />
        </motion.span>
      </button>

      <div className="relative col-span-1 flex flex-col justify-between md:col-span-5 md:pl-4">
        <div className="absolute right-0 top-0 opacity-0 transition-opacity group-hover:opacity-100">
          <DropdownMenu>
            <DropdownMenuTrigger
              data-cursor="open"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-foreground/70 hover:text-foreground"
              aria-label="Project options"
            >
              <MoreHorizontal className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => onEdit(project)}>
                <Pencil className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setConfirmOpen(true)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div>
          <div className="mb-4 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span>{project.year}</span>
            <span className="h-px w-6 bg-border" />
            <span>{project.role}</span>
          </div>

          <h3 className="font-display text-[clamp(40px,5vw,72px)] leading-[0.95] text-foreground">
            <span className="block overflow-hidden">
              <motion.span
                animate={{ y: hovered && !reduce ? "-100%" : "0%" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                {project.title}
              </motion.span>
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: hovered && !reduce ? "0%" : "100%" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="accent-gradient-text block italic"
                aria-hidden
              >
                {project.title}
              </motion.span>
            </span>
          </h3>

          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            {project.shortDescription}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] text-foreground/80"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this project?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes &ldquo;{project.title}&rdquo; from your portfolio. You can&apos;t undo
              this.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onDelete(project);
                setConfirmOpen(false);
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.article>
  );
}
