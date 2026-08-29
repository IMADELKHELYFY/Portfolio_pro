import { ArrowLeft, Download, ExternalLink, GitBranch } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CommentSection } from "@/components/comment-section";
import { Markdown } from "@/components/markdown";
import { ProjectCarousel } from "@/components/project-carousel";
import { StatCard } from "@/components/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { parseMetrics } from "@/lib/metrics";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

type ProjectPageProps = { params: { slug: string } };

async function getProject(slug: string) {
  return prisma.project.findUnique({
    where: { slug },
    include: {
      category: true,
      images: { orderBy: { order: "asc" } },
      files: true,
      comments: {
        where: { approved: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
    select: { title: true, description: true },
  });

  if (!project) return { title: "Projet introuvable" };
  return { title: project.title, description: project.description };
}

export default async function ProjectPage({
  params,
}: ProjectPageProps): Promise<JSX.Element> {
  const project = await getProject(params.slug);
  if (!project) notFound();

  const metrics = parseMetrics(project.metrics);

  return (
    <>
      <section className="border-b border-border bg-dot-grid">
        <div className="container py-10">
          <Link
            href={`/?category=${project.category.slug}`}
            className="inline-flex items-center gap-1.5 font-mono text-2xs uppercase tracking-[0.12em] text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-3 w-3" />
            {project.category.name}
          </Link>

          <h1 className="mt-3 max-w-3xl font-mono text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
            {project.title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            {project.techStack.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {project.liveUrl ? (
              <Button asChild size="sm">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3.5 w-3.5" />
                  Voir en ligne
                </a>
              </Button>
            ) : null}
            {project.repoUrl ? (
              <Button asChild size="sm" variant="outline">
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  <GitBranch className="h-3.5 w-3.5" />
                  Code source
                </a>
              </Button>
            ) : null}
            <span className="font-mono text-2xs text-muted-foreground">
              maj {formatDate(project.updatedAt)}
            </span>
          </div>
        </div>
      </section>

      <div className="container grid gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="flex min-w-0 flex-col gap-10">
          {metrics.length > 0 ? (
            <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {metrics.map((metric) => (
                <StatCard
                  key={metric.label}
                  label={metric.label}
                  value={metric.value}
                  accent
                />
              ))}
            </section>
          ) : null}

          {project.images.length > 0 ? (
            <ProjectCarousel
              images={project.images.map((image) => ({
                url: image.url,
                alt: image.alt,
              }))}
            />
          ) : null}

          <article className="prose-data">
            <Markdown content={project.content} />
          </article>

          <CommentSection
            projectId={project.id}
            comments={project.comments.map((comment) => ({
              id: comment.id,
              authorName: comment.authorName,
              content: comment.content,
              createdAt: comment.createdAt,
            }))}
          />
        </div>

        <aside className="flex h-fit flex-col gap-3 lg:sticky lg:top-20">
          <p className="label-mono">fichiers</p>
          {project.files.length === 0 ? (
            <p className="rounded-md border border-dashed border-border px-3 py-6 text-center font-mono text-2xs text-muted-foreground">
              aucun fichier joint
            </p>
          ) : (
            <ul className="flex flex-col gap-2">
              {project.files.map((file) => (
                <li key={file.id}>
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="flex items-center gap-2.5 rounded-sm border border-border bg-card px-3 py-2.5 transition-colors hover:border-primary/40"
                  >
                    <Download className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    <span className="min-w-0 flex-1 truncate font-mono text-xs">
                      {file.filename}
                    </span>
                    <span className="shrink-0 font-mono text-2xs uppercase text-muted-foreground">
                      {file.filename.split(".").pop()}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </>
  );
}
