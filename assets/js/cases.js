/* ===========================================================================
   Portfolio — Imad EL KHELYFY
   Données des études de cas « senior », bilingues FR / EN.

   Chaque entrée suit la structure A → F :
     A  en-tête stratégique   (headline, contexte, KPI Northstar, 3 questions)
     B  cadre 3x3             (3 métriques, 3 dimensions)
     C  galerie de figures    (captures réelles + titre narratif)
     D  deep dive insights    (donnée / so what / driver / équipe cible)
     E  matrice de recommandation
     F  annexe technique      (code, difficultés, limites)

   Tout texte traduisible passe par T(fr, en) et devient {fr, en}. Les valeurs
   restées en chaîne simple (noms propres, technologies, commandes) sont
   servies telles quelles dans les deux langues.

   Le rendu vit dans case-view.js. Ajouter une étude de cas, c'est ajouter un
   objet à ce tableau — aucun HTML à écrire.
   =========================================================================== */

function T(fr, en) { return { fr: fr, en: en }; }

window.CASES = [

/* ═════════════════════════════════════════════════════════════════════════
   01 — INVISIBLE CHURN DETECTOR
   ═════════════════════════════════════════════════════════════════════════ */
{
  slug: "invisible-churn",
  num: "01",
  title: "Invisible Churn Detector",
  family: T("Rétention", "Retention"),
  familyKey: "retention",
  accent: "#1D5A85",
  accentDark: "#7FB2DE",
  tags: ["Python", "Dash 4", "Plotly", "NumPy", "SciPy", "pandas"],
  cover: "assets/img/shots/invisible-churn/thumbs/01-vue-d-ensemble.webp",

  headline: T(
    "64 % des résiliations étaient déjà lisibles trois mois à l'avance — dans des comptes toujours abonnés.",
    "64% of cancellations were already readable three months ahead — inside accounts that were still subscribed."),

  pitch: T(
    "Un score de détérioration compare chaque client à son propre passé, pas à une moyenne. Il détecte l'érosion silencieuse pendant qu'une action de rétention peut encore la renverser.",
    "A deterioration score compares every customer to their own past, not to an average. It catches silent erosion while a retention play can still reverse it."),

  problem: T(
    "Une équipe Customer Success pilote la rétention sur un seul signal : la résiliation. Or cet événement est un constat de décès — quand il tombe, la relation est terminée depuis des mois et les campagnes de win-back s'adressent à quelqu'un qui a déjà changé de fournisseur. Le vrai départ, lui, a commencé bien avant : moins de connexions, sessions plus courtes, achats plus rares. Aucun de ces signaux ne déclenche quoi que ce soit, parce qu'aucun n'est un événement — ce sont des absences d'événement.",
    "A Customer Success team steers retention on a single signal: cancellation. But that event is a death certificate — by the time it lands, the relationship has been over for months and win-back campaigns are aimed at someone who has already switched provider. The real departure started long before: fewer logins, shorter sessions, rarer purchases. None of those signals triggers anything, because none of them is an event — they are absences of events."),

  dataset: {
    source: T("Généré localement par data/generate_data.py, graine fixe — deux exécutions produisent le même fichier. Aucune donnée client réelle.",
              "Generated locally by data/generate_data.py with a fixed seed — two runs produce the same file. No real customer data."),
    volume: T("22 387 lignes : 2 000 clients suivis sur 12 mois (octobre 2025 → septembre 2026), une ligne par client et par mois.",
              "22,387 rows: 2,000 customers tracked over 12 months (October 2025 → September 2026), one row per customer per month."),
    fields: ["customer_id", "month", "tenure_months", "logins_count", "session_duration_avg",
             "transactions_count", "amount_spent", "support_tickets", "email_open_rate",
             "days_since_last_activity", "is_still_subscribed", "profile"],
    note: T("Cinq profils injectés : stable (745), silent_decline (445, le cas cible), new_customer (306), classic_churn (276, dont 25 % de départs brutaux) et volatile (228, le piège à faux positifs). La colonne profile est la vérité terrain : elle sert à mesurer les faux positifs, le moteur ne la lit jamais.",
              "Five injected profiles: stable (745), silent_decline (445, the target case), new_customer (306), classic_churn (276, of which 25% are abrupt exits) and volatile (228, the false-positive trap). The profile column is ground truth: it is used to measure false positives, the engine never reads it.")
  },

  links: { repo: "", demo: "" },

  context: {
    secteur: T("Abonnement B2C — service en ligne à facturation récurrente",
               "B2C subscription — online service on recurring billing"),
    modele: T("Souscription mensuelle, 2 000 clients suivis sur 12 mois",
              "Monthly subscription, 2,000 customers tracked over 12 months"),
    role: T("Analyste data en appui de la direction Customer Success, chargé de transformer un reporting de résiliations en dispositif de détection précoce",
            "Data analyst supporting the Customer Success leadership, tasked with turning cancellation reporting into an early-warning system"),
    perimetre: T("22 387 observations client × mois, 7 métriques d'engagement",
                 "22,387 customer × month observations, 7 engagement metrics"),
    calcul: T("0,3 s pour scorer 24 000 couples client × mois (moindres carrés vectorisés)",
              "0.3 s to score 24,000 customer × month pairs (vectorised least squares)"),
    stack: "Python 3.11 · Dash 4 · Plotly · pandas · NumPy · SciPy · dash-bootstrap-components"
  },

  kpis: [
    { value: 367, label: T("Clients à risque élevé", "High-risk customers"),
      note: T("+ 181 clients à surveiller", "+ 181 customers on watch"), suffix: "" },
    { value: 743, label: T("Revenu exposé", "Revenue at risk"),
      note: T("soit 62,4 k$ par mois", "i.e. $62.4K per month"), suffix: T(" k$", "K$") },
    { value: 3, label: T("Préavis moyen détecté", "Average lead time detected"),
      note: T("médiane à 3 mois", "median 3 months"), suffix: T(",0 mois", ".0 months") },
    { value: 64, label: T("Résiliations anticipées", "Cancellations flagged early"),
      note: T("238 sur 371 signalées avant l'acte", "238 of 371 flagged before the act"), suffix: " %" }
  ],

  questions: [
    T("Quels clients se désengagent réellement alors qu'ils sont encore abonnés — donc encore récupérables ?",
      "Which customers are actually disengaging while still subscribed — and therefore still recoverable?"),
    T("Combien de chiffre d'affaires est en jeu, et sur quels comptes faut-il dépenser le budget de rétention ?",
      "How much revenue is at stake, and which accounts should the retention budget be spent on?"),
    T("Le signal précède-t-il vraiment la résiliation, ou monte-t-il en même temps qu'elle — auquel cas il ne sert à rien ?",
      "Does the signal genuinely precede cancellation, or does it rise alongside it — in which case it is useless?")
  ],

  framework: {
    intro: T(
      "Sept métriques d'engagement existaient dans la base. En scorer sept à poids égal aurait dilué le signal monétaire dans le bruit comportemental : l'analyse a été cadrée avant la première ligne de code.",
      "Seven engagement metrics were available. Scoring all seven with equal weight would have diluted the monetary signal in behavioural noise: the analysis was framed before the first line of code."),
    metrics: [
      { name: T("Montant dépensé", "Amount spent"),
        why: T("28 % du score — l'argent est le signal le plus fort et le moins ambigu",
               "28% of the score — money is the strongest and least ambiguous signal") },
      { name: T("Transactions & connexions", "Transactions & logins"),
        why: T("40 % cumulés — l'usage réel, indépendant du déclaratif",
               "40% combined — actual usage, independent of anything self-declared") },
      { name: T("Vitesse du score", "Score velocity"),
        why: T("variation sur 2 mois : rattrape les décrochages brutaux sous le seuil absolu",
               "2-month change: catches sharp drops that sit below the absolute threshold") }
    ],
    dimensions: [
      { name: T("Segment de risque", "Risk segment"),
        why: T("élevé / à surveiller / stable / déjà parti / nouveau client",
               "high / watch / stable / already gone / new customer") },
      { name: T("Ancienneté (tenure)", "Tenure"),
        why: T("isole les montées en charge des vrais déclins",
               "separates ramp-ups from genuine decline") },
      { name: T("Mois d'analyse", "Analysis month"),
        why: T("rejoue l'historique pour mesurer le préavis réellement obtenu",
               "replays history to measure the lead time actually achieved") }
    ]
  },

  method: [
    T("Pivot clients × mois", "Customer × month pivot"),
    T("Régression 6 mois", "6-month regression"),
    T("Pondération par significativité", "Significance weighting"),
    T("Score composite 0–1", "Composite score 0–1"),
    T("Segmentation & priorisation", "Segmentation & prioritisation")
  ],

  figures: [
    {
      img: "assets/img/shots/invisible-churn/01-vue-d-ensemble.webp",
      thumb: "assets/img/shots/invisible-churn/thumbs/01-vue-d-ensemble.webp",
      title: T("367 clients se désengagent en silence pendant que 371 autres ont déjà officiellement résilié — seule la première population est encore rattrapable",
               "367 customers are disengaging silently while 371 others have already formally cancelled — only the first group is still recoverable"),
      read: T("Le classement répond à « lesquels ? », l'histogramme à « combien dans chaque tranche ? ». Les deux seuils (0,15 et 0,35) sont matérialisés : la masse verte à gauche est le portefeuille sain, la queue rouge à droite est la file de travail.",
              "The ranking answers “which ones?”, the histogram answers “how many in each band?”. Both thresholds (0.15 and 0.35) are drawn in: the green mass on the left is the healthy book, the red tail on the right is the work queue.")
    },
    {
      img: "assets/img/shots/invisible-churn/02-explorateur-client.webp",
      thumb: "assets/img/shots/invisible-churn/thumbs/02-explorateur-client.webp",
      title: T("Le dossier client explique le score au lieu de l'imposer : la jauge, les séries en base 100 et la contribution de chaque métrique",
               "The customer file explains the score instead of imposing it: the gauge, the base-100 series and each metric's contribution"),
      read: T("Séries normalisées sur la moyenne du client lui-même, fenêtre d'analyse grisée, droite de tendance colorée selon qu'elle aggrave ou non le score. Un chargé de compte peut contester la décision sur des bases explicites.",
              "Series normalised on the customer's own average, analysis window shaded, trend line coloured by whether it worsens the score. An account manager can challenge the decision on explicit grounds.")
    },
    {
      img: "assets/img/shots/invisible-churn/03-segmentation-priorisation.webp",
      thumb: "assets/img/shots/invisible-churn/thumbs/03-segmentation-priorisation.webp",
      title: T("Le nuage ancienneté × score isole la vraie priorité : les gros points en haut à droite sont des clients fidèles et rentables en train de partir",
               "The tenure × score scatter isolates the real priority: the large dots in the top right are loyal, profitable customers on their way out"),
      read: T("Le tableau est triable, filtrable par segment et exportable en CSV vers un CRM. La colonne « cause principale » indique le levier d'action, pas seulement le niveau de risque.",
              "The table is sortable, filterable by segment and exportable to CSV for a CRM. The “main driver” column gives the lever to pull, not just the risk level.")
    },
    {
      img: "assets/img/shots/invisible-churn/04-validation-du-modele.webp",
      thumb: "assets/img/shots/invisible-churn/thumbs/04-validation-du-modele.webp",
      title: T("La preuve : le score des futurs résiliants monte de 0,15 à 0,39 sur six mois, celui des clients fidèles reste plat",
               "The proof: the score of future churners climbs from 0.15 to 0.39 over six months, while loyal customers stay flat"),
      read: T("Validation rétrospective sur 371 résiliations réelles, avec courbe témoin et intervalle interquartile. Les 36 % non détectés sont assumés et expliqués : ce sont les départs brutaux, structurellement imprévisibles.",
              "Retrospective validation on 371 real cancellations, with a control curve and interquartile band. The 36% not detected are owned and explained: they are abrupt exits, structurally unpredictable.")
    }
  ],

  insights: [
    {
      title: T("L'érosion silencieuse pèse presque autant que le churn officiel",
               "Silent erosion weighs almost as much as formal churn"),
      data: T("367 clients toujours abonnés portent un score ≥ 0,35, soit 23,5 % du portefeuille scoré et 743,0 k$ de chiffre d'affaires déjà réalisé.",
              "367 still-subscribed customers carry a score ≥ 0.35 — 23.5% of the scored book and $743.0K of revenue already booked."),
      soWhat: T("Ce montant sort du portefeuille sans qu'aucune action n'ait été tentée pendant qu'il était encore récupérable — il n'apparaît dans aucun tableau de bord, puisqu'aucun événement ne s'est produit.",
                "That amount leaves the book without a single play being attempted while it was still recoverable — and it shows up on no dashboard, because no event ever occurred."),
      driver: T("La décomposition par métrique montre que 70 % du score vient du montant dépensé et du nombre de transactions : c'est l'usage payant qui décroche en premier, pas l'engagement déclaratif.",
                "The per-metric breakdown shows 70% of the score comes from amount spent and transaction count: paid usage drops first, not declared engagement."),
      team: T("Customer Success", "Customer Success")
    },
    {
      title: T("La significativité statistique divise les faux positifs par 2,6",
               "Statistical significance cuts false positives by a factor of 2.6"),
      data: T("Sans pondération par le t de Student et le z-score, 23 % des clients au profil stable basculaient en risque élevé. Avec, ils tombent à 8,9 % — sans perte de détection (79 % des clients en déclin réel restent signalés).",
              "Without weighting by Student's t and the z-score, 23% of stable-profile customers flipped to high risk. With it they fall to 8.9% — with no loss of detection (79% of genuinely declining customers are still flagged)."),
      soWhat: T("Une équipe de rétention traite un nombre fini d'appels par semaine : chaque faux positif est une heure prise à un client réellement en danger. Le gain n'est pas cosmétique, c'est de la capacité rendue.",
                "A retention team handles a finite number of calls per week: every false positive is an hour taken from a customer genuinely at risk. The gain isn't cosmetic, it's capacity handed back."),
      driver: T("Le bruit mensuel est le coupable : une pente négative sur six points volatils suffisait à déclencher une alerte. Normaliser par la variabilité propre du client neutralise l'effet.",
                "Monthly noise is the culprit: a negative slope over six volatile points was enough to raise an alert. Normalising by the customer's own variability neutralises it."),
      team: T("Data & Customer Success", "Data & Customer Success")
    },
    {
      title: T("Le signal arrive 3 mois avant l'acte — et il ne le prédit pas rétroactivement",
               "The signal arrives 3 months before the act — and it isn't predicting it retroactively"),
      data: T("Sur 371 résiliations, 238 (64 %) avaient franchi le seuil d'alerte avant la bascule, avec 3,0 mois de préavis moyen. Score moyen à M-3 : 0,26 pour les futurs sortants contre 0,15 pour les clients fidèles.",
              "Of 371 cancellations, 238 (64%) had crossed the alert threshold before the switch, with 3.0 months of average lead time. Mean score at M-3: 0.26 for future leavers versus 0.15 for loyal customers."),
      soWhat: T("Trois mois, c'est le temps d'un geste commercial, d'une réactivation produit ou d'un rendez-vous — pas d'une campagne de win-back adressée à quelqu'un qui a déjà changé de fournisseur.",
                "Three months is enough time for a commercial gesture, a product re-activation or a meeting — not for a win-back campaign aimed at someone who has already switched provider."),
      driver: T("Les 36 % non détectés sont des départs brutaux (25 % des churners du générateur) : aucune métrique d'engagement ne les précède. La limite est structurelle et affichée dans l'outil plutôt que masquée.",
                "The 36% not detected are abrupt exits (25% of the generator's churners): no engagement metric precedes them. The limit is structural and shown inside the tool rather than hidden."),
      team: T("Direction Customer Success", "Customer Success leadership")
    }
  ],

  matrix: [
    { action: T("Ouvrir une file d'appels sur le top 50 des scores ≥ 0,35 pondéré par le CA cumulé",
                "Open a call queue on the top 50 scores ≥ 0.35, weighted by cumulative revenue"),
      priority: "Haute",
      impact: T("Jusqu'à 743 k$ de CA exposé remis en jeu", "Up to $743K of exposed revenue put back in play"),
      owner: T("Customer Success", "Customer Success"),
      kpi: T("Taux de récupération à 90 j", "90-day recovery rate") },
    { action: T("Associer un playbook à chaque cause principale (baisse du panier → offre ciblée ; baisse des connexions → réactivation produit)",
                "Attach a playbook to each main driver (basket drop → targeted offer; login drop → product re-activation)"),
      priority: "Haute",
      impact: T("Action différenciée au lieu d'un appel générique", "Differentiated action instead of a generic call"),
      owner: T("CS & Produit", "CS & Product"),
      kpi: T("Score de détérioration à M+2", "Deterioration score at M+2") },
    { action: T("Recalibrer les poids par régression logistique sur les résiliations historiques, en gardant le score interprétable",
                "Recalibrate the weights by logistic regression on historical cancellations, keeping the score interpretable"),
      priority: "Moyenne",
      impact: T("Préavis attendu > 3 mois, faux positifs < 8,9 %", "Expected lead time > 3 months, false positives < 8.9%"),
      owner: "Data",
      kpi: T("Préavis médian · taux de faux positifs", "Median lead time · false-positive rate") },
    { action: T("Marquer les clients contactés et comparer leur trajectoire à un groupe témoin non contacté",
                "Tag contacted customers and compare their trajectory to an uncontacted control group"),
      priority: "Moyenne",
      impact: T("Seule mesure honnête du ROI de l'outil", "The only honest measure of the tool's ROI"),
      owner: T("Data & CS", "Data & CS"),
      kpi: T("Écart de rétention test / témoin", "Retention gap, test vs control") },
    { action: T("Déporter le calcul dans l'entrepôt au-delà de quelques centaines de milliers de clients",
                "Push the computation into the warehouse beyond a few hundred thousand customers"),
      priority: "Basse",
      impact: T("Passage à l'échelle sans réécriture métier", "Scaling without rewriting the business logic"),
      owner: "Data Engineering",
      kpi: T("Temps de scoring", "Scoring time") }
  ],

  appendix: {
    code: [
      {
        label: T("Score de détérioration", "Deterioration score"),
        lang: "python",
        body: T(
`# models/deterioration_engine.py — coeur du score
# Une métrique stable ou en hausse vaut 0 : elle ne peut jamais compenser
# la chute d'une autre.

deterioration = np.clip(0.6 * tendance + 0.4 * niveau, 0.0, 1.0)
score         = sum(POIDS[m] * deterioration[m] for m in METRIQUES)

# a) tendance : pente OLS sur la fenêtre de 6 mois, rapportée à la
#    référence historique DU CLIENT (jamais à une moyenne de portefeuille)
tendance = (-direction * pente * duree_fenetre) / reference

# b) niveau : décrochage entre la fenêtre et les mois antérieurs
#    -> rattrape le client effondré depuis longtemps, dont la pente est plate
niveau = direction * (moyenne_historique - moyenne_fenetre) / reference

# c) pondération par la significativité : sans elle, 23 % de faux positifs
t = np.abs(pente) / se_pente          # t de Student sur la pente
z = ecart / ecart_type_historique     # z-score sur le décrochage
tendance *= np.clip(t / 2.5, 0.0, 1.0)
niveau   *= np.clip(z / 1.5, 0.0, 1.0)`,
`# models/deterioration_engine.py — heart of the score
# A stable or rising metric scores 0: it can never offset another one's fall.

deterioration = np.clip(0.6 * trend + 0.4 * level, 0.0, 1.0)
score         = sum(WEIGHTS[m] * deterioration[m] for m in METRICS)

# a) trend: OLS slope over the 6-month window, divided by THE CUSTOMER's
#    own historical reference (never by a portfolio average)
trend = (-direction * slope * window_length) / reference

# b) level: the gap between the window and the months before it
#    -> catches the long-collapsed customer, whose slope is flat
level = direction * (historical_mean - window_mean) / reference

# c) significance weighting: without it, 23% false positives
t = np.abs(slope) / se_slope          # Student's t on the slope
z = gap / historical_std              # z-score on the level break
trend *= np.clip(t / 2.5, 0.0, 1.0)
level *= np.clip(z / 1.5, 0.0, 1.0)`)
      },
      {
        label: T("Régression vectorisée", "Vectorised regression"),
        lang: "python",
        body: T(
`def _ols(sub: np.ndarray) -> dict[str, np.ndarray]:
    """Régression linéaire vectorisée sur une fenêtre (clients, mois).

    sub contient des NaN pour les mois où le client n'existait pas :
    les points manquants sont exclus des sommes, une seule passe suffit
    pour les 2 000 clients à la fois. Une boucle Python coûtait plusieurs
    dizaines de secondes ; ici : 0,3 s pour 24 000 couples client x mois.
    """
    mask = np.isfinite(sub)
    n    = mask.sum(axis=1).astype(float)
    x    = np.arange(sub.shape[1], dtype=float)[None, :] * mask
    y    = np.where(mask, sub, 0.0)

    sx, sy   = x.sum(axis=1), y.sum(axis=1)
    sxx, sxy = (x * x).sum(axis=1), (x * y).sum(axis=1)
    den      = n * sxx - sx ** 2

    slope     = np.zeros_like(sy)
    ok        = (den > 1e-9) & (n >= 2)
    slope[ok] = (n[ok] * sxy[ok] - sx[ok] * sy[ok]) / den[ok]

    # Erreur type de la pente : sert à savoir si le déclin observé
    # sort du bruit mensuel habituel du client.
    ...
    return {"slope": slope, "se_slope": se_slope, "testable": n >= 3}`,
`def _ols(sub: np.ndarray) -> dict[str, np.ndarray]:
    """Vectorised linear regression over a (customers, months) window.

    sub holds NaN for months where the customer did not exist yet:
    missing points are excluded from the sums, and a single pass covers
    all 2,000 customers at once. A Python loop cost tens of seconds;
    this runs in 0.3 s for 24,000 customer x month pairs.
    """
    mask = np.isfinite(sub)
    n    = mask.sum(axis=1).astype(float)
    x    = np.arange(sub.shape[1], dtype=float)[None, :] * mask
    y    = np.where(mask, sub, 0.0)

    sx, sy   = x.sum(axis=1), y.sum(axis=1)
    sxx, sxy = (x * x).sum(axis=1), (x * y).sum(axis=1)
    den      = n * sxx - sx ** 2

    slope     = np.zeros_like(sy)
    ok        = (den > 1e-9) & (n >= 2)
    slope[ok] = (n[ok] * sxy[ok] - sx[ok] * sy[ok]) / den[ok]

    # Standard error of the slope: tells us whether the observed decline
    # stands out from the customer's usual monthly noise.
    ...
    return {"slope": slope, "se_slope": se_slope, "testable": n >= 3}`)
      },
      {
        label: T("Segmentation", "Segmentation"),
        lang: "python",
        body: T(
`SEUIL_ALERTE, SEUIL_VEILLE = 0.35, 0.15

def segment_of(score: float, velocity: float = 0.0) -> str:
    # La vitesse rattrape les décrochages brutaux qui n'ont pas encore
    # atteint le seuil absolu.
    if score >= SEUIL_ALERTE or (score >= 0.22 and velocity >= 0.12):
        return "high_risk"
    if score >= SEUIL_VEILLE:
        return "watch"
    return "stable"

# Deux garde-fous, appliqués AVANT le score :
#   tenure <= 4 mois            -> "new_customer"        (montée en charge)
#   moins de 3 mois d'historique -> "insufficient_data"  (aucun score affiché)`,
`ALERT_THRESHOLD, WATCH_THRESHOLD = 0.35, 0.15

def segment_of(score: float, velocity: float = 0.0) -> str:
    # Velocity catches sharp drops that have not yet reached the
    # absolute threshold.
    if score >= ALERT_THRESHOLD or (score >= 0.22 and velocity >= 0.12):
        return "high_risk"
    if score >= WATCH_THRESHOLD:
        return "watch"
    return "stable"

# Two guard rails, applied BEFORE the score:
#   tenure <= 4 months          -> "new_customer"       (still ramping up)
#   fewer than 3 months of data -> "insufficient_data"  (no score shown)`)
      },
      {
        label: T("Architecture", "Architecture"),
        lang: "text",
        body: T(
`invisible-churn-detector/
├── app.py                       layout, thème, onglets  (port 8053)
├── config/
│   ├── i18n.py                  toutes les chaînes FR / EN
│   └── theme.py                 palettes, templates Plotly, formats
├── data/
│   ├── generate_data.py         générateur, 5 profils, graine fixe
│   └── customer_engagement.csv  22 387 lignes, généré au 1er lancement
├── models/
│   ├── deterioration_engine.py  tendance · niveau · confiance · segments
│   └── validation.py            analyse rétrospective, préavis, courbes
├── layout/                      header + un module par onglet
└── callbacks/callbacks.py       branchement langue / thème / mois

Principe de séparation : models/ ne connaît AUCUNE chaîne d'interface et ne
produit que des données. layout/ construit les figures. callbacks/ applique
la langue et le thème actifs. Ajouter une langue ne touche pas une ligne
de statistique.`,
`invisible-churn-detector/
├── app.py                       layout, theme, tabs  (port 8053)
├── config/
│   ├── i18n.py                  every FR / EN string
│   └── theme.py                 palettes, Plotly templates, number formats
├── data/
│   ├── generate_data.py         generator, 5 profiles, fixed seed
│   └── customer_engagement.csv  22,387 rows, created on first launch
├── models/
│   ├── deterioration_engine.py  trend · level · confidence · segments
│   └── validation.py            retrospective analysis, lead time, curves
├── layout/                      header + one module per tab
└── callbacks/callbacks.py       wiring for language / theme / month

Separation principle: models/ knows NO interface string and produces only
data. layout/ builds the figures. callbacks/ applies the active language
and theme. Adding a language touches not one line of statistics.`)
      }
    ],
    difficulties: [
      { p: T("Le bruit mensuel produisait 23 % de faux positifs sur les clients stables.",
             "Monthly noise produced 23% false positives on stable customers."),
        s: T("Pondérer chaque composante par sa significativité statistique (t de Student sur la pente, z-score sur le décrochage). Faux positifs ramenés à 8,9 % sans perte de détection.",
             "Weight each component by its statistical significance (Student's t on the slope, z-score on the level break). False positives down to 8.9% with no loss of detection.") },
      { p: T("Un client effondré depuis longtemps passait pour stable : sa pente sur la fenêtre était quasi nulle.",
             "A long-collapsed customer looked stable: their slope over the window was near zero."),
        s: T("Ajouter la composante de niveau, qui compare la moyenne de la fenêtre à celle des mois antérieurs.",
             "Add the level component, which compares the window mean to the mean of the preceding months.") },
      { p: T("Les nouveaux clients, en montée en charge irrégulière, ressemblaient à des clients instables.",
             "New customers, ramping up irregularly, looked like unstable customers."),
        s: T("Exclusion explicite sous 5 mois d'ancienneté, avec un segment dédié plutôt qu'un score trompeur.",
             "Explicit exclusion below 5 months of tenure, with a dedicated segment rather than a misleading score.") },
      { p: T("Les clients à très faible activité faisaient exploser le score (division par une référence proche de zéro).",
             "Very low-activity customers blew up the score (dividing by a reference close to zero)."),
        s: T("Plancher de normalisation par métrique, calé sur 5 % de la médiane du portefeuille.",
             "A normalisation floor per metric, set at 5% of the portfolio median.") },
      { p: T("Les figures Plotly se redimensionnaient en boucle et débordaient sur le bloc suivant.",
             "Plotly figures resized in a loop and overflowed onto the block below."),
        s: T("Hauteur en dur sur chaque dcc.Graph et abandon du mode responsive ; la hauteur du classement est renvoyée par le callback puisqu'elle dépend du nombre de clients affichés.",
             "A hard height on every dcc.Graph and dropping responsive mode; the ranking's height is returned by the callback since it depends on how many customers are shown.") },
      { p: T("Le tri du tableau cassait avec les nombres formatés en français (« 0,74 » trié comme du texte).",
             "Table sorting broke on French-formatted numbers (“0,74” sorted as text)."),
        s: T("Garder les valeurs numériques dans la table et confier la mise en forme au Format de dash_table, paramétré par langue.",
             "Keep numeric values in the table and hand formatting to dash_table's Format, parameterised by language.") }
    ],
    limits: [
      T("Données synthétiques : les poids et les seuils devraient être recalibrés sur des résiliations réelles.",
        "Synthetic data: weights and thresholds would need recalibrating on real cancellations."),
      T("Seuils fixés à dire d'expert (0,15 / 0,35). En production, ils devraient épouser la capacité de traitement de l'équipe.",
        "Thresholds set by expert judgement (0.15 / 0.35). In production they should match the team's handling capacity."),
      T("8,9 % de faux positifs sur le profil stable : un appel perdu, pas un client perdu — mais le taux doit être suivi.",
        "8.9% false positives on the stable profile: a wasted call, not a lost customer — but the rate must be tracked."),
      T("Le churn accidentel reste indétectable : aucune métrique d'engagement ne précède un départ sans érosion.",
        "Accidental churn stays undetectable: no engagement metric precedes an exit without prior erosion."),
      T("Aucune dimension contextuelle (offre, canal d'acquisition, incidents) : le modèle ne lit que l'usage.",
        "No contextual dimension (plan, acquisition channel, incidents): the model reads usage only."),
      T("Fenêtre de 12 mois, trop courte pour distinguer une saisonnalité annuelle d'un déclin réel.",
        "A 12-month window, too short to tell annual seasonality from genuine decline.")
    ]
  },

  run: "python app.py   →   http://127.0.0.1:8053"
},

/* ═════════════════════════════════════════════════════════════════════════
   02 — REVENUE DROP DIAGNOSTIC ENGINE
   ═════════════════════════════════════════════════════════════════════════ */
{
  slug: "revenue-drop",
  num: "02",
  title: "Revenue Drop Diagnostic Engine",
  family: T("Revenu", "Revenue"),
  familyKey: "revenue",
  accent: "#0F6190",
  accentDark: "#5FB4E4",
  tags: ["Python", "Dash 4", "Plotly", "SciPy", "pandas", "NLG"],
  cover: "assets/img/shots/revenue-drop/thumbs/01-vue-d-ensemble.webp",

  headline: T(
    "« Le CA recule de 8 % » : 3 combinaisons sur 96 expliquent 56 % du recul, et 41 des 48 baisses ne sont que du bruit.",
    "“Revenue is down 8%”: 3 combinations out of 96 explain 56% of the drop, and 41 of the 48 declines are just noise."),

  pitch: T(
    "Le chiffre agrégé est vrai et inactionnable. Le moteur décompose la variation sur 4 dimensions, classe les moteurs en dollars, écarte le bruit statistique et rédige le diagnostic tout seul — en moins d'une seconde.",
    "The aggregate number is true and unactionable. The engine decomposes the change across 4 dimensions, ranks drivers in dollars, discards statistical noise and writes the diagnosis on its own — in under a second."),

  problem: T(
    "Le comité mensuel s'ouvre sur un chiffre agrégé — « le CA recule de 8 % » — et la réunion s'arrête là, faute de savoir quoi en faire. Le réflexe habituel aggrave le problème : trier les segments par variation en pourcentage fait remonter des micro-segments volatils et enterre les vrais sujets. Et le travail manuel ne passe pas à l'échelle : croiser 96 combinaisons, récupérer six mois d'historique par croisement et estimer une volatilité prend une demi-journée d'analyste, à refaire chaque mois, sans garde-fou statistique.",
    "The monthly committee opens on an aggregate number — “revenue is down 8%” — and the meeting stops there, with no idea what to do with it. The usual reflex makes it worse: sorting segments by percentage change surfaces volatile micro-segments and buries the real issues. And manual work does not scale: crossing 96 combinations, pulling six months of history per cross and estimating volatility takes half an analyst-day, every month, with no statistical guard rail."),

  dataset: {
    source: T("Synthétique, généré localement par data/generate_data.py — aucun système source n'est interrogé.",
              "Synthetic, generated locally by data/generate_data.py — no source system is queried."),
    volume: T("~175 000 transactions sur 7 mois comparables (février → août 2026), soit ~25 000 par mois et ~50 000 lignes sur les deux mois comparés par défaut.",
              "~175,000 transactions over 7 comparable months (February → August 2026): ~25,000 per month and ~50,000 rows across the two months compared by default."),
    fields: ["transaction_id", "date", "region", "product_category", "channel",
             "customer_segment", "revenue"],
    note: T("Montants tirés d'une loi log-normale calibrée par catégorie, volumes tirés d'une loi de Poisson pour que le volume total puisse réellement baisser. Les cinq premiers mois servent de référence de volatilité ; le dernier subit des chocs concentrés (électronique en magasin) et des hausses compensatoires sur le digital. Un bruit uniforme n'aurait rien prouvé.",
              "Amounts drawn from a log-normal law calibrated per category, volumes drawn from a Poisson law so that total volume can genuinely fall. The first five months serve as the volatility baseline; the last one takes concentrated shocks (in-store electronics) plus offsetting growth on digital. Uniform noise would have proved nothing.")
  },

  links: { repo: "", demo: "" },

  context: {
    secteur: T("Distribution multi-canal — enseigne de détail canadienne",
               "Multi-channel retail — a Canadian retail chain"),
    modele: T("B2C retail, 4 régions × 4 catégories × 3 canaux × 2 segments = 96 combinaisons",
              "B2C retail, 4 regions × 4 categories × 3 channels × 2 segments = 96 combinations"),
    role: T("Analyste rattaché à la direction commerciale et au contrôle de gestion, chargé de remplacer une demi-journée de tableaux croisés mensuels par un diagnostic automatique",
            "Analyst reporting to sales leadership and financial control, tasked with replacing half a day of monthly pivot tables with an automatic diagnosis"),
    perimetre: T("~175 000 transactions sur 7 mois, ~50 000 lignes sur les deux mois comparés",
                 "~175,000 transactions over 7 months, ~50,000 rows across the two compared months"),
    calcul: T("Diagnostic complet en < 1 s, mémoïsé par jeu de périodes",
              "Full diagnosis in < 1 s, memoised per period pair"),
    stack: "Python · Dash 4 · Plotly · pandas · SciPy · dash-bootstrap-components"
  },

  kpis: [
    { value: 3.20, label: T("CA période analysée", "Revenue, analysed period"),
      note: T("23 919 transactions · panier moyen 134 $", "23,919 transactions · $134 average basket"),
      suffix: T(" M$", "M$"), decimals: 2 },
    { value: -275.3, label: T("Variation en dollars", "Change in dollars"),
      note: T("référence juillet 2026 : 3,47 M$", "July 2026 baseline: $3.47M"),
      suffix: T(" k$", "K$"), decimals: 1 },
    { value: -7.9, label: T("Variation en %", "Change in %"),
      note: T("-979 transactions vs période de référence", "-979 transactions vs baseline period"),
      suffix: " %", decimals: 1 },
    { value: 7, label: T("Baisses significatives", "Significant declines"),
      note: T("sur 48 combinaisons en baisse", "out of 48 declining combinations"), suffix: " / 48" }
  ],

  questions: [
    T("Où se joue réellement la baisse — quelles combinaisons région × catégorie × canal × segment, et pour combien de dollars ?",
      "Where is the drop actually happening — which region × category × channel × segment combinations, and for how many dollars?"),
    T("Est-ce du signal ou du bruit ? Quelles variations sortent vraiment de la variance historique de leur propre segment ?",
      "Signal or noise? Which changes genuinely fall outside their own segment's historical variance?"),
    T("Le problème est-il localisé (enquête opérationnelle ciblée) ou généralisé (signal macro) ? La réponse change complètement la décision.",
      "Is the problem localised (targeted operational investigation) or widespread (a macro signal)? The answer changes the decision entirely.")
  ],

  framework: {
    intro: T(
      "Trois pièges rendent l'analyse de baisse habituellement inutilisable : le tri par pourcentage, le bruit des micro-segments, et la compensation qui masque l'ampleur locale. Le cadrage a consisté à neutraliser les trois avant de coder.",
      "Three traps usually make decline analysis unusable: sorting by percentage, micro-segment noise, and the offsetting growth that hides the local scale. The framing was about neutralising all three before coding."),
    metrics: [
      { name: T("Δ chiffre d'affaires en dollars", "Δ revenue in dollars"),
        why: T("-5 % sur un segment à 3 M$ pèse dix fois plus que -50 % sur un segment à 30 k$",
               "-5% on a $3M segment weighs ten times more than -50% on a $30K segment") },
      { name: T("Décomposition volume / panier", "Volume / basket decomposition"),
        why: T("perdre des clients et vendre moins cher n'appellent pas les mêmes remèdes",
               "losing customers and selling cheaper call for opposite remedies") },
      { name: T("z-score de significativité", "Significance z-score"),
        why: T("sépare le décrochage réel de la variation mensuelle habituelle du segment",
               "separates a real break from the segment's usual monthly swing") }
    ],
    dimensions: [
      { name: T("Région × Canal", "Region × Channel"),
        why: T("isole l'exécution locale (magasin, stock, concurrence) du canal digital",
               "isolates local execution (store, stock, competition) from the digital channel") },
      { name: T("Catégorie produit", "Product category"),
        why: T("révèle le dénominateur commun des principaux moteurs",
               "reveals the common denominator across the leading drivers") },
      { name: T("Segment client (nouveau / récurrent)", "Customer segment (new / returning)"),
        why: T("distingue un problème d'acquisition d'un problème de fidélité",
               "tells an acquisition problem apart from a loyalty problem") }
    ]
  },

  method: [
    T("Décomposition 96 combinaisons", "96-combination decomposition"),
    T("Classement par impact $", "Ranking by $ impact"),
    T("Test de significativité", "Significance test"),
    T("Analyse de concentration", "Concentration analysis"),
    T("Résumé en langage naturel", "Natural-language summary")
  ],

  figures: [
    {
      img: "assets/img/shots/revenue-drop/01-vue-d-ensemble.webp",
      thumb: "assets/img/shots/revenue-drop/thumbs/01-vue-d-ensemble.webp",
      title: T("Le résumé est entièrement déduit des chiffres — y compris le dénominateur commun « électronique + magasin » qui désigne la cause à investiguer",
               "The summary is entirely derived from the numbers — including the “electronics + store” common denominator that points to the cause to investigate"),
      read: T("Aucune phrase n'est écrite à l'avance pour ce jeu de données. Le tri des barres se fait sur |Δ$| et jamais sur Δ% : les barres pleines sont statistiquement significatives, les barres pâles restent dans la variance normale.",
              "Not a single sentence is pre-written for this dataset. Bars are sorted on |Δ$| and never on Δ%: solid bars are statistically significant, pale bars stay within normal variance.")
    },
    {
      img: "assets/img/shots/revenue-drop/02-explorateur-multi-dimensionnel.webp",
      thumb: "assets/img/shots/revenue-drop/thumbs/02-explorateur-multi-dimensionnel.webp",
      title: T("Quatre sélecteurs de hiérarchie : la même baisse racontée par région, par canal ou par catégorie ne désigne pas le même responsable",
               "Four hierarchy selectors: the same drop told by region, by channel or by category does not point to the same owner"),
      read: T("Treemap et sunburst colorés par le delta, tableau triable et filtrable en dessous. C'est l'outil de l'analyste qui veut vérifier une hypothèse, pas celui du dirigeant qui veut la conclusion.",
              "Treemap and sunburst coloured by delta, with a sortable, filterable table below. This is the analyst's tool for testing a hypothesis, not the executive's tool for the conclusion.")
    },
    {
      img: "assets/img/shots/revenue-drop/03-significativite.webp",
      thumb: "assets/img/shots/revenue-drop/thumbs/03-significativite.webp",
      title: T("Sur 48 combinaisons en baisse, 7 sortent de leur variance historique — les 41 autres ne justifient aucune réunion",
               "Of 48 declining combinations, 7 fall outside their historical variance — the other 41 justify no meeting"),
      read: T("Nuage z-score × impact avec bande de confiance et seuil réglable de 1σ à 3,5σ. Le plancher de volatilité empirique (~13,8 % ici) fait tomber les alertes de 14 à 7 sans perdre un seul choc réellement injecté.",
              "A z-score × impact scatter with a confidence band and a threshold adjustable from 1σ to 3.5σ. The empirical volatility floor (~13.8% here) cuts alerts from 14 to 7 without losing a single genuinely injected shock.")
    },
    {
      img: "assets/img/shots/revenue-drop/04-concentration-vs-dispersion.webp",
      thumb: "assets/img/shots/revenue-drop/thumbs/04-concentration-vs-dispersion.webp",
      title: T("11 combinaisons sur 96 suffisent à expliquer 80 % du recul : le verdict « baisse concentrée » est calculé, pas interprété",
               "11 combinations out of 96 are enough to explain 80% of the drop: the “concentrated decline” verdict is computed, not interpreted"),
      read: T("Courbe de Pareto et interprétation automatique. Concentrée → enquête opérationnelle ciblée. Dispersée → signal macro, et un plan produit ciblé serait inefficace. Le seul écran qui change la nature de la décision.",
              "Pareto curve with automatic interpretation. Concentrated → targeted operational investigation. Dispersed → macro signal, where a targeted product plan would be ineffective. The one screen that changes the nature of the decision.")
    }
  ],

  insights: [
    {
      title: T("La baisse est localisée, pas systémique — et cela change la décision",
               "The drop is localised, not systemic — and that changes the decision"),
      data: T("56 % du recul total (449,3 k$) se joue sur 3 combinaisons sur 96 : Ontario / récurrents / électronique / magasin (-127,9 k$, -48,4 %), Ontario / nouveaux / électronique / magasin (-64,8 k$, -68,5 %) et Colombie-Britannique / récurrents / électronique / magasin (-60,1 k$, -40,0 %).",
              "56% of the total decline ($449.3K) sits in 3 of 96 combinations: Ontario / returning / electronics / store (-$127.9K, -48.4%), Ontario / new / electronics / store (-$64.8K, -68.5%) and British Columbia / returning / electronics / store (-$60.1K, -40.0%)."),
      soWhat: T("Un plan de relance global aurait dépensé du budget sur 93 combinaisons qui vont bien. Le verdict « concentré » réoriente vers une enquête opérationnelle sur une poignée de magasins.",
                "A blanket recovery plan would have spent budget on 93 combinations that are doing fine. The “concentrated” verdict redirects effort to an operational investigation in a handful of stores."),
      driver: T("Les trois moteurs partagent un dénominateur commun détecté automatiquement : catégorie « électronique » et canal « magasin ». Le problème n'est pas dispersé au hasard, il pointe vers une cause unique — exécution, stock, prix ou concurrence locale.",
                "The three drivers share an automatically detected common denominator: the “electronics” category and the “store” channel. The problem isn't randomly scattered — it points to a single cause: execution, stock, price or local competition."),
      team: T("Direction commerciale · Retail Ops", "Sales leadership · Retail Ops")
    },
    {
      title: T("98 % du recul vient du volume, pas du panier moyen",
               "98% of the drop comes from volume, not average basket"),
      data: T("La décomposition Δ CA = (N−N₋₁)×panier₋₁ + N×(panier−panier₋₁) attribue 98 % de la baisse à l'effet volume : -979 transactions, panier moyen quasi stable à 134 $.",
              "The decomposition Δrevenue = (N−N₋₁)×basket₋₁ + N×(basket−basket₋₁) attributes 98% of the fall to the volume effect: -979 transactions, average basket almost flat at $134."),
      soWhat: T("Ce n'est donc pas un problème de remise ou de mix tarifaire : les clients ne viennent plus ou ne trouvent plus le produit. Les leviers prix sont hors sujet ; les leviers trafic et disponibilité sont les bons.",
                "So this is not a discount or price-mix problem: customers are no longer coming, or no longer finding the product. Price levers are beside the point; traffic and availability levers are the right ones."),
      driver: T("Le croisement canal montre que le web compense partiellement (+18,1 k$ sur Ontario / nouveaux / électronique / web) : une partie du volume magasin s'est déplacée, elle n'a pas disparu.",
                "The channel cross-tab shows web partly offsets it (+$18.1K on Ontario / new / electronics / web): part of the store volume moved rather than vanished."),
      team: T("Retail Ops · Supply", "Retail Ops · Supply")
    },
    {
      title: T("Le chiffre agrégé sous-estime le problème local de 60 %",
               "The aggregate number understates the local problem by 60%"),
      data: T("48 combinaisons progressent et compensent 174,1 k$. Sans ce contrepoids, la variation affichée serait de -12,9 % au lieu de -7,9 % — le recul réel des segments touchés est de -449 k$ contre -275 k$ affichés.",
              "48 combinations are growing and offset $174.1K. Without that counterweight the reported change would be -12.9% instead of -7.9% — the real decline in affected segments is -$449K against the -$275K shown."),
      soWhat: T("Un comité qui ne regarde que le net dimensionne son plan d'action sur 60 % du problème réel, et s'étonne trois mois plus tard que la correction n'ait pas suffi.",
                "A committee looking only at the net figure sizes its action plan against 60% of the real problem, then wonders three months later why the fix wasn't enough."),
      driver: T("La vue symétrique baisse / hausse rend le contrepoids visible. C'est la seule façon de voir que la croissance digitale masque un décrochage physique.",
                "The symmetric decline / growth view makes the counterweight visible. It is the only way to see that digital growth is masking a physical-channel break."),
      team: T("Contrôle de gestion · Direction générale", "Financial control · Executive committee")
    }
  ],

  matrix: [
    { action: T("Audit terrain des magasins Ontario et Colombie-Britannique sur la catégorie électronique (stock, prix, exécution, concurrence locale)",
                "Field audit of Ontario and British Columbia stores on the electronics category (stock, price, execution, local competition)"),
      priority: "Haute",
      impact: T("252,8 k$ de recul adressé sur les 3 premiers moteurs", "$252.8K of decline addressed across the top 3 drivers"),
      owner: "Retail Ops",
      kpi: T("CA électronique magasin · taux de rupture", "In-store electronics revenue · stockout rate") },
    { action: T("Vérifier si le report vers le web est volontaire (cannibalisation) ou subi (rupture magasin)",
                "Check whether the shift to web is deliberate (cannibalisation) or forced (store stockouts)"),
      priority: "Haute",
      impact: T("Détermine si 174 k$ de hausse digitale est un gain ou un déplacement",
                "Determines whether $174K of digital growth is a gain or a transfer"),
      owner: T("E-commerce & Supply", "E-commerce & Supply"),
      kpi: T("Mix canal à périmètre constant", "Channel mix on like-for-like scope") },
    { action: T("Publier le résumé automatique en ouverture du comité mensuel, à la place du chiffre agrégé seul",
                "Open the monthly committee with the automatic summary instead of the aggregate figure alone"),
      priority: "Moyenne",
      impact: T("Une demi-journée d'analyste économisée chaque mois, résultat reproductible",
                "Half an analyst-day saved each month, with a reproducible result"),
      owner: T("Contrôle de gestion", "Financial control"),
      kpi: T("Délai de production du diagnostic", "Time to produce the diagnosis") },
    { action: T("Passer en comparaison année sur année (M vs M-12) pour neutraliser la saisonnalité",
                "Switch to year-on-year comparison (M vs M-12) to neutralise seasonality"),
      priority: "Moyenne",
      impact: T("Supprime les faux signaux liés au calendrier commercial",
                "Removes false signals driven by the commercial calendar"),
      owner: "Data",
      kpi: T("Nombre de baisses significatives", "Number of significant declines") },
    { action: T("Brancher le moteur sur l'entrepôt réel en remplaçant la seule fonction load_transactions",
                "Plug the engine into the real warehouse by replacing the single load_transactions function"),
      priority: "Basse",
      impact: T("Diagnostic quotidien plutôt que mensuel", "Daily rather than monthly diagnosis"),
      owner: "Data Engineering",
      kpi: T("Fraîcheur de la donnée", "Data freshness") }
  ],

  appendix: {
    code: [
      {
        label: T("Décomposition volume / panier", "Volume / basket decomposition"),
        lang: "python",
        body: T(
`# models/diagnostic_engine.py
# Δ CA = (N_M - N_M-1) x panier_M-1  +  N_M x (panier_M - panier_M-1)
#        └──── effet volume ────┘       └───── effet panier ─────┘
#
# Cette décomposition dit immédiatement si l'on perd des clients ou si
# l'on vend moins cher à chaque passage — deux problèmes aux remèdes
# opposés. Ici : 98 % de volume, 2 % de panier.

combos["volume_effect"] = (combos["n_curr"] - combos["n_prev"]) * combos["ticket_prev"]
combos["ticket_effect"] = combos["n_curr"] * (combos["ticket_curr"] - combos["ticket_prev"])

# Le tri se fait sur |Δ$|, JAMAIS sur Δ% :
# -50 % sur un segment à 30 k$ = -15 k$
# -5 %  sur un segment à 3 M$  = -150 k$, soit dix fois plus.
combos = combos.reindex(combos["delta"].abs().sort_values(ascending=False).index)`,
`# models/diagnostic_engine.py
# Δrevenue = (N_M - N_M-1) x basket_M-1  +  N_M x (basket_M - basket_M-1)
#            └──── volume effect ────┘       └───── basket effect ─────┘
#
# This decomposition immediately says whether we are losing customers or
# selling cheaper on every visit — two problems with opposite remedies.
# Here: 98% volume, 2% basket.

combos["volume_effect"] = (combos["n_curr"] - combos["n_prev"]) * combos["ticket_prev"]
combos["ticket_effect"] = combos["n_curr"] * (combos["ticket_curr"] - combos["ticket_prev"])

# Sorting is on |Δ$|, NEVER on Δ%:
# -50% on a $30K segment = -$15K
# -5%  on a $3M  segment = -$150K, i.e. ten times more.
combos = combos.reindex(combos["delta"].abs().sort_values(ascending=False).index)`)
      },
      {
        label: T("Test de significativité", "Significance test"),
        lang: "python",
        body: T(
`def _poisson_rate_pvalue(n_prev: np.ndarray, n_curr: np.ndarray) -> np.ndarray:
    """Test de comparaison de deux comptages (approximation binomiale).

    Sous l'hypothèse « même intensité d'achat sur les deux périodes », le
    nombre de transactions de la période courante suit une binomiale
    B(n_prev + n_curr, 0.5). On en tire un z-score puis une p-value bilatérale.
    """
    total = n_prev + n_curr
    with np.errstate(invalid="ignore", divide="ignore"):
        z = np.where(total > 0,
                     (n_curr - n_prev) / np.sqrt(np.maximum(total, 1)), 0.0)
    return 2.0 * stats.norm.sf(np.abs(z))


# Test principal : z-score sur la volatilité historique de LA combinaison.
#   z = (delta_observe - mu * k) / (sigma * sqrt(k))     k = mois d'écart
# Le sqrt(k) traduit que la variance d'une marche aléatoire croît avec
# l'horizon. La p-value passe par une loi de Student (df = n_variations - 1)
# et non une loi normale : sigma est estimé sur 5 points seulement.`,
`def _poisson_rate_pvalue(n_prev: np.ndarray, n_curr: np.ndarray) -> np.ndarray:
    """Two-count comparison test (binomial approximation).

    Under the hypothesis of identical purchase intensity across both
    periods, the current period's transaction count follows a binomial
    B(n_prev + n_curr, 0.5). From it we derive a z-score and a two-sided
    p-value.
    """
    total = n_prev + n_curr
    with np.errstate(invalid="ignore", divide="ignore"):
        z = np.where(total > 0,
                     (n_curr - n_prev) / np.sqrt(np.maximum(total, 1)), 0.0)
    return 2.0 * stats.norm.sf(np.abs(z))


# Main test: z-score against THAT combination's historical volatility.
#   z = (observed_delta - mu * k) / (sigma * sqrt(k))     k = months apart
# The sqrt(k) reflects that a random walk's variance grows with the
# horizon. The p-value uses a Student law (df = n_changes - 1) rather than
# a normal law: sigma is estimated on only 5 points.`)
      },
      {
        label: T("Plancher de volatilité", "Volatility floor"),
        lang: "python",
        body: T(
`# Avec 5 ou 6 mois d'historique, l'écart-type propre à une combinaison est
# lui-même très bruité et SOUS-ESTIME souvent la vraie variance — ce qui
# produirait une avalanche de faux positifs (14 alertes sur un mois plat).
#
#   sigma_retenu   = max(sigma_propre, ratio_plancher * niveau_moyen)
#   ratio_plancher = max(3 %, volatilité relative médiane du portefeuille)
#
# Autrement dit : on ne suppose JAMAIS qu'une combinaison est moins volatile
# que la médiane du portefeuille. Le biais est volontairement conservateur.
# Sur ce jeu de données, le plancher s'établit à ~13,8 % et fait tomber les
# baisses signalées de 14 à 7, sans perdre aucun choc réellement injecté.

floor_ratio  = max(0.03, float(np.nanmedian(rel_vol)))
sigma        = np.maximum(sigma_own, floor_ratio * level_mean)`,
`# With 5 or 6 months of history, a combination's own standard deviation is
# itself very noisy and often UNDERSTATES the true variance — which would
# produce an avalanche of false positives (14 alerts in an otherwise flat
# month).
#
#   sigma_used  = max(own_sigma, floor_ratio * mean_level)
#   floor_ratio = max(3%, median relative volatility of the portfolio)
#
# In other words: we NEVER assume a combination is less volatile than the
# portfolio median. The bias is deliberately conservative. On this dataset
# the floor lands at ~13.8% and cuts flagged declines from 14 to 7, without
# losing a single genuinely injected shock.

floor_ratio  = max(0.03, float(np.nanmedian(rel_vol)))
sigma        = np.maximum(sigma_own, floor_ratio * level_mean)`)
      },
      {
        label: T("Verdict de concentration", "Concentration verdict"),
        lang: "python",
        body: T(
`# Le verdict est calculé, pas interprété.
#
#  Concentrée              top 3 >= 55 %   OU  <= 4 combinaisons pour 80 %
#                          -> problème localisé et actionnable
#  Modérément concentrée   top 5 >= 55 %   OU  <= 20 % des combos pour 80 %
#                          -> noyau dur + érosion de fond
#  Dispersée               sinon
#                          -> érosion généralisée, signal macro
#
# C'est le seul écran qui change la NATURE de la décision : enquête
# opérationnelle ciblée d'un côté, lecture marché de l'autre.

if top3_share >= 0.55 or combos_for_80 <= 4:
    verdict = "concentrated"
elif top5_share >= 0.55 or combos_for_80 <= 0.20 * n_declining:
    verdict = "moderate"
else:
    verdict = "dispersed"`,
`# The verdict is computed, not interpreted.
#
#  Concentrated           top 3 >= 55%   OR  <= 4 combinations for 80%
#                         -> localised, actionable problem
#  Moderately concentrated top 5 >= 55%  OR  <= 20% of combos for 80%
#                         -> hard core plus background erosion
#  Dispersed              otherwise
#                         -> generalised erosion, macro signal
#
# This is the one screen that changes the NATURE of the decision: a
# targeted operational investigation on one side, a market read on the
# other.

if top3_share >= 0.55 or combos_for_80 <= 4:
    verdict = "concentrated"
elif top5_share >= 0.55 or combos_for_80 <= 0.20 * n_declining:
    verdict = "moderate"
else:
    verdict = "dispersed"`)
      }
    ],
    difficulties: [
      { p: T("Un bruit uniforme ne prouve rien : un dataset aléatoire aurait produit un classement de moteurs vide de sens.",
             "Uniform noise proves nothing: a random dataset would have produced a meaningless driver ranking."),
        s: T("Chocs volontairement concentrés sur quelques combinaisons, plus une dérive de fond calibrée analytiquement pour atteindre exactement la cible de -8 %.",
             "Shocks deliberately concentrated on a few combinations, plus a background drift calibrated analytically to hit the -8% target exactly.") },
      { p: T("La baisse globale tombait à -7,0 % au lieu de -8 % : le mois de référence portait sa propre saisonnalité.",
             "The overall drop landed at -7.0% instead of -8%: the baseline month carried its own seasonality."),
        s: T("Calibration de la dérive corrigée du ratio de saisonnalité entre les deux mois.",
             "Drift calibration corrected by the seasonality ratio between the two months.") },
      { p: T("Le tirage multinomial empêchait toute baisse de volume : réduire un segment gonflait mécaniquement les autres.",
             "Multinomial sampling made any volume drop impossible: shrinking one segment mechanically inflated the others."),
        s: T("Passage à un tirage de Poisson par combinaison, qui laisse le volume total varier librement.",
             "Switched to Poisson sampling per combination, which lets total volume vary freely.") },
      { p: T("11 à 15 combinaisons signalées sur un mois pourtant plat.",
             "11 to 15 combinations flagged in an otherwise flat month."),
        s: T("Plancher de volatilité fondé sur la volatilité relative médiane du portefeuille, et p-values calculées avec une loi de Student.",
             "A volatility floor based on the portfolio's median relative volatility, with p-values computed under a Student law.") },
      { p: T("Le graphique débordait sur le texte dès que l'utilisateur augmentait le nombre de combinaisons affichées.",
             "The chart overflowed onto the text as soon as the user increased the number of combinations shown."),
        s: T("Hauteur du conteneur calculée à partir du nombre de barres et renvoyée par le callback ; la figure n'impose plus sa propre hauteur.",
             "Container height computed from the bar count and returned by the callback; the figure no longer imposes its own height.") },
      { p: T("Le mode sombre ne s'appliquait pas aux dropdowns Dash, qui gardaient un fond blanc.",
             "Dark mode didn't reach the Dash dropdowns, which kept a white background."),
        s: T("Règles CSS ciblant les classes réelles de Dash 4 (.dash-dropdown-trigger, .dash-dropdown-menu, .dash-dropdown-option).",
             "CSS rules targeting Dash 4's actual classes (.dash-dropdown-trigger, .dash-dropdown-menu, .dash-dropdown-option).") }
    ],
    limits: [
      T("Le test suppose des variations mensuelles approximativement normales et indépendantes : sur des séries fortement saisonnières, il faudrait désaisonnaliser ou comparer M à M-12.",
        "The test assumes approximately normal, independent monthly changes: on strongly seasonal series you would deseasonalise or compare M to M-12."),
      T("96 combinaisons testées simultanément : quelques faux positifs à 2σ sont attendus. Le curseur de seuil permet de durcir le critère.",
        "96 combinations tested at once: a few false positives at 2σ are expected. The threshold slider lets you tighten the criterion."),
      T("La décomposition est descriptive, pas causale : elle indique où regarder, pas pourquoi.",
        "The decomposition is descriptive, not causal: it says where to look, not why."),
      T("Le cache lru_cache vit dans la mémoire du processus — un déploiement multi-utilisateurs demanderait un cache partagé.",
        "The lru_cache lives in process memory — a multi-user deployment would need a shared cache."),
      T("Changer de langue ou de thème reconstruit la page entière et réinitialise les filtres de tableau en cours.",
        "Changing language or theme rebuilds the whole page and resets any table filters in progress.")
    ]
  },

  run: "python app.py   →   http://127.0.0.1:8051"
},

/* ═════════════════════════════════════════════════════════════════════════
   03 — INVENTORY LOST SALES DETECTOR
   ═════════════════════════════════════════════════════════════════════════ */
{
  slug: "inventory-lost",
  num: "03",
  title: "Inventory Lost Sales Detector",
  family: T("Supply Chain", "Supply Chain"),
  familyKey: "supply",
  accent: "#1E6B72",
  accentDark: "#6FC4C8",
  tags: ["Python", "Dash 4", "scikit-learn", "Poisson", "Prophet", "Plotly"],
  cover: "assets/img/shots/inventory-lost/thumbs/01-vue-d-ensemble.webp",

  headline: T(
    "Zéro vente n'est pas zéro demande : 7,9 % du chiffre d'affaires détruit par des ruptures que rien, dans les données brutes, ne rendait visible.",
    "Zero sales is not zero demand: 7.9% of revenue destroyed by stockouts that nothing in the raw data made visible."),

  pitch: T(
    "Quand un produit est en rupture, le système enregistre une demande nulle. C'est faux — et cette erreur empoisonne la prévision, qui commande moins, donc provoque la rupture suivante. L'outil reconstitue la demande contrefactuelle et la convertit en file de réapprovisionnement priorisée.",
    "When a product is out of stock, the system records zero demand. That is wrong — and the error poisons the forecast, which orders less and so causes the next stockout. The tool reconstructs counterfactual demand and turns it into a prioritised replenishment queue."),

  problem: T(
    "Quand un produit est en rupture, la ligne de vente tombe à zéro et le système enregistre une demande nulle. C'est faux : des clients se sont présentés et sont partis ailleurs. Trois conséquences en chaîne — le manque à gagner est invisible, la prévision apprend que la demande baisse donc commande moins et provoque la rupture suivante, et l'arbitrage de réapprovisionnement se fait à l'aveugle puisque toutes les ruptures se valent dans le reporting.",
    "When a product is out of stock the sales line drops to zero and the system records demand as nil. That is false: customers came and went elsewhere. Three knock-on effects — the shortfall is invisible, the forecast learns that demand is falling so it orders less and causes the next stockout, and replenishment decisions are blind because every stockout looks the same in the reporting."),

  dataset: {
    source: T("Généré localement par data/generate_data.py dans data/sales.csv. Aucun ERP, WMS ou système de caisse n'est interrogé.",
              "Generated locally by data/generate_data.py into data/sales.csv. No ERP, WMS or point-of-sale system is queried."),
    volume: T("≈ 55 000 lignes : 182 jours consécutifs × 10 magasins × 30 références réparties en 5 catégories.",
              "≈ 55,000 rows: 182 consecutive days × 10 stores × 30 SKUs across 5 categories."),
    fields: ["date", "store", "sku", "category", "unit_price", "units_sold",
             "stock_level", "in_stock", "latent_demand"],
    note: T("Le générateur simule une demande structurée (niveau propre au couple, profil jour de semaine, tendance par SKU, vague saisonnière par catégorie, promotions, bruit de Poisson), une politique de réapprovisionnement hebdomadaire, puis injecte des retards fournisseur de 3 à 14 jours. Cinq couples magasin × catégorie sont rendus chroniques (risque × 2,6) et quatorze ruptures restent ouvertes au dernier jour. latent_demand est la vérité terrain : elle sert au contrôle qualité, le moteur ne la lit jamais.",
              "The generator simulates structured demand (pair-level baseline, day-of-week profile, per-SKU trend, seasonal wave by category, promotions, Poisson noise), a weekly replenishment policy, then injects supplier delays of 3 to 14 days. Five store × category pairs are made chronic (risk × 2.6) and fourteen stockouts are left open on the final day. latent_demand is ground truth: used for quality control, never read by the engine.")
  },

  links: { repo: "", demo: "" },

  context: {
    secteur: T("Distribution alimentaire et biens de grande consommation",
               "Grocery and fast-moving consumer goods retail"),
    modele: T("Réseau de 10 magasins × 30 références × 5 catégories, 182 jours",
              "Network of 10 stores × 30 SKUs × 5 categories, 182 days"),
    role: T("Analyste supply chain rattaché à la direction des opérations, chargé de chiffrer un manque à gagner que personne ne voyait et de le transformer en priorités d'action",
            "Supply-chain analyst reporting to operations leadership, tasked with quantifying a shortfall nobody could see and turning it into action priorities"),
    perimetre: T("≈ 55 000 lignes jour × SKU × magasin, 457 épisodes de rupture",
                 "≈ 55,000 day × SKU × store rows, 457 stockout episodes"),
    calcul: T("300 séries ajustées en ~30 s au premier lancement, puis cache disque invalidé automatiquement",
              "300 series fitted in ~30 s on first launch, then a disk cache invalidated automatically"),
    stack: "Python · Dash 4 · Plotly · pandas · NumPy · scikit-learn (Poisson) · Prophet (option)"
  },

  kpis: [
    { value: 211.7, label: T("Revenu perdu estimé", "Estimated lost revenue"),
      note: T("vérité simulée : 211,2 k$ · écart +0,2 %", "simulated truth: $211.2K · gap +0.2%"),
      suffix: T(" k$", "K$"), decimals: 1 },
    { value: 457, label: T("Épisodes de rupture", "Stockout episodes"),
      note: T("3 933 jours-couples à stock nul", "3,933 pair-days at zero stock"), suffix: "" },
    { value: 8.6, label: T("Durée moyenne", "Average duration"),
      note: T("de 3 à 14 jours de retard fournisseur", "3 to 14 days of supplier delay"),
      suffix: T(" j", " d"), decimals: 1 },
    { value: 14, label: T("Ruptures encore ouvertes", "Stockouts still open"),
      note: T("la seule perte encore évitable aujourd'hui", "the only loss still avoidable today"), suffix: "" }
  ],

  questions: [
    T("Pour chaque SKU et chaque magasin en rupture, combien de ventes a-t-on réellement perdues — en dollars, pas en jours ?",
      "For every SKU and every store out of stock, how many sales did we actually lose — in dollars, not in days?"),
    T("Où concentrer l'effort de réapprovisionnement quand toutes les ruptures se ressemblent dans le reporting ?",
      "Where should replenishment effort go when every stockout looks alike in the reporting?"),
    T("S'agit-il d'incidents isolés ou d'un problème structurel de processus sur un magasin ou une catégorie ?",
      "Are these isolated incidents or a structural process problem in one store or one category?")
  ],

  framework: {
    intro: T(
      "Classer les ruptures par durée ou par nombre d'épisodes conduit à traiter en priorité des références sans enjeu. Le cadrage a imposé une valorisation en dollars dès la première étape, et un score de priorité relatif au parc.",
      "Ranking stockouts by duration or episode count means prioritising SKUs with no stake. The framing imposed dollar valuation from step one, and a priority score relative to the whole estate."),
    metrics: [
      { name: T("Revenu perdu estimé", "Estimated lost revenue"),
        why: T("45 % du score de priorité — la seule unité qui permet d'arbitrer",
               "45% of the priority score — the only unit you can arbitrate with") },
      { name: T("Chronicité (nb d'épisodes)", "Chronicity (episode count)"),
        why: T("20 % — distingue l'accident du processus défaillant",
               "20% — tells an accident apart from a broken process") },
      { name: T("Urgence (rupture en cours)", "Urgency (currently out of stock)"),
        why: T("15 % — la seule perte encore évitable aujourd'hui",
               "15% — the only loss still avoidable today") }
    ],
    dimensions: [
      { name: T("Magasin", "Store"),
        why: T("une ligne chaude dans la heatmap désigne un magasin qui décroche",
               "a hot row in the heatmap points to a store that is slipping") },
      { name: T("Catégorie produit", "Product category"),
        why: T("une colonne chaude désigne un sujet amont : fournisseur, allocation, prévision",
               "a hot column points upstream: supplier, allocation, forecast") },
      { name: T("Couple SKU × magasin", "SKU × store pair"),
        why: T("la maille d'action réelle du réapprovisionnement",
               "the actual grain at which replenishment acts") }
    ]
  },

  method: [
    T("Détection des épisodes", "Episode detection"),
    T("Désaisonnalisation jour de semaine", "Day-of-week deseasonalisation"),
    T("Demande contrefactuelle (2 méthodes)", "Counterfactual demand (2 methods)"),
    T("Valorisation en dollars", "Dollar valuation"),
    T("Score de priorité relatif", "Relative priority score")
  ],

  figures: [
    {
      img: "assets/img/shots/inventory-lost/01-vue-d-ensemble.webp",
      thumb: "assets/img/shots/inventory-lost/thumbs/01-vue-d-ensemble.webp",
      title: T("Le manque à gagner remis en regard du chiffre d'affaires encaissé : 7,9 % de CA détruit sans laisser aucune trace comptable",
               "The shortfall set against booked revenue: 7.9% of revenue destroyed without leaving any accounting trace"),
      read: T("Le niveau d'agrégation bascule entre couple SKU × magasin, magasin, SKU et catégorie — sans jamais recalculer : toutes les vues partent de la même table journalière, les totaux sont donc cohérents par construction.",
              "The aggregation level switches between SKU × store pair, store, SKU and category — with no recomputation: every view starts from the same daily table, so totals are consistent by construction.")
    },
    {
      img: "assets/img/shots/inventory-lost/02-explorateur-sku-magasin.webp",
      thumb: "assets/img/shots/inventory-lost/thumbs/02-explorateur-sku-magasin.webp",
      title: T("L'aire entre les ventes réelles et les deux estimations en pointillés est, littéralement, le trou de vente",
               "The area between actual sales and the two dotted estimates is, literally, the sales hole"),
      read: T("Les deux méthodes sont affichées ensemble volontairement : leur écart est un indicateur de confiance. Écart faible, l'estimation est robuste ; écart fort, l'arbitrage revient à l'humain.",
              "Both methods are shown together on purpose: the gap between them is a confidence indicator. Small gap, the estimate is robust; large gap, the call goes back to a human.")
    },
    {
      img: "assets/img/shots/inventory-lost/03-priorisation-reappro.webp",
      thumb: "assets/img/shots/inventory-lost/thumbs/03-priorisation-reappro.webp",
      title: T("Le nuage durée × revenu perdu sert de contrôle visuel du score : ce qui est en haut à droite doit se retrouver en haut du tableau",
               "The duration × lost-revenue scatter is a visual check on the score: whatever sits top-right must sit at the top of the table"),
      read: T("Taille des points = nombre d'épisodes historiques. Règle de sécurité : un couple encore en rupture dont l'impact dépasse la médiane est remonté d'office en « Urgent », quel que soit son score composite.",
              "Dot size = number of historical episodes. Safety rule: any pair still out of stock whose impact exceeds the median is forced to “Urgent”, whatever its composite score.")
    },
    {
      img: "assets/img/shots/inventory-lost/04-magasin-x-categorie.webp",
      thumb: "assets/img/shots/inventory-lost/thumbs/04-magasin-x-categorie.webp",
      title: T("La heatmap sépare l'incident du processus : une case chaude est un accident, une ligne ou une colonne chaude est un problème structurel",
               "The heatmap separates incident from process: a hot cell is an accident, a hot row or column is a structural problem"),
      read: T("Une ligne chaude désigne un magasin qui décroche (sujet exécution). Une colonne chaude désigne une catégorie mal approvisionnée sur tout le parc — donc un sujet amont : fournisseur, allocation, prévision. Deux plans d'action différents.",
              "A hot row points to a store that is slipping (an execution issue). A hot column points to a category poorly supplied across the whole estate — an upstream issue: supplier, allocation, forecast. Two different action plans.")
    }
  ],

  insights: [
    {
      title: T("Le manque à gagner égale 7,9 % du chiffre d'affaires réalisé — et il est invisible par construction",
               "The shortfall equals 7.9% of booked revenue — and it is invisible by construction"),
      data: T("457 épisodes de rupture couvrant 3 933 jours-couples détruisent 211,7 k$ de ventes estimées, soit 7,9 % du CA encaissé sur six mois, pour 7,2 % des observations jour × SKU × magasin.",
              "457 stockout episodes covering 3,933 pair-days destroy an estimated $211.7K of sales — 7.9% of revenue booked over six months, from 7.2% of day × SKU × store observations."),
      soWhat: T("Ce montant n'apparaît nulle part dans les données brutes : il n'y a rien à voir, justement parce qu'il n'y a rien eu. Aucun arbitrage stock / trésorerie ne peut être correct tant que ce chiffre n'existe pas.",
                "That amount appears nowhere in the raw data: there is nothing to see, precisely because nothing happened. No stock-versus-cash trade-off can be right while this number does not exist."),
      driver: T("Pire, la boucle s'auto-entretient : un jour de rupture enregistré comme « demande = 0 » apprend au modèle de prévision que la demande baisse, il prévoit moins, commande moins, et provoque la rupture suivante.",
                "Worse, the loop is self-sustaining: a stockout day recorded as “demand = 0” teaches the forecasting model that demand is falling, so it forecasts less, orders less, and causes the next stockout."),
      team: T("Direction des opérations · Supply", "Operations leadership · Supply")
    },
    {
      title: T("Cinq couples magasin × catégorie concentrent le problème structurel",
               "Five store × category pairs concentrate the structural problem"),
      data: T("Le générateur rend cinq couples magasin × catégorie chroniques (risque de rupture × 2,6). La heatmap les fait ressortir comme lignes et colonnes chaudes, là où le reste du parc n'affiche que des cases isolées.",
              "The generator makes five store × category pairs chronic (stockout risk × 2.6). The heatmap surfaces them as hot rows and columns, where the rest of the estate shows only isolated cells."),
      soWhat: T("Traiter ces cinq couples relève d'un plan amont (fournisseur, allocation, paramètres de réappro) et non d'un rappel à l'ordre magasin par magasin. Le levier n'est pas au même endroit que l'effet.",
                "Fixing these five pairs calls for an upstream plan (supplier, allocation, replenishment parameters), not a store-by-store reprimand. The lever is not where the effect is."),
      driver: T("La séparation ligne / colonne est explicite : ligne chaude = magasin qui décroche (exécution), colonne chaude = catégorie mal approvisionnée sur tout le parc (amont).",
                "The row / column split is explicit: hot row = a store slipping (execution), hot column = a category poorly supplied estate-wide (upstream)."),
      team: T("Achats · Approvisionnement", "Buying · Replenishment")
    },
    {
      title: T("Les deux méthodes tombent juste sur l'agrégat, le modèle gagne sur le quotidien",
               "Both methods land on the aggregate; the model wins on the daily view"),
      data: T("Contrôle qualité contre la vérité simulée (211 175 $) : moyenne mobile ajustée 209 029 $ (-1,0 %, erreur journalière 10,4 %), régression de Poisson 211 679 $ (+0,2 %, erreur journalière 8,8 %).",
              "Quality control against the simulated truth ($211,175): adjusted moving average $209,029 (-1.0%, daily error 10.4%), Poisson regression $211,679 (+0.2%, daily error 8.8%)."),
      soWhat: T("Pour chiffrer un enjeu global, la méthode simple suffit et s'explique en une phrase devant un responsable de magasin. Pour dimensionner une commande jour par jour, le modèle apporte 1,6 point d'erreur en moins.",
                "To size an overall stake, the simple method is enough and explains itself in one sentence to a store manager. To size an order day by day, the model buys 1.6 points of error."),
      driver: T("L'écart vient de la tendance et de la saisonnalité longue, que la moyenne des 14 derniers jours ne capte pas : sur une rupture de trois semaines, elle sous-estime une référence en croissance.",
                "The gap comes from trend and long seasonality, which a 14-day average cannot capture: over a three-week stockout it understates a growing SKU."),
      team: T("Data · Supply", "Data · Supply")
    }
  ],

  matrix: [
    { action: T("Traiter en priorité les 14 ruptures encore ouvertes dont l'impact dépasse la médiane",
                "Prioritise the 14 still-open stockouts whose impact exceeds the median"),
      priority: "Haute",
      impact: T("La seule perte encore évitable — le reste est déjà consommé",
                "The only loss still avoidable — the rest is already spent"),
      owner: T("Approvisionnement", "Replenishment"),
      kpi: T("Jours de rupture ouverts", "Open stockout days") },
    { action: T("Réinjecter la demande estimée dans l'historique servant à entraîner la prévision, à la place des zéros de rupture",
                "Feed estimated demand back into the forecast training history, replacing the stockout zeros"),
      priority: "Haute",
      impact: T("Casse la boucle auto-entretenue rupture → sous-prévision → rupture",
                "Breaks the self-sustaining loop stockout → under-forecast → stockout"),
      owner: T("Supply & Data", "Supply & Data"),
      kpi: T("Erreur de prévision · taux de rupture", "Forecast error · stockout rate") },
    { action: T("Ouvrir un plan amont sur les 5 couples magasin × catégorie chroniques (fournisseur, allocation, paramètres)",
                "Open an upstream plan on the 5 chronic store × category pairs (supplier, allocation, parameters)"),
      priority: "Haute",
      impact: T("Cible le problème structurel plutôt que ses symptômes",
                "Targets the structural problem rather than its symptoms"),
      owner: T("Achats", "Buying"),
      kpi: T("Nombre d'épisodes par couple", "Episodes per pair") },
    { action: T("Modéliser le report de demande vers les produits de substitution",
                "Model demand transfer to substitute products"),
      priority: "Moyenne",
      impact: T("Le chiffre affiché est un majorant : la perte nette enseigne est inférieure",
                "The figure shown is an upper bound: the chain's net loss is lower"),
      owner: T("Data · Category Management", "Data · Category Management"),
      kpi: T("Taux de report par catégorie", "Transfer rate by category") },
    { action: T("Brancher l'outil sur l'ERP / WMS en remplaçant la couche de chargement",
                "Plug the tool into the ERP / WMS by replacing the loading layer"),
      priority: "Basse",
      impact: T("Passage d'une démonstration à un pilotage quotidien",
                "Moves from a demonstration to daily steering"),
      owner: "Data Engineering",
      kpi: T("Fraîcheur du stock", "Stock freshness") }
  ],

  appendix: {
    code: [
      {
        label: T("Demande contrefactuelle", "Counterfactual demand"),
        lang: "python",
        body: T(
`# models/lost_sales_engine.py — méthode 1 : moyenne mobile ajustée
#
#   demande_estimee(j) = moyenne( ventes_i / f_jds(i) ) x f_jds(j)
#
# 1. les 14 derniers jours EN STOCK précédant la rupture ;
# 2. chacun désaisonnalisé par son coefficient jour de semaine ;
# 3. moyenne des valeurs désaisonnalisées = niveau de base ;
# 4. pour chaque jour de rupture, on ré-applique le coefficient du jour visé.
#
# Explicable en une phrase devant un responsable de magasin, ne demande
# aucun historique long, ne peut pas diverger. C'est la référence de contrôle.

base   = np.mean(units_window / dow[dows_window])
demand = base * dow[target_dows]

# Valorisation
revenu_perdu = demande_estimee * prix_unitaire`,
`# models/lost_sales_engine.py — method 1: adjusted moving average
#
#   estimated_demand(d) = mean( sales_i / f_dow(i) ) x f_dow(d)
#
# 1. the last 14 IN-STOCK days before the stockout;
# 2. each deseasonalised by its day-of-week factor;
# 3. mean of the deseasonalised values = base level;
# 4. for each stockout day, re-apply the target day's factor.
#
# Explainable in one sentence to a store manager, needs no long history,
# cannot diverge. This is the control baseline.

base   = np.mean(units_window / dow[dows_window])
demand = base * dow[target_dows]

# Valuation
lost_revenue = estimated_demand * unit_price`)
      },
      {
        label: T("Coefficients jour de semaine", "Day-of-week factors"),
        lang: "python",
        body: T(
`def dow_factors(units: np.ndarray, dows: np.ndarray) -> np.ndarray:
    """Coefficients multiplicatifs par jour de semaine, lissés.

    Un coefficient de 1,25 le samedi signifie « le samedi vend 25 % de plus
    que la moyenne du couple ». Le lissage évite qu'un jour observé deux fois
    seulement n'impose un coefficient extrême.
    """
    factors = np.ones(7)
    overall = float(units.mean())
    for day in range(7):
        mask = dows == day
        n = int(mask.sum())
        if n == 0:
            continue
        raw    = float(units[mask].mean()) / overall
        weight = n / (n + DOW_SHRINKAGE)      # shrinkage vers 1
        factors[day] = 1.0 + weight * (raw - 1.0)
    return np.clip(factors, 0.35, 2.5)`,
`def dow_factors(units: np.ndarray, dows: np.ndarray) -> np.ndarray:
    """Smoothed multiplicative day-of-week factors.

    A factor of 1.25 on Saturday means "Saturday sells 25% above this
    pair's average". Smoothing stops a day observed only twice from
    imposing an extreme factor.
    """
    factors = np.ones(7)
    overall = float(units.mean())
    for day in range(7):
        mask = dows == day
        n = int(mask.sum())
        if n == 0:
            continue
        raw    = float(units[mask].mean()) / overall
        weight = n / (n + DOW_SHRINKAGE)      # shrink towards 1
        factors[day] = 1.0 + weight * (raw - 1.0)
    return np.clip(factors, 0.35, 2.5)`)
      },
      {
        label: T("Méthode avancée", "Advanced method"),
        lang: "python",
        body: T(
`# Méthode 2 : régression de Poisson entraînée UNIQUEMENT sur les jours
# en stock — sinon le modèle apprendrait les zéros qu'on cherche à corriger.
#
# Features : tendance linéaire, indicatrices jour de semaine,
#            deux harmoniques de Fourier sur la fenêtre observée.
# Adaptée à des comptages (variance croissante avec le niveau) et
# POSITIVE PAR CONSTRUCTION.

from sklearn.linear_model import PoissonRegressor

X_train = _design_matrix(train.index, origin, span)     # jours EN STOCK
model   = PoissonRegressor(alpha=1e-3, max_iter=500).fit(X_train, train.units)
demand  = model.predict(_design_matrix(target_dates, origin, span))

# Repli automatique et silencieux : Prophet absent, import cassé, Stan
# manquant ou modèle divergent -> régression de Poisson, et l'interface
# l'affiche sous le sélecteur de méthode.
# Moins de 45 jours en stock -> méthode simple pour CE couple.`,
`# Method 2: Poisson regression trained ONLY on in-stock days — otherwise
# the model would learn the very zeros we are trying to correct.
#
# Features: linear trend, day-of-week indicators, two Fourier harmonics
#           over the observed window.
# Suited to counts (variance growing with the level) and POSITIVE BY
# CONSTRUCTION.

from sklearn.linear_model import PoissonRegressor

X_train = _design_matrix(train.index, origin, span)     # IN-STOCK days
model   = PoissonRegressor(alpha=1e-3, max_iter=500).fit(X_train, train.units)
demand  = model.predict(_design_matrix(target_dates, origin, span))

# Automatic, silent fallback: Prophet missing, broken import, no Stan or a
# diverging model -> Poisson regression, and the interface says so under
# the method selector.
# Fewer than 45 in-stock days -> simple method for THAT pair.`)
      },
      {
        label: T("Score de priorité", "Priority score"),
        lang: "python",
        body: T(
`# models/priority_scoring.py
# Chaque composante est convertie en RANG CENTILE (0-100) au sein de la
# population des couples en rupture : le score se lit comme une position
# (« ce couple est dans le pire décile ») et reste insensible aux unités.

score = (0.45 * pct(impact)        # revenu perdu sur la période
       + 0.20 * pct(chronicite)    # nombre d'épisodes distincts
       + 0.20 * pct(duree)         # jours de rupture cumulés
       + 0.15 * urgence)           # 100 si en cours, sinon décroissance 30 j

#  >= 70  Urgent          -> réapprovisionner aujourd'hui
#  45-69  À surveiller    -> replanifier la commande
#  < 45   Sous contrôle   -> surveillance simple

# Règle de sécurité : un couple ENCORE en rupture dont l'impact dépasse la
# médiane est remonté d'office en « Urgent », quel que soit son composite.
# C'est la seule perte que l'on peut encore éviter.`,
`# models/priority_scoring.py
# Every component is converted to a PERCENTILE RANK (0-100) within the
# population of stocked-out pairs: the score reads as a position ("this
# pair is in the worst decile") and stays unit-agnostic.

score = (0.45 * pct(impact)       # lost revenue over the period
       + 0.20 * pct(chronicity)   # number of distinct episodes
       + 0.20 * pct(duration)     # cumulative stockout days
       + 0.15 * urgency)          # 100 if ongoing, else 30-day decay

#  >= 70  Urgent         -> replenish today
#  45-69  Watch          -> reschedule the order
#  < 45   Under control  -> simple monitoring

# Safety rule: a pair STILL out of stock whose impact exceeds the median
# is forced to "Urgent", whatever its composite score. It is the only loss
# we can still avoid.`)
      }
    ],
    difficulties: [
      { p: T("Ajuster 300 séries à chaque démarrage rendait l'application inutilisable.",
             "Fitting 300 series on every start made the application unusable."),
        s: T("Cache disque des estimations, invalidé automatiquement dès que sales.csv change. Premier lancement ~30 s, suivants immédiats.",
             "A disk cache of the estimates, invalidated automatically whenever sales.csv changes. First launch ~30 s, later ones instant.") },
      { p: T("Entraîner le modèle sur tout l'historique lui faisait apprendre les zéros de rupture — exactement ce qu'on cherche à corriger.",
             "Training on the full history made the model learn the stockout zeros — exactly what we are trying to correct."),
        s: T("Apprentissage restreint aux jours en stock, prédiction sur les jours de rupture uniquement.",
             "Training restricted to in-stock days, prediction on stockout days only.") },
      { p: T("Un couple avec moins de 45 jours en stock produisait un modèle instable.",
             "A pair with fewer than 45 in-stock days produced an unstable model."),
        s: T("Repli automatique sur la méthode simple pour ce couple précis, signalé dans l'interface.",
             "Automatic fallback to the simple method for that specific pair, flagged in the interface.") },
      { p: T("Prophet multiplie le temps d'ajustement par dix pour un gain marginal.",
             "Prophet multiplies fitting time by ten for a marginal gain."),
        s: T("Désactivé par défaut même s'il est installé ; activable par ILSD_USE_PROPHET=1, avec repli silencieux si Stan manque.",
             "Off by default even when installed; enabled with ILSD_USE_PROPHET=1, with a silent fallback if Stan is missing.") },
      { p: T("Les totaux par magasin, par catégorie et le KPI de tête pouvaient diverger selon la période choisie.",
             "Store totals, category totals and the headline KPI could diverge depending on the selected period."),
        s: T("Toutes les agrégations partent de la même table journalière : la cohérence est garantie par construction, pas par vérification.",
             "Every aggregation starts from the same daily table: consistency is guaranteed by construction, not by checking.") }
    ],
    limits: [
      T("Les méthodes estiment la demande DU PRODUIT, pas la demande DU CLIENT : une partie des ventes est reportée sur une référence de substitution. Le chiffre affiché est un majorant.",
        "The methods estimate demand FOR THE PRODUCT, not demand FROM THE CUSTOMER: part of the sales shifts to a substitute SKU. The figure shown is an upper bound."),
      T("Elles supposent que la rupture est la seule cause du zéro : une fermeture de magasin ou un déréférencement produirait le même signal.",
        "They assume the stockout is the only cause of the zero: a store closure or a delisting would produce the same signal."),
      T("Ni promotion à venir, ni effet prix, ni cannibalisation ne sont intégrés.",
        "Neither upcoming promotions, nor price effects, nor cannibalisation are included."),
      T("Plus l'épisode est long, plus l'extrapolation est fragile : sur trois semaines, le dernier jour estimé est bien moins fiable que le premier.",
        "The longer the episode, the more fragile the extrapolation: over three weeks the last estimated day is far less reliable than the first."),
      T("Aucune connexion ERP, WMS ou caisse : les données sont synthétiques et générées localement.",
        "No ERP, WMS or point-of-sale connection: the data is synthetic and generated locally."),
      T("L'outil produit une priorité, pas une commande : elle reste à confronter aux délais fournisseur, minimums de commande et capacité de stockage.",
        "The tool produces a priority, not an order: it still has to be weighed against supplier lead times, minimum order quantities and storage capacity.")
    ]
  },

  run: "python app.py   →   http://127.0.0.1:8052"
},

/* ═════════════════════════════════════════════════════════════════════════
   04 — MARKETING CONTACT FATIGUE OPTIMIZER
   ═════════════════════════════════════════════════════════════════════════ */
{
  slug: "contact-fatigue",
  num: "04",
  title: "Marketing Contact Fatigue Optimizer",
  family: T("Marketing", "Marketing"),
  familyKey: "marketing",
  accent: "#3F4E8C",
  accentDark: "#94A2E6",
  tags: ["Python", "Dash 4", "Plotly", "pandas", "NumPy", "Sphinx"],
  cover: "assets/img/shots/contact-fatigue/thumbs/01-vue-d-ensemble.webp",

  headline: T(
    "Un client, un seul message : 47 % du portefeuille est adressable, et les 53 % restants ne sont pas une perte mais trois chantiers chiffrés.",
    "One customer, one message: 47% of the book is addressable, and the remaining 53% is not a loss but three quantified workstreams."),

  pitch: T(
    "Trois modèles d'appétence produit désignent le même client et ne savent pas se départager. L'arbitre manquant regarde le client dans son ensemble — appétence ET pression subie — et accepte une réponse que les outils de ciblage ne savent pas produire : « aucune, laissez-le tranquille ».",
    "Three product-propensity models pick the same customer and cannot break the tie. The missing referee looks at the customer as a whole — propensity AND pressure already applied — and accepts an answer targeting tools cannot produce: “none, leave them alone”."),

  problem: T(
    "Trois modèles d'appétence produit désignent chacun « leurs » meilleurs clients. Superposés, ils remontent le même client — qui ne recevra qu'une communication. Personne ne sait laquelle, et surtout personne ne se demande s'il faut vraiment en envoyer une alors qu'il a déjà été sollicité six fois ce trimestre. Le coût de la sur-sollicitation n'est instrumenté nulle part : la conversion se mesure la semaine suivante, la fatigue se paie sur les douze mois d'après.",
    "Three product-propensity models each nominate “their” best customers. Overlaid, they surface the same person — who will only receive one message. Nobody knows which, and above all nobody asks whether one should be sent at all when they have already been contacted six times this quarter. The cost of over-contacting is instrumented nowhere: conversion is measured the following week, fatigue is paid over the following twelve months."),

  dataset: {
    source: T("Généré par data/generate_data.py (5 000 clients, graine 42), créé automatiquement au premier lancement. Aucun client réel.",
              "Generated by data/generate_data.py (5,000 customers, seed 42), created automatically on first launch. No real customers."),
    volume: T("5 000 clients × 15 variables, rescorés en temps réel à chaque mouvement de curseur.",
              "5,000 customers × 15 variables, rescored in real time on every slider move."),
    fields: ["customer_id", "age", "annual_income", "tenure_months", "checking_balance",
             "savings_balance", "credit_outstanding", "num_products", "engagement_score",
             "contacts_last_90d", "historical_response_rate", "preferred_channel",
             "savings_propensity", "credit_card_propensity", "loan_propensity"],
    note: T("Les propensions ne sont pas tirées au hasard : elles dérivent du profil par des scores logistiques, ce qui rend chaque recommandation explicable. Trois corrélations reproduisent des dynamiques réelles — le biais de sur-sollicitation (les contacts croissent avec le revenu et l'engagement), l'érosion de la réponse (−1,35 point par contact récent) et l'opt-out implicite des clients très peu engagés.",
              "Propensities are not random: they derive from the profile through logistic scores, which makes every recommendation explainable. Three correlations reproduce real dynamics — the over-contacting bias (contacts rise with income and engagement), response erosion (−1.35 points per recent contact) and the implicit opt-out of very disengaged customers.")
  },

  links: { repo: "", demo: "" },

  context: {
    secteur: T("Banque de détail — trois produits : épargne, carte de crédit, prêt",
               "Retail banking — three products: savings, credit card, loan"),
    modele: T("B2C bancaire, 5 000 clients, arbitrage d'un contact unique par client",
              "B2C banking, 5,000 customers, arbitrating a single contact per customer"),
    role: T("Analyste au sein de la direction marketing, chargé d'arbitrer entre trois campagnes produit concurrentes et d'instrumenter le coût invisible de la sur-sollicitation",
            "Analyst within marketing leadership, tasked with arbitrating between three competing product campaigns and instrumenting the invisible cost of over-contacting"),
    perimetre: T("5 000 clients × 15 variables, rescorés en temps réel à chaque mouvement de curseur",
                 "5,000 customers × 15 variables, rescored in real time on every slider move"),
    calcul: T("Scoring mémoïsé par jeu de seuils (lru_cache) : les callbacks ne transportent que quelques flottants",
              "Scoring memoised per threshold set (lru_cache): callbacks carry only a handful of floats"),
    stack: "Python 3.10+ · Dash · Plotly · pandas · NumPy · dash-bootstrap-components · Sphinx"
  },

  kpis: [
    { value: 5000, label: T("Clients arbitrés", "Customers arbitrated"),
      note: T("une décision unique et exclusive par client", "one exclusive decision per customer"), suffix: "" },
    { value: 47, label: T("Portefeuille adressable", "Addressable book"),
      note: T("2 366 clients recevront une offre", "2,366 customers will receive an offer"), suffix: " %" },
    { value: 29, label: T("Clients protégés", "Customers protected"),
      note: T("1 430 en suppression pour fatigue", "1,430 suppressed for fatigue"), suffix: " %" },
    { value: 4, label: T("Seuils pilotables", "Tunable thresholds"),
      note: T("aucun paramètre écrit en dur dans la logique", "no parameter hard-coded in the logic"), suffix: "" }
  ],

  questions: [
    T("Compte tenu de son appétence et de la pression déjà subie, quelle est la meilleure utilisation de l'unique contact dont je dispose pour ce client ?",
      "Given their propensity and the pressure already applied, what is the best use of the single contact I have for this customer?"),
    T("Quand faut-il ne rien envoyer — et surtout, pour laquelle des trois raisons possibles, qui n'appellent pas les mêmes actions correctives ?",
      "When should we send nothing — and above all, for which of the three possible reasons, which call for different corrective actions?"),
    T("Où placer le seuil de fatigue ? Que gagne-t-on en volume, que perd-on en réponses attendues, en le déplaçant ?",
      "Where should the fatigue threshold sit? What do we gain in volume, and lose in expected responses, by moving it?")
  ],

  framework: {
    intro: T(
      "Le projet inverse l'unité d'analyse : on ne demande plus « qui cibler pour la campagne épargne ? » mais « que faire de ce client ? ». Ce changement de maille transforme un problème d'optimisation insoluble en règle de décision simple.",
      "The project inverts the unit of analysis: the question is no longer “who do we target for the savings campaign?” but “what do we do with this customer?”. That change of grain turns an intractable optimisation problem into a simple decision rule."),
    metrics: [
      { name: T("Score de fatigue de contact", "Contact-fatigue score"),
        why: T("saturation exponentielle amplifiée par le désengagement et la non-réponse",
               "exponential saturation amplified by disengagement and non-response") },
      { name: T("Appétence maximale (top propensity)", "Top propensity"),
        why: T("la meilleure des trois propensions produit", "the best of the three product propensities") },
      { name: T("Marge de décision (gap)", "Decision margin (gap)"),
        why: T("écart entre la 1ʳᵉ et la 2ᵉ propension : un écart faible = le modèle ne tranche pas",
               "gap between 1st and 2nd propensity: a small gap means the model isn't actually deciding") }
    ],
    dimensions: [
      { name: T("Recommandation (6 modalités)", "Recommendation (6 values)"),
        why: T("3 produits + 3 motifs d'abstention distincts", "3 products + 3 distinct reasons to abstain") },
      { name: T("Canal préféré", "Preferred channel"),
        why: T("« aucun » est un opt-out de fait, plancher-né à 0,85 de fatigue",
               "“none” is a de facto opt-out, floored at 0.85 fatigue") },
      { name: T("Valeur client (revenu, équipement, engagement)", "Customer value (income, products held, engagement)"),
        why: T("révèle le paradoxe du bon client : les meilleurs saturent en premier",
               "reveals the good-customer paradox: the best ones saturate first") }
    ]
  },

  method: [
    T("Score de fatigue", "Fatigue score"),
    T("Classement des 3 propensions", "Rank the 3 propensities"),
    T("Règle métier ordonnée", "Ordered business rule"),
    T("Explication en langage naturel", "Natural-language explanation"),
    T("Simulation de seuils", "Threshold simulation")
  ],

  figures: [
    {
      img: "assets/img/shots/contact-fatigue/01-vue-d-ensemble.webp",
      thumb: "assets/img/shots/contact-fatigue/thumbs/01-vue-d-ensemble.webp",
      title: T("Le nuage appétence × fatigue expose la zone qui devrait faire réagir un directeur marketing : en haut à droite, les opportunités perdues par saturation",
               "The propensity × fatigue scatter exposes the zone a marketing director should react to: top right, opportunities lost to saturation"),
      read: T("L'histogramme de fatigue est scindé par le seuil courant, matérialisé par une ligne verticale. Le pic à 85 % n'est pas un artefact : c'est la population en opt-out déclaré, plancher-née à cette valeur.",
              "The fatigue histogram is split by the current threshold, drawn as a vertical line. The spike at 85% is not an artefact: it is the declared opt-out population, floored at that value.")
    },
    {
      img: "assets/img/shots/contact-fatigue/02-explorateur-client.webp",
      thumb: "assets/img/shots/contact-fatigue/thumbs/02-explorateur-client.webp",
      title: T("Chaque décision est auditable client par client : radar des trois propensions, jauge de fatigue et la phrase qui restitue la règle exacte qui a tranché",
               "Every decision is auditable customer by customer: a radar of the three propensities, a fatigue gauge and the sentence stating the exact rule that decided"),
      read: T("« 8 sollicitations sur 90 jours portent le score de fatigue à 71 %, au-dessus du seuil de 55 %. » Un chargé de campagne peut contester la décision sur des bases explicites plutôt que subir une boîte noire.",
              "“8 contacts over 90 days push the fatigue score to 71%, above the 55% threshold.” A campaign manager can challenge the decision on explicit grounds rather than endure a black box.")
    },
    {
      img: "assets/img/shots/contact-fatigue/03-simulation-d-impact.webp",
      thumb: "assets/img/shots/contact-fatigue/thumbs/03-simulation-d-impact.webp",
      title: T("La démonstration de la thèse : le volume contacté croît régulièrement avec la permissivité, les réponses attendues plafonnent",
               "The thesis demonstrated: contacted volume rises steadily with permissiveness while expected responses plateau"),
      read: T("Au-delà du point d'inflexion, on sur-sollicite sans rien gagner. Le balayage rescore les 5 000 clients à chaque pas de 5 % — c'est l'écran qui rend l'arbitrage visible au lieu de le laisser se trancher à l'autorité.",
              "Past the inflection point you over-contact and gain nothing. The sweep rescores all 5,000 customers at every 5% step — this is the screen that makes the trade-off visible instead of leaving it to be settled by authority.")
    }
  ],

  insights: [
    {
      title: T("Les meilleurs clients saturent en premier — le paradoxe est dans les données avant tout calcul",
               "The best customers saturate first — the paradox is in the data before any computation"),
      data: T("Le nombre de contacts sur 90 jours croît avec le revenu, le nombre de produits détenus et l'engagement. En parallèle, le taux de réponse historique baisse d'environ 1,35 point par contact récent supplémentaire.",
              "Contacts over 90 days rise with income, number of products held and engagement. In parallel, the historical response rate falls by about 1.35 points per additional recent contact."),
      soWhat: T("Les équipes sur-sollicitent exactement les profils qu'il faudrait protéger. Le capital relationnel le plus précieux est celui qui se consomme le plus vite, et aucun bilan de campagne ne le montre.",
                "Teams over-contact exactly the profiles they should be protecting. The most valuable relationship capital is the one burned fastest, and no campaign report shows it."),
      driver: T("La règle de fatigue est donc évaluée en priorité absolue, avant toute considération commerciale : même une propension de 0,95 ne justifie pas de solliciter un client saturé.",
                "The fatigue rule is therefore evaluated first, before any commercial consideration: even a 0.95 propensity does not justify contacting a saturated customer."),
      team: T("Direction marketing · CRM", "Marketing leadership · CRM")
    },
    {
      title: T("« Non ciblé » recouvre trois populations qui appellent trois plans différents",
               "“Not targeted” covers three populations calling for three different plans"),
      data: T("Sur les 53 % non adressables : 29 % en suppression pour fatigue (1 430 clients), 20 % en préférence ambiguë (1 006) et 4 % sans offre correspondante (198).",
              "Of the 53% not addressable: 29% suppressed for fatigue (1,430 customers), 20% with ambiguous preference (1,006) and 4% with no matching offer (198)."),
      soWhat: T("Fondues dans un « non ciblé » unique, ces populations sont invisibles et personne ne travaille dessus. Séparées, elles deviennent trois chantiers suivables : protection du client, enrichissement du modèle, extension du catalogue.",
                "Merged into a single “not targeted” bucket these populations are invisible and nobody works on them. Split apart they become three trackable workstreams: customer protection, model enrichment, catalogue extension."),
      driver: T("Le motif « préférence ambiguë » est un problème de modèle, pas de client : la marge entre la 1ʳᵉ et la 2ᵉ propension est inférieure à 0,08, donc le signal produit ne tranche pas même à propension élevée.",
                "The “ambiguous preference” reason is a model problem, not a customer problem: the margin between the 1st and 2nd propensity is below 0.08, so the product signal does not decide even at high propensity."),
      team: T("Data Science · Marketing produit", "Data Science · Product marketing")
    },
    {
      title: T("Le seuil « raisonnable » cesse d'être une opinion",
               "The “reasonable” threshold stops being an opinion"),
      data: T("Le balayage de 5 % à 95 % rescore le portefeuille à chaque pas et trace deux courbes : volume contacté et réponses attendues (propension × (1 − fatigue)). La seconde plafonne bien avant la première.",
              "The 5% to 95% sweep rescores the book at every step and plots two curves: contacted volume and expected responses (propensity × (1 − fatigue)). The second plateaus well before the first."),
      soWhat: T("Le débat volume contre qualité se tranche habituellement à l'autorité, faute d'outil. Ici, le point d'inflexion est lisible à l'écran : au-delà, chaque contact supplémentaire ne rapporte rien et consomme du capital.",
                "The volume-versus-quality debate is usually settled by authority, for want of a tool. Here the inflection point is legible on screen: beyond it, every extra contact returns nothing and burns capital."),
      driver: T("L'apport n'est pas le chiffre — il dépend des seuils, et les seuils sont un choix d'entreprise. L'apport est d'avoir rendu ce choix explicite, quantifié et réversible.",
                "The contribution is not the number — it depends on the thresholds, and thresholds are a company choice. The contribution is making that choice explicit, quantified and reversible."),
      team: T("Direction marketing", "Marketing leadership")
    }
  ],

  matrix: [
    { action: T("Substituer la décision par client au ciblage campagne par campagne sur le prochain cycle",
                "Replace campaign-by-campaign targeting with per-customer decisions on the next cycle"),
      priority: "Haute",
      impact: T("Fin des triples sollicitations, 47 % du portefeuille adressé de façon exclusive",
                "End of triple contacting, 47% of the book addressed exclusively"),
      owner: T("CRM & Marketing produit", "CRM & Product marketing"),
      kpi: T("Contacts par client · taux de désabonnement", "Contacts per customer · unsubscribe rate") },
    { action: T("Mettre les 1 006 clients « préférence ambiguë » au programme d'enrichissement de données",
                "Put the 1,006 “ambiguous preference” customers into the data-enrichment programme"),
      priority: "Haute",
      impact: T("20 % du portefeuille rendu adressable si le signal produit se clarifie",
                "20% of the book becomes addressable if the product signal sharpens"),
      owner: "Data Science",
      kpi: T("Part de clients sous la marge de 0,08", "Share of customers below the 0.08 margin") },
    { action: T("Tester la règle en A/B contre le ciblage produit par produit et mesurer l'engagement à 6 mois",
                "A/B test the rule against product-by-product targeting and measure engagement at 6 months"),
      priority: "Haute",
      impact: T("Le seul chiffre qui tranche vraiment le débat volume / qualité",
                "The only number that really settles the volume-versus-quality debate"),
      owner: T("Marketing & Data", "Marketing & Data"),
      kpi: T("Écart d'engagement à 6 mois", "Engagement gap at 6 months") },
    { action: T("Calibrer le score de fatigue sur un historique réel de désabonnements",
                "Calibrate the fatigue score on a real unsubscribe history"),
      priority: "Moyenne",
      impact: T("Passe d'une heuristique défendable à un modèle estimé",
                "Moves from a defensible heuristic to an estimated model"),
      owner: "Data Science",
      kpi: T("AUC sur le désabonnement", "AUC on unsubscribes") },
    { action: T("Ajouter une contrainte de capacité par canal (budget d'appels, quota SMS) et résoudre l'affectation globale",
                "Add a per-channel capacity constraint (call budget, SMS quota) and solve the global allocation"),
      priority: "Basse",
      impact: T("Optimisation sous contrainte plutôt que décision client par client",
                "Constrained optimisation rather than a per-customer decision"),
      owner: "Marketing Ops",
      kpi: T("Taux d'utilisation des quotas", "Quota utilisation rate") }
  ],

  appendix: {
    code: [
      {
        label: T("Score de fatigue", "Fatigue score"),
        lang: "python",
        body: T(
`def compute_fatigue_score(contacts_last_90d, engagement_score,
                          historical_response_rate, preferred_channel=None,
                          tau: float = FATIGUE_TAU) -> np.ndarray:
    """Score de fatigue de contact, entre 0 (client frais) et 1 (saturé).

    * saturation exponentielle : le 1er contact coûte peu, le 8e coûte cher ;
    * amplification par le désengagement : un client qui ne se connecte
      jamais encaisse plus mal chaque sollicitation ;
    * amplification par la non-réponse : ne jamais répondre est le signal
      de saturation le plus fiable dont on dispose.
    """
    base_pressure = 1.0 - np.exp(-contacts / max(tau, 1e-6))     # TAU = 8
    amplifier     = 1.0 + 0.35 * desengagement + 0.25 * non_reponse
    fatigue       = np.clip(base_pressure * amplifier, 0.0, 1.0)

    # Canal préféré « aucun » = opt-out de fait -> plancher à 0,85
    fatigue = np.where(opt_out, np.maximum(fatigue, 0.85), fatigue)
    return fatigue`,
`def compute_fatigue_score(contacts_last_90d, engagement_score,
                          historical_response_rate, preferred_channel=None,
                          tau: float = FATIGUE_TAU) -> np.ndarray:
    """Contact-fatigue score, from 0 (fresh customer) to 1 (saturated).

    * exponential saturation: the 1st contact costs little, the 8th costs
      a lot;
    * amplification by disengagement: a customer who never logs in takes
      each solicitation worse;
    * amplification by non-response: never replying is the most reliable
      saturation signal available.
    """
    base_pressure = 1.0 - np.exp(-contacts / max(tau, 1e-6))     # TAU = 8
    amplifier     = 1.0 + 0.35 * disengagement + 0.25 * non_response
    fatigue       = np.clip(base_pressure * amplifier, 0.0, 1.0)

    # Preferred channel "none" = de facto opt-out -> floor at 0.85
    fatigue = np.where(opt_out, np.maximum(fatigue, 0.85), fatigue)
    return fatigue`)
      },
      {
        label: T("Règle de décision", "Decision rule"),
        lang: "python",
        body: T(
`# models/decision_engine.py — les règles s'appliquent DANS CET ORDRE.
# La fatigue prime sur tout : c'est le coeur de la thèse de l'outil.

if fatigue > params.fatigue_threshold:          # 0,55 par défaut
    return "Suppress - contact fatigue"         # problème CLIENT

if top_propensity < params.no_offer_floor:      # 0,30
    return "No strong offer"                    # problème d'OFFRE

if (top_propensity < params.confidence_threshold      # 0,50
        or propensity_gap < params.ambiguity_margin): # 0,08
    return "Ambiguous preference"               # problème de MODÈLE

return best_product                             # Savings / Credit Card / Loan

# Séparer ces trois abstentions est le principal apport métier :
# fondues dans un « non ciblé » unique, elles sont invisibles.`,
`# models/decision_engine.py — the rules apply IN THIS ORDER.
# Fatigue overrides everything: that is the core of the tool's thesis.

if fatigue > params.fatigue_threshold:          # 0.55 by default
    return "Suppress - contact fatigue"         # a CUSTOMER problem

if top_propensity < params.no_offer_floor:      # 0.30
    return "No strong offer"                    # an OFFER problem

if (top_propensity < params.confidence_threshold      # 0.50
        or propensity_gap < params.ambiguity_margin): # 0.08
    return "Ambiguous preference"               # a MODEL problem

return best_product                             # Savings / Credit Card / Loan

# Separating those three abstentions is the main business contribution:
# merged into a single "not targeted" bucket, they are invisible.`)
      },
      {
        label: T("Explication individuelle", "Per-customer explanation"),
        lang: "python",
        body: T(
`# explain_recommendation() traduit la règle qui a tranché, dans la langue
# de l'interface. Exemples réels produits par le moteur :

"""
Recommander épargne : propension de 0,83 (écart de 0,73 avec le 2e produit)
et score de fatigue de seulement 14 %, sous le seuil de 55 %. Le client est
disponible et le signal produit est net — c'est le meilleur usage du contact
disponible.
"""

"""
Ne pas contacter : 8 sollicitations sur les 90 derniers jours portent le
score de fatigue à 71 %, au-dessus du seuil de 55 %. Une communication de
plus dégraderait l'engagement (score actuel : 34/100) pour un gain marginal.
Laisser le client se reposer.
"""

# C'est ce qui distingue l'outil d'une boîte noire : un chargé de campagne
# peut contester une décision sur des bases explicites.`,
`# explain_recommendation() renders the rule that decided, in the interface
# language. Real examples produced by the engine:

"""
Recommend savings: propensity of 0.83 (a 0.73 gap to the 2nd product) and
a fatigue score of only 14%, below the 55% threshold. The customer is
available and the product signal is clear — this is the best use of the
available contact.
"""

"""
Do not contact: 8 solicitations over the last 90 days push the fatigue
score to 71%, above the 55% threshold. One more message would degrade
engagement (current score: 34/100) for a marginal gain. Let the customer
rest.
"""

# This is what separates the tool from a black box: a campaign manager can
# challenge a decision on explicit grounds.`)
      },
      {
        label: T("Flux de données", "Data flow"),
        lang: "text",
        body: T(
`customers.csv
     │
     ▼
data/loader.get_customers()          chargé une fois, gardé en mémoire
     │
     ▼
models.decision_engine.score_customers(df, params)
     │                               mis en cache par jeu de seuils (lru_cache)
     ▼
data/loader.apply_filters(...)       filtres démographiques
     │
     ├──► layout/figures.*            figures Plotly
     ├──► KPI, narration              textes traduits FR / EN
     └──► DataTable                   lignes envoyées au navigateur

Performance : le CSV est chargé UNE SEULE FOIS et les callbacks ne
transportent que quelques flottants — c'est ce qui permet de bouger un
slider sans latence perceptible sur 5 000 lignes.

Une seule palette, deux consommateurs : config/theme.py alimente les figures
Plotly (Python) ET les variables CSS --mcfo-* injectées dans le <head>.
assets/custom.css ne contient aucun code couleur en dur.`,
`customers.csv
     │
     ▼
data/loader.get_customers()          loaded once, kept in memory
     │
     ▼
models.decision_engine.score_customers(df, params)
     │                               cached per threshold set (lru_cache)
     ▼
data/loader.apply_filters(...)       demographic filters
     │
     ├──► layout/figures.*            Plotly figures
     ├──► KPIs, narration             FR / EN translated copy
     └──► DataTable                   rows sent to the browser

Performance: the CSV is loaded ONCE and callbacks carry only a handful of
floats — that is what lets a slider move without perceptible latency over
5,000 rows.

One palette, two consumers: config/theme.py feeds the Plotly figures
(Python) AND the --mcfo-* CSS variables injected into the <head>.
assets/custom.css contains no hard-coded colour value.`)
      }
    ],
    difficulties: [
      { p: T("Une fonction linéaire de la pression traitait le passage de 0 à 1 contact comme celui de 7 à 8.",
             "A linear pressure function treated going from 0 to 1 contact the same as going from 7 to 8."),
        s: T("Saturation exponentielle 1 − exp(−n/τ) avec τ = 8 : le premier contact coûte peu, le huitième coûte cher.",
             "Exponential saturation 1 − exp(−n/τ) with τ = 8: the first contact costs little, the eighth costs a lot.") },
      { p: T("Une propension élevée suffisait à déclencher une offre, même sur un signal produit indécis.",
             "A high propensity was enough to trigger an offer, even on an undecided product signal."),
        s: T("Introduction de la marge de décision : l'écart entre la 1ʳᵉ et la 2ᵉ propension. Un écart < 0,08 bascule en « préférence ambiguë » quel que soit le niveau.",
             "Introduced the decision margin: the gap between 1st and 2nd propensity. A gap < 0.08 flips to “ambiguous preference” whatever the level.") },
      { p: T("Changer de langue remettait à zéro les seuils, les filtres et l'onglet actif.",
             "Changing language reset the thresholds, the filters and the active tab."),
        s: T("La langue vit dans un dcc.Store persisté ; les valeurs courantes sont relues puis réinjectées dans l'interface reconstruite.",
             "Language lives in a persisted dcc.Store; current values are read back and re-injected into the rebuilt interface.") },
      { p: T("Bouger un slider recalculait tout le portefeuille et rendait l'interface poussive.",
             "Moving a slider recomputed the whole book and made the interface sluggish."),
        s: T("Scoring mémoïsé par jeu de seuils via functools.lru_cache, et onglets toujours montés (masqués en CSS) pour éviter de reconstruire le tableau de 5 000 lignes.",
             "Scoring memoised per threshold set via functools.lru_cache, and tabs always mounted (hidden in CSS) to avoid rebuilding the 5,000-row table.") },
      { p: T("Le balayage de seuils de l'onglet 3 est coûteux et ralentissait toute l'application.",
             "The threshold sweep on tab 3 is expensive and slowed the whole application."),
        s: T("Il n'est calculé que si cet onglet est effectivement affiché.",
             "It is computed only when that tab is actually displayed.") },
      { p: T("Traduire les noms de recommandation créait une ambiguïté à l'export vers l'outil de campagne.",
             "Translating the recommendation names created ambiguity on export to the campaign tool."),
        s: T("Les identifiants d'action (Savings, Suppress - contact fatigue…) restent identiques dans les deux langues : ce sont les clés canoniques.",
             "Action identifiers (Savings, Suppress - contact fatigue…) stay identical in both languages: they are the canonical keys.") }
    ],
    limits: [
      T("Les propensions sont simulées, pas apprises : en production elles viendraient de trois modèles entraînés sur des historiques de campagne.",
        "The propensities are simulated, not learned: in production they would come from three models trained on campaign history."),
      T("Le score de fatigue est une heuristique calibrée, pas un modèle de désabonnement estimé. Sa forme est défendable, ses coefficients demanderaient un calage réel.",
        "The fatigue score is a calibrated heuristic, not an estimated unsubscribe model. Its shape is defensible; its coefficients would need real fitting."),
      T("Les « réponses attendues » (propension × (1 − fatigue)) servent à comparer deux scénarios, pas à prévoir un chiffre d'affaires.",
        "“Expected responses” (propensity × (1 − fatigue)) serve to compare two scenarios, not to forecast revenue."),
      T("Pas de contrainte de capacité par canal : la décision est prise client par client, sans budget global.",
        "No per-channel capacity constraint: the decision is made customer by customer, without a global budget."),
      T("Seuil de repos unique pour tout le portefeuille, là où un délai variable par segment serait plus juste.",
        "A single rest threshold for the whole book, where a per-segment delay would be fairer.")
    ]
  },

  run: "python app.py   →   http://127.0.0.1:8050"
},

/* ═════════════════════════════════════════════════════════════════════════
   05 — CUSTOMER SUPPORT ESCALATION PREDICTOR
   ═════════════════════════════════════════════════════════════════════════ */
{
  slug: "support-escalation",
  num: "05",
  title: "Support Escalation Predictor",
  family: T("Machine Learning", "Machine Learning"),
  familyKey: "ml",
  accent: "#146E68",
  accentDark: "#5FC6BC",
  tags: ["Python", "scikit-learn", "Random Forest", "Dash 4", "joblib", "Plotly"],
  cover: "assets/img/shots/support-escalation/thumbs/01-vue-d-ensemble.webp",

  headline: T(
    "Les deux premiers facteurs de risque d'escalade pèsent 42 % du modèle — et ce sont les deux seuls que l'équipe contrôle directement.",
    "The top two escalation-risk factors carry 42% of the model — and they are the only two the team directly controls."),

  pitch: T(
    "Un superviseur ouvre 220 tickets à 8 h 30 et n'a aucun signal lui disant lesquels vont dégénérer. Le modèle les ordonne, explique chaque score ticket par ticket, et affiche sa propre fiabilité au lieu de la cacher.",
    "A supervisor opens 220 tickets at 8:30 am with no signal telling them which ones will blow up. The model ranks them, explains each score ticket by ticket, and displays its own reliability instead of hiding it."),

  problem: T(
    "Un ticket qui a l'air banal peut dégénérer, et la facture est triple : une escalade mobilise un senior 45 min à 2 h contre 8 à 12 min pour un ticket standard, elle s'accompagne souvent d'un geste commercial, et un client qui a dû escalader pour être entendu part deux à trois fois plus souvent dans l'année. Le vrai problème n'est pas de compter les escalades du mois dernier — c'est que l'agent de première ligne n'a aucun signal, au moment où il traite le ticket, lui disant que celui-là va mal tourner.",
    "A ticket that looks routine can blow up, and the bill is threefold: an escalation ties up a senior agent for 45 minutes to 2 hours against 8 to 12 minutes for a standard ticket, it usually comes with a commercial gesture, and a customer who had to escalate to be heard leaves two to three times more often within the year. The real problem is not counting last month's escalations — it is that the front-line agent has no signal, at the moment they handle the ticket, telling them this one will go wrong."),

  dataset: {
    source: T("Généré par data/generate_data.py dans data/tickets.csv. Données synthétiques : aucun client réel n'est représenté.",
              "Generated by data/generate_data.py into data/tickets.csv. Synthetic data: no real customer is represented."),
    volume: T("3 000 tickets historiques résolus (issue connue) et 220 tickets actuellement ouverts (issue à prédire), issus du même processus générateur.",
              "3,000 resolved historical tickets (known outcome) and 220 currently open tickets (outcome to predict), from the same generating process."),
    fields: ["ticket_id", "status", "created_at", "issue_type", "channel",
             "customer_tenure_months", "customer_ltv", "previous_tickets_count",
             "previous_escalations_count", "first_response_time_hours",
             "current_open_duration_hours", "sentiment_score", "agent_id",
             "agent_seniority_months", "has_escalated", "message_excerpt"],
    note: T("Le générateur n'est pas du bruit : il encode des dynamiques que le modèle doit retrouver — sentiment négatif (poids 2,35), Refund (+1,05), chaque escalade passée (+0,80), le silence de l'équipe (+0,045 par heure), l'ancienneté de l'agent (−0,009 par mois), plus trois interactions. L'ordonnée à l'origine est calibrée par dichotomie pour atteindre un taux d'escalade de référence de 19 %, cohérent avec une file B2C réelle.",
              "The generator is not noise: it encodes dynamics the model has to recover — negative sentiment (weight 2.35), Refund (+1.05), each past escalation (+0.80), team silence (+0.045 per hour), agent seniority (−0.009 per month), plus three interactions. The intercept is calibrated by bisection to reach a baseline escalation rate of 19%, consistent with a real B2C queue.")
  },

  links: { repo: "", demo: "" },

  context: {
    secteur: T("Support client B2C — file de tickets multi-canal",
               "B2C customer support — multi-channel ticket queue"),
    modele: T("3 000 tickets résolus (issue connue) + 220 tickets ouverts à scorer",
              "3,000 resolved tickets (known outcome) + 220 open tickets to score"),
    role: T("Data analyst en appui du responsable support, chargé de transformer un reporting d'escalades constatées en outil de priorisation quotidienne",
            "Data analyst supporting the head of support, tasked with turning after-the-fact escalation reporting into a daily prioritisation tool"),
    perimetre: T("Split train / test 75-25 stratifié (2 250 / 750), graine fixée à 42",
                 "Stratified 75-25 train / test split (2,250 / 750), seed fixed at 42"),
    calcul: T("Bundle joblib chargé au démarrage, jamais ré-entraîné en ligne ; explication locale en quelques millisecondes",
              "joblib bundle loaded at startup, never retrained online; local explanation in a few milliseconds"),
    stack: "Python 3.10+ · scikit-learn · Dash 4 · Plotly · pandas · joblib"
  },

  kpis: [
    { value: 0.817, label: T("AUC-ROC du modèle", "Model AUC-ROC"),
      note: T("Random Forest retenu · Gradient Boosting à 0,815", "Random Forest selected · Gradient Boosting at 0.815"),
      suffix: "", decimals: 3 },
    { value: 220, label: T("Tickets ouverts scorés", "Open tickets scored"),
      note: T("rescorés à chaque mouvement du seuil", "rescored on every threshold move"), suffix: "" },
    { value: 19, label: T("Taux d'escalade de référence", "Baseline escalation rate"),
      note: T("cohérent avec une file B2C réelle", "consistent with a real B2C queue"), suffix: " %" },
    { value: 29.7, label: T("Poids du sentiment", "Weight of sentiment"),
      note: T("premier facteur, devant le délai de réponse (12,7 %)", "top factor, ahead of response time (12.7%)"),
      suffix: " %", decimals: 1 }
  ],

  questions: [
    T("Parmi les 220 tickets ouverts ce matin, lesquels dois-je regarder en premier ?",
      "Of the 220 tickets open this morning, which should I look at first?"),
    T("Pourquoi CE ticket-là est-il noté à 86 % — et que faire concrètement pour désamorcer ?",
      "Why is THIS ticket scored at 86% — and what concretely can be done to defuse it?"),
    T("Peut-on faire confiance à ce score ? À quelle fréquence se trompe-t-il, et dans quel sens ?",
      "Can this score be trusted? How often is it wrong, and in which direction?")
  ],

  framework: {
    intro: T(
      "Le vrai problème n'est pas de compter les escalades du mois dernier — tous les outils de ticketing le font. C'est que l'agent de première ligne découvre l'escalade quand elle arrive. Le cadrage a porté sur les signaux disponibles dès les premières heures.",
      "The real problem is not counting last month's escalations — every ticketing tool does that. It is that the front-line agent finds out about an escalation when it happens. The framing focused on the signals available within the first few hours."),
    metrics: [
      { name: T("Probabilité d'escalade", "Escalation probability"),
        why: T("sortie calibrée du modèle, affichée en pourcentage à l'agent",
               "the model's calibrated output, shown to the agent as a percentage") },
      { name: T("AUC-ROC / AUC PR", "AUC-ROC / PR-AUC"),
        why: T("la fiabilité est un KPI de tête, pas une note de bas de page",
               "reliability is a headline KPI, not a footnote") },
      { name: T("Précision / rappel au seuil", "Precision / recall at threshold"),
        why: T("matérialise l'arbitrage entre temps agent perdu et escalades manquées",
               "makes the trade-off explicit between wasted agent time and missed escalations") }
    ],
    dimensions: [
      { name: T("Type de problème", "Issue type"),
        why: T("Refund escalade à 39,8 %, Technical à 10,6 % — l'argent est un terrain inflammable",
               "Refund escalates at 39.8%, Technical at 10.6% — money is flammable ground") },
      { name: T("Historique du client", "Customer history"),
        why: T("chaque escalade passée ajoute +0,80 au log-odds : la récidive est le meilleur prédicteur individuel",
               "every past escalation adds +0.80 to the log-odds: recurrence is the best single predictor") },
      { name: T("Profil de l'agent", "Agent profile"),
        why: T("un agent expérimenté désamorce (−0,009 par mois d'ancienneté)",
               "an experienced agent defuses (−0.009 per month of seniority)") }
    ]
  },

  method: [
    T("Génération à règles métier", "Rule-based generation"),
    T("Split stratifié 75/25", "Stratified 75/25 split"),
    T("2 algorithmes comparés", "2 algorithms compared"),
    T("Sélection sur l'AUC test", "Selection on test AUC"),
    T("Explication par occlusion", "Occlusion-based explanation")
  ],

  figures: [
    {
      img: "assets/img/shots/support-escalation/01-vue-d-ensemble.webp",
      thumb: "assets/img/shots/support-escalation/thumbs/01-vue-d-ensemble.webp",
      title: T("Le curseur de seuil est dans l'en-tête, pas dans un menu : il matérialise un arbitrage métier, pas un réglage technique",
               "The threshold slider sits in the header, not in a menu: it embodies a business trade-off, not a technical setting"),
      read: T("Les quatre KPI de tête incluent l'AUC-ROC du modèle. Afficher sa propre fiabilité au même niveau que les chiffres métier est un choix : un superviseur doit savoir à quel point il peut s'appuyer sur le classement.",
              "The four headline KPIs include the model's AUC-ROC. Showing its own reliability alongside the business numbers is a deliberate choice: a supervisor needs to know how far the ranking can be leaned on.")
    },
    {
      img: "assets/img/shots/support-escalation/02-explorateur-de-ticket.webp",
      thumb: "assets/img/shots/support-escalation/thumbs/02-explorateur-de-ticket.webp",
      title: T("« Ce ticket présente un risque critique (86 %), tiré vers le haut par le sentiment du message, le type Remboursement et 2 escalades passées »",
               "“This ticket shows critical risk (86%), pushed up by message sentiment, the Refund type and 2 past escalations”"),
      read: T("Décomposition par occlusion, dans l'esprit de SHAP mais sans dépendance : on remplace une variable à la fois par la valeur de référence du parc et on mesure l'écart de probabilité. Déterministe, instantané, explicable à un agent.",
              "Occlusion-based decomposition, in the spirit of SHAP but with no extra dependency: one variable at a time is replaced by the fleet's reference value and the probability shift is measured. Deterministic, instant, explainable to an agent.")
    },
    {
      img: "assets/img/shots/support-escalation/03-performance-du-modele.webp",
      thumb: "assets/img/shots/support-escalation/thumbs/03-performance-du-modele.webp",
      title: T("Un rappel de 32 % au seuil par défaut est affiché tel quel : l'outil ordonne la file, il ne prétend pas être un filet de sécurité",
               "A 32% recall at the default threshold is displayed as is: the tool orders the queue, it does not claim to be a safety net"),
      read: T("Courbes ROC et précision-rappel, matrice de confusion recalculée au seuil courant, importances agrégées par variable métier (les colonnes one-hot d'un même attribut sont sommées). Rien n'est masqué.",
              "ROC and precision-recall curves, a confusion matrix recomputed at the current threshold, importances aggregated per business variable (one-hot columns of a single attribute are summed). Nothing is hidden.")
    },
    {
      img: "assets/img/shots/support-escalation/04-file-de-priorisation.webp",
      thumb: "assets/img/shots/support-escalation/thumbs/04-file-de-priorisation.webp",
      title: T("La liste de travail du matin : triée, filtrable, exportable en CSV — le livrable réel de l'outil",
               "The morning work list: sorted, filterable, exportable to CSV — the tool's actual deliverable"),
      read: T("Le seuil pilote tout : nombre de tickets signalés, contenu de la file et matrice de confusion. Changer de seuil ne change pas le modèle, il change la politique de traitement — et cela se voit immédiatement.",
              "The threshold drives everything: number of flagged tickets, queue contents and confusion matrix. Changing it does not change the model, it changes the handling policy — and that is immediately visible.")
    }
  ],

  insights: [
    {
      title: T("Les deux premiers leviers sont les seuls que l'équipe contrôle",
               "The top two levers are the only ones the team controls"),
      data: T("Importances agrégées : sentiment du message 29,7 %, délai de première réponse 12,7 %, durée d'ouverture 10,7 %, type de problème 10,0 %, escalades passées 8,6 %.",
              "Aggregated importances: message sentiment 29.7%, first-response time 12.7%, time open 10.7%, issue type 10.0%, past escalations 8.6%."),
      soWhat: T("L'ancienneté et la valeur du client ne se pilotent pas. Le ton de la réponse et le délai de première prise en charge, si. 42 % du risque est donc directement actionnable par le processus support lui-même.",
                "Customer tenure and value cannot be steered. The tone of the reply and the time to first pick-up can. So 42% of the risk is directly actionable by the support process itself."),
      driver: T("Le silence de l'équipe alimente le conflit : +0,045 de log-odds par heure de délai de première réponse, plafonné à 48 h. C'est l'effet le plus mécanique du modèle.",
                "Team silence feeds the conflict: +0.045 log-odds per hour of first-response delay, capped at 48 h. It is the model's most mechanical effect."),
      team: T("Responsable support · Formation", "Head of support · Training")
    },
    {
      title: T("L'argent est un terrain inflammable — et un cocktail précis fait exploser le risque",
               "Money is flammable ground — and one precise cocktail blows the risk up"),
      data: T("Taux d'escalade par type : Refund 39,8 % (490 tickets), Billing 22,9 % (590), Account Access 17,7 %, Shipping 15,1 %, Technical 10,6 % (855), Other 9,1 %.",
              "Escalation rate by type: Refund 39.8% (490 tickets), Billing 22.9% (590), Account Access 17.7%, Shipping 15.1%, Technical 10.6% (855), Other 9.1%."),
      soWhat: T("Un ticket de remboursement escalade presque quatre fois plus qu'un ticket technique. Router ces tickets vers des agents seniors dès l'entrée coûte moins cher que de les récupérer après escalade.",
                "A refund ticket escalates almost four times more than a technical one. Routing those tickets to senior agents on arrival costs less than recovering them after escalation."),
      driver: T("Le modèle retrouve l'interaction injectée dans les données : remboursement + colère + récidive ajoute +1,45 au log-odds, tandis que technique + réponse < 2 h + agent senior retire −1,30.",
                "The model recovers the interaction injected in the data: refund + anger + recurrence adds +1.45 to the log-odds, while technical + reply < 2 h + senior agent removes −1.30."),
      team: T("Support Ops · Routage", "Support Ops · Routing")
    },
    {
      title: T("Le seuil n'est pas une constante technique, c'est un choix de coût",
               "The threshold is not a technical constant, it is a cost choice"),
      data: T("Sur 750 tickets de test (144 escalades réelles) : à 0,30 → 59 % de rappel, 85 escalades détectées, 66 fausses alertes. À 0,50 → 67 % de précision mais 32 % de rappel. À 0,60 → 71 % de précision, 113 escalades ratées.",
              "On 750 test tickets (144 real escalations): at 0.30 → 59% recall, 85 escalations caught, 66 false alarms. At 0.50 → 67% precision but 32% recall. At 0.60 → 71% precision, 113 escalations missed."),
      soWhat: T("À 0,30, on rattrape 6 escalades sur 10 au prix de 66 tickets inspectés pour rien. Le bon réglage dépend du coût relatif des deux erreurs dans l'organisation — d'où le curseur, et non une constante cachée dans le code.",
                "At 0.30 you catch 6 escalations in 10 at the price of 66 tickets inspected for nothing. The right setting depends on the relative cost of the two errors in your organisation — hence the slider, not a constant buried in the code."),
      driver: T("Le Random Forest est retenu sur l'AUC (0,817 contre 0,815) mais aussi sur le score de Brier (0,115 contre 0,121) : ses probabilités sont mieux calibrées, ce qui compte dès qu'on affiche un pourcentage à un agent.",
                "The Random Forest wins on AUC (0.817 vs 0.815) but also on the Brier score (0.115 vs 0.121): its probabilities are better calibrated, which matters as soon as you show a percentage to an agent."),
      team: T("Direction support · Finance", "Support leadership · Finance")
    }
  ],

  matrix: [
    { action: T("Router automatiquement les tickets Refund à sentiment négatif vers un agent senior dès l'entrée",
                "Automatically route negative-sentiment Refund tickets to a senior agent on arrival"),
      priority: "Haute",
      impact: T("Cible le segment à 39,8 % d'escalade et l'interaction la plus explosive du modèle",
                "Targets the 39.8% escalation segment and the model's most explosive interaction"),
      owner: "Support Ops",
      kpi: T("Taux d'escalade Refund", "Refund escalation rate") },
    { action: T("Poser un SLA de première réponse à 2 h sur les tickets scorés au-dessus du seuil",
                "Set a 2-hour first-response SLA on tickets scored above the threshold"),
      priority: "Haute",
      impact: T("Agit sur 12,7 % du risque, entièrement sous contrôle de l'équipe",
                "Acts on 12.7% of the risk, entirely within the team's control"),
      owner: T("Responsable support", "Head of support"),
      kpi: T("Délai de première réponse · taux d'escalade", "First-response time · escalation rate") },
    { action: T("Chiffrer le coût d'une fausse alerte et celui d'une escalade ratée, puis choisir le seuil qui minimise le coût total",
                "Cost a false alarm and a missed escalation, then pick the threshold that minimises total cost"),
      priority: "Haute",
      impact: T("Remplace un réglage à l'intuition par un optimum économique",
                "Replaces an intuitive setting with an economic optimum"),
      owner: T("Support & Finance", "Support & Finance"),
      kpi: T("Coût total attendu par ticket", "Expected total cost per ticket") },
    { action: T("Remplacer le score de sentiment numérique par du NLP réel sur le texte des messages",
                "Replace the numeric sentiment score with real NLP on the message text"),
      priority: "Moyenne",
      impact: T("Le premier facteur du modèle (29,7 %) repose aujourd'hui sur une variable agrégée",
                "The model's top factor (29.7%) currently rests on an aggregated variable"),
      owner: "Data Science",
      kpi: T("AUC après ré-entraînement", "AUC after retraining") },
    { action: T("Ré-entraîner mensuellement et suivre l'AUC sur les tickets récents",
                "Retrain monthly and track AUC on recent tickets"),
      priority: "Moyenne",
      impact: T("Contient la dérive comportementale (saisonnalité, tarifs, nouvelle offre)",
                "Contains behavioural drift (seasonality, pricing, new offers)"),
      owner: "Data Science",
      kpi: T("AUC glissante", "Rolling AUC") },
    { action: T("Enregistrer les actions prises sur les tickets alertés pour mesurer l'effet réel de l'outil",
                "Log the actions taken on flagged tickets to measure the tool's real effect"),
      priority: "Basse",
      impact: T("Les escalades évitées ne se voient pas dans les données — c'est le paradoxe de la prévention",
                "Prevented escalations do not show up in the data — the prevention paradox"),
      owner: T("Support & Data", "Support & Data"),
      kpi: T("Écart test / témoin", "Test vs control gap") }
  ],

  appendix: {
    code: [
      {
        label: T("Sélection du modèle", "Model selection"),
        lang: "python",
        body: T(
`# models/escalation_model.py
# Deux algorithmes entraînés sur EXACTEMENT la même séparation
# (75/25 stratifiée, random_state=42). Celui qui obtient la meilleure
# AUC-ROC sur le jeu de test est retenu.
#
#   Random Forest      AUC 0,817   PR 0,571   Brier 0,115   <- retenu
#   Gradient Boosting  AUC 0,815   PR 0,542   Brier 0,121
#
# Coude-à-coude sur l'AUC. Le Random Forest gagne aussi sur le score de
# Brier : ses probabilités sont mieux calibrées, ce qui compte quand on
# affiche un pourcentage à un agent.

X_tr, X_te, y_tr, y_te = train_test_split(
    X, y, test_size=0.25, stratify=y, random_state=42)

best = max(_candidate_models().items(),
           key=lambda kv: roc_auc_score(y_te, kv[1].fit(X_tr, y_tr)
                                              .predict_proba(X_te)[:, 1]))`,
`# models/escalation_model.py
# Two algorithms trained on EXACTLY the same split (stratified 75/25,
# random_state=42). Whichever reaches the best AUC-ROC on the test set
# is selected.
#
#   Random Forest      AUC 0.817   PR 0.571   Brier 0.115   <- selected
#   Gradient Boosting  AUC 0.815   PR 0.542   Brier 0.121
#
# Neck and neck on AUC. The Random Forest also wins on the Brier score:
# its probabilities are better calibrated, which matters when you display
# a percentage to an agent.

X_tr, X_te, y_tr, y_te = train_test_split(
    X, y, test_size=0.25, stratify=y, random_state=42)

best = max(_candidate_models().items(),
           key=lambda kv: roc_auc_score(y_te, kv[1].fit(X_tr, y_tr)
                                              .predict_proba(X_te)[:, 1]))`)
      },
      {
        label: T("Explication locale", "Local explanation"),
        lang: "python",
        body: T(
`def local_contributions(bundle: dict, ticket: pd.Series) -> pd.DataFrame:
    """Contribution de chaque variable au score d'UN ticket.

    Principe : on remplace, une variable a la fois, la valeur du ticket par
    la valeur de reference du parc (mediane pour les numeriques, mode pour
    les categorielles) et on mesure l'ecart de probabilite. Un ecart positif
    signifie que la valeur reelle du ticket pousse le risque vers le haut.
    C'est une approximation simple, deterministe et interpretable de
    l'esprit de SHAP, sans dependance supplementaire.
    """
    base_row    = ticket.to_frame().T
    full_proba  = float(predict_proba(bundle, base_row)[0])

    rows = []
    for feature in LOGICAL_FEATURES:
        counterfactual = base_row.copy()
        counterfactual[feature] = bundle["baseline"][feature]
        neutral = float(predict_proba(bundle, counterfactual)[0])
        rows.append({"feature": feature,
                     "contribution": full_proba - neutral})

    out = pd.DataFrame(rows)
    out["abs_contribution"] = out["contribution"].abs()
    return out.sort_values("abs_contribution", ascending=False)`,
`def local_contributions(bundle: dict, ticket: pd.Series) -> pd.DataFrame:
    """Each variable's contribution to ONE ticket's score.

    Principle: one variable at a time, the ticket's value is replaced by
    the fleet's reference value (median for numerics, mode for
    categoricals) and the probability shift is measured. A positive shift
    means the ticket's real value pushes risk upward. This is a simple,
    deterministic and interpretable approximation of the spirit of SHAP,
    with no extra dependency.
    """
    base_row    = ticket.to_frame().T
    full_proba  = float(predict_proba(bundle, base_row)[0])

    rows = []
    for feature in LOGICAL_FEATURES:
        counterfactual = base_row.copy()
        counterfactual[feature] = bundle["baseline"][feature]
        neutral = float(predict_proba(bundle, counterfactual)[0])
        rows.append({"feature": feature,
                     "contribution": full_proba - neutral})

    out = pd.DataFrame(rows)
    out["abs_contribution"] = out["contribution"].abs()
    return out.sort_values("abs_contribution", ascending=False)`)
      },
      {
        label: T("Règles métier injectées", "Injected business rules"),
        lang: "python",
        body: T(
`# data/generate_data.py — le générateur n'est PAS du bruit aléatoire :
# il encode des dynamiques réalistes que le modèle doit retrouver.
# C'est ce qui rend le contrôle qualité possible.

log_odds = (
      2.35 * (-sentiment)                    # facteur le plus lourd, asymétrique
    + 1.05 * (issue == "Refund")             # l'argent est inflammable
    + 0.55 * (issue == "Billing")
    + 0.05 * (issue == "Technical")
    + 0.80 * previous_escalations            # la récidive : meilleur prédicteur
    + 0.045 * np.minimum(first_response_h, 48)   # le silence alimente le conflit
    - 0.009 * agent_seniority_months         # un agent expérimenté désamorce
)

# Trois interactions
log_odds += 1.45 * (refund & colere & recidive)          # cocktail explosif
log_odds -= 1.30 * (technique & reponse_2h & senior)     # cas maîtrisé
log_odds += 0.75 * (gros_compte & attente_12h)

# L'ordonnée à l'origine est calibrée par dichotomie pour atteindre
# un taux d'escalade de référence de 19 %.`,
`# data/generate_data.py — the generator is NOT random noise: it encodes
# realistic dynamics the model has to recover. That is what makes quality
# control possible.

log_odds = (
      2.35 * (-sentiment)                    # heaviest factor, asymmetric
    + 1.05 * (issue == "Refund")             # money is flammable
    + 0.55 * (issue == "Billing")
    + 0.05 * (issue == "Technical")
    + 0.80 * previous_escalations            # recurrence: best predictor
    + 0.045 * np.minimum(first_response_h, 48)   # silence feeds conflict
    - 0.009 * agent_seniority_months         # an experienced agent defuses
)

# Three interactions
log_odds += 1.45 * (refund & anger & recurrence)         # explosive cocktail
log_odds -= 1.30 * (technical & reply_2h & senior)       # handled case
log_odds += 0.75 * (large_account & waiting_12h)

# The intercept is calibrated by bisection to reach a baseline escalation
# rate of 19%.`)
      },
      {
        label: T("Notes d'implémentation", "Implementation notes"),
        lang: "text",
        body: T(
`Le modèle n'est JAMAIS ré-entraîné au démarrage.
  data/data_service.py charge le bundle joblib, score les 220 tickets
  ouverts une fois, et sert ces objets à toute l'application.
  Premier lancement : ~10 s (génération + entraînement + sérialisation).
  Lancements suivants : immédiat.

Chaque dcc.Graph porte une hauteur en dur.
  Sans elle, les figures Plotly s'écrasent ou débordent lors des
  changements d'onglet dans une grille Bootstrap.

Les onglets sont rendus à la demande.
  Le DOM reste léger et aucune figure n'est calculée pour un onglet
  que personne ne regarde.

Le thème sombre repose sur data-bs-theme (Bootstrap 5.3) et sur une
redéfinition des jetons de design de Dash 4 (--Dash-*), ce qui fait
basculer d'un coup dropdowns, curseurs et tableaux.`,
`The model is NEVER retrained at startup.
  data/data_service.py loads the joblib bundle, scores the 220 open
  tickets once, and serves those objects to the whole application.
  First launch: ~10 s (generation + training + serialisation).
  Later launches: instant.

Every dcc.Graph carries a hard height.
  Without it, Plotly figures collapse or overflow when switching tabs
  inside a Bootstrap grid.

Tabs are rendered on demand.
  The DOM stays light and no figure is computed for a tab nobody is
  looking at.

Dark mode relies on data-bs-theme (Bootstrap 5.3) and on redefining
Dash 4's design tokens (--Dash-*), which flips dropdowns, sliders and
tables in one go.`)
      }
    ],
    difficulties: [
      { p: T("Un score global de 86 % ne change pas la façon de traiter un dossier : l'agent ne sait pas quoi en faire.",
             "A global 86% score does not change how a case is handled: the agent doesn't know what to do with it."),
        s: T("Décomposition locale par occlusion, traduite en langage naturel puis en actions suggérées par un moteur de règles (faire relire la réponse, appeler plutôt qu'écrire, réaffecter à un senior).",
             "Occlusion-based local decomposition, translated into natural language then into suggested actions by a rules engine (have the reply reviewed, call instead of writing, reassign to a senior).") },
      { p: T("Ajouter SHAP pour l'explication locale aurait introduit une dépendance lourde pour un gain marginal ici.",
             "Adding SHAP for local explanation would have introduced a heavy dependency for a marginal gain here."),
        s: T("Occlusion variable par variable : déterministe, quelques millisecondes, directement explicable à un agent. SHAP reste la piste d'évolution assumée.",
             "Variable-by-variable occlusion: deterministic, a few milliseconds, directly explainable to an agent. SHAP remains the acknowledged next step.") },
      { p: T("Le seuil de décision codé en dur cachait un arbitrage métier dans le code.",
             "A hard-coded decision threshold buried a business trade-off inside the code."),
        s: T("Curseur dans l'en-tête, qui pilote simultanément le nombre de tickets signalés, la file de priorisation et la matrice de confusion.",
             "A header slider that simultaneously drives the number of flagged tickets, the priority queue and the confusion matrix.") },
      { p: T("Les importances one-hot éparpillaient un même attribut sur plusieurs colonnes, rendant le classement illisible.",
             "One-hot importances scattered a single attribute across several columns, making the ranking unreadable."),
        s: T("Agrégation par variable métier : les colonnes d'un même attribut sont sommées avant affichage.",
             "Aggregation per business variable: the columns of a single attribute are summed before display.") },
      { p: T("Ré-entraîner au démarrage rendait chaque lancement lent et non reproductible.",
             "Retraining at startup made every launch slow and non-reproducible."),
        s: T("Bundle sérialisé en joblib, ré-entraînement explicite via train_model.py --force.",
             "A joblib-serialised bundle, with explicit retraining via train_model.py --force.") }
    ],
    limits: [
      T("3 000 tickets suffisent pour dégager des tendances robustes, pas pour capturer les cas rares (litiges juridiques, incidents massifs, vagues liées à une panne).",
        "3,000 tickets are enough for robust trends, not for rare cases (legal disputes, major incidents, outage-driven waves)."),
      T("Données synthétiques : les coefficients valident la chaîne de traitement, ils ne se transposent pas tels quels.",
        "Synthetic data: the coefficients validate the processing chain, they do not transfer as they are."),
      T("Importance ≠ causalité : réduire le délai de réponse aide, mais ne supprime pas mécaniquement le risque.",
        "Importance ≠ causality: cutting response time helps, but does not mechanically remove the risk."),
      T("Sentiment simulé comme variable numérique ; en production il faudrait le calculer sur le texte réel et surveiller les biais de langue et de canal.",
        "Sentiment is simulated as a numeric variable; in production it would be computed on the real text, with language and channel bias monitored."),
      T("Rappel de 32 % au seuil par défaut : l'outil ordonne la file, il ne garantit pas d'attraper toutes les escalades.",
        "32% recall at the default threshold: the tool orders the queue, it does not guarantee catching every escalation."),
      T("Split aléatoire plutôt que temporel : une validation « entraîner sur N-6..N-1, tester sur N » serait plus proche de l'usage réel.",
        "A random rather than temporal split: a “train on N-6..N-1, test on N” validation would be closer to real use.")
    ]
  },

  run: "python app.py   →   http://127.0.0.1:8054"
},

/* ═════════════════════════════════════════════════════════════════════════
   06 — RETAILPULSE ANALYTICS
   ═════════════════════════════════════════════════════════════════════════ */
{
  slug: "retailpulse",
  num: "06",
  title: "RetailPulse Analytics",
  family: T("Plateforme", "Platform"),
  familyKey: "platform",
  accent: "#14497A",
  accentDark: "#84B4E2",
  tags: ["DuckDB", "Streamlit", "scikit-learn", "SQL", "Plotly", "Sphinx"],
  cover: "assets/img/shots/retailpulse/thumbs/01-vue-ensemble.webp",

  headline: T(
    "Six questions de comité restées sans réponse chiffrée, six pages qui se terminent par une décision — du pipeline medallion jusqu'à l'ordre de réapprovisionnement.",
    "Six committee questions left without a quantified answer, six pages that end in a decision — from the medallion pipeline all the way to the replenishment order."),

  pitch: T(
    "Le problème n'était pas l'absence de données, c'était l'absence de chaîne reliant la donnée à la décision. Un entrepôt reconstruit à chaque exécution, 17 contrôles qualité rejoués, une quarantaine tracée — et six pages qui s'arrêtent à l'arbitrage, pas au graphique.",
    "The problem was never a lack of data, it was the lack of a chain linking data to decision. A warehouse rebuilt on every run, 17 quality checks replayed, a traced quarantine — and six pages that stop at the trade-off, not at the chart."),

  problem: T(
    "Les données existent, mais elles vivent dans des systèmes séparés — ERP pour les commandes, CRM pour les clients, régie publicitaire pour le média, WMS pour les stocks. Chaque direction produit son propre extrait Excel avec ses propres règles de calcul, et personne ne sait dire si deux chiffres qui divergent sont deux vérités ou deux erreurs. Le problème n'est pas l'absence de données : c'est l'absence de chaîne reliant la donnée à la décision.",
    "The data exists, but it lives in separate systems — ERP for orders, CRM for customers, ad platform for media spend, WMS for stock. Each department produces its own Excel extract with its own calculation rules, and nobody can say whether two diverging numbers are two truths or two errors. The problem is not a lack of data: it is the lack of a chain linking data to decision."),

  dataset: {
    source: T("Généré par src/data_generator.py à partir d'un modèle Pareto/NBD, puis chargé dans un entrepôt DuckDB reconstruit à chaque exécution. Toutes les données sont synthétiques.",
              "Generated by src/data_generator.py from a Pareto/NBD model, then loaded into a DuckDB warehouse rebuilt on every run. All data is synthetic."),
    volume: T("36 mois d'historique journalier : 12 000 clients dont 8 134 acheteurs, 420 SKU, 18 fournisseurs, ~65 000 commandes, ~116 000 lignes de faits, ~10,7 M€ de chiffre d'affaires net.",
              "36 months of daily history: 12,000 customers of whom 8,134 buyers, 420 SKUs, 18 suppliers, ~65,000 orders, ~116,000 fact rows, ~€10.7M of net revenue."),
    fields: ["stg_customers", "stg_products", "stg_orders", "stg_order_items",
             "stg_marketing", "stg_sessions", "dim_customer", "dim_product", "dim_date",
             "fct_orders", "fct_order_items", "mart_daily_revenue", "mart_customer_360",
             "mart_cohort", "quarantine", "dq_checks", "etl_run"],
    note: T("Chaque client reçoit une intensité d'achat latente et un taux d'attrition latent, d'où une durée de vie exponentielle ; les commandes suivent un processus de Poisson non homogène modulé par une saisonnalité réaliste (soldes, creux d'août, Black Friday, effondrement post-Noël). Conséquence : l'attrition est réellement prédictible à partir des seules variables RFM, sans qu'aucune colonne ne contienne la réponse. ~1,5 % d'anomalies sont injectées volontairement — doublons de clés, quantités négatives, prix à zéro, SKU orphelins, horodatages futurs — et 2 095 lignes finissent en quarantaine.",
              "Each customer receives a latent purchase intensity and a latent churn rate, hence an exponential lifetime; orders follow a non-homogeneous Poisson process modulated by realistic seasonality (sales periods, the August trough, Black Friday, the post-Christmas collapse). As a result churn is genuinely predictable from RFM variables alone, with no column containing the answer. ~1.5% of quality anomalies are injected on purpose — duplicate keys, negative quantities, zero prices, orphan SKUs, future timestamps — and 2,095 rows end up in quarantine.")
  },

  links: {
    repo: "https://github.com/IMADELKHELYFY/retailpulse-analytics",
    demo: "https://imadelkhelyfy-retailpulse-analytics-app-9tammt.streamlit.app/"
  },

  context: {
    secteur: T("E-commerce européen multi-catégories — Nova Retail (entreprise fictive)",
               "European multi-category e-commerce — Nova Retail (fictional company)"),
    modele: T("B2C, 6 familles de produits, 4 canaux (web, app, marketplace, magasin), 6 pays",
              "B2C, 6 product families, 4 channels (web, app, marketplace, store), 6 countries"),
    role: T("Data analyst / analytics engineer couvrant la chaîne complète : pipeline et qualité, KPI et cohortes, modèles d'attrition et de prévision",
            "Data analyst / analytics engineer covering the full chain: pipeline and quality, KPIs and cohorts, churn and forecasting models"),
    perimetre: T("36 mois d'historique, 12 000 clients dont 8 134 acheteurs, 420 SKU, ~65 000 commandes, ~116 000 lignes de faits",
                 "36 months of history, 12,000 customers of whom 8,134 buyers, 420 SKUs, ~65,000 orders, ~116,000 fact rows"),
    calcul: T("Build complet de l'entrepôt en ~10,7 s, idempotent ; requête de cohorte en quelques dizaines de millisecondes",
              "Full warehouse build in ~10.7 s, idempotent; a cohort query in tens of milliseconds"),
    stack: "Python · DuckDB · Streamlit · scikit-learn · Plotly · SQL · Sphinx"
  },

  kpis: [
    { value: 5.62, label: T("CA sur 12 mois", "Revenue over 12 months"),
      note: T("marge brute 1,68 M€ · taux 29,9 %", "gross margin €1.68M · rate 29.9%"),
      suffix: T(" M€", "M€"), decimals: 2 },
    { value: 116, label: T("Lignes de faits", "Fact rows"),
      note: T("17 contrôles qualité · 2 095 lignes en quarantaine", "17 quality checks · 2,095 rows quarantined"),
      suffix: " k", decimals: 0 },
    { value: 0.739, label: T("ROC AUC attrition", "Churn ROC AUC"),
      note: T("split temporel strict, sans fuite de données", "strict temporal split, no data leakage"),
      suffix: "", decimals: 3 },
    { value: 6.6, label: T("Erreur de prévision", "Forecast error"),
      note: T("WAPE sur le cumul à 90 jours", "WAPE on the 90-day cumulative"),
      suffix: " %", decimals: 1 }
  ],

  questions: [
    T("Le chiffre d'affaires monte et la marge baisse : est-ce un effet volume, une politique de remise trop agressive, ou un glissement du mix produit ?",
      "Revenue is up and margin is down: is it a volume effect, an overly aggressive discount policy, or a shift in product mix?"),
    T("Combien de clients contacter en rétention, et à partir de quel coût de contact la campagne cesse-t-elle d'être rentable ?",
      "How many customers should retention contact, and at what contact cost does the campaign stop paying off?"),
    T("Les chiffres sont-ils fiables ? Combien de lignes sont écartées, pour quel motif, et où sont-elles passées ?",
      "Are the numbers reliable? How many rows are discarded, for what reason, and where did they go?")
  ],

  framework: {
    intro: T(
      "Six directions produisaient six extraits Excel avec six règles de calcul. Le cadrage a consisté à imposer un entrepôt unique, reconstruit de façon idempotente, où chaque question métier reçoit une page et une seule.",
      "Six departments produced six Excel extracts with six sets of calculation rules. The framing was about imposing a single warehouse, rebuilt idempotently, where each business question gets one page and one only."),
    metrics: [
      { name: T("CA net et marge brute", "Net revenue and gross margin"),
        why: T("décomposés en volume / prix-remise / entrées de gamme / sorties de gamme, à l'euro près",
               "decomposed into volume / price-discount / range entries / range exits, to the euro") },
      { name: T("Rétention par cohorte", "Cohort retention"),
        why: T("la seule lecture qui sépare l'acquisition de la fidélisation",
               "the only reading that separates acquisition from loyalty") },
      { name: T("Gain attendu de campagne", "Expected campaign gain"),
        why: T("risque × valeur annuelle × marge × taux de sauvetage — pas le score brut",
               "risk × annual value × margin × save rate — not the raw score") }
    ],
    dimensions: [
      { name: T("Canal d'acquisition", "Acquisition channel"),
        why: T("l'organique et le CRM amènent des clients à plus forte valeur et plus faible attrition",
               "organic and CRM bring higher-value, lower-churn customers") },
      { name: T("Cohorte mensuelle", "Monthly cohort"),
        why: T("36 mois d'historique : la trajectoire d'une cohorte dit ce qu'un taux global masque",
               "36 months of history: a cohort's trajectory says what an overall rate hides") },
      { name: T("Catégorie × pays", "Category × country"),
        why: T("le mix se déforme par catégorie, la fiscalité et le panier varient par pays",
               "mix shifts by category; tax and basket size vary by country") }
    ]
  },

  method: [
    T("Génération Pareto/NBD", "Pareto/NBD generation"),
    T("Staging + 17 contrôles", "Staging + 17 checks"),
    T("Quarantaine tracée", "Traced quarantine"),
    T("Schéma en étoile", "Star schema"),
    T("Marts pré-calculés", "Pre-computed marts")
  ],

  figures: [
    {
      img: "assets/img/shots/retailpulse/01-vue-ensemble.webp",
      thumb: "assets/img/shots/retailpulse/thumbs/01-vue-ensemble.webp",
      title: T("Huit KPI comparés à période glissante, et des « signaux automatiques » recalculés à chaque changement de périmètre — pas du texte figé",
               "Eight KPIs compared on a rolling period, and “automatic signals” recomputed on every scope change — not frozen text"),
      read: T("Cartes KPI avec sparkline et variation, mix canal, dynamique quotidienne avec moyenne 7 jours et marge. Le bandeau de fraîcheur en barre latérale rappelle la date du dernier build et le nombre de lignes écartées.",
              "KPI cards with sparkline and variation, channel mix, daily dynamics with a 7-day average and margin. The freshness banner in the sidebar recalls the last build date and how many rows were discarded.")
    },
    {
      img: "assets/img/shots/retailpulse/02-revenu-marge.webp",
      thumb: "assets/img/shots/retailpulse/thumbs/02-revenu-marge.webp",
      title: T("Le pont de chiffre d'affaires décompose l'écart en quatre termes dont la somme reconstitue exactement la variation",
               "The revenue bridge decomposes the gap into four terms whose sum reconstitutes the change exactly"),
      read: T("ΔCA = effet volume + effet prix/remise + entrées de gamme − sorties de gamme. Sur le périmètre commun, l'effet volume vaut (Qn − Qn₋₁) × Pn₋₁ et l'effet prix (Pn − Pn₋₁) × Qn. Plus d'arbitrage tarifaire au jugement.",
              "Δrevenue = volume effect + price/discount effect + range entries − range exits. On the common scope, the volume effect is (Qn − Qn₋₁) × Pn₋₁ and the price effect (Pn − Pn₋₁) × Qn. No more pricing decisions by judgement.")
    },
    {
      img: "assets/img/shots/retailpulse/03-clients-retention.webp",
      thumb: "assets/img/shots/retailpulse/thumbs/03-clients-retention.webp",
      title: T("Cohortes mensuelles, segmentation RFM en quintiles et marge par client rapportée au CAC — en échelle log, l'écart entre canaux est de deux ordres de grandeur",
               "Monthly cohorts, quintile RFM segmentation and margin per customer against CAC — on a log scale, the gap between channels spans two orders of magnitude"),
      read: T("Dix segments RFM, chacun avec une action recommandée. La comparaison LTV / CAC par canal montre qu'un canal moins cher à l'acquisition peut être bien plus cher sur la durée de vie.",
              "Ten RFM segments, each with a recommended action. The LTV / CAC comparison by channel shows that a channel cheaper on acquisition can be far more expensive over a lifetime.")
    },
    {
      img: "assets/img/shots/retailpulse/04-risque-attrition.webp",
      thumb: "assets/img/shots/retailpulse/thumbs/04-risque-attrition.webp",
      title: T("Un ROC AUC de 0,739 affiché tel quel : un modèle d'attrition parfait serait le signe d'une fuite de données, pas d'un exploit",
               "A ROC AUC of 0.739 displayed as is: a perfect churn model would be the sign of a data leak, not of a feat"),
      read: T("Split temporel strict — variables arrêtées à une date de coupe, étiquette observée sur les 90 jours suivants. ROC, gain cumulé, calibration et importance par permutation mesurée sur l'AUC. Le simulateur de campagne classe par gain attendu, pas par score.",
              "Strict temporal split — features frozen at a cut-off date, label observed over the following 90 days. ROC, cumulative gain, calibration and permutation importance measured on AUC. The campaign simulator ranks by expected gain, not by score.")
    },
    {
      img: "assets/img/shots/retailpulse/05-prevision-anomalies.webp",
      thumb: "assets/img/shots/retailpulse/thumbs/05-prevision-anomalies.webp",
      title: T("18 % d'erreur à la journée mais 6,6 % sur le cumul à 90 jours — c'est la seconde métrique qui dimensionne un budget ou un stock",
               "18% error on a daily basis but 6.6% on the 90-day cumulative — it is the second metric that sizes a budget or a stock"),
      read: T("Ridge sur base de Fourier annuelle + effets calendaires + événements commerciaux. Intervalles issus des quantiles empiriques des erreurs de backtest, sans hypothèse de normalité. Anomalies détectées par score médiane/MAD sur les résidus en espace logarithmique.",
              "Ridge on an annual Fourier basis + calendar effects + commercial events. Intervals from the empirical quantiles of backtest errors, with no normality assumption. Anomalies detected by a median/MAD score on residuals in log space.")
    },
    {
      img: "assets/img/shots/retailpulse/06-stocks-reappro.webp",
      thumb: "assets/img/shots/retailpulse/thumbs/06-stocks-reappro.webp",
      title: T("Le coût de la non-fiabilité fournisseur devient chiffrable : il se paie en stock de sécurité supplémentaire",
               "The cost of supplier unreliability becomes quantifiable: it is paid in extra safety stock"),
      read: T("Délai effectif = délai contractuel × (2 − fiabilité fournisseur). Chaque référence reçoit un statut, une quantité à commander, un capital immobilisé et un CA exposé. L'ordre de réapprovisionnement s'exporte en CSV pour l'ERP.",
              "Effective lead time = contractual lead time × (2 − supplier reliability). Every SKU gets a status, an order quantity, tied-up capital and exposed revenue. The replenishment order exports to CSV for the ERP.")
    }
  ],

  insights: [
    {
      title: T("Un pipeline sans règle en échec est généralement un pipeline sans règle",
               "A pipeline with no failing rule is usually a pipeline with no rules"),
      data: T("17 contrôles typés par sévérité rejoués à chaque build. Les règles de la couche staging échouent volontairement — elles constatent l'état réel des sources : doublons de clés, quantités négatives, prix à zéro, SKU orphelins, horodatages futurs. 2 095 lignes partent en quarantaine.",
              "17 severity-typed checks replayed on every build. The staging-layer rules fail on purpose — they record the real state of the sources: duplicate keys, negative quantities, zero prices, orphan SKUs, future timestamps. 2,095 rows go to quarantine."),
      soWhat: T("Rien n'est supprimé en silence : chaque ligne rejetée reste consultable avec son motif, ce qui permet de remonter à la source plutôt que de constater un écart inexpliqué en fin de mois.",
                "Nothing is silently deleted: every rejected row stays inspectable with its reason, which lets you trace back to the source instead of noting an unexplained gap at month end."),
      driver: T("Les règles de la couche mart passent toutes au vert : c'est la preuve que le nettoyage fait son travail, et non une déclaration d'intention.",
                "The mart-layer rules all pass green: that is proof the cleaning does its job, not a statement of intent."),
      team: "Data Engineering"
    },
    {
      title: T("Classer par gain attendu plutôt que par score déplace l'optimum de campagne",
               "Ranking by expected gain rather than by score moves the campaign optimum"),
      data: T("Le simulateur classe les clients par risque × valeur annuelle × marge × taux de sauvetage. Le gain marginal devient décroissant et l'optimum est un vrai point intérieur : environ 50 % de la base à 8 € le contact, 23 % à 15 €.",
              "The simulator ranks customers by risk × annual value × margin × save rate. Marginal gain becomes decreasing and the optimum is a genuine interior point: about 50% of the base at €8 per contact, 23% at €15."),
      soWhat: T("Cibler par score brut revient à contacter des clients très à risque mais peu contributifs. La question n'est plus « qui va partir ? » mais « qui vaut la peine d'être retenu, à ce prix de contact ? ».",
                "Targeting by raw score means contacting customers at high risk but contributing little. The question is no longer “who will leave?” but “who is worth retaining, at this contact price?”."),
      driver: T("Le coût du contact est le paramètre qui déplace l'optimum : multiplier le coût par deux divise presque par deux la taille optimale de campagne.",
                "Contact cost is the parameter that moves the optimum: doubling the cost nearly halves the optimal campaign size."),
      team: T("CRM · Direction marketing", "CRM · Marketing leadership")
    },
    {
      title: T("L'auditabilité l'emporte sur la performance brute quand la décision passe en comité",
               "Auditability beats raw performance when the decision goes to committee"),
      data: T("Ridge sur base de Fourier : log(1+y) ~ tendance + harmoniques annuelles + effet jour de semaine + événements. Effets mesurés par contrefactuel — Black Friday ≈ +105 %, creux d'août ≈ −19 %.",
              "Ridge on a Fourier basis: log(1+y) ~ trend + annual harmonics + day-of-week effect + events. Effects measured counterfactually — Black Friday ≈ +105%, the August trough ≈ −19%."),
      soWhat: T("Moins puissante qu'un modèle profond, mais chaque composante s'explique devant un comité de direction — ce qui la rend utilisable. Un modèle qu'on ne peut pas défendre ne sert à rien.",
                "Less powerful than a deep model, but every component can be explained to an executive committee — which is what makes it usable. A model you cannot defend is worth nothing."),
      driver: T("L'horizon de prévision est arbitraire (aucune dépendance à des lags), l'entraînement prend quelques millisecondes, et les intervalles viennent des quantiles empiriques du backtest plutôt que d'une hypothèse de normalité.",
                "The forecast horizon is arbitrary (no dependence on lags), training takes a few milliseconds, and the intervals come from empirical backtest quantiles rather than a normality assumption."),
      team: T("Direction financière · Supply", "Finance leadership · Supply")
    }
  ],

  matrix: [
    { action: T("Arbitrer la politique de remise à partir du pont de CA plutôt qu'au jugement",
                "Set discount policy from the revenue bridge rather than by judgement"),
      priority: "Haute",
      impact: T("Décomposition exacte de l'écart de marge en quatre termes, à l'euro près",
                "Exact decomposition of the margin gap into four terms, to the euro"),
      owner: T("Contrôle de gestion · Pricing", "Financial control · Pricing"),
      kpi: T("Taux de marge · efficacité promotionnelle", "Margin rate · promotional efficiency") },
    { action: T("Dimensionner la campagne de rétention sur le gain attendu et le coût réel du contact",
                "Size the retention campaign on expected gain and real contact cost"),
      priority: "Haute",
      impact: T("Optimum à ~50 % de la base à 8 €, ~23 % à 15 €", "Optimum at ~50% of the base at €8, ~23% at €15"),
      owner: "CRM",
      kpi: T("Gain net de campagne", "Net campaign gain") },
    { action: T("Exporter l'ordre de réapprovisionnement vers l'ERP en intégrant la fiabilité fournisseur au délai",
                "Export the replenishment order to the ERP with supplier reliability folded into lead time"),
      priority: "Haute",
      impact: T("Le coût de la non-fiabilité devient un stock de sécurité chiffré",
                "The cost of unreliability becomes quantified safety stock"),
      owner: "Supply",
      kpi: T("Taux de rupture · capital immobilisé", "Stockout rate · tied-up capital") },
    { action: T("Réallouer le budget média sur la marge par client rapportée au CAC, pas sur le coût du clic",
                "Reallocate media budget on margin per customer against CAC, not on cost per click"),
      priority: "Moyenne",
      impact: T("Deux ordres de grandeur d'écart entre canaux organiques et payants",
                "Two orders of magnitude between organic and paid channels"),
      owner: T("Acquisition", "Acquisition"),
      kpi: T("LTV / CAC par canal", "LTV / CAC by channel") },
    { action: T("Orchestrer le build (Airflow / Dagster) et historiser les runs pour suivre la dérive qualité",
                "Orchestrate the build (Airflow / Dagster) and historise runs to track quality drift"),
      priority: "Moyenne",
      impact: T("Passe d'un build à la demande à une chaîne surveillée",
                "Moves from an on-demand build to a monitored chain"),
      owner: "Data Engineering",
      kpi: T("Taux de contrôles au vert dans le temps", "Share of checks passing over time") },
    { action: T("Passer les marts à dbt pour versionner les transformations et générer le lignage",
                "Move the marts to dbt to version the transformations and generate lineage"),
      priority: "Basse",
      impact: T("Traçabilité de bout en bout des définitions métier",
                "End-to-end traceability of business definitions"),
      owner: "Analytics Engineering",
      kpi: T("Couverture de tests dbt", "dbt test coverage") }
  ],

  appendix: {
    code: [
      {
        label: T("SQL — cohortes", "SQL — cohorts"),
        lang: "sql",
        body:
`CREATE OR REPLACE TABLE mart_cohort AS
WITH first_order AS (
    SELECT customer_id, min(order_date) AS first_date
    FROM fct_orders GROUP BY 1
),
cohorts AS (
    SELECT f.customer_id,
           strftime(f.first_date, '%Y-%m')   AS cohort_month,
           date_trunc('month', f.first_date) AS cohort_start,
           date_trunc('month', o.order_date) AS activity_month,
           o.order_id
    FROM first_order f JOIN fct_orders o USING (customer_id)
),
sized AS (
    SELECT cohort_month, cohort_start,
           date_diff('month', cohort_start, activity_month) AS month_index,
           count(DISTINCT customer_id)                      AS customers
    FROM cohorts GROUP BY 1, 2, 3
)
SELECT s.cohort_month, s.month_index, s.customers,
       first_value(s.customers) OVER (
           PARTITION BY s.cohort_month ORDER BY s.month_index) AS cohort_size,
       s.customers * 1.0 / first_value(s.customers) OVER (
           PARTITION BY s.cohort_month ORDER BY s.month_index) AS retention,
       coalesce(r.revenue, 0) AS revenue
FROM sized s LEFT JOIN rev r USING (cohort_month, month_index)
ORDER BY s.cohort_month, s.month_index;`
      },
      {
        label: T("Pipeline medallion", "Medallion pipeline"),
        lang: "text",
        body: T(
`CSV bruts
   │  numpy / pandas — génération Pareto/NBD
   ▼
stg_*                  chargement brut, typage automatique (read_csv_auto)
   │  17 règles SQL typées par sévérité (bloquant / majeur / mineur)
   ▼
quarantine             les lignes non conformes sont TRACÉES, pas supprimées
   │
   ▼
dim_* / fct_*          schéma en étoile : dimensions conformes, faits nettoyés,
   │                   déduplication par fenêtre, calendrier sans trou
   ▼
mart_*                 agrégats pré-calculés — les pages ne font que LIRE

 Couche      Tables                                          Lignes
 ─────────   ─────────────────────────────────────────────   ────────
 Staging     stg_customers · stg_products · stg_orders …     ~208 000
 Étoile      dim_customer · dim_product · dim_date · fct_*   ~194 000
 Marts       mart_daily_revenue · mart_cohort · mart_*        ~17 000
 Qualité     quarantine · dq_checks · etl_run                  ~2 100

Pourquoi DuckDB : les agrégats se déclarent en SQL analytique (fenêtrage,
FULL OUTER JOIN, date_diff, CTE chaînées) — la logique métier reste
relisible par un analyste. L'entrepôt tient dans un fichier unique
versionnable, sans serveur à administrer.`,
`Raw CSVs
   │  numpy / pandas — Pareto/NBD generation
   ▼
stg_*                  raw load, automatic typing (read_csv_auto)
   │  17 SQL rules typed by severity (blocking / major / minor)
   ▼
quarantine             non-conforming rows are TRACED, not deleted
   │
   ▼
dim_* / fct_*          star schema: conformed dimensions, cleaned facts,
   │                   window deduplication, gap-free calendar
   ▼
mart_*                 pre-computed aggregates — pages only READ

 Layer       Tables                                          Rows
 ─────────   ─────────────────────────────────────────────   ────────
 Staging     stg_customers · stg_products · stg_orders …     ~208,000
 Star        dim_customer · dim_product · dim_date · fct_*   ~194,000
 Marts       mart_daily_revenue · mart_cohort · mart_*        ~17,000
 Quality     quarantine · dq_checks · etl_run                  ~2,100

Why DuckDB: aggregates are declared in analytical SQL (windowing,
FULL OUTER JOIN, date_diff, chained CTEs) — the business logic stays
readable to an analyst. The warehouse fits in a single versionable file,
with no server to administer.`)
      },
      {
        label: T("Attrition — split temporel", "Churn — temporal split"),
        lang: "python",
        body: T(
`# src/ml/churn.py — split temporel STRICT, sans fuite de données
#
# |<-------- fenêtre de variables -------->|<-- horizon 90 j -->|
# début                                  cutoff                T
#
#   variables  : uniquement l'historique <= cutoff
#   étiquette  : le client a-t-il commandé entre cutoff et T ?
#   population : clients « vivants » au cutoff (dernière commande < 180 j)

model = HistGradientBoostingClassifier(
    categorical_features=cat_cols, max_iter=300, learning_rate=0.06,
    random_state=42,
).fit(X_train, y_train)

# ROC AUC ~ 0,739 · PR AUC ~ 0,606 pour un taux de base de 38 %
# Affiché tel quel : un modèle parfait sur ce problème serait le signe
# d'une fuite de données, pas d'un exploit.

# Simulateur : on classe par GAIN ATTENDU, pas par score brut.
gain = proba_churn * valeur_annuelle * marge * taux_de_sauvetage - cout_contact`,
`# src/ml/churn.py — STRICT temporal split, no data leakage
#
# |<-------- feature window -------->|<-- 90-day horizon -->|
# start                            cutoff                   T
#
#   features   : history <= cutoff only
#   label      : did the customer order between cutoff and T?
#   population : customers "alive" at cutoff (last order < 180 days)

model = HistGradientBoostingClassifier(
    categorical_features=cat_cols, max_iter=300, learning_rate=0.06,
    random_state=42,
).fit(X_train, y_train)

# ROC AUC ~ 0.739 · PR AUC ~ 0.606 for a 38% base rate
# Displayed as is: a perfect model on this problem would be the sign of a
# data leak, not of a feat.

# Simulator: ranking is by EXPECTED GAIN, not by raw score.
gain = churn_proba * annual_value * margin * save_rate - contact_cost`)
      },
      {
        label: T("Prévision & réappro", "Forecast & replenishment"),
        lang: "python",
        body: T(
`# src/ml/forecast.py — Ridge sur base de variables temporelles explicites
#   log(1 + y) ~ tendance + harmoniques de Fourier annuelles
#                + effet jour de semaine + événements commerciaux
#
# Backtest hors échantillon sur 90 jours :
#   WAPE ~ 18 % à la journée, mais 6,6 % SUR LE CUMUL
#   -> c'est la seconde métrique qui compte pour dimensionner un budget.
#
# Intervalles : quantiles empiriques des erreurs relatives de backtest,
# élargis avec l'horizon. Aucune hypothèse de normalité.
# Anomalies : score robuste médiane / MAD sur les résidus en espace log.


# src/analytics.py — plan de réapprovisionnement
delai_effectif   = delai_contractuel * (2 - fiabilite_fournisseur)
stock_securite   = z(niveau_service) * sigma_demande * sqrt(delai_effectif)
point_de_commande = demande_moyenne * delai_effectif + stock_securite

# Le délai est majoré par le manque de fiabilité : le COÛT DE LA
# NON-FIABILITÉ devient chiffrable en stock de sécurité supplémentaire.`,
`# src/ml/forecast.py — Ridge on an explicit temporal feature basis
#   log(1 + y) ~ trend + annual Fourier harmonics
#                + day-of-week effect + commercial events
#
# Out-of-sample backtest over 90 days:
#   WAPE ~ 18% daily, but 6.6% ON THE CUMULATIVE
#   -> it is the second metric that matters when sizing a budget.
#
# Intervals: empirical quantiles of the backtest relative errors, widened
# with the horizon. No normality assumption.
# Anomalies: robust median / MAD score on residuals in log space.


# src/analytics.py — replenishment plan
effective_lead   = contractual_lead * (2 - supplier_reliability)
safety_stock     = z(service_level) * sigma_demand * sqrt(effective_lead)
reorder_point    = mean_demand * effective_lead + safety_stock

# Lead time is inflated by unreliability: the COST OF UNRELIABILITY
# becomes quantifiable as extra safety stock.`)
      }
    ],
    difficulties: [
      { p: T("Six directions, six extraits Excel, six règles de calcul : impossible de savoir si deux chiffres divergents sont deux vérités ou deux erreurs.",
             "Six departments, six Excel extracts, six sets of rules: impossible to know whether two diverging numbers are two truths or two errors."),
        s: T("Un entrepôt unique reconstruit de façon idempotente, avec les définitions métier déclarées une seule fois en SQL.",
             "A single warehouse rebuilt idempotently, with business definitions declared once in SQL.") },
      { p: T("Un générateur naïf aurait rendu l'attrition tautologique — le modèle aurait lu la réponse dans une colonne.",
             "A naive generator would have made churn tautological — the model would have read the answer in a column."),
        s: T("Modèle Pareto/NBD : intensité d'achat et taux d'attrition latents, durée de vie exponentielle, processus de Poisson non homogène. L'attrition devient réellement prédictible à partir des seules variables RFM.",
             "A Pareto/NBD model: latent purchase intensity and churn rate, exponential lifetime, non-homogeneous Poisson process. Churn becomes genuinely predictable from RFM variables alone.") },
      { p: T("Supprimer les lignes non conformes rendait l'écart de CA inexplicable en fin de mois.",
             "Deleting non-conforming rows made the month-end revenue gap unexplainable."),
        s: T("Table de quarantaine : chaque ligne rejetée reste consultable avec son motif et sa sévérité.",
             "A quarantine table: every rejected row stays inspectable with its reason and severity.") },
      { p: T("Les composants Streamlit par défaut ne permettaient pas une hiérarchie de lecture crédible.",
             "Default Streamlit components could not deliver a credible reading hierarchy."),
        s: T("Système de design maison : tokens CSS uniques consommés à la fois par les composants HTML et par le template Plotly, cartes KPI avec sparkline, tableaux HTML avec barres de progression et pastilles de statut.",
             "A homemade design system: single CSS tokens consumed by both the HTML components and the Plotly template, KPI cards with sparklines, HTML tables with progress bars and status pills.") },
      { p: T("Un tableau de bord commercial n'est pas l'endroit où l'on inspecte un pipeline.",
             "A commercial dashboard is not where you inspect a pipeline."),
        s: T("Aucune page technique dans l'application : seul un bandeau de fraîcheur en barre latérale rappelle le dernier build, le volume chargé et les lignes écartées. Le détail vit dans la documentation Sphinx.",
             "No technical page in the application: only a freshness banner in the sidebar recalls the last build, the volume loaded and the rows discarded. The detail lives in the Sphinx documentation.") },
      { p: T("Les commentaires rédigés à l'avance devenaient faux dès qu'on changeait de périmètre.",
             "Pre-written commentary became wrong as soon as the scope changed."),
        s: T("Les « signaux automatiques » sont recalculés à chaque filtre : dynamique du CA, effet ciseau marge/promo, pic de la période, concentration du portefeuille, pente hebdomadaire, taux de retour.",
             "The “automatic signals” are recomputed on every filter: revenue dynamics, the margin/promo scissor effect, the period's peak, portfolio concentration, weekly slope, return rate.") }
    ],
    limits: [
      T("Données synthétiques : le générateur reproduit des régularités réalistes, il ne remplace pas un historique réel.",
        "Synthetic data: the generator reproduces realistic regularities, it does not replace a real history."),
      T("Pas d'orchestration : le build est déclenché à la demande, sans historisation des runs ni suivi de dérive qualité dans le temps.",
        "No orchestration: the build is triggered on demand, with no run history and no quality-drift tracking over time."),
      T("Les transformations sont en SQL brut plutôt qu'en dbt : pas de lignage automatique ni de versionnement des modèles.",
        "Transformations are in raw SQL rather than dbt: no automatic lineage and no model versioning."),
      T("Le modèle d'attrition n'a pas de suivi de dérive (PSI) ni de ré-entraînement planifié.",
        "The churn model has no drift monitoring (PSI) and no scheduled retraining."),
      T("Un modèle d'uplift serait plus juste qu'un modèle de churn : il ciblerait les clients dont le comportement change grâce à la campagne, pas ceux qui seraient restés.",
        "An uplift model would be fairer than a churn model: it would target customers whose behaviour changes because of the campaign, not those who would have stayed anyway.")
    ]
  },

  run: "streamlit run app.py   →   http://localhost:8501"
},

/* ═════════════════════════════════════════════════════════════════════════
   07 — DATA CLEANING STUDIO
   ═════════════════════════════════════════════════════════════════════════ */
{
  slug: "data-cleaning",
  num: "07",
  title: "Data Cleaning Studio",
  family: T("Outillage", "Tooling"),
  familyKey: "tooling",
  accent: "#45607E",
  accentDark: "#9DB6D2",
  tags: ["Streamlit", "DuckDB", "pandas", "SciPy", "Reliability", "Plotly"],
  cover: "assets/img/shots/data-cleaning/thumbs/02-exploration.webp",

  headline: T(
    "520 000 lignes nettoyées en sept étapes annulables — et un aiguillage statistique qui explique aussi le test qu'il écarte.",
    "520,000 rows cleaned across seven undoable steps — and a statistical router that also explains the test it rules out."),

  pitch: T(
    "Le nettoyage de données est le travail le moins visible et le plus coûteux d'une équipe. Cet outil le rend traçable : chaque action entre dans un journal, chaque action est annulable, et l'analyse statistique commence par une question métier plutôt que par une liste de tests.",
    "Data cleaning is the least visible and most expensive work a team does. This tool makes it traceable: every action enters a log, every action is undoable, and statistical analysis starts from a business question rather than a list of tests."),

  problem: T(
    "Le nettoyage de données est le travail le moins visible et le plus coûteux d'une équipe, et il se fait presque toujours dans un notebook : irréversible, non journalisé, impossible à rejouer ou à transmettre. S'y ajoute un second travers — face à un menu de tests statistiques, l'utilisateur choisit le mauvais avec assurance, et une conclusion fausse défendue avec conviction coûte plus cher que pas d'analyse du tout.",
    "Data cleaning is the least visible and most expensive work a team does, and it almost always happens in a notebook: irreversible, unlogged, impossible to replay or hand over. A second flaw compounds it — faced with a menu of statistical tests, users pick the wrong one confidently, and a false conclusion defended with conviction costs more than no analysis at all."),

  dataset: {
    source: T("Deux jeux d'exemple fournis, régénérables par sample_data/generate_sample.py. L'application accepte par ailleurs n'importe quel CSV, TXT, Excel ou Parquet déposé par l'utilisateur.",
              "Two sample sets are shipped, regenerable with sample_data/generate_sample.py. The application otherwise accepts any CSV, TXT, Excel or Parquet file the user drops in."),
    volume: T("Jeu d'exemple : 3 125 lignes volontairement sales. Mesures de performance faites sur 520 833 lignes × 14 colonnes (CSV de 55 Mo).",
              "Sample set: 3,125 deliberately dirty rows. Performance measured on 520,833 rows × 14 columns (a 55 MB CSV)."),
    fields: ["id_commande", "Date Commande", "Client", "Ville", "Pays",
             "Catégorie Produit", "Canal", "Commercial", "Quantité", "Prix Unitaire",
             "Remise %", "Satisfaction", "Montant Total", "Commentaire"],
    note: T("Les défauts sont injectés volontairement : 75 doublons exacts, 125 doublons sur id_commande, ~4 000 valeurs manquantes, des prix stockés en texte (« 135,84 € »), des dates aux formats mélangés et des espaces parasites. La variante Excel répartit les mêmes données sur trois feuilles avec deux lignes de titre au-dessus des en-têtes, pour éprouver le sélecteur de feuille et l'option « ligne des en-têtes ».",
              "Defects are injected on purpose: 75 exact duplicates, 125 duplicates on id_commande, ~4,000 missing values, prices stored as text (“135,84 €”), mixed date formats and stray whitespace. The Excel variant spreads the same data across three sheets with two title rows above the headers, to exercise the sheet selector and the “header row” option.")
  },

  links: {
    repo: "https://github.com/IMADELKHELYFY/data-cleaning-studio",
    demo: "https://imadelkhelyfy-data-cleaning-studio-app-jnydlt.streamlit.app/"
  },

  context: {
    secteur: T("Outillage interne — préparation et analyse de données tabulaires",
               "Internal tooling — tabular data preparation and analysis"),
    modele: T("Application de bureau locale, aucun service externe, aucune donnée envoyée",
              "A local desktop application, no external service, no data sent anywhere"),
    role: T("Conception et développement complet : ergonomie du workflow, moteur de nettoyage, aiguillage statistique et exports",
            "Full design and development: workflow ergonomics, cleaning engine, statistical routing and exports"),
    perimetre: T("Testé sur 520 833 lignes × 14 colonnes (CSV de 55 Mo) ; jeu d'exemple de 3 125 lignes volontairement sales",
                 "Tested on 520,833 rows × 14 columns (a 55 MB CSV); a deliberately dirty 3,125-row sample set"),
    calcul: T("Import CSV 3,0 s · requête SQL agrégée 0,13 s · snapshot d'annulation 0,06 s",
              "CSV import 3.0 s · aggregated SQL query 0.13 s · undo snapshot 0.06 s"),
    stack: "Python · Streamlit · pandas · DuckDB · SciPy · Plotly · openpyxl · pyarrow"
  },

  kpis: [
    { value: 520833, label: T("Lignes traitées", "Rows processed"),
      note: T("14 colonnes, CSV de 55 Mo", "14 columns, a 55 MB CSV"), suffix: "" },
    { value: 3.0, label: T("Import CSV", "CSV import"),
      note: T("encodage et séparateur auto-détectés", "encoding and separator auto-detected"),
      suffix: " s", decimals: 1 },
    { value: 0.13, label: T("Requête SQL agrégée", "Aggregated SQL query"),
      note: T("DuckDB lit le DataFrame sans copie", "DuckDB reads the DataFrame with no copy"),
      suffix: " s", decimals: 2 },
    { value: 8, label: T("Étapes du workflow", "Workflow steps"),
      note: T("de l'import à l'analyse statistique guidée", "from import to guided statistical analysis"), suffix: "" }
  ],

  questions: [
    T("Comment rendre un nettoyage traçable et réversible, plutôt qu'une suite d'opérations irrécupérables dans un notebook ?",
      "How do you make cleaning traceable and reversible, rather than a sequence of irrecoverable operations in a notebook?"),
    T("Comment tenir des temps de réponse acceptables sur 500 000 lignes dans un framework qui réexécute tout le script à chaque interaction ?",
      "How do you keep response times acceptable on 500,000 rows in a framework that re-runs the whole script on every interaction?"),
    T("Comment amener un utilisateur au bon test statistique sans lui demander de savoir lequel il cherche ?",
      "How do you lead a user to the right statistical test without requiring them to know which one they are after?")
  ],

  framework: {
    intro: T(
      "L'outil ne part pas d'une liste de fonctions mais d'un parcours : sept étapes visibles, un état unique, et une pile d'annulation bornée. L'étape 8 applique le même principe aux statistiques.",
      "The tool does not start from a list of functions but from a journey: seven visible steps, a single state, and a bounded undo stack. Step 8 applies the same principle to statistics."),
    metrics: [
      { name: T("Complétude par colonne", "Completeness per column"),
        why: T("le premier diagnostic : où sont les trous et de quelle nature",
               "the first diagnosis: where the holes are and of what nature") },
      { name: T("Taux de doublons", "Duplicate rate"),
        why: T("distingué par portée — ligne entière ou colonnes clés, ce qui n'est pas la même erreur",
               "distinguished by scope — whole row or key columns, which are not the same error") },
      { name: T("Temps de réponse par opération", "Response time per operation"),
        why: T("un outil interactif qui dépasse quelques secondes cesse d'être utilisé",
               "an interactive tool that exceeds a few seconds stops being used") }
    ],
    dimensions: [
      { name: T("Colonne (type, cardinalité)", "Column (type, cardinality)"),
        why: T("l'analyse colonne par colonne repère les identifiants candidats",
               "column-by-column analysis spots candidate identifiers") },
      { name: T("Étape du workflow", "Workflow step"),
        why: T("l'état, le journal et l'annulation sont indexés par étape",
               "state, log and undo are indexed by step") },
      { name: T("Besoin analytique", "Analytical need"),
        why: T("décrire · comparer · corréler · ajuster une loi · fiabilité — l'aiguillage part de là",
               "describe · compare · correlate · fit a distribution · reliability — routing starts here") }
    ]
  },

  method: [
    T("Import multi-format", "Multi-format import"),
    T("Exploration & typage", "Exploration & typing"),
    T("Doublons & manquantes", "Duplicates & missing values"),
    T("Transformation SQL", "SQL transformation"),
    T("Export & statistiques", "Export & statistics")
  ],

  figures: [
    {
      img: "assets/img/shots/data-cleaning/02-exploration.webp",
      thumb: "assets/img/shots/data-cleaning/thumbs/02-exploration.webp",
      title: T("Le stepper marque l'étape active, coche les étapes terminées et grise celles non atteintes — la navigation reste libre entre les étapes visitées",
               "The stepper marks the active step, ticks completed ones and greys out those not yet reached — navigation stays free between visited steps"),
      read: T("Cinq métriques globales recalculées à chaque action, pas à chaque rerun : lignes, colonnes, valeurs manquantes, doublons, mémoire. L'aperçu n'envoie que 200 lignes au navigateur.",
              "Five global metrics recomputed on every action, not on every rerun: rows, columns, missing values, duplicates, memory. The preview sends only 200 rows to the browser.")
    },
    {
      img: "assets/img/shots/data-cleaning/04-doublons.webp",
      thumb: "assets/img/shots/data-cleaning/thumbs/04-doublons.webp",
      title: T("La portée du doublon est explicite : ligne entière ou colonnes clés — 75 doublons exacts et 125 doublons d'identifiant ne sont pas la même erreur",
               "Duplicate scope is explicit: whole row or key columns — 75 exact duplicates and 125 identifier duplicates are not the same error"),
      read: T("L'analyse colonne par colonne repère les identifiants candidats. L'aperçu surligne les groupes de doublons, mais seulement sous 200 lignes : le Styler pandas est coûteux.",
              "Column-by-column analysis spots candidate identifiers. The preview highlights duplicate groups, but only under 200 rows: the pandas Styler is expensive.")
    },
    {
      img: "assets/img/shots/data-cleaning/06-transformer.webp",
      thumb: "assets/img/shots/data-cleaning/thumbs/06-transformer.webp",
      title: T("Le DataFrame courant est exposé à DuckDB comme table df — lecture directe de la mémoire pandas, sans copie",
               "The current DataFrame is exposed to DuckDB as table df — read directly from pandas memory, with no copy"),
      read: T("Seules les requêtes SELECT / WITH sont acceptées : les écritures passent par les boutons du workflow, qui alimentent l'historique et restent annulables. « Appliquer au jeu de données » remplace le DataFrame courant.",
              "Only SELECT / WITH queries are accepted: writes go through the workflow buttons, which feed the history and stay undoable. “Apply to the dataset” replaces the current DataFrame.")
    },
    {
      img: "assets/img/shots/data-cleaning/08-stats.webp",
      thumb: "assets/img/shots/data-cleaning/thumbs/08-stats.webp",
      title: T("L'analyse ne commence pas par une liste de tests mais par une question : décrire, comparer, corréler, ajuster une loi, ou fiabilité",
               "The analysis starts not from a list of tests but from a question: describe, compare, correlate, fit a distribution, or reliability"),
      read: T("L'aiguillage renvoie le test retenu ET celui qu'il écarte, chacun avec sa justification — de sorte que l'utilisateur comprenne la décision au lieu de la subir. Chaque résultat affiche trois blocs : chiffre, interprétation, graphique.",
              "The router returns the chosen test AND the one it rules out, each with its justification — so the user understands the decision instead of enduring it. Every result shows three blocks: figure, interpretation, chart.")
    },
    {
      img: "assets/img/shots/data-cleaning/07-export.webp",
      thumb: "assets/img/shots/data-cleaning/thumbs/07-export.webp",
      title: T("Export multi-format avec récapitulatif avant / après : ce qui a été retiré, converti, imputé — et ce qu'il reste",
               "Multi-format export with a before / after summary: what was removed, converted, imputed — and what remains"),
      read: T("CSV, TSV, Excel, Parquet, JSON, plusieurs formats d'un coup, séparateur et décimale paramétrables. Le fichier n'est généré que sur clic explicite : l'export XLSX est l'opération la plus coûteuse du parcours.",
              "CSV, TSV, Excel, Parquet, JSON, several formats at once, with configurable separator and decimal mark. The file is only generated on an explicit click: the XLSX export is the most expensive operation in the journey.")
    }
  ],

  insights: [
    {
      title: T("L'annulation change la façon dont on nettoie", "Undo changes the way you clean"),
      data: T("Chaque action pousse un snapshot du DataFrame sur une pile bornée à 8 entrées ; un snapshot coûte 0,06 s sur 520 000 lignes. Le journal de session liste les actions appliquées.",
              "Every action pushes a DataFrame snapshot onto a stack bounded at 8 entries; a snapshot costs 0.06 s on 520,000 rows. The session log lists the applied actions."),
      soWhat: T("Un nettoyage réversible autorise l'expérimentation : on peut tenter une imputation, regarder le résultat et revenir. Sans annulation, l'utilisateur devient prudent, et la prudence produit des jeux de données mal nettoyés.",
                "Reversible cleaning permits experimentation: you can try an imputation, look at the result and step back. Without undo, users turn cautious, and caution produces badly cleaned datasets."),
      driver: T("La borne à 8 snapshots est un choix explicite : chacun est une copie complète du DataFrame, la mémoire consommée devait rester prévisible sur un poste de travail.",
                "The bound of 8 snapshots is an explicit choice: each is a full copy of the DataFrame, and memory use had to stay predictable on a workstation."),
      team: T("Analystes · Data", "Analysts · Data")
    },
    {
      title: T("La performance dans Streamlit se gagne en décidant ce qu'on ne calcule pas",
               "Performance in Streamlit is won by deciding what not to compute"),
      data: T("Sur 520 833 lignes : import 3,0 s, métriques globales 1,5 s, détection de doublons 1,0 s, conversion automatique de toutes les colonnes 7,5 s, requête SQL agrégée 0,13 s, export CSV 5,7 s.",
              "On 520,833 rows: import 3.0 s, global metrics 1.5 s, duplicate detection 1.0 s, automatic conversion of every column 7.5 s, aggregated SQL query 0.13 s, CSV export 5.7 s."),
      soWhat: T("Streamlit réexécute le script entier à chaque interaction. Sans discipline, chaque clic recalcule tout et l'outil devient inutilisable au-delà de 100 000 lignes.",
                "Streamlit re-runs the entire script on every interaction. Without discipline, each click recomputes everything and the tool becomes unusable beyond 100,000 rows."),
      driver: T("Quatre décisions : l'aperçu n'envoie que 200 lignes au navigateur, les statistiques descriptives ne se calculent que sur clic explicite, la conversion automatique teste d'abord un échantillon de 2 000 valeurs, et DuckDB lit le DataFrame enregistré sans copie.",
                "Four decisions: the preview sends only 200 rows to the browser, descriptive statistics are computed only on an explicit click, automatic conversion first tests a 2,000-value sample, and DuckDB reads the registered DataFrame with no copy."),
      team: T("Développement", "Engineering")
    },
    {
      title: T("Un aiguillage qui explique le test écarté vaut mieux qu'un menu de tests",
               "A router that explains the rejected test beats a menu of tests"),
      data: T("recommend_tests() demande le nombre de groupes, si les mesures sont appariées, teste la normalité par groupe, puis ne propose que le test valide — t-test, t-test apparié, Mann-Whitney, Wilcoxon, ANOVA, Kruskal-Wallis ou Chi².",
              "recommend_tests() asks for the number of groups, whether measures are paired, tests normality per group, then offers only the valid test — t-test, paired t-test, Mann-Whitney, Wilcoxon, ANOVA, Kruskal-Wallis or Chi-squared."),
      soWhat: T("Le mauvais test appliqué avec assurance produit une conclusion fausse défendue avec conviction. Justifier l'écart d'un test est le seul moyen de faire progresser l'utilisateur au lieu de l'assister.",
                "The wrong test applied confidently produces a false conclusion defended with conviction. Justifying why a test is ruled out is the only way to teach the user rather than merely assist them."),
      driver: T("Le même principe s'applique aux limites : effectif faible, variances inégales, ou sur-échantillon qui rend tout significatif sont signalés avec le résultat, pas dans une note de bas de page.",
                "The same principle applies to caveats: small samples, unequal variances, or an over-large sample that makes everything significant are flagged with the result, not in a footnote."),
      team: T("Analystes · Qualité", "Analysts · Quality")
    }
  ],

  matrix: [
    { action: T("Standardiser le nettoyage sur un parcours unique et journalisé plutôt que des notebooks individuels",
                "Standardise cleaning on a single logged journey rather than individual notebooks"),
      priority: "Haute",
      impact: T("Traçabilité de bout en bout, reproductibilité entre analystes",
                "End-to-end traceability, reproducibility across analysts"),
      owner: T("Équipe Data", "Data team"),
      kpi: T("Part des jeux nettoyés via l'outil", "Share of datasets cleaned through the tool") },
    { action: T("Exposer le mode SQL en lecture seule pour les transformations complexes, garder les écritures dans le workflow",
                "Expose read-only SQL mode for complex transformations, keep writes inside the workflow"),
      priority: "Haute",
      impact: T("Puissance de DuckDB sans casser l'historique annulable",
                "DuckDB's power without breaking the undoable history"),
      owner: "Data",
      kpi: T("Nombre d'actions annulées / total", "Undone actions / total") },
    { action: T("Généraliser l'aiguillage statistique guidé aux analyses ponctuelles des équipes métier",
                "Extend the guided statistical router to business teams' one-off analyses"),
      priority: "Moyenne",
      impact: T("Réduit les conclusions tirées du mauvais test", "Reduces conclusions drawn from the wrong test"),
      owner: T("Data · Métier", "Data · Business"),
      kpi: T("Tests invalides détectés en revue", "Invalid tests caught in review") },
    { action: T("Exporter le journal de session comme script Python rejouable",
                "Export the session log as a replayable Python script"),
      priority: "Moyenne",
      impact: T("Passe d'un nettoyage interactif à un pipeline versionnable",
                "Moves from interactive cleaning to a versionable pipeline"),
      owner: "Data Engineering",
      kpi: T("Nettoyages industrialisés", "Industrialised cleaning runs") },
    { action: T("Étendre les mesures de performance au-delà de 500 000 lignes et basculer sur un moteur out-of-core si nécessaire",
                "Extend performance measurement beyond 500,000 rows and switch to an out-of-core engine if needed"),
      priority: "Basse",
      impact: T("Prépare les jeux de plusieurs millions de lignes", "Prepares for multi-million-row datasets"),
      owner: T("Développement", "Engineering"),
      kpi: T("Temps par opération à volume", "Time per operation at volume") }
  ],

  appendix: {
    code: [
      {
        label: T("Mode SQL DuckDB", "DuckDB SQL mode"),
        lang: "sql",
        body: T(
`-- Le DataFrame courant est exposé à DuckDB comme table df (alias data) :
-- lecture directe de la mémoire pandas, SANS COPIE.

SELECT "Pays",
       COUNT(*)                     AS nb,
       ROUND(AVG("Quantité"),   2)  AS qte_moy,
       ROUND(SUM("Montant Total"),2) AS ca
FROM df
GROUP BY 1
ORDER BY nb DESC;

-- « Exécuter »              -> aperçu (5 000 lignes max)
-- « Appliquer au jeu »      -> remplace le DataFrame courant par le
--                             résultat complet, en gardant l'action
--                             ANNULABLE.
--
-- Seules les requêtes SELECT / WITH sont acceptées : les écritures
-- passent par les boutons du workflow, qui alimentent l'historique.`,
`-- The current DataFrame is exposed to DuckDB as table df (alias data):
-- read directly from pandas memory, WITH NO COPY.

SELECT "Country",
       COUNT(*)                    AS n,
       ROUND(AVG("Quantity"),   2) AS avg_qty,
       ROUND(SUM("Total Amount"),2) AS revenue
FROM df
GROUP BY 1
ORDER BY n DESC;

-- "Run"                -> preview (5,000 rows max)
-- "Apply to dataset"   -> replaces the current DataFrame with the full
--                         result, keeping the action UNDOABLE.
--
-- Only SELECT / WITH queries are accepted: writes go through the
-- workflow buttons, which feed the history.`)
      },
      {
        label: T("Aiguillage statistique", "Statistical routing"),
        lang: "python",
        body: T(
`# utils/stats_hypothesis.py
def recommend_tests(groups, paired: bool, normal_by_group: dict) -> dict:
    """Renvoie le test RETENU et celui qui est ÉCARTÉ, chacun justifié.

    L'utilisateur doit comprendre la décision au lieu de la subir : un
    mauvais test appliqué avec assurance produit une conclusion fausse
    défendue avec conviction.
    """
    if len(groups) == 2 and paired:
        if all(normal_by_group.values()):
            return {"retenu":  ("t_apparie", "Deux mesures appariées, "
                                "normalité acceptée sur les deux groupes."),
                    "ecarte": ("wilcoxon", "Non nécessaire : l'hypothèse de "
                               "normalité n'est pas rejetée.")}
        return {"retenu":  ("wilcoxon", "Deux mesures appariées, normalité "
                            "rejetée sur au moins un groupe."),
                "ecarte": ("t_apparie", "Écarté : le t-test apparié suppose "
                           "des différences normalement distribuées.")}
    ...

# Le choix du test de normalité lui-même est déduit de la taille
# d'échantillon (Shapiro-Wilk, D'Agostino-Pearson, Kolmogorov-Smirnov)
# ET EXPLIQUÉ À L'ÉCRAN.`,
`# utils/stats_hypothesis.py
def recommend_tests(groups, paired: bool, normal_by_group: dict) -> dict:
    """Return the CHOSEN test and the one RULED OUT, each justified.

    The user has to understand the decision rather than endure it: the
    wrong test applied confidently produces a false conclusion defended
    with conviction.
    """
    if len(groups) == 2 and paired:
        if all(normal_by_group.values()):
            return {"chosen":   ("paired_t", "Two paired measurements, "
                                 "normality accepted on both groups."),
                    "ruled_out": ("wilcoxon", "Not needed: the normality "
                                  "hypothesis is not rejected.")}
        return {"chosen":   ("wilcoxon", "Two paired measurements, normality "
                             "rejected on at least one group."),
                "ruled_out": ("paired_t", "Ruled out: the paired t-test "
                              "assumes normally distributed differences.")}
    ...

# The choice of normality test itself is derived from the sample size
# (Shapiro-Wilk, D'Agostino-Pearson, Kolmogorov-Smirnov)
# AND EXPLAINED ON SCREEN.`)
      },
      {
        label: T("Performance", "Performance"),
        lang: "python",
        body: T(
`# Streamlit réexécute le script ENTIER à chaque interaction.
# Quatre décisions rendent l'outil tenable sur 520 833 lignes :

# 1. L'aperçu n'envoie que 200 lignes au navigateur, et le surlignage
#    (Styler pandas, coûteux) n'est appliqué qu'en dessous de 200 lignes.
preview = df.head(PREVIEW_ROWS)

# 2. Les statistiques descriptives ne sont calculées que sur clic
#    explicite : Streamlit exécute le contenu de TOUS les onglets à
#    chaque interaction.
if st.button("Calculer les statistiques"):
    ...

# 3. La conversion automatique teste d'abord un échantillon de 2 000
#    valeurs avant de convertir la colonne entière ; le parsing de dates
#    au format mélangé (valeur par valeur) ne s'applique qu'aux lignes
#    réellement en échec.
sample = series.dropna().sample(min(2000, series.notna().sum()))

# 4. L'annulation conserve au plus 8 snapshots — chacun est une copie du
#    DataFrame, ce qui BORNE la mémoire consommée. Coût : 0,06 s.`,
`# Streamlit re-runs the ENTIRE script on every interaction.
# Four decisions make the tool viable on 520,833 rows:

# 1. The preview sends only 200 rows to the browser, and highlighting
#    (pandas Styler, expensive) applies only below 200 rows.
preview = df.head(PREVIEW_ROWS)

# 2. Descriptive statistics are computed only on an explicit click:
#    Streamlit executes the contents of EVERY tab on each interaction.
if st.button("Compute statistics"):
    ...

# 3. Automatic conversion first tests a 2,000-value sample before
#    converting the whole column; mixed-format date parsing (value by
#    value) applies only to rows that actually failed.
sample = series.dropna().sample(min(2000, series.notna().sum()))

# 4. Undo keeps at most 8 snapshots — each a copy of the DataFrame, which
#    BOUNDS memory use. Cost: 0.06 s.`)
      },
      {
        label: T("Architecture", "Architecture"),
        lang: "text",
        body: T(
`app.py                        layout, stepper, orchestration des étapes
components/stepper.py         rendu HTML du stepper
components/ui.py              cards, bandeaux, tableaux partagés
components/stats_step.py      étape 8 : sélecteur guidé et rendu
utils/data_io.py              import / export multi-format + erreurs lisibles
utils/cleaning.py             opérations de nettoyage (fonctions PURES)
utils/sql_engine.py           exécution DuckDB, garde-fous lecture seule
utils/stats_common.py         résultat type (chiffres + interprétation + figure)
utils/stats_descriptive.py    descriptif, distribution, normalité auto
utils/stats_hypothesis.py     aiguillage vers le test valide + 7 tests
utils/stats_correlation.py    Pearson / Spearman, matrice, régression OLS
utils/stats_distribution.py   ajustement de lois, KS / Anderson, classement AIC
utils/reliability_analysis.py Kaplan-Meier, Weibull censuré, B10/B50/B90, MTBF
static/styles.css             thème custom (tokens réécrits en CSS)

Règle structurante : utils/ et components/ ne touchent JAMAIS à
st.session_state. L'état — DataFrame courant, pile d'annulation, journal,
étape active — est géré uniquement par app.py. C'est ce qui rend les
fonctions de nettoyage testables hors Streamlit.`,
`app.py                        layout, stepper, step orchestration
components/stepper.py         stepper HTML rendering
components/ui.py              shared cards, banners, tables
components/stats_step.py      step 8: guided selector and rendering
utils/data_io.py              multi-format import / export + readable errors
utils/cleaning.py             cleaning operations (PURE functions)
utils/sql_engine.py           DuckDB execution, read-only guard rails
utils/stats_common.py         result type (figures + interpretation + chart)
utils/stats_descriptive.py    descriptives, distribution, auto normality
utils/stats_hypothesis.py     routing to the valid test + 7 tests
utils/stats_correlation.py    Pearson / Spearman, matrix, OLS regression
utils/stats_distribution.py   distribution fitting, KS / Anderson, AIC ranking
utils/reliability_analysis.py Kaplan-Meier, censored Weibull, B10/B50/B90, MTBF
static/styles.css             custom theme (tokens rewritten in CSS)

Structuring rule: utils/ and components/ NEVER touch st.session_state.
State — current DataFrame, undo stack, log, active step — is managed by
app.py alone. That is what makes the cleaning functions testable outside
Streamlit.`)
      }
    ],
    difficulties: [
      { p: T("Streamlit réexécute tout le script à chaque interaction : l'outil devenait inutilisable au-delà de 100 000 lignes.",
             "Streamlit re-runs the whole script on every interaction: the tool became unusable beyond 100,000 rows."),
        s: T("Aperçu limité à 200 lignes, statistiques calculées sur clic explicite, métriques recalculées à chaque action et non à chaque rerun.",
             "Preview capped at 200 rows, statistics computed on an explicit click, metrics recomputed per action rather than per rerun.") },
      { p: T("La conversion automatique de type parcourait toutes les valeurs de chaque colonne.",
             "Automatic type conversion walked every value in every column."),
        s: T("Test préalable sur un échantillon de 2 000 valeurs ; le parsing de dates valeur par valeur n'est appliqué qu'aux lignes réellement en échec.",
             "A prior test on a 2,000-value sample; value-by-value date parsing is applied only to rows that actually failed.") },
      { p: T("Une pile d'annulation non bornée saturait la mémoire, chaque snapshot étant une copie du DataFrame.",
             "An unbounded undo stack saturated memory, each snapshot being a copy of the DataFrame."),
        s: T("Borne à 8 snapshots, ce qui rend la consommation prévisible sur un poste de travail.",
             "Bounded at 8 snapshots, which makes consumption predictable on a workstation.") },
      { p: T("Le surlignage des doublons (Styler pandas) faisait s'effondrer le rendu.",
             "Duplicate highlighting (pandas Styler) collapsed the rendering."),
        s: T("Surlignage conditionné à moins de 200 lignes affichées.",
             "Highlighting conditioned on fewer than 200 rows displayed.") },
      { p: T("Exposer DuckDB au public ouvrait la porte à des écritures non journalisées, donc non annulables.",
             "Exposing DuckDB openly allowed unlogged, therefore un-undoable, writes."),
        s: T("Garde-fou lecture seule : seules les requêtes SELECT / WITH passent, les écritures restent dans les boutons du workflow.",
             "A read-only guard rail: only SELECT / WITH queries pass, writes stay inside the workflow buttons.") },
      { p: T("Un menu de tests statistiques laisse l'utilisateur choisir le mauvais test avec assurance.",
             "A menu of statistical tests lets the user pick the wrong one with confidence."),
        s: T("Aiguillage par besoin métier qui renvoie le test retenu ET le test écarté, chacun avec sa justification.",
             "Routing by business need that returns the chosen test AND the ruled-out test, each with its justification.") }
    ],
    limits: [
      T("Application locale mono-utilisateur : pas de collaboration, pas de reprise de session sur une autre machine.",
        "A local single-user application: no collaboration, no session resume on another machine."),
      T("Le journal de session n'est pas encore exportable en script Python rejouable — le nettoyage reste interactif.",
        "The session log is not yet exportable as a replayable Python script — cleaning stays interactive."),
      T("Les mesures de performance s'arrêtent à ~520 000 lignes ; au-delà, un moteur out-of-core serait nécessaire.",
        "Performance measurement stops at ~520,000 rows; beyond that an out-of-core engine would be needed."),
      T("L'imputation reste simple (moyenne / médiane / mode / valeur fixe / propagation) : aucune imputation multivariée.",
        "Imputation stays simple (mean / median / mode / fixed value / forward fill): no multivariate imputation."),
      T("L'analyse de fiabilité suppose une censure à droite ; les censures à gauche ou par intervalle ne sont pas traitées.",
        "Reliability analysis assumes right censoring; left or interval censoring is not handled.")
    ]
  },

  run: "streamlit run app.py   →   http://localhost:8501"
}

];
