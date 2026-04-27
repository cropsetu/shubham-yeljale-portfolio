import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDown, Sparkles } from "lucide-react";

const codeSnippets = [
  `// AI agent — autonomous coding\nconst agent = new LLM({ model: "gpt-4o" });\nawait agent.deploy({\n  task: "scale-to-zero",\n  region: "edge"\n});`,
  `// React Server Component\nexport default async function Page() {\n  const data = await fetch(api);\n  return <Stream data={data} />;\n}`,
  `# Train neural net\nimport torch.nn as nn\nclass Vision(nn.Module):\n    def forward(self, x):\n        return self.attn(x)`,
  `// React Native screen\nexport function Home() {\n  return (\n    <View style={s.galaxy}>\n      <FlatList data={feed}/>\n    </View>\n  );\n}`,
];

function Typewriter({ text }: { text: string }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    setShown("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 18);
    return () => clearInterval(id);
  }, [text]);
  return (
    <pre className="font-mono text-[11px] leading-relaxed text-primary-glow whitespace-pre-wrap">
      {shown}
      <span className="animate-blink text-accent-glow">▊</span>
    </pre>
  );
}

function FloatingCode({
  delay,
  className,
  snippet,
  filename,
}: {
  delay: number;
  className: string;
  snippet: string;
  filename: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 1.2 }}
      className={`absolute hidden lg:block w-72 rounded-xl glass-strong p-4 animate-float ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="mb-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="h-2 w-2 rounded-full bg-primary-glow" />
          <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
        </div>
        <span className="ml-auto font-mono text-[10px] text-muted-foreground">{filename}</span>
      </div>
      <Typewriter text={snippet} />
    </motion.div>
  );
}

export function Hero() {
  const [snippetIdx, setSnippetIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSnippetIdx((i) => (i + 1) % codeSnippets.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-28 pb-16 md:pt-32"
    >
      <FloatingCode
        delay={1.2}
        className="left-[5%] top-[18%]"
        snippet={codeSnippets[snippetIdx]}
        filename="ai_agent.ts"
      />
      <FloatingCode
        delay={1.8}
        className="right-[5%] top-[28%]"
        snippet={codeSnippets[(snippetIdx + 1) % codeSnippets.length]}
        filename="page.tsx"
      />
      <FloatingCode
        delay={2.4}
        className="left-[8%] bottom-[15%]"
        snippet={codeSnippets[(snippetIdx + 2) % codeSnippets.length]}
        filename="model.py"
      />

      <div className="relative z-10 max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium"
        >
          <Sparkles className="h-3.5 w-3.5 text-accent-glow" />
          <span className="text-muted-foreground">
            Open for full-stack & freelance · 2026
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-display text-[44px] leading-[1] sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter"
        >
          <span className="block text-foreground text-shadow-glow">Shubham Yeljale</span>
          <span className="block mt-2 text-gradient animate-gradient bg-[length:200%_auto]">
            Building the future
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mx-auto mt-8 max-w-2xl text-base md:text-lg text-muted-foreground"
        >
          Full-Stack <span className="text-foreground">·</span> Web{" "}
          <span className="text-foreground">·</span> Mobile <span className="text-foreground">·</span>{" "}
          AI.
          <br className="hidden md:block" />
          I build production websites and mobile apps end-to-end — from database to pixel — with
          a love for motion design and clean APIs.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group relative overflow-hidden rounded-full bg-neon px-8 py-3.5 font-medium text-primary-foreground glow-magenta hover:scale-105 transition-transform"
          >
            <span className="relative z-10">Explore My Work →</span>
          </a>
          <a
            href="#contact"
            className="rounded-full glass px-8 py-3.5 font-medium text-foreground hover:bg-secondary/50 transition-colors"
          >
            Let&apos;s Talk
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-16 grid grid-cols-3 gap-3 md:gap-4 max-w-xl mx-auto"
        >
          {[
            { v: "3+", l: "Years" },
            { v: "10+", l: "Projects" },
            { v: "10+", l: "Clients" },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl glass px-3 py-3 md:px-4">
              <div className="font-display text-xl md:text-2xl font-bold text-gradient">{s.v}</div>
              <div className="text-[10px] md:text-[11px] uppercase tracking-wider text-muted-foreground mt-0.5">
                {s.l}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </motion.a>
    </section>
  );
}
