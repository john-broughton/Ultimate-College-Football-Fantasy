import React, { useState } from "react";

export default function WeeklySummaryTable({ week, breakdowns }) {
  const [sortKey, setSortKey] = useState("total");
  const [sortAsc, setSortAsc] = useState(false);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const sorted = [...breakdowns].sort((a, b) => {
    const primary = a.playerName.localeCompare(b.playerName);
    if (primary !== 0) return primary;
    if (a[sortKey] < b[sortKey]) return sortAsc ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortAsc ? 1 : -1;
    return 0;
  });

  return (
    <div className="bg-white shadow rounded mb-6">
      <div className="flex items-center justify-between bg-blue-100 p-4 rounded-t">
        <h2 className="text-xl font-semibold">Week {week}</h2>
      </div>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            {[
              ["Player", "playerName"],
              ["Team", "teamName"],
              ["Result", "isWin"],
              ["Base", "base"],
              ["Road", "road"],
              ["Conf", "conf"],
              ["Ranked", "ranked"],
              ["Ind", "independent"],
              ["Total", "total"],
            ].map(([label, key]) => (
              <th
                key={key}
                className="px-4 py-2 border cursor-pointer hover:bg-blue-200"
                onClick={() => handleSort(key)}
              >
                {label}
                {sortKey === key ? (sortAsc ? " ▲" : " ▼") : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((entry, idx) => (
            <tr key={idx} className="odd:bg-white even:bg-gray-50">
              <td className="px-4 py-2 border">{entry.playerName}</td>
              <td className="px-4 py-2 border">{entry.teamName}</td>
              <td className="px-4 py-2 border">{entry.isWin ? "W" : "L"}</td>
              <td className="px-4 py-2 border">{entry.base}</td>
              <td className="px-4 py-2 border">{entry.road}</td>
              <td className="px-4 py-2 border">{entry.conf}</td>
              <td className="px-4 py-2 border">{entry.ranked}</td>
              <td className="px-4 py-2 border">{entry.independent}</td>
              <td className="px-4 py-2 border font-bold">{entry.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
