import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left bg-gradient-to-r from-primary via-accent to-primary-glow"
      style={{ scaleX }}
    />
  );
}
