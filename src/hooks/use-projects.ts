import { useCallback, useEffect, useState } from "react";
import { loadProjects, type Project, saveProjects, sortProjects } from "@/lib/projects";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProjects(loadProjects());
    setHydrated(true);
  }, []);

  const persist = useCallback((next: Project[]) => {
    saveProjects(next);
    setProjects(next);
  }, []);

  const upsert = useCallback(
    (project: Project) => {
      setProjects((prev) => {
        const exists = prev.some((p) => p.id === project.id);
        const next = exists
          ? prev.map((p) => (p.id === project.id ? project : p))
          : [project, ...prev];
        saveProjects(next);
        return next;
      });
    },
    [],
  );

  const remove = useCallback((id: string) => {
    setProjects((prev) => {
      const next = prev.filter((p) => p.id !== id);
      saveProjects(next);
      return next;
    });
  }, []);

  return {
    projects: sortProjects(projects),
    rawProjects: projects,
    hydrated,
    setProjects: persist,
    upsert,
    remove,
  };
}
