import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitReveal } from "./SplitReveal";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    n: "01",
    title: "Discover",
    body: "We start with a conversation. Goals, audience, what success actually looks like.",
  },
  {
    n: "02",
    title: "Design",
    body: "Direction, references, type, motion principles. The blueprint everyone aligns on.",
  },
  {
    n: "03",
    title: "Build",
    body: "Engineered in the open. Weekly previews, real components, no lorem ipsum.",
  },
  {
    n: "04",
    title: "Launch",
    body: "Performance budgets met, analytics wired, and a handover your team can keep shipping on.",
  },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const distance = track.scrollWidth - window.innerWidth + 128;
      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-32 md:py-48">
      <div className="container-edge mb-16">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          · 04 / Process
        </p>
        <SplitReveal
          as="h2"
          className="font-display text-[clamp(40px,7vw,96px)] leading-[0.95] text-foreground"
        >
          From first call to launch day.
        </SplitReveal>
      </div>

      <div ref={trackRef} className="flex gap-6 px-6 will-change-transform md:px-16">
        {steps.map((s) => (
          <article
            key={s.n}
            className="flex h-[60vh] w-[80vw] shrink-0 flex-col justify-between rounded-3xl border border-border bg-surface p-10 md:w-[40vw]"
          >
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              · {s.n}
            </span>
            <div>
              <h3 className="font-display text-5xl text-foreground md:text-7xl">{s.title}</h3>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
