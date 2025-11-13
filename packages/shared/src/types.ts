export interface User {
  id: number;
  firstName: string | null;
  lastName: string | null;
  email: string;
  type: 'player' | 'retailer' | 'admin';
  password: string;
  googleId: string | null;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  score: number;
  rank: number;
  rankLeaderboardPeriod: number;
  scoreLeaderboardPeriod: number;
  termsAccepted: boolean;
  referralCode: string;
}

export type Gender = 'man' | 'woman' | 'other';

export interface Player {
  id: number;
  username: string;
  phone: string;
  postalCode: string;
  gender: Gender | null;
  age: number | null;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Retailer {
  id: number;
  name: string;
  state: 'pending' | 'approved' | 'rejected';
  address: string;
  phone: string;
  city: string;
  postalCode: string;
  countryCode: string;
  siret: string;
  googleBusinessProfileUrl: string;
  logo?: {
    url: string;
  };
  createdAt: Date;
  updatedAt: Date;
  sponsor: boolean;
  onMap: boolean;
}
export interface Question {
  id: number;
  interogation: string;
  answer?: string;
  explanation?: string | null;
  choices: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Code {
  id: number;
  value: string;
  retailerId: number;
  createdAt: Date;
  updatedAt: Date;
  retailer?: Retailer;
}

export interface Asset {
  id: number;
  key: string;
  type: 'image' | 'banner' | 'partner';
  url: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type Filters<T> =
  { 
    options?: {
      pageIndex?: number;
      perPage?: number;
    },
    query?: Partial<T>;
  }

export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    currentPage: number;
    firstPage: number;
    firstPageUrl: string | null;
    lastPage: number;
    lastPageUrl: string | null;
    nextPageUrl: string | null;
    perPage: number;
    previousPageUrl: string | null;
    total: number;
  };
};

export type BaseObject = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Columns<T> = {label: string; key: keyof T, format?: (value: any) => any, type?: 'image'}[]

export type GetableObjects = 'players' | 'retailers' | 'codes' | 'questions' | 'users';

export type Stats = {
  totalUsers: number;
  totalPlayers: number;
  totalRetailers: number;
  totalQuestions: number;
  totalQuizzResponses: number;
  totalScannedCodes: number;
}

export type ScanSource = 'scanRetail' | 'scanRetailMap' | 'scanSponsorMap'

export type Rewards = {
  id?: number | null;
  key: string;
  category: 'event' | 'period15d' | 'nonContest';
  value: number | null;
  cap: number | null;
  limitWindow?: 'once' | 'day' | 'week' | null;
  scope?: ('player' | 'retailer')[] | null;
  type?: ('player' | 'retailer')[];
  descriptionPlayer: string | null;
  descriptionRetailer: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LeaderboardPeriod {
  id: number;
  type: 'player' | 'retailer';
  startsAt: Date;
  endsAt: Date;
  status: 'scheduled' | 'active' | 'closed';
}

export interface LeaderboardRow {
  subject_id: number
  label: string
  total_score: number
  entries: number
  rank: number
};

export const RewardsFallback: Rewards[] = [
  {
    id: 29,
    key: "event_rank1",
    category: "event",
    value: null,
    cap: null,
    limitWindow: null,
    descriptionPlayer: "100 €",
    descriptionRetailer: ""
  },
  {
    id: 30,
    key: "event_rank2",
    category: "event",
    value: null,
    cap: null,
    limitWindow: null,
    descriptionPlayer: "80 €",
    descriptionRetailer: ""
  },
  {
    id: 31,
    key: "event_rank3",
    category: "event",
    value: null,
    cap: null,
    limitWindow: null,
    descriptionPlayer: "60 €",
    descriptionRetailer: ""
  },
  {
    id: 32,
    key: "event_rank4_30",
    category: "event",
    value: null,
    cap: null,
    limitWindow: null,
    descriptionPlayer: "de 100 à 15 €",
    descriptionRetailer: ""
  },
  {
    id: 17,
    key: "period15d_rank1_primary",
    category: "period15d",
    value: null,
    cap: null,
    limitWindow: null,
    descriptionPlayer: "70 € de VTC",
    descriptionRetailer: "100 € de VTC"
  },
  {
    id: 20,
    key: "period15d_rank1_secondary",
    category: "period15d",
    value: null,
    cap: null,
    limitWindow: null,
    descriptionPlayer: "+ 80€ équipement",
    descriptionRetailer: "+ 4×25€ cartes cadeau + 4x20€ équipement"
  },
  {
    id: 18,
    key: "period15d_rank2_primary",
    category: "period15d",
    value: null,
    cap: null,
    limitWindow: null,
    descriptionPlayer: "50 € de VTC",
    descriptionRetailer: "50 € de VTC"
  },
  {
    id: 21,
    key: "period15d_rank2_secondary",
    category: "period15d",
    value: null,
    cap: null,
    limitWindow: null,
    descriptionPlayer: "+ 50€ équipement",
    descriptionRetailer: "+ 2×25€ cartes cadeau + 3×20€ équipement"
  },
  {
    id: 19,
    key: "period15d_rank3_primary",
    category: "period15d",
    value: null,
    cap: null,
    limitWindow: null,
    descriptionPlayer: "30 € de VTC",
    descriptionRetailer: "30 € de VTC"
  },
  {
    id: 22,
    key: "period15d_rank3_secondary",
    category: "period15d",
    value: null,
    cap: null,
    limitWindow: null,
    descriptionPlayer: "+ 50€ équipement",
    descriptionRetailer: "+ 2×25€ cartes cadeau + 2×20€ équipement"
  },
  {
    id: 7,
    key: "googleBusiness",
    category: "nonContest",
    value: 100,
    cap: 1,
    limitWindow: "day",
    descriptionPlayer: "Avis Google (1/jour/commerce)",
    descriptionRetailer: "Avis Google (1/jour/commerce)"
  },
  {
    id: 5,
    key: "leagueQuestionsCount",
    category: "nonContest",
    value: 6,
    cap: null,
    limitWindow: null,
    descriptionPlayer: "Quiz league — nombre de questions",
    descriptionRetailer: "Quiz league — nombre de questions"
  },
  {
    id: 6,
    key: "leagueSuffleSize",
    category: "nonContest",
    value: 6,
    cap: null,
    limitWindow: null,
    descriptionPlayer: "Quiz league — tirage aléatoire (taille)",
    descriptionRetailer: "Quiz league — tirage aléatoire (taille)"
  },
  {
    id: 4,
    key: "perQuestionLeague",
    category: "nonContest",
    value: 2,
    cap: null,
    limitWindow: null,
    descriptionPlayer: "Quiz league — points par bonne réponse",
    descriptionRetailer: "Quiz league — points par bonne réponse"
  },
  {
    id: 1,
    key: "perQuestionTraining",
    category: "nonContest",
    value: 2,
    cap: null,
    limitWindow: null,
    descriptionPlayer: "Quiz entraînement — points par bonne réponse",
    descriptionRetailer: "Quiz entraînement — points par bonne réponse"
  },
  {
    id: 12,
    key: "playerReferred",
    category: "nonContest",
    value: 29,
    cap: 10,
    limitWindow: "week",
    descriptionPlayer: "Parrainage — points pour le parrainé (max 10/semaine)",
    descriptionRetailer: "Parrainage — points pour le parrainé (max 10/semaine)"
  },
  {
    id: 11,
    key: "playerReferrer",
    category: "nonContest",
    value: 29,
    cap: 10,
    limitWindow: "week",
    descriptionPlayer: "Parrainage — points pour le parrain (max 10/semaine)",
    descriptionRetailer: "Parrainage — points pour le parrain (max 10/semaine)"
  },
  {
    id: 13,
    key: "retailerReferrer",
    category: "nonContest",
    value: 1000,
    cap: null,
    limitWindow: null,
    descriptionPlayer: "Proposer un partenaire (coordonnées validées)",
    descriptionRetailer: "Proposer un partenaire (coordonnées validées)"
  },
  {
    id: 14,
    key: "scanRetail",
    category: "nonContest",
    value: 25,
    cap: 1,
    limitWindow: "day",
    descriptionPlayer: "Scan d’un commerce (1/jour/commerce)",
    descriptionRetailer: "Scan d’un commerce (1/jour/commerce)"
  },
  {
    id: 15,
    key: "scanRetailMap",
    category: "nonContest",
    value: 150,
    cap: 1,
    limitWindow: "day",
    descriptionPlayer: "Scan commerce depuis la carte (1/jour/commerce)",
    descriptionRetailer: "Scan commerce depuis la carte (1/jour/commerce)"
  },
  {
    id: 16,
    key: "scanSponsorMap",
    category: "nonContest",
    value: 300,
    cap: 1,
    limitWindow: "day",
    descriptionPlayer: "Scan commerce sponsorisé depuis la carte (1/jour/commerce)",
    descriptionRetailer: "Scan commerce sponsorisé depuis la carte (1/jour/commerce)"
  },
  {
    id: 9,
    key: "shareFavorites",
    category: "nonContest",
    value: 150,
    cap: 1,
    limitWindow: "week",
    descriptionPlayer: "Partager ses 5 lieux préférés (1 fois)",
    descriptionRetailer: "Partager ses 5 lieux préférés (1 fois)"
  },
  {
    id: 10,
    key: "shareFavoritesCount",
    category: "nonContest",
    value: 5,
    cap: null,
    limitWindow: null,
    descriptionPlayer: "Nombre de lieux préférés à renseigner",
    descriptionRetailer: "Nombre de lieux préférés à renseigner"
  },
  {
    id: 8,
    key: "shareInfos",
    category: "nonContest",
    value: 100,
    cap: 1,
    limitWindow: "once",
    descriptionPlayer: "Renseigner ses coordonnées (1 fois)",
    descriptionRetailer: "Renseigner ses coordonnées (1 fois)"
  },
  {
    id: 2,
    key: "trainingQuestionsCount",
    category: "nonContest",
    value: 6,
    cap: null,
    limitWindow: null,
    descriptionPlayer: "Quiz entraînement — nombre de questions", 
    descriptionRetailer: "Quiz entraînement — nombre de questions"
  },
  {
    id: 3,
    key: "trainingSuffleSize",
    category: "nonContest",
    value: 1,
    cap: null,
    limitWindow: null,
    descriptionPlayer: "Quiz entraînement — tirage aléatoire (taille)",
    descriptionRetailer: "Quiz entraînement — tirage aléatoire (taille)"
  }
];

export type FavoritePlaces = {
  id: number;
  userId: number;
  items: string[];
  createdAt: Date;
  updatedAt: Date;
}

