/**
 * Contenu éditorial du portfolio — source unique pour la page « À propos ».
 * Modifie ce fichier pour mettre à jour ton parcours : aucune autre page ne
 * duplique ces informations.
 */

export const profile = {
  name: "Imad EL KHELYFY",
  role: "Data Analyst / Data Engineer",
  location: "Calais (62)",
  email: "imadelkhelyfy@gmail.com",
  phone: "+33 7 58 42 11 76",
  linkedin: "https://www.linkedin.com/in/imad-el-khelyfy-4514ba312/",
  github: "https://github.com/IMADELKHELYFY",
  availability:
    "Alternance 12 ou 24 mois à partir du 01/09/2026 · Mobile France entière · Permis B",
  intro:
    "Master Data & IA. Je conçois des pipelines de données fiables et des analyses qui se terminent par une décision, pas par un graphique de plus. Actuellement en stage chez Renault Group sur les données d'usage de véhicules connectés.",
} as const;

export type Experience = {
  role: string;
  company: string;
  period: string;
  current?: boolean;
  highlights: string[];
  stack: string[];
};

export const experiences: Experience[] = [
  {
    role: "Stagiaire Data Analyst — Usage véhicules connectés",
    company: "Renault Group, Aubevoye",
    period: "Juin 2026 – Août 2026",
    current: true,
    highlights: [
      "Traitement et analyse de grandes masses de données remontées des véhicules connectés",
      "Contrôle qualité des données pour le profilage des missions véhicules et la fiabilité",
      "Inférence statistique appliquée aux plans de validation (viabilité d'échantillons)",
      "Formalisation des critères de qualité de données pour la durabilité",
    ],
    stack: ["Python", "Spotfire", "Excel avancé", "Statistiques", "Big Data"],
  },
  {
    role: "Stagiaire Data Analyst / Data Engineer",
    company: "CERIMME, Casablanca",
    period: "Août 2024 – Sept. 2024",
    highlights: [
      "Extraction de données via SQL/Python — délais de traitement réduits de 35 %",
      "Détection d'anomalies par scripts de Data Quality — erreurs réduites de 40 %",
      "Dashboards Power BI interactifs pour le pilotage d'activité",
      "Automatisation de pipelines ETL et documentation technique",
    ],
    stack: ["Python", "SQL", "Power BI", "ETL"],
  },
  {
    role: "Stagiaire Support Informatique / DevOps",
    company: "CERIMME, Casablanca",
    period: "Mai–Juin 2023 · Août–Sept. 2022",
    highlights: [
      "Déploiement d'environnements conteneurisés — mise en production réduite de 30 %",
      "Monitoring d'infrastructure et tableaux de bord SQL temps réel",
    ],
    stack: ["Git", "Docker", "Zabbix", "SQL", "Linux"],
  },
];

export type Education = {
  degree: string;
  school: string;
  place: string;
  period: string;
};

export const education: Education[] = [
  {
    degree: "Master 1 Ingénierie des Systèmes Complexes",
    school: "EILCO",
    place: "Calais, France",
    period: "2025 – en cours",
  },
  {
    degree: "Master 1 Sciences des Données et IA",
    school: "Faculté des Sciences",
    place: "Meknès, Maroc",
    period: "2024 – 2025",
  },
  {
    degree: "Licence Sciences des Données et IA",
    school: "Faculté des Sciences",
    place: "Meknès, Maroc",
    period: "2023 – 2024",
  },
  {
    degree: "BTS Systèmes et Réseaux Informatiques",
    school: "Lycée Ibn Al-Khatib",
    place: "Maroc",
    period: "2021 – 2023",
  },
];

export const stack: Record<string, string[]> = {
  "IA & Data Science": [
    "Scikit-learn",
    "LangChain",
    "RAG / GraphRAG",
    "LLMs",
    "TensorFlow",
    "NLP",
  ],
  "Big Data & Orchestration": [
    "Apache Spark",
    "PySpark",
    "Hadoop",
    "Airflow",
    "Databricks",
  ],
  "Cloud": ["AWS (S3, Glue, Redshift, Lambda)", "GCP", "Snowflake"],
  "Données & ETL": [
    "SQL avancé",
    "PostgreSQL",
    "Neo4j",
    "dbt",
    "Data Lake",
    "Data Warehouse",
  ],
  "Langages": ["Python", "Java", "TypeScript", "Bash"],
  "Dataviz & Reporting": ["Power BI", "Tableau", "Spotfire", "Streamlit"],
  "DevOps": ["Git", "Docker", "CI/CD", "Linux", "n8n"],
};

export const certifications = [
  { issuer: "IBM", title: "Fundamentals of AI Agents Using RAG and LangChain" },
  { issuer: "IBM", title: "Data Engineering : Pipelines, ETL, Hadoop" },
  { issuer: "IBM", title: "Python for Data Science, AI & Development" },
  { issuer: "AWS", title: "Cloud Technical Essentials" },
  { issuer: "Google", title: "Agile Project Management" },
  { issuer: "Cisco", title: "Introduction to Data Science" },
];

export const languages = [
  { name: "Français", level: "C1 — courant" },
  { name: "Anglais", level: "C1 — professionnel" },
  { name: "Arabe", level: "Langue maternelle" },
  { name: "Allemand", level: "Notions" },
];

export const method = [
  {
    step: "01",
    title: "Cadrer",
    body: "Partir de la question métier et de la décision qu'elle doit éclairer, avant de toucher à la moindre donnée.",
  },
  {
    step: "02",
    title: "Construire",
    body: "Pipelines versionnés, contrôles de qualité en amont, modèle de données documenté.",
  },
  {
    step: "03",
    title: "Restituer",
    body: "Un chiffre lisible, une visualisation sobre, et l'incertitude dite explicitement.",
  },
];
