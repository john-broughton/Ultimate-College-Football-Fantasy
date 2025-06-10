// src/models/teamOwnershipModel.js

export class TeamOwnership {
  constructor({
    teamName,
    ownerName,
    acquiredWeek = 1,
    droppedWeek = null,
    acquiredCost = 0,
    acquiredVia = "Draft",
  }) {
    this.teamName = teamName;
    this.ownerName = ownerName;
    this.acquiredWeek = acquiredWeek;
    this.droppedWeek = droppedWeek; // null = still owned
    this.acquiredCost = acquiredCost;
    this.acquiredVia = acquiredVia; // "Draft", "FreeAgent", "Trade"
  }

  isActiveDuring(week) {
    return (
      week >= this.acquiredWeek &&
      (this.droppedWeek === null || week <= this.droppedWeek)
    );
  }
}
