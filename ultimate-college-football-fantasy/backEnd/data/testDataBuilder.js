import { Player } from "../../shared/models/playerModel.js";
import { Team } from "../../shared/models/teamModel.js";
import { TeamOwnership } from "../../shared/models/teamOwnershipModel.js";
import { TransactionLogEntry } from "../../shared/models/transactionLogModel.js";
import { Game } from "../../shared/models/gameModel.js";
import { Roster } from "../../shared/models/rosterModel.js";
import { Trade } from "../../shared/models/tradeModel.js";
import { calculatePlayerTotalScore } from "../../shared/utils/scoreCalculator.js";
import { addTeamOwnership } from "../utils/db.js";

export function buildTestPlayers() {
  const players = [
    new Player("Alice", "alice@example.com", true),
    new Player("Bob", "bob@example.com", true),
    new Player("Charlie", "charlie@example.com", false),
    new Player("Dana", "dana@example.com", true),
    new Player("Evan", "evan@example.com", true),
    new Player("Fiona", "fiona@example.com", true),
  ];

  players[0].balance = 60;
  players[1].balance = 45;
  players[2].balance = 30;
  players[3].balance = 90;
  players[4].balance = 75;
  players[5].balance = 50;

  return players;
}

export function buildTestTeams() {
  const teams = [
    new Team("Georgia", "SEC", "Alice", 50, 3),
    new Team("Ohio State", "Big Ten", "Alice", 45, 12),
    new Team("Florida State", "ACC", "Bob", 60, 6),
    new Team("Texas", "Big 12", "Dana", 55, 8),
    new Team("Michigan", "Big Ten", "Dana", 40, 4),
    new Team("USC", "Pac-12", "Evan", 48, 10),
    new Team("Oregon", "Pac-12", "Fiona", 44, 15),
    new Team("Notre Dame", "Independent", "Charlie", 52, 9),
    new Team("Alabama", "SEC", "Fiona", 60, 2),
    new Team("LSU", "SEC", "Evan", 50, 11),
  ];

  const ownerships = [
    ["Georgia", "Alice", 1],
    ["Ohio State", "Alice", 2],
    ["Florida State", "Bob", 1],
    ["Texas", "Dana", 1],
    ["Michigan", "Dana", 2],
    ["USC", "Evan", 1],
    ["Oregon", "Fiona", 1],
    ["Notre Dame", "Charlie", 1],
    ["Alabama", "Fiona", 2],
    ["LSU", "Evan", 2],

    ["Michigan", "Alice", 6],
    ["Oregon", "Alice", 7],
    ["Georgia", "Bob", 4],
    ["USC", "Charlie", 3],
    ["Notre Dame", "Bob", 5],
    ["Texas", "Charlie", 6],
    ["Florida State", "Dana", 7],
    ["LSU", "Fiona", 8],
    ["Alabama", "Dana", 5],
    ["Ohio State", "Fiona", 9],

    ["Michigan", "Charlie", 8],
    ["Texas", "Fiona", 10],
    ["Notre Dame", "Evan", 7],
    ["USC", "Alice", 9],
    ["Florida State", "Alice", 10],
  ];

  for (const [teamName, owner, week] of ownerships) {
    const team = teams.find((t) => t.name === teamName);
    team.addOwnership(new TeamOwnership({ teamName, ownerName: owner, acquiredWeek: week }));
  }

  for (const [teamName, ownerName, acquiredWeek] of ownerships) {
    addTeamOwnership({
      teamName,
      ownerName,
      acquiredWeek,
      droppedWeek: null,
    });
  }

  return teams;
}

export function buildTestTransactions() {
  return [
    new TransactionLogEntry({ week: 1, playerName: "Alice", teamName: "Georgia", type: "Draft", cost: 50 }),
    new TransactionLogEntry({ week: 2, playerName: "Alice", teamName: "Ohio State", type: "Trade", cost: 0 }),
    new TransactionLogEntry({ week: 1, playerName: "Bob", teamName: "Florida State", type: "Draft", cost: 60 }),
    new TransactionLogEntry({ week: 1, playerName: "Dana", teamName: "Texas", type: "Draft", cost: 55 }),
    new TransactionLogEntry({ week: 2, playerName: "Dana", teamName: "Michigan", type: "FreeAgent", cost: 40 }),
    new TransactionLogEntry({ week: 1, playerName: "Evan", teamName: "USC", type: "Draft", cost: 48 }),
    new TransactionLogEntry({ week: 2, playerName: "Evan", teamName: "LSU", type: "Trade", cost: 0 }),
    new TransactionLogEntry({ week: 1, playerName: "Fiona", teamName: "Oregon", type: "Draft", cost: 44 }),
    new TransactionLogEntry({ week: 2, playerName: "Fiona", teamName: "Alabama", type: "FreeAgent", cost: 60 }),
    new TransactionLogEntry({ week: 1, playerName: "Charlie", teamName: "Notre Dame", type: "Draft", cost: 52 }),
  ];
}

