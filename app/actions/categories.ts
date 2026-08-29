"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth";
import { errorState, successState, toFieldErrors, type ActionState } from "@/lib/form";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { categorySchema } from "@/lib/validations";

function revalidateCategories(): void {
  revalidatePath("/");
  revalidatePath("/admin/categories");
  revalidatePath("/admin/dashboard");
}

export async function createCategory(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();

  const parsed = categorySchema.safeParse({ name: formData.get("name") });
  if (!parsed.success) {
    return errorState("Formulaire invalide", toFieldErrors(parsed.error));
  }

  const slug = slugify(parsed.data.name);
  if (!slug) return errorState("Nom invalide", { name: "Nom invalide" });

  const existing = await prisma.category.findUnique({ where: { slug } });
  if (existing) {
    return errorState("Catégorie déjà existante", {
      name: "Une catégorie porte déjà ce nom",
    });
  }

  await prisma.category.create({ data: { name: parsed.data.name, slug } });
  revalidateCategories();
  return successState(`Catégorie « ${parsed.data.name} » créée`);
}

export async function updateCategory(
  id: string,
  name: string,
): Promise<ActionState> {
  await requireAdmin();

  const parsed = categorySchema.safeParse({ name });
  if (!parsed.success) {
    return errorState("Nom invalide", toFieldErrors(parsed.error));
  }

  const slug = slugify(parsed.data.name);
  const clash = await prisma.category.findUnique({ where: { slug } });
  if (clash && clash.id !== id) {
    return errorState("Une catégorie porte déjà ce nom");
  }

  await prisma.category.update({
    where: { id },
    data: { name: parsed.data.name, slug },
  });
  revalidateCategories();
  return successState("Catégorie mise à jour");
}

export async function deleteCategory(id: string): Promise<ActionState> {
  await requireAdmin();

  const count = await prisma.project.count({ where: { categoryId: id } });
  if (count > 0) {
    return errorState(
      `Impossible : ${count} projet(s) rattaché(s) à cette catégorie`,
    );
  }

  await prisma.category.delete({ where: { id } });
  revalidateCategories();
  return successState("Catégorie supprimée");
}
