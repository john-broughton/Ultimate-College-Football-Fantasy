import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CurrentTeamsTable from "../components/CurrentTeamsTable.js";
import TransactionLogTable from "../components/TransactionLogTable.js";
import {
  fetchAllPlayers,
  fetchAllTransactions,
  fetchTeamsWithOwnership  
} from "../services/backendApi.js";

export default function PlayerOverviewPage() {
  const { playerName } = useParams();
  const navigate = useNavigate();

  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    async function loadData() {
      const fetchedPlayers = await fetchAllPlayers();
      const fetchedTeams = await fetchTeamsWithOwnership();
      const fetchedTransactions = await fetchAllTransactions();
   

      setPlayers(fetchedPlayers);
      setTeams(fetchedTeams);
      setTransactions(fetchedTransactions);

      const found = fetchedPlayers.find((p) => p.name === playerName);
      setPlayer(found);
    }

    loadData();
  }, [playerName]);

  const handleChange = (e) => {
    const selected = e.target.value;
    if (selected) navigate(`/players/${selected}`);
  };

  if (!player) {
    return <div className="text-red-600">Player "{playerName}" not found.</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-800">Player Overview</h1>

        <select
          value={playerName}
          onChange={handleChange}
          className="border px-3 py-2 rounded text-sm"
        >
          {players.map((p) => (
            <option key={p.name} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Player Info</h2>
        <p>
          <strong>Email:</strong> {player.email}
        </p>
        <p>
          <strong>Paid:</strong> {player.paid ? "Yes" : "No"}
        </p>
        <p>
          <strong>Balance:</strong> ${player.balance}
        </p>
        <p>
          <strong>Score:</strong> {player.score ?? "N/A"}
        </p>
      </section>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Current Teams</h2>
        <CurrentTeamsTable playerName={player.name} teams={teams} />
      </section>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Transaction History</h2>
        <TransactionLogTable
          playerName={player.name}
          transactions={transactions}
        />
      </section>
    </div>
  );
}
