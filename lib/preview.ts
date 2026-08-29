/**
 * MODE APERÇU — à supprimer une fois la base connectée.
 *
 * Quand PostgreSQL est injoignable (pas de DATABASE_URL, base non démarrée),
 * les pages publiques basculent sur ce jeu de données pour rester consultables.
 * Aucune page admin n'utilise ce module : l'admin exige une vraie base.
 */

export type PreviewProject = {
  slug: string;
  title: string;
  description: string;
  content: string;
  techStack: string[];
  featured: boolean;
  liveUrl: string | null;
  repoUrl: string | null;
  metrics: Record<string, string>;
  category: { name: string; slug: string };
  commentCount: number;
  updatedAt: Date;
};

export const previewCategories = [
  { id: "c1", name: "Data Analysis", slug: "data-analysis", projectCount: 1 },
  { id: "c2", name: "Data Engineering", slug: "data-engineering", projectCount: 1 },
  { id: "c3", name: "Machine Learning", slug: "machine-learning", projectCount: 1 },
  { id: "c4", name: "Dataviz", slug: "dataviz", projectCount: 1 },
];

export const previewProjects: PreviewProject[] = [
  {
    slug: "pipeline-etl-ventes",
    title: "Pipeline ETL ventes",
    description:
      "Ingestion quotidienne de 12 sources hétérogènes vers un entrepôt Postgres, orchestrée avec Airflow.",
    content:
      "## Contexte\n\nLes données de ventes arrivaient par mail, en CSV, avec des schémas divergents.\n\n## Architecture\n\n1. **Extraction** — connecteurs Python (API REST, SFTP, CSV)\n2. **Transformation** — dbt, modèles `staging` / `intermediate` / `marts`\n3. **Chargement** — Postgres, partitionnement mensuel\n4. **Orchestration** — Airflow, un DAG par domaine\n\n## Résultat\n\nLe rapport hebdomadaire est passé de 4 h de retraitement manuel à une exécution automatique de 9 minutes.",
    techStack: ["Python", "Airflow", "dbt", "PostgreSQL", "Docker"],
    featured: true,
    liveUrl: null,
    repoUrl: "https://github.com/",
    metrics: {
      "Sources ingérées": "12",
      "Volume / jour": "4,2 M lignes",
      "Temps de run": "9 min",
      "Couverture tests": "87 %",
    },
    category: { name: "Data Engineering", slug: "data-engineering" },
    commentCount: 1,
    updatedAt: new Date("2026-08-20"),
  },
  {
    slug: "analyse-churn-abonnes",
    title: "Analyse du churn abonnés",
    description:
      "Segmentation de 45 000 abonnés et identification des trois signaux qui précèdent une résiliation.",
    content:
      "## Problème\n\nLe churn mensuel plafonnait à 6,4 % sans explication claire.\n\n## Méthode\n\n- Nettoyage et consolidation SQL des événements produit\n- Analyse de survie (Kaplan-Meier) par cohorte d'inscription\n- Régression logistique pour hiérarchiser les facteurs\n\n## Signaux détectés\n\n| Signal | Poids |\n| --- | --- |\n| Moins de 2 connexions / mois | fort |\n| Aucun usage de la fonctionnalité clé | fort |\n| Ticket support non résolu | moyen |",
    techStack: ["Python", "pandas", "scikit-learn", "SQL", "Power BI"],
    featured: true,
    liveUrl: null,
    repoUrl: null,
    metrics: {
      "Abonnés analysés": "45 000",
      "Churn initial": "6,4 %",
      "AUC modèle": "0,81",
    },
    category: { name: "Data Analysis", slug: "data-analysis" },
    commentCount: 2,
    updatedAt: new Date("2026-08-24"),
  },
  {
    slug: "detection-anomalies-capteurs",
    title: "Détection d'anomalies capteurs",
    description:
      "Modèle non supervisé qui isole les dérives de 340 capteurs industriels avant la panne.",
    content:
      "## Objectif\n\nAnticiper la panne plutôt que la constater.\n\n## Approche\n\n- Fenêtres glissantes sur les séries temporelles\n- Isolation Forest puis seuillage par capteur\n- Alerte poussée dans le canal de maintenance",
    techStack: ["Python", "scikit-learn", "Kafka", "Grafana"],
    featured: false,
    liveUrl: null,
    repoUrl: null,
    metrics: {
      "Capteurs suivis": "340",
      "Préavis moyen": "36 h",
      "Faux positifs": "4 %",
    },
    category: { name: "Machine Learning", slug: "machine-learning" },
    commentCount: 0,
    updatedAt: new Date("2026-08-12"),
  },
  {
    slug: "dashboard-logistique",
    title: "Dashboard logistique temps réel",
    description:
      "Suivi des expéditions de 6 entrepôts, du taux de service et des retards par transporteur.",
    content:
      "## Besoin\n\nLes équipes terrain n'avaient aucune vision consolidée.\n\n## Livrable\n\nUn dashboard rafraîchi toutes les 15 minutes, une page par entrepôt, et une vue direction avec les trois indicateurs qui comptent.",
    techStack: ["Power BI", "SQL", "DAX"],
    featured: false,
    liveUrl: null,
    repoUrl: null,
    metrics: {
      Entrepôts: "6",
      "Taux de service": "94,8 %",
      Rafraîchissement: "15 min",
    },
    category: { name: "Dataviz", slug: "dataviz" },
    commentCount: 0,
    updatedAt: new Date("2026-07-30"),
  },
];

export const previewComments = [
  {
    id: "pc1",
    authorName: "Camille",
    content: "Le découpage dbt en trois couches est très clair, merci.",
    createdAt: new Date("2026-08-21"),
  },
];

/** Exécute une requête base ; renvoie la valeur de repli si la base est injoignable. */
export async function withFallback<T>(
  query: () => Promise<T>,
  fallback: T,
): Promise<{ data: T; offline: boolean }> {
  try {
    return { data: await query(), offline: false };
  } catch {
    return { data: fallback, offline: true };
  }
}
