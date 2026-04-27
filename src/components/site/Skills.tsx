import { motion } from "framer-motion";
import { Code2, Brain, Smartphone } from "lucide-react";

const stacks = [
  {
    icon: Code2,
    title: "Web / Full-Stack",
    color: "from-primary to-primary-glow",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "MongoDB",
      "Tailwind",
      "Vite",
      "Three.js",
    ],
  },
  {
    icon: Brain,
    title: "AI Engineering",
    color: "from-accent to-accent-glow",
    items: [
      "OpenAI",
      "LangChain",
      "RAG",
      "Vector DBs",
      "Hugging Face",
      "Whisper",
      "Embeddings",
      "Streaming",
      "Prompt design",
      "Agents",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile",
    color: "from-primary-glow to-accent",
    items: [
      "React Native",
      "Expo",
      "Native Modules",
      "Push",
      "Offline-first",
      "Animations",
      "App Store",
      "Play Store",
      "TestFlight",
      "OTA updates",
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32 px-4">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-glow mb-4">
            // tech_arsenal
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
            Three universes, <span className="text-gradient">one engineer.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {stacks.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="group relative rounded-3xl glass-strong p-6 md:p-8 hover:-translate-y-2 transition-transform duration-500"
            >
              <div
                className="absolute -inset-px rounded-3xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity blur-xl pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--primary)/0.4), hsl(var(--accent)/0.4))",
                }}
              />
              <div
                className={`relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color} mb-6 glow-soft`}
              >
                <s.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="relative font-display text-2xl font-bold mb-5">{s.title}</h3>
              <div className="relative flex flex-wrap gap-2">
                {s.items.map((it) => (
                  <span
                    key={it}
                    className="rounded-lg glass px-3 py-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {it}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
