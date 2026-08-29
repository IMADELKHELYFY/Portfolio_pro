import { Mail } from "lucide-react";

import { StatCard } from "@/components/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "À propos",
  description: "Parcours, méthode de travail et contact.",
};

export const dynamic = "force-dynamic";

// Contenu éditorial : à personnaliser directement ici.
const profile = {
  name: "Prénom Nom",
  role: "Data Analyst / Data Engineer",
  email: "contact@exemple.com",
  intro:
    "Étudiant en data, je conçois des chaînes de traitement fiables et des analyses qui se terminent par une décision, pas par un graphique de plus.",
  method: [
    {
      step: "01",
      title: "Cadrer",
      body: "Partir de la question métier et de la décision qu'elle doit éclairer, avant de toucher à la moindre donnée.",
    },
    {
      step: "02",
      title: "Construire",
      body: "Pipelines versionnés, transformations testées, documentation du modèle de données.",
    },
    {
      step: "03",
      title: "Restituer",
      body: "Un chiffre lisible, une visualisation sobre, et l'incertitude dite explicitement.",
    },
  ],
  stack: {
    Langages: ["Python", "SQL", "TypeScript", "R"],
    "Data & ETL": ["pandas", "dbt", "Airflow", "Spark"],
    "Bases de données": ["PostgreSQL", "BigQuery", "DuckDB"],
    Visualisation: ["Power BI", "Metabase", "matplotlib"],
  },
} as const;

export default async function AboutPage(): Promise<JSX.Element> {
  const [projectCount, categoryCount, commentCount] = await Promise.all([
    prisma.project.count(),
    prisma.category.count(),
    prisma.comment.count({ where: { approved: true } }),
  ]);

  return (
    <>
      <section className="border-b border-border bg-dot-grid">
        <div className="container py-14">
          <p className="label-mono">à propos</p>
          <h1 className="mt-3 font-mono text-3xl font-semibold tracking-tight">
            {profile.name}
          </h1>
          <p className="mt-1 font-mono text-sm text-primary">{profile.role}</p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {profile.intro}
          </p>

          <div className="mt-8 grid grid-cols-3 gap-3 sm:max-w-lg">
            <StatCard label="Projets" value={String(projectCount)} accent />
            <StatCard label="Domaines" value={String(categoryCount)} />
            <StatCard label="Retours" value={String(commentCount)} />
          </div>
        </div>
      </section>

      <div className="container grid gap-12 py-12 lg:grid-cols-2">
        <section className="flex flex-col gap-4">
          <h2 className="font-mono text-sm font-semibold tracking-tight">
            Méthode
          </h2>
          <ol className="flex flex-col gap-3">
            {profile.method.map((item) => (
              <li
                key={item.step}
                className="flex gap-4 rounded-md border border-border bg-card p-4"
              >
                <span className="font-mono text-sm font-semibold text-primary">
                  {item.step}
                </span>
                <div>
                  <p className="font-mono text-sm font-medium">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h2 className="font-mono text-sm font-semibold tracking-tight">
              Stack
            </h2>
            <dl className="flex flex-col gap-3">
              {Object.entries(profile.stack).map(([group, items]) => (
                <div key={group} className="flex flex-col gap-1.5">
                  <dt className="label-mono">{group}</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {items.map((item) => (
                      <Badge key={item}>{item}</Badge>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col gap-3 rounded-md border border-border bg-card p-4">
            <h2 className="font-mono text-sm font-semibold tracking-tight">
              Contact
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Une question sur un projet, une opportunité de stage ou
              d&apos;alternance ?
            </p>
            <Button asChild size="sm" className="self-start">
              <a href={`mailto:${profile.email}`}>
                <Mail className="h-3.5 w-3.5" />
                {profile.email}
              </a>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
