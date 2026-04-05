/**
 * @file utils.ts
 * @description Utilitaire `cn` : fusion clsx + tailwind-merge pour les classes conditionnelles.
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * @param inputs - Valeurs passées à `clsx` (chaînes, objets, tableaux).
 * @returns {string} Chaîne de classes fusionnée sans conflits Tailwind.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
