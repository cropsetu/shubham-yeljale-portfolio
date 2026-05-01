import { useEffect, useState } from "react";

/**
 * Self-contained "typing in a terminal" animation. A single string is typed
 * character-by-character, paused, deleted, and the next snippet is typed.
 * Looks like a developer is live-coding the brand's pitch.
 */

type Snippet = {
  lang: "ts" | "py" | "sh";
  filename: string;
  body: string;
};

const snippets: Snippet[] = [
  {
    lang: "ts",
    filename: "ship.ts",
    body: `// typingCodeAI — idea → live product
const idea  = "your business";
const stack = ["React", "Node", "AI"];

async function ship(idea: string) {
  const mockup  = await design(idea);  // 48 hours
  const product = await build(mockup); // 2-3 weeks
  return launch(product);              // pay on delivery
}

ship(idea); // ✦ shipping now…`,
  },
  {
    lang: "py",
    filename: "ai_assistant.py",
    body: `# Add an AI co-pilot to your product
from typingcode import build_agent

agent = build_agent(
    model="claude-opus",
    tools=["search", "checkout", "support"],
)

reply = agent.chat("Help me find a plan")
print(reply)  # ▍`,
  },
  {
    lang: "sh",
    filename: "deploy.sh",
    body: `$ git push origin main
$ vercel --prod

  ✓ Build completed in 28s
  ✓ Deploying to edge network…
  ✓ Live at  https://yourbrand.com

✨ Shipped.  Pay-on-delivery invoice sent.`,
  },
];

const TYPE_SPEED = 18;     // ms per character while typing
const DELETE_SPEED = 8;    // ms per character while erasing
const HOLD_FULL = 1700;    // pause after fully typed
const HOLD_EMPTY = 350;    // pause after fully erased

export function CodeTyper({ className = "" }: { className?: string }) {
  const [snipIdx, setSnipIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting" | "blank">(
    "typing",
  );

  const snippet = snippets[snipIdx];

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (typed.length < snippet.body.length) {
        timer = setTimeout(
          () => setTyped(snippet.body.slice(0, typed.length + 1)),
          TYPE_SPEED,
        );
      } else {
        timer = setTimeout(() => setPhase("holding"), 0);
      }
    } else if (phase === "holding") {
      timer = setTimeout(() => setPhase("deleting"), HOLD_FULL);
    } else if (phase === "deleting") {
      if (typed.length > 0) {
        timer = setTimeout(
          () => setTyped(snippet.body.slice(0, typed.length - 1)),
          DELETE_SPEED,
        );
      } else {
        timer = setTimeout(() => setPhase("blank"), 0);
      }
    } else if (phase === "blank") {
      timer = setTimeout(() => {
        setSnipIdx((i) => (i + 1) % snippets.length);
        setPhase("typing");
      }, HOLD_EMPTY);
    }

    return () => clearTimeout(timer);
  }, [phase, typed, snippet.body]);

  return (
    <div
      className={`relative rounded-2xl code-window scan-lines overflow-hidden ${className}`}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <div className="flex-1 text-center text-[11px] font-mono text-foreground/40 truncate">
          ~/typing-code-ai · {snippet.filename}
        </div>
        <span className="text-[10px] font-mono text-foreground/30 uppercase">
          {snippet.lang}
        </span>
      </div>

      {/* Code body */}
      <pre className="relative px-5 py-4 text-[12px] sm:text-[13px] leading-relaxed text-foreground/80 min-h-[260px] sm:min-h-[280px]">
        <Highlighted text={typed} lang={snippet.lang} />
        <span className="inline-block w-[7px] h-[1em] -mb-[3px] bg-cyan-300 align-baseline animate-blink" />
      </pre>
    </div>
  );
}

/* Tiny token-coloriser — no full parser, just enough to feel real. */
function Highlighted({ text, lang }: { text: string; lang: Snippet["lang"] }) {
  const lines = text.split("\n");
  return (
    <code className="block">
      {lines.map((line, i) => (
        <div key={i} className="whitespace-pre">
          <span className="select-none mr-3 text-foreground/25 tabular-nums">
            {String(i + 1).padStart(2, "0")}
          </span>
          {colorize(line, lang)}
        </div>
      ))}
    </code>
  );
}

function colorize(line: string, lang: Snippet["lang"]) {
  // comment lines (and shell prompts handled separately)
  if (lang === "sh" && line.startsWith("$")) {
    return (
      <>
        <span className="text-emerald-400">$</span>
        <span className="text-foreground/85">{line.slice(1)}</span>
      </>
    );
  }
  if (lang === "sh" && /^\s*✓/.test(line)) {
    return <span className="text-emerald-300">{line}</span>;
  }
  if (
    (lang === "ts" && line.trim().startsWith("//")) ||
    (lang === "py" && line.trim().startsWith("#"))
  ) {
    return <span className="text-foreground/40 italic">{line}</span>;
  }

  const tokens: Array<{ text: string; cls: string }> = [];
  const keywordsTs = [
    "const", "let", "var", "function", "async", "await", "return", "import", "from",
    "export", "if", "else",
  ];
  const keywordsPy = ["from", "import", "def", "return", "print"];
  const keywords = lang === "py" ? keywordsPy : keywordsTs;

  // Regex covers strings, numbers, keywords, identifiers, punctuation
  const re = /("[^"]*"|'[^']*'|`[^`]*`)|(\d+)|([a-zA-Z_][a-zA-Z0-9_]*)|([{}();,.[\]:=<>+\-*/!?@])|(\s+)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(line)) !== null) {
    if (m.index > last) tokens.push({ text: line.slice(last, m.index), cls: "" });
    const [match, str, num, ident, punct, ws] = m;
    if (str) tokens.push({ text: str, cls: "text-amber-300" });
    else if (num) tokens.push({ text: num, cls: "text-fuchsia-300" });
    else if (ident) {
      if (keywords.includes(ident)) tokens.push({ text: ident, cls: "text-violet-300" });
      else if (/^[A-Z]/.test(ident)) tokens.push({ text: ident, cls: "text-cyan-200" });
      else tokens.push({ text: ident, cls: "text-sky-200" });
    } else if (punct) tokens.push({ text: punct, cls: "text-foreground/60" });
    else if (ws) tokens.push({ text: ws, cls: "" });
    last = m.index + match.length;
  }
  if (last < line.length) tokens.push({ text: line.slice(last), cls: "" });

  return (
    <>
      {tokens.map((t, i) => (
        <span key={i} className={t.cls}>
          {t.text}
        </span>
      ))}
    </>
  );
}
