# JahiratBazi Software Development — Cinematic Portfolio

A dark, motion-rich, single-page portfolio for Shubham Yeljale. Built to feel like an Awwwards winner: silky smooth scroll, magnetic cursor, word-by-word reveals, parallax project cards, and a fully working "Add Project" flow backed by localStorage.

---

## What gets built (full site, one ship)

### Hero
- Full-viewport, near-black background with subtle film-grain noise + radial vignette.
- Animated "SY" monogram (stroke-draw on first load).
- Massive headline "I build websites that feel alive." revealing word-by-word.
- Muted sub-headline + slow horizontal marquee strip ("Available for freelance · React · Next.js · Motion design · Full-stack · 2025–2026").
- Scroll indicator (thin animated line + label) that fades on scroll.

### About
- Split layout: bio on the left, sticky stat panel on the right with count-up numbers (30+ projects, 4+ years, 100% satisfaction) triggered on scroll.
- Horizontal scrolling skill ribbon with hover lift + glow pills (React, Next.js, TypeScript, Node, Tailwind, Framer Motion, GSAP, Three.js, Figma, Supabase, etc.).

### Selected Work (centerpiece)
- "Selected work" heading with live counter.
- Vertical stack of full-width ~80vh project cards: large thumbnail left, meta right (title, year, role, stack pills, description).
- Per card: parallax image shift, hover scale, magnetic "View live →" button, split-line title animation, cursor-follow border glow.
- Click card → fullscreen modal case study (hero, problem, build, gallery, live + GitHub buttons, "Next project" CTA) with shared-element image transition.
- Each card has hover-only three-dot menu → Edit / Delete (delete confirms).
- Dashed-border "Add project" card at end of list.
- Seeded with 3 projects: Lumen Studio, Drift Commerce, Pulse Analytics.

### Services
- 3-column grid (1-col mobile): Web development · Motion & interaction · UI engineering.
- Animated icon per card + "Learn more" link that scrolls/prefills contact.

### Process
- Scroll-jacked horizontal timeline pinned via GSAP ScrollTrigger: Discover → Design → Build → Launch.

### Testimonials
- Draggable horizontal slider, serif accent font for quotes, believable placeholder quotes.

### Contact / Footer
- Massive "Let's build something memorable." headline.
- Email link with click-to-copy + toast confirmation.
- Social links (GitHub, LinkedIn, X, Instagram) with icon-fill hover.
- Live "Pune, India · HH:MM IST" clock updating every second.
- Copyright row.

---

## Add Project (working end-to-end, localStorage)

Floating bottom-right action button (`+`, gradient on hover, "Add project" tooltip) opens a modal with:
- Title (required), short description (≤200 chars), long case-study description, year (defaults to current), role, tech stack (tag input, Enter to add pill), live URL (validated), GitHub URL (optional), cover image URL, Featured toggle.
- Zod validation, save to `localStorage` key `sy_projects`, success toast, new card animates into the list.
- Edit reopens modal pre-filled. Delete asks for confirmation. Featured projects appear first with a "Featured" badge.

---

## Motion & interaction system

- **Lenis** smooth scroll, `lerp: 0.08`.
- **GSAP + ScrollTrigger** for pinned timeline, parallax, and section reveals.
- **Framer Motion** for component transitions, modal shared-element morph, stagger, magnetic buttons.
- Custom **magnetic cursor** with contextual labels ("View", "Open", "Drag", "Copy"). Disabled on touch devices.
- Split-text reveals (word + char level, slight blur-to-clear) on every section heading.
- Stagger load order: monogram → headline words (50ms) → subhead → nav.
- Respects `prefers-reduced-motion: reduce` (motion downgrades to simple fades).
- Lazy-load images, careful `will-change`.

---

## Visual system

- Base `#0A0A0B`, surface `#111114`, border `rgba(255,255,255,0.08)`, text `#F5F5F7`, muted `#8A8A93`.
- Accent gradient `#7C5CFF → #22D3EE` only on hovers, CTAs, cursor. Warm `#FF7A59` for one section divider.
- Display font: Clash Display (variable, tight `-0.04em`, 80–160px desktop). Body: Inter. Mono: JetBrains Mono for meta.
- Mixed-case headings, never all caps. No emojis. No background gradients. Subtle film-grain overlay (~1–2%).

---

## Responsive & a11y

- Max width 1280px, 24px mobile padding / 64px desktop.
- Mobile: vertical stacks, hero headline 48–64px, reduced stagger.
- Touch: no magnetic cursor, standard tap states.
- Keyboard navigable, 2px gradient focus ring, semantic HTML, alt text everywhere, 4.5:1 contrast minimum.

---

## Technical notes

- Stack: TanStack Start (project default) + React + TS + Tailwind v4 + Framer Motion + GSAP/ScrollTrigger + Lenis + Lucide + shadcn/ui + Zod + Sonner toasts.
- New routes: `/` (home assembling all sections), `/work/$projectId` optional — v1 uses modal only to keep shared-element transition smooth.
- New deps to install: `framer-motion`, `gsap`, `lenis`, `zod` (already common), plus Google Fonts (Clash Display via Fontshare CDN, Inter, JetBrains Mono) loaded in `__root.tsx` head.
- File layout:
  - `src/routes/index.tsx` — page composition, replaces placeholder.
  - `src/components/site/` — `Hero`, `About`, `Work`, `Services`, `Process`, `Testimonials`, `Contact`, `MagneticCursor`, `GrainOverlay`, `SmoothScroll` (Lenis provider), `SplitReveal`, `MagneticButton`, `Marquee`, `Monogram`.
  - `src/components/projects/` — `ProjectCard`, `ProjectModal`, `AddProjectFab`, `ProjectFormDialog`, `useProjects` hook (localStorage CRUD with Zod schema).
  - `src/lib/projects.ts` — types, schema, seed data, storage helpers.
- SEO: route `head()` with title, description, og tags. No og:image at root.
- Performance: images lazy, ScrollTrigger cleaned up on unmount, Lenis RAF loop tied to component lifecycle, motion guarded by `useReducedMotion`.

---

## Build order

1. Foundations: install deps, fonts, color tokens in `styles.css`, Lenis provider, grain overlay, magnetic cursor, shared primitives (SplitReveal, MagneticButton, Marquee).
2. Hero + Contact/Footer + Selected Work with full Add/Edit/Delete project flow (the "first-load priorities").
3. About, Services, Process (scroll-jacked timeline), Testimonials.
4. Polish pass: reduced-motion fallbacks, focus rings, mobile tuning, lighthouse check.