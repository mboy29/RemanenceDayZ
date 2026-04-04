# Rémanence

Site web du serveur **Rémanence** : présentation, règlement, factions et blog de développement. Application **React** servie par **Vite**, avec **TypeScript**, **Tailwind CSS v4** et **React Router**.

## Prérequis

- [Node.js](https://nodejs.org/) **20 LTS** ou plus récent (recommandé)
- Un gestionnaire de paquets : **npm** (inclus avec Node), ou **pnpm** / **yarn** si vous les utilisez déjà

## Installation

À la racine du dossier `remanence` :

```bash
npm install
```

Avec pnpm :

```bash
pnpm install
```

## Commandes

| Commande        | Description |
|-----------------|-------------|
| `npm run dev`   | Lance le serveur de développement Vite (hot reload). URL affichée dans le terminal (souvent `http://localhost:5173`). |
| `npm run build` | Vérifie le typage TypeScript (`tsc -b`) puis génère le build de production dans `dist/`. |
| `npm run preview` | Sert le contenu de `dist/` en local pour tester le build avant déploiement. |
| `npm run lint`  | Exécute ESLint sur le projet. |

Exemple de flux habituel :

```bash
cd remanence
npm install
npm run dev
```

## Structure du dépôt (aperçu)

- `src/main.tsx` — point d’entrée React
- `src/app/App.tsx` — fournisseur du routeur
- `src/app/routes/` — configuration des routes (`routes.config.ts`, `router.tsx`)
- `src/app/pages/` — pages (`HomePage`, `RulesPage`, `FactionsPage`, `DevBlog`, …)
- `src/app/components/` — composants UI et blocs par page (règles, factions, navbar, etc.)
- `src/lib/` — utilitaires et petites briques partagées (ex. nom du serveur)
- `public/` — assets statiques servis tels quels

Routes principales déclarées dans `routes.config.ts` :

- `/` — accueil  
- `/regles` — règlement  
- `/factions` — factions  
- `/dev-blog` — blog de développement  

## Déploiement

Après `npm run build`, déployez le dossier **`dist/`** sur l’hébergement statique de votre choix (Netlify, Vercel, Nginx, etc.). Pour les apps en **SPA** avec React Router, configurez une **fallback** vers `index.html` pour les chemins profonds (ex. `/regles`).

## Licence

Projet privé (`"private": true` dans `package.json`). Adapter selon votre politique.
