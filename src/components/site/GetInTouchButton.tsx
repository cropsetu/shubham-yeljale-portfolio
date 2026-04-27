export function GetInTouchButton() {
  const onClick = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  return (
    <button
      onClick={onClick}
      data-cursor="hire"
      className="holo-border pointer-events-auto fixed right-20 top-6 z-50 inline-flex items-center rounded-full px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5 active:translate-y-0"
      style={{
        background: "linear-gradient(135deg, #f4a04a 0%, #f43f5e 100%)",
        boxShadow: "0 12px 30px -10px rgba(244,160,74,0.55), 0 0 24px -8px rgba(244,63,94,0.6)",
      }}
    >
      Get in touch
    </button>
  );
}
