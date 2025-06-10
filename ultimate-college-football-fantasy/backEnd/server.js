import express from "express";
import cors from "cors";
import {
  getAllPlayers,
  getPlayerByName,
  getAllTeams,
  getAllTrades,
  getAllTransactions,
  getAllGames,
  addPlayer,
  addTeam,
  addTransaction,
  addTrade,
  addGame,
  getAllTeamsWithOwnership 
} from "./utils/db.js";

import {
  buildTestPlayers,
  buildTestTeams,
  buildTestTransactions,
  buildTestTrades
} from "./data/testDataBuilder.js";


const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// GET routes
app.get("/api/players", (req, res) => res.json(getAllPlayers()));
app.get("/api/players/:name", (req, res) => {
  const player = getPlayerByName(req.params.name);
  if (!player) return res.status(404).json({ error: "Not found" });
  res.json(player);
});

app.get("/api/teams", (req, res) => res.json(getAllTeams()));
app.get("/api/transactions", (req, res) => res.json(getAllTransactions()));
app.get("/api/trades", (req, res) => res.json(getAllTrades()));
app.get("/api/games", (req, res) => res.json(getAllGames()));
app.get("/api/teams/with-ownership", (req, res) => res.json(getAllTeamsWithOwnership()));
// POST routes
app.post("/api/players", (req, res) => {
  addPlayer(req.body);
  res.status(201).json({ success: true });
});

app.post("/api/teams", (req, res) => {
  addTeam(req.body);
  res.status(201).json({ success: true });
});

app.post("/api/transactions", (req, res) => {
  addTransaction(req.body);
  res.status(201).json({ success: true });
});

app.post("/api/trades", (req, res) => {
  addTrade(req.body);
  res.status(201).json({ success: true });
});

app.post("/api/games", (req, res) => {
  addGame(req.body);
  res.status(201).json({ success: true });
});

app.post("/api/seed", (req, res) => {
  const existing = getAllPlayers();
  if (existing.length > 0) {
    return res.status(400).json({ message: "Already seeded" });
  }

  const players = buildTestPlayers();
  const teams = buildTestTeams();
  const transactions = buildTestTransactions();
  const trades = buildTestTrades();

  players.forEach(addPlayer);
  teams.forEach(addTeam);
  transactions.forEach(addTransaction);
  trades.forEach(addTrade);

  // Add all games
  teams.forEach(team => {
    team.games.forEach(addGame);
  });

  res.json({ message: "✅ Seed complete" });
});

app.listen(PORT, () => {
  console.log(`✅ API server listening at http://localhost:${PORT}`);
});
