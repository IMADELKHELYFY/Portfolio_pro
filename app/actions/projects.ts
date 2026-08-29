"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth";
import { errorState, successState, toFieldErrors, type ActionState } from "@/lib/form";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { projectSchema } from "@/lib/validations";

function revalidateProject(slug?: string): void {
  revalidatePath("/");
  revalidatePath("/admin/dashboard");
  if (slug) revalidatePath(`/projects/${slug}`);
}

/** Garantit l'unicité du slug : "mon-projet", "mon-projet-2", ... */
async function uniqueSlug(base: string, excludeId?: string): Promise<string> {
  const root = base.length > 0 ? base : "projet";
  let candidate = root;
  let suffix = 1;

  for (;;) {
    const existing = await prisma.project.findUnique({
      where: { slug: candidate },
      select: { id: true },
    });
    if (!existing || existing.id === excludeId) return candidate;
    suffix += 1;
    candidate = `${root}-${suffix}`;
  }
}

function metricsToJson(
  metrics: { label: string; value: string }[],
): Record<string, string> | null {
  if (metrics.length === 0) return null;
  return Object.fromEntries(metrics.map((m) => [m.label, m.value]));
}

export async function createProject(input: unknown): Promise<ActionState> {
  await requireAdmin();

  const parsed = projectSchema.safeParse(input);
  if (!parsed.success) {
    return errorState("Formulaire invalide", toFieldErrors(parsed.error));
  }
  const data = parsed.data;

  const category = await prisma.category.findUnique({
    where: { id: data.categoryId },
    select: { id: true },
  });
  if (!category) {
    return errorState("Catégorie introuvable", {
      categoryId: "Cette catégorie n'existe plus",
    });
  }

  const slug = await uniqueSlug(slugify(data.slug || data.title));

  try {
    await prisma.project.create({
      data: {
        title: data.title,
        slug,
        description: data.description,
        content: data.content,
        techStack: data.techStack,
        liveUrl: data.liveUrl,
        repoUrl: data.repoUrl,
        featured: data.featured,
        metrics: metricsToJson(data.metrics) ?? undefined,
        categoryId: data.categoryId,
        images: { create: data.images },
        files: { create: data.files },
      },
    });
  } catch {
    return errorState("Échec de la création du projet");
  }

  revalidateProject(slug);
  return successState(`Projet « ${data.title} » créé`);
}

export async function updateProject(
  id: string,
  input: unknown,
): Promise<ActionState> {
  await requireAdmin();

  const parsed = projectSchema.safeParse(input);
  if (!parsed.success) {
    return errorState("Formulaire invalide", toFieldErrors(parsed.error));
  }
  const data = parsed.data;

  const existing = await prisma.project.findUnique({
    where: { id },
    select: { id: true, slug: true },
  });
  if (!existing) return errorState("Projet introuvable");

  const slug = await uniqueSlug(slugify(data.slug || data.title), id);

  try {
    // Images et fichiers sont remplacés en bloc : l'ordre du formulaire fait foi.
    await prisma.$transaction([
      prisma.projectImage.deleteMany({ where: { projectId: id } }),
      prisma.projectFile.deleteMany({ where: { projectId: id } }),
      prisma.project.update({
        where: { id },
        data: {
          title: data.title,
          slug,
          description: data.description,
          content: data.content,
          techStack: data.techStack,
          liveUrl: data.liveUrl,
          repoUrl: data.repoUrl,
          featured: data.featured,
          metrics: metricsToJson(data.metrics) ?? undefined,
          categoryId: data.categoryId,
          images: { create: data.images },
          files: { create: data.files },
        },
      }),
    ]);
  } catch {
    return errorState("Échec de la mise à jour du projet");
  }

  revalidateProject(slug);
  if (existing.slug !== slug) revalidatePath(`/projects/${existing.slug}`);
  return successState("Projet mis à jour");
}

export async function deleteProject(id: string): Promise<ActionState> {
  await requireAdmin();

  const project = await prisma.project.findUnique({
    where: { id },
    select: { slug: true, title: true },
  });
  if (!project) return errorState("Projet introuvable");

  try {
    await prisma.project.delete({ where: { id } });
  } catch {
    return errorState("Échec de la suppression");
  }

  revalidateProject(project.slug);
  return successState(`Projet « ${project.title} » supprimé`);
}

export async function toggleFeatured(id: string): Promise<ActionState> {
  await requireAdmin();

  const project = await prisma.project.findUnique({
    where: { id },
    select: { featured: true, slug: true },
  });
  if (!project) return errorState("Projet introuvable");

  await prisma.project.update({
    where: { id },
    data: { featured: !project.featured },
  });

  revalidateProject(project.slug);
  return successState(project.featured ? "Retiré des projets mis en avant" : "Mis en avant");
}
