// src/models/scoringRules.js

const BASE_POINTS = {
  WIN: 5,
  LOSS: 1,
};

const BONUS_POINTS = {
  ROAD_GAME: 1,
  CONFERENCE_OPPONENT: 1,
  WIN_TOP_25: 1,
  WIN_TOP_20: 1,
  WIN_TOP_15: 1,
  WIN_TOP_10: 1,
  WIN_TOP_5: 1,
  WIN_TOP_1: 1,
  INDEPENDENT_TEAM: 1,
  LOYALTY_BONUS: 1, // One-time bonus per team (if drafted, kept full season, and started ≥ 3 times)
};

export { BASE_POINTS, BONUS_POINTS };
