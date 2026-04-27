type Props = { progress: number };

export function ScrollCounter({ progress }: Props) {
  const value = Math.round(Math.min(Math.max(progress, 0), 1) * 100);
  const text = value.toString().padStart(3, "0");
  return (
    <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
      <div className="rounded-md border border-[var(--holo)]/40 bg-[var(--navy-deep)]/70 px-4 py-1.5 font-mono text-[28px] leading-none text-white shadow-[0_0_24px_-6px_rgba(90,200,250,0.4)]">
        {text}
      </div>
    </div>
  );
}
