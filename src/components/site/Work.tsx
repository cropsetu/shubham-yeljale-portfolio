import { useState } from "react";
import { Plus } from "lucide-react";
import { useProjects } from "@/hooks/use-projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectModal } from "@/components/projects/ProjectModal";
import { ProjectFormDialog } from "@/components/projects/ProjectFormDialog";
import { AddProjectFab } from "@/components/projects/AddProjectFab";
import { SplitReveal } from "./SplitReveal";
import type { Project } from "@/lib/projects";
import { motion } from "framer-motion";

export function Work() {
  const { projects, hydrated, upsert, remove } = useProjects();
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);

  const openAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };
  const openEdit = (p: Project) => {
    setEditing(p);
    setFormOpen(true);
  };
  const goNext = () => {
    if (!openProject) return;
    const idx = projects.findIndex((p) => p.id === openProject.id);
    const next = projects[(idx + 1) % projects.length];
    setOpenProject(next);
  };

  return (
    <section id="work" className="relative py-32 md:py-48">
      <div className="container-edge">
        <div className="mb-16 flex items-end justify-between gap-8">
          <div>
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              · 02 / Selected work
            </p>
            <SplitReveal
              as="h2"
              className="font-display text-[clamp(40px,7vw,96px)] leading-[0.95] text-foreground"
            >
              Selected work.
            </SplitReveal>
          </div>
          <p className="hidden font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground md:block">
            {hydrated ? `${String(projects.length).padStart(2, "0")} projects` : "loading"}
          </p>
        </div>

        <div>
          {projects.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={i}
              onOpen={(proj) => setOpenProject(proj)}
              onEdit={openEdit}
              onDelete={(proj) => remove(proj.id)}
            />
          ))}

          <motion.button
            onClick={openAdd}
            data-cursor="add"
            whileHover={{ scale: 1.005 }}
            className="group mt-8 flex w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-surface/30 px-6 py-20 text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface transition-colors group-hover:bg-foreground group-hover:text-background">
              <Plus className="h-5 w-5" />
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.3em]">Add a project</span>
          </motion.button>
        </div>
      </div>

      <AddProjectFab onClick={openAdd} />

      <ProjectFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        initial={editing}
        onSubmit={upsert}
      />

      <ProjectModal
        project={openProject}
        onClose={() => setOpenProject(null)}
        onNext={goNext}
      />
    </section>
  );
}
