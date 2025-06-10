// src/models/weekSummaryModel.js

export class WeekSummary {
  constructor(weekNumber) {
    this.weekNumber = weekNumber;
    this.playerScores = {};     // { playerName: score }
    this.teamGameResults = {};  // { teamName: Game object }
    this.lineups = {};          // from Roster.getStartersForWeek(week)
    this.transactions = [];     // list of TransactionLogEntry
    this.trades = [];           // list of Trade
  }

  addPlayerScore(player, score) {
    this.playerScores[player] = score;
  }

  addTransaction(entry) {
    this.transactions.push(entry);
  }

  addTrade(trade) {
    this.trades.push(trade);
  }
}
