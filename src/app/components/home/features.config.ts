/**
 * @file features.config.ts
 * @description Liste des « Key Features » affichées sur la page d’accueil.
 */

export type Feature = {
    label: string;
    description: string;
    icon: string;
}

export const features: Feature[] = [
    {
      label: 'Survie Brutale',
      description:
        "Ici, rien ne t’aide. Pas d’interface pour te sauver, pas de seconde chance. Tu avances avec ce que tu trouves, ce que tu comprends… et ce que la Zone te laisse encore.",
      icon: '01'
    },
    {
      label: 'Équilibre des Factions',
      description:
        "Chaque faction défend sa vision de la Zone. Militaires, scientifiques, indépendants ou fanatiques… à toi de choisir ton camp, ou de survivre entre eux.",
      icon: '02'
    },
    {
      label: 'Territoires & Influence',
      description:
        "Certains lieux sont disputés, d’autres évités. Contrôle, présence, rumeurs… la Zone change selon ceux qui osent s’y imposer.",
      icon: '03'
    },
    {
      label: 'Combats Réalistes',
      description:
        "Chaque tir compte. Distance, environnement, pression… rien n’est gratuit. Une erreur, et c’est toi qui deviens une trace de plus dans la Zone.",
      icon: '04'
    },
    {
      label: 'Phénomène de Rémanence',
      description:
        "Des voix, des souvenirs, des silhouettes qui ne devraient pas être là. La Zone garde des traces… et parfois, elles te regardent en retour.",
      icon: '05'
    },
    {
      label: 'Expérience RP Immersive',
      description:
        "Un monde fidèle à l’univers STALKER, avec une liberté narrative maîtrisée. Ici, tu ne joues pas un rôle… tu t’enfonces dedans.",
      icon: '06'
    }
];