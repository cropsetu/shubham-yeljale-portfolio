import { useEffect, useState, type KeyboardEvent } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { toast } from "sonner";
import { projectSchema, type Project } from "@/lib/projects";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial: Project | null;
  onSubmit: (project: Project) => void;
};

const empty = (): Omit<Project, "id"> => ({
  title: "",
  shortDescription: "",
  longDescription: "",
  year: new Date().getFullYear(),
  role: "",
  stack: [],
  liveUrl: "",
  githubUrl: "",
  coverImage: "",
  featured: false,
});

export function ProjectFormDialog({ open, onOpenChange, initial, onSubmit }: Props) {
  const [form, setForm] = useState<Omit<Project, "id"> & { id?: string }>(empty());
  const [tag, setTag] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      if (initial) setForm(initial);
      else setForm(empty());
      setTag("");
      setErrors({});
    }
  }, [open, initial]);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
  };

  const addTag = () => {
    const v = tag.trim();
    if (!v) return;
    if (form.stack.includes(v)) {
      setTag("");
      return;
    }
    set("stack", [...form.stack, v]);
    setTag("");
  };

  const onTagKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && !tag && form.stack.length) {
      set("stack", form.stack.slice(0, -1));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = form.id ?? `${slug(form.title)}-${Date.now().toString(36)}`;
    const candidate: Project = {
      ...form,
      id,
      year: Number(form.year),
      longDescription: form.longDescription || "",
      githubUrl: form.githubUrl || "",
    };
    const result = projectSchema.safeParse(candidate);
    if (!result.success) {
      const errs: Record<string, string> = {};
      for (const issue of result.error.issues) {
        errs[issue.path.join(".")] = issue.message;
      }
      setErrors(errs);
      toast.error("Please fix the highlighted fields");
      return;
    }
    onSubmit(result.data);
    toast.success(initial ? "Project updated" : "Project added");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl">
            {initial ? "Edit project" : "Add a project"}
          </DialogTitle>
          <DialogDescription>
            Saved locally to your browser. Featured projects appear first.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Field label="Project title" error={errors["title"]}>
            <Input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Lumen Studio" />
          </Field>

          <Field label="Short description" error={errors["shortDescription"]} hint={`${form.shortDescription.length}/200`}>
            <Textarea
              value={form.shortDescription}
              onChange={(e) => set("shortDescription", e.target.value.slice(0, 200))}
              rows={2}
              placeholder="One line that sells the project."
            />
          </Field>

          <Field label="Long description / case study" error={errors["longDescription"]} optional>
            <Textarea
              value={form.longDescription || ""}
              onChange={(e) => set("longDescription", e.target.value)}
              rows={4}
              placeholder="What was the goal, what did you build, what was the result?"
            />
          </Field>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field label="Year" error={errors["year"]}>
              <Input
                type="number"
                value={form.year}
                onChange={(e) => set("year", Number(e.target.value))}
                min={2000}
                max={2100}
              />
            </Field>
            <Field label="Role" error={errors["role"]}>
              <Input value={form.role} onChange={(e) => set("role", e.target.value)} placeholder="Lead developer" />
            </Field>
          </div>

          <Field label="Tech stack" error={errors["stack"]} hint="Press Enter to add">
            <div className="flex flex-wrap gap-2 rounded-md border border-input bg-background px-3 py-2">
              {form.stack.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1 font-mono text-xs text-foreground"
                >
                  {s}
                  <button
                    type="button"
                    onClick={() => set("stack", form.stack.filter((x) => x !== s))}
                    className="text-muted-foreground hover:text-foreground"
                    aria-label={`Remove ${s}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              <input
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                onKeyDown={onTagKey}
                onBlur={addTag}
                placeholder={form.stack.length ? "" : "React, TypeScript…"}
                className="flex-1 min-w-[120px] bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </Field>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field label="Live URL" error={errors["liveUrl"]}>
              <Input
                value={form.liveUrl}
                onChange={(e) => set("liveUrl", e.target.value)}
                placeholder="https://…"
              />
            </Field>
            <Field label="GitHub URL" error={errors["githubUrl"]} optional>
              <Input
                value={form.githubUrl || ""}
                onChange={(e) => set("githubUrl", e.target.value)}
                placeholder="https://github.com/…"
              />
            </Field>
          </div>

          <Field label="Cover image URL" error={errors["coverImage"]}>
            <Input
              value={form.coverImage}
              onChange={(e) => set("coverImage", e.target.value)}
              placeholder="https://images.unsplash.com/…"
            />
            {form.coverImage && (
              <div className="mt-3 overflow-hidden rounded-lg border border-border">
                <img
                  src={form.coverImage}
                  alt="Cover preview"
                  className="aspect-[16/9] w-full object-cover"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </div>
            )}
          </Field>

          <div className="flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3">
            <div>
              <Label className="text-sm">Featured</Label>
              <p className="text-xs text-muted-foreground">Pin to the top of the list</p>
            </div>
            <Switch checked={form.featured} onCheckedChange={(v) => set("featured", v)} />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-foreground text-background hover:bg-foreground/90">
              {initial ? "Save changes" : "Add project"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  children,
  error,
  hint,
  optional,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  hint?: string;
  optional?: boolean;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm">
          {label}
          {optional && <span className="ml-1 text-xs text-muted-foreground">(optional)</span>}
        </Label>
        {hint && <span className="font-mono text-[10px] text-muted-foreground">{hint}</span>}
      </div>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function slug(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40) || "project";
}
