"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth";
import { errorState, successState, toFieldErrors, type ActionState } from "@/lib/form";
import { prisma } from "@/lib/prisma";
import { commentSchema } from "@/lib/validations";

/** Formulaire public : dépôt d'un commentaire, en attente de modération. */
export async function submitComment(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = commentSchema.safeParse({
    projectId: formData.get("projectId"),
    authorName: formData.get("authorName"),
    content: formData.get("content"),
    website: formData.get("website") ?? "",
  });

  if (!parsed.success) {
    return errorState("Commentaire non envoyé", toFieldErrors(parsed.error));
  }

  // Honeypot rempli : on renvoie un succès neutre sans rien enregistrer.
  if (parsed.data.website.length > 0) {
    return successState("Commentaire envoyé, en attente de modération.");
  }

  const project = await prisma.project.findUnique({
    where: { id: parsed.data.projectId },
    select: { slug: true },
  });
  if (!project) return errorState("Projet introuvable");

  await prisma.comment.create({
    data: {
      projectId: parsed.data.projectId,
      authorName: parsed.data.authorName,
      content: parsed.data.content,
      approved: false,
    },
  });

  revalidatePath("/admin/comments");
  revalidatePath("/admin/dashboard");
  return successState("Commentaire envoyé, en attente de modération.");
}

export async function approveComment(id: string): Promise<ActionState> {
  await requireAdmin();

  const comment = await prisma.comment.findUnique({
    where: { id },
    select: { project: { select: { slug: true } } },
  });
  if (!comment) return errorState("Commentaire introuvable");

  await prisma.comment.update({ where: { id }, data: { approved: true } });

  revalidatePath("/admin/comments");
  revalidatePath("/admin/dashboard");
  revalidatePath("/");
  revalidatePath(`/projects/${comment.project.slug}`);
  return successState("Commentaire approuvé");
}

export async function deleteComment(id: string): Promise<ActionState> {
  await requireAdmin();

  const comment = await prisma.comment.findUnique({
    where: { id },
    select: { project: { select: { slug: true } } },
  });
  if (!comment) return errorState("Commentaire introuvable");

  await prisma.comment.delete({ where: { id } });

  revalidatePath("/admin/comments");
  revalidatePath("/admin/dashboard");
  revalidatePath("/");
  revalidatePath(`/projects/${comment.project.slug}`);
  return successState("Commentaire supprimé");
}
