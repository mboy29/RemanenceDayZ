/**
 * Modèle de données du dossier Lore (contenu éditorial + options de mise en page).
 *
 * ─── Sections (`sections[]`) ─────────────────────────────────────────────
 * Chaque entrée est un bloc typé : `text` | `bullets` | `definition`.
 * Les figures optionnelles sur texte/puces servent au layout « texte | image »
 * lorsque la section n’est pas dans un rail (ouverture incident / cluster).
 *
 * ─── Rails (colonnes) ────────────────────────────────────────────────────
 * `incidentOpening` : les N premières sections partagent la page avec une
 *   figure + note (voir `sectionCount`).
 * `analysisCluster` : un groupe de sections alignées avec leurs figures en
 *   colonne séparée (voir `startIndex` + `sectionCount`).
 */

/** Image affichée à côté d’un bloc texte/puces, ou dans la colonne figures d’un rail. */
export type LoreFigureSpec = {
  /** Côté de l’image en layout « deux colonnes » (texte + figure inline). */
  side: 'left' | 'right';
  src: string;
  alt: string;
  caption: string;
  aspectClass?: string;
  /** Par défaut : animation « fragment corrompu ». */
  corruptedLoop?: boolean;
};

export type LoreFieldNoteContent = {
  title: string;
  body: string;
};

/** Rail début de rapport : figure + note à droite, sections empilées à gauche. */
export type LoreIncidentOpening = {
  figure: LoreFigureSpec;
  fieldNote: LoreFieldNoteContent;
  /** Nombre de sections depuis `sections[0]` incluses dans la colonne texte (défaut 3). */
  sectionCount?: number;
};

/** Rail milieu de rapport : colonne figures | colonne textes (ex. hypothèses + conséquences). */
export type LoreAnalysisCluster = {
  /** Index dans `sections` de la première section du groupe. */
  startIndex: number;
  /** Taille du groupe (défaut 2). */
  sectionCount?: number;
};

export type LoreBulletSection = {
  type: 'bullets';
  title: string;
  items: string[];
  figure?: LoreFigureSpec;
};

export type LoreTextSection = {
  type: 'text';
  title: string;
  paragraphs: string[];
  figure?: LoreFigureSpec;
  /** Encart type dossier (bande gauche + fond). */
  textPresentation?: 'inset';
};

export type LoreDefinitionSection = {
  type: 'definition';
  title: string;
  term: string;
  definition: string;
  hypothesis?: string;
  figure?: LoreFigureSpec;
};

export type LoreSection = LoreTextSection | LoreBulletSection | LoreDefinitionSection;

export type LoreDocument = {
  institute: string;
  fileLabel: string;
  reference: string;
  accessLevel: string;
  reportTitle: string;
  incidentDate: string;
  location: string;
  status: string;
  author?: string;
  incidentOpening?: LoreIncidentOpening;
  analysisCluster?: LoreAnalysisCluster;
  sections: LoreSection[];
};
