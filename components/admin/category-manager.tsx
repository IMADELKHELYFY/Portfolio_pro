"use client";

import { Check, Loader2, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { useFormState, useFormStatus } from "react-dom";

import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/app/actions/categories";
import { ConfirmAction } from "@/components/admin/confirm-action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { idleState } from "@/lib/form";

export type CategoryRow = {
  id: string;
  name: string;
  slug: string;
  projectCount: number;
};

function SubmitButton(): JSX.Element {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Plus className="h-4 w-4" />
      )}
      Ajouter
    </Button>
  );
}

function CreateForm(): JSX.Element {
  const [state, formAction] = useFormState(createCategory, idleState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (state.status === "idle") return;
    toast({
      title: state.status === "error" ? "Échec" : "Fait",
      description: state.message,
      variant: state.status === "error" ? "destructive" : "success",
    });
    if (state.status === "success") {
      formRef.current?.reset();
      router.refresh();
    }
  }, [state, toast, router]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-1.5">
      <Label htmlFor="new-category">Nouvelle catégorie</Label>
      <div className="flex items-start gap-2">
        <div className="flex-1">
          <Input
            id="new-category"
            name="name"
            placeholder="Data Engineering"
            required
          />
          {state.fieldErrors?.name ? (
            <p role="alert" className="mt-1 font-mono text-2xs text-destructive">
              {state.fieldErrors.name}
            </p>
          ) : null}
        </div>
        <SubmitButton />
      </div>
    </form>
  );
}

function Row({ category }: { category: CategoryRow }): JSX.Element {
  const [name, setName] = useState(category.name);
  const [pending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();
  const dirty = name.trim() !== category.name;

  function save(): void {
    startTransition(async () => {
      const result = await updateCategory(category.id, name);
      toast({
        title: result.status === "error" ? "Échec" : "Fait",
        description: result.message,
        variant: result.status === "error" ? "destructive" : "success",
      });
      router.refresh();
    });
  }

  return (
    <li className="flex flex-wrap items-center gap-2 rounded-sm border border-border bg-surface px-3 py-2">
      <Input
        aria-label={`Nom de la catégorie ${category.name}`}
        value={name}
        onChange={(event) => setName(event.target.value)}
        className="h-8 max-w-[240px] flex-1"
      />
      <span className="font-mono text-2xs text-muted-foreground">
        /{category.slug}
      </span>
      <Badge variant={category.projectCount > 0 ? "accent" : "outline"}>
        {category.projectCount} projet{category.projectCount > 1 ? "s" : ""}
      </Badge>

      <div className="ml-auto flex items-center gap-1.5">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!dirty || pending}
          onClick={save}
        >
          {pending ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Check className="h-3.5 w-3.5" />
          )}
          Renommer
        </Button>
        <ConfirmAction
          action={deleteCategory.bind(null, category.id)}
          title={`Supprimer « ${category.name} » ?`}
          description={
            category.projectCount > 0
              ? "Cette catégorie contient des projets : la suppression sera refusée."
              : "Cette catégorie ne contient aucun projet."
          }
          trigger={
            <Button variant="destructive" size="sm">
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          }
        />
      </div>
    </li>
  );
}

export function CategoryManager({
  categories,
}: {
  categories: CategoryRow[];
}): JSX.Element {
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-md border border-border bg-card p-4">
        <CreateForm />
      </div>

      {categories.length === 0 ? (
        <p className="rounded-md border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground">
          Aucune catégorie.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {categories.map((category) => (
            <Row key={category.id} category={category} />
          ))}
        </ul>
      )}
    </div>
  );
}
