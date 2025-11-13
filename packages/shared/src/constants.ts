export const rewards = {
    perQuestionTraining: 2,      // Players - Quiz training : +2/bonne réponse
    trainingQuestionsCount: 6,   // Players - Quiz training : 6 questions
    trainingSuffleSize: 1,       // Players - Quiz training : 1 question aléatoire
    perQuestionLeague: 2,        // Players - Quiz league : +2/bonne réponse
    leagueQuestionsCount: 6,     // Players - Quiz league : 6 questions
    leagueSuffleSize: 6,         // Players - Quiz league : 1 question aléatoire

    // Avis Google / Profil / Favoris
    googleBusiness: 100,          // Players - Avis Google : +100 pts (1/jour/commerce)
    shareInfos: 100,             // Players - Renseigner ses coordonnées : +100 pts (1 fois)
    shareFavorites: 150,         // Players - 5 lieux préférés : +150 pts (1 fois)
    shareFavoritesCount: 5,        // Players - Nombre de lieux préférés à renseigner

    // Parrainage joueurs (deux côtés)
    playerReferrer: 29,          // Players - Parrain (max 10/semaine)
    playerReferred: 29,          // Players - Parrainé (max 10/semaine)

    // Parrainage vers partenaire/sponsor (proposition de coordonnées)
    retailerReferrer: 1000, // Players - Proposer un partenaire : +1000 pts

    // Scans
    scanRetail: 25,              // Players - Scan commerce : +25 pts (1/jour/commerce)
    scanRetailMap: 150,          // Players - Scan commerce (map) : +150 pts (1/jour/commerce)
    scanSponsorMap: 300,         // Players - Scan commerce sponsor (map) : +300 pts (1/jour/commerce)
};

export type RewardWindow = 'once' | 'day' | 'week'; // 'month' | 'year' | 'forever' (jamais reset)
export type ScopreType   = 'player' | 'retailer'; // Limite par joueur ou par commerce
export type RewardType  = 'player' | 'retailer'; // Qui ca concerne ?

export type RewardLimits = Partial<Record<
  keyof typeof rewards,
  { cap: number; window: RewardWindow; scope?: ScopreType[]; type: RewardType[] }
>>;

export const rewardLimits: RewardLimits = {
  // Profil / favoris
  shareInfos:     { cap: 1,  window: 'once', type: ['player'] },
  shareFavorites: { cap: 1,  window: 'week', type: ['player', 'retailer'] },

  // Avis Google (1/jour/commerce)
  googleBusiness: { cap: 1,  window: 'day', type: ['player'] },

  // Scans (1/jour par commerce)
  scanRetail:     { cap: 1,  window: 'day', scope: ['retailer'], type: ['player'] },
  scanRetailMap:  { cap: 1,  window: 'day', scope: ['retailer'], type: ['player'] },
  scanSponsorMap: { cap: 1,  window: 'day', scope: ['retailer'], type: ['player'] },

  // Parrainage joueurs (max 10/semaine)
  playerReferrer: { cap: 10, window: 'week', type: ['player'] },
  playerReferred: { cap: 10, window: 'week', type: ['player'] },
};