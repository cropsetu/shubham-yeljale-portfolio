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

// Bumped each refactor so old localStorage seed data is refreshed.
export const STORAGE_KEY = "sy_projects_v3";

// Capture front page at desktop viewport, then crop to a clean hero ratio so the
// site name + headline are visible. wait/2 lets fonts/animations settle.
const thumb = (url: string) =>
  `https://image.thum.io/get/width/1600/crop/900/viewportWidth/1440/wait/2/${url}`;

export const seedProjects: Project[] = [
  {
    id: "yesitryme",
    title: "YesITryMe",
    shortDescription:
      "Marketing-rewards platform — earn coins for engagement, redeem perks, full-stack with auth, blog, and lead capture.",
    longDescription: "",
    year: 2026,
    role: "Full-stack developer",
    stack: ["React", "Node.js", "Tailwind", "MongoDB"],
    liveUrl: "https://www.yesitryme.com/",
    githubUrl: "",
    coverImage: thumb("https://www.yesitryme.com/"),
    featured: true,
  },
  {
    id: "jahiratbazi",
    title: "Jahiratbazi",
    shortDescription:
      "Digital-marketing agency site with services, case studies, and lead-generation funnels.",
    year: 2025,
    role: "Frontend lead",
    stack: ["React", "Vite", "Framer Motion", "Tailwind"],
    liveUrl: "https://jahiratbazi-fj9i.vercel.app/",
    coverImage: thumb("https://jahiratbazi-fj9i.vercel.app/"),
    featured: true,
  },
  {
    id: "smartro",
    title: "SmartRO",
    shortDescription:
      "RO water-purifier brand site — pure water, smart living. Built with cinematic hero, products and service booking.",
    year: 2025,
    role: "Full-stack developer",
    stack: ["React", "Tailwind", "Node.js"],
    liveUrl: "https://smart-ro-3fa9.vercel.app/",
    coverImage: thumb("https://smart-ro-3fa9.vercel.app/"),
    featured: true,
  },
  {
    id: "starsecurity",
    title: "Star Security & Bouncer",
    shortDescription:
      "Premium security guards & bouncer hire across Maharashtra — lead capture, services, deployment areas.",
    year: 2025,
    role: "Frontend developer",
    stack: ["React", "Tailwind", "Vercel"],
    liveUrl: "https://starbright-reborn.lovable.app/",
    coverImage: thumb("https://starbright-reborn.lovable.app/"),
    featured: false,
  },
  {
    id: "entomon",
    title: "Entomon Pest Solutions",
    shortDescription:
      "Pest-control services site for a Pune-based company — services, contact, booking flow.",
    year: 2025,
    role: "Frontend developer",
    stack: ["React", "Vite", "Tailwind"],
    liveUrl: "https://entomon-new-website.vercel.app/",
    coverImage: thumb("https://entomon-new-website.vercel.app/"),
    featured: false,
  },
  {
    id: "greenyogagro",
    title: "Greenyogagro",
    shortDescription:
      "Yoga & wellness brand site — cinematic hero, classes catalog, and lead capture for studio bookings.",
    year: 2025,
    role: "Frontend developer",
    stack: ["React", "Tailwind", "Framer Motion"],
    liveUrl: "https://greenyogagro.com/",
    coverImage: thumb("https://greenyogagro.com/"),
    featured: false,
  },
  {
    id: "artistly",
    title: "Artistly",
    shortDescription:
      "Performing-artist booking platform — discover, filter, and book performers for events.",
    year: 2025,
    role: "Full-stack developer",
    stack: ["React", "Next.js", "Tailwind", "API"],
    liveUrl: "https://artistly-lime.vercel.app/",
    coverImage: thumb("https://artistly-lime.vercel.app/"),
    featured: true,
  },
  {
    id: "chatbot-ai",
    title: "Chatbot AI",
    shortDescription:
      "Conversational AI chatbot built with React + an LLM backend — streaming responses, history, and tool use.",
    year: 2025,
    role: "Full-stack AI developer",
    stack: ["React", "Node.js", "OpenAI", "WebSockets"],
    liveUrl: "https://chat-bot-ai-v6fl.vercel.app/",
    coverImage: thumb("https://chat-bot-ai-v6fl.vercel.app/"),
    featured: true,
  },
  {
    id: "whiteboard",
    title: "Collaborative Whiteboard",
    shortDescription:
      "Real-time multi-user whiteboard — draw, sticky notes, shapes, presence, and shareable rooms.",
    year: 2025,
    role: "Full-stack developer",
    stack: ["React", "Vite", "Canvas", "WebSockets"],
    liveUrl: "https://whiteboard-collaborate-create.vercel.app/",
    coverImage: thumb("https://whiteboard-collaborate-create.vercel.app/"),
    featured: false,
  },
  {
    id: "starsecurity-prod",
    title: "Star Security (production)",
    shortDescription:
      "Production deployment of Star Security & Bouncer with custom domain and contact forms.",
    year: 2025,
    role: "Frontend developer",
    stack: ["React", "Tailwind"],
    liveUrl: "https://www.starsecuritybouncer.com/",
    coverImage: thumb("https://www.starsecuritybouncer.com/"),
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
