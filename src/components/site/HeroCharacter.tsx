import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HeroDeskScene } from "./HeroDeskScene";

// To showcase a polished 3D scene, paste a Spline community scene URL here.
// Get a public scene from https://app.spline.design/community ("Copy public link").
// If empty/blocked/unavailable the SVG desk-scene fallback renders instead.
const SPLINE_SCENE_URL = "";

export function HeroCharacter() {
  const reduce = useReducedMotion();
  const [iframeFailed, setIframeFailed] = useState(false);
  const showIframe = SPLINE_SCENE_URL && !iframeFailed;

  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="relative aspect-square w-full max-w-[640px]"
      data-cursor="hello"
    >
      {/* Holographic frame */}
      <div className="holo-border relative h-full w-full overflow-hidden rounded-[36px]">
        {/* Inner backdrop: soft cosmic gradient + scan-lines */}
        <div
          className="scan-lines absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(106,60,244,0.32) 0%, rgba(106,60,244,0) 60%)," +
              "radial-gradient(ellipse at 70% 80%, rgba(217,70,239,0.22) 0%, rgba(217,70,239,0) 60%)," +
              "linear-gradient(135deg, rgba(7,4,26,0.65) 0%, rgba(21,9,60,0.65) 100%)",
            backdropFilter: "blur(14px)",
          }}
        />

        {/* Content layer */}
        <div className="relative h-full w-full">
          {showIframe ? (
            <iframe
              src={SPLINE_SCENE_URL}
              loading="lazy"
              className="h-full w-full"
              style={{ border: 0, background: "transparent" }}
              onError={() => setIframeFailed(true)}
              allow="autoplay; fullscreen; xr-spatial-tracking"
              title="3D character scene"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center p-6">
              <HeroDeskScene />
            </div>
          )}
        </div>

        {/* Corner glyphs */}
        {(["tl", "tr", "bl", "br"] as const).map((c) => (
          <span
            key={c}
            aria-hidden
            className="pointer-events-none absolute h-3 w-3 border-cosmic-cyan"
            style={{
              borderColor: "#22d3ee",
              ...(c === "tl" && { top: 12, left: 12, borderTop: "2px solid", borderLeft: "2px solid" }),
              ...(c === "tr" && { top: 12, right: 12, borderTop: "2px solid", borderRight: "2px solid" }),
              ...(c === "bl" && { bottom: 12, left: 12, borderBottom: "2px solid", borderLeft: "2px solid" }),
              ...(c === "br" && { bottom: 12, right: 12, borderBottom: "2px solid", borderRight: "2px solid" }),
            }}
          />
        ))}
      </div>

      {/* Floating $ npm chip */}
      <motion.div
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="glass-card absolute -right-4 top-12 hidden rounded-2xl px-4 py-2 font-mono text-[16px] text-foreground md:block"
      >
        $ npm run dev
      </motion.div>

      {/* HUD chip bottom */}
      <motion.div
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="glass-card absolute -left-4 bottom-10 hidden items-center gap-2 rounded-2xl px-4 py-2 font-mono text-[16px] md:inline-flex"
      >
        <span className="h-2 w-2 rounded-full bg-[var(--cosmic-cyan)] shadow-[0_0_10px_var(--cosmic-cyan)]" />
        AVAILABLE FOR HIRE
      </motion.div>
    </motion.div>
  );
}
