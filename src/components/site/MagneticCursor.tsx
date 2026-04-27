import { useEffect, useState } from "react";

export function MagneticCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div
        className="pointer-events-none fixed z-[101] h-8 w-8 rounded-full mix-blend-screen transition-transform duration-100"
        style={{
          left: pos.x - 16,
          top: pos.y - 16,
          background: "radial-gradient(circle, hsl(320 100% 70% / 0.7), transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none fixed z-[101] h-2 w-2 rounded-full bg-accent-glow transition-transform"
        style={{ left: pos.x - 4, top: pos.y - 4 }}
      />
    </>
  );
}
