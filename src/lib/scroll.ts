import { useEffect, useState, type RefObject } from "react";

export function useSectionProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const tick = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const traveled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      const p = total > 0 ? traveled / total : 0;
      setProgress(p);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ref]);

  return progress;
}
