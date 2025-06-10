
export class Roster {
  constructor() {
    // { [weekNumber]: { [playerName]: [teamName, ...] } }
    this.weeklyStarters = {};
  }

  // Add a team start for a specific player in a specific week
  addStart(playerName, teamName, week) {
    if (!this.weeklyStarters[week]) {
      this.weeklyStarters[week] = {};
    }
    if (!this.weeklyStarters[week][playerName]) {
      this.weeklyStarters[week][playerName] = [];
    }
    this.weeklyStarters[week][playerName].push(teamName);
  }

  // Get all starters for a given week
  getStartersForWeek(week) {
    return this.weeklyStarters[week] || {};
  }

  // Get all starts for a given player across all weeks
  getPlayerStarts(playerName) {
    const result = {};
    for (const [week, players] of Object.entries(this.weeklyStarters)) {
      if (players[playerName]) {
        result[week] = players[playerName];
      }
    }
    return result;
  }

  // Count how many times a player started a specific team
  getTotalStartsForTeam(playerName, teamName) {
    let count = 0;
    for (const week of Object.keys(this.weeklyStarters)) {
      const teams = this.weeklyStarters[week][playerName] || [];
      if (teams.includes(teamName)) {
        count++;
      }
    }
    return count;
  }
}
