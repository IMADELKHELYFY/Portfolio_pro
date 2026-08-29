import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

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

  // --- Projets de démonstration ---
  const engineering = await prisma.category.findUniqueOrThrow({
    where: { slug: "data-engineering" },
  });
  const analysis = await prisma.category.findUniqueOrThrow({
    where: { slug: "data-analysis" },
  });

  const pipeline = await prisma.project.upsert({
    where: { slug: "pipeline-etl-ventes" },
    update: {},
    create: {
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
      techStack: ["Python", "Airflow", "dbt", "PostgreSQL", "Docker"],
      repoUrl: "https://github.com/",
      featured: true,
      metrics: {
        "Sources ingérées": "12",
        "Volume / jour": "4,2 M lignes",
        "Temps de run": "9 min",
        "Couverture tests": "87 %",
      },
      categoryId: engineering.id,
    },
  });

  const churn = await prisma.project.upsert({
    where: { slug: "analyse-churn-abonnes" },
    update: {},
    create: {
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
      techStack: ["Python", "pandas", "scikit-learn", "SQL", "Power BI"],
      featured: true,
      metrics: {
        "Abonnés analysés": "45 000",
        "Churn initial": "6,4 %",
        "AUC modèle": "0,81",
      },
      categoryId: analysis.id,
    },
  });

  console.log("✓ 2 projets de démonstration");

  // --- Commentaires : un approuvé, un en attente de modération ---
  const existingComments = await prisma.comment.count();
  if (existingComments === 0) {
    await prisma.comment.createMany({
      data: [
        {
          content: "Le découpage dbt en trois couches est très clair, merci.",
          authorName: "Camille",
          approved: true,
          projectId: pipeline.id,
        },
        {
          content: "Quelle taille de fenêtre as-tu retenue pour l'analyse de survie ?",
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
