export default function WeeklyScoreRow({ playerName, score }) {
  return (
    <div className="weekly-score-row">
      <span>{playerName}</span>
      <span>{score} pts</span>
    </div>
  );
}
