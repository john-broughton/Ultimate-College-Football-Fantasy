// src/models/playerModel.js

export class Player {
  constructor(name, email = "", paid = false) {
    this.name = name;
    this.email = email;
    this.paid = paid;
    this.balance = 180; // Starting money
    this.teams = []; // Teams drafted
  }

  draftTeam(team, cost) {
    if (this.balance >= cost) {
      this.teams.push(team);
      this.balance -= cost;
    } else {
      throw new Error("Not enough budget to draft this team");
    }
  }
}
