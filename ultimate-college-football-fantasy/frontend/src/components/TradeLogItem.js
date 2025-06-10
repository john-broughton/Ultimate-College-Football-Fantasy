export default function TradeLogItem({ fromPlayer, toPlayer, teamName, week }) {
  return (
    <div className="trade-log-item">
      <p>Week {week}: {fromPlayer} → {toPlayer} ({teamName})</p>
    </div>
  );
}
