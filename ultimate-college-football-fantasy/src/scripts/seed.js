import { buildTestPlayers, buildTestTeams, buildTestTransactions, buildTestTrades } from "../data/testDataBuilder.js";
import { addPlayer, addTeam, addTransaction, addTrade } from "../utils/db.js";

function seedPlayers() {
  const players = buildTestPlayers();
  players.forEach((player) => {
    addPlayer({
      name: player.name,
      email: player.email,
      paid: player.paid,
      balance: player.balance,
    });
  });
}

function seedTeams() {
  const teams = buildTestTeams();
  teams.forEach((team) => {
    addTeam({
      name: team.name,
      conference: team.conference,
      draftedBy: team.draftedBy,
      cost: team.cost,
    });
  });
}

function seedTransactions() {
  const transactions = buildTestTransactions();
  transactions.forEach((t) => {
    addTransaction({
      week: t.week,
      playerName: t.playerName,
      teamName: t.teamName,
      type: t.type,
      cost: t.cost,
      note: t.note,
    });
  });
}

function seedTrades() {
  const trades = buildTestTrades();
  trades.forEach((t) => {
    addTrade({
      week: t.week,
      fromPlayer: t.fromPlayer,
      toPlayer: t.toPlayer,
      teamName: t.teamName,
      note: t.note,
    });
  });
}

function runAllSeeds() {
  seedPlayers();
  seedTeams();
  seedTransactions();
  seedTrades();
  console.log("✅ All data seeded to database.");
}

runAllSeeds();
