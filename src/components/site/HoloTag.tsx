import { motion } from "framer-motion";

type Props = {
  visible: boolean;
  side: "left" | "right";
  yPercent: number;
  children: React.ReactNode;
};

export function HoloTag({ visible, side, yPercent, children }: Props) {
  const isLeft = side === "left";
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -32 : 32 }}
      animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -32 : 32 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ top: `${yPercent}%` }}
      className={`pointer-events-none absolute z-10 hidden md:block ${
        isLeft ? "left-[6vw]" : "right-[6vw]"
      }`}
    >
      <div
        className={`relative max-w-xs rounded-2xl border border-[var(--holo)]/60 bg-[var(--navy-deep)]/60 p-4 font-mono text-[18px] leading-tight text-white backdrop-blur ${
          isLeft ? "rounded-tr-md" : "rounded-tl-md"
        }`}
        style={{ boxShadow: "0 0 24px -6px rgba(90,200,250,0.35)" }}
      >
        {children}
        {/* Connector dot toward figure */}
        <span
          className={`absolute top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-[var(--holo-bright)] shadow-[0_0_10px_var(--holo-bright)] ${
            isLeft ? "-right-3" : "-left-3"
          }`}
        />
        {/* Connector line */}
        <span
          className={`absolute top-1/2 h-px w-[3vw] bg-[var(--holo)] ${
            isLeft ? "left-full" : "right-full"
          }`}
        />
      </div>
    </motion.div>
  );
}
