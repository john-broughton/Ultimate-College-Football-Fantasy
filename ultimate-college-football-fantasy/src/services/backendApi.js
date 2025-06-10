const API_BASE = "http://localhost:3001/api";

// Players
export async function fetchAllPlayers() {
  const res = await fetch(`${API_BASE}/players`);
  if (!res.ok) throw new Error("Failed to fetch players");
  return await res.json();
}

export async function fetchPlayerByName(name) {
  const res = await fetch(`${API_BASE}/players/${name}`);
  if (!res.ok) throw new Error("Player not found");
  return await res.json();
}

export async function addPlayer(player) {
  const res = await fetch(`${API_BASE}/players`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(player)
  });
  if (!res.ok) throw new Error("Failed to add player");
  return await res.json();
}

// Teams
export async function fetchAllTeams() {
  const res = await fetch(`${API_BASE}/teams`);
  if (!res.ok) throw new Error("Failed to fetch teams");
  return await res.json();
}

export async function addTeam(team) {
  const res = await fetch(`${API_BASE}/teams`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(team)
  });
  if (!res.ok) throw new Error("Failed to add team");
  return await res.json();
}

// Transactions
export async function fetchAllTransactions() {
  const res = await fetch(`${API_BASE}/transactions`);
  if (!res.ok) throw new Error("Failed to fetch transactions");
  return await res.json();
}

export async function addTransaction(tx) {
  const res = await fetch(`${API_BASE}/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tx)
  });
  if (!res.ok) throw new Error("Failed to add transaction");
  return await res.json();
}

// Trades
export async function fetchAllTrades() {
  const res = await fetch(`${API_BASE}/trades`);
  if (!res.ok) throw new Error("Failed to fetch trades");
  return await res.json();
}

export async function addTrade(trade) {
  const res = await fetch(`${API_BASE}/trades`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(trade)
  });
  if (!res.ok) throw new Error("Failed to add trade");
  return await res.json();
}

// Games
export async function fetchAllGames() {
  const res = await fetch(`${API_BASE}/games`);
  if (!res.ok) throw new Error("Failed to fetch games");
  return await res.json();
}

export async function addGame(game) {
  const res = await fetch(`${API_BASE}/games`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(game)
  });
  if (!res.ok) throw new Error("Failed to add game");
  return await res.json();
}
