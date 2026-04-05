/**
 * @file rules.config.ts
 * @description Arborescence du règlement (catégories, règles imbriquées, contenu affiché dans `Rules.tsx`).
 */

/**
 * Nœud de règle : feuille (content) et/ou branche (children = sous-accordéons).
 * Ex. section « 4 » avec children pour 4.1, 4.2, 4.3 ; chaque enfant peut à son tour avoir children (ex. 4.3.1).
 */
export type Rule = {
  title: string;
  /** Puces affichées à ce niveau quand l’accordéon est ouvert (facultatif si seulement des enfants). */
  content?: string[];
  /** Sous-règles en accordeons imbriqués. */
  children?: Rule[];
};

/** Clés d’icônes Lucide (voir `ruleCategoryIcons.tsx`). */
export type RuleCategoryIconId =
  | 'respect'
  | 'content'
  | 'recording'
  | 'hostile'
  | 'deathRp'
  | 'hrp'
  | 'give'
  | 'privacy'
  | 'channels'
  | 'sanctions'
  | 'fairplay';

export type RuleCategory = {
  icon: RuleCategoryIconId;
  category: string;
  rules: Rule[];
};

export const rulesData: RuleCategory[] = [
  {
    icon: 'respect',
    category: 'Respect et bonne conduite',
    rules: [
      {
        title: 'Respect et bonne conduite',
        content: [
          'Respectez tous les membres, y compris les modérateurs et administrateurs.',
          'Aucun harcèlement, insultes, discriminations ou comportements toxiques ne sera toléré.',
          "Les débats sont autorisés tant qu'ils restent courtois et constructifs.",
        ],
      },
    ],
  },
  {
    icon: 'content',
    category: 'Contenu',
    rules: [
      {
        title: 'Contenu',
        content: [
          'Pas de contenu illégal, choquant ou offensant.',
          'Liens externes autorisés uniquement s’ils sont sûrs et pertinents.',
          "La publicité pour d'autres serveurs ou produits est interdite sauf autorisation d'un administrateur.",
        ],
      },
    ],
  },
  {
    icon: 'recording',
    category: 'Enregistrement des scènes hostiles',
    rules: [
      {
        title: 'Enregistrement des scènes hostiles',
        content: [
          'Nous encourageons fortement l’enregistrement vidéo/audio des scènes hostiles.',
          'Ces enregistrements aident à résoudre les conflits.',
          'Permettent de partager les moments épiques avec la communauté.',
          'Servent de preuve pour la modération en cas de litige.',
          'Vous pouvez partager vos clips dans les canaux prévus à cet effet.',
        ],
      },
    ],
  },
  {
    icon: 'hostile',
    category: 'Engagements hostiles',
    rules: [
      {
        title: 'Engagements hostiles',
        content: [
          'Les règles suivantes encadrent tout engagement hostile sur le serveur.',
        ],
        children: [
          {
            title: 'Annonce claire et audible',
            content: [
              'Toute action hostile doit commencer par une phrase forte, nette et compréhensible.',
              'Exemples : « Contrôle ! Baissez vos armes ! », « Vous êtes en état d\'arrestation ! »',
              "L'annonce doit être faite de manière audible.",
            ],
          },
          {
            title: 'Délai de réaction (10 secondes)',
            content: [
              'Après l’annonce, la cible dispose de 10 secondes pour obéir, refuser ou négocier.',
              'Si la cible ne réagit pas ou refuse clairement, l’attaquant est en droit de poursuivre l’action.',
              'Ce délai permet d’éviter les abus liés à l’AFK, la latence ou l’incompréhension.',
            ],
          },
          {
            title: 'Obligation de laisser une issue',
            content: [
              'Les attaquants doivent toujours laisser une porte de sortie raisonnable aux victimes.',
              'Un encerclement total n’est autorisé que si justifié par le scénario roleplay.',
              'Le but est de créer du jeu, pas de frustrer inutilement les autres joueurs.',
            ],
          },
        ],
      },
    ],
  },
  {
    icon: 'deathRp',
    category: 'Morts RP',
    rules: [
      {
        title: 'Règles sur les Morts RP',
        content: [
          'Une mort RP représente la fin définitive du personnage et ne doit pas être prise à la légère.',
          'Elle peut intervenir uniquement dans les cas suivants :',
          '• Demande volontaire d’un joueur souhaitant changer de personnage',
          '• Conflit total entre factions/guerre ouverte, validé et consenti',
          '• Interaction hostile grave : attaque de base, trahison majeure',
          'Les morts RP doivent être validées par la modération afin d’éviter les abus.',
        ],
      },
    ],
  },
  {
    icon: 'hrp',
    category: 'HRP (Hors Rôle-Play)',
    rules: [
      {
        title: 'HRP strictement interdit',
        content: [
          'Toute action HRP est strictement interdite.',
          'Aucune action en jeu ne doit découler d’une information obtenue en dehors du roleplay.',
          'Le métagaming (utiliser des infos HRP pour influencer le jeu) est formellement interdit.',
          'Si un groupe ou joueur est prouvé coupable de HRP, un ban définitif pourra être appliqué sans avertissement.',
          'Exemple : entendre sur Discord qu’une base va être attaquée et se préparer en jeu = interdit.',
        ],
      },
    ],
  },
  {
    icon: 'give',
    category: 'Give et privilèges du Staff',
    rules: [
      {
        title: 'Règle sur les Give',
        content: [
          'Aucun give d’équipement ne sera toléré sans l’accord d’au minimum deux membres du staff.',
          'Exceptions : en cas de bug avéré ou vol confirmé avec preuve.',
          'Tous les joueurs doivent rester dans une équité totale.',
          'Aucun administrateur ne peut profiter de son statut pour s’avantager.',
          'Tout abus entraînera une sanction immédiate pouvant aller jusqu’au retrait du statut staff.',
        ],
      },
    ],
  },
  {
    icon: 'privacy',
    category: 'Sécurité et vie privée',
    rules: [
      {
        title: 'Sécurité et vie privée',
        content: [
          'Ne partagez pas vos informations personnelles ni celles des autres.',
          'Respectez le droit à l’image et la confidentialité des joueurs.',
          'Les attaques ou menaces hors-jeu sont strictement interdites.',
        ],
      },
    ],
  },
  {
    icon: 'channels',
    category: 'Canaux et discussions',
    rules: [
      {
        title: 'Canaux et discussions',
        content: [
          'Utilisez les bons canaux pour chaque type de discussion.',
          'Évitez le spam et les répétitions inutiles.',
          'Lisez et respectez les annonces officielles des administrateurs.',
        ],
      },
    ],
  },
  {
    icon: 'sanctions',
    category: 'Sanctions',
    rules: [
      {
        title: 'Système de sanctions',
        content: [
          'Les infractions peuvent entraîner :',
          '• Avertissement verbal ou écrit',
          '• Mute ou kick temporaire',
          '• Bannissement temporaire ou définitif selon la gravité',
          'Abus de la règle des 10 secondes, mort RP non justifiée, HRP ou give abusif = sanction immédiate.',
          'Les décisions de la modération sont finales, mais un appel respectueux est possible.',
        ],
      },
    ],
  },
  {
    icon: 'fairplay',
    category: 'Fair-play et plaisir commun',
    rules: [
      {
        title: 'Fair-play et plaisir commun',
        content: [
          'L’objectif est que tout le monde s’amuse dans un cadre équitable.',
          'Favorisez le roleplay crédible : Annonce → Délai → Action proportionnée → Issue de secours.',
          'Enregistrez vos engagements hostiles et gardez-les en cas de litige.',
          'Les moments de tension font partie du jeu : jouez-les à fond et partagez vos expériences !',
        ],
      },
    ],
  },
];
