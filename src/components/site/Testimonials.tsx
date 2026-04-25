import { useRef } from "react";
import { motion } from "framer-motion";
import { SplitReveal } from "./SplitReveal";

const quotes = [
  {
    quote:
      "Shubham is the rare engineer who treats motion like a first-class part of the product. Our launch felt like a film.",
    author: "Anika Rao",
    role: "Founder, Lumen Studio",
  },
  {
    quote:
      "He took our vague brief and shipped a storefront we&apos;re proud to send to clients. Conversion is up 38%.",
    author: "Marco Vidal",
    role: "Head of Growth, Drift",
  },
  {
    quote:
      "Pixel-perfect, fast, and on time. We&apos;ve worked with three agencies before — none of them came close.",
    author: "Sara Lim",
    role: "PM, Pulse Analytics",
  },
  {
    quote:
      "He genuinely cares. Every detail, every interaction. That&apos;s why we&apos;ve hired him three times.",
    author: "Daniel Ortiz",
    role: "Creative Director, North &amp; Co.",
  },
];

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section className="relative py-32 md:py-48">
      <div className="container-edge mb-16">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          · 05 / Kind words
        </p>
        <SplitReveal
          as="h2"
          className="font-display text-[clamp(40px,7vw,96px)] leading-[0.95] text-foreground"
        >
          What clients say.
        </SplitReveal>
      </div>

      <motion.div
        ref={ref}
        className="flex cursor-grab gap-6 overflow-x-auto px-6 pb-8 active:cursor-grabbing md:px-16 hide-scrollbar"
        drag="x"
        dragConstraints={{ left: -1200, right: 0 }}
        data-cursor="drag"
      >
        {quotes.map((q, i) => (
          <article
            key={i}
            className="flex w-[85vw] shrink-0 flex-col justify-between rounded-3xl border border-border bg-surface p-10 md:w-[520px]"
          >
            <p
              className="font-serif text-3xl leading-[1.2] text-foreground md:text-4xl"
              dangerouslySetInnerHTML={{ __html: `&ldquo;${q.quote}&rdquo;` }}
            />
            <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-foreground">
                  {q.author}
                </p>
                <p
                  className="mt-1 font-mono text-xs text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: q.role }}
                />
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                0{i + 1}/0{quotes.length}
              </span>
            </div>
          </article>
        ))}
      </motion.div>
    </section>
  );
}
