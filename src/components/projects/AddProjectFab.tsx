import { Plus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function AddProjectFab({ onClick }: { onClick: () => void }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onClick}
            data-cursor="add"
            aria-label="Add project"
            className="group fixed bottom-6 right-6 z-[100] flex h-14 w-14 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-lg transition-all hover:scale-110 hover:border-transparent hover:bg-[image:linear-gradient(135deg,var(--accent-violet),var(--accent-cyan))] hover:text-background md:bottom-10 md:right-10"
          >
            <Plus className="h-6 w-6 transition-transform group-hover:rotate-90" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="left">Add project</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
