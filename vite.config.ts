import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Manual plugin chain (replaces the @lovable.dev wrapper which baked in
// Cloudflare). Produces a Node-compatible SSR build that Vercel wraps in
// a serverless function via scripts/vercel-build.mjs.
//
// `command` is "serve" during `vite dev` and "build" during `vite build`.
// Only enable `ssr.noExternal: true` at *build* time. It inlines every dep
// into the SSR bundle so server.js is self-contained inside Vercel's
// serverless function. In dev, that flag forces CJS-only packages through
// Vite's ESM module-runner, which crashes with
// "ReferenceError: module is not defined" — so dev keeps deps external
// and lets Node resolve them normally.
export default defineConfig(({ command }) => ({
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
  ssr: {
    noExternal: command === "build" ? true : undefined,
  },
  server: {
    port: 8080,
    host: true,
    strictPort: false,
  },
}));
