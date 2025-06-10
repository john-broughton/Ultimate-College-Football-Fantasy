import React from "react";
import { buildFullTestData } from "../data/testDataBuilder.js";
import { calculateScoreBreakdownsForWeek } from "../utils/scoreCalculator.js";
import WeeklySummaryTable from "../components/weeklySummaryTable.js";

export default function WeeklySummaryPage() {
  const { players, teams, roster } = buildFullTestData();

  // Get unique weeks from games
  const allWeeks = Array.from(
    new Set(teams.flatMap((t) => t.games.map((g) => g.week)))
  ).sort((a, b) => a - b);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold text-blue-800">Weekly Scoring Summary</h1>

      {allWeeks.map((week) => {
        const breakdowns = calculateScoreBreakdownsForWeek(week, players, teams, roster);
        return <WeeklySummaryTable key={week} week={week} breakdowns={breakdowns} />;
      })}
    </div>
  );
}
