#!/bin/bash

set -euo pipefail

green="\033[0;32m"
red="\033[0;31m"
reset="\033[0m"

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

log() {
  echo -e "${green}[INFO]${reset} $1"
}

error() {
  echo -e "${red}[ERROR]${reset} $1" >&2
}

install_dependencies() {
  cd "$ROOT_DIR"

  if ! command -v pnpm >/dev/null 2>&1; then
    log "pnpm not found, installing globally..."
    npm i -g pnpm
  fi

  log "Installing project dependencies (pnpm install)..."
  pnpm install
}

build_and_run_docker() {
  cd "$ROOT_DIR"
  log "Starting docker services..."
  docker compose up -d --build
}

clean_docker() {
  cd "$ROOT_DIR"
  log "Stopping and removing docker services..."
  docker compose down -v --remove-orphans
}

nuke_docker() {
  cd "$ROOT_DIR"
  log "!!! FULL DOCKER CLEAN (ALL SYSTEM) !!!"
  docker system prune -af --volumes
}

migrate_database() {
  cd "$ROOT_DIR"

  if [ ! -d "apps/api" ]; then
    log "apps/api not found, skipping migrations (no API yet)."
    return 0
  fi

  cd "apps/api"

  if [ ! -f "ace" ] && [ ! -f "ace.js" ]; then
    log "No AdonisJS ace file found in apps/api, skipping migrations."
    return 0
  fi

  if ! node ace list | grep -q "migration:run"; then
    log "AdonisJS command 'migration:run' not available, skipping migrations."
    return 0
  fi

  log "Running migrations..."
  node ace migration:run

  log "Running seeds..."
  node ace db:seed || true
}


run_api() {
  cd "$ROOT_DIR/apps/api"
  log "Running Adonis API..."
  pnpm dev
}

run_project() {
  cd "$ROOT_DIR"
  log "Running monorepo (pnpm dev)..."
  pnpm dev
}

run_ios() {
  cd "$ROOT_DIR/apps/user"
  pnpm run build:dev
  pnpm run sync
  pnpm run open:ios
}

run_android() {
  cd "$ROOT_DIR/apps/user"
  pnpm run build:dev
  pnpm run sync
  pnpm run open:android
}

sync_ios() {
  cd "$ROOT_DIR/apps/user"
  pnpm run sync
  pnpm run open:ios
}

sync_android() {
  cd "$ROOT_DIR/apps/user"
  pnpm run sync
  pnpm run open:android
}

main() {
  case "${1:-}" in

    --clean)
      clean_docker
      ;;

    --nuke)
      nuke_docker
      ;;

    --migrate)
      migrate_database
      ;;

    --api)
      run_api
      ;;

    --ios)
      install_dependencies
      build_and_run_docker
      migrate_database
      run_api
      run_ios
      ;;

    --android)
      install_dependencies
      build_and_run_docker
      migrate_database
      run_api
      run_android
      ;;

    --ios-sync)
      sync_ios
      ;;

    --android-sync)
      sync_android
      ;;

    *)
      install_dependencies
      build_and_run_docker
      migrate_database
      run_project
      ;;
  esac
}

main "$@"
