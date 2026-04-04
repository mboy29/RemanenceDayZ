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
        accentColor: '#8C7B5A',
        // emblemUrl: '/images/factions/loners/emblem.png',
        // imageUrl: '/images/factions/loners/cover.jpg',
        emblemUrl: 'https://picsum.photos/seed/remanence-loners-emblem/400/400',
        imageUrl: 'https://picsum.photos/seed/remanence-loners-cover/1200/800',
        description:
        'Des survivants indépendants, guidés par l’instinct, l’opportunisme et la débrouille. Ils forment la colonne vertébrale de la Zone, sans réel commandement central.',
        values: [
        'Vivre librement dans la Zone, sans chaîne ni hiérarchie imposée.',
        'Survivre grâce à l’expérience, l’échange et l’adaptation constante.',
        'Faire passer l’instinct et la débrouille avant les grandes idéologies.'
        ],
        nbMembers: null,
        status: null
    },
    {
        name: 'Duty',
        code: 'DTY',
        accentColor: '#A63D2E',
        // emblemUrl: '/images/factions/duty/emblem.png',
        // imageUrl: '/images/factions/duty/cover.jpg',
        emblemUrl: 'https://picsum.photos/seed/remanence-duty-emblem/400/400',
        imageUrl: 'https://picsum.photos/seed/remanence-duty-cover/1200/800',
        description:
        'Faction paramilitaire disciplinée qui considère la Zone comme une menace à contenir, voire à détruire. Ordre, contrôle et sacrifice définissent leur ligne.',
        values: [
        'Contenir la propagation de la Zone par tous les moyens nécessaires.',
        'Maintenir une discipline stricte et une chaîne de commandement claire.',
        'Faire passer la sécurité collective avant les intérêts individuels.'
        ],
        nbMembers: null,
        status: null
    },
    {
        name: 'Freedom',
        code: 'FRD',
        accentColor: '#4F6B3C',
        // emblemUrl: '/images/factions/freedom/emblem.png',
        // imageUrl: '/images/factions/freedom/cover.jpg',
        emblemUrl: 'https://picsum.photos/seed/remanence-freedom-emblem/400/400',
        imageUrl: 'https://picsum.photos/seed/remanence-freedom-cover/1200/800',
        description:
        'Faction libertaire persuadée que la Zone ne doit pas être verrouillée par l’armée ou par des structures autoritaires. Plus souples, mais loin d’être inoffensifs.',
        values: [
        'Refuser toute forme de contrôle militaire ou politique sur la Zone.',
        'Défendre une vision plus libre, plus ouverte et plus organique du territoire.',
        'Préserver l’autonomie des stalkers face aux forces d’oppression.'
        ],
        nbMembers: null,
        status: null
    },
    {
        name: 'Bandits',
        code: 'BND',
        accentColor: '#5E4A2F',
        // emblemUrl: '/images/factions/bandits/emblem.png',
        // imageUrl: '/images/factions/bandits/cover.jpg',
        emblemUrl: 'https://picsum.photos/seed/remanence-bandits-emblem/400/400',
        imageUrl: 'https://picsum.photos/seed/remanence-bandits-cover/1200/800',
        description:
        'Criminels, pillards et opportunistes vivant au bord du chaos. Ils prospèrent sur l’intimidation, l’embuscade et la loi du plus fort.',
        values: [
        'Prendre ce qui peut être pris, sans attendre qu’on l’accorde.',
        'Exploiter la peur, la violence et la confusion pour survivre.',
        'Faire primer le profit immédiat sur toute loyauté durable.'
        ],
        nbMembers: null,
        status: null
    },
    {
        name: 'Mercenaries',
        code: 'MER',
        accentColor: '#4A6580',
        // emblemUrl: '/images/factions/mercenaries/emblem.png',
        // imageUrl: '/images/factions/mercenaries/cover.jpg',
        emblemUrl: 'https://picsum.photos/seed/remanence-mercenaries-emblem/400/400',
        imageUrl: 'https://picsum.photos/seed/remanence-mercenaries-cover/1200/800',
        description:
        'Professionnels armés opérant pour l’argent, les contrats et des intérêts souvent opaques. Méthodiques, efficaces, rarement attachés à une cause.',
        values: [
        'Accomplir la mission avec efficacité, discrétion et sang-froid.',
        'Faire passer l’objectif contractuel avant les considérations idéologiques.',
        'Valoriser la compétence, la préparation et la précision tactique.'
        ],
        nbMembers: null,
        status: null
    },
    {
        name: 'Ecologists',
        code: 'ECO',
        accentColor: '#D18C2F',
        // emblemUrl: '/images/factions/ecologists/emblem.png',
        // imageUrl: '/images/factions/ecologists/cover.jpg',
        emblemUrl: 'https://picsum.photos/seed/remanence-ecologists-emblem/400/400',
        imageUrl: 'https://picsum.photos/seed/remanence-ecologists-cover/1200/800',
        description:
        'Scientifiques et chercheurs venus étudier la Zone, ses anomalies et ses artefacts. Leur présence repose sur la connaissance plus que sur la domination.',
        values: [
        'Étudier la Zone pour mieux comprendre ses phénomènes uniques.',
        'Faire progresser la recherche malgré les risques du terrain.',
        'Préserver les données, les découvertes et les échantillons avant tout.'
        ],
        nbMembers: null,
        status: null
    },
    {
        name: 'Military',
        code: 'MIL',
        accentColor: '#556B2F',
        // emblemUrl: '/images/factions/military/emblem.png',
        // imageUrl: '/images/factions/military/cover.jpg',
        emblemUrl: 'https://picsum.photos/seed/remanence-military-emblem/400/400',
        imageUrl: 'https://picsum.photos/seed/remanence-military-cover/1200/800',
        description:
        'Forces armées officielles chargées de surveiller, contenir et verrouiller l’accès à la Zone. Leur présence repose sur l’autorité, la force et le contrôle territorial.',
        values: [
        'Contrôler les accès et maintenir l’ordre par la force si nécessaire.',
        'Faire respecter la chaîne de commandement et les protocoles militaires.',
        'Empêcher toute menace extérieure ou intérieure de se propager.'
        ],
        nbMembers: null,
        status: null
    },
    {
        name: 'Monolith',
        code: 'MON',
        accentColor: '#CFCFC7',
        // emblemUrl: '/images/factions/monolith/emblem.png',
        // imageUrl: '/images/factions/monolith/cover.jpg',
        emblemUrl: 'https://picsum.photos/seed/remanence-monolith-emblem/400/400',
        imageUrl: 'https://picsum.photos/seed/remanence-monolith-cover/1200/800',
        description:
        'Fanatiques dévoués au cœur de la Zone, redoutés pour leur radicalité et leur loyauté absolue. Ils incarnent une menace aussi mystique que militaire.',
        values: [
        'Protéger la Zone et ses secrets contre toute intrusion extérieure.',
        'Suivre une foi absolue sans remise en question ni compromis.',
        'Sacrifier l’individu au profit d’une mission perçue comme sacrée.'
        ],
        nbMembers: null,
        status: null
    },
    {
        name: 'Clear Sky',
        code: 'CSK',
        accentColor: '#6E8FA3',
        // emblemUrl: '/images/factions/clear-sky/emblem.png',
        // imageUrl: '/images/factions/clear-sky/cover.jpg',
        emblemUrl: 'https://picsum.photos/seed/remanence-clear-sky-emblem/400/400',
        imageUrl: 'https://picsum.photos/seed/remanence-clear-sky-cover/1200/800',
        description:
        'Faction secrète tournée vers l’étude de la Zone et de ses mécanismes profonds. Plus discrète que d’autres groupes, elle agit avec méthode et retenue.',
        values: [
        'Chercher à comprendre les équilibres profonds de la Zone.',
        'Agir avec prudence, méthode et recul face aux phénomènes anormaux.',
        'Préserver un savoir rare que peu sont capables d’interpréter.'
        ],
        nbMembers: null,
        status: null
    }
];