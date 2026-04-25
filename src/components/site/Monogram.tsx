import { motion, useReducedMotion } from "framer-motion";

export function Monogram({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.6, ease: "easeOut" as const },
    },
  };
  return (
    <svg
      viewBox="0 0 60 32"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="SY monogram"
    >
      <motion.path
        d="M 22 6 Q 8 6 8 13 Q 8 18 18 18 Q 28 18 28 23 Q 28 28 14 28"
        initial={reduce ? "visible" : "hidden"}
        animate="visible"
        variants={draw}
      />
      <motion.path
        d="M 34 6 L 42 16 L 50 6"
        initial={reduce ? "visible" : "hidden"}
        animate="visible"
        variants={draw}
      />
      <motion.path
        d="M 42 16 L 42 28"
        initial={reduce ? "visible" : "hidden"}
        animate="visible"
        variants={draw}
      />
    </svg>
  );
}
