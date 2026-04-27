// Postbuild step: pack dist/ into Vercel's Build Output API v3 layout.
// Result: `.vercel/output/` containing static client assets + an SSR
// serverless function that calls dist/server/server.js's Web fetch handler.
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(process.cwd());
const dist = join(root, "dist");
const clientDir = join(dist, "client");
const serverDir = join(dist, "server");

if (!existsSync(clientDir) || !existsSync(serverDir)) {
  console.error(
    "[vercel-build] dist/client or dist/server missing — run `vite build` first."
  );
  process.exit(1);
}

const outRoot = join(root, ".vercel", "output");
const outStatic = join(outRoot, "static");
const fnDir = join(outRoot, "functions", "index.func");

rmSync(outRoot, { recursive: true, force: true });
mkdirSync(outRoot, { recursive: true });
mkdirSync(outStatic, { recursive: true });
mkdirSync(fnDir, { recursive: true });

// 1. Copy client assets to static dir
cpSync(clientDir, outStatic, { recursive: true });

// 2. Copy entire dist/server (function code) into the function dir
cpSync(serverDir, fnDir, { recursive: true });

// 3. Function entry — wraps the Web fetch handler the SSR build exposes
writeFileSync(
  join(fnDir, "index.mjs"),
  `import server from "./server.js";
export default async function handler(request) {
  return server.fetch(request);
}
`
);

// 4. Function config — Node 22 + Web Standards launcher
writeFileSync(
  join(fnDir, ".vc-config.json"),
  JSON.stringify(
    {
      runtime: "nodejs22.x",
      handler: "index.mjs",
      launcherType: "Nodejs",
      shouldAddHelpers: false,
      supportsResponseStreaming: true,
      experimentalResponseStreaming: true,
    },
    null,
    2
  )
);

// 5. Function package.json so it loads as ESM
writeFileSync(
  join(fnDir, "package.json"),
  JSON.stringify({ type: "module" }, null, 2)
);

// 6. Top-level routing config
writeFileSync(
  join(outRoot, "config.json"),
  JSON.stringify(
    {
      version: 3,
      routes: [
        // Static asset cache headers
        {
          src: "^/assets/(.*)$",
          headers: { "cache-control": "public, max-age=31536000, immutable" },
          continue: true,
        },
        // Anything that exists in /static is served directly (built-in)
        { handle: "filesystem" },
        // Everything else → the SSR function
        { src: "/(.*)", dest: "/index" },
      ],
      overrides: {},
    },
    null,
    2
  )
);

console.log("[vercel-build] .vercel/output ready ✓");
