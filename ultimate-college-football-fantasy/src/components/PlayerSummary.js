export default function PlayerSummary({ name, score, balance }) {
  return (
    <div className="player-summary">
      <h4>{name}</h4>
      <p>Score: {score}</p>
      <p>Balance: ${balance}</p>
    </div>
  );
}
