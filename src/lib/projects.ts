import { z } from "zod";

export const projectSchema = z.object({
  id: z.string(),
  title: z.string().trim().min(1, "Title is required").max(80),
  shortDescription: z.string().trim().min(1, "Short description required").max(200),
  longDescription: z.string().trim().max(2000).optional().or(z.literal("")),
  year: z.number().int().min(2000).max(2100),
  role: z.string().trim().min(1, "Role required").max(80),
  stack: z.array(z.string().trim().min(1)).min(1, "Add at least one tech"),
  liveUrl: z.string().trim().url("Must be a valid URL").or(z.literal("")),
  githubUrl: z
    .string()
    .trim()
    .url("Must be a valid URL")
    .or(z.literal(""))
    .optional(),
  coverImage: z.string().trim().url("Cover image must be a valid URL"),
  featured: z.boolean().default(false),
});

export type Project = z.infer<typeof projectSchema>;

export const STORAGE_KEY = "sy_projects";

export const seedProjects: Project[] = [
  {
    id: "lumen-studio",
    title: "Lumen Studio",
    shortDescription:
      "A creative agency site with a WebGL hero and scroll-driven case studies.",
    longDescription:
      "Lumen needed a digital storefront that felt as crafted as the work they ship. We rebuilt the site from the ground up with a WebGL hero, scroll-jacked case studies, and a CMS-driven publishing flow that lets the studio launch new work in minutes.",
    year: 2025,
    role: "Lead developer",
    stack: ["Next.js", "Three.js", "GSAP", "Sanity"],
    liveUrl: "https://example.com/lumen",
    githubUrl: "",
    coverImage:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&q=80&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "drift-commerce",
    title: "Drift Commerce",
    shortDescription:
      "A headless Shopify storefront with cinematic product pages and instant checkout.",
    longDescription:
      "Drift wanted to ditch their themed Shopify and ship a storefront that felt closer to a fashion editorial than a generic store. Built on Hydrogen with a custom design system, magnetic interactions, and view-transition product pages.",
    year: 2025,
    role: "Full-stack engineer",
    stack: ["Hydrogen", "Shopify", "Tailwind", "Framer Motion"],
    liveUrl: "https://example.com/drift",
    githubUrl: "https://github.com/example/drift",
    coverImage:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1600&q=80&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "pulse-analytics",
    title: "Pulse Analytics",
    shortDescription:
      "A real-time SaaS dashboard with live charts, alerts, and collaborative annotations.",
    longDescription:
      "Pulse helps growth teams see revenue moving in real-time. We designed and shipped the v1 dashboard, the data-streaming layer, and a flexible chart engine that handles millions of data points without dropping a frame.",
    year: 2024,
    role: "Product engineer",
    stack: ["React", "TypeScript", "Recharts", "Supabase", "WebSockets"],
    liveUrl: "https://example.com/pulse",
    githubUrl: "https://github.com/example/pulse",
    coverImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80&auto=format&fit=crop",
    featured: false,
  },
];

export function loadProjects(): Project[] {
  if (typeof window === "undefined") return seedProjects;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seedProjects));
      return seedProjects;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return seedProjects;
    return parsed
      .map((p) => {
        const r = projectSchema.safeParse(p);
        return r.success ? r.data : null;
      })
      .filter((p): p is Project => p !== null);
  } catch {
    return seedProjects;
  }
}

export function saveProjects(projects: Project[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return b.year - a.year;
  });
}
