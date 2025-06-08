// src/models/tradeModel.js

export class Trade {
  constructor({ week, fromPlayer, toPlayer, teamName, note = "" }) {
    this.week = week;
    this.fromPlayer = fromPlayer;
    this.toPlayer = toPlayer;
    this.teamName = teamName;
    this.note = note;
  }
}
