import Link from "next/link";

import { ProjectCard, type ProjectCardData } from "@/components/project-card";
import { StatCard } from "@/components/stat-card";
import { prisma } from "@/lib/prisma";
import { parseStringArray } from "@/lib/serialize";
import { cn, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

type HomePageProps = {
  searchParams: { category?: string };
};

/** Trois technologies les plus fréquentes dans l'ensemble des projets. */
function topTechStack(stacks: string[][]): string {
  const counts = new Map<string, number>();
  for (const stack of stacks) {
    for (const tech of stack) {
      counts.set(tech, (counts.get(tech) ?? 0) + 1);
    }
  }
  const top = [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 3)
    .map(([tech]) => tech);

  return top.length > 0 ? top.join(" / ") : "—";
}

export default async function HomePage({
  searchParams,
}: HomePageProps): Promise<JSX.Element> {
  const activeCategory = searchParams.category;

  const [categories, projects, allStacks, lastUpdated, totalProjects] =
    await Promise.all([
      prisma.category.findMany({
        orderBy: { name: "asc" },
        include: { _count: { select: { projects: true } } },
      }),
      prisma.project.findMany({
        where: activeCategory ? { category: { slug: activeCategory } } : undefined,
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
        include: {
          category: { select: { name: true, slug: true } },
          images: { orderBy: { order: "asc" }, take: 1 },
          _count: { select: { comments: { where: { approved: true } } } },
        },
      }),
      prisma.project.findMany({ select: { techStack: true } }),
      prisma.project.findFirst({
        orderBy: { updatedAt: "desc" },
        select: { updatedAt: true },
      }),
      prisma.project.count(),
    ]);

  const cards: ProjectCardData[] = projects.map((project) => ({
    slug: project.slug,
    title: project.title,
    description: project.description,
    techStack: parseStringArray(project.techStack),
    featured: project.featured,
    category: project.category,
    cover: project.images[0]
      ? { url: project.images[0].url, alt: project.images[0].alt }
      : null,
    commentCount: project._count.comments,
  }));

  return (
    <>
      {/* Hero : identité data, métriques calculées depuis la base */}
      <section className="border-b border-border bg-dot-grid">
        <div className="container py-14 sm:py-20">
          <p className="label-mono">portfolio / data</p>
          <h1 className="mt-3 max-w-2xl font-mono text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Je transforme des données brutes en décisions
            <span className="text-primary">.</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Analyse, ingénierie et visualisation de données. Chaque projet
            ci-dessous part d&apos;un problème métier et se termine par un
            résultat mesurable.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatCard label="Projets publiés" value={String(totalProjects)} accent />
            <StatCard label="Catégories" value={String(categories.length)} />
            <StatCard
              label="Stack principale"
              value={topTechStack(
                allStacks.map((project) => parseStringArray(project.techStack)),
              )}
              className="col-span-2 lg:col-span-1"
            />
            <StatCard
              label="Dernière mise à jour"
              value={lastUpdated ? formatDate(lastUpdated.updatedAt) : "—"}
            />
          </div>
        </div>
      </section>

      <section className="container py-10">
        {/* Filtres par catégorie — liens serveur, pas de JS client */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="label-mono mr-1">filtre</span>
          <Link
            href="/"
            className={cn(
              "rounded-sm border px-2.5 py-1 font-mono text-2xs transition-colors",
              !activeCategory
                ? "border-primary/50 bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
            )}
          >
            tous ({totalProjects})
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/?category=${category.slug}`}
              className={cn(
                "rounded-sm border px-2.5 py-1 font-mono text-2xs transition-colors",
                activeCategory === category.slug
                  ? "border-primary/50 bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              {category.name} ({category._count.projects})
            </Link>
          ))}
        </div>

        <div className="mt-6">
          {cards.length === 0 ? (
            <p className="rounded-md border border-dashed border-border px-4 py-16 text-center text-sm text-muted-foreground">
              Aucun projet dans cette catégorie.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
