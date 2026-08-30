import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/** techStack et metrics sont stockés en JSON sérialisé (compatible SQLite). */
const json = (value: unknown): string => JSON.stringify(value);

async function main(): Promise<void> {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "ADMIN_EMAIL et ADMIN_PASSWORD doivent être définis dans .env avant le seed.",
    );
  }

  // --- Compte admin unique (upsert : le seed est rejouable) ---
  const hashed = await bcrypt.hash(password, 12);
  await prisma.admin.upsert({
    where: { email },
    update: { password: hashed },
    create: { email, password: hashed },
  });
  console.log(`✓ admin  → ${email}`);

  // --- Catégories ---
  const categories = [
    { name: "Data Analysis", slug: "data-analysis" },
    { name: "Data Engineering", slug: "data-engineering" },
    { name: "Machine Learning", slug: "machine-learning" },
    { name: "Dataviz", slug: "dataviz" },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: { name: category.name },
      create: category,
    });
  }
  console.log(`✓ ${categories.length} catégories`);

  const bySlug = async (slug: string): Promise<string> =>
    (await prisma.category.findUniqueOrThrow({ where: { slug } })).id;

  const [engineering, analysis, ml, dataviz] = await Promise.all([
    bySlug("data-engineering"),
    bySlug("data-analysis"),
    bySlug("machine-learning"),
    bySlug("dataviz"),
  ]);

  // --- Projets de démonstration ---
  const projects = [
    {
      title: "Pipeline ETL ventes",
      slug: "pipeline-etl-ventes",
      description:
        "Ingestion quotidienne de 12 sources hétérogènes vers un entrepôt Postgres, orchestrée avec Airflow.",
      content: [
        "## Contexte",
        "",
        "Les données de ventes arrivaient par mail, en CSV, avec des schémas divergents.",
        "L'objectif : un socle unique, testé et rejouable.",
        "",
        "## Architecture",
        "",
        "1. **Extraction** — connecteurs Python (API REST, SFTP, CSV)",
        "2. **Transformation** — dbt, modèles en couches `staging` / `intermediate` / `marts`",
        "3. **Chargement** — Postgres, partitionnement mensuel",
        "4. **Orchestration** — Airflow, un DAG par domaine",
        "",
        "## Résultat",
        "",
        "Le rapport hebdomadaire est passé de 4 h de retraitement manuel à une exécution automatique de 9 minutes.",
      ].join("\n"),
      techStack: json(["Python", "Airflow", "dbt", "PostgreSQL", "Docker"]),
      repoUrl: "https://github.com/",
      featured: true,
      metrics: json({
        "Sources ingérées": "12",
        "Volume / jour": "4,2 M lignes",
        "Temps de run": "9 min",
        "Couverture tests": "87 %",
      }),
      categoryId: engineering,
    },
    {
      title: "Analyse du churn abonnés",
      slug: "analyse-churn-abonnes",
      description:
        "Segmentation de 45 000 abonnés et identification des trois signaux qui précèdent une résiliation.",
      content: [
        "## Problème",
        "",
        "Le churn mensuel plafonnait à 6,4 % sans explication claire.",
        "",
        "## Méthode",
        "",
        "- Nettoyage et consolidation SQL des événements produit",
        "- Analyse de survie (Kaplan-Meier) par cohorte d'inscription",
        "- Régression logistique pour hiérarchiser les facteurs",
        "",
        "## Signaux détectés",
        "",
        "| Signal | Poids |",
        "| --- | --- |",
        "| Moins de 2 connexions / mois | fort |",
        "| Aucun usage de la fonctionnalité clé | fort |",
        "| Ticket support non résolu | moyen |",
      ].join("\n"),
      techStack: json(["Python", "pandas", "scikit-learn", "SQL", "Power BI"]),
      repoUrl: null,
      featured: true,
      metrics: json({
        "Abonnés analysés": "45 000",
        "Churn initial": "6,4 %",
        "AUC modèle": "0,81",
      }),
      categoryId: analysis,
    },
    {
      title: "Détection d'anomalies capteurs",
      slug: "detection-anomalies-capteurs",
      description:
        "Modèle non supervisé qui isole les dérives de 340 capteurs industriels avant la panne.",
      content: [
        "## Objectif",
        "",
        "Anticiper la panne plutôt que la constater.",
        "",
        "## Approche",
        "",
        "- Fenêtres glissantes sur les séries temporelles",
        "- Isolation Forest puis seuillage par capteur",
        "- Alerte poussée dans le canal de maintenance",
        "",
        "## Limite connue",
        "",
        "Le modèle reste aveugle aux pannes brutales sans signal précurseur.",
      ].join("\n"),
      techStack: json(["Python", "scikit-learn", "Kafka", "Grafana"]),
      repoUrl: null,
      featured: false,
      metrics: json({
        "Capteurs suivis": "340",
        "Préavis moyen": "36 h",
        "Faux positifs": "4 %",
      }),
      categoryId: ml,
    },
    {
      title: "Dashboard logistique temps réel",
      slug: "dashboard-logistique",
      description:
        "Suivi des expéditions de 6 entrepôts, du taux de service et des retards par transporteur.",
      content: [
        "## Besoin",
        "",
        "Les équipes terrain n'avaient aucune vision consolidée.",
        "",
        "## Livrable",
        "",
        "Un dashboard rafraîchi toutes les 15 minutes, une page par entrepôt,",
        "et une vue direction avec les trois indicateurs qui comptent.",
      ].join("\n"),
      techStack: json(["Power BI", "SQL", "DAX"]),
      repoUrl: null,
      featured: false,
      metrics: json({
        Entrepôts: "6",
        "Taux de service": "94,8 %",
        Rafraîchissement: "15 min",
      }),
      categoryId: dataviz,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: project,
    });
  }
  console.log(`✓ ${projects.length} projets de démonstration`);

  // --- Commentaires : un approuvé, un en attente de modération ---
  if ((await prisma.comment.count()) === 0) {
    const pipeline = await prisma.project.findUniqueOrThrow({
      where: { slug: "pipeline-etl-ventes" },
    });
    const churn = await prisma.project.findUniqueOrThrow({
      where: { slug: "analyse-churn-abonnes" },
    });

    await prisma.comment.createMany({
      data: [
        {
          content: "Le découpage dbt en trois couches est très clair, merci.",
          authorName: "Camille",
          approved: true,
          projectId: pipeline.id,
        },
        {
          content:
            "Quelle taille de fenêtre as-tu retenue pour l'analyse de survie ?",
          authorName: "Yanis",
          approved: false,
          projectId: churn.id,
        },
      ],
    });
    console.log("✓ 2 commentaires (1 approuvé, 1 en attente)");
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
