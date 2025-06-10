import { useState } from "react";

export default function CurrentTeamsTable({ playerName, teams }) {
  const currentTeams = teams
    .filter((team) =>
      Array.isArray(team.ownershipHistory) &&
      team.ownershipHistory.some(
        (o) => o.ownerName === playerName && o.droppedWeek === null
      )
    )
    .map((team) => {
      const record = team.ownershipHistory.find(
        (o) => o.ownerName === playerName && o.droppedWeek === null
      );
      return {
        name: team.name,
        conference: team.conference,
        cost: team.cost,
        acquiredWeek: record?.acquiredWeek ?? "N/A",
      };
    });

  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filters, setFilters] = useState({
    name: "",
    conference: "",
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

  const filtered = currentTeams.filter((team) => {
    return (
      team.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      team.conference.toLowerCase().includes(filters.conference.toLowerCase())
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    const dir = sortDirection === "asc" ? 1 : -1;
    if (typeof a[sortBy] === "string") {
      return a[sortBy].localeCompare(b[sortBy]) * dir;
    }
    return (a[sortBy] - b[sortBy]) * dir;
  });

  const sortArrow = (column) =>
    sortBy === column ? (sortDirection === "asc" ? "↑" : "↓") : "";

  if (currentTeams.length === 0) {
    return <p className="text-gray-500">No teams currently owned.</p>;
  }

  return (
    <div className="overflow-x-auto border rounded-md shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-100 border-b text-gray-800 font-semibold">
          <tr>
            <th className="p-2 cursor-pointer" onClick={() => handleSort("name")}>
              Team {sortArrow("name")}
              <div>
                <input
                  type="text"
                  placeholder="Filter..."
                  className="mt-1 w-full px-2 py-1 border rounded text-sm bg-white"
                  value={filters.name}
                  onChange={(e) => handleFilterChange(e, "name")}
                />
              </div>
            </th>
            <th className="p-2 cursor-pointer" onClick={() => handleSort("conference")}>
              Conference {sortArrow("conference")}
              <div>
                <input
                  type="text"
                  placeholder="Filter..."
                  className="mt-1 w-full px-2 py-1 border rounded text-sm bg-white"
                  value={filters.conference}
                  onChange={(e) => handleFilterChange(e, "conference")}
                />
              </div>
            </th>
            <th className="p-2 cursor-pointer" onClick={() => handleSort("cost")}>
              Cost {sortArrow("cost")}
            </th>
            <th className="p-2 cursor-pointer" onClick={() => handleSort("acquiredWeek")}>
              Acquired Week {sortArrow("acquiredWeek")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((team, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="p-2">{team.name}</td>
              <td className="p-2">{team.conference}</td>
              <td className="p-2">${team.cost}</td>
              <td className="p-2">Week {team.acquiredWeek}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
