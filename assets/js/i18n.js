/* ===========================================================================
   Portfolio — Imad EL KHELYFY
   Traductions FR / EN + préférences (langue, thème).

   Deux mécaniques, volontairement dans le même fichier parce qu'elles
   partagent le même stockage et les mêmes commutateurs :

   1. DICTIONNAIRE — `I18N.fr` / `I18N.en`, appliqué aux éléments portant
      `data-i18n="clé"` (innerHTML, donc le balisage riche est permis) et
      `data-i18n-aria="clé"` (aria-label).
   2. PRÉFÉRENCES — langue et thème, persistés dans localStorage, exposés
      via `window.PF`. Le thème initial est déjà posé par le script inline
      de l'en-tête ; ici on ne fait que le commuter.

   Le changement de langue émet `pf:lang` sur `document` : c'est ce que
   case-view.js écoute pour redessiner les études de cas.
   =========================================================================== */

window.I18N = {

/* ═══════════════════════════════ FRANÇAIS ═══════════════════════════════ */
fr: {
  "meta.title": "Imad EL KHELYFY — Data Analyst / Data Engineer",
  "meta.desc": "Portfolio d'Imad EL KHELYFY : pipelines de données, machine learning et IA générative. Sept études de cas analytiques complètes, parcours et contact.",

  "a11y.lang": "Langue",
  "a11y.theme": "Changer de thème",
  "a11y.menu": "Ouvrir le menu",
  "a11y.contact": "Contact",
  "dock.mail": "Email",
  "ui.cv": "CV (PDF)",
  "ui.cvFr": "CV — français (PDF)",
  "ui.cvEn": "CV — anglais (PDF)",

  "nav.parcours": "parcours",
  "nav.projets": "projets",
  "nav.stack": "compétences",
  "nav.certs": "certifications",
  "certs.label": "04 — certifications",
  "nav.contact": "contact",

  "hero.eyebrow": "portfolio / data &amp; ia",
  "hero.lead": "Je construis des systèmes data et IA de bout en bout : des pipelines qui tiennent, des modèles évalués honnêtement, des applications LLM qui survivent à la production. Sept études de cas, code compris.",
  "hero.chip3": "IA générative",
  "hero.cta1": "Voir les projets",
  "hero.cta2": "Me contacter",
  "hero.scroll": "faire défiler",


  "parcours.label": "01 — parcours",
  "parcours.title": "Expériences",
  "exp1.role": "Stagiaire Data Analyst — Usage véhicules connectés",
  "exp1.date": "Juin 2026 – Août 2026",
  "exp1.b1": "Traitement et analyse de grandes masses de données remontées des véhicules connectés",
  "exp1.b2": "Contrôle qualité des données pour le profilage des missions véhicules et la fiabilité",
  "exp1.b3": "Inférence statistique appliquée aux plans de validation (viabilité d'échantillons)",
  "exp1.b4": "Formalisation des critères de qualité de données pour la durabilité",
  "exp2.role": "Stagiaire Data Analyst / Data Engineer",
  "exp2.date": "Août 2024 – Sept. 2024",
  "exp2.b1": "Extraction de données via SQL / Python — délais réduits de <strong class=\"text-white\">35 %</strong>",
  "exp2.b2": "Détection d'anomalies par scripts de Data Quality — erreurs réduites de <strong class=\"text-white\">40 %</strong>",
  "exp2.b3": "Dashboards Power BI interactifs pour le pilotage d'activité",
  "exp2.b4": "Automatisation de pipelines ETL et documentation technique",
  "exp3.role": "Stagiaire Support Informatique / DevOps",
  "exp3.date": "Mai–Juin 2023 · Août–Sept. 2022",
  "exp3.b1": "Déploiement d'environnements conteneurisés — mise en production réduite de <strong class=\"text-white\">30 %</strong>",
  "exp3.b2": "Monitoring d'infrastructure et tableaux de bord SQL temps réel",

  "formation.title": "Formation",
  "edu1.title": "Master Ingénierie des Systèmes Complexes",
  "edu1.sub": "EILCO — Calais, France",
  "edu1.date": "2025 – en cours",
  "edu2.title": "Master 1 Sciences des Données et IA",
  "edu2.sub": "Faculté des Sciences — Meknès, Maroc",
  "edu2.date": "2024 – 2025",
  "edu3.title": "Licence Sciences des Données et IA",
  "edu3.date": "2023 – 2024",
  "edu4.title": "BTS Systèmes et Réseaux Informatiques",
  "edu4.sub": "Lycée Ibn Al-Khatib — Maroc",
  "edu4.date": "2021 – 2023",

  "projets.label": "02 — projets",
  "projets.title": "Chaque projet part d'un problème réel, pas d'un jeu de données.",
  "projets.hint": "Le visuel de droite suit le projet en cours de lecture. Les sept projets data s'ouvrent en étude complète : contexte, méthode, captures, recommandations.",

  "step1.index": "projet 01",
  "step1.title": "GraphRAG vs Simple RAG",
  "step1.body1": "Deux façons de retrouver l'information pour un LLM : la recherche vectorielle classique, et un graphe de connaissances structuré. J'ai construit les deux pour les comparer sur des questions à raisonnement multi-étapes, là où le RAG simple perd le fil.",
  "step1.body2": "Le graphe relie entités et relations dans Neo4j ; un PageRank pondère les nœuds pour ne remonter que le contexte qui compte. Sur les questions liant plusieurs documents, la pertinence du contexte remonté devient nettement supérieure.",
  "step2.index": "projet 02",
  "step2.title": "GuardianFlow — détection de blanchiment",
  "step2.body1": "Une chaîne complète de surveillance financière : ingestion des transactions, feature engineering, entraînement du modèle, puis restitution. Le modèle atteint <strong class=\"text-white\">92 % de précision</strong> sur la détection de comportements suspects.",
  "step2.body2": "L'intérêt du projet n'est pas le score : c'est la chaîne de bout en bout — API REST en Flask, stockage PostgreSQL, conteneurisation Docker, et un dashboard où un analyste peut réellement instruire une alerte.",
  "step3.index": "projet 08",
  "step3.title": "Intelligent Event Bot",
  "step3.body1": "Un pipeline événementiel orchestré avec n8n : détection d'un événement, génération du contenu marketing par IA, personnalisation, envoi. Le traitement manuel a chuté de <strong class=\"text-white\">60 %</strong>.",
  "step3.body2": "Architecture pilotée par les événements plutôt que par un planificateur : chaque étape est indépendante, rejouable, et observable — on sait toujours où un message s'est arrêté.",
  "step4.index": "projet 09",
  "step4.title": "EduChatbot — mentor IA",
  "step4.body1": "Une plateforme qui génère des parcours d'apprentissage en data science adaptés au niveau réel de la personne, avec un tuteur conversationnel disponible à chaque étape.",
  "step4.body2": "Intégration LLM de bout en bout : cadrage du prompt, structuration de la réponse en étapes exploitables, et interface Streamlit assez simple pour qu'un débutant s'en serve sans mode d'emploi.",
  "step5.index": "projet 05",
  "step5.title": "MCP Platform",
  "step5.body1": "Une architecture distribuée implémentant le Model Context Protocol : elle permet à un LLM d'appeler des outils tiers de façon standardisée et contrôlée, au lieu d'intégrations ad hoc qui cassent à chaque changement.",
  "step5.body2": "Trois briques qui se parlent — serveur Spring Boot, interface Angular, outils Python — avec Ollama en modèle local. Approche API-first, contrat explicite entre les services.",

  "svg.graphrag": "graphe de connaissances · PageRank",
  "svg.aml": "précision · alerte levée sur TX-4419",
  "svg.bot": "de traitement manuel · orchestré par n8n",
  "svg.edu": "parcours personnalisé · Gemini + Streamlit",
  "svg.mcp": "protocole standardisé entre LLM et outils",
  "svg.detect": "détection",
  "svg.generate": "génération",
  "svg.render": "rendu",
  "svg.send": "envoi",
  "svg.event": "événement",
  "svg.template": "template",
  "svg.email": "email",
  "svg.tools": "outils Python",
  "svg.server": "serveur MCP",
  "svg.eduQuestion": "« Je pars de zéro en data »",
  "svg.eduAnswer": "Roadmap en 4 étapes générée",
  "svg.edu1": "01 · Python &amp; manipulation de données",
  "svg.edu2": "02 · SQL et modélisation",
  "svg.edu3": "03 · Statistiques appliquées",
  "svg.edu4": "04 · Machine learning",


  "stack.label": "03 — compétences",
  "stack.title": "Compétences",
  "stackg1": "Langages &amp; bases de données",
  "stackg2": "Data engineering &amp; ETL",
  "stackg3": "Cloud &amp; entrepôts",
  "stackg4": "IA &amp; machine learning",
  "stackg5": "Dataviz &amp; restitution",
  "stackg6": "Suite Microsoft",
  "stackg7": "DevOps &amp; méthode",
  "certs.title": "Certifications",
  "cert7": "Sales and CRM Overview",
  "cert1": "AI Agents Using RAG and LangChain",
  "cert2": "Data Engineering : Pipelines, ETL, Hadoop",
  "cert3": "Python for Data Science, AI &amp; Development",
  "cert4": "Cloud Technical Essentials",
  "cert5": "Agile Project Management",
  "cert6": "Introduction to Data Science",
  "langues.title": "Langues",
  "lg1.name": "Français", "lg1.level": "C1",
  "lg2.name": "Anglais",  "lg2.level": "C1",
  "lg4.name": "Allemand", "lg4.level": "notions",

  "contact.label": "05 — contact",
  "contact.title": "Parlons de votre sujet data<span class=\"text-brand-500\">.</span>",
  "contact.lead": "Une question, un projet, une collaboration : le plus simple reste un mail. Je réponds vite et volontiers.",

  /* — Lecteur d'études de cas — */
  "ui.sec1.title": "Problème business",
  "ui.sec1.head": "Ce qui ne marchait pas",
  "ui.sec1.hint": "Le point de départ : la situation réelle, son coût, et pourquoi les réflexes habituels ne la résolvent pas.",
  "ui.sec2.title": "Contexte",
  "ui.sec2.head": "L'entreprise, le modèle, mon rôle",
  "ui.sec2.hint": "Qui est l'entreprise, comment elle gagne de l'argent, et à quel titre j'intervenais.",
  "ui.sec3.title": "Questions à résoudre",
  "ui.sec3.head": "Les trois questions business",
  "ui.sec3.hint": "Les questions telles qu'un décideur les pose. Tout ce qui suit n'existe que pour y répondre.",
  "ui.sec4.title": "Dataset",
  "ui.sec4.head": "Les données utilisées",
  "ui.sec4.hint": "Origine, volume, colonnes et parti pris de génération. Ce que le jeu de données contient — et ce qu'il ne contient volontairement pas.",
  "ui.sec5.title": "Méthodologie",
  "ui.sec5.head": "Le cadre 3×3 et la chaîne de traitement",
  "ui.sec5.hint": "Trois métriques et trois dimensions choisies avant d'écrire la première ligne de code. Le code, les difficultés et les limites sont repliés en fin de section.",
  "ui.sec6.title": "Résultats",
  "ui.sec6.head": "Les chiffres, puis les écrans qui les montrent",
  "ui.sec6.hint": "Captures réelles de l'application sur le jeu de données livré. Chaque figure porte un titre narratif qui donne la conclusion, puis une note de lecture.",
  "ui.sec7.title": "Insights business",
  "ui.sec7.head": "Ce que les chiffres veulent dire",
  "ui.sec7.hint": "Chaque analyse suit la même structure : la donnée chiffrée, ce qu'elle implique, le moteur qui l'explique, et l'équipe à embarquer.",
  "ui.sec8.title": "Stack technique",
  "ui.sec8.head": "Ce qui a servi à le construire",
  "ui.sec8.hint": "Les outils réellement utilisés sur ce projet, pas une liste de compétences.",
  "ui.sec9.title": "Recommandations",
  "ui.sec9.head": "Ce qu'il faut faire, par qui, et comment le mesurer",
  "ui.sec9.hint": "Ce qui relie l'analyse à des actions réelles : une action, sa priorité, l'impact attendu, l'équipe qui la porte et la métrique qui dira si elle a marché.",
  "ui.sec10.title": "GitHub / démonstration",
  "ui.sec10.head": "Voir le code, lancer l'application",
  "ui.sec10.hint": "Le dépôt et la commande pour faire tourner le projet en local.",
  "ui.ds.source": "Origine",
  "ui.ds.volume": "Volume",
  "ui.ds.fields": "Colonnes",
  "ui.ds.note": "Parti pris",
  "ui.stackTools": "Outils du projet",
  "ui.repo": "Voir le dépôt GitHub",
  "ui.demo": "Démonstration en ligne",
  "ui.repoSoon": "Le dépôt public n'est pas encore publié pour ce projet. En attendant, l'application se lance en local avec la commande ci-dessous.",
  "ui.wakeNote": "Première ouverture : l'hébergement gratuit met l'application en veille après une periode sans visite. Compte environ 50 secondes de réveil — l'onglet reste blanc pendant ce temps, c'est normal.",
  "ui.runLocal": "Lancer en local",
  "ui.codeGithub": "Voir le code sur GitHub",
  "ui.demoLive": "Voir la démonstration",
  "ui.openCase": "ouvrir l'étude complète",
  "ui.back": "projets",
  "ui.study": "projet",
  "ui.ctx.secteur": "Secteur",
  "ui.ctx.modele": "Modèle métier",
  "ui.ctx.role": "Mon rôle",
  "ui.ctx.perimetre": "Périmètre analysé",
  "ui.ctx.calcul": "Temps de calcul",
  "ui.ctx.stack": "Stack technique",
  "ui.metrics": "3 métriques Northstar",
  "ui.metricsBadge": "métriques",
  "ui.dimensions": "3 dimensions de découpage",
  "ui.dimensionsBadge": "dimensions",
  "ui.figure": "figure",
  "ui.howToRead": "Comment la lire",
  "ui.zoom": "agrandir",
  "ui.insData": "La donnée quantifiée",
  "ui.insSoWhat": "So what — la conséquence business",
  "ui.insDriver": "Le moteur de variation",
  "ui.mxAction": "Recommandation",
  "ui.mxPrio": "Priorité",
  "ui.mxImpact": "Impact attendu",
  "ui.mxOwner": "Équipe responsable",
  "ui.mxKpi": "Métrique à suivre",
  "ui.annexToggle": "Accéder au code, aux difficultés rencontrées et aux limites assumées",
  "ui.annexExtraits": "extraits",
  "ui.annexDiff": "difficultés",
  "ui.annexLimites": "limites",
  "ui.copy": "copier",
  "ui.copied": "copié",
  "ui.difficulties": "Difficultés rencontrées &amp; solutions",
  "ui.limits": "Limites assumées",
  "ui.prev": "projet précédent",
  "ui.next": "projet suivant",
  "ui.lbPrev": "Figure précédente",
  "ui.lbNext": "Figure suivante",
  "ui.lbClose": "Fermer",
  "prio.Haute": "Haute",
  "prio.Moyenne": "Moyenne",
  "prio.Basse": "Basse"
},

/* ═══════════════════════════════ ENGLISH ════════════════════════════════ */
en: {
  "stackg1": "Languages &amp; databases",
  "stackg2": "Data engineering &amp; ETL",
  "stackg3": "Cloud &amp; warehouses",
  "stackg4": "AI &amp; machine learning",
  "stackg5": "Dataviz &amp; reporting",
  "stackg6": "Microsoft suite",
  "stackg7": "DevOps &amp; method",
  "meta.title": "Imad EL KHELYFY — Data Analyst / Data Engineer",
  "meta.desc": "Imad EL KHELYFY's portfolio: data pipelines, machine learning and generative AI. Seven complete analytics case studies, background and contact.",

  "a11y.lang": "Language",
  "a11y.theme": "Switch theme",
  "a11y.menu": "Open menu",
  "a11y.contact": "Contact",
  "dock.mail": "Email",
  "ui.cv": "Resume (PDF)",
  "ui.cvFr": "Resume — French (PDF)",
  "ui.cvEn": "Resume — English (PDF)",

  "nav.parcours": "background",
  "nav.projets": "projects",
  "nav.stack": "skills",
  "nav.certs": "certifications",
  "certs.label": "04 — certifications",
  "nav.contact": "contact",

  "hero.eyebrow": "portfolio / data &amp; ai",
  "hero.lead": "I build data and AI systems end to end: ingestion pipelines that hold, models evaluated honestly, LLM applications that survive production. Seven case studies, code included.",
  "hero.chip3": "Generative AI",
  "hero.cta1": "See the projects",
  "hero.cta2": "Get in touch",
  "hero.scroll": "scroll",


  "parcours.label": "01 — background",
  "parcours.title": "Experience",
  "exp1.role": "Data Analyst Intern — Connected-vehicle usage",
  "exp1.date": "June 2026 – Aug. 2026",
  "exp1.b1": "Processing and analysis of large volumes of telemetry from connected vehicles",
  "exp1.b2": "Data quality control for vehicle mission profiling and reliability engineering",
  "exp1.b3": "Statistical inference applied to validation plans (sample viability)",
  "exp1.b4": "Formalising data-quality criteria for durability assessment",
  "exp2.role": "Data Analyst / Data Engineer Intern",
  "exp2.date": "Aug. 2024 – Sept. 2024",
  "exp2.b1": "Data extraction via SQL / Python — lead times cut by <strong class=\"text-white\">35%</strong>",
  "exp2.b2": "Anomaly detection through data-quality scripts — errors cut by <strong class=\"text-white\">40%</strong>",
  "exp2.b3": "Interactive Power BI dashboards for operational steering",
  "exp2.b4": "ETL pipeline automation and technical documentation",
  "exp3.role": "IT Support / DevOps Intern",
  "exp3.date": "May–June 2023 · Aug.–Sept. 2022",
  "exp3.b1": "Containerised environment deployment — time to production cut by <strong class=\"text-white\">30%</strong>",
  "exp3.b2": "Infrastructure monitoring and real-time SQL dashboards",

  "formation.title": "Education",
  "edu1.title": "MSc — Complex Systems Engineering",
  "edu1.sub": "EILCO — Calais, France",
  "edu1.date": "2025 – ongoing",
  "edu2.title": "MSc 1 — Data Science and AI",
  "edu2.sub": "Faculty of Sciences — Meknes, Morocco",
  "edu2.date": "2024 – 2025",
  "edu3.title": "BSc — Data Science and AI",
  "edu3.date": "2023 – 2024",
  "edu4.title": "Higher Technician Diploma — Systems and Networks",
  "edu4.sub": "Ibn Al-Khatib High School — Morocco",
  "edu4.date": "2021 – 2023",

  "projets.label": "02 — projects",
  "projets.title": "Every project starts from a real problem, not from a dataset.",
  "projets.hint": "The visual on the right follows the project you are reading. The seven data projects open as full case studies: context, method, screenshots, recommendations.",

  "step1.index": "project 01",
  "step1.title": "GraphRAG vs Simple RAG",
  "step1.body1": "Two ways of retrieving information for an LLM: classic vector search, and a structured knowledge graph. I built both to compare them on multi-hop reasoning questions — exactly where simple RAG loses the thread.",
  "step1.body2": "The graph links entities and relations in Neo4j; a PageRank weighting keeps only the context that matters. On questions spanning several documents, the relevance of the retrieved context is markedly higher.",
  "step2.index": "project 02",
  "step2.title": "GuardianFlow — money-laundering detection",
  "step2.body1": "A complete financial-surveillance chain: transaction ingestion, feature engineering, model training, then reporting. The model reaches <strong class=\"text-white\">92% precision</strong> on suspicious-behaviour detection.",
  "step2.body2": "The point of the project isn't the score — it's the end-to-end chain: a Flask REST API, PostgreSQL storage, Docker containerisation, and a dashboard where an analyst can actually work an alert.",
  "step3.index": "project 08",
  "step3.title": "Intelligent Event Bot",
  "step3.body1": "An event-driven pipeline orchestrated with n8n: event detection, AI-generated marketing content, personalisation, delivery. Manual handling dropped by <strong class=\"text-white\">60%</strong>.",
  "step3.body2": "Event-driven rather than scheduler-driven: every step is independent, replayable and observable — you always know where a message stopped.",
  "step4.index": "project 09",
  "step4.title": "EduChatbot — AI mentor",
  "step4.body1": "A platform that generates data-science learning paths matched to the learner's actual level, with a conversational tutor available at every step.",
  "step4.body2": "End-to-end LLM integration: prompt framing, structuring the answer into actionable steps, and a Streamlit interface simple enough for a beginner to use without a manual.",
  "step5.index": "project 05",
  "step5.title": "MCP Platform",
  "step5.body1": "A distributed architecture implementing the Model Context Protocol: it lets an LLM call third-party tools in a standardised, controlled way, instead of ad-hoc integrations that break on every change.",
  "step5.body2": "Three components talking to each other — a Spring Boot server, an Angular interface, Python tools — with Ollama as the local model. API-first, with an explicit contract between services.",

  "svg.graphrag": "knowledge graph · PageRank",
  "svg.aml": "precision · alert raised on TX-4419",
  "svg.bot": "of manual handling · orchestrated with n8n",
  "svg.edu": "personalised path · Gemini + Streamlit",
  "svg.mcp": "standardised protocol between LLM and tools",
  "svg.detect": "detection",
  "svg.generate": "generation",
  "svg.render": "rendering",
  "svg.send": "delivery",
  "svg.event": "event",
  "svg.template": "template",
  "svg.email": "email",
  "svg.tools": "Python tools",
  "svg.server": "MCP server",
  "svg.eduQuestion": "“I'm starting data from scratch”",
  "svg.eduAnswer": "4-step roadmap generated",
  "svg.edu1": "01 · Python &amp; data wrangling",
  "svg.edu2": "02 · SQL and modelling",
  "svg.edu3": "03 · Applied statistics",
  "svg.edu4": "04 · Machine learning",


  "stack.label": "03 — skills",
  "stack.title": "Skills",
  "certs.title": "Certifications",
  "cert7": "Sales and CRM Overview",
  "cert1": "AI Agents Using RAG and LangChain",
  "cert2": "Data Engineering: Pipelines, ETL, Hadoop",
  "cert3": "Python for Data Science, AI &amp; Development",
  "cert4": "Cloud Technical Essentials",
  "cert5": "Agile Project Management",
  "cert6": "Introduction to Data Science",
  "langues.title": "Languages",
  "lg1.name": "French",  "lg1.level": "C1",
  "lg2.name": "English", "lg2.level": "C1",
  "lg4.name": "German",  "lg4.level": "basics",

  "contact.label": "05 — contact",
  "contact.title": "Let's talk about your data problem<span class=\"text-brand-500\">.</span>",
  "contact.lead": "A question, a project, a collaboration: email is the simplest way to reach me. I answer quickly and gladly.",

  /* — Case-study reader — */
  "ui.sec1.title": "Business problem",
  "ui.sec1.head": "What was not working",
  "ui.sec1.hint": "The starting point: the real situation, what it costs, and why the usual reflexes do not solve it.",
  "ui.sec2.title": "Context",
  "ui.sec2.head": "The company, the model, my role",
  "ui.sec2.hint": "Who the company is, how it makes money, and in what capacity I was involved.",
  "ui.sec3.title": "Questions to answer",
  "ui.sec3.head": "The three business questions",
  "ui.sec3.hint": "The questions as a decision-maker asks them. Everything that follows exists only to answer them.",
  "ui.sec4.title": "Dataset",
  "ui.sec4.head": "The data used",
  "ui.sec4.hint": "Origin, volume, columns and generation choices. What the dataset holds — and what it deliberately does not.",
  "ui.sec5.title": "Methodology",
  "ui.sec5.head": "The 3×3 frame and the processing chain",
  "ui.sec5.hint": "Three metrics and three dimensions chosen before the first line of code. The code, the problems hit and the limits are folded at the end of this section.",
  "ui.sec6.title": "Results",
  "ui.sec6.head": "The numbers, then the screens that show them",
  "ui.sec6.hint": "Real screenshots of the application on the shipped dataset. Every figure carries a narrative title that states the conclusion, followed by a reading note.",
  "ui.sec7.title": "Business insights",
  "ui.sec7.head": "What the numbers actually mean",
  "ui.sec7.hint": "Every analysis follows the same structure: the quantified figure, what it implies, the driver behind it, and the team to bring in.",
  "ui.sec8.title": "Technical stack",
  "ui.sec8.head": "What it was built with",
  "ui.sec8.hint": "The tools actually used on this project, not a list of skills.",
  "ui.sec9.title": "Recommendations",
  "ui.sec9.head": "What to do, who owns it, how to measure it",
  "ui.sec9.hint": "What connects the analysis to real action: an action, its priority, the expected impact, the owning team and the metric that will say whether it worked.",
  "ui.sec10.title": "GitHub / demo",
  "ui.sec10.head": "See the code, run the application",
  "ui.sec10.hint": "The repository and the command to run the project locally.",
  "ui.ds.source": "Origin",
  "ui.ds.volume": "Volume",
  "ui.ds.fields": "Columns",
  "ui.ds.note": "Design choices",
  "ui.stackTools": "Project tools",
  "ui.repo": "View the GitHub repository",
  "ui.demo": "Live demo",
  "ui.repoSoon": "The public repository is not published yet for this project. In the meantime, the application runs locally with the command below.",
  "ui.wakeNote": "First visit: free hosting puts the app to sleep after a period without traffic. Allow about 50 seconds for it to wake up — the tab stays blank meanwhile, that is expected.",
  "ui.runLocal": "Run locally",
  "ui.codeGithub": "View the code on GitHub",
  "ui.demoLive": "See the live demo",
  "ui.openCase": "open the full case study",
  "ui.back": "projects",
  "ui.study": "project",
  "ui.ctx.secteur": "Industry",
  "ui.ctx.modele": "Business model",
  "ui.ctx.role": "My role",
  "ui.ctx.perimetre": "Scope analysed",
  "ui.ctx.calcul": "Compute time",
  "ui.ctx.stack": "Technical stack",
  "ui.metrics": "3 Northstar metrics",
  "ui.metricsBadge": "metrics",
  "ui.dimensions": "3 slicing dimensions",
  "ui.dimensionsBadge": "dimensions",
  "ui.figure": "figure",
  "ui.howToRead": "How to read it",
  "ui.zoom": "enlarge",
  "ui.insData": "The quantified figure",
  "ui.insSoWhat": "So what — the business consequence",
  "ui.insDriver": "The driver behind it",
  "ui.mxAction": "Recommendation",
  "ui.mxPrio": "Priority",
  "ui.mxImpact": "Expected impact",
  "ui.mxOwner": "Owning team",
  "ui.mxKpi": "Metric to track",
  "ui.annexToggle": "Open the code, the problems hit along the way and the limits owned up to",
  "ui.annexExtraits": "excerpts",
  "ui.annexDiff": "problems",
  "ui.annexLimites": "limits",
  "ui.copy": "copy",
  "ui.copied": "copied",
  "ui.difficulties": "Problems hit &amp; how they were solved",
  "ui.limits": "Limits owned up to",
  "ui.prev": "previous project",
  "ui.next": "next project",
  "ui.lbPrev": "Previous figure",
  "ui.lbNext": "Next figure",
  "ui.lbClose": "Close",
  "prio.Haute": "High",
  "prio.Moyenne": "Medium",
  "prio.Basse": "Low"
}

};