export function buildTestTrades() {
  return [
    new Trade({ week: 2, fromPlayer: "Bob", toPlayer: "Alice", teamName: "Ohio State", note: "Strategic trade" }),
    new Trade({ week: 4, fromPlayer: "Evan", toPlayer: "Dana", teamName: "LSU", note: "Even swap" }),
    new Trade({ week: 5, fromPlayer: "Charlie", toPlayer: "Fiona", teamName: "Notre Dame", note: "Late season pickup" }),
  ];
}

export function generateScoringTestContext() {
  const players = buildTestPlayers();
  const teams = buildTestTeams();
  const transactions = buildTestTransactions();
  const trades = buildTestTrades();
  const roster = new Roster();
  const teamMap = Object.fromEntries(teams.map(t => [t.name, t]));

  const sampleGames = [
    ["Georgia", [1, "Oregon", true, true, true, 8], [2, "Alabama", true, false, false, 2], [3, "LSU", false, true, true, 11]],
    ["Ohio State", [2, "Penn State", false, true, true, 15], [4, "Michigan", true, false, true, 4]],
    ["Florida State", [1, "LSU", true, true, true, 11], [3, "UNC", false, false, false, 7], [5, "Miami", true, true, true, 25]],
    ["Texas", [1, "Baylor", true, false, true, 17], [3, "Oklahoma", false, true, true, 5], [4, "TCU", true, false, true, 14]],
    ["Michigan", [2, "Illinois", true, true, true, 20], [5, "Ohio State", false, false, true, 12]],
    ["USC", [1, "UCLA", false, true, true, 10], [3, "Stanford", true, false, true, 18], [6, "Oregon", false, true, true, 15]],
    ["Oregon", [1, "Washington", true, false, true, 16], [2, "Utah", false, true, true, 9], [4, "USC", true, false, true, 10]],
    ["Notre Dame", [1, "Navy", true, true, false, null], [3, "Clemson", false, false, true, 6], [5, "Duke", true, false, false, 23]],
    ["Alabama", [2, "Texas A&M", true, true, true, 19], [4, "Georgia", false, false, true, 3]],
    ["LSU", [2, "Florida", true, true, true, 24], [6, "Alabama", false, false, true, 2]],
  ];

  for (const [teamName, ...games] of sampleGames) {
    games.forEach(([week, opponent, isWin, isRoad, isConf, oppRank]) => {
      teamMap[teamName].addGame(
        new Game({
          teamName,
          opponentName: opponent,
          isWin,
          isRoad,
          isNeutral: false,
          opponentRank: oppRank,
          isConferenceOpponent: isConf,
          isIndependentTeam: teamMap[teamName].isIndependent,
          week,
        })
      );
    });
  }

  const starterData = [
    ["Alice", "Georgia", [1, 2]],
    ["Alice", "Ohio State", [2, 4]],
    ["Bob", "Florida State", [1, 3, 5]],
    ["Dana", "Texas", [1, 3, 4]],
    ["Dana", "Michigan", [2, 5]],
    ["Evan", "USC", [1, 3]],
    ["Evan", "LSU", [2, 6]],
    ["Fiona", "Oregon", [1, 4]],
    ["Fiona", "Alabama", [2, 4]],
    ["Charlie", "Notre Dame", [1, 3, 5]],
  ];

  for (const [playerName, teamName, weeks] of starterData) {
    weeks.forEach((week) => roster.addStart(playerName, teamName, week));
  }

  const allWeeks = teams.flatMap((t) => t.games.map((g) => g.week));
  const latestWeek = Math.max(...allWeeks);

  for (const player of players) {
    player.score = calculatePlayerTotalScore(
      player.name,
      teams,
      roster,
      latestWeek
    );
  }

  return { players, teams, roster, transactions, trades };
}

export function buildFullTestData() {
  return generateScoringTestContext();
}
