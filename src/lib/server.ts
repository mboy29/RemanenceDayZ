/**
 * @file server.ts
 * @description Lecture des métadonnées serveur / Discord depuis les variables d’environnement Vite (`import.meta.env`).
 */

const SERVER_NAME = import.meta.env.VITE_SERVER_NAME;
const SERVER_IP = import.meta.env.VITE_SERVER_IP;
const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;
/** Exposé au client Vite : préfixe `VITE_` obligatoire. */
const DISCORD_INVITE_URL = import.meta.env.VITE_DISCORD_INVITE_URL;
const SERVER_STATE = import.meta.env.SERVER_STATE;

/**
 * @description Indique si le serveur est considéré comme en ligne (stub).
 * @returns {boolean} Toujours `true` pour l’instant.
 */
function isOnline(): boolean {
  return true;
}

/**
 * @description Nombre de joueurs actifs affiché (stub).
 * @returns {number} Valeur factice.
 */
function getActivePlayers(): number {
  return 48;
}

/**
 * @description Adresse IP:port exposée à l’UI.
 * @returns {string} Chaîne `${IP}:${PORT}` depuis l’env.
 */
function getServerAddress(): string {
  if (!SERVER_IP?.trim() || !SERVER_PORT?.trim()) return '';
  return `${SERVER_IP}:${SERVER_PORT}`;
}

/**
 * @description Nom public du serveur (navbar, routes).
 * @returns {string} `VITE_SERVER_NAME`.
 */
function getServerName(): string {
  return SERVER_NAME;
}

/**
 * @description Lien d’invitation Discord.
 * @returns {string} `VITE_DISCORD_INVITE_URL` (chaîne vide si non définie).
 */
function getDiscordInviteUrl(): string {
  return (DISCORD_INVITE_URL ?? '').trim();
}

/**
 * @description État du serveur brut depuis l’env (debug / futur bandeau).
 * @returns {string} `SERVER_STATE`.
 */
function getServerState(): string {
  console.log("->", SERVER_STATE);
  return SERVER_STATE;
}

export { isOnline, getActivePlayers, getServerAddress, getServerName, getDiscordInviteUrl, getServerState };
