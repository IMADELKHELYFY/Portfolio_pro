import { MessageSquare, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Sparkline, shapeForCategory } from "@/components/sparkline";
import { Badge } from "@/components/ui/badge";

export type ProjectCardData = {
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  featured: boolean;
  category: { name: string; slug: string };
  cover: { url: string; alt: string | null } | null;
  commentCount: number;
};

/**
 * Carte projet : bandeau supérieur = image de couverture si elle existe,
 * sinon mini-graphique généré, dont la forme dépend de la catégorie.
 */
export function ProjectCard({ project }: { project: ProjectCardData }): JSX.Element {
  const extraTech = project.techStack.length - 3;

  return (
    <article className="group flex flex-col overflow-hidden rounded-md border border-border bg-card transition-colors hover:border-primary/40">
      <Link href={`/projects/${project.slug}`} className="flex flex-1 flex-col">
        <div className="relative h-28 shrink-0 overflow-hidden border-b border-border bg-surface">
          {project.cover ? (
            <Image
              src={project.cover.url}
              alt={project.cover.alt ?? ""}
              fill
              sizes="(max-width: 768px) 100vw, 380px"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <>
              <div className="absolute inset-0 bg-line-grid" />
              <Sparkline
                seed={project.slug}
                shape={shapeForCategory(project.category.slug)}
                className="absolute inset-x-0 bottom-0 h-20 w-full"
              />
            </>
          )}

          <div className="absolute left-2.5 top-2.5 flex items-center gap-1.5">
            <Badge variant="outline" className="bg-background/80 backdrop-blur">
              {project.category.name}
            </Badge>
            {project.featured ? (
              <Badge variant="accent" className="bg-background/80 backdrop-blur">
                <Star className="mr-1 h-2.5 w-2.5 fill-current" />
                top
              </Badge>
            ) : null}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <h3 className="font-mono text-sm font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary">
            {project.title}
          </h3>
          <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <div className="mt-1 flex flex-wrap items-center gap-1.5">
            {project.techStack.slice(0, 3).map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
            {extraTech > 0 ? <Badge variant="outline">+{extraTech}</Badge> : null}
          </div>
        </div>
      </Link>

      <div className="flex items-center justify-between border-t border-border px-4 py-2.5">
        <span className="inline-flex items-center gap-1.5 font-mono text-2xs text-muted-foreground">
          <MessageSquare className="h-3 w-3" />
          {project.commentCount} commentaire{project.commentCount > 1 ? "s" : ""}
        </span>
        <Link
          href={`/projects/${project.slug}`}
          className="font-mono text-2xs uppercase tracking-[0.12em] text-muted-foreground transition-colors group-hover:text-primary"
        >
          ouvrir →
        </Link>
      </div>
    </article>
  );
}
