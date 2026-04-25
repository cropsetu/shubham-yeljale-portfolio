import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function MagneticCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 25, stiffness: 300, mass: 0.4 });
  const sy = useSpring(y, { damping: 25, stiffness: 300, mass: 0.4 });

  const [label, setLabel] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest<HTMLElement>("[data-cursor]");
      if (interactive) {
        setLabel(interactive.dataset.cursor || null);
        setHovering(true);
      } else {
        setLabel(null);
        setHovering(false);
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      ref={ref}
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:flex"
    >
      <motion.div
        animate={{
          width: hovering ? 72 : 14,
          height: hovering ? 72 : 14,
          backgroundColor: hovering ? "rgba(255,255,255,0.0)" : "rgba(245,245,247,0.9)",
        }}
        transition={{ type: "spring", damping: 20, stiffness: 250 }}
        className="flex items-center justify-center rounded-full"
        style={{
          boxShadow: hovering
            ? "0 0 0 1.5px rgba(245,245,247,0.85)"
            : "0 0 16px rgba(124,92,255,0.4)",
          mixBlendMode: hovering ? "normal" : "difference",
        }}
      >
        {label ? (
          <span className="font-mono text-[10px] uppercase tracking-widest text-foreground">
            {label}
          </span>
        ) : null}
      </motion.div>
    </motion.div>
  );
}
