# Remanecence Z Website

Un monorepo moderne et minimaliste basé sur :

-   **SvelteKit 5** (TypeScript, TailwindCSS)
-   **AdonisJS 6** (API REST)
-   **PostgreSQL** (via Docker Compose)
-   **PNPM Workspace**
-   Architecture claire, évolutive et multi-app (web, API, mobile)

Ce repo sert de fondation pour les projets Remanecence Z Website.

## Structure du projet

    /
    ├── apps/
    │   ├── api/              # Backend AdonisJS
    │   ├── app/              # Frontend SvelteKit (web)
    │   └── user/             # App mobile (Capacitor) — optionnel
    │
    ├── docker-compose.yml    # Base de données PostgreSQL
    ├── pnpm-workspace.yaml   # Définition du monorepo
    ├── package.json
    ├── setup.sh              # Script utilitaire (install, docker, migrations…)
    └── README.md

## Installation & Setup

### 1. Prérequis

-   **Node.js ≥ 18**
-   **pnpm** (`npm i -g pnpm`)
-   **Docker + Docker Compose**

### 2. Installer les dépendances

Exécuter le script principal :

[`./setup.sh`](#scripts-utiles-setupsh)

## Environnement & Variables

Les fichiers `.env` ne sont **jamais versionnés**.\
**Demander systématiquement les fichiers `.env` au développeur
référent** avant de lancer le projet.

### API (Backend AdonisJS)

Demander le fichier `.env` au développeur référent.

Créer puis placer le fichier ici :

    apps/api/.env

### Web (SvelteKit)

Demander le fichier `.env` au développeur référent.

Créer puis placer le fichier ici :

    apps/app/.env

### Docker (PostgreSQL)

Demander le fichier `.env` au développeur référent.

Créer puis placer le fichier ici à la racine :

    ./.env

## Scripts utiles (`setup.sh`)

| Commande             | Description                         |
|----------------------|-------------------------------------|
| `./setup.sh`         | Install + docker + migrations + dev |
| `./setup.sh --api`   | Lancer uniquement l'API             |
| `./setup.sh --migrate` | Migrations + seeds                |
| `./setup.sh --clean` | Stop & clean docker du projet       |
| `./setup.sh --nuke`  | ⚠️ Reset complet docker             |
| `./setup.sh --ios`   | Build + run app iOS                 |
| `./setup.sh --android` | Build + run app Android           |


## Licence

Projet privé extra amour --- Remanecence.
