import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import path from "node:path";

// Manual plugin chain (replaces the @lovable.dev wrapper which baked in
// Cloudflare). This produces a Node-compatible SSR build that Vercel can
// wrap in a serverless function via api/index.ts.
export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
    dedupe: [
      "react",
      "react-dom",
      "@tanstack/react-router",
      "@tanstack/react-start",
    ],
  },
  // Inline ALL deps into the SSR bundle so the resulting server.js is
  // self-contained and works inside Vercel's serverless function (which
  // does NOT include node_modules at runtime).
  ssr: {
    noExternal: true,
  },
  server: {
    port: 8080,
    host: true,
    strictPort: false,
  },
});
