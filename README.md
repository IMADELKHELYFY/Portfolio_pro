# Portfolio — Imad EL KHELYFY

Site **statique**, sans framework et sans build : HTML + Tailwind (CDN) +
JavaScript natif. Bilingue **FR / EN**, thème **clair / sombre**.

Le parti pris visuel est celui d'une **feuille de cahier** : fond crème réglé,
filet de marge rouge brique, typographie serif, libellés à la machine à écrire.
Pas de dégradé, pas de lueur, pas d'ombre portée — la hiérarchie se fait par la
typographie et le blanc.

---

## Lancer le site

Double-clic sur `index.html`. C'est tout — aucun serveur n'est nécessaire, les
scripts sont des scripts classiques et non des modules.

Pour travailler confortablement (rechargement propre) :

```bash
python -m http.server 3000 --directory .
```

---

## Structure

```
index.html                  la page : contenu et mise en page
assets/
  css/tokens.css            LES COULEURS — deux thèmes, la feuille réglée
  css/style.css             composants de la page
  css/cases.css             projets data du scrollytelling + lecteur d'étude
  js/i18n.js                dictionnaire FR / EN + préférences (langue, thème)
  js/cases.js               LE CONTENU des 7 études de cas, bilingue
  js/case-view.js           rendu des étapes, du lecteur, de la lightbox
  js/main.js                progression, apparitions, scrollytelling
  img/logo.svg              la marque, utilisée aussi comme favicon
  img/shots/<projet>/       captures réelles des applications (WebP)
           thumbs/          vignettes 760 px des mêmes captures
```

> **Ordre des scripts, imposé.** `i18n.js` pose `window.PF` (langue, thème,
> traductions) ; `cases.js` fournit le contenu ; `case-view.js` a besoin des
> deux ; `main.js` passe en dernier car il observe les `.reveal` déjà présentes,
> étapes de projets comprises. Inverser cet ordre casse le rendu.

---

## Les sections

| Section | Ce qu'on y trouve | Où le modifier |
| --- | --- | --- |
| `#hero` | nom, accroche, boutons | `index.html` + `i18n.js` |
| `#parcours` | expériences et formation | `index.html` + `i18n.js` |
| `#projets` | **9 projets en scrollytelling** — les 7 projets data (générés) puis les 2 projets IA (en dur) | `cases.js` / `index.html` |
| `#stack` | fiche technique, certifications, langues | `index.html` + `i18n.js` |
| `#contact` | mail, téléphone, LinkedIn, GitHub | `index.html` + `i18n.js` |

---

## Le scrollytelling des projets

Une seule colonne de lecture, un panneau visuel collant à droite. Chaque
`.step[data-step="x"]` active le `.visual[data-visual="x"]` de même nom ;
`main.js` retient l'étape dont le centre est le plus proche du centre de
l'écran.

Deux familles de projets cohabitent dans le même flux :

* **les 7 projets data** — injectés par `case-view.js` dans
  `#case-steps` / `#case-visuals`. Leur visuel est une capture réelle de
  l'application et un bouton ouvre l'**étude complète** ;
* **les 2 projets IA** — écrits en dur dans `index.html`, avec un schéma SVG
  et pas d'étude détaillée.

Les conteneurs générés portent `style="display:contents"` : les figures
deviennent enfants directs du panneau collant, sinon leur `position: absolute`
se calerait sur le wrapper au lieu du cadre.

### Ajouter un projet IA (sans étude détaillée)

Copier un `<article class="step">` et sa `<figure class="visual">` dans
`index.html`, en leur donnant le **même** `data-step` / `data-visual`.

### Ajouter un projet data (avec étude détaillée)

Tout se passe dans **`assets/js/cases.js`** : ajouter un objet au tableau
`window.CASES`. Aucune ligne de HTML à écrire.

Chaque étude se lit selon **la même structure en dix temps** — c'est ce qui
rend deux projets comparables :

| # | Section | Clés utilisées |
| --- | --- | --- |
| 1 | Problème business | `problem` |
| 2 | Contexte | `context` (`secteur`, `modele`, `role`, `perimetre`, `calcul`) |
| 3 | Questions à résoudre | `questions[3]` |
| 4 | Dataset | `dataset` (`source`, `volume`, `fields[]`, `note`) |
| 5 | Méthodologie | `framework` (3×3), `method[]`, puis `appendix` replié |
| 6 | Résultats | `kpis[]` puis `figures[]` |
| 7 | Insights business | `insights[]` |
| 8 | Stack technique | `tags[]` et `context.stack` |
| 9 | Recommandations | `matrix[]` |
| 10 | GitHub / démonstration | `links` et `run` |

Le reste de l'objet :

| Clé | Rôle |
| --- | --- |
| `slug` | identifiant de l'URL : `#/etude/<slug>` |
| `title`, `family`, `familyKey` | titre, famille affichée, clé stable |
| `accent` | couleur du projet (`#RRGGBB`), injectée dans la variable CSS `--case` |
| `cover` | vignette du panneau collant |
| `headline` | **titre narratif** : il donne la conclusion, pas le sujet |
| `pitch` | deux ou trois phrases de contexte |

