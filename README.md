# Portfolio — Imad EL KHELYFY

Portfolio personnel en **scrollytelling** : une page unique où le schéma de droite
suit le projet que l'on est en train de lire.

Site **statique**, sans framework et sans build : HTML + Tailwind (CDN) +
JavaScript natif. Pour modifier quoi que ce soit, on édite le code directement.

---

## Lancer le site

Il suffit d'ouvrir `index.html` dans un navigateur — double-clic, rien à installer.

Pour travailler confortablement (rechargement propre, chemins corrects), un petit
serveur local suffit :

```bash
python -m http.server 3000
```

Puis <http://localhost:3000>.

---

## Structure

```
index.html              toute la page : contenu et mise en page
assets/
  css/style.css         motifs de fond, animations, composants (.card, .tag, .step…)
  js/main.js            progression, apparitions, compteurs, scrollytelling
  img/logo.svg          la marque, utilisée aussi comme favicon
```

Trois fichiers, c'est tout. Pas de `node_modules`, pas de compilation.

---

## Modifier le contenu

Tout le texte est dans `index.html`, dans l'ordre des sections :

| Section | Ce qu'on y trouve |
| --- | --- |
| `#hero` | nom, accroche, disponibilité |
| `#reperes` | les 4 chiffres clés (voir ci-dessous) |
| `#parcours` | expériences et formation |
| `#projets` | les 5 projets — c'est la partie scrollytelling |
| `#stack` | technologies, certifications, langues |
| `#contact` | mail, téléphone, LinkedIn, GitHub |

### Ajouter un chiffre clé

Un bloc `.stat` dans `#reperes`. L'attribut `data-count` est la valeur ; le
compteur s'anime tout seul quand le bloc entre à l'écran.

```html
<div class="stat reveal">
  <span class="stat-value" data-count="12" data-suffix=" mois">0</span>
  <span class="stat-label">Durée du projet</span>
  <span class="stat-note">Contexte en une ligne</span>
</div>
```

`data-prefix` existe aussi (utilisé pour les `−35 %`).

### Ajouter un projet au scrollytelling

Deux morceaux à ajouter, **reliés par le même identifiant** :

1. Le texte, dans la colonne des étapes :

```html
<article class="step" data-step="mon-projet">
  <p class="step-index">projet 06</p>
  <h3 class="step-title">Nom du projet</h3>
  <p class="step-body">Le problème, puis ce que ça a changé.</p>
  <div class="step-tags"><span class="tag">Python</span></div>
</article>
```

2. Le schéma, dans le panneau collant :

```html
<figure class="visual" data-visual="mon-projet">
  <svg viewBox="0 0 400 300" class="h-full w-full">
    <!-- dessin libre : formes, texte, animation -->
  </svg>
</figure>
```

`data-step` et `data-visual` doivent être **identiques** — c'est ce qui fait le
lien. Le JavaScript s'occupe du reste, il n'y a rien d'autre à déclarer.

### Ajouter une expérience

Copier un `<li class="timeline-item reveal">` dans `#parcours`. Le trait vertical
et la pastille sont automatiques ; `timeline-pulse` ne sert qu'au poste en cours.

### Faire apparaître un bloc au défilement

Ajouter la classe `reveal` sur n'importe quel élément. Rien d'autre à faire.

---

## Changer le logo

Remplacer `assets/img/logo.svg` par le fichier d'origine, en gardant le même nom.
Il sert à la fois de logo dans l'en-tête et de favicon.

> Le SVG actuel est une reconstruction approximative de la marque, faite à partir
> d'une image. À remplacer par l'original dès que possible.

---

## Changer les couleurs

La palette est déclarée à deux endroits, à garder synchronisés :

- `index.html`, dans le bloc `tailwind.config` — les couleurs `brand`, `ink`, `line`
- `assets/css/style.css`, en commentaire en haut du fichier, puis dans les règles

Le violet vient du logo : `#A99BFF` → `#5B3DF5`.

---

## Mettre en ligne

Site statique : n'importe quel hébergeur gratuit convient, sans configuration.

- **GitHub Pages** — Settings → Pages → Branch `main`, dossier `/ (root)`
- **Netlify** — glisser-déposer le dossier, ou connecter le dépôt (aucune commande
  de build, dossier à publier : la racine)
- **Vercel** — importer le dépôt, framework « Other »

---

## Notes techniques

- **Tailwind via CDN** : pratique (zéro build), mais le navigateur télécharge et
  compile le CSS à chaque visite. Si le site devient une vitrine sérieuse,
  passer à Tailwind CLI pour générer un fichier CSS figé.
- **Accessibilité** : `prefers-reduced-motion` est respecté — animations,
  compteurs et transitions sont désactivés pour qui l'a demandé dans son système.
- **Aucun traqueur, aucun cookie, aucune requête vers un serveur** en dehors des
  polices Google et du CDN Tailwind.
