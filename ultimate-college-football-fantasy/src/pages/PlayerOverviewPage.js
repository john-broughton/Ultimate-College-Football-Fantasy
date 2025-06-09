import { useParams, useNavigate } from "react-router-dom";
import { buildFullTestData } from "../data/testDataBuilder";
import CurrentTeamsTable from "../components/CurrentTeamsTable";
import TransactionLogTable from "../components/TransactionLogTable";

export default function PlayerOverviewPage() {
  const { playerName } = useParams();
  const navigate = useNavigate();
  const { players, teams, roster, transactions  } = buildFullTestData();
  const player = players.find((p) => p.name === playerName);

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