/* ═══════════════════════ Préférences & application ══════════════════════ */

(function () {
  "use strict";

  var root = document.documentElement;
  var LANG_KEY = "pf-lang-2";   // v2 : l'anglais est desormais la langue par defaut
  var THEME_KEY = "pf-theme";

  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  var lang = root.getAttribute("lang") === "en" ? "en" : "fr";
  var theme = root.getAttribute("data-theme") === "light" ? "light" : "dark";

  /** Traduction d'une clé, avec repli sur le français puis sur la clé. */
  function t(key, forced) {
    var l = forced || lang;
    var d = window.I18N[l] || window.I18N.fr;
    if (d[key] !== undefined) return d[key];
    return window.I18N.fr[key] !== undefined ? window.I18N.fr[key] : key;
  }

  function applyDom() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = t(el.getAttribute("data-i18n"));
      // Les <text> SVG n'acceptent pas innerHTML dans tous les moteurs :
      // sans balisage dans la chaîne, textContent suffit et reste sûr.
      if (v.indexOf("<") === -1 && v.indexOf("&") === -1) el.textContent = v;
      else el.innerHTML = v;
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
    });

    document.title = t("meta.title");
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t("meta.desc"));

    document.querySelectorAll("[data-set-lang]").forEach(function (b) {
      b.classList.toggle("is-on", b.getAttribute("data-set-lang") === lang);
    });
  }

  function setLang(next, silent) {
    next = next === "en" ? "en" : "fr";
    if (next === lang && !silent) return;
    lang = next;
    root.setAttribute("lang", lang);
    store(LANG_KEY, lang);
    applyDom();
    document.dispatchEvent(new CustomEvent("pf:lang", { detail: { lang: lang } }));
  }

  function setTheme(next) {
    next = next === "light" ? "light" : "dark";
    theme = next;
    root.classList.add("theme-anim");
    root.setAttribute("data-theme", theme);
    store(THEME_KEY, theme);
    // La classe d'animation ne sert qu'à la bascule : on la retire pour ne pas
    // faire traîner une transition sur des changements sans rapport.
    window.setTimeout(function () { root.classList.remove("theme-anim"); }, 400);
    document.dispatchEvent(new CustomEvent("pf:theme", { detail: { theme: theme } }));
  }

  /* Commutateurs — délégation, pour couvrir aussi ceux du lecteur d'études. */
  document.addEventListener("click", function (e) {
    var l = e.target.closest("[data-set-lang]");
    if (l) { setLang(l.getAttribute("data-set-lang")); return; }
    var th = e.target.closest("[data-toggle-theme]");
    if (th) { setTheme(theme === "dark" ? "light" : "dark"); }
  });

  window.PF = {
    t: t,
    get lang() { return lang; },
    get theme() { return theme; },
    setLang: setLang,
    setTheme: setTheme,
    apply: applyDom
  };

  applyDom();
})();
