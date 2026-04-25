import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  items: string[];
  className?: string;
  duration?: number;
  separator?: string;
};

export function Marquee({ items, className, duration = 40, separator = "·" }: Props) {
  const reduce = useReducedMotion();
  const content = (
    <div className="flex shrink-0 items-center gap-8 pr-8">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-8 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {it}
          <span className="text-[var(--accent-violet)]">{separator}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("flex w-full overflow-hidden", className)}>
      <motion.div
        className="flex"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {content}
        {content}
        {content}
        {content}
      </motion.div>
    </div>
  );
}
