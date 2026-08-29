import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

import { auth } from "@/lib/auth";

const f = createUploadthing();

/** Seul un admin authentifié peut téléverser. */
async function assertAdmin(): Promise<{ adminId: string }> {
  const session = await auth();
  if (!session?.user?.id) {
    throw new UploadThingError("Non autorisé");
  }
  return { adminId: session.user.id };
}

export const ourFileRouter = {
  // Images de projet — 4 Mo, jusqu'à 10 par téléversement
  projectImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 10 },
  })
    .middleware(assertAdmin)
    .onUploadComplete(({ file }) => ({
      url: file.ufsUrl,
      name: file.name,
    })),

  // Fichiers joints — pdf / xlsx / pptx / zip, 16 Mo
  projectFile: f({
    pdf: { maxFileSize: "16MB", maxFileCount: 5 },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
      maxFileSize: "16MB",
      maxFileCount: 5,
    },
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
      maxFileSize: "16MB",
      maxFileCount: 5,
    },
    "application/zip": { maxFileSize: "16MB", maxFileCount: 5 },
  })
    .middleware(assertAdmin)
    .onUploadComplete(({ file }) => ({
      url: file.ufsUrl,
      name: file.name,
      type: file.type,
    })),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
