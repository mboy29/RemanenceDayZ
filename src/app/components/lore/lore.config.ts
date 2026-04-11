/**
 * Contenu du dossier classifié (texte, sections, options de mise en page).
 * Les types sont dans `lore.types.ts` ; la logique de rendu dans `loreReportPlan.ts` et `LoreSectionBlock`.
 */

import type { LoreDocument } from './lore.types';

export type {
  LoreAnalysisCluster,
  LoreBulletSection,
  LoreDefinitionSection,
  LoreDocument,
  LoreFieldNoteContent,
  LoreFigureSpec,
  LoreIncidentOpening,
  LoreSection,
  LoreTextSection,
} from './lore.types';

/** @deprecated Utiliser `LoreFigureSpec` — alias conservé pour anciens imports. */
export type { LoreFigureSpec as Lorefigure } from './lore.types';

export const loreDocument: LoreDocument = {
  institute: 'INSTITUT DE RECHERCHE B32',
  fileLabel: 'DOSSIER CLASSIFIÉ',
  reference: 'IR-PSY/REM-17-10-2013',
  accessLevel: 'EXTRÊMEMENT RESTREINT',
  reportTitle: 'Rapport d’observation – Phénomène “Rémanence”',
  incidentDate: '17 octobre 2013',
  location: 'Zone de Prypiat ou Limansk (secteur nord de la Zone d’Exclusion)',
  status: 'En cours d’étude',
  author: '@Iota - Compte Premium',
  incidentOpening: {
    figure: {
      side: 'left',
      src: '/images/lore/figures/lore_fig01.jpeg',
      alt: 'Placeholder relevé terrain',
      caption: 'Fig. 01 — relevé visuel sectoriel',
      aspectClass: 'aspect-[3/4]',
    },
    fieldNote: {
      title: 'Note de terrain',
      body:
        'Les symptômes listés ci-dessus tendent à se propager sans signal physique mesurable : priorité aux protocoles de confinement psychique lors des expéditions.',
    },
    sectionCount: 3,
  },
  analysisCluster: {
    startIndex: 5,
    sectionCount: 2,
  },
  sections: [
    {
      type: 'text',
      title: 'Résumé de l’événement',
      paragraphs: [
        "Le 17 octobre 2013, un phénomène d’origine indéterminée s’est produit dans la région nord de la Zone.",
        "Contrairement aux émissions connues, aucun signal électromagnétique, thermique ou sismique significatif n’a été enregistré par les instruments déployés sur place.",
        "Les témoins décrivent unanimement un événement qualifié d’“explosion silencieuse”.",
        "L’impact semble avoir affecté directement les fonctions cognitives et mémorielles des individus exposés.",
      ],
    },
    {
      type: 'bullets',
      title: 'Caractéristiques relevées lors de l’incident',
      items: [
        'Absence de détonation audible.',
        'Absence d’onde de choc physique mesurable.',
        'Présence d’un effet psychique massif et instantané.',
      ],
    },
    {
      type: 'bullets',
      title: 'Symptômes observés',
      items: [
        'Perception de voix non identifiées.',
        'Intrusion de souvenirs étrangers.',
        'Impressions de déjà-vu extrêmes et répétitives.',
        'Hallucinations de personnes décédées.',
        'Observation de doubles, avec auto-perception décalée dans l’espace ou le temps.',
      ],
    },
    {
      type: 'text',
      title: 'Constat clinique',
      textPresentation: 'inset',
      paragraphs: [
        'Certains sujets rapportent des expériences cohérentes entre elles, ce qui suggère un phénomène partagé plutôt qu’une dérive strictement individuelle.',
      ],
    },
    {
      type: 'definition',
      title: 'Définition du phénomène',
      term: 'Rémanence',
      definition:
        'Persistance anormale et superposition de fragments émotionnels et temporels dans la perception consciente des individus exposés.',
      hypothesis:
        'La Zone ne détruit pas les informations, souvenirs ou événements, mais les conserve et les rediffuse de manière désordonnée.',
      figure: {
        side: 'right',
        src: '/images/lore/figures/lore_fig02.jpeg',
        alt: 'Placeholder archives définition',
        caption: 'FIG 02 — fragment d’archive',
        aspectClass: 'aspect-[3/4]',
      },
    },
    {
      type: 'bullets',
      title: 'Hypothèses d’origine',
      items: [
        'Défaillance d’une expérience clandestine liée à la manipulation de la conscience.',
        'Émission psychique provoquée par un artefact de forte intensité devenu instable.',
        'Anomalie mémétique capable d’interagir directement avec la mémoire humaine.',
        'Perturbation locale de la structure temporelle, altérant les frontières entre passé et présent.',
      ],
      figure: {
        side: 'left',
        src: '/images/lore/figures/lore_fig03.jpeg',
        alt: 'Placeholder schéma',
        caption: 'Fig. 03 — schéma d’hypothèses',
        aspectClass: 'aspect-[3/4]',
      },
    },
    {
      type: 'bullets',
      title: 'Conséquences observées sur la Zone',
      items: [
        'Désorientation massive des locaux.',
        'Troubles de la vision et de la perception.',
        'Hausse des comportements suicidaires.',
        'Augmentation des cas de troubles mentaux sévères.',
      ],
    },
    {
      type: 'text',
      title: 'Analyse complémentaire',
      textPresentation: 'inset',
      paragraphs: [
        'La Zone présente désormais des caractéristiques proches d’un système non linéaire, où la causalité semble partiellement altérée.',
        'Certaines données suggèrent que la mémoire pourrait exister indépendamment du sujet.',
        'D’autres observations laissent envisager que l’identité elle-même pourrait être fragmentée, partagée, ou persistante après la mort.',
        'Dans ce contexte, la disparition physique d’un individu ne constituerait plus nécessairement une disparition définitive dans la Zone.',
      ],
    },
    {
      type: 'text',
      title: 'Conclusion provisoire',
      paragraphs: [
        'Le 17 octobre 2013 marque une rupture majeure dans l’évolution de la Zone.',
        'La Rémanence n’est pas un simple effet secondaire. Elle constitue possiblement une nouvelle phase de développement du phénomène global.',
        'Aucune réponse claire n’a, à ce jour, pu être obtenue quant à l’origine exacte de l’événement.',
      ],
    },
  ],
};
