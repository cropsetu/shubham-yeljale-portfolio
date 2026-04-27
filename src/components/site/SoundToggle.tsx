import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function SoundToggle() {
  const [on, setOn] = useState(false);
  return (
    <button
      onClick={() => setOn((v) => !v)}
      aria-label={on ? "Mute" : "Unmute"}
      data-cursor={on ? "mute" : "sound"}
      className="glass-card pointer-events-auto fixed right-6 top-6 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full text-foreground transition-transform hover:-translate-y-0.5"
    >
      {on ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
    </button>
  );
}
