/**
 * @file factions.config.ts
 * @description Données statiques des factions STALKER (textes, médias, couleurs, codes) pour l’UI.
 */

export type Faction = {
    name: string;
    code: string;
    accentColor: string;
    emblemUrl: string;
    imageUrl: string;
    description: string;
    values: string[];
    nbMembers?: number | null;
    status?: 'active' | 'inactive' | 'open' | null;
};

export const factions: Faction[] = [
    {
      name: 'Loners',
      code: 'LON',
      accentColor: '#402C18',
      emblemUrl: '/images/factions/loners/loners_emblem.svg',
      imageUrl: '/images/factions/loners/loners_image.png',
      description:
        "Ici, personne ne te doit rien. Tu avances avec ce que tu portes, ce que tu sais faire et ce que la Zone accepte encore de te laisser.",
      values: [
        "Compter d’abord sur soi-même, car la Zone n’offre aucune seconde chance.",
        "Survivre par l’instinct, la débrouille et l’expérience du terrain.",
        "Rester libre, loin des ordres, des dogmes et des chaînes des autres factions."
      ],
      nbMembers: null,
      status: null
    },
    {
      name: 'Duty',
      code: 'DTY',
      accentColor: '#751617',
      emblemUrl: '/images/factions/duty/duty_emblem.svg',
      imageUrl: '/images/factions/duty/duty_image.png',
      description:
        "La Zone n’est pas un refuge. C’est une plaie ouverte. Tant qu’elle respire, le monde extérieur reste en danger. Nous sommes là pour contenir ce fléau.",
      values: [
        "Faire passer la discipline et la mission avant toute considération personnelle.",
        "Combattre sans relâche tout ce qui menace d’étendre l’influence de la Zone.",
        "Maintenir l’ordre là où le chaos cherche sans cesse à reprendre le dessus."
      ],
      nbMembers: null,
      status: null
    },
    {
      name: 'Freedom',
      code: 'FRD',
      accentColor: '#38b000',
      emblemUrl: '/images/factions/freedom/freedom_emblem.svg',
      imageUrl: '/images/factions/freedom/freedom_images.jpg',
      description:
        "La Zone n’appartient ni aux militaires, ni aux fanatiques, ni aux bureaucrates. Elle est sauvage, instable, vivante… et personne ne devrait prétendre la posséder.",
      values: [
        "Refuser toute domination militaire ou politique sur la Zone et ses survivants.",
        "Défendre une existence plus libre, plus brute et plus authentique au cœur du danger.",
        "Préserver l’autonomie de ceux qui veulent vivre sans maître ni laisse."
      ],
      nbMembers: null,
      status: null
    },
    {
      name: 'Bandits',
      code: 'BND',
      accentColor: '#1a1a1a',
      emblemUrl: '/images/factions/bandits/bandits_emblem.svg',
      imageUrl: '/images/factions/bandits/bandits_image.png',
      description:
        "Ici, les faibles se font dépouiller, les naïfs se font enterrer, et les hésitants ne durent pas longtemps. Dans la Zone, tout a un prix… surtout la peur.",
      values: [
        "Prendre ce qui peut l’être avant qu’un autre ne s’en empare.",
        "Utiliser la menace, la violence et l’embuscade comme des outils de survie.",
        "Faire du profit immédiat la seule vraie loi qui mérite d’être respectée."
      ],
      nbMembers: null,
      status: null
    },
    {
      name: 'Ecologists',
      code: 'ECO',
      accentColor: '#fb5607',
      emblemUrl: '/images/factions/ecologists/ecologists_emblem.svg',
      imageUrl: '/images/factions/ecologists/ecologists_image.png',
      description:
        "Là où d’autres ne voient qu’un cauchemar, nous voyons un phénomène à comprendre. Chaque anomalie, chaque artefact, chaque émission raconte quelque chose de plus grand.",
      values: [
        "Étudier la Zone avec rigueur pour percer ses mécanismes les plus dangereux.",
        "Préserver les observations, les données et les découvertes avant toute autre priorité.",
        "Faire progresser la connaissance, même lorsque le terrain exige du sang et du courage."
      ],
      nbMembers: null,
      status: null
    },
    {
      name: 'S.B.U',
      code: 'SBU',
      accentColor: '#414833',
      emblemUrl: '/images/factions/sbu/sbu_emblem.svg',
      imageUrl: '/images/factions/sbu/sbu_image.png',
      description:
        "La Zone est sous surveillance. Chaque passage, chaque mouvement, chaque intrusion est observé. Ceux qui refusent l’autorité choisissent eux-mêmes ce qui leur arrivera.",
      values: [
        "Contrôler le territoire avec fermeté et faire respecter les ordres sans discussion.",
        "Neutraliser toute menace capable de compromettre la stabilité des opérations.",
        "Empêcher la propagation du danger au-delà du périmètre autorisé."
      ],
      nbMembers: null,
      status: null
    },
    {
      name: 'Monolith',
      code: 'MON',
      accentColor: '#e9ecef',
      emblemUrl: '/images/factions/monolith/monolith_emblem.svg',
      imageUrl: '/images/factions/monolith/monolith_image.png',
      description:
        "Le cœur de la Zone ne se révèle pas aux impurs. Nous avons entendu son appel, accepté sa vérité et abandonné ce que les autres appellent encore leur volonté.",
      values: [
        "Protéger les secrets du centre contre toute présence étrangère ou profane.",
        "Suivre une foi absolue, sans doute, sans peur et sans compromis.",
        "Offrir chaque sacrifice nécessaire à la préservation de la volonté du Monolithe."
      ],
      nbMembers: null,
      status: null
    },
    {
      name: 'Clear Sky',
      code: 'CSK',
      accentColor: '#2a6f97',
      emblemUrl: '/images/factions/clearsky/clearsky_emblem.svg',
      imageUrl: '/images/factions/clearsky/clearsky_image.png',
      description:
        "La plupart regardent la Zone sans la comprendre. Nous observons ses cycles, ses fractures, ses réponses. Là où les autres voient du hasard, nous cherchons un ordre caché.",
      values: [
        "Étudier les équilibres invisibles qui gouvernent les mutations de la Zone.",
        "Agir avec méthode, retenue et précision face à l’inconnu.",
        "Préserver un savoir fragile que trop peu sont encore capables de saisir."
      ],
      nbMembers: null,
      status: null
    }
];