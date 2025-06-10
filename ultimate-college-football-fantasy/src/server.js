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
  addGame
} from "./utils/db.js";

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

app.listen(PORT, () => {
  console.log(`✅ API server listening at http://localhost:${PORT}`);
});
