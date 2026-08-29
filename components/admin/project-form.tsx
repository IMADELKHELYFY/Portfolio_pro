"use client";

import { Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { createProject, updateProject } from "@/app/actions/projects";
import { FileManager, type FileEntry } from "@/components/admin/file-manager";
import { ImageManager, type ImageEntry } from "@/components/admin/image-manager";
import { MarkdownEditor } from "@/components/admin/markdown-editor";
import { MetricsEditor, type MetricEntry } from "@/components/admin/metrics-editor";
import { TagInput } from "@/components/admin/tag-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { slugify } from "@/lib/utils";

export type ProjectFormValues = {
  title: string;
  slug: string;
  description: string;
  content: string;
  techStack: string[];
  liveUrl: string;
  repoUrl: string;
  featured: boolean;
  categoryId: string;
  metrics: MetricEntry[];
  images: ImageEntry[];
  files: FileEntry[];
};

type ProjectFormProps = {
  categories: { id: string; name: string }[];
  projectId?: string;
  initialValues: ProjectFormValues;
};

function FieldError({ message }: { message?: string }): JSX.Element | null {
  if (!message) return null;
  return (
    <p role="alert" className="font-mono text-2xs text-destructive">
      {message}
    </p>
  );
}

export function ProjectForm({
  categories,
  projectId,
  initialValues,
}: ProjectFormProps): JSX.Element {
  const router = useRouter();
  const { toast } = useToast();
  const [values, setValues] = useState<ProjectFormValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);

  function set<K extends keyof ProjectFormValues>(
    key: K,
    value: ProjectFormValues[K],
  ): void {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setPending(true);
    setErrors({});

    const payload = {
      ...values,
      slug: slugify(values.slug || values.title),
      liveUrl: values.liveUrl.trim(),
      repoUrl: values.repoUrl.trim(),
      metrics: values.metrics.filter((m) => m.label.trim() && m.value.trim()),
      images: values.images.map((image, index) => ({ ...image, order: index })),
      files: values.files,
    };

    const result = projectId
      ? await updateProject(projectId, payload)
      : await createProject(payload);

    setPending(false);

    if (result.status === "error") {
      setErrors(result.fieldErrors ?? {});
      toast({
        title: "Échec",
        description: result.message,
        variant: "destructive",
      });
      return;
    }

    toast({ title: "Enregistré", description: result.message, variant: "success" });
    router.push("/admin/dashboard");
    router.refresh();
  }

  const slugPreview = slugify(values.slug || values.title) || "…";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8" noValidate>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
              value={values.title}
              onChange={(event) => set("title", event.target.value)}
              placeholder="Pipeline ETL ventes"
              required
            />
            <p className="font-mono text-2xs text-muted-foreground">
              url : /projects/{slugPreview}
            </p>
            <FieldError message={errors.title} />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="slug">Slug (facultatif)</Label>
            <Input
              id="slug"
              value={values.slug}
              onChange={(event) => set("slug", event.target.value)}
              placeholder="laisser vide = généré depuis le titre"
            />
            <FieldError message={errors.slug} />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="description">Description courte</Label>
            <Input
              id="description"
              value={values.description}
              onChange={(event) => set("description", event.target.value)}
              placeholder="Une phrase : le problème et le résultat chiffré."
              required
            />
            <p className="font-mono text-2xs text-muted-foreground">
              {values.description.length} / 400
            </p>
            <FieldError message={errors.description} />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="content">Contenu (markdown)</Label>
            <MarkdownEditor
              id="content"
              value={values.content}
              onChange={(next) => set("content", next)}
            />
            <FieldError message={errors.content} />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Images</Label>
            <ImageManager
              value={values.images}
              onChange={(next) => set("images", next)}
            />
            <FieldError message={errors.images} />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Fichiers</Label>
            <FileManager value={values.files} onChange={(next) => set("files", next)} />
            <FieldError message={errors.files} />
          </div>
        </div>

        <aside className="flex h-fit flex-col gap-5 rounded-md border border-border bg-card p-4 lg:sticky lg:top-20">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="category">Catégorie</Label>
            <Select
              value={values.categoryId}
              onValueChange={(next) => set("categoryId", next)}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Choisir…" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError message={errors.categoryId} />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="techStack">Stack technique</Label>
            <TagInput
              id="techStack"
              value={values.techStack}
              onChange={(next) => set("techStack", next)}
            />
            <FieldError message={errors.techStack} />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Métriques</Label>
            <MetricsEditor
              value={values.metrics}
              onChange={(next) => set("metrics", next)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="liveUrl">URL en ligne</Label>
            <Input
              id="liveUrl"
              type="url"
              value={values.liveUrl}
              onChange={(event) => set("liveUrl", event.target.value)}
              placeholder="https://…"
            />
            <FieldError message={errors.liveUrl} />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="repoUrl">Dépôt</Label>
            <Input
              id="repoUrl"
              type="url"
              value={values.repoUrl}
              onChange={(event) => set("repoUrl", event.target.value)}
              placeholder="https://github.com/…"
            />
            <FieldError message={errors.repoUrl} />
          </div>

          <div className="flex items-center justify-between gap-3 rounded-sm border border-border bg-surface px-3 py-2.5">
            <Label htmlFor="featured" className="cursor-pointer">
              Mis en avant
            </Label>
            <Switch
              id="featured"
              checked={values.featured}
              onCheckedChange={(next) => set("featured", next)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Button type="submit" disabled={pending}>
              {pending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {pending ? "Enregistrement…" : "Enregistrer"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              disabled={pending}
              onClick={() => router.push("/admin/dashboard")}
            >
              Annuler
            </Button>
          </div>
        </aside>
      </div>
    </form>
  );
}
