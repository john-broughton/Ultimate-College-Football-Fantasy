import { useState } from "react";

export default function TransactionLogTable({ playerName, transactions }) {
  const playerTransactions = transactions.filter(
    (t) => t.playerName === playerName
  );

  const [sortBy, setSortBy] = useState("week");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filters, setFilters] = useState({
    type: "",
    teamName: "",
  });

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  const handleFilterChange = (e, field) => {
    setFilters((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const sortArrow = (column) =>
    sortBy === column ? (sortDirection === "asc" ? "↑" : "↓") : "";

  const filtered = playerTransactions.filter((entry) => {
    return (
      entry.type.toLowerCase().includes(filters.type.toLowerCase()) &&
      entry.teamName.toLowerCase().includes(filters.teamName.toLowerCase())
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    const dir = sortDirection === "asc" ? 1 : -1;
    const aVal = a[sortBy];
    const bVal = b[sortBy];

    if (typeof aVal === "string") {
      return aVal.localeCompare(bVal) * dir;
    }
    return (aVal - bVal) * dir;
  });

  if (sorted.length === 0) {
    return <p className="text-gray-500">No matching transactions.</p>;
  }

  return (
    <div className="overflow-x-auto border rounded shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-100 text-gray-700 font-semibold border-b">
          <tr>
            <th className="p-2 cursor-pointer" onClick={() => handleSort("week")}>
              Week {sortArrow("week")}
            </th>
            <th className="p-2 cursor-pointer" onClick={() => handleSort("type")}>
              Type {sortArrow("type")}
              <div>
                <input
                  type="text"
                  placeholder="Filter..."
                  className="mt-1 w-full px-2 py-1 border rounded text-sm bg-white"
                  value={filters.type}
                  onChange={(e) => handleFilterChange(e, "type")}
                />
              </div>
            </th>
            <th className="p-2 cursor-pointer" onClick={() => handleSort("teamName")}>
              Team {sortArrow("teamName")}
              <div>
                <input
                  type="text"
                  placeholder="Filter..."
                  className="mt-1 w-full px-2 py-1 border rounded text-sm bg-white"
                  value={filters.teamName}
                  onChange={(e) => handleFilterChange(e, "teamName")}
                />
              </div>
            </th>
            <th className="p-2 cursor-pointer" onClick={() => handleSort("cost")}>
              Cost {sortArrow("cost")}
            </th>
            <th className="p-2 cursor-pointer" onClick={() => handleSort("note")}>
              Note {sortArrow("note")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((entry, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="p-2">Week {entry.week}</td>
              <td className="p-2">{entry.type}</td>
              <td className="p-2">{entry.teamName}</td>
              <td className="p-2">${entry.cost}</td>
              <td className="p-2">{entry.note || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
