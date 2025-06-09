import { BASE_POINTS, BONUS_POINTS } from "../models/scoringRules";

export function calculateScoreBreakdownsForWeek(week, players, teams, roster) {
  const teamMap = Object.fromEntries(teams.map(t => [t.name, t]));
  const weekStarts = roster.getStartersForWeek(week);
  const breakdowns = [];

  for (const [playerName, teamNames] of Object.entries(weekStarts)) {
    for (const teamName of teamNames) {
      const team = teamMap[teamName];
      const game = team?.games.find(g => g.week === week);
      if (!game) continue;

      const isWin = game.isWin;
      const base = isWin ? BASE_POINTS.WIN : BASE_POINTS.LOSS;
      const conf = game.isConferenceOpponent ? BONUS_POINTS.CONFERENCE_OPPONENT : 0;
      const road = game.isRoad || game.isNeutral ? BONUS_POINTS.ROAD_GAME : 0;

      let ranked = 0;
      if (isWin && typeof game.opponentRank === "number") {
        const rank = game.opponentRank;
        if (rank <= 25) ranked++;
        if (rank <= 20) ranked++;
        if (rank <= 15) ranked++;
        if (rank <= 10) ranked++;
        if (rank <= 5) ranked++;
        if (rank === 1) ranked++;
      }

      const independent = team.isIndependent ? BONUS_POINTS.INDEPENDENT_TEAM : 0;
      const total = [base, road, conf, ranked, independent].reduce((sum, val) => sum + (Number(val) || 0), 0);


      breakdowns.push({
        week,
        playerName,
        teamName,
        isWin,
        base,
        road,
        conf,
        ranked,
        independent,
        total,
      });
    }
  }

  return breakdowns;
}

export function calculatePlayerTotalScore(playerName, teams, roster, upToWeek = Infinity) {
  const allBreakdowns = [];
  for (let week = 1; week <= upToWeek; week++) {
    const breakdowns = calculateScoreBreakdownsForWeek(week, null, teams, roster)
      .filter(b => b.playerName === playerName);
    allBreakdowns.push(...breakdowns);
  }
  return allBreakdowns.reduce((sum, entry) => sum + entry.total, 0);
}
