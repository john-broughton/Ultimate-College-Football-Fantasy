// src/utils/db.js
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "../data/database.db");
const db = new Database(dbPath);

// Create tables if not exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS players (
    name TEXT PRIMARY KEY,
    email TEXT,
    paid INTEGER,
    balance INTEGER
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS teams (
    name TEXT PRIMARY KEY,
    conference TEXT,
    draftedBy TEXT,
    cost INTEGER
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    week INTEGER,
    playerName TEXT,
    teamName TEXT,
    type TEXT,
    cost INTEGER,
    note TEXT
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS trades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    week INTEGER,
    fromPlayer TEXT,
    toPlayer TEXT,
    teamName TEXT,
    note TEXT
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS games (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    week INTEGER,
    teamName TEXT,
    opponentName TEXT,
    isWin INTEGER,
    isRoad INTEGER,
    isNeutral INTEGER,
    opponentRank INTEGER,
    isConferenceOpponent INTEGER,
    isIndependentTeam INTEGER
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS team_ownership (
    teamName TEXT,
    ownerName TEXT,
    acquiredWeek INTEGER,
    droppedWeek INTEGER,
    acquiredCost INTEGER,
    acquiredVia TEXT
  )
`).run();

// Insert functions
export function addPlayer({ name, email = "", paid = false, balance = 180 }) {
  db.prepare(`
    INSERT OR REPLACE INTO players (name, email, paid, balance)
    VALUES (?, ?, ?, ?)
  `).run(name, email, paid ? 1 : 0, balance);
}

export function addTeam({ name, conference, draftedBy, cost }) {
  db.prepare(`
    INSERT OR REPLACE INTO teams (name, conference, draftedBy, cost)
    VALUES (?, ?, ?, ?)
  `).run(name, conference, draftedBy, cost);
}

export function addTransaction({ week, playerName, teamName, type, cost = 0, note = "" }) {
  db.prepare(`
    INSERT INTO transactions (week, playerName, teamName, type, cost, note)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(week, playerName, teamName, type, cost, note);
}

export function addTrade({ week, fromPlayer, toPlayer, teamName, note = "" }) {
  db.prepare(`
    INSERT INTO trades (week, fromPlayer, toPlayer, teamName, note)
    VALUES (?, ?, ?, ?, ?)
  `).run(week, fromPlayer, toPlayer, teamName, note);
}

export function addGame({
  week,
  teamName,
  opponentName,
  isWin,
  isRoad,
  isNeutral,
  opponentRank,
  isConferenceOpponent,
  isIndependentTeam
}) {
  db.prepare(`
    INSERT INTO games (
      week, teamName, opponentName, isWin, isRoad, isNeutral,
      opponentRank, isConferenceOpponent, isIndependentTeam
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    week,
    teamName,
    opponentName,
    isWin ? 1 : 0,
    isRoad ? 1 : 0,
    isNeutral ? 1 : 0,
    opponentRank ?? null,
    isConferenceOpponent ? 1 : 0,
    isIndependentTeam ? 1 : 0
  );
}

// Query helpers
export function getAllPlayers() {
  return db.prepare(`SELECT * FROM players ORDER BY name ASC`).all();
}

export function getPlayerByName(name) {
  return db.prepare(`SELECT * FROM players WHERE name = ?`).get(name);
}

export function getAllTeams() {
  return db.prepare(`SELECT * FROM teams ORDER BY name ASC`).all();
}

export function getAllTransactions() {
  return db.prepare(`SELECT * FROM transactions ORDER BY week ASC`).all();
}

export function getAllTrades() {
  return db.prepare(`SELECT * FROM trades ORDER BY week ASC`).all();
}

export function getAllGames() {
  return db.prepare(`SELECT * FROM games ORDER BY week ASC`).all();
}

export function getAllTeamsWithOwnership() {
  const teams = db.prepare(`SELECT * FROM teams`).all();
  const ownerships = db.prepare(`SELECT * FROM team_ownership`).all();

  const ownershipMap = {};
  for (const o of ownerships) {
    if (!ownershipMap[o.teamName]) {
      ownershipMap[o.teamName] = [];
    }
    ownershipMap[o.teamName].push(o);
  }

  return teams.map((team) => ({
    ...team,
    ownershipHistory: ownershipMap[team.name] || []
  }));
}

export function addTeamOwnership({
  teamName,
  ownerName,
  acquiredWeek,
  droppedWeek = null,
  acquiredCost = 0,
  acquiredVia = "Draft"
}) {
  const stmt = db.prepare(`
    INSERT INTO team_ownership (
      teamName, ownerName, acquiredWeek, droppedWeek, acquiredCost, acquiredVia
    ) VALUES (?, ?, ?, ?, ?, ?)
  `);
  stmt.run(teamName, ownerName, acquiredWeek, droppedWeek, acquiredCost, acquiredVia);
}