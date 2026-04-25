import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { forwardRef, useRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  strength?: number;
};

export const MagneticButton = forwardRef<HTMLButtonElement, Props>(
  ({ children, className, strength = 0.35, ...rest }, _ref) => {
    const innerRef = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { damping: 18, stiffness: 220, mass: 0.4 });
    const sy = useSpring(y, { damping: 18, stiffness: 220, mass: 0.4 });
    const reduce = useReducedMotion();

    const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (reduce) return;
      const el = innerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      x.set((e.clientX - cx) * strength);
      y.set((e.clientY - cy) * strength);
    };
    const onLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <motion.button
        ref={(node) => {
          innerRef.current = node;
        }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ x: sx, y: sy }}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors",
          className,
        )}
        {...(rest as React.ComponentProps<typeof motion.button>)}
      >
        {children}
      </motion.button>
    );
  },
);
MagneticButton.displayName = "MagneticButton";
