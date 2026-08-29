import { z } from "zod";

/** Champ URL facultatif : accepte "" (champ vidé dans le formulaire) -> null. */
const optionalUrl = z
  .union([z.literal(""), z.url("URL invalide")])
  .transform((value) => (value === "" ? null : value))
  .nullable();

export const credentialsSchema = z.object({
  email: z.email("Email invalide"),
  password: z.string().min(1, "Mot de passe requis"),
});

export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(40, "40 caractères maximum"),
});

export const projectImageSchema = z.object({
  url: z.url(),
  alt: z.string().trim().max(160).nullable().default(null),
  order: z.number().int().min(0),
});

export const projectFileSchema = z.object({
  url: z.url(),
  filename: z.string().trim().min(1).max(200),
  fileType: z.string().trim().min(1).max(60),
});

export const projectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Le titre doit contenir au moins 3 caractères")
    .max(120, "120 caractères maximum"),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9-]*$/, "Slug invalide : minuscules, chiffres et tirets")
    .max(80)
    .optional(),
  description: z
    .string()
    .trim()
    .min(20, "La description doit contenir au moins 20 caractères")
    .max(400, "400 caractères maximum"),
  content: z.string().trim().min(1, "Le contenu est requis"),
  techStack: z
    .array(z.string().trim().min(1).max(30))
    .max(20, "20 technologies maximum")
    .default([]),
  liveUrl: optionalUrl,
  repoUrl: optionalUrl,
  featured: z.boolean().default(false),
  /** Métriques affichées en tête de page projet : { "Volume / jour": "4,2 M lignes" } */
  metrics: z
    .array(
      z.object({
        label: z.string().trim().min(1, "Libellé requis").max(40),
        value: z.string().trim().min(1, "Valeur requise").max(40),
      }),
    )
    .max(6, "6 métriques maximum")
    .default([]),
  categoryId: z.string().min(1, "Catégorie requise"),
  images: z.array(projectImageSchema).max(30).default([]),
  files: z.array(projectFileSchema).max(20).default([]),
});

export const commentSchema = z.object({
  projectId: z.string().min(1),
  authorName: z
    .string()
    .trim()
    .min(2, "Nom trop court")
    .max(60, "60 caractères maximum"),
  content: z
    .string()
    .trim()
    .min(5, "Commentaire trop court")
    .max(1000, "1000 caractères maximum"),
  /** Honeypot anti-spam : invisible pour un humain, rempli par les bots. */
  website: z.string().max(0, "Requête rejetée").optional().default(""),
});

export type ProjectInput = z.infer<typeof projectSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
export type CommentInput = z.infer<typeof commentSchema>;
