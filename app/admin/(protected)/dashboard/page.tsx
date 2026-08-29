import { Pencil, Plus, Star, Trash2 } from "lucide-react";
import Link from "next/link";

import { ActionButton } from "@/components/admin/action-button";
import { ConfirmAction } from "@/components/admin/confirm-action";
import { StatCard } from "@/components/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { deleteProject, toggleFeatured } from "@/app/actions/projects";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

export default async function DashboardPage(): Promise<JSX.Element> {
  const [projects, projectCount, featuredCount, pendingComments, categoryCount] =
    await Promise.all([
      prisma.project.findMany({
        orderBy: { updatedAt: "desc" },
        include: {
          category: { select: { name: true } },
          _count: { select: { comments: true, images: true, files: true } },
        },
      }),
      prisma.project.count(),
      prisma.project.count({ where: { featured: true } }),
      prisma.comment.count({ where: { approved: false } }),
      prisma.category.count(),
    ]);

  return (
    <div className="flex flex-col gap-8">
      <section>
        <p className="label-mono">pilotage</p>
        <h1 className="mt-1 font-mono text-2xl font-semibold tracking-tight">
          Dashboard
        </h1>
      </section>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Projets" value={String(projectCount)} />
        <StatCard label="Mis en avant" value={String(featuredCount)} />
        <StatCard
          label="Commentaires en attente"
          value={String(pendingComments)}
          accent={pendingComments > 0}
          hint={pendingComments > 0 ? "à modérer" : "file vide"}
        />
        <StatCard label="Catégories" value={String(categoryCount)} />
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-mono text-sm font-semibold tracking-tight">
            Projets{" "}
            <span className="text-muted-foreground">({projects.length})</span>
          </h2>
          <Button asChild size="sm">
            <Link href="/admin/projects/new">
              <Plus className="h-3.5 w-3.5" />
              Nouveau projet
            </Link>
          </Button>
        </div>

        {projects.length === 0 ? (
          <p className="rounded-md border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground">
            Aucun projet pour l&apos;instant. Crée le premier.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-md border border-border">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="label-mono px-3 py-2.5 text-left">Projet</th>
                  <th className="label-mono px-3 py-2.5 text-left">Catégorie</th>
                  <th className="label-mono px-3 py-2.5 text-left">Contenus</th>
                  <th className="label-mono px-3 py-2.5 text-left">Maj</th>
                  <th className="label-mono px-3 py-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr
                    key={project.id}
                    className="border-b border-border last:border-0 hover:bg-surface/60"
                  >
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        {project.featured ? (
                          <Star className="h-3.5 w-3.5 shrink-0 fill-primary text-primary" />
                        ) : null}
                        <div>
                          <p className="font-mono text-sm font-medium">
                            {project.title}
                          </p>
                          <p className="font-mono text-2xs text-muted-foreground">
                            /{project.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <Badge variant="outline">{project.category.name}</Badge>
                    </td>
                    <td className="px-3 py-3 font-mono text-2xs text-muted-foreground">
                      {project._count.images} img · {project._count.files} fic ·{" "}
                      {project._count.comments} com
                    </td>
                    <td className="px-3 py-3 font-mono text-2xs text-muted-foreground">
                      {formatDate(project.updatedAt)}
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <ActionButton
                          action={toggleFeatured.bind(null, project.id)}
                          variant="ghost"
                        >
                          <Star
                            className={
                              project.featured
                                ? "h-3.5 w-3.5 fill-primary text-primary"
                                : "h-3.5 w-3.5"
                            }
                          />
                        </ActionButton>
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/admin/projects/${project.id}/edit`}>
                            <Pencil className="h-3.5 w-3.5" />
                            Modifier
                          </Link>
                        </Button>
                        <ConfirmAction
                          action={deleteProject.bind(null, project.id)}
                          title={`Supprimer « ${project.title} » ?`}
                          description="Les images, fichiers et commentaires associés seront supprimés. Action irréversible."
                          trigger={
                            <Button variant="destructive" size="sm">
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
