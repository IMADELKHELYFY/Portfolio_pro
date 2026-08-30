import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectForm } from "@/components/admin/project-form";
import { parseMetrics } from "@/lib/metrics";
import { prisma } from "@/lib/prisma";
import { parseStringArray } from "@/lib/serialize";

export const metadata = { title: "Modifier un projet" };
export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: { id: string };
}): Promise<JSX.Element> {
  const [project, categories] = await Promise.all([
    prisma.project.findUnique({
      where: { id: params.id },
      include: {
        images: { orderBy: { order: "asc" } },
        files: true,
      },
    }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  if (!project) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="label-mono">projets / édition</p>
          <h1 className="mt-1 font-mono text-2xl font-semibold tracking-tight">
            {project.title}
          </h1>
        </div>
        <Link
          href={`/projects/${project.slug}`}
          target="_blank"
          className="inline-flex items-center gap-1.5 font-mono text-2xs uppercase tracking-[0.12em] text-muted-foreground hover:text-primary"
        >
          voir la page
          <ExternalLink className="h-3 w-3" />
        </Link>
      </div>

      <ProjectForm
        categories={categories}
        projectId={project.id}
        initialValues={{
          title: project.title,
          slug: project.slug,
          description: project.description,
          content: project.content,
          techStack: parseStringArray(project.techStack),
          liveUrl: project.liveUrl ?? "",
          repoUrl: project.repoUrl ?? "",
          featured: project.featured,
          categoryId: project.categoryId,
          metrics: parseMetrics(project.metrics),
          images: project.images.map((image) => ({
            url: image.url,
            alt: image.alt,
          })),
          files: project.files.map((file) => ({
            url: file.url,
            filename: file.filename,
            fileType: file.fileType,
          })),
        }}
      />
    </div>
  );
}
