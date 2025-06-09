import { Game } from "./gameModel.js";
import { TeamOwnership } from "./teamOwnershipModel.js";

export class Team {
  constructor(name, conference, draftedBy, cost = 0, rank = null) {
    this.name = name;
    this.conference = conference;
    this.draftedBy = draftedBy;
    this.cost = cost;
    this.rank = rank; // NEW: current ranking of this team
    this.isIndependent = conference?.toLowerCase()?.includes("independent");
    this.games = []; // Game[]
    this.ownershipHistory = []; // TeamOwnership[]
  }

  addGame(game) {
    if (!(game instanceof Game)) {
      throw new Error("Only Game objects can be added");
    }
    this.games.push(game);
  }

  addOwnership(ownership) {
    if (!(ownership instanceof TeamOwnership)) {
      ownership = new TeamOwnership(ownership);
    }
    this.ownershipHistory.push(ownership);
  }

  getOwnerForWeek(week) {
    const record = this.ownershipHistory.find(o => o.isActiveDuring(week));
    return record?.ownerName ?? null;
  }

  getCurrentOwner() {
    const active = this.ownershipHistory.find(o => o.droppedWeek === null);
    return active?.ownerName ?? null;
  }

  applyTrade(trade) {
    if (trade.teamName !== this.name) {
      throw new Error(`Trade does not match team: expected ${this.name}, got ${trade.teamName}`);
    }

    const active = this.ownershipHistory.find(o => o.droppedWeek === null && o.ownerName === trade.fromPlayer);
    if (active) {
      active.droppedWeek = trade.week;
    }

    this.addOwnership({
      teamName: this.name,
      ownerName: trade.toPlayer,
      acquiredWeek: trade.week,
      acquiredVia: 'Trade',
      acquiredCost: 0,
      droppedWeek: null
    });
  }
}
