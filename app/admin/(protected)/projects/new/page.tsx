import Link from "next/link";

import { ProjectForm, type ProjectFormValues } from "@/components/admin/project-form";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Nouveau projet" };
export const dynamic = "force-dynamic";

const emptyValues: ProjectFormValues = {
  title: "",
  slug: "",
  description: "",
  content: "",
  techStack: [],
  liveUrl: "",
  repoUrl: "",
  featured: false,
  categoryId: "",
  metrics: [],
  images: [],
  files: [],
};

export default async function NewProjectPage(): Promise<JSX.Element> {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="label-mono">projets / création</p>
        <h1 className="mt-1 font-mono text-2xl font-semibold tracking-tight">
          Nouveau projet
        </h1>
      </div>

      {categories.length === 0 ? (
        <div className="rounded-md border border-dashed border-border px-4 py-10 text-center">
          <p className="text-sm text-muted-foreground">
            Aucune catégorie : un projet doit être rattaché à une catégorie.
          </p>
          <Button asChild size="sm" className="mt-4">
            <Link href="/admin/categories">Créer une catégorie</Link>
          </Button>
        </div>
      ) : (
        <ProjectForm
          categories={categories}
          initialValues={{ ...emptyValues, categoryId: categories[0].id }}
        />
      )}
    </div>
  );
}
