# Portfolio data + panel admin

Portfolio de projets data (analyse, ingénierie, visualisation) avec un panel
d'administration complet. Stack unique Next.js — pas de backend séparé.

- **Framework** : Next.js 14 (App Router), TypeScript strict
- **UI** : Tailwind CSS + composants shadcn/ui restylés (monospace / terminal, thème sombre par défaut)
- **Base de données** : PostgreSQL via Prisma
- **Auth admin** : NextAuth.js (credentials, compte unique, aucune inscription publique)
- **Uploads** : UploadThing (images de projet + fichiers joints)
- **Mutations** : Server Actions validées par Zod

---

## 1. Prérequis

- Node.js 18.18+ (testé sur Node 22)
- pnpm 9 (`corepack enable pnpm`)
- Une base PostgreSQL — [Neon](https://neon.tech) en gratuit fait très bien l'affaire
- Un compte [UploadThing](https://uploadthing.com) (gratuit) pour les uploads

## 2. Installation locale

```bash
pnpm install
```

Copie le fichier d'exemple d'environnement :

```bash
cp .env.example .env
```

Puis renseigne les six variables :

| Variable | À quoi ça sert |
| --- | --- |
| `DATABASE_URL` | Chaîne de connexion PostgreSQL (Neon : ajoute `?sslmode=require`) |
| `NEXTAUTH_SECRET` | Secret de signature des sessions — `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `http://localhost:3000` en local, l'URL publique en production |
| `UPLOADTHING_TOKEN` | Jeton UploadThing (dashboard → API Keys) |
| `ADMIN_EMAIL` | Identifiant du compte admin créé par le seed |
| `ADMIN_PASSWORD` | Mot de passe de ce compte (haché en base par le seed) |

## 3. Base de données

```bash
pnpm db:push
```

```bash
pnpm db:seed
```

Le seed crée le compte admin (`ADMIN_EMAIL` / `ADMIN_PASSWORD`, mot de passe
haché avec bcrypt), quatre catégories et deux projets de démonstration. Il est
rejouable : relancer le seed met à jour le mot de passe admin sans dupliquer les
données.

## 4. Lancer le projet

```bash
pnpm dev
```

- Site public : <http://localhost:3000>
- Connexion admin : <http://localhost:3000/admin/login>

## 5. Scripts

| Commande | Effet |
| --- | --- |
| `pnpm dev` | Serveur de développement |
| `pnpm build` | `prisma generate` puis build de production |
| `pnpm start` | Serveur de production |
| `pnpm lint` | ESLint (config Next) |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm db:push` | Applique le schéma Prisma à la base |
| `pnpm db:seed` | Compte admin + catégories + projets de démo |
| `pnpm db:studio` | Prisma Studio (explorateur de base) |

## 6. Structure

```
app/
  (public)/          site public (accueil, projet, à propos)
  admin/
    login/           page de connexion (hors protection)
    (protected)/     dashboard, projets, catégories, commentaires
  actions/           Server Actions (projets, catégories, commentaires)
  api/
    auth/[...nextauth]/  handler NextAuth (imposé par la lib)
    uploadthing/         routes d'upload
components/
  ui/                primitives shadcn restylées
  admin/             formulaires et outils du panel
  project-card.tsx, project-carousel.tsx, comment-section.tsx, sparkline.tsx…
lib/
  prisma.ts          client Prisma singleton
  auth.ts            options NextAuth + garde-fou des Server Actions
  validations.ts     schémas Zod partagés
  metrics.ts, form.ts, utils.ts, uploadthing.ts
prisma/
  schema.prisma      modèle de données
  seed.ts            script de seed
middleware.ts        protection de /admin/* sauf /admin/login
```

## 7. Fonctionnement du panel admin

- **Dashboard** — tuiles de synthèse (projets, mis en avant, commentaires en
  attente, catégories) et table des projets avec édition, mise en avant et
  suppression.
- **Formulaire projet** — éditeur markdown avec aperçu, tags de stack,
  métriques chiffrées (affichées en tête de la page projet), upload multiple
  d'images réordonnables en glisser-déposer, upload de fichiers joints.
- **Catégories** — création, renommage, suppression (refusée si des projets y
  sont rattachés).
- **Commentaires** — file de modération : rien n'est publié sans approbation.
  Le formulaire public embarque un honeypot anti-spam.

Le slug d'un projet est généré depuis le titre et rendu unique
automatiquement (`mon-projet`, `mon-projet-2`, …). Les images et fichiers sont
remplacés en bloc à chaque enregistrement : l'ordre affiché dans le formulaire
fait foi.

## 8. Déploiement (Vercel + Neon)

1. **Base** — crée un projet sur [Neon](https://neon.tech) et copie la chaîne
   de connexion *pooled* (elle contient `-pooler`), avec `?sslmode=require`.
2. **Dépôt** — pousse le code sur GitHub, puis importe le dépôt sur
   [Vercel](https://vercel.com/new).
3. **Variables d'environnement** — dans Vercel → Settings → Environment
   Variables, renseigne les six variables du tableau ci-dessus.
   `NEXTAUTH_URL` doit valoir l'URL de production (`https://<projet>.vercel.app`).
4. **Build** — la commande par défaut suffit : `pnpm build` exécute
   `prisma generate` avant le build Next.
5. **Schéma et seed** — depuis ta machine, avec le `DATABASE_URL` de production
   dans un `.env` temporaire :

   ```bash
   pnpm db:push
   ```

   ```bash
   pnpm db:seed
   ```

6. **UploadThing** — dans le dashboard UploadThing, ajoute le domaine de
   production aux origines autorisées, puis reporte `UPLOADTHING_TOKEN` dans
   Vercel.

Après le premier déploiement, connecte-toi sur `/admin/login` et change les
identifiants du seed pour un mot de passe personnel (relance `pnpm db:seed`
avec un nouvel `ADMIN_PASSWORD`).

## 9. Choix techniques notables

- **Server Actions partout** — les seules routes API sont celles imposées par
  NextAuth et UploadThing. Toute écriture passe par une action serveur qui
  valide son entrée avec Zod et vérifie la session admin.
- **Pages dynamiques** — les pages qui lisent la base sont en
  `force-dynamic` : le build ne nécessite donc pas de base accessible.
- **Composants serveur par défaut** — `"use client"` est réservé aux
  formulaires, au carousel, au glisser-déposer et au sélecteur de thème.
- **Sparklines décoratives** — générées en SVG à partir d'un hash du slug,
  sans librairie de graphiques : le rendu est stable entre serveur et client.
