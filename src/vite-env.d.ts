/**
 * @file vite-env.d.ts
 * @description Déclarations TypeScript pour `import.meta.env` (variables Vite préfixées `VITE_`).
 */

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_ENABLE_ANALYTICS: string
  readonly VITE_SERVER_NAME: string
  readonly VITE_SERVER_IP: string
  readonly VITE_SERVER_PORT: string
  /** Lien d’invitation permanent du serveur Discord (footer, CTA). */
  readonly VITE_DISCORD_INVITE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
