const SERVER_NAME = import.meta.env.VITE_SERVER_NAME;
const SERVER_IP = import.meta.env.VITE_SERVER_IP;
const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;
const DISCORD_INVITE_URL = import.meta.env.DISCORD_INVITE_URL;
const SERVER_STATE = import.meta.env.SERVER_STATE;

function isOnline(): boolean {
  return true;
}

function getActivePlayers(): number {
  return 48;
}

function getServerAddress(): string {
  return `${SERVER_IP}:${SERVER_PORT}`;
}

function getServerName(): string {
  return SERVER_NAME;
}

function getDiscordInviteUrl(): string {
  return DISCORD_INVITE_URL;
}

function getServerState(): string {
  console.log("->", SERVER_STATE);
  return SERVER_STATE;
}

export { isOnline, getActivePlayers, getServerAddress, getServerName, getDiscordInviteUrl, getServerState };