Détail des sous-objets :

* `kpis[]` — `{ value, label, note, suffix, decimals }`, animés en compteurs ;
* `figures[]` — `{ img, thumb, title, read }`, titre **narratif** puis note de lecture ;
* `insights[]` — `{ title, data, soWhat, driver, team }` ;
* `matrix[]` — `{ action, priority, impact, owner, kpi }` ;
* `appendix` — `code[]` (onglets), `difficulties[]`, `limits[]` ;
* `links` — `{ repo, demo }`. **Les deux sont vides par défaut** : la section 10
  affiche alors un encadré expliquant que le dépôt n'est pas encore publié, et
  la commande de lancement local. Renseigner une URL fait apparaître le bouton
  correspondant à la place.

`priority` reste une **clé stable** — `Haute`, `Moyenne` ou `Basse` : la classe
CSS et la traduction en dérivent, jamais l'inverse.

---

## Bilinguisme

Deux mécaniques, toutes deux dans `assets/js/i18n.js` :

* **la page** — les éléments portent `data-i18n="clé"` (remplacé en `innerHTML`,
  donc le balisage riche est permis) ou `data-i18n-aria="clé"`. Le texte laissé
  dans le HTML sert de repli avant l'exécution du script : il doit dire la même
  chose que le dictionnaire ;
* **les études de cas** — dans `cases.js`, toute valeur traduisible passe par
  `T(fr, en)` et devient `{fr, en}`. Une valeur restée en chaîne simple (nom
  propre, technologie, commande) est servie telle quelle dans les deux langues.

Changer de langue émet `pf:lang` sur `document`. `case-view.js` l'écoute pour
redessiner les étapes et, si elle est ouverte, l'étude courante — **sans perdre
la position de lecture**.

Les nombres suivent la langue : `520 833` et `0,74` en français, `520,833` et
`0.74` en anglais.

---

## Thèmes clair / sombre

Toutes les couleurs vivent dans `assets/css/tokens.css`, en **triplets RGB sans
`rgb()`** :

```css
--c-bg: 243 238 228;
```

C'est ce format qui permet à Tailwind d'appliquer ses modificateurs d'opacité
(`border-line/70`, `bg-brand-500/10`) via son placeholder `<alpha-value>`, grâce
au mapping déclaré dans le `tailwind.config` de l'en-tête :

```js
line: 'rgb(var(--c-line) / <alpha-value>)',
```

Conséquence : **changer de thème ne réécrit aucune classe**, seulement des
variables.

Le thème est posé sur `<html data-theme="…">` par un petit script **inline**
dans l'en-tête, avant le premier rendu — un script externe arriverait trop tard
et la page clignoterait. Par défaut il suit `prefers-color-scheme`, puis retient
le choix dans `localStorage`.

Trois zones ne suivent volontairement **pas** le thème, parce qu'elles se posent
sur des captures toujours sombres : la lightbox (mode théâtre), le bouton
« agrandir » et les pastilles posées sur les vignettes.

### Changer la palette

Éditer les deux blocs de `tokens.css` (`:root` = clair, `html[data-theme="dark"]`).
La réglure de la feuille et le filet de marge sont pilotés par `--c-rule`,
`--c-margin` et `--rule-alpha`, appliqués sur `body` et `body::before`.

---

## Les captures d'écran

Prises automatiquement en pilotant chaque application avec Playwright, puis
converties en WebP : version pleine largeur 1600 px pour le lecteur, vignette
760 px pour le panneau collant. Les 36 captures pèsent 3,6 Mo au total, contre
12,4 Mo en PNG.

Convention : **thème sombre**, viewport 1680 × 1050, capture pleine page, un
fichier par onglet, préfixé de son rang (`01-`, `02-`…).

---

## Mettre en ligne

Site statique : n'importe quel hébergeur gratuit convient, sans configuration.

- **GitHub Pages** — Settings → Pages → Branch `main`, dossier `/ (root)`
- **Netlify** — glisser-déposer le dossier
- **Vercel** — importer le dépôt, framework « Other »

---

## Notes techniques

- **Tailwind via CDN** : zéro build, mais le navigateur compile le CSS à chaque
  visite. Pour une vitrine sérieuse, passer à Tailwind CLI.
- **Accessibilité** : `prefers-reduced-motion` est respecté — apparitions,
  compteurs et défilement fluide sont désactivés. Le lecteur se ferme à `Échap`,
  la lightbox se parcourt aux flèches ← →.
- **Routage** : ouvrir une étude écrit `#/etude/<slug>` dans l'URL. Le lien est
  partageable et le bouton « retour » du navigateur referme le lecteur.
- **Aucun traqueur, aucun cookie**, aucune requête serveur en dehors des polices
  Google et du CDN Tailwind.
