import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PlayerSummary from "../components/PlayerSummary.js";
import { fetchAllPlayers } from "../services/backendApi.js";

export default function HomePage() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetchAllPlayers()
      .then(setPlayers)
      .catch((err) => console.error("Failed to load players:", err));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-800 mb-4">
        🏆 Current Standings
      </h1>

      <div className="space-y-4">
        {players
          .sort((a, b) => b.score - a.score)
          .map((player, index) => (
            <Link
              to={`/players/${player.name}`}
              key={player.name}
              className="block bg-white rounded-lg p-4 shadow-md border border-gray-200 hover:bg-blue-50 transition"
            >
              <PlayerSummary
                name={`${index + 1}. ${player.name}`}
                score={player.score}
                balance={player.balance}
              />
            </Link>
          ))}
      </div>

      <div className="mt-8 flex gap-4">
        <a
          href="/draft"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Go to Draft
        </a>
        <a
          href="/roster"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Set Roster
        </a>
        <a
          href="/summary"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          View Weekly Summary
        </a>
      </div>
    </div>
  );
}
