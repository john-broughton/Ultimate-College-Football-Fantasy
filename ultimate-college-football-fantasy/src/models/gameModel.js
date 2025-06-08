// src/models/gameModel.js

export class Game {
  constructor({
    teamName,
    opponentName,
    isWin,
    isRoad = false,
    isNeutral = false,
    opponentRank = null,
    isConferenceOpponent = false,
    isIndependentTeam = false,
    week = null,
  }) {
    this.teamName = teamName;
    this.opponentName = opponentName;
    this.isWin = isWin;
    this.isRoad = isRoad;
    this.isNeutral = isNeutral;
    this.opponentRank = opponentRank;
    this.isConferenceOpponent = isConferenceOpponent;
    this.isIndependentTeam = isIndependentTeam;
    this.week = week;
  }

  isRankedOpponent(level) {
    return this.opponentRank !== null && this.opponentRank <= level;
  }
}
