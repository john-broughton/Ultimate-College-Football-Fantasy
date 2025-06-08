// src/models/transactionLogModel.js

export class TransactionLogEntry {
  constructor({ week, playerName, teamName, type, cost = 0, note = "" }) {
    this.week = week; // e.g. 1 - 14
    this.playerName = playerName;
    this.teamName = teamName;
    this.type = type; // 'Draft', 'FreeAgent', 'Drop', 'Trade'
    this.cost = cost;
    this.note = note; // optional context
  }
}